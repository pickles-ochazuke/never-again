# Never Again

**never-again** はTypeScriptとAkashicで作られたゲームです。このプロジェクトを改造してゲームを作ったり、Akashicのゲームを作るときの参考にするのも自由です。

利用者は、Akashic の環境構築や実行ができることを前提にしています。

このプロジェクトは、 `typescript-minimal` を元に作られています。

## 準備

`never-again` を利用するには、素材を自分で用意する必要があります。現在、以下の素材が必要です。

列挙された名前の素材を用意する必要があります。拡張子は、各素材の種類に合わせて用意してください。例えば、音源の場合は ogg, m4a(acc) が必要です。つまり、Akashic の仕様に合わせて用意してください。

### 絵

なし

### 音源

- bgm
- gameover_bgm
- gameover
- goal_bgm
- open
- goal
- start
- walk

## 利用方法

初回のみ、以下のコマンドを実行して、ビルドに必要なパッケージをインストールしてください。

```sh
npm install
```

### ビルド方法

```sh
npm run build
```

### 動作確認方法

以下のどちらかを実行後、ブラウザで `http://localhost:3000/game/` にアクセスすることでゲームを実行できます。

* `npm start`

* `npm install -g @akashic/akashic-sandbox` 後、 `akashic-sandbox .`

### アセットの更新方法

各種アセットを追加したい場合は、それぞれのアセットファイルを以下のディレクトリに格納します。

* 画像アセット: `image`
* スクリプトアセット: `script`
* テキストアセット: `text`
* オーディオアセット: `audio`

これらのアセットを追加・変更したあとに `npm run update` をすると、アセットの変更内容をもとに `game.json` を書き換えることができます。
