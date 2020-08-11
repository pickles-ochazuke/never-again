import { PlayerActor } from "../actors/player_actor";
import { Actor } from "./actor";
import { BackgroundActor } from "../actors/background_actor";
import { FloorActor } from "../actors/floor_actor";
import { ControllerActor } from "../actors/controller_actor";
import { BlockComponent } from "../components/block_component";
import { BlockActor } from "../actors/block_actor";
import { MetaDataRepositoryInterface } from "../interfaces/meta_data_repository_interface";
import { JsonRepository } from "../repositories/json_repository";
import { Vector2 } from "../utils/vector2";
import { StartEventActor } from "../actors/start_event_actor";
import { GoalEventActor } from "../actors/goal_event_actor";
import { GoalBlockActor } from "../actors/goal_block_actor";

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

  private _player!: PlayerActor;
  get player() {
    return this._player;
  }

  private _gameover = false;
  get gameover() {
    return this._gameover;
  }

  goal = false;

  // このシーンに登場するアクター
  private actors: Actor[] = [];

  // 床
  private floor!: FloorActor;

  // 通過すべき座標
  private stepedOns: Vector2[] = [];

  private sounded = false;

  constructor() {

    this._scene = new g.Scene({
      game: g.game,
      assetIds: [
        "stage1",
        "bgm",
        "start",
        "walk",
        "gameover",
        "goal",
        "open",
        "walk",
        "gameover_bgm",
        "goal_bgm"
      ]
    });
  }

  initialize(): void {
    this._scene.loaded.add(() => {

      this._entity = new g.E({scene: this.scene});

      this.actors.push(new BackgroundActor(this));

      this.floor = new FloorActor(this);
      this.actors.push(this.floor);
      
      const repository: MetaDataRepositoryInterface = new JsonRepository(this.scene);
      const metas = repository.fetchMetaBlocks("stage1");
      const blocks: BlockActor[] = [];
      metas.forEach(meta => blocks.push(new BlockActor(this, meta.position.x, meta.position.y)));
      this.actors.push(...blocks);

      // スタートとゴールを作成
      // スタートとゴールは常に真ん中の下と上にする。
      const startPosition: Vector2 = new Vector2(7, 13);
      const goalPosition: Vector2 = new Vector2(7, 0);

      // エリアの外側をブロックで囲む
      const walls: BlockActor[] = this.generateWalls(15, 14, startPosition, goalPosition);
      walls.forEach(wall => this.actors.push(wall));

      const goalBlock = new GoalBlockActor(this, goalPosition.x, goalPosition.y + 1);
      this.actors.push(goalBlock);
      walls.push(goalBlock);

      this._player = new PlayerActor(this);
      this.player.move(startPosition);
      this.actors.push(this.player);


      const controller = new ControllerActor(this, g.game.width, g.game.height * 0.3);
      controller.setPosition(0, g.game.height * 0.7);
      this.actors.push(controller);

      const startEvent = new StartEventActor(this, startPosition.x, startPosition.y);
      this.actors.push(startEvent);

      const goalEvent = new GoalEventActor(this, goalPosition.x, goalPosition.y);
      this.actors.push(goalEvent);

      // 通らなくて良い場所
      const notSteps: Vector2[] = [
        ...blocks.map(block => new Vector2(block.x, block.y)),
        ...walls.map(wall => new Vector2(wall.x, wall.y)),
        startPosition,
        goalPosition
      ];

      // 全ての道を出す
      for (let y = 0; y < 14; y++) {
        for (let x = 0; x < 15; x++) {
          this.stepedOns.push(new Vector2(x, y));
        }
      }
      // ブロックやスタートとゴールがあるところは除く
      this.stepedOns = this.stepedOns.filter(el => {
        const found = notSteps.some(step => step.x === el.x && step.y === el.y);
        return !found; // notSteps にない場所は、通過すべき場所
      });

      this.scene.append(this._entity);

      // ゲームの開始を告げる音と音楽を鳴らす
      this.gameStart();
    });

    this.scene.update.add(() => {
      if (this.gameover && !this.sounded) {
        (this.scene.assets["bgm"] as g.AudioAsset).stop();
        (this.scene.assets["gameover"] as g.AudioAsset).play();
        (this.scene.assets["gameover_bgm"] as g.AudioAsset).play();
        this.sounded = true;
      }

      if (this.goal && !this.sounded) {
        (this.scene.assets["bgm"] as g.AudioAsset).stop();
        (this.scene.assets["goal_bgm"] as g.AudioAsset).play();
        this.sounded = true;
      }
    })
  }

  append(entity: g.E) {
    this._entity?.append(entity);
  }

  filterActors<T extends Actor>(isType: (a: Actor) => a is T): T[] {
    return this.actors.filter(isType);
  }

  generateWalls(x: number, y: number, start: Vector2, goal: Vector2) {

    const ary: BlockActor[] = [];
    for (let row = 0; row < y; row++) {
      for (let column = 0; column < x; column++) {
        if ((column === start.x && row === start.y) || (column === goal.x && row === goal.y)) {
          continue;
        }
  
        if (
          (column === 0) ||
          (column === x-1) ||
          (row === 0) ||
          (row === y-1)
        )
          ary.push(new BlockActor(this, column, row));
      }
    }
    return ary;
  }

  // 通過すべき場所を全て通過しているなら true を返す
  isAllStepedOn(): boolean {

    let bool = false;
    for (const index in this.stepedOns) {
      const condition = (it: Vector2) => (it.x === this.stepedOns[index].x) && (it.y === this.stepedOns[index].y);

      bool = this.player.stepedOns.some(condition);

      if (!bool) {
        break;
      }
    }
    return bool;
  }

  stepOn(position: Vector2) {
    this.floor.stepedOn(position);
  }

  onGameover() {
    this._gameover = true;
  }

  private gameStart() {
    (this.scene.assets["bgm"] as g.AudioAsset).play();
  }
}