import { Actor } from "../bases/actor";
import { Level } from "../bases/level";
import { FloorComponent } from "../components/floor_component";

export class FloorActor extends Actor {

  private floors: FloorComponent[] = [];

  constructor(level: Level) {
    super(level);

    for (let y = 0; y < 14; y++) {
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
}