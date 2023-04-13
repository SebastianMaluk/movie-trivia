const blurFondo = document.getElementById("blur");

// Modal Pregunta
const preguntaModal = document.getElementById("preguntaModal");
const cerrarModalPreguntaBtn = document.getElementById("cerrarModalPreguntaBtn");
const abrirModalPreguntaBtn = document.getElementById("abrirModalPreguntaBtn");
const textoPregunta = document.getElementById("textoPregunta");

const respuestaPreguntonInput = document.getElementById(
  "preguntaInput"
);
const enviarPreguntaBtn = document.getElementById("enviarPreguntaBtn");


// Modal Respuesta
const respuestaModal = document.getElementById("respuestaModal");
const cerrarModalRespuestaBtn = document.getElementById("cerrarModalRespuestaBtn");
const abrirModalRespuestaBtn = document.getElementById("abrirModalRespuestaBtn");
const textoRespuesta = document.getElementById("textoRespuesta");

const respuestaParticipanteInput = document.getElementById(
    "respuestaInput"
);
const enviarRespuestaBtn = document.getElementById("enviarRespuestaBtn");



window.onload = function onInitialized() {
    addParticipantes();

    textoPregunta.innerHTML =
    "Tú eres el Preguntón, ingresa tu pregunta para que inicie la ronda";
    textoRespuesta.innerHTML =
    "Ingresa la respuesta correcta";
};

function addParticipantes() {
  const container = document.getElementById("bordeParticipantes");

  const names = ['Sebastian', 'Javier', 'Matias']
  const jpg = '../imgs/question-mark.svg'
  const scores = [123, 109, 109]
  for (let i = 0; i < names.length; i++) {
    let row_container = document.createElement('div');
    row_container.className = 'mx-auto my-2 rounded shadow-md text-xs text-gray-500';
    container.appendChild(row_container);
    let row = document.createElement('div');
    row.className = 'flex px-2 py-2 items-start';
    row_container.appendChild(row);
    // add child to row
    let col1 = document.createElement('div');
    col1.className = 'w-4/12 flex';
    row.appendChild(col1);
    // add child to col1
    let img = document.createElement('img');
    img.className = 'w-6 sm:w-10 mr-2 self-center opacity-0';
    if (i == 0) {
      img.classList.remove('opacity-0');
    }
    img.src = jpg;
    col1.appendChild(img);
    // add child to col1
    let col1div = document.createElement('div');
    col1div.className = 'flex flex-col';
    col1.appendChild(col1div);
    // add child to col1div
    let col1divp1 = document.createElement('p');
    col1divp1.className = 'text-s font-bold';
    col1divp1.innerHTML = names[i];
    col1div.appendChild(col1divp1);
    // add child to row
    let col2 = document.createElement('div');
    col2.className = 'w-5/12 flex justify-end items-center';
    row.appendChild(col2);
    // add child to col2
    let col2p1 = document.createElement('p');
    col2p1.className = 'w-5/12 px-1 text-center';
    col2p1.innerHTML = '0';
    col2.appendChild(col2p1);
    // add child to col2
    let col2p2 = document.createElement('p');
    col2p2.className = 'w-7/12 px-1 text-center';
    col2p2.innerHTML = 'NO';
    col2.appendChild(col2p2);
    // add child to row
    let col3 = document.createElement('p');
    col3.className = 'w-3/12 text-lg sm:text-xl font-bold text-right';
    col3.innerHTML = scores[i];
    row.appendChild(col3);
  };
}

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
  var pregunta = respuestaPreguntonInput.value;
  textoPregunta.innerHTML = pregunta;
  abrirModalPreguntaBtn.classList.add("hidden");
  preguntaModal.classList.add("hidden");
  blurFondo.classList.add("hidden");
};

abrirModalRespuestaBtn.onclick = function () {
    respuestaModal.classList.remove("hidden");
    blurFondo.classList.remove("hidden");
};

cerrarModalRespuestaBtn.onclick = function () {
    respuestaModal.classList.add("hidden");
    blurFondo.classList.add("hidden");
};

enviarRespuestaBtn.onclick = function (event) {
    event.preventDefault();
    var respuesta = respuestaPreguntonInput.value;
    textoRespuesta.innerHTML = respuesta;
    abrirModalRespuestaBtn.classList.add("hidden");
    respuestaModal.classList.add("hidden");
    blurFondo.classList.add("hidden");
};