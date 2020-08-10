import { Actor } from "./actor";

export abstract class Component {

	protected actor: Actor;

	// （このコンポーネントが登録されている）アクターが登録されているシーンを取得する
	protected get scene(): g.Scene {
		return this.actor.scene;
	}

	constructor(actor: Actor) {
		this.actor = actor;
	}

	/**
	 * updateメソッドは、登録しているアクターから呼び出される
	 * Actorクラスが呼び出しているので、開発者が明示的に呼び出す必要はない
	 */
	abstract update(): void;
}
