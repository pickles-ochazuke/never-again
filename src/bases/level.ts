import { PlayerActor } from "../actors/player_actor";
import { Actor } from "./actor";

export class Level {

  private _entity: g.E | null = null;
  private _scene: g.Scene;
  get scene() {
    return this._scene;
  }

  // このシーンに登場するアクター
  private actors: Actor[] = [];

  constructor() {

    this._scene = new g.Scene({
      game: g.game,
      assetIds: ["stage1"]
    });
  }

  initialize(): void {
    this._scene.loaded.add(() => {

      this._entity = new g.E({scene: this.scene});

      this.actors.push(new PlayerActor(this));
      this.scene.append(this._entity);
    });
  }

  append(entity: g.E) {
    this._entity?.append(entity);
  }
}