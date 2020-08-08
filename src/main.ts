import { Block } from "./domains/block";
import { Controller } from "./domains/controller";
import { Game } from "./domains/game";
import { Player } from "./domains/player";
import { Ui } from "./domains/ui";
import { MetaDataRepositoryInterface } from "./interfaces/meta_data_repository_interface";
import { MetaBlock } from "./meta_block";
import { JsonRepository } from "./repositories/json_repository";
import { Vector2 } from "./domains/vector2";

function main(param: g.GameMainParameterObject): void {
	const scene = new g.Scene({
		game: g.game,
		assetIds: ["stage1"]
	});

	console.log("Game Start!!");

	scene.loaded.add(() => {

		const game = new Game();

		/**
     * 描画対象を各層に分ける
     * 層は全部で6つ
     * UI
     * 天井
     * キャラクター
     * イベント
     * タイル（床）
     * バックグラウンド
     * 上の層は下の層を覆い隠す。
     */
		// 背景の層
		const background = createBackground(scene);
		scene.append(background);

    // 床の層
		const floor = createFloor(scene, 15, 14);
    scene.append(floor);

    // イベント層
    const events = new g.E({ scene: scene });
    // スタートとゴールを作成
    // スタートとゴールは常に真ん中の下と上にする。
    const startPosition: Vector2 = new Vector2(7, 13);
    const goalPosition: Vector2 = new Vector2(7, 0);

    const start = new g.FilledRect({ scene: scene, x: startPosition.x*32, y: startPosition.y*32, width: 32, height: 32, cssColor: "Blue"});
    events.append(start);

    const goal = new g.FilledRect({ scene: scene, x: goalPosition.x*32, y: goalPosition.y*32, width: 32, height: 32, cssColor: "Green"});
    events.append(goal);
    scene.append(events);
    
		// キャラクター層
		const characters = new g.E({ scene: scene });
		const player = new Player(game, scene, startPosition.x, startPosition.y);
		characters.append(player.entity);

		const repository: MetaDataRepositoryInterface = new JsonRepository(scene);
		const metas = repository.fetchMetaBlocks("stage1");

		const blocks = generateBlocks(metas, scene);
		game.addBlocks(blocks);
		blocks.forEach(block => characters.append(block.entity));

    // エリアの外側をブロックで囲む
    const walls: Block[] = generateWalls(15, 14, startPosition, goalPosition, scene);
    walls.forEach(wall => characters.append(wall.entity));

		scene.append(characters);

		// UI層
		const ui = createUi(scene, player);
		scene.append(ui.entity);
	});

	g.game.pushScene(scene);
}

export = main;

/** **************************************************
 * その他の関数
 */

function createUi(scene: g.Scene, player: Player): Ui {

	const ui = new Ui(scene);

	const controller = createPlayerController(scene, player, ui);

	ui.controller = controller;

	return ui;
}

function createPlayerController(scene: g.Scene, player: Player, parent: Ui): Controller {

	const centerX = parent.width / 2;
	const centerY = parent.height / 2;

	const right = new g.FilledRect({
		scene: scene,
		cssColor: "#FF0000",
		width: 32,
		height: 32,
		x: centerX + 16,
		y: centerY + 0,
		touchable: true
	});

	const left = new g.FilledRect({
		scene: scene,
		cssColor: "#00FF00",
		width: 32,
		height: 32,
		x: centerX - (16 + 32),
		y: centerY + 0,
		touchable: true
	});

	const top = new g.FilledRect({
		scene: scene,
		cssColor: "#0000FF",
		width: 32,
		height: 32,
		x: centerX - 16,
		y: centerY - 32,
		touchable: true
	});

	const bottom = new g.FilledRect({
		scene: scene,
		cssColor: "#FFFF00",
		width: 32,
		height: 32,
		x: centerX - 16,
		y: centerY + 32,
		touchable: true
	});

	return new Controller(right, left, top, bottom, scene, player);
}

function createBackground(scene: g.Scene): g.E {

	const background = new g.FilledRect({
		scene: scene,
		cssColor: "#FFFFFF",
		width: g.game.width,
		height: g.game.height,
	});

	// 縦の線
	const columnLine = new g.FilledRect({
		scene: scene,
		cssColor: "#000000",
		width: 1,
		height: g.game.height,
		x: g.game.width / 2,
		y: 0
	});

	background.append(columnLine);

	return background;
}

function generateBlocks(metas: MetaBlock[], scene: g.Scene) {
	return metas.map(meta => createBlock(scene, meta.position.x, meta.position.y));
}

function generateWalls(x: number, y: number, start: Vector2, goal: Vector2, scene: g.Scene) {
  
  const ary: Block[] = [];
  for (let row = 0; row < y; row++) {
    for (let column = 0; column < x; column++) {
      if ((column === start.x && row === start.y) || (column === goal.x && row === goal.y)) {
        continue;
      }
      
      if (
        (column === 0) ||
        (column === x-1) ||
        (row === 0) ||
        (row === y-1)
        )
      ary.push(new Block(column, row, scene));
    }
  }
  return ary;
}

function createBlock(scene: g.Scene, x: number = 0, y: number = 0): Block {

	return new Block(x, y, scene);
}

function createFloor(scene: g.Scene, tilesX: number, tilesY: number): g.E {

	const floor = new g.E({
		scene: scene,
		width: g.game.width,
		height: g.game.height * 0.6
	});

	for (let y = 0; y < tilesY; y++) {
		for (let x = 0; x < tilesX; x++) {
			floor.append(createTile(scene, floor, x, y));
		}
	}

	return floor;
}

function createTile(scene: g.Scene, parent: g.E, tileX: number, tileY: number): g.E {
	const e = new g.E({scene: scene});

	const width = 32;
	const height = 32;

	const frame = new g.FilledRect({
		scene: scene,
		cssColor: "#000000",
		width: width,
		height: height,
		x: tileX * width,
		y: tileY * height
	});
	e.append(frame);

	const filled = new g.FilledRect({
		scene: scene,
		cssColor: "#C71585",
		width: width - 2,
		height: height - 2,
		x: frame.x + 1,
		y: frame.y + 1
	});
	e.append(filled);

	return e;
}
