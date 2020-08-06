import { Block } from "./block";

export class Game {

	private _blocks: Block[] = [];
	get blocks(): Block[] {
		return this._blocks;
	}

	constructor() {

	}

	addBlock(block: Block) {
		this._blocks.push(block);
	}

	addBlocks(blocks: Block[]) {
		this.blocks.push(...blocks);
	}
}
