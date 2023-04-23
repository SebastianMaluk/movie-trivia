var crearPartidaBtn = document.getElementById("crearPartidaBtn");
var contenedorPartidas = document.getElementById("contenedorPartidas");

crearPartidaBtn.onclick = function () {
  location.href = "crearPartida.html";
};

window.onload = async function onInitialized() {
  console.log(localStorage["accessToken"]);

  getPartidas();

  var unirmeBtn = document.getElementById("unirmeBtn");
  unirmeBtn.onclick = function () {
    location.href = "lobby.html";
  };
};

function getPartidas() {
  // Para la api

  // fetch("http://localhost:3000/partidas")
  // .then((response) => response.json())
  // .then((partidas) => {
  //     crearPartidaBtn.addEventListener("click", () => {
  //       crearPartida(partidas);
  //     });
  //   });

  //Por ahora
  for (let i = 0; i < 6; i++) {
    // create parent div element
    const parentDiv = document.createElement("div");
    parentDiv.className =
      "bg-white p-5 rounded-lg text-secondary shadow-lg mb-2";

    // create child grid element
    const gridDiv = document.createElement("div");
    gridDiv.className = "grid grid-cols-3 gap-4";

    // create child div elements for each grid column
    const col1Div = document.createElement("div");
    col1Div.className = "col-span-1 text-left";
    const col2Div = document.createElement("div");
    col2Div.className = "col-span-1 flex items-center justify-center";
    const col3Div = document.createElement("div");
    col3Div.className = "col-span-1 text-right";

    // create child p element for the first column
    const pElement = document.createElement("p");
    pElement.className = "font-bold text-xl";
    pElement.textContent = "Partida " + (i + 1);

    // create child img element and span element for the second column
    const imgElement = document.createElement("img");
    imgElement.src =
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";
    imgElement.className = "w-6 sm:w-10";

    const spanElement = document.createElement("span");
    spanElement.className = "text-xl";
    n = Math.floor(Math.random() * 12) + 1;
    spanElement.textContent = " " + n + "/12";

    // create child button element for the third column
    const buttonElement = document.createElement("button");
    buttonElement.id = "unirmeBtn";
    buttonElement.className =
      "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg";
    buttonElement.textContent = "Unirme";

    // append child elements to their respective parent elements
    col1Div.appendChild(pElement);
    col2Div.appendChild(imgElement);
    col2Div.appendChild(spanElement);
    col3Div.appendChild(buttonElement);
    gridDiv.appendChild(col1Div);
    gridDiv.appendChild(col2Div);
    gridDiv.appendChild(col3Div);
    parentDiv.appendChild(gridDiv);

    // append parent div element to the container
    const container = document.getElementById("contenedorPartidas");
    container.appendChild(parentDiv);
  }
}
