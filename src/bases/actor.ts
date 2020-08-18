import { Component } from "./component";
import { Level } from "./level";

export abstract class Actor {
	// このアクターで毎フレーム更新するために必要
	// 描画のためのコンポーネントは、このエンティティに登録する
	protected _entity: g.E;

	// このアクターが登録されているシーン
	private _level: Level;
	get level(): Level {
		return this._level;
	}

	// このアクターに登録されているコンポーネントたち
	private components: Component[] = [];

	constructor(level: Level) {
		this._level = level;

		// シーンに登録するために、必ず g.E のインスタンスが必要
		this._entity = new g.E({ scene: this.level.scene });

		// 更新処理を登録する（ラムダ式にしてるのは、このインスタンスをクロージャで保持するため）
		this._entity.update.add(() => this.update());

		// シーンに追加する（エンティティを登録することは、このインスタンスを登録することを意味する）
		this.level.append(this._entity);
	}

	/**
	 * アクターにコンポーネントを追加する
	 * このメソッドをオーバライドしてはいけない
	 * @param component このアクターに追加したいコンポーネント
	 */
	addComponent(component: Component): void {
		this.components.push(component);
	}

	/**
	 * 欲しいコンポーネントの型ガードを渡すとそのコンポーネントの配列が返ってくる
	 * @param isType 探しているコンポーネント型の型ガード
	 */
	findComponent<T extends Component>(isType: (a: Component) => a is T ): T[] {
		return this.components.filter(isType);
	}

	/**
	 * 描画関係のコンポーネントは、このメソッドを使ってエンティティを登録する
	 * このメソッドをオーバライドしてはいけない
	 * @param e 追加するエンティティ
	 */
	appendEntity(e: g.E): void {
		this._entity.append(e);
	}

	/**
	 * 引数先のエンティティにこのアクターのエンティティを登録する
	 * すでにエンティティを登録済みの場合、そのエンティティからは離れる
	 * @param e append する先
	 */
	appendTo(e: g.E): void {
		e.append(this._entity);
	}

	/**
	 * アクターの更新処理を行う
	 * 登録されているコンポーネントの更新処理も呼び出す
	 * このメソッドはオーバライドしてはいけない
	 */
	private update(): void {
		this.updateComponents();
		this.updateActor();
		this._entity.modified();
	};

	/**
	 * 登録されているコンポーネントを全て更新する
	 * このメソッドをオーバライドしてはいけない
	 */
	private updateComponents(): void {
		this.components.forEach(component => component.update());
	};

	/**
	 * アクターが毎フレームで行うべき更新処理は、ここに実装する
	 */
	abstract updateActor(): void;
}
