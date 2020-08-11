import { Actor } from "../bases/actor";
import { Component } from "../bases/component";

export abstract class RendererComponent extends Component {

	protected _entity: g.E;

	constructor(actor: Actor) {
		super(actor);
		this._entity = this.generate();
		this.actor.appendEntity(this._entity);
	}

	abstract update(): void;
	abstract generate(): g.E;
}
