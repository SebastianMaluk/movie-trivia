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
import { drawGameStats } from "./drawGameStats.js";
import { cleanUp } from "./cleanUp.js";
import { questionCountdown } from "./drawGameStats.js";
import { answerCountdown } from "./drawGameStats.js";
import { qualifyCountdown } from "./drawGameStats.js";
import { getHelp } from "./help.js";


export class CustomWebSocket {
  constructor() {
    this.game = null;
    this.user_id = null;
  }

  async asyncConstructor() {
    const params = new URLSearchParams(window.location.search);
    this.game_id = Number(params.get("game_id"));
    const access_token = localStorage.getItem("accessToken");
    const ws_url = new URL(
      `wss://trivia-bck.herokuapp.com/ws/trivia/${this.game_id}/`
    );
    ws_url.searchParams.set("token", access_token);

    this.ws = new WebSocket(ws_url.href);
    await this.setGame();
    await this.setUserId();
    await this.createListeners();
  }

  async setUserId() {
    const profile = await getProfile();
    this.user_id = profile.id;
  }

  async setGame() {
    // get game_id from url
    const params = new URLSearchParams(window.location.search); 
    this.game_id = Number(params.get("game_id"));
    let game = await getStartedGame(this.game_id);
    if (game.message === "El juego aun no ha comenzado.") {
      game = await getGame(this.game_id);
      localStorage.setItem("questionTime", game.question_time);
      localStorage.setItem("answerTime", game.answer_time);
    }
    this.game = game;
  }


  async createListeners() {
    if (this.ws === null) {
        console.log("Websocket not connected")
      return null;
    }
    this.ws.onopen = async () => {
        await this.setGame();
        await this.setUserId();
        if (this.game.hasOwnProperty("started")) { // means game hasn't started
            if (this.game.started === null) {
                console.log("Game hasn't started");
                console.log("You are on lobby");
            }
        } else {
            drawGameContainer(this.user_id, this.game.round.nosy)
        }        
    };

    this.ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      console.log({ data });
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
        await this.setGame();
        drawGameStats(
          this.game.rounds,
          this.game.current_round,
          localStorage.getItem("questionTime"),
          localStorage.getItem("answerTime"),
          this.user_id,
          data.nosy_id
        );
        drawGameContainer(this.user_id, data.nosy_id);
        addPlayersInGame(this.game.players, data.nosy_id, this.user_id);
        questionCountdown();
      } else if (data.type === "round_question") {
        question = data.question;
        drawQuestion(this.user_id, this.game.round.nosy, question);
        answerCountdown();
        if (this.user_id !== this.game.round.nosy) {
            getHelp(data.question);
        }
      } else if (data.type === "round_answer") {
        if (this.user_id === this.game.round.nosy) {
          drawResponses(
            data.userid,
            data.answer,
            this.game.players,
            this.sendGrade.bind(this)
          );
        }
      } else if (data.type === "round_review_answer") {
        if (this.user_id !== this.game.round.nosy) {
          drawRoundReview(
            data.correct_answer,
            data.graded_answer,
            data.grade,
            this.sendReview.bind(this)
          );
        }
      } else if (data.type === "round_review_answer") {
        if (this.user_id !== this.game.round.nosy) {
          drawRoundReview(
            data.correct_answer,
            data.graded_answer,
            data.grade,
            this.sendReview.bind(this)
          );
          qualifyCountdown(30);
        }
      } else if (data.type === "answer_time_ended") {
        if (this.user_id === this.game.round.nosy) {
          qualifyCountdown(90);
        }
      } else if (data.type === "round_result") {
        addPlayersInGame(this.game.players, this.game.round.nosy, this.user_id);
      }
    };
    this.ws.onclose = function (event) {
      console.log({ event });
      console.log("Desconectado");
      const url = new URL("/views/home.html", window.location);
      //   window.location.href = url.href;
    };
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
