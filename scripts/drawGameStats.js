export function drawGameStats(rounds, currentRound, questionTime, answerTime) {
  console.log(rounds);
  console.log(currentRound);
  console.log(questionTime);
  console.log(answerTime);
  const roundContainer = document.getElementById("rondas");
  const questionTimeContainer = document.getElementById("tiempoPreguntar");
  const answerTimeContainer = document.getElementById("tiempoResponder");
  const qualifyTimeContainer = document.getElementById("tiempoCalificar");

  roundContainer.innerHTML = currentRound + " de " + rounds;
  questionTimeContainer.innerHTML = questionTime + " s";
  answerTimeContainer.innerHTML = answerTime + " s";
  qualifyTimeContainer.innerHTML = "90 s";
}
