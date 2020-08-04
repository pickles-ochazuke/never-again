import { Game } from "./game";
import { Vector2 } from "./vector2";

export class Player {
  private _entity: g.E;
  get entity(): g.E {
    return this._entity;
  }
  
  private _x = 0;
  get x() { return this._x; }
  
  private _y = 0;
  get y() { return this._y; }

  private vector = new Vector2();

  constructor(
    private game: Game,
    private scene: g.Scene
  ) {
    this._entity = new g.FilledRect({
      scene: this.scene,
      cssColor: "#ff0000",
      width: 32,
      height: 32,
      touchable: true,
      tag: "Player"
    });

    this._entity.update.add(() => {
      this.update();
    });
  }

  update() {
    this._x += this.vector.x;
    this._y += this.vector.y;

    // 衝突判定
    this.game.blocks.forEach(block => {
      if (this.y == block.y && this.x == block.x) {
        this._x -= this.vector.x;
        this._y -= this.vector.y;
      }
    });

    this.vector.initialize();
    this.positionUpdate();
    this._entity.modified();
  }

  /**
   * 引数に指定した値の分だけ移動する。
   * @param x 指定した値だけ増加する
   * @param y 指定した値だけ増加する
   */
  move(vector: Vector2) {
    this.vector.plus(vector);
  }

  positionUpdate() {
    this.entity.x = this.x * this.entity.width;
    this.entity.y = this.y * this.entity.height;
  }
}
