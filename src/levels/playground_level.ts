import { TileActor } from "../actors/tile_actor";
import { Layer } from "../bases/layer";
import { range } from "../utils/utils";
import { NeverAgainLevel } from "./never_again_level";

export class PlaygroundLevel extends NeverAgainLevel {

	constructor(game: g.Game) {
		super(game, []);
	}

	initialize(): void {

		// 各層を作成する
		// 床の層
		this.floorLayer = new Layer(this.scene);

		this.floorLayer.appends(range(15*14).map(index => {
			const x = index % 15;
			const y = Math.floor(index / 15);

			const tile = new TileActor(this, x, y);

			return tile;
		}));

		this.appendLayer(this.floorLayer, "Floor");
		
		// イベントの層
		

		// キャラクターの層

		// UI層
		
		this.scene.append(this._entity);
	}

	update(): void {
	}
}
