// NOTE: スクリプトアセットとして実行される環境をエミュレーションするためにglobal.gを生成する
(global as any).g = require("@akashic/akashic-engine");

describe("mainScene", () => {
  beforeEach(() => {
  });

  afterEach(() => {
  });

  it("example", () => {
    expect(g).not.toBeUndefined();

    const game = new g.Game()
    const scene = new g.Scene({game: g.game});
  });
});
