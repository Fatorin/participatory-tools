<div align="center">

  <h1><code>Participatory Tools</code></h1>

  <strong>A simple web tool for managing participants with a Twitch chat room.</strong>
  
  [![en](https://img.shields.io/badge/Lang-English-red.svg)](https://github.com/fatorin/participatory-tools/blob/master/README.md)
  [![jp](https://img.shields.io/badge/Lang-日本語-white.svg)](https://github.com/fatorin/participatory-tools/blob/master/README.jp.md)
  [![zh-tw](https://img.shields.io/badge/Lang-正體中文-blue.svg)](https://github.com/fatorin/participatory-tools/blob/master/README.zh-tw.md)
</div>

## About

You can use this tool to easily manage participants. Players can join or leave the queue using specific commands。

## Instructions

### OBS Setting
1. Open OBS, add a web browser source, and set the URL to `https://sankagata-tool.firebaseapp.com`.
2. Set the dimensions to `1920 x 1080`` (recommended).
3. Use the interactive button alongside the OBS browser window.
4. Enter your live stream URL `https://www.twitch.tv/YOUR_CHANNEL_NAME` and press start.
5. Adjust your OBS screen so that the control board is not visible to the players.
* You can use Debug Mode for testing if needed before proceeding.

### Streamer Guide

#### Control Panel
* Confirm - Acknowledge the entry of the first player in the queue, increasing the played times count by one.
* Remove  - Remove the first player in the queue without recording gameplay count.
* Group Check - Confirm entry for a group based on the specified quantity of players.

#### Advanced Options
* Quantity in Per Row - Maximum number of players displayed per row, adjustable from `2` to `6`. Affects the quantity in the <u>Group Check</u> feature.
* Maximum Quantity - Maximum number of players visible on-screen, adjustable from `2` to `20`.
* Show Queue Status -  Toggle to hide or show the queue display.
* First Entry Priority - Prioritize players joining for the first time today by placing them at the front of the queue after pressing this button.

#### Player Panel
You can control the queue status using buttons.

#### Bottom Options
* Save Settings - Saves the configurations of <u>Language</u>, <u>URL</u>, <u>Quantity in Per Row</u>, <u>Maximum Quantity</u>, and <u>Frist Time Priority</u>. None of the settings are stored until you press "Save Settings."
* Reset History - Clears all player records and name. Use this function when switching games.
* Exit - Disconnects from the chat room and returns to the initial screen.


### Others
* You can touch a username or player name to copy text to the clipboard.

### Player Instructions Guide
* `!join` - Join the queue. If already joined, it won't add duplicates.
* `!join name` - Join the queue and set your player name. Updates your player name if already joined.
* `!sn name` - Update your player name.
* `!queue` - Check the current queue and your position in it.
* `!cancel` - Remove yourself from the queue.

## Developer

### Build with `wasm-pack build`
Use this command to create necessary file.
```
wasm-pack build --target web --out-dir public/pkg
```

### Configure your project

 1. Create your project on the [Firebase Console](https://console.firebase.google.com).
 2. You must have the Firebase CLI installed. If you don't have it install it with `npm install -g firebase-tools` and then configure it with `firebase login`.
 3. On the command line run `firebase use --add` and select the Firebase project you have created.
 4. On the command line run `firebase serve` using the Firebase CLI tool to launch a local server.

## License

This project is licensed under either of

 * Apache License, Version 2.0, ([LICENSE-APACHE](LICENSE-APACHE) or
   http://www.apache.org/licenses/LICENSE-2.0)
 * MIT license ([LICENSE-MIT](LICENSE-MIT) or
   http://opensource.org/licenses/MIT)

at your option.