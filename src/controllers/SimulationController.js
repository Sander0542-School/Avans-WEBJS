import {BaseController, SimulationView, Storage} from "../CROWDR";

export default class SimulationController extends BaseController {

	ticksPerSecond = 20;
	maxPerRegion = 15 * 15 * 7;

	tickId = 0;
	lines = [];
	regions = [];
	lineCount = 3;
	enabled = false;

	constructor(mainController) {
		super(mainController);
		this.simulationView = new SimulationView();
		this.lineCountChanged(this.lineCount);
	}

	weatherChanged(weather) {

	}

	lineCountChanged(lineCount) {
		this.lines = this.lines.slice(0, lineCount);

		while (this.lines.length < lineCount) {
			this.lines.push(this.randomLine());
		}
	}

	async tick() {
		this.tickId++;

		await this.handleLines();

		this.simulationView.render(this.regions);

		if (this.enabled) {
			setTimeout(() => this.tick(), 1000 / this.ticksPerSecond);
		}
	}

	async handleLines() {
		for (let line of this.lines) {
			line.tick++;

			if (line.tick > line.speed) {
				line.tick = 0;
				const group = await this.randomGroup();
				line.queue.unshift(group);
			}

			if (line.queue.length > 0) {
				const region = this.randomRegion();
				const group = line.queue[line.queue.length - 1];

				if (region.visitors + group.persons.length <= this.maxPerRegion) {
					region.visitors += group.persons.length;
					region.groups.push(line.queue.pop());
				}
			}
		}
	}

	async startSimulation() {
		this.regions = [];

		for (const region of Storage.getRegions()) {
			if (region.locked === true) {
				region.groups = [];
				region.visitors = 0;
				region.maxVisitors = this.maxPerRegion;
				this.regions.push(region);
			}
		}

		this.simulationView.render(this.regions);

		this.enabled = true;

		await this.tick();
	};

	async resumeSimulation() {
		this.enabled = false;

		await this.tick();
	};

	pauseSimulation() {
		this.enabled = false;
	};

	randomLine() {
		return {
			tick: 0,
			speed: this.randomInt(0, 3),
			queue: []
		};
	}

	randomRegion() {
		return this.regions[Math.floor(Math.random() * this.regions.length)];
	}

	async randomGroup() {
		const size = this.randomInt(1, 4);

		const response = await fetch(`https://randomuser.me/api?results=${size}&nat=nl`);
		const persons = (await response.json()).results;

		return {
			persons: persons.map(person => {
				return {
					name: `${person.name.first} ${person.name.last}`
				}
			}),
			x: this.randomInt(0, 687),
			y: this.randomInt(0, 687),
		}
	}

	randomInt(min = 0, max = 3) {
		return Math.floor(Math.random() * max - min + 1) + min;
	}
}