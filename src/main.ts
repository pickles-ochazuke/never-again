import { FirstLevel } from "./levels/first_leve";

function main(param: g.GameMainParameterObject): void {

	const level = new FirstLevel(g.game);

	console.log("Game Start!!");
	g.game.pushScene(level.scene);
}

export = main;