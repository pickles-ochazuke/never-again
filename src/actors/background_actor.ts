import { Actor } from "../bases/actor";
import { Level } from "../bases/level";
import { BackgroundComponent } from "../components/backgound_component";

export class BackgroundActor extends Actor {

	private background: BackgroundComponent;

	constructor(level: Level) {
		super(level);

		this.background = new BackgroundComponent(this);
		this.addComponent(this.background);
	}

	updateActor(): void {
		// 何もしない
	}
}
