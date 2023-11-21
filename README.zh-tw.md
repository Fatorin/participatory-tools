<div align="center">

  <h1><code>參加型管理工具</code></h1>

  <strong>一個用於Twitch聊天室的管理參加人員的簡易網頁工具</strong>
  
  [![en](https://img.shields.io/badge/Lang-English-red.svg)](https://github.com/fatorin/participatory-tools/blob/master/README.md)
  [![jp](https://img.shields.io/badge/Lang-日本語-white.svg)](https://github.com/fatorin/participatory-tools/blob/master/README.jp.md)
  [![zh-tw](https://img.shields.io/badge/Lang-正體中文-blue.svg)](https://github.com/fatorin/participatory-tools/blob/master/README.zh-tw.md)
</div>

## 關於

你可以透過此工具來讓輕鬆管理參加人員。玩家可以透過一些指令來讓自己進入或取消列隊。

## 使用說明

### OBS設定
1. 開啟OBS，新增網頁瀏覽器來源，並將URL設定為 `https://sankagata-tool.firebaseapp.com`。
2. 將長寬設定為 `1920 x 1080` (推薦)。
3. 按下互動按鈕與OBS瀏覽器視窗進行操作。
4. 輸入你的直播網址 `https://www.twitch.tv/YOUR_CHANNEL_NAME` 並按下開始。
5. 調整你的OBS畫面，讓控制面板不會被玩家所看見。
* 如果有需要測試可以先點選Debug Mode來試用。

### 直播主操作說明
#### 控制面板
* 確認進入 - 確認列隊第一位玩家已進入，會增加遊玩次數一次。
* 移除列隊 - 取消列隊第一位玩家的列隊，不會記錄遊玩次數。
* 群組確認 - 會依照你設定的各行數量，將該人數確認進入。
#### 進階選項
* 各行數量 - 每一行最多可顯示的數量，可設定為`2~6`位。此項目設定後會影響<u>群組確認</u>的數量。
* 最大顯示數量 - 畫面最多可顯示的數量，可設定為`2~20`位。
* 顯示列隊狀態 - 此切換鈕可以控制列隊畫面隱藏或是顯示。
* 首次參加優先 - 按下此按鈕後，本日首次遊玩的玩家會優先放到列隊前方。

#### 玩家面板
你可以透過打勾或是打叉的按鈕來控制列隊狀況，避免只能操作第一位玩家的狀況。這兩個按鈕分別是對應<u>確認進入</u>以及<u>移除列隊</u>。

#### 底部選項
* 儲存設定 - 會將<u>語系</u>、<u>網址</u>、<u>各行數量</u>、<u>最大顯示數量</u>、<u>首次參加優先</u>的設定儲存。在你沒有按下儲存設定前所有設定都不會儲存。
* 紀錄重置 - 清除所有玩家的遊玩紀錄與名稱登入，當您想切換遊戲時可使用此功能。
* 離開 - 中斷與聊天室的連線並回到起始畫面。

### 其他
* 你可以點選參加者的名稱或是其遊戲名稱來進行文字複製。

### 玩家操作說明
* `!join` - 登入至列隊中，如果已經存在則不會重複登入。
* `!join name` - 登入至列隊中並設定自己的玩家名稱。如果已經登入則會更新自己的玩家名稱。
* `!sn name` - 更新你的玩家名稱。
* `!queue` - 檢查當前列隊共有幾人，以及你是否有在列隊中。
* `!cancel` - 取消你的列隊。

## 開發
### 透過 `wasm-pack build` 來建置
使用此指令來建立網頁所需要的檔案，如果你只是使用者則不需要觀看以下內容。
```
wasm-pack build --target web --out-dir public/pkg
```

### 設定你的專案
本專案是佈署於firebase hosting上，如果你也想這樣做可參考以下內容。
 1. 在[Firebase Console](https://console.firebase.google.com)上建立你的專案。
 2. 確認你已經有安裝Firebase CLI工具。如果你還沒安裝可以透過 `npm install -g firebase-tools`指令以及`firebase login`來設定專案。
 3. 執行`firebase use --add`指令並選擇你建立的Firebase專案。
 4. 執行`firebase emulators:start`指令來運行本地環境的伺服器。

## 授權

本專案採用以下兩者授權，可依照您的需求自行搭配使用。

 * Apache License, Version 2.0, ([LICENSE-APACHE](https://github.com/fatorin/participatory-tools/blob/master/LICENSE-APACHE) or
   http://www.apache.org/licenses/LICENSE-2.0)
 * MIT license ([LICENSE-MIT](https://github.com/fatorin/participatory-tools/blob/master/LICENSE-MIT) or
   http://opensource.org/licenses/MIT)

## 貢獻
歡迎給予任何建議或是提交內容，我會審核並進行確認。