import { Actor } from "../bases/actor";
import { RendererComponent } from "./renderer_component";

export class TileComponent extends RendererComponent {

	private entity!: g.E;
	private frame!: g.FilledRect;
	private filled!: g.FilledRect;

	private _width: number;
	get width() {
		return this._width;
	}
	private _height: number;
	get height() {
		return this._height;
	}

	constructor(actor: Actor, width = 32, height = 32) {
		super(actor);

		this._width = width;
		this._height = height;
	}

	update(): void {
		// 何もしない
	}

	generate(): g.E {
		this.entity = new g.E({scene: this.level.scene});

		const width = 32;
		const height = 32;

		this.frame = new g.FilledRect({
			scene: this.level.scene,
			cssColor: "#000000",
			width: width,
			height: height,
			x: 0,
			y: 0
		});
		this.entity.append(this.frame);

		this.filled = new g.FilledRect({
			scene: this.level.scene,
			cssColor: "#C71585",
			width: width - 2,
			height: height - 2,
			x: 1,
			y: 1
		});
		this.entity.append(this.filled);

		return this.entity;
	}

	stepOn() {
		this.filled.cssColor = "#800000";
	}
}
