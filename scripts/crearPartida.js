import { customFetch } from "./fetch.js";

let nombrePartida = document.getElementById("nombrePartida");
let tiempoPregunta = document.getElementById("tiempoPregunta");
let tiempoRespuesta = document.getElementById("tiempoRespuesta");

let crearPartidaBtn = document.getElementById("crearPartidaBtn");
console.log(crearPartidaBtn);
crearPartidaBtn.onclick = async function () {
  const jsonData = JSON.stringify({
    name: nombrePartida.value,
    question_time: Number(tiempoPregunta.value),
    answer_time: Number(tiempoRespuesta.value),
  });
  const newGame = {
    url: "https://trivia-bck.herokuapp.com/api/games/",
    args: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      body: jsonData,
    },
  };
  customFetch(newGame.url, newGame.args)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const url = new URL("/views/lobby.html", window.location);
      url.searchParams.set("game_id", data.id);
      window.location.href = url.href;
    });
};

// Export
