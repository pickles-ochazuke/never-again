import { Player } from "./player";

export class Controller {

  private _entity: g.E;
  get entity() { return this._entity; }

  constructor(
    private right: g.FilledRect,
    private left: g.FilledRect,
    private top: g.FilledRect,
    private bottom: g.FilledRect,
    scene: g.Scene,
    private player: Player,
  ) {

    // Right
    this.right.pointDown.add(() => {
      this.right.cssColor = "black";
      this.right.modified();
      this.moveRight();
    });
    this.right.pointUp.add(() => {
      this.right.cssColor = "#FF0000";
      this.right.modified();
    });

    // Left
    this.left.pointDown.add(() => {
      this.left.cssColor = "black";
      this.left.modified();
      this.moveLeft();
    });
    this.left.pointUp.add(() => {
      this.left.cssColor = "#00FF00";
      this.left.modified();
    });

    // Top
    this.top.pointDown.add(() => {
      this.top.cssColor = "black";
      this.top.modified();
      this.moveTop();
    });
    this.top.pointUp.add(() => {
      this.top.cssColor = "#0000FF";
      this.top.modified();
    });

    // Bottom
    bottom.pointDown.add(() => {
      this.bottom.cssColor = "black";
      this.bottom.modified();
      this.moveBottom();
    });
    bottom.pointUp.add(() => {
      this.bottom.cssColor = "#FFFF00";
      this.bottom.modified();
    });

    this._entity = new g.E({scene});
    this._entity.append(this.right);
    this._entity.append(this.left);
    this._entity.append(this.top);
    this._entity.append(this.bottom);
  }

  moveRight() {
    this.player.move(1, 0);
  }

  moveLeft() {
    this.player.move(-1, 0);
  }

  moveTop() {
    this.player.move(0, -1);
  }

  moveBottom() {
    this.player.move(0, 1);
  }
}