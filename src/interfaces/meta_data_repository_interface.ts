import { MetaBlock } from "../meta_block";

export interface MetaDataRepositoryInterface {
	fetchMetaBlocks(stageName: string): MetaBlock[];
}
