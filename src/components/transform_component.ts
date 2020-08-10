import { Component } from "../bases/component";
import { Vector2 } from "../domains/vector2";

export class TransformComponent extends Component {

  position: Vector2 = new Vector2();

  update(): void {
  }

  move(v: Vector2): void {
    this.position.plus(v);
  }
}