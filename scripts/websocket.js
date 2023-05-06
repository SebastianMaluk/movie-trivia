import { getGame } from "./getGame.js";
import { getStartedGame } from "./getStartedGame.js";
import { addPlayersLobby } from "./addPlayersLobby.js";
import { addPlayersInGame } from "./addPlayersInGame.js";
import { refreshAccessToken } from "./fetch.js";
import { getProfile } from "./getProfile.js";
import { drawGameContainer } from "./drawGameContainer.js";
import { drawQuestion } from "./drawQuestion.js";
import { drawResponses } from "./drawResponses.js";

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
    ws.onopen = async function (event) {
      console.log("Conectado");
      let game = await getStartedGame(game_id);
      if (game.message === "El juego aun no ha comenzado.") {
        game = await getGame(game_id);
        addPlayersLobby(game);
      }
    };
    ws.onmessage = async function (event) {
      console.log(event.data);
      const data = JSON.parse(
        event.data.substring(0, event.data.lastIndexOf("}") + 1)
      );
      let game;
      let user;
      let nosy_id;
      let question;
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
      } else if (data.type === "round_started") {
        console.log("Round started");
        user = await getProfile();
        nosy_id = data.nosy_id;
        console.log({ user });
        console.log({ nosy_id });
        drawGameContainer(user.id, nosy_id);
        drawResponses(user.id, nosy_id);
        game = await getStartedGame(game_id);
        addPlayersInGame(game.players, nosy_id, user.id);
      } else if (data.type === "round_question") {
        user = await getProfile();
        game = await getStartedGame(game_id);
        nosy_id = game.round.nosy;
        question = data.question;
        drawQuestion(user.id, nosy_id, question);
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
