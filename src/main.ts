function main(param: g.GameMainParameterObject): void {
  const scene = new g.Scene({game: g.game});

  console.log("Game Start!!");

  scene.loaded.add(() => {
    // 以下にゲームのロジックを記述します。

    /**
     * 描画対象を各層に分ける
     * 層は全部で6つ
     * UI
     * 天井
     * キャラクター
     * イベント
     * タイル（床）
     * バックグラウンド
     * 上の層は下の層を覆い隠す。
     */
    // 背景の層
    const background = createBackground(scene);
    scene.append(background);

    // 床の層
    const floor = createFloor(scene, 15, 14);
    scene.append(floor);

    // キャラクター層
    const player = createPlayer(scene);
    scene.append(player);

    // UI層
    const ui = createUi(scene, player);
    scene.append(ui);
  });

  g.game.pushScene(scene);
}

export = main;

function createUi(scene: g.Scene, player: g.E): g.E {

  // UI の描画領域と位置を決める
  const ui = new g.E({
    scene: scene,
    x: 0,
    y: g.game.height * 0.7,
    width: g.game.width,
    height: g.game.height * 0.3
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

function createFloor(scene: g.Scene, tilesX: number, tilesY:number): g.E {

  const floor = new g.E({
    scene: scene,
    width: g.game.width,
    height: g.game.height * 0.6
  });
  
  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {
      floor.append(createTile(scene, floor, x, y));
    }
  }

  return floor;
}

function createTile(scene: g.Scene, parent: g.E, tileX: number, tileY: number): g.E {
  const e = new g.E({scene: scene});

  const width = 32;
  const height = 32;

  const frame = new g.FilledRect({
    scene: scene,
    cssColor: "#000000",
    width: width,
    height: height,
    x: tileX * width,
    y: tileY * height
  });
  e.append(frame);

  const filled = new g.FilledRect({
    scene: scene,
    cssColor: "#C71585",
    width: width - 2,
    height: height - 2,
    x: frame.x + 1,
    y: frame.y + 1
  });
  e.append(filled);

  return e;
}