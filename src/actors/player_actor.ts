import { Actor } from "../bases/actor";
import { TransformComponent } from "../components/transform_component";
import { Block } from "../domains/block";
import { Vector2 } from "../domains/vector2";
import { PlayerComponent } from "../components/player_component";
import { Level } from "../bases/level";

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
  private blocks: Block[] = [];

  constructor(level: Level) {
    super(level);

    this._entity.width = 32;
    this._entity.height = 32;

    this.transform = new TransformComponent(this);
    this.addComponent(this.transform);
    this.player = new PlayerComponent(this);
    this.addComponent(this.player);
  }

  updateActor(): void {

    this.transform.move(this.vector);

		// 衝突判定
		this.blocks.forEach(block => {
      // ぶつかっていたら元の場所に戻る
			if (this.isInto(block)) {
				this.transform.move(this.vector.inverse());
			}
		});

    this.vector.initialize();
    this.positionUpdate();
  }

  /**
   * 壁とぶつかっているならtrueを返す
   * @param block 確認する対象
   */
  isInto(block: Block): boolean {
    return (this.position.x === block.x) && (this.position.y === block.y)
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
}