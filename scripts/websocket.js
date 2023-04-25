import { getGame } from "./getGame.js";
import { addPlayersLobby } from "./addPlayersLobby.js";
import { refreshAccessToken } from "./fetch.js";
import { getProfile } from "./getProfile.js";

export let ws = null;

export function setWebSocket(websocket) {
  ws = websocket;
}

export function getWebSocket(game_id) {
  if (ws === null) {
    const token_refresh = localStorage.getItem("refreshToken");
    refreshAccessToken(token_refresh);
    const token_access = localStorage.getItem("accessToken");
    const url = `wss://trivia-bck.herokuapp.com/ws/trivia/${game_id}/?token=${token_access}`;
    const ws = new WebSocket(url);
    let game;
    ws.onopen = async function (event) {
      console.log("Conectado");
      let profile = await getProfile();
      // FIXME: Cant get players from started game
      try {
        game = profile.games_created.find((game) => game.id === Number(game_id));
      } catch (error) {
        
      }

      try {
        game = profile.games_joined.find((game) => game.id === Number(game_id));
      } catch (error) {
        
      }
      
      console.log(profile)
      console.log(game)
      addPlayersLobby(game);
    };
    ws.onmessage = async function (event) {
      console.log(event);
      const data = JSON.parse(event.data);
      if (data.type === "player_joined") {
        game = await getGame(game_id);
        addPlayersLobby(game);
      } else if (data.type === "player_unjoined") {
        game = await getGame(game_id);
        addPlayersLobby(game);
      } else if (data.type === "game_deleted") {
        alert("La partida ha sido eliminada");
        location.href = "home.html";
      } else if (data.type === "game_started") {
        location.href = `partida.html?game_id=${game_id}`;
      }
    };
    ws.onclose = function (event) {
      console.log("Desconectado");
    };
    ws.onerror = function (event) {
      console.log("Error");
    };
    setWebSocket(ws);
  }
  return ws;
}
