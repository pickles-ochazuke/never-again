import { Game } from '../src/game';

describe('Game のテスト', () => {
  it('インスタンスが作れるべき', () => {
    const game = new Game();

    expect(game).not.toBeUndefined()
  });
});