import { Game } from '../src/domains/game';

describe('Game のテスト', () => {
  it('インスタンスが作れるべき', () => {
    const game = new Game();

    expect(game).not.toBeUndefined()
  });
});