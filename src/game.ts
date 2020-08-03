import { Player } from "./player";

export class Game {

  private _blocks: g.E[] = [];
  get blocks(): g.E[] { return this._blocks; }

  constructor() {

  }

  addBlock(block: g.E) {
    this._blocks.push(block);
  }
}