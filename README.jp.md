<div align="center">

  <h1><code>参加型管理ツール</code></h1>

  <strong>ツイッチに向け参加者を管理するのシンプルなツール</strong>
  
  [![en](https://img.shields.io/badge/Lang-English-red.svg)](https://github.com/fatorin/participatory-tools/blob/master/README.md)
  [![jp](https://img.shields.io/badge/Lang-日本語-white.svg)](https://github.com/fatorin/participatory-tools/blob/master/README.jp.md)
  [![zh-tw](https://img.shields.io/badge/Lang-正體中文-blue.svg)](https://github.com/fatorin/participatory-tools/blob/master/README.zh-tw.md)
  
  <i>僕の日本語あまり上手ではないので、一部の内容を翻訳機で使いました。変な文法か文字があります。</i> 
</div>

## 概要

このツールで参加者をやすい管理できるます。参加者はコマンドに従ってキューに出入りします。

## 使い方

### OBS設定
1. OBSをオーブンして、ソースブラウザを追加します。そしてURL `https://sankagata-tool.firebaseapp.com` を設定します。
2. 幅と高さを `1920 x 1080` 設定してください(おすすめ)。
3. ソースブラウザ対話を押して、ブラウザの画面を操作できます。
4. 自分のチャンネルURL `https://www.twitch.tv/YOUR_CHANNEL_NAME` を書いて、スタートを押してください。
5. リスナーに見られないようにコントロールボードをOBSでブラウザ画面を調整します。
* 必要ならDebug Modeを押して、テストモードで試してみましょう。

### 配信者向けの手順
#### コントロールボード
* 確認する - 最初のプレイヤーを参加したことを確認して、プレイカウンターは1を増加します。
* 排除する - 最初のプレイヤーをキューから削除します。
* グループ確認する - 各行に数量によって，キューのリスナーと同じ数量を確認します。
#### 追加オプション
* 各行に数量を表示 - `2~6`を設定できます。設定したら<u>グループ確認する</u>の確認数量を影響します。
* 最大表示数量 - `2~20`を設定できます。
* キューのステータス - キューのステータスをオンまたはオフにします。
* 初参加優先 - オンしれば、初参加の人はキューの先頭に並べられます。

#### プレーヤーボード
参加者の<u>確認する</u>や<u>排除する</u>を直接操作できます。

#### 下部のオプション
* 設定を保存する - これは<u>言語</u>、<u>URL</u>、<u>各行に数量</u>、<u>最大表示数量</u>、<u>初参加優先</u>の設定を保存します。保存しないなら、再起動する時、最初の設定に戻ります。
* 記録をリセット - リスナーの参加記録とプレイネームを削除します。別のゲームしたい時に、これで使ってみてください。
* 終了 - チャンネルのチャットを接続を解除して、最初の画面に戻ります。

### その他
* ユーザー名かプレーネームを押したら、文字をコピーできます。

### リスナー向けの手順
* `!join` - キューに登録します。
* `!join name` - キューに登録して、自分のプレイネームを登録すます。もし登録したら、プレイネームを更新します。
* `!sn name` - プレイネームを更新します。
* `!queue` - 現在列に何人いるか、自分が列に並んでいるかどうかを確認します。
* `!cancel` - キューから外します。

## 開発
### `wasm-pack build`でWebAssemblyファイルをビルドします
以下の内容は開発者向けに表示されます。開発者でない場合は閲覧する必要はありません。
```
wasm-pack build --target web --out-dir public/pkg
```

### プロジェクトを設定します
このプロジェクトはFirebase Hostingにデプロイされています。
 1. [Firebase Console](https://console.firebase.google.com)でプロジェクトを作成します
 2. Firebase CLIツールがインストールされていることを確認します。インストールされていない場合は、 `npm install -g firebase-tools` コマンドと `firebase login` を使用してプロジェクトを設定します。
 3. `firebase use --add`コマンドを実行し、作成したFirebaseプロジェクトを選択します。
 4. `firebase emulators:start`コマンドを実行して、ローカル環境のサーバーを起動します。

## ライセンス

このプロジェクトは、以下の2つのライセンスを採用しており、お客様のニーズに応じて自由に組み合わせて使用することができます。

 * Apache License, Version 2.0, ([LICENSE-APACHE](https://github.com/fatorin/participatory-tools/blob/master/LICENSE-APACHE) or
   http://www.apache.org/licenses/LICENSE-2.0)
 * MIT license ([LICENSE-MIT](https://github.com/fatorin/participatory-tools/blob/master/LICENSE-MIT) or
   http://opensource.org/licenses/MIT)

## コントリビュート
どんな提案でも歓迎ですし、コンテンツの提出も歓迎しています。提案や内容は審査します。