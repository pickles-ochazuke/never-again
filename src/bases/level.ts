import { PlayerActor } from "../actors/player_actor";
import { Actor } from "./actor";
import { BackgroundActor } from "../actors/background_actor";
import { FloorActor } from "../actors/floor_actor";
import { ControllerActor } from "../actors/controller_actor";
import { BlockComponent } from "../components/block_component";
import { BlockActor } from "../actors/block_actor";
import { MetaDataRepositoryInterface } from "../interfaces/meta_data_repository_interface";
import { JsonRepository } from "../repositories/json_repository";

export class Level {

  private _width = g.game.width;
  get width() {
    return this._width;
  }
  private _height = g.game.height;
  get height() {
    return this._height;
  }

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

      this.actors.push(new BackgroundActor(this));
      this.actors.push(new FloorActor(this));
      
      const repository: MetaDataRepositoryInterface = new JsonRepository(this.scene);
      const metas = repository.fetchMetaBlocks("stage1");
      metas.forEach(meta => this.actors.push(new BlockActor(this, meta.position.x, meta.position.y)));

      this.actors.push(new PlayerActor(this));

      const controller = new ControllerActor(this, g.game.width, g.game.height * 0.3);
      controller.setPosition(0, g.game.height * 0.7);
      this.actors.push(controller);

      this.scene.append(this._entity);
    });
  }

  append(entity: g.E) {
    this._entity?.append(entity);
  }

  filterActors<T extends Actor>(isType: (a: Actor) => a is T): T[] {
    return this.actors.filter(isType);
  }
}