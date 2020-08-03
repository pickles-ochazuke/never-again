import { Controller } from "./controller";

export class Ui {

  private _entity: g.E;
  get entity() { return this._entity; }

  private _controller: Controller | null = null;
  set controller(value: Controller) {
    this._controller = value;
    this._entity.append(this._controller.entity);
  }

  get width() { return this._entity.width; }
  get height() { return this._entity.height; }

  constructor(
    scene: g.Scene,
  ) {

    // UI の描画領域と位置を決める
    this._entity = new g.E({
      scene: scene,
      x: 0,
      y: g.game.height * 0.7,
      width: g.game.width,
      height: g.game.height * 0.3
    });

    // debug用のUI背景
    this._entity.append(new g.FilledRect({
      scene: scene,
      cssColor: "#8aafebAA",
      width: this._entity.width,
      height: this._entity.height,
    }));
  }
}