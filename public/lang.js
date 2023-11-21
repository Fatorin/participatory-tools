import { UpdateConfig } from './index.js';
const selectElement = document.getElementById('language-select');
selectElement.addEventListener('change', SettingView);

export function GetText(text_id, lang_id, params) {
    let message = "";

    if (lang_data[text_id][lang_id]) {
        message = lang_data[text_id][lang_id];
    }

    return params ? params.reduce((msg, value, index) => msg.replace(`{${index}}`, value), message) : message;
}

export function SettingLanguageSelector(default_language) {
    for (const langCode in lang_list) {
        if (lang_list.hasOwnProperty(langCode)) {
            const option = document.createElement('option');
            option.value = langCode;
            option.textContent = lang_list[langCode];
            selectElement.appendChild(option);
        }
    }

    const defaultOption = selectElement.querySelector(`option[value="${default_language}"]`);

    if (defaultOption) {
        defaultOption.selected = true;
    }
    SettingView();
}

function SettingView() {
    const lang_id = selectElement.value;
    UpdateConfig("lang", lang_id);
    document.title = GetText("login-title", lang_id);
    for (const elementId in lang_data) {
        if (!lang_data.hasOwnProperty(elementId)) {
            continue;
        }
        const element = document.getElementById(elementId);
        if (element && lang_data[elementId][lang_id]) {
            element.textContent = lang_data[elementId][lang_id];
        }
    }
}

const lang_list = {
    "en": "English",
    "jp": "日本語",
    "zh": "中文(正體)"
}

const lang_data = {
    "login-title": {
        "en": "Participatory Tools",
        "jp": "参加型管理ツール",
        "zh": "參加型管理工具"
    },
    "login-desp": {
        "en": "Please enter your channel url and press start",
        "jp": "チャンネルのURLを書いてスタート押してください",
        "zh": "歡迎使用參加型管理工具，請輸入網址並按下開始"
    },
    "connect-btn": {
        "en": "Start",
        "jp": "スタート",
        "zh": "開始"
    },
    "main-title": {
        "en": "DashBoard",
        "jp": "ダッシュボード",
        "zh": "儀錶板"
    },
    "main-control-text": {
        "en": "Control Panel",
        "jp": "コントロールパネル",
        "zh": "控制面板"
    },
    "confirm-player-entered-btn": {
        "en": "Confirm",
        "jp": "確認する",
        "zh": "確認進入"
    },
    "remvoe-player-btn": {
        "en": "Remove",
        "jp": "排除する",
        "zh": "移除列隊"
    },
    "fast-confirm-player-entered-btn": {
        "en": "Group Check",
        "jp": "グループ確認する",
        "zh": "群組確認"
    },
    "main-advanced-text": {
        "en": "Advanced Option",
        "jp": "追加オプション",
        "zh": "進階選項"
    },
    "save-config-btn": {
        "en": "Save Setting",
        "jp": "設定保存",
        "zh": "儲存設定"
    },
    "reset-btn": {
        "en": "Reset History",
        "jp": "記録リセット",
        "zh": "紀錄重置"
    },
    "main-pre-row-text": {
        "en": "Quantity in Per Row",
        "jp": "各行に数量を表示",
        "zh": "各行數量"
    },
    "display-per-row-btn": {
        "en": "Apply",
        "jp": "適用",
        "zh": "套用"
    },
    "main-max-count-text": {
        "en": "Maximum Quantity",
        "jp": "最大表示数量",
        "zh": "最大顯示數量"
    },
    "display-max-count-btn": {
        "en": "Apply",
        "jp": "適用",
        "zh": "套用"
    },
    "main-log-text": {
        "en": "System Log",
        "jp": "システムログ",
        "zh": "系統操作紀錄"
    },
    "exit-btn": {
        "en": "Exit",
        "jp": "終了",
        "zh": "離開"
    },
    "reset-config-btn": {
        "en": "Reset Config",
        "jp": "設定リセット",
        "zh": "重置設定"
    },
    "queue-priority-label": {
        "en": "Frist Time Priority",
        "jp": "初参加優先",
        "zh": "首次參加優先"
    },
    "show-status-label": {
        "en": "Show INQ Status",
        "jp": "キューのステータス",
        "zh": "顯示列隊狀態"
    },
    "player-panel-text": {
        "en": "Player Panel",
        "jp": "プレーヤーパネル",
        "zh": "玩家面板"
    }
}