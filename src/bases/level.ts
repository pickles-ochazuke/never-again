import { Player } from "../domains/player";
import { PlayerActor } from "../actors/player_actor";

export class Level {

  private _scene: g.Scene;
  
  get scene() {
    return this._scene;
  }

  constructor() {

    this._scene = new g.Scene({
      game: g.game,
      assetIds: ["stage1"]
    });
  }

  initialize(): void {
    this._scene.loaded.add(() => {

      const player = new PlayerActor(this.scene);
    });
  }

}