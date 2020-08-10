
/**
 * 2Dのベクトル（長さや大きさ）を表すクラス
 */
export class Vector2 {

	get x() {
		return this._x;
	}
	get y() {
		return this._y;
	}

	constructor(
		private _x = 0,
		private _y = 0
	) {
	}

	/**
   * ベクトル値を初期化する
   */
	initialize() {
		this._x = 0;
		this._y = 0;
	}

	plus(vector: Vector2) {
		this._x = vector._x;
		this._y = vector._y;
	}

	/**
	 * 逆ベクトルを返す
	 */
	inverse(): Vector2 {
		return new Vector2(-this._x, -this._y);
	}
}
