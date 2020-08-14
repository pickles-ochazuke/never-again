import { Level } from "../bases/level";
import { BlockActor } from "./block_actor";
import { NeverAgainLevel } from "../levels/never_again_level";

export class GoalBlockActor extends BlockActor {

  private sounded = false;

  constructor(level: Level, x: number, y: number) {
    super(level, x, y);
  }

  updateActor(): void {
    // プレイヤーが通過すべき場所を全て通過していたら非活性にする
    if ((this.level as NeverAgainLevel).isAllStepedOn()) {
      this.block.deactivate();
      
      if (!this.sounded) {
        (this.level.scene.assets["open"] as g.AudioAsset).play();
        this.sounded = true;
      }
    }
  }
}