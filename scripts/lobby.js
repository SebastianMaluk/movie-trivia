import { customFetch } from "./fetch.js";

window.addEventListener("load", async function () {
  const token_access = localStorage.getItem("accessToken");
  const url_string = window.location.href;
  // split url string by ? and get the second element of the array
  const parameters = url_string.split("?")[1];
  console.log(url_string);
  // split url by = and get the second element of the array
  const game_id = parameters.split("=")[1];

  const url = `wss://trivia-bck.herokuapp.com/ws/trivia/${game_id}/?token=${token_access}`;
  const ws = new WebSocket(url);
  let game;
  ws.onopen = async function (event) {
    console.log("Conectado");
    game = await getGame(game_id);
    addPlayers(game);
  };
  ws.onmessage = async function (event) {
    console.log(event);
    const data = JSON.parse(event.data);
    if (data.type === "player_joined") {
      game = await getGame(game_id);
      addPlayers(game);
    } else if (data.type === "player_unjoined") {
      game = await getGame(game_id);
      addPlayers(game);
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

  //   top lobby generator
  const topLobby = document.getElementById("topLobby");
  const profile = await getProfile();
  game = await getGame(game_id);
  if (profile.id === game.creator.id) {
    const label = document.createElement("label");
    label.setAttribute("for", "cantidadRondas");
    label.classList.add(
      "block",
      "text-gray-700",
      "font-bold",
      "mb-2",
      "text-center"
    );
    label.textContent = "Número de Rondas";

    // Create the input element
    const input = document.createElement("input");
    input.type = "number";
    input.id = "cantidadRondas";
    input.placeholder = "Ingrese un número";
    input.classList.add(
      "appearance-none",
      "border",
      "rounded",
      "py-2",
      "px-3",
      "text-gray-700",
      "text-center",
      "leading-tight",
      "focus:outline-none",
      "focus:shadow-outline"
    );

    // Create the div container for the buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add(
      "w-full",
      "flex",
      "justify-center",
      "mt-6",
      "align-center"
    );

    // Create the start game button
    const startGameBtn = document.createElement("a");
    startGameBtn.href = "partida.html";
    startGameBtn.classList.add(
      "bg-blue-500",
      "hover:bg-blue-600",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded",
      "focus:outline-none",
      "focus:shadow-outline"
    );
    startGameBtn.textContent = "Empezar Partida";

    // Create the cancel game button
    const cancelGameBtn = document.createElement("a");
    cancelGameBtn.href = "home.html";
    cancelGameBtn.classList.add(
      "bg-red-500",
      "hover:bg-red-600",
      "text-white",
      "font-bold",
      "py-2",
      "px-6",
      "rounded",
      "focus:outline-none",
      "focus:shadow-outline",
      "ml-2"
    );
    cancelGameBtn.textContent = "Cancelar Partida";

    // Append the buttons to the button container
    buttonContainer.appendChild(startGameBtn);
    buttonContainer.appendChild(cancelGameBtn);

    // Append the label, input, and button container to the top lobby
    topLobby.appendChild(label);
    topLobby.appendChild(input);
    topLobby.appendChild(buttonContainer);
  } else {
    const div = document.createElement("div");
    div.classList.add("text-4xl");
    div.textContent = "Esperando a que comience la partida";
    topLobby.appendChild(div);
  }
});

async function getGame(game_id) {
  const games = {
    url: "https://trivia-bck.herokuapp.com/api/games/",
    args: {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    },
  };

  try {
    const response = await customFetch(games.url, games.args);
    const partidas = await response.json();
    // get game with the id passed as parameter
    const game = partidas.find((game) => game.id === Number(game_id));
    return game;
  } catch (error) {
    throw error;
  }
}

async function getProfile() {
  const profile = {
    url: "https://trivia-bck.herokuapp.com/api/profile/",
    args: {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    },
  };

  try {
    const response = await customFetch(profile.url, profile.args);
    const user = await response.json();
    return user;
  } catch (error) {
    throw error;
  }
}

function addPlayers(game) {
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
}
