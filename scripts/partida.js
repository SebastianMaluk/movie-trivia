import { getWebSocket } from "./websocket.js";


const blurFondo = document.getElementById("blur");

// Modal Pregunta
const preguntaModal = document.getElementById("preguntaModal");
const cerrarModalPreguntaBtn = document.getElementById(
  "cerrarModalPreguntaBtn"
);
const abrirModalPreguntaBtn = document.getElementById("abrirModalPreguntaBtn");
const textoPreguntaPregunton = document.getElementById("textoPreguntaPregunton");

const preguntaPreguntonInput = document.getElementById("preguntaInput");
const enviarPreguntaBtn = document.getElementById("enviarPreguntaBtn");

// Modal Respuesta
const respuestaModal = document.getElementById("respuestaModal");
const cerrarModalRespuestaBtn = document.getElementById(
  "cerrarModalRespuestaBtn"
);
const abrirModalRespuestaBtn = document.getElementById(
  "abrirModalRespuestaBtn"
);
const textoRespuesta = document.getElementById("textoRespuesta");

const respuestaCorrectaInput = document.getElementById(
  "respuestaCorrectaInput"
);
const enviarRespuestaPreguntonBtn = document.getElementById("enviarRespuestaPreguntonBtn");

const preguntonPreguntaContainer = document.getElementById("preguntonPreguntaContainer");
const preguntonRespuestaContainer = document.getElementById("preguntonRespuestaContainer");

const respuestaInput = document.getElementById("respuestaInput");
const enviarRespuestaPlayerBtn = document.getElementById("enviarRespuestaPlayerBtn");

window.addEventListener("load", function () {
  preguntonPreguntaContainer.classList.add("hidden");
  preguntonRespuestaContainer.classList.add("hidden");
  const url = new URL(window.location.href);
  const game_id = url.searchParams.get("game_id");
  let ws = getWebSocket(game_id);
});


abrirModalPreguntaBtn.onclick = function () {
  preguntaModal.classList.remove("hidden");
  blurFondo.classList.remove("hidden");
};

cerrarModalPreguntaBtn.onclick = function () {
  preguntaModal.classList.add("hidden");
  blurFondo.classList.add("hidden");
};

enviarPreguntaBtn.onclick = function (event) {
  event.preventDefault();
  var pregunta = preguntaPreguntonInput.value;
  textoPreguntaPregunton.innerHTML = pregunta;
  abrirModalPreguntaBtn.classList.add("hidden");
  preguntaModal.classList.add("hidden");
  blurFondo.classList.add("hidden");

  let ws = getWebSocket();
    ws.send(
        JSON.stringify({action: 'question', text: pregunta})
    );
};

abrirModalRespuestaBtn.onclick = function () {
  respuestaModal.classList.remove("hidden");
  blurFondo.classList.remove("hidden");
};

cerrarModalRespuestaBtn.onclick = function () {
  respuestaModal.classList.add("hidden");
  blurFondo.classList.add("hidden");
};

enviarRespuestaPreguntonBtn.onclick = function (event) {
  event.preventDefault();
  var respuesta = respuestaCorrectaInput.value;
  textoRespuesta.innerHTML = respuesta;
  abrirModalRespuestaBtn.classList.add("hidden");
  respuestaModal.classList.add("hidden");
  blurFondo.classList.add("hidden");
};

enviarRespuestaPlayerBtn.onclick = function (event) {
    let respuesta = respuestaInput.value;
    let ws = getWebSocket();
    ws.send(
        JSON.stringify({action: 'answer', text: respuesta})
    );
};
