import { Game } from "./game";

export class Player {
  private _entity: g.E;
  get entity(): g.E { return this._entity; }

  private vectorX = 0;
  private vectorY = 0;

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
      tag: 'Player'
    });

    this._entity.update.add(() => {
      this.update();
    });
  }

  update() {
    this._entity.x += this.vectorX * this._entity.width;
    this._entity.y += this.vectorY * this._entity.height;

    // 衝突判定
    this.game.blocks.forEach(block => {
      if (this._entity.y == block.y && this._entity.x == block.x) {
        this._entity.x -= this.vectorX * this._entity.width;
        this._entity.y -= this.vectorY * this._entity.height;
      }
    });

    this.vectorX = 0;
    this.vectorY = 0;
    this._entity.modified();
  }

  /**
   * 引数に指定した値の分だけ移動する。
   * @param x 指定した値だけ増加する
   * @param y 指定した値だけ増加する
   */
  move(x: number, y: number) {
    this.vectorX = x;
    this.vectorY = y;
  }
}