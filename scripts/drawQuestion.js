export function drawQuestion(user_id, nosy_id, question) {
  if (user_id !== nosy_id) {
    const answerContainer = document.getElementById("answerContainer");
    answerContainer.classList.remove("hidden");

    const textoPreguntaPlayer = document.getElementById("textoPreguntaPlayer");
    textoPreguntaPlayer.textContent = question;
  }
}
