import { getGame } from "./getGame.js";
import { getStartedGame } from "./getStartedGame.js";
import { addPlayersLobby } from "./addPlayersLobby.js";
import { addPlayersInGame } from "./addPlayersInGame.js";
import { refreshAccessToken } from "./fetch.js";
import { getProfile } from "./getProfile.js";
import { drawGameContainer } from "./drawGameContainer.js";
import { drawQuestion } from "./drawQuestion.js";
import { drawResponses } from "./drawResponses.js";
import { drawRoundReview } from "./drawRoundReview.js";
import { cleanUp } from "./cleanUp.js";

export class CustomWebSocket {
  constructor() {
    const params = new URLSearchParams(window.location.search);
    this.game_id = Number(params.get("game_id"));
    const access_token = localStorage.getItem("accessToken");
    const ws_url = new URL(
      `wss://trivia-bck.herokuapp.com/ws/trivia/${this.game_id}/`
    );
    ws_url.searchParams.set("token", access_token);

    this.ws = new WebSocket(ws_url.href);
    this.game = null;
    this.user_id = null;
    this.nosy_id = null;
  }
  async setUserId() {
    const profile = await getProfile();
    this.user_id = profile.id;
  }

  async setGame() {
    let game = await getStartedGame(this.game_id);
    if (game.message === "El juego aun no ha comenzado.") {
      game = await getGame(this.game_id);
    } else {
      this.nosy_id = game.round.nosy;
      drawGameContainer(this.user_id, this.nosy_id);
    }
    this.game = game;
  }

  async setUp() {
    await this.setUserId();
    console.log({ user_id: this.user_id });
    await this.setGame();
    console.log({ game: this.game });
    this.createListeners();
  }

  createListeners() {
    if (this.ws === null) {
      return null;
    }
    this.ws.onmessage = async (event) => {
      console.log(event.data);
      const data = JSON.parse(
        event.data.substring(0, event.data.lastIndexOf("}") + 1)
      );
      let game;
      let user;
      let nosy_id;
      let question;
      let url;
      let response_user;
      let response_text;
      if (data.type === "player_joined") {
        this.game = await getGame(this.game_id);
        addPlayersLobby(this.game);
      } else if (data.type === "player_unjoined") {
        addPlayersLobby(this.game);
      } else if (data.type === "game_deleted") {
        alert("La partida ha sido eliminada");
        url = new URL("/views/home.html", window.location);
        window.location.href = url.href;
      } else if (data.type === "game_started") {
        url = new URL("/views/partida.html", window.location);
        url.searchParams.set("game_id", this.game_id);
        window.location.href = url.href;
      } else if (data.type === "round_started") {
        cleanUp();
        console.log("Round started");
        this.nosy_id = data.nosy_id;
        console.log({ user_id: this.user_id });
        console.log({ nosy_id: this.nosy_id });
        drawGameContainer(this.user_id, this.nosy_id);
        addPlayersInGame(this.game.players, this.nosy_id, this.user_id);
      } else if (data.type === "round_question") {
        question = data.question;
        drawQuestion(this.user_id, this.nosy_id, question);
      } else if (data.type === "round_answer") {
        console.log({ data })
        if (this.user_id === this.nosy_id) {
          drawResponses(data.userid, data.answer, this.game.players, this.sendGrade.bind(this));
        }
      } else if (data.type === "round_review_answer") {
        if (this.user_id !== this.nosy_id) {
          drawRoundReview(data.correct_answer, data.graded_answer, data.grade, this.sendReview.bind(this));
        }
      }
    };
    this.ws.onclose = function (event) {
      console.log({ event })
      console.log("Desconectado");
      const url = new URL("/views/home.html", window.location);
      //   window.location.href = url.href;
    }
    this.ws.onerror = function (event) {
      console.log("Error");
    };
  }

  disconnect() {
    if (this.ws !== null) {
      this.ws.close();
      this.ws = null;
    }
  }

  startGame(rounds) {
    const data = {
      action: "start",
      rounds: Number(rounds),
    };
    this.ws.send(JSON.stringify(data));
  }

  sendQuestion(question) {
    const data = {
      action: "question",
      text: question,
    };
    this.ws.send(JSON.stringify(data));
  }

  sendAnswer(answer) {
    const data = {
      action: "answer",
      text: answer,
    };
    this.ws.send(JSON.stringify(data));
  }

  sendGrade(user_id, grade) {
    const data = {
      action: "qualify",
      userid: user_id,
      grade: grade,
    };
    this.ws.send(JSON.stringify(data));
  }

  sendReview(correctness) {
    const data = {
      action: "assess",
      correctness: correctness,
    };
    this.ws.send(JSON.stringify(data));
  }
}
