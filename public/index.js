import init, { GameInfo } from './pkg/participatory_tools.js';
import { GetText, SettingLanguageSelector } from './lang.js';

await init();
const gameInfo = GameInfo.new();
const config_sotre_id = "participatory_tools_config";
let config = InitialConfig();
let view = gameInfo.get_queue();
const client = new tmi.Client({ connection: { reconnect: true } });
// View
const login_page = document.getElementById('login-page');
const main_page = document.getElementById('main-page');
const player_queue_view = document.getElementById('player-queue-view');
const player_queue_check_view = document.getElementById('player-queue-check-view');
const player_panel_list = document.getElementById('player-panel-list');
// Button
const connect_btn = document.getElementById('connect-btn');
const exit_btn = document.getElementById('exit-btn');
const save_config_btn = document.getElementById('save-config-btn');
const reset_btn = document.getElementById('reset-btn');
const confirm_player_btn = document.getElementById('confirm-player-entered-btn');
const remove_player_btn = document.getElementById('remvoe-player-btn');
const fast_confirm_player_entered_btn = document.getElementById('fast-confirm-player-entered-btn');
const display_per_row_btn = document.getElementById('display-per-row-btn');
const display_max_count_btn = document.getElementById('display-max-count-btn');
// CheckBox
const show_status_switch = document.getElementById('show-status-switch');
const queue_priority_switch = document.getElementById('queue-priority-switch');
// Text
const channel_input = document.getElementById('channel-input');
const display_per_row_text = document.getElementById('display-per-row-text');
const display_max_count_text = document.getElementById('display-max-count-text');
const log_output = document.getElementById('log-output');
// Event
connect_btn.addEventListener('click', SettingChannel);
exit_btn.addEventListener('click', DisconnectChannel);
save_config_btn.addEventListener('click', SaveConfig);
reset_btn.addEventListener('click', ResetGameInfo);
confirm_player_btn.addEventListener('click', ConfirmPlayerEntered);
remove_player_btn.addEventListener('click', RemovePlayer);
fast_confirm_player_entered_btn.addEventListener('click', FastConfirmPlayerEnteredBtn);
display_per_row_btn.addEventListener('click', SettingViewPerRow);
display_max_count_btn.addEventListener('click', SettingViewMaxCount);
show_status_switch.addEventListener('change', (e) => ShowStatusSwitch(e));
queue_priority_switch.addEventListener('change', (e) => QueuePrioritySwitch(e));
document.addEventListener('click', (e) => copyToClippanel(e));
player_panel_list.addEventListener('click', (e) => handlePlayerListItemClick(e));
// Debug Mode
const debug_option = document.getElementById('debug-option');
const debug_btn = document.getElementById('debug-btn');
debug_btn.addEventListener('click', () => { SetMainView(true); debug_option.style.display = 'block'; });
const test_user_input = document.getElementById('test-user-input');
const test_text_input = document.getElementById('test-input');
const test_message_btn = document.getElementById('test-message-btn');
test_message_btn.addEventListener('click', SendDebugMessage);

ReadConfig();
SettingView();

function InitialConfig() {
    let init_config = {
        channel: "",
        join_command: ["join"],
        cancel_command: ["cancel"],
        sn_command: ["sn"],
        queue_command: ["queue"],
        display_per_row: 6,
        display_max_count: 4,
        lang: "en",
        priority: false,
    };
    return init_config;
}

function SaveConfig() {
    if (!config) {
        return;
    }

    localStorage.setItem(config_sotre_id, JSON.stringify(config));
    SettingChannel(config.channel);
    PrintDebugLog("The config has been saved.");
}

function ReadConfig() {
    const storedData = localStorage.getItem(config_sotre_id);
    if (!storedData) {
        return;
    }

    let load_config = JSON.parse(storedData);
    for (let key in config) {
        if (!load_config.hasOwnProperty(key)) {
            load_config[key] = config[key];
        }
    }
    config = load_config;
}

function SettingView() {
    display_per_row_text.value = config["display_per_row"];
    display_max_count_text.value = config["display_max_count"];
    SettingViewPerRow();
    SettingLanguageSelector(config.lang);
}

function SettingChannel() {
    const url = channel_input.value;
    const prefix = "https://www.twitch.tv/";

    if (!url.startsWith(prefix)) {
        return;
    }

    const channel = url.substring(prefix.length);
    client.channels.push(channel);

    if (!client.channels.includes(channel)) {
        client.channels.length = 0;
        return;
    }

    ConnectChannel();
}

function ConnectChannel() {
    if (client.channels.length == 0) {
        return;
    }

    SetMainView(true);
    client.connect();
    client.on('message', HandleMessage);
}

function DisconnectChannel() {
    if (client && client.OPEN) {
        client.disconnect();
        client.removeAllListeners();
    }
    SetMainView(false);
}

function SetMainView(isConnect) {
    if (isConnect === true) {
        main_page.style.display = 'block';
        login_page.style.display = 'none';
    } else {
        main_page.style.display = 'none';
        login_page.style.display = 'block';
    }
}

function SendDebugMessage() {
    let tags = {
        "username": "user",
    };

    if (test_user_input.value.length > 0) {
        tags["username"] = test_user_input.value;
    }

    HandleMessage("TestChannel", tags, test_text_input.value, false);
    test_text_input.value = "";
}

function HandleMessage(channel, tags, message, self) {
    if (self || !message.startsWith('!')) return;
    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();
    const username = tags['username'];
    const display_name = tags['display-name'];
    const player_name = args.shift();

    if (player_name && (player_name.includes('<') || player_name.includes('>'))) {
        console.log("script");
        return;
    }

    HandleCommand(command, username, display_name, player_name);
    UpdateView();
}

function HandleCommand(command, username, display_name, player_name) {
    if (!username) return;
    let log_name = display_name ? display_name : username;
    if (config.join_command.includes(command)) {
        gameInfo.add_player(username, display_name, player_name, config.priority);
        PrintDebugLog(`Received ${log_name}'s join command.`);
        return;
    }

    if (config.cancel_command.includes(command)) {
        gameInfo.remove_player_with_command(username);
        PrintDebugLog(`Received ${log_name}'s cancel command`);
        return;
    }

    if (config.sn_command.includes(command)) {
        if (!player_name) return;
        gameInfo.register_player_name(username, player_name);
        PrintDebugLog(`Received ${log_name}'s sn command`);
        return;
    }

    if (config.queue_command.includes(command)) {
        ShowQueueAlert(username);
        PrintDebugLog(`Received ${log_name}'s queue command`);
        return;
    }
}

function ShowStatusSwitch(event) {
    if (event.target.checked) {
        player_queue_view.style.display = 'block';
    } else {
        player_queue_view.style.display = 'none';
    }
}

function QueuePrioritySwitch(event) {
    if (event.target.checked) {
        config.priority = true;
    } else {
        config.priority = false;
    }
}

function ConfirmPlayerEntered() {
    gameInfo.remove_player_with_index(0, true);
    UpdateView();
}

function RemovePlayer() {
    gameInfo.remove_player_with_index(0, false);
    UpdateView();
}

function FastConfirmPlayerEnteredBtn() {
    gameInfo.remove_players(config.display_max_count);
    UpdateView();
}

function ResetGameInfo() {
    PrintDebugLog("Reset");
    gameInfo.reset();
    UpdateView();
}

function SettingViewMaxCount() {
    config.display_max_count = display_max_count_text.value;
    UpdateView();
}

function SettingViewPerRow() {
    config.display_per_row = display_per_row_text.value;
    UpdateView();
}

function UpdateView() {
    let temp = "";
    let content = "";
    let list_content = "";
    view = gameInfo.get_queue();

    for (let index = 0; index < view.length; index++) {
        list_content += generateControlListItem(index, view[index]);

        if (index >= config.display_max_count) {
            continue;
        }

        temp += generatePlayerCard(view[index]);

        if ((index + 1) % config.display_per_row === 0 || index == view.length - 1 || index === config.display_max_count - 1) {
            content += warpRow(temp);
            temp = "";
        }
    }

    player_queue_view.innerHTML = content;
    player_panel_list.innerHTML = list_content;
}

function ShowQueueAlert(username, display_name) {
    const elementId = `alert-${username}`;
    const isExistElement = document.querySelector(`#${elementId}`);
    if (isExistElement) {
        return;
    }
    let name = display_name ? display_name : username;
    let position = gameInfo.check_position(username);
    const alert = generateQueueMessage(elementId, view.length, position, name);
    player_queue_check_view.innerHTML += alert;

    setTimeout(() => {
        let element = document.querySelector(`#${elementId}`);
        element.classList.add('show');
    }, 50);

    setTimeout(() => {
        let element = document.querySelector(`#${elementId}`);
        element.classList.remove('show');
        element.addEventListener('transitionend', () => element.remove());
    }, 5000);
}

function generateQueueMessage(elementId, count, position, name) {
    let body = "";
    if (position !== undefined) {
        body = `
        <span class="badge text-bg-dark">${count}</span>
        <span class="badge text-bg-success">INQ</span>
        <span class="badge text-bg-primary">${position}</span>
        `;
    } else {
        body = `
        <span class="badge text-bg-dark">${count}</span>
        <span class="badge text-bg-secondary">INQ</span>
        <span class="badge text-bg-danger">X</span>
        `;
    }
    let alert = `
        <div class="col-auto">
          <div class="card shadow-sm rounded">
            <div class="card-body">
              <h4 class="my-0 text-truncate">${body}${name}</h4>
            </div>
          </div>
        </div>
        `;

    return `<div id="${elementId}" class="row py-1 fade">${alert}</div>`;
}

function warpRow(content, id) {
    return `<div class="row py-1">${content}</div>`;
}

function generateControlListItem(id, { username }) {
    return `
    <li id="player-panel-list-item-${id}" class="list-group-item d-flex justify-content-between align-items-center fs-4 border-2 rounded-5 my-1">
        <div class="me-auto copied text-truncate"> ${username} </div>
        <button class="btn btn-success btn-sm me-2 player-panel-check">
            <img src="./asset/check.svg" />
        </button>
        <button class="btn btn-danger btn-sm player-panel-cancel">
            <img src="./asset/cancel.svg" />
        </button>
    </li>
    `;
}

function generatePlayerCard({ username, display_name, player_name, played_times }) {
    let name = display_name ? display_name : username;
    player_name = player_name ? player_name : "!sn name";
    return `
        <div class="col-2">
          <div class="card shadow rounded">
            <div class="card-body">
              <div class="d-flex align-items-center">
                  <h4 class="card-title text-truncate copied mb-0 me-auto">${name}</h4>
                  <span class="mb-0 px-2 text-black-50 border border-1 border-dark-subtle rounded">${played_times}</span>
              </div>
            </div>
            <div class="card-footer">
              <p class="card-text text-truncate text-muted copied">${player_name}</p>
            </div>
          </div>
        </div>
    `;
}

function handlePlayerListItemClick(e) {
    let el = e.target;
    let prefix = "player-panel-list-item-";
    let liId = el.closest('li').id;
    if (!liId.startsWith(prefix)) {
        return;
    }

    liId = liId.replace(prefix, '');
    if (el.classList.contains("player-panel-check") || el.closest('.player-panel-check')) {
        gameInfo.remove_player_with_index(liId, true);
    }

    if (el.classList.contains("player-panel-cancel") || el.closest('.player-panel-cancel')) {
        gameInfo.remove_player_with_index(liId, false);
    }

    UpdateView();
}

function copyToClippanel(e) {
    let el = e.target;
    if (!el.classList.contains("copied")) {
        return;
    }

    if (!el.textContent) {
        return;
    }

    if (el.textContent.startsWith('!')) {
        return;
    }
    const textarea = document.createElement('textarea');
    textarea.setAttribute('readonly', 'true');
    textarea.contentEditable = 'true';
    textarea.style.position = 'absolute';
    textarea.style.top = '-1000px';
    textarea.value = el.textContent;
    document.body.appendChild(textarea);
    const selectedRange = document.rangeCount > 0 ? document.getRangeAt(0) : false;
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    let success = false;
    try {
        success = document.execCommand('copy');
    } catch (error) {
        PrintDebugLog('Could not copy to the clippanel.', error);
        success = false;
    }

    document.body.removeChild(textarea);

    if (selectedRange) {
        document.removeAllRanges();
        document.addRange(selectedRange);
    }

    if (success === true) {
        PrintDebugLog(`copied: ${el.textContent}`);
    }
}

export function PrintDebugLog(text) {
    const lines = log_output.value.split('\n');
    const lineCount = lines.length;
    if (lineCount > 50) {
        lines.shift();
        log_output.value = lines.join('\n');
    }
    log_output.value += text + '\n';
    log_output.scrollTop = log_output.scrollHeight;
}

export function UpdateConfig(key, value) {
    if (config) {
        config[key] = value;
    }
}