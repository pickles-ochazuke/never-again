export class Background {

	private _entity: g.FilledRect;
	get entity(): g.FilledRect {
		return this._entity;
	}

	constructor(
		private width: number,
		private height: number,
		private scene: g.Scene
	) {
		this._entity = new g.FilledRect({
			scene: scene,
			cssColor: "#FFFFFF",
			width: width,
			height: height,
		});

		// 縦の線(デバッグ用)
		const columnLine = new g.FilledRect({
			scene: scene,
			cssColor: "#000000",
			width: 1,
			height: height,
			x: width / 2,
			y: 0
		});

		this.entity.append(columnLine);
	}
}
