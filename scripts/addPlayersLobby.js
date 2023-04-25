export function addPlayersLobby(game) {
    console.log(game);
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
  