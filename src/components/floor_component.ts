import { Actor } from "../bases/actor";
import { RendererComponent } from "./renderer_component";

export class FloorComponent extends RendererComponent {

	private entity!: g.E;
	private frame!: g.FilledRect;
	private filled!: g.FilledRect;

	get x() {
		return this.entity.x / 32;
	}

	get y() {
		return this.entity.y / 32;
	}

	constructor(actor: Actor) {
		super(actor);
	}

	setPosition(x: number, y: number) {
		if (this.entity != null) {
			this.entity.x = x;
			this.entity.y = y;
		}
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

	steped() {
		this.filled.cssColor = "#800000";
	}
}
