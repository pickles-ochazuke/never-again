import { Actor } from "../bases/actor";
import { Level } from "../bases/level";
import { PlayerComponent } from "../components/player_component";
import { TransformComponent } from "../components/transform_component";
import { NeverAgainLevel } from "../levels/never_again_level";
import { Vector2 } from "../utils/vector2";
import { BlockActor } from "./block_actor";

export class PlayerActor extends Actor {

	// このプレイヤーの移動を担当する
	private transform: TransformComponent;

	private get position() {
		return this.transform.position;
	}

	public get x() {
		return this.position.x;
	}

	public get y() {
		return this.position.y;
	}

	// 描画を担当する
	private player: PlayerComponent;

	// プレイヤーのフレーム内の移動量（毎フレーム初期化する）
	private vector = new Vector2();

	// シーン内のブロック（ブロックの数は、シーン内で固定）
	private blocks: BlockActor[] = [];

	// プレイヤーが歩いたところ
	private _stepedOns: Vector2[] = [];
	get stepedOns() {
		return this._stepedOns;
	}

	moved = false;

	constructor(level: Level) {
		super(level);

		this._entity.width = 32;
		this._entity.height = 32;

		this.transform = new TransformComponent(this);
		this.addComponent(this.transform);
		this.player = new PlayerComponent(this);
		this.addComponent(this.player);

		this.blocks = this.level.filterActors<BlockActor>((a): a is BlockActor => a instanceof BlockActor);
	}

	updateActor(): void {

		this.transform.move(this.vector);
		const length = (this.vector.x * this.vector.x) + (this.vector.y * this.vector.y);
		if (length > 0) {
			this.moved = true;
		}

		// 衝突判定
		this.blocks.filter(block => block.activated).forEach(block => {
			// ぶつかっていたら元の場所に戻る
			if (this.isInto(block)) {
				this.transform.move(this.vector.inverse());
				this.moved = false;
			}
		});

		// 歩いたところを記録する
		this.addStepedOn(this.x, this.y);

		this.moved = false;
		this.vector.initialize();
		this.positionUpdate();
	}

	/**
   * 壁とぶつかっているならtrueを返す
   * @param block 確認する対象
   */
	isInto(block: BlockActor): boolean {
		return (this.position.x === block.x) && (this.position.y === block.y);
	}

	move(value: Vector2) {
		this.vector = value;
	}

	/**
   * プレイヤーの描画位置を更新する
   */
	private positionUpdate() {
		this._entity.x = this.x * this._entity.width;
		this._entity.y = this.y * this._entity.height;
	}

	private addStepedOn(x: number, y: number): void {

		// すでに同じ場所を通っている場合は、追加しない
		for (const index in this._stepedOns) {
			if (this._stepedOns[index].x === x && this._stepedOns[index].y === y) {
				if (this.moved) {
					this.level.onGameover();
				}
				return;
			}
		}

		const position = new Vector2(x, y);
		this._stepedOns.push(position);
		(this.level as NeverAgainLevel).stepOn(position);
	}
}
