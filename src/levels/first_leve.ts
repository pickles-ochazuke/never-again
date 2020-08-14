import { Level } from "../bases/level";

export class FirstLevel extends Level {

  constructor(game: g.Game) {
    super(game, [
      "stage1",
      "bgm",
      "start",
      "walk",
      "gameover",
      "goal",
      "open",
      "walk",
      "gameover_bgm",
      "goal_bgm"
    ]);
  }
}