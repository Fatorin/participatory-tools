use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
#[derive(Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct Player {
    username: String,
    display_name: Option<String>,
    player_name: Option<String>,
    played_times: u32,
}

#[wasm_bindgen]
impl Player {
    #[wasm_bindgen(constructor)]
    pub fn new(
        username: String,
        display_name: Option<String>,
        player_name: Option<String>,
        played_times: u32,
    ) -> Self {
        Player {
            username,
            display_name,
            player_name,
            played_times,
        }
    }
}

#[wasm_bindgen]
#[derive(Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct PlayerHistory {
    player_name: Option<String>,
    played_times: u32,
}

#[wasm_bindgen]
#[derive(Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct GameInfo {
    queue: Vec<Player>,
    history: HashMap<String, PlayerHistory>,
}

#[wasm_bindgen]
impl GameInfo {
    pub fn new() -> Self {
        Self {
            queue: vec![],
            history: HashMap::new(),
        }
    }

    pub fn reset(&mut self) {
        self.queue.clear();
        self.history.clear();
    }

    pub fn get_queue(&self) -> Result<JsValue, JsValue> {
        Ok(serde_wasm_bindgen::to_value(&self.queue)?)
    }

    pub fn remove_players(&mut self, mut count: usize) {
        if count > self.queue.len() {
            count = self.queue.len();
        }

        let removed_elements = self.queue.drain(0..count);
        for element in removed_elements {
            self.history
                .entry(element.username)
                .and_modify(|hisotry| hisotry.played_times += 1);
        }
    }

    pub fn remove_player_with_index(&mut self, index: usize, is_joined: bool) {
        if index >= self.queue.len() {
            return;
        }

        let user = self.queue.remove(index);

        if is_joined {
            self.history
                .entry(user.username)
                .and_modify(|hisotry| hisotry.played_times += 1);
        }
    }

    pub fn remove_player_with_command(&mut self, username: String) {
        if let Some(index) = self
            .queue
            .iter()
            .position(|player| player.username == username)
        {
            self.queue.remove(index);
        }
    }

    pub fn check_position(&self, username: String) -> Option<usize> {
        self.queue
            .iter()
            .position(|player| player.username == username)
    }

    pub fn register_player_name(&mut self, username: String, player_name: String) {
        let history = self
            .history
            .entry(username.clone())
            .or_insert(PlayerHistory {
                player_name: None,
                played_times: 0,
            });

        history.player_name = Some(player_name);

        if let Some(player) = self
            .queue
            .iter_mut()
            .find(|player| player.username == username)
        {
            player.player_name = history.player_name.clone();
        }
    }

    pub fn add_player(
        &mut self,
        username: String,
        display_name: Option<String>,
        player_name: Option<String>,
        is_priority: bool,
    ) {
        let history = self
            .history
            .entry(username.clone())
            .or_insert(PlayerHistory {
                player_name: player_name.clone(),
                played_times: 0,
            });

        if let Some(player) = self
            .queue
            .iter_mut()
            .find(|player| player.username == username)
        {
            player.player_name = player_name;
            return;
        }

        if player_name.is_some() {
            history.player_name = player_name;
        }

        let player = Player {
            username,
            display_name,
            player_name: history.player_name.clone(),
            played_times: history.played_times,
        };

        match is_priority {
            true => {
                if let Some(index) = self.queue.iter().position(|p| p.played_times == 1) {
                    self.queue.insert(index, player);
                } else {
                    self.queue.push(player);
                }
            }
            false => self.queue.push(player),
        }
    }
}
