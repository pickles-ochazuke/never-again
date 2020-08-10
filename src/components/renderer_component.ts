import { Actor } from "../bases/actor";
import { Component } from "../bases/component";

export abstract class RendererComponent extends Component {

	constructor(actor: Actor) {
		super(actor);
		this.actor.appendEntity(this.generate());
	}

	abstract update(): void;
	abstract generate(): g.E;
}
