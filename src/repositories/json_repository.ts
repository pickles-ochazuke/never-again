import { Vector2 } from "../utils/vector2";
import { MetaDataRepositoryInterface } from "../interfaces/meta_data_repository_interface";
import { MetaBlock } from "../enities/meta_block";

export class JsonRepository implements MetaDataRepositoryInterface {

	metaBlocks: MetaBlock[] = [];

	constructor(private readonly scene: g.Scene) {
	}

	private load(stage: string): void {
		this.metaBlocks = this.createBlocks(this.scene.assets[stage] as g.TextAsset);
	}

	fetchMetaBlocks(stageName: string): MetaBlock[] {
		this.load(stageName);
		return this.metaBlocks;
	}

	createBlocks(asset: g.TextAsset): MetaBlock[] {
		const metas = this.parse(asset).Blocks as any[];
		return metas.map(meta => <MetaBlock>{position: new Vector2(meta.x, meta.y)});
	}

	parse(asset: g.TextAsset): any {
		return JSON.parse(asset.data);
	}
}
