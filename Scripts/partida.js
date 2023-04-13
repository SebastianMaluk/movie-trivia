//Modal
const blurFondo = document.getElementById("blur");
const preguntaModal = document.getElementById("preguntaModal");
const cerrarModalBtn = document.getElementById("cerrarModalBtn");
const abrirModalBtn = document.getElementById("abrirModalBtn");
const textoPregunta = document.getElementById("textoPregunta");

const respuestaPreguntonInput = document.getElementById(
  "respuestaPreguntonInput"
);
const enviarPreguntaBtn = document.getElementById("enviarPreguntaBtn");

window.onload = function onInitialized() {
  addParticipantes([
    "Nombre de Usuario 1",
    "Nombre de Usuario 2",
    "Nombre de Usuario 3",
    "Nombre de Usuario 4",
    "Nombre de Usuario 5",
    "Nombre de Usuario 6",
    "Nombre de Usuario 7",
    "Nombre de Usuario 8",
  ]);

  textoPregunta.innerHTML =
    "Tú eres el Preguntón, ingresa tu pregunta para que inicie la ronda";
};

function addParticipantes(participantes) {
  const container = document.getElementById("bordeParticipantes");

  container.innerHTML = "";

  participantes.forEach((participante) => {
    const div = document.createElement("div");
    div.classList.add("border-b", "border-gray-400", "py-4");
    div.textContent = participante;
    container.appendChild(div);
  });
}

abrirModalBtn.onclick = function () {
  preguntaModal.classList.remove("hidden");
  blurFondo.classList.remove("hidden");
};

cerrarModalBtn.onclick = function () {
  preguntaModal.classList.add("hidden");
  blurFondo.classList.add("hidden");
};

enviarPreguntaBtn.onclick = function (event) {
  event.preventDefault();
  var pregunta = respuestaPreguntonInput.value;
  textoPregunta.innerHTML = pregunta;
  abrirModalBtn.classList.add("hidden");
  preguntaModal.classList.add("hidden");
  blurFondo.classList.add("hidden");
};
