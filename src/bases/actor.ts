import { Component } from "./component";

export abstract class Actor {
	// このアクターで毎フレーム更新するために必要
	// 描画のためのコンポーネントは、このエンティティに登録する
	protected _entity: g.E;

	// このアクターが登録されているシーン
	private _scene: g.Scene;
	get scene(): g.Scene {
		return this._scene;
	}

	// このアクターに登録されているコンポーネントたち
	private components: Component[] = [];

	constructor(scene: g.Scene) {
		this._scene = scene;

		// シーンに登録するために、必ず g.E のインスタンスが必要
		this._entity = new g.E({ scene: this.scene });

		// 更新処理を登録する（ラムダ式にしてるのは、このインスタンスをクロージャで保持するため）
		this._entity.update.add(() => this.update());

		// シーンに追加する（エンティティを登録することは、このインスタンスを登録することを意味する）
		this.scene.append(this._entity);
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
