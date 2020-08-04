import { Game } from "./game";

export class Block {
	private _entity: g.E;
	get entity(): g.E {
		return this._entity;
	}

	get x() {
		return this._x;
	}
	get y() {
		return this._y;
	}

	constructor(
		private _x: number,
		private _y: number,
		private game: Game,
		private scene: g.Scene,
	) {
		this._entity = new g.FilledRect({
			scene: scene,
			cssColor: "#000000",
			width: 32,
			height: 32,
			x: _x * 32,
			y: _y * 32
		});
	}
}
