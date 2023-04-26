import { customFetch } from "./fetch.js";
import { getGame } from "./getGame.js";
import { getProfile } from "./getProfile.js";
import { getWebSocket } from "./websocket.js";

window.addEventListener("load", async function () {
  const url_string = window.location.href;
  // split url string by ? and get the second element of the array
  const parameters = url_string.split("?")[1];
  console.log(url_string);
  // split url by = and get the second element of the array
  const game_id = parameters.split("=")[1];
  const ws = getWebSocket(game_id);
  //   top lobby generator
  const topLobby = document.getElementById("topLobby");
  const profile = await getProfile();
  const game = await getGame(game_id);
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
    startGameBtn.addEventListener("click", async function () {
      const rounds = document.getElementById("cantidadRondas").value;
      ws.send(JSON.stringify({ action: "start", rounds: Number(rounds) }));
    });
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
    div.classList.add("text-4xl", "py-4");
    div.textContent = "Esperando a que comience la partida";
    topLobby.appendChild(div);
  }
});
