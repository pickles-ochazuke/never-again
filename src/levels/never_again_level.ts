import { BlockActor } from "../actors/block_actor";
import { FloorActor } from "../actors/floor_actor";
import { PlayerActor } from "../actors/player_actor";
import { TileActor } from "../actors/tile_actor";
import { Layer, LayerTag } from "../bases/layer";
import { Level } from "../bases/level";
import { Vector2 } from "../utils/vector2";

export abstract class NeverAgainLevel extends Level {

	protected _player!: PlayerActor;
	get player() {
		return this._player;
	}

	protected floorLayer!: Layer;
	protected tiles!: TileActor[];

	// 通過すべき座標
	protected stepedOns!: Vector2[];

	/**
   * 各層を持つ
   * appendLayerで追加する
   */
	layers!: {layer: Layer; tag: LayerTag}[];

	constructor(game: g.Game, assetIds: string[]) {
		super(game, assetIds);
	}

	generateWalls(x: number, y: number, start: Vector2, goal: Vector2) {

		const ary: BlockActor[] = [];
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
					ary.push(new BlockActor(this, column, row));
			}
		}
		return ary;
	}

	// 通過すべき場所を全て通過しているなら true を返す
	isAllStepedOn(): boolean {

		let bool = false;
		for (const index in this.stepedOns) {
			const condition = (it: Vector2) => (it.x === this.stepedOns[index].x) && (it.y === this.stepedOns[index].y);

			bool = this.player.stepedOns.some(condition);

			if (!bool) {
				break;
			}
		}
		return bool;
	}

	stepOn(position: Vector2) {
		const floor = this.tiles.filter(tile => (tile.x === position.x) && (tile.y === position.y));
		floor[0].stepOn();
	}

	/**
   * このレベルにレイヤーを追加する
   * @param layer 追加するレイヤー
   * @param tag レイヤーの種別
   */
	appendLayer(layer: Layer, tag: LayerTag): void {
		this._entity.append(layer.entity);
		this.layers.push({layer, tag});
	}

}
