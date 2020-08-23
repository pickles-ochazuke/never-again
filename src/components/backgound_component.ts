import { RendererComponent } from "./renderer_component";

export class BackgroundComponent extends RendererComponent {

	update(): void {
		// 何もしない
	}

	generate(): g.E {

		const entity = new g.E({scene: this.level.scene});

		entity.append(new g.FilledRect({
			scene: this.level.scene,
			cssColor: "#FFFFFF",
			width: this.level.width,
			height: this.level.height,
		}));

		entity.append(new g.FilledRect({
			scene: this.level.scene,
			cssColor: "#000000",
			width: 1,
			height: this.level.height,
			x: this.level.width / 2,
			y: 0
		}));

		return entity;
	}
}
