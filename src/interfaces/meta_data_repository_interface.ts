import { MetaBlock } from "../enities/meta_block";

export interface MetaDataRepositoryInterface {
	fetchMetaBlocks(stageName: string): MetaBlock[];
}
