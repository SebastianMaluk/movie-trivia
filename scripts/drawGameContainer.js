export function drawGameContainer(user_id, nosy_id) {
    const answerContainer = document.getElementById("answerContainer");
    if (user_id === nosy_id) {
        answerContainer.classList.add("hidden");
        
        const preguntonPreguntaContainer = document.getElementById("preguntonPreguntaContainer");
        const preguntonRespuestaContainer = document.getElementById("preguntonRespuestaContainer");

        preguntonPreguntaContainer.classList.remove("hidden");
        preguntonRespuestaContainer.classList.remove("hidden");
    } else {
        answerContainer.classList.remove("hidden");

        const textoPreguntaPlayer = document.getElementById("textoPreguntaPlayer");
        textoPreguntaPlayer.textContent = "Esperando pregunta..."
    }
}