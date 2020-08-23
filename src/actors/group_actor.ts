import { Actor } from "../bases/actor";
import { Level } from "../bases/level";

export class GroupActor extends Actor {

	private actors: Array<Actor>;

	constructor(level: Level, actors: Array<Actor>) {
		super(level);

		this.actors = actors;

		// アクターに別アクターのエンティティをつけれない？
		// this.actors.forEach(actor => this._entity.append(actor.));
	}

	updateActor(): void {
		// 何もしない
	}
}
