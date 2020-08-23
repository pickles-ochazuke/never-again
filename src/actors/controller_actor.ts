import { Actor } from "../bases/actor";
import { Level } from "../bases/level";
import { ControllerComponent } from "../components/controller_component";
import { PlayerActor } from "./player_actor";

export class ControllerActor extends Actor {

	private target: PlayerActor;

	width = 0;
	height = 0;

	constructor(level: Level, width: number, height: number) {
		super(level);

		this.width = width;
		this.height = height;

		const targets = level.filterActors((actor): actor is PlayerActor => actor instanceof PlayerActor);
		this.target = targets[0];

		this.addComponent(new ControllerComponent(this, this.target));
	}

	updateActor(): void {

	}

	setPosition(x: number, y: number) {
		this._entity.x = x;
		this._entity.y = y;
	}
}
