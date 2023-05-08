export function addPlayersInGame(players, nosy_id, user_id) {
  const scoreboard = document.getElementById("scoreboardContent");
  scoreboard.innerHTML = "";
  const jpg = "../imgs/question-mark.svg";
//   sort players by score
  players.sort((a, b) => {
    return b.score - a.score;
  });
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
    col2.className = "w-5/12 flex justify-center inline items-center";
    row.appendChild(col2);

    // add child to col2
    let col2p1 = document.createElement("span");
    col2p1.className = "flex";
    for (let i = 0; i < player.faults; i++) {
      let img = document.createElement("img");
      img.className = "w-6 self-center";
      img.src = "../imgs/fault.svg";
      col2p1.appendChild(img);
    }
    col2.appendChild(col2p1);

    if (player.faults === 3) {
        row.classList.add("bg-red-300");
    }

    // add child to row
    let col3 = document.createElement("p");
    col3.className = "w-3/12 text-lg sm:text-xl font-bold text-right";
    col3.innerHTML = player.score;
    row.appendChild(col3);
  });
}
