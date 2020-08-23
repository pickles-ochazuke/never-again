import { BackgroundActor } from "../actors/background_actor";
import { BlockActor } from "../actors/block_actor";
import { ControllerActor } from "../actors/controller_actor";
import { GoalBlockActor } from "../actors/goal_block_actor";
import { GoalEventActor } from "../actors/goal_event_actor";
import { PlayerActor } from "../actors/player_actor";
import { StartEventActor } from "../actors/start_event_actor";
import { TileActor } from "../actors/tile_actor";
import { MetaDataRepositoryInterface } from "../interfaces/meta_data_repository_interface";
import { JsonRepository } from "../repositories/json_repository";
import { Vector2 } from "../utils/vector2";
import { NeverAgainLevel } from "./never_again_level";
import { Layer } from "../bases/layer";
import { range } from "../utils/utils";

export class FirstLevel extends NeverAgainLevel {
	private sounded = false;

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

	initialize(): void {
		
		this.tiles = [];
		this.stepedOns = [];
		this.layers = [];

		// メタデータの取得
		const repository: MetaDataRepositoryInterface = new JsonRepository(this.scene);

		// 背景の作成
		this.actors.push(new BackgroundActor(this));

		// 床の層
		this.floorLayer = new Layer(this.scene);

		this.floorLayer.appends(range(15*14).map(index => {
			const x = index % 15;
			const y = Math.floor(index / 15);

			const tile = new TileActor(this, x, y);
			this.tiles.push(tile);
			return tile;
		}));

		this.appendLayer(this.floorLayer, "Floor");

		// 障害物の作成
		const metas = repository.fetchMetaBlocks("stage1");
		const blocks: BlockActor[] = [];
		metas.forEach(meta => blocks.push(new BlockActor(this, meta.position.x, meta.position.y)));
		this.actors.push(...blocks);

		// スタートとゴールの位置を作成
		// スタートとゴールは常に真ん中の下と上にする。
		const startPosition: Vector2 = new Vector2(7, 13);
		const goalPosition: Vector2 = new Vector2(7, 0);

		// エリアの外側をブロックで囲む
		const walls: BlockActor[] = this.generateWalls(15, 14, startPosition, goalPosition);
		walls.forEach(wall => this.actors.push(wall));

		// ゴール手前のブロック
		const goalBlock = new GoalBlockActor(this, goalPosition.x, goalPosition.y + 1);
		this.actors.push(goalBlock);
		walls.push(goalBlock);

		// プレイヤーの作成
		this._player = new PlayerActor(this);
		this.player.move(startPosition);
		this.actors.push(this.player);

		// UIの作成
		const controller = new ControllerActor(this, g.game.width, g.game.height * 0.3);
		controller.setPosition(0, g.game.height * 0.7);
		this.actors.push(controller);

		// 開始イベント
		const startEvent = new StartEventActor(this, startPosition.x, startPosition.y);
		this.actors.push(startEvent);

		// 終了イベント
		const goalEvent = new GoalEventActor(this, goalPosition.x, goalPosition.y);
		this.actors.push(goalEvent);

		// 通らなくて良い場所
		const notSteps: Vector2[] = [
			...blocks.map(block => new Vector2(block.x, block.y)),
			...walls.map(wall => new Vector2(wall.x, wall.y)),
			startPosition,
			goalPosition
		];

		// 全ての道を出す
		for (let y = 0; y < 14; y++) {
			for (let x = 0; x < 15; x++) {
				this.stepedOns.push(new Vector2(x, y));
			}
		}
		// ブロックやスタートとゴールがあるところは除く
		this.stepedOns = this.stepedOns.filter(el => {
			const found = notSteps.some(step => step.x === el.x && step.y === el.y);
			return !found; // notSteps にない場所は、通過すべき場所
		});

		this.scene.append(this._entity);

		// ゲームの開始を告げる音と音楽を鳴らす
		(this.scene.assets.bgm as g.AudioAsset).play();
	}

	update(): void {
		if (this.gameover && !this.sounded) {
			(this.scene.assets.bgm as g.AudioAsset).stop();
			(this.scene.assets.gameover as g.AudioAsset).play();
			(this.scene.assets.gameover_bgm as g.AudioAsset).play();
			this.sounded = true;
		}

		if (this.goal && !this.sounded) {
			(this.scene.assets.bgm as g.AudioAsset).stop();
			(this.scene.assets.goal_bgm as g.AudioAsset).play();
			this.sounded = true;
		}
	}

	generateTiles(tileX: number, tileY: number) {
		let ary = [];
		for (let y = 0; y < tileY; y++) {
			for (let x = 0; x < tileX; x++) {
				const tileActor = new TileActor(this, x, y);
				ary.push(tileActor);
			}
		}

		return ary;
	}
}
