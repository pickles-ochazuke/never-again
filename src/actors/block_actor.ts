import { Actor } from "../bases/actor";
import { Level } from "../bases/level";
import { BlockComponent } from "../components/block_component";
import { TransformComponent } from "../components/transform_component";
import { Vector2 } from "../domains/vector2";

export class BlockActor extends Actor {

  private block: BlockComponent;

  private transform: TransformComponent;
  get x() {
    return this.transform.position.x;
  }

  get y() {
    return this.transform.position.y;
  }

  constructor(level: Level, x: number, y: number) {
    super(level);


    this.block = new BlockComponent(this);
    this.addComponent(this.block);

    this.transform = new TransformComponent(this);
    this.addComponent(this.transform);

    this.transform.move(new Vector2(x, y));
    this._entity.x = this.transform.position.x * this.block.width;
    this._entity.y = this.transform.position.y * this.block.height;
  }
  
  updateActor(): void {
    // 何もしない
  }
}