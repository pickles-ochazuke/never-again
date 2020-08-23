import { TileActor } from "../actors/tile_actor";
import { Layer } from "../bases/layer";
import { range } from "../utils/utils";
import { NeverAgainLevel } from "./never_again_level";

export class PlaygroundLevel extends NeverAgainLevel {

	floorLayer: Layer | null = null;

	constructor(game: g.Game) {
		super(game, []);
	}

	initialize(): void {

		this.floorLayer = new Layer(this.scene);

		this.floorLayer.appends(range(15*14).map(index => {
			const x = index % 15;
			const y = Math.floor(index / 15);

			const tile = new TileActor(this, x, y);

			return tile;
		}));

		this.appendLayer(this.floorLayer, "Floor");
		this.scene.append(this._entity);
	}

	update(): void {
	}
}
