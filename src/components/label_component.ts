import { RendererComponent } from "./renderer_component";
import { Actor } from "../bases/actor";

export class LabelComponent extends RendererComponent {

  private font!: g.DynamicFont;
  private label!: g.Label;
  private visible: boolean = true;

  constructor(actor: Actor, str: string) {
    super(actor);

    this.label.text = str;
    this.label.invalidate();
  }

  show(): void {
    this.visible = true;
  }

  hide(): void {
    this.visible = false;
  }

  update(): void {
    if (this.visible) {
      this.label.show();
    }
    else {
      this.label.hide();
    }
  }
  
  generate(): g.E {
		this.font = new g.DynamicFont({
			game: g.game,
			fontFamily: g.FontFamily.Serif,
			size: 32
    });
    
		this.label = new g.Label({
			scene: this.level.scene,
			font: this.font,
			text: "SSSS",
			fontSize: 32,
			textColor: "White"
    });
    
    return this.label;
  }

}