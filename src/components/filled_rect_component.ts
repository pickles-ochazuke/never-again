import { Actor } from "../bases/actor";
import { RendererComponent } from "./renderer_component";

export class FilledRectComponent extends RendererComponent {

	constructor(actor: Actor) {
		super(actor);
	}

	update(): void {
		// 何もしない
	}

	generate(): g.E {
		return new g.FilledRect({
			scene: this.scene,
			cssColor: "#ff0000",
			width: 32,
			height: 32
		});
	}

}
