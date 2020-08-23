import { FirstLevel } from "./levels/first_leve";
import { PlaygroundLevel } from "./levels/playground_level";

function main(param: g.GameMainParameterObject): void {

	const level = new FirstLevel(g.game);
	// const level = new PlaygrounLevel(g.game);

	console.log("Game Start!!");
	g.game.pushScene(level.scene);
}

export = main;
