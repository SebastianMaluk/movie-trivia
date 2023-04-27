export function drawGameContainer(user_id, nosy_id) {
    if (user_id === nosy_id) {
        const preguntonPreguntaContainer = document.getElementById("preguntonPreguntaContainer");
        const preguntonRespuestaContainer = document.getElementById("preguntonRespuestaContainer");

        preguntonPreguntaContainer.classList.remove("hidden");
        preguntonRespuestaContainer.classList.remove("hidden");
    } else {
        const answerContainer = document.getElementById("answerContainer");
        answerContainer.classList.remove("hidden");

        const textoPreguntaPlayer = document.getElementById("textoPreguntaPlayer");
        textoPreguntaPlayer.textContent = "Esperando pregunta..."
    }
}