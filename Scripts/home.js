import { customFetch } from "./fetch.js";

var crearPartidaBtn = document.getElementById("crearPartidaBtn");
var contenedorPartidas = document.getElementById("contenedorPartidas");

crearPartidaBtn.onclick = function () {
  location.href = "crearPartida.html";
};

window.onload = async function onInitialized() {
  console.log(localStorage["accessToken"]);

  getPartidas();
};

function getPartidas() {
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
      partidas.forEach((game) => {
        // console.log(`game.creator.username: ${game.creator.username}`);
        // console.log(`game.players: ${game.players}`);
        // console.log(`game.question_time: ${game.question_time}`);
        // console.log(`game.answer_time ${game.answer_time}`);
        // console.log(`game.rounds_number ${game.rounds_number}`);
        // console.log(`game.started: ${game.started}`);
        // console.log(`game.ended ${game.ended}`);
        if (!game.started && !game.ended) {
          // create parent div element
          const parentDiv = document.createElement("div");
          parentDiv.className =
            "bg-white p-5 rounded-lg text-secondary shadow-lg mb-2";

          // create child grid element
          const gridDiv = document.createElement("div");
          gridDiv.className = "grid grid-cols-5 gap-4";

          // create child div elements for each grid column
          const col1Div = document.createElement("div");
          col1Div.className = "col-span-1 text-left";
          const col2Div = document.createElement("div");
          col2Div.className = "col-span-1 flex items-center justify-center";
          const col3Div = document.createElement("div");
          col3Div.className = "col-span-1 flex items-center justify-center";
          const col4Div = document.createElement("div");
          col4Div.className = "col-span-1 flex items-center justify-center";
          const col5Div = document.createElement("div");
          col5Div.className = "col-span-1 text-right";

          // create child p element for the first column
          const pElement = document.createElement("p");
          pElement.className = "font-bold text-xl";
          pElement.textContent = game.name;

          // create child img element and span element for the second column
          const imgElement = document.createElement("img");
          imgElement.src =
            "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";
          imgElement.className = "w-6 sm:w-10";

          // create child element for the second column
          const spanElementPlayerCount = document.createElement("span");
          spanElementPlayerCount.className = "text-xl";
          spanElementPlayerCount.textContent = game.player_count + "/12";

          // create child element for the third column
          const spanElementQuestionTime = document.createElement("span");
          spanElementQuestionTime.className = "text-xl";
          spanElementQuestionTime.textContent = game.question_time;

          // create child element for the fourth column
          const spanElementAnswerTime = document.createElement("span");
          spanElementAnswerTime.className = "text-xl";
          spanElementAnswerTime.textContent = game.question_time;

          // create child button element for the fifth column
          const buttonElement = document.createElement("button");
          buttonElement.onclick = () => {
            const joinGame = {
              url: `https://trivia-bck.herokuapp.com/api/games/${game.id}/join_game/`,
              args: {
                method: "POST",
                headers: {
                  Authorization:
                    "Bearer " + localStorage.getItem("accessToken"),
                },
              },
            };
            customFetch(joinGame.url, joinGame.args)
              .then((response) => response.json())
              .then((data) => {
                console.log("Success:", data);
                location.href = "lobby.html";
              })
              .catch((error) => console.error("Error:", error));
          };
          buttonElement.id = "unirmeBtn-" + game.id;
          buttonElement.className =
            "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg";
          buttonElement.textContent = "Unirme";

          // append child elements to their respective parent elements
          col1Div.appendChild(pElement);
          col2Div.appendChild(imgElement);
          col2Div.appendChild(spanElementPlayerCount);
          col3Div.appendChild(spanElementQuestionTime);
          col4Div.appendChild(spanElementAnswerTime);
          col5Div.appendChild(buttonElement);
          gridDiv.appendChild(col1Div);
          gridDiv.appendChild(col2Div);
          gridDiv.appendChild(col3Div);
          gridDiv.appendChild(col4Div);
          gridDiv.appendChild(col5Div);
          parentDiv.appendChild(gridDiv);

          // append parent div element to the container
          const container = document.getElementById("contenedorPartidas");
          container.appendChild(parentDiv);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching games:", error);
    });
}
