export function cleanUp() {
    const preguntonPreguntaContainer = document.getElementById(
        "preguntonPreguntaContainer"
    );
    const preguntonRespuestaContainer = document.getElementById(
        "preguntonRespuestaContainer"
    );
    const respuestasContainer = document.getElementById("incomingAnswers");
    const answerContainer = document.getElementById("answerContainer");
    
    preguntonPreguntaContainer.classList.add("hidden");
    preguntonRespuestaContainer.classList.add("hidden");
    respuestasContainer.classList.add("hidden");
    answerContainer.classList.add("hidden");
}