import { Level } from "./bases/level";

function main(param: g.GameMainParameterObject): void {

	const level = new Level();
	level.initialize();

	console.log("Game Start!!");
	g.game.pushScene(level.scene);
}

export = main;