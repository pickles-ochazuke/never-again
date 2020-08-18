import { Actor } from "../bases/actor";
import { Level } from "../bases/level";
import { FloorComponent } from "../components/floor_component";
import { Vector2 } from "../utils/vector2";

export class FloorActor extends Actor {

  private floors: FloorComponent[] = [];

  constructor(tileX: number, tileY: number, level: Level) {
    super(level);

    for (let y = 0; y < tileY; y++) {
      for (let x = 0; x < tileX; x++) {
        const floor = new FloorComponent(this);
        floor.setPosition(x * level.tileWidth, y * level.tileHeight);
        this.addComponent(floor);
        this.floors.push(floor);
      }
    }
  }
  
  updateActor(): void {
    // 何もしない
  }

  /**
   * 踏んだ場所をコンポーネントに伝える
   * @param position 踏んだ場所
   */
  stepedOn(position: Vector2) {
    const floor = this.floors.filter(floor => (floor.x === position.x) && (floor.y === position.y));
    floor[0].steped();
  }
}