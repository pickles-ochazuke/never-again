import { Actor } from "../bases/actor"
import { Level } from "../bases/level";
import { PlayerActor } from "./player_actor";
import { LabelComponent } from "../components/label_component";
import { TransformComponent } from "../components/transform_component";
import { Vector2 } from "../utils/vector2";

export class GoalEventActor extends Actor {

  private transform: TransformComponent;
  private player: PlayerActor;
  private label: LabelComponent;

  constructor(level: Level, x: number, y: number) {
    super(level);

    const players = this.level.filterActors<PlayerActor>((a: Actor): a is PlayerActor => a instanceof PlayerActor);
    this.player = players[0];

    this.label = new LabelComponent(this, "GOAL !!");
    this.addComponent(this.label);

    this.transform = new TransformComponent(this);
    this.transform.move(new Vector2(x, y));
    this.addComponent(this.transform);
  }

  updateActor(): void {
    if (this.player.x === this.transform.position.x && this.player.y === this.transform.position.y) {
      this.label.show();
    } else {
      this.label.hide();
    }
  }
}