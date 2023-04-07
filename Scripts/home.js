var crearPartidaBtn = document.getElementById("crearPartidaBtn");
var contenedorPartidas = document.getElementById("contenedorPartidas");

crearPartidaBtn.onclick = function () {
  location.href = "crearPartida.html";
};

window.onload = function onInitialized() {
  getPartidas();

  var unirmeBtn = document.getElementById("unirmeBtn");
  unirmeBtn.onclick = function () {
    location.href = "main.html";
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
    contenedorPartidas.innerHTML +=
      '<div class="bg-white p-5 rounded-lg text-secondary shadow-lg mb-2"> <div class="grid grid-cols-3 gap-4"> <div class="col-span-1 text-left"> <p class="font-bold text-xl">Partida ' +
      (i + 1) +
      '</p> </div> <div class="col-span-1 flex items-center justify-center"> <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" style="max-width: 10% !important;"> <span class="text-xl">3/4</span> </div> <div class="col-span-1 text-right"> <button id="unirmeBtn" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Unirme</button> </div> </div> </div>';
  }
}
