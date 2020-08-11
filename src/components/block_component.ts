import { RendererComponent } from "./renderer_component";

export class BlockComponent extends RendererComponent {
  
  private _width = 32;
  get width() {
    return this._width;
  }

  private _height = 32;
  get height() {
    return this._height;
  }
  
  update(): void {
    // 何もしない
  }

  generate(): g.E {
    return new g.FilledRect({
			scene: this.level.scene,
			cssColor: "#000000",
			width: 32,
			height: 32
		});
  }
}