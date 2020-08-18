import { Actor } from "./actor";

export type LayerTag = 'Floor' | 'Event';

export class Layer {
  
  private _entity: g.E;
  get entity() {
    return this._entity;
  }
  
  private actors: Array<Actor>;
  
  constructor(scene: g.Scene) {
    this.actors = [];

    this._entity = new g.E({scene: scene});
  }

  appends(actors: Array<Actor>) {
    this.actors.push(...actors);

    actors.forEach(actor => actor.appendTo(this._entity));
  }
}