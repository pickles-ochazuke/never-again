function main(param: g.GameMainParameterObject): void {
  const scene = new g.Scene({game: g.game});

  console.log("Game Start!!");

  scene.loaded.add(() => {
    // 以下にゲームのロジックを記述します。

    // 背景
    const background = createBackground(scene);
    scene.append(background);


    // Player
    const player = createPlayer(scene);
    scene.append(player);

    // コントローラUI
    const ui = createUi(scene, player);
    scene.append(ui);

    // // 移動 UI
    // const playerController = createPlayerController(scene, player);
    // scene.append(playerController);
  });

  g.game.pushScene(scene);
}

export = main;

function createUi(scene: g.Scene, player: g.E): g.E {

  // UI の描画領域と位置を決める
  const ui = new g.E({
    scene: scene,
    x: 0,
    y: g.game.height * 0.6,
    width: g.game.width,
    height: g.game.height * 0.4
  });

  // debug用のUI背景
  ui.append(new g.FilledRect({
    scene: scene,
    cssColor: "#8aafebAA",
    width: ui.width,
    height: ui.height,
  }));
  
  const controller = createPlayerController(scene, player, ui);
  ui.append(controller);

  return ui; 
}

function createPlayerController(scene: g.Scene, player: g.E, parent: g.E): g.E {

  const centerX = parent.width / 2;
  const centerY = parent.height / 2;

  const right = new g.FilledRect({
    scene: scene,
    cssColor: "#FF0000",
    width: 32,
    height: 32,
    x: centerX + 16,
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
    x: centerX - (16 + 32),
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
    x: centerX - 16,
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
    x: centerX - 16,
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

function createBackground(scene: g.Scene): g.E {

  const background = new g.FilledRect({
    scene: scene,
    cssColor: "#FFFFFF",
    width: g.game.width,
    height: g.game.height,
  });

  // 縦の線
  const columnLine = new g.FilledRect({
    scene: scene,
    cssColor: "#000000",
    width: 1,
    height: g.game.height,
    x: g.game.width / 2,
    y: 0
  });

  background.append(columnLine);

  return background;
}

function createPlayer(scene:g.Scene): g.E {
  const player = new g.FilledRect({
    scene: scene,
    cssColor: "#ff0000",
    width: 32,
    height: 32,
    touchable: true
  });

  // プレイヤーの更新処理
  player.update.add(() => {
    // 以下のコードは毎フレーム実行されます。
  });

  return player;
}