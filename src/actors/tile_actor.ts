import { Actor } from "../bases/actor";
import { Level } from "../bases/level";
import { TileComponent } from "../components/tile_component";
import { TransformComponent } from "../components/transform_component";
import { Vector2 } from "../utils/vector2";

export class TileActor extends Actor {

  private tile: TileComponent;
  private transform: TransformComponent;
  private get position() {
    return this.transform.position;
  }

  private get width() {
    return this.tile.width;
  }

  private get height() {
    return this.tile.height;
  }

  constructor(level: Level, x: number, y: number) {
    super(level);

    this.tile = new TileComponent(this);
    this.addComponent(this.tile);

    this.transform = new TransformComponent(this);
    this.addComponent(this.transform);

    this.setPosition(x, y);
  }
  
  updateActor(): void {
    // 何もしない
  }

  setPosition(x: number, y: number) {
    this.transform.move(new Vector2(x, y));
    this._entity.x = this.position.x * this.width;
    this._entity.y = this.position.y * this.height;
  }

  /**
   * 踏んだ場所をコンポーネントに伝える
   * @param position 踏んだ場所
   */
  stepOn() {
    this.tile.stepOn();
  }
}