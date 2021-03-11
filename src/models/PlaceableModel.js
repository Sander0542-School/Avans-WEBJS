import {Model} from "../CROWDR";

export default class PlaceableModel  {
	constructor(props) {
		if (props) {
			this._height = props.height;
			this._width = props.width;
		}
	}

	
	get height() {
		return this._height;
	}
	
	set height(height) {
		if (!height) {
			throw new Error("height must be non-blank");
		}
		this._height = height;
		// this.raiseChange();
	}

	get width() {
		return this._width;
	}

	set width(width) {
		if (!width) {
			throw new Error("width must be non-blank");
		}
		this._width = width;
		// this.raiseChange();
	}

	
}