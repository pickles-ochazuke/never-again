import { Actor } from "../bases/actor";
import { Level } from "../bases/level";
import { FilledRectComponent } from "../components/filled_rect_component";

export class RectActor extends Actor {

	constructor(level: Level) {
		super(level);

		this.addComponent(new FilledRectComponent(this));
	}

	updateActor(): void {
		this._entity.x += 1;
		if (this._entity.x > g.game.width) this._entity.x = 0;
	}
}
