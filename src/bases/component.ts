import { Actor } from "./actor";
import { Level } from "./level";

export abstract class Component {

	protected actor: Actor;

	// （このコンポーネントが登録されている）アクターが登録されているレベルを取得する
	protected get level(): Level {
		return this.actor.level;
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
