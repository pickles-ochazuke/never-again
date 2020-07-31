function main(param: g.GameMainParameterObject): void {
  const scene = new g.Scene({game: g.game});

  scene.loaded.add(() => {
    // 以下にゲームのロジックを記述します。

    const e = new g.E({scene});

    const background = new g.FilledRect({
      scene: scene,
      cssColor: "#FFFFFF",
      width: g.game.width,
      height: g.game.height,
    });

    e.append(background);

    // Player
    const rect = new g.FilledRect({
      scene: scene,
      cssColor: "#ff0000",
      width: 32,
      height: 32,
      touchable: true
    });

    // 移動UI
    const playerController = createPlayerController(scene, rect);
    e.append(playerController);

    // scene.pointDownCapture.add(() => {
    //   rect.cssColor = "blue";
    //   rect.modified();
    // });

    // scene.pointUpCapture.add(() => {
    //   rect.cssColor = "gray";
    //   rect.modified();
    // });

    rect.update.add(() => {
      // 以下のコードは毎フレーム実行されます。
      // rect.x++;
      // if (rect.x > g.game.width) rect.x = 0;
      // rect.modified();
    });

    e.append(rect);

    scene.append(e);
  });

  g.game.pushScene(scene);
}

export = main;

function createPlayerController(scene: g.Scene, player: g.E): g.E {

  const centerX = g.game.width / 2;
  const centerY = g.game.height / 2;

  const right = new g.FilledRect({
    scene: scene,
    cssColor: "#FF0000",
    width: 32,
    height: 32,
    x: centerX + 32,
    y: centerY + 0,
    touchable: true
  });

  right.pointDown.add(() => {
    right.cssColor = "black";
    right.modified();

    player.x += player.width;
    player.modified();
  });

  right.pointUp.add(() => {
    right.cssColor = "#FF0000";
    right.modified();
  });

  const left = new g.FilledRect({
    scene: scene,
    cssColor: "#00FF00",
    width: 32,
    height: 32,
    x: centerX - 32,
    y: centerY + 0,
    touchable: true
  });

  left.pointDown.add(() => {
    left.cssColor = "black";
    left.modified();

    player.x -= player.width;
    player.modified();
  });

  left.pointUp.add(() => {
    left.cssColor = "#00FF00";
    left.modified();
  });

  const top = new g.FilledRect({
    scene: scene,
    cssColor: "#0000FF",
    width: 32,
    height: 32,
    x: centerX + 0,
    y: centerY + 32,
    touchable: true
  });

  top.pointDown.add(() => {
    top.cssColor = "black";
    top.modified();

    player.y += player.height;
    player.modified();
  });

  top.pointUp.add(() => {
    top.cssColor = "#0000FF";
    top.modified();
  });

  const bottom = new g.FilledRect({
    scene: scene,
    cssColor: "#FFFF00",
    width: 32,
    height: 32,
    x: centerX + 0,
    y: centerY - 32,
    touchable: true
  });

  bottom.pointDown.add(() => {
    bottom.cssColor = "black";
    bottom.modified();

    player.y -= player.height;
    player.modified();
  });

  bottom.pointUp.add(() => {
    bottom.cssColor = "#FFFF00";
    bottom.modified();
  });

  const controller = new g.E({scene});
  controller.append(right);
  controller.append(left);
  controller.append(top);
  controller.append(bottom);

  return controller
}