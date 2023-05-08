export function cleanUp() {
    const preguntonPreguntaContainer = document.getElementById(
        "preguntonPreguntaContainer"
    );
    const preguntonRespuestaContainer = document.getElementById(
        "preguntonRespuestaContainer"
    );
    const respuestasContainer = document.getElementById("incomingAnswers");
    const questionContainer = document.getElementById("questionContainer");
    const answerContainer = document.getElementById("answerContainer");
    const roundReviewAnswerContainer = document.getElementById("roundReviewAnswerContainer");

    preguntonPreguntaContainer.classList.add("hidden");
    preguntonRespuestaContainer.classList.add("hidden");
    respuestasContainer.classList.add("hidden");
    questionContainer.classList.add("hidden");
    answerContainer.classList.add("hidden");
    roundReviewAnswerContainer.classList.add("hidden");
}