import { Vector2 } from '../src/domains/vector2';

describe('Vector2', () => {
  it('引数なしで生成すると、初期値はx, yともに0であるべき', () => {
    const vector = new Vector2();

    expect(vector.x).toBe(0);
    expect(vector.y).toBe(0);
  });

  it('引数を指定すると、その値を持ったベクトルが作られるべき', () => {
    const vector = new Vector2(10, -9);

    expect(vector.x).toBe(10);
    expect(vector.y).toBe(-9);
  });
});