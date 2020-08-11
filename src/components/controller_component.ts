import { RendererComponent } from "./renderer_component";
import { Vector2 } from "../utils/vector2";
import { PlayerActor } from "../actors/player_actor";
import { ControllerActor } from "../actors/controller_actor";

export class ControllerComponent extends RendererComponent {

  private player: PlayerActor;
  private entity!: g.E;
  private right!: g.FilledRect;
  private left!: g.FilledRect;
  private top!: g.FilledRect;
  private bottom!: g.FilledRect;

  constructor(actor: ControllerActor, player: PlayerActor) {
    super(actor);

    this.player = player;
  }

  update(): void {
  }

  getActor(): ControllerActor {
    return this.actor as ControllerActor;
  }

  generate(): g.E {

    const centerX = this.getActor().width / 2;
    const centerY = this.getActor().height / 2;
  
    this.right = new g.FilledRect({
      scene: this.level.scene,
      cssColor: "#FF0000",
      width: 32,
      height: 32,
      x: centerX + 16,
      y: centerY + 0,
      touchable: true
    });
  
    this.left = new g.FilledRect({
      scene: this.level.scene,
      cssColor: "#00FF00",
      width: 32,
      height: 32,
      x: centerX - (16 + 32),
      y: centerY + 0,
      touchable: true
    });
  
    this.top = new g.FilledRect({
      scene: this.level.scene,
      cssColor: "#0000FF",
      width: 32,
      height: 32,
      x: centerX - 16,
      y: centerY - 32,
      touchable: true
    });
  
    this.bottom = new g.FilledRect({
      scene: this.level.scene,
      cssColor: "#FFFF00",
      width: 32,
      height: 32,
      x: centerX - 16,
      y: centerY + 32,
      touchable: true
    });

    		// Right
		this.right.pointDown.add(() => {
			this.right.cssColor = "black";
			this.right.modified();
			this.moveRight();
		});
		this.right.pointUp.add(() => {
			this.right.cssColor = "#FF0000";
			this.right.modified();
		});

		// Left
		this.left.pointDown.add(() => {
			this.left.cssColor = "black";
			this.left.modified();
			this.moveLeft();
		});
		this.left.pointUp.add(() => {
			this.left.cssColor = "#00FF00";
			this.left.modified();
		});

		// Top
		this.top.pointDown.add(() => {
			this.top.cssColor = "black";
			this.top.modified();
			this.moveTop();
		});
		this.top.pointUp.add(() => {
			this.top.cssColor = "#0000FF";
			this.top.modified();
		});

		// Bottom
		this.bottom.pointDown.add(() => {
			this.bottom.cssColor = "black";
			this.bottom.modified();
			this.moveBottom();
		});
		this.bottom.pointUp.add(() => {
			this.bottom.cssColor = "#FFFF00";
			this.bottom.modified();
		});
 
    this.entity = new g.E({scene: this.level.scene});
		this.entity.append(this.right);
		this.entity.append(this.left);
		this.entity.append(this.top);
    this.entity.append(this.bottom);
    
    return this.entity;
  }

  moveRight() {
    if (!this.level.gameover) {
      this.player.move(new Vector2(1, 0));
      (this.level.scene.assets["walk"] as g.AudioAsset).play();
      (this.level.scene.assets["open"] as g.AudioAsset).play();  
    }
	}

	moveLeft() {
    if (!this.level.gameover) {
      this.player.move(new Vector2(-1, 0));
      (this.level.scene.assets["walk"] as g.AudioAsset).play();
    }
	}

	moveTop() {
    if (!this.level.gameover) {
      this.player.move(new Vector2(0, -1));
      (this.level.scene.assets["walk"] as g.AudioAsset).play();
    }
	}

	moveBottom() {
    if (!this.level.gameover) {
      this.player.move(new Vector2(0, 1));
      (this.level.scene.assets["walk"] as g.AudioAsset).play();
    }
	}
}