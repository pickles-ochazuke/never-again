import { Actor } from "./actor";

export abstract class Level {

  /**
   * 1タイルの横幅(pixel)
   */
  tileWidth: number = 32;

  /**
   * 1タイルの縦幅(pixel)
   */
  tileHeight: number = 32;
  
  /**
   * このレベルのルートエンティティ
   * シーンのロードが終わったときに初めに初期化されるので、
   * null になることはない
   */
  protected _entity!: g.E;

  /**
   * このレベルのシーン
   * シーンとレベルは1対1の関係
   */
  protected _scene: g.Scene;
  get scene() {
    return this._scene;
  }

  /**
   * このレベルで使うアセットIDを持つ
   */
  protected assetIds: string[];

  /**
   * このゲームの横幅
   */
  private _width: number;
  get width() {
    return this._width;
  }

  /**
   * このゲームの縦幅
   */
  private _height: number;
  get height() {
    return this._height;
  }

  /**
   * このシーンに登場するアクター
   * 継承先のレベルで追加する
   */
  protected actors: Actor[];

  /**
   * ゲームオーバーを表すフラグ
   * ゲームオーバーは onGameoverメソッドで更新する
   */
  private _gameover = false;
  get gameover() {
    return this._gameover;
  }

  /**
   * そのレベルをクリアしたことを表すフラグ
   */
  goal = false;

  /**
   * レベルは、ゲーム内の1ステージを表す。
   * レベルが描画内容を持つため、使い方はステージに限らない。
   * 例えば、移動画面や戦闘画面などの画面としても表現できる。
   * @param game このゲームのインスタンス
   * @param assetIds このレベルで使用するアセットIDの配列
   */
  constructor(game: g.Game, assetIds: string[]) {

    this._width = game.width;
    this._height = game.height;
    this.assetIds = assetIds;
    this.actors = [];

    this._scene = new g.Scene({
      game: game,
      assetIds: this.assetIds
    });

    this._scene.loaded.add(() => {
      this._entity = new g.E({scene: this.scene});
      this.initialize();
    });

    this.scene.update.add(() => this.update());
  }

  /**
   * レベルの初期化処理
   * シーンのロードが完了したときに実行する初期化処理
   * 最初に必要なアクターの配置はここで行う
   */
  abstract initialize(): void;

  /**
   * レベルの更新処理
   * 毎フレームレベルで行いたい処理はここで行う
   */
  abstract update(): void;

  /**
   * レベルに追加したいエンティティを指定する
   * @param entity 追加したいエンティティ
   */
  append(entity: g.E): void {
    this._entity.append(entity);
  }

  /**
   * 取得したいアクターを指定するとそのアクターの配列が返ってくる
   * @param isType 型ガードの関数を渡す
   */
  filterActors<T extends Actor>(isType: (a: Actor) => a is T): T[] {
    return this.actors.filter(isType);
  }

  /**
   * ゲームオーバーになったときに呼ぶ
   */
  onGameover(): void {
    this._gameover = true;
  }
}