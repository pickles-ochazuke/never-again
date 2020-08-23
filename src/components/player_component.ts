import { RendererComponent } from "./renderer_component";
export class PlayerComponent extends RendererComponent{

	update(): void {
		// 何もしない
	}

	generate(): g.E {
		return new g.FilledRect({
			scene: this.level.scene,
			cssColor: "#ff0000",
			width: 32,
			height: 32
		});
	}
}
