export function addPlayersInGame(players, nosy_id, user_id) {
  const scoreboard = document.getElementById("bordeParticipantes");
  scoreboard.innerHTML = "";
  drawScoreboardHeader();
  const jpg = "../imgs/question-mark.svg";
  players.forEach((player) => {
    let row_container = document.createElement("div");
    row_container.className =
      "mx-auto my-2 rounded shadow-md text-xs main-color";
    scoreboard.appendChild(row_container);

    let row = document.createElement("div");
    row.className = "flex px-2 py-2 items-start";
    row_container.appendChild(row);

    // add child to row
    let col1 = document.createElement("div");
    col1.className = "w-4/12 flex";
    row.appendChild(col1);

    // add child to col1
    let img = document.createElement("img");
    img.className = "w-6 sm:w-10 mr-2 self-center opacity-0";
    if (player.id === nosy_id) {
      img.classList.remove("opacity-0");
    }
    img.src = jpg;
    col1.appendChild(img);

    // add child to col1
    let col1div = document.createElement("div");
    col1div.className = "flex flex-col";
    col1.appendChild(col1div);

    // add child to col1div
    let col1divp1 = document.createElement("p");
    col1divp1.className = "text-s font-bold";
    if (player.id === user_id) {
        col1divp1.classList.add("text-green-500");
    }
    col1divp1.innerHTML = player.username;
    col1div.appendChild(col1divp1);

    // add child to row
    let col2 = document.createElement("div");
    col2.className = "w-5/12 flex justify-end items-center";
    row.appendChild(col2);

    // add child to col2
    let col2p1 = document.createElement("p");
    col2p1.className = "w-5/12 px-1 text-center";
    col2p1.innerHTML = player.faults;
    col2.appendChild(col2p1);

    // add child to col2
    let col2p2 = document.createElement("p");
    col2p2.className = "w-7/12 px-1 text-center";
    if (player.faults >= 3) {
      col2p2.innerHTML = "SI";
    } else {
      col2p2.innerHTML = "NO";
    }
    col2.appendChild(col2p2);

    // add child to row
    let col3 = document.createElement("p");
    col3.className = "w-3/12 text-lg sm:text-xl font-bold text-right";
    col3.innerHTML = player.score;
    row.appendChild(col3);
  });
}

function drawScoreboardHeader() {
  const div1 = document.createElement("div");
  div1.id = "scoreboard_header";
  div1.classList.add("my-2", "rounded", "shadow-md", "text-xs", "min-w-fit");

  const div2 = document.createElement("div");
  div2.classList.add(
    "flex",
    "items-start",
    "bg-gray-200",
    "px-2",
    "py-2",
    "min-w-fit"
  );

  const div3 = document.createElement("div");
  div3.classList.add("w-4/12", "text-center", "text-red-700");
  div3.textContent = "Jugadores";

  const div4 = document.createElement("div");
  div4.classList.add(
    "w-5/12",
    "flex",
    "justify-end",
    "items-center",
    "text-red-700"
  );

  const p1 = document.createElement("p");
  p1.classList.add("w-5/12", "px-2", "text-center");
  p1.textContent = "Errores";

  const p2 = document.createElement("p");
  p2.classList.add("w-7/12", "px-2", "text-center");
  p2.textContent = "Descalificado";

  const div5 = document.createElement("div");
  div5.classList.add("w-3/12", "text-red-700", "text-right");
  div5.textContent = "Puntaje";

  div4.appendChild(p1);
  div4.appendChild(p2);

  div2.appendChild(div3);
  div2.appendChild(div4);
  div2.appendChild(div5);

  div1.appendChild(div2);

  const scoreboard = document.getElementById("bordeParticipantes");

  scoreboard.appendChild(div1);
}
