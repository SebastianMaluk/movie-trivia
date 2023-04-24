import { customFetch } from "./fetch.js";

window.addEventListener("load", function () {
  const token_access = localStorage.getItem("accessToken");
  const url_string = window.location.href;
  // split url string by ? and get the second element of the array
  const parameters = url_string.split("?")[1];
  console.log(url_string);
  // split url by = and get the second element of the array
  const game_id = parameters.split("=")[1];

  const url = `wss://trivia-bck.herokuapp.com/ws/trivia/${game_id}/?token=${token_access}`;
  const ws = new WebSocket(url);
  ws.onopen = function (event) {
    console.log("Conectado");
    addPlayers(game_id);
  };
  ws.onmessage = function (event) {
    console.log(event);
    const data = JSON.parse(event.data);
    if (data.type === "player_joined") {
      addPlayers(game_id);
    } else if (data.type === "player_unjoined") {
      addPlayers(game_id);
    } else if (data.type === "game_deleted") {
        alert("La partida ha sido eliminada");
      location.href = "home.html";
    }
  };
  ws.onclose = function (event) {
    console.log("Desconectado");
  };
  ws.onerror = function (event) {
    console.log("Error");
  };
});

function addPlayers(game_id) {
  const games = {
    url: "https://trivia-bck.herokuapp.com/api/games/",
    args: {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    },
  };
  customFetch(games.url, games.args)
    .then((response) => response.json())
    .then((partidas) => {
      // get game with the id passed as parameter
      const game = partidas.find((game) => game.id === Number(game_id));
      const creator = game.creator.username;
      const container = document.getElementById("contenedorUsuariosLobby");
      // clear container
      container.innerHTML = "";
      game.players.forEach((player) => {
        // create parent div element
        const parentDiv = document.createElement("div");
        parentDiv.className =
          "bg-white p-5 rounded-lg text-secondary shadow-lg mb-2";

        // create child flex div element
        const flexDiv = document.createElement("div");
        flexDiv.className = "flex justify-center";

        // create child div element for the column
        const col1Div = document.createElement("div");
        col1Div.className = "col-span-1 text-left";

        // create child p element for the column
        const pElement = document.createElement("p");
        if (player.username === creator) {
          pElement.className = "font-bold text-xl text-green-600";
        } else {
          pElement.className = "font-bold text-xl";
        }
        pElement.textContent = player.username;

        // append child elements to their respective parent elements
        col1Div.appendChild(pElement);
        flexDiv.appendChild(col1Div);
        parentDiv.appendChild(flexDiv);

        // append parent div element to the container
        container.appendChild(parentDiv);
      });
    });
}
