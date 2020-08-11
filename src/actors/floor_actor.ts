import { Actor } from "../bases/actor";
import { Level } from "../bases/level";
import { FloorComponent } from "../components/floor_component";
import { TransformComponent } from "../components/transform_component";
import { Vector2 } from "../domains/vector2";

export class FloorActor extends Actor {

  private floors: FloorComponent[] = [];
  // private transform: TransformComponent;

  constructor(level: Level) {
    super(level);

    // this.transform = new TransformComponent(this);
    // this.addComponent(this.transform);
    // this.transform.move(new Vector2(1, 1));

    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 15; x++) {
        const floor = new FloorComponent(this);
        floor.setPosition(x*32, y*32);
        this.addComponent(floor);
        this.floors.push(floor);
      }
    }
  }
  
  updateActor(): void {
    // 何もしない
  }

  // private positionUpdate() {
  //   this._entity.x = this.transform.position.x * 32;
  //   this._entity.y = this.transform.position.y * 32;
  // }
}