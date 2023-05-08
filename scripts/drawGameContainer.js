export function drawGameContainer(user_id, nosy_id) {
  const questionContainer = document.getElementById("questionContainer");
  const answerContainer = document.getElementById("answerContainer");
  if (user_id === nosy_id) {
    const preguntonPreguntaContainer = document.getElementById(
      "preguntonPreguntaContainer"
    );
    const abrirModalPreguntaBtn = document.getElementById(
        "abrirModalPreguntaBtn"
    );

    const preguntonRespuestaContainer = document.getElementById(
      "preguntonRespuestaContainer"
    );
    const abrirModalRespuestaBtn = document.getElementById(
        "abrirModalRespuestaBtn"
    );
    const respuestasContainer = document.getElementById("incomingAnswers");

    preguntonPreguntaContainer.classList.remove("hidden");
    abrirModalPreguntaBtn.classList.remove("hidden");
    preguntonRespuestaContainer.classList.remove("hidden");
    abrirModalRespuestaBtn.classList.remove("hidden");
    respuestasContainer.classList.remove("hidden");

    const textoPreguntaPregunton = document.getElementById(
        "textoPreguntaPregunton"
    );
    textoPreguntaPregunton.textContent = "Pregunta:";
  } else {
    questionContainer.classList.remove("hidden");
    answerContainer.classList.remove("hidden");

    const textoPreguntaPlayer = document.getElementById("textoPreguntaPlayer");
    textoPreguntaPlayer.textContent = "Esperando pregunta...";
  }
}
