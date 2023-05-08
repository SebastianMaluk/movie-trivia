export function drawGameStats(
  rounds,
  currentRound,
  questionTime,
  answerTime,
  userId,
  nosyId
) {
  const roundContainer = document.getElementById("rondas");
  const questionTimeContainer = document.getElementById("tiempoPreguntar");
  const answerTimeContainer = document.getElementById("tiempoResponder");
  const qualifyTimeContainer = document.getElementById("tiempoCalificar");

  roundContainer.innerText = currentRound + " de " + rounds;
  questionTimeContainer.innerText = questionTime;
  answerTimeContainer.innerText = answerTime;
  if (userId === nosyId) {
    qualifyTimeContainer.innerText = 90;
  } else {
    qualifyTimeContainer.innerText = 30;
  }
}

export function questionCountdown() {
  const questionTimeContainer = document.getElementById("tiempoPreguntar");
  questionTimeContainer.innerText = localStorage.getItem("questionTime");
  let value = parseInt(questionTimeContainer.innerText);

  if (Number.isInteger(value) && value > 0) {
    const intervalId = setInterval(() => {
      value = parseInt(questionTimeContainer.innerText);
      value -= 1;
      questionTimeContainer.innerText = value;

      if (value <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  }
}

export function answerCountdown() {
  const questionTimeContainer = document.getElementById("tiempoPreguntar");
  questionTimeContainer.innerText = 1;
  const answerTimeContainer = document.getElementById("tiempoResponder");
  answerTimeContainer.innerText = localStorage.getItem("answerTime");
  let value = parseInt(answerTimeContainer.innerText);

  if (Number.isInteger(value) && value > 0) {
    const intervalId = setInterval(() => {
      value = parseInt(answerTimeContainer.innerText);
      value -= 1;
      answerTimeContainer.innerText = value;

      if (value <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  }
}

export function qualifyCountdown(time) {
  const qualifyTimeContainer = document.getElementById("tiempoCalificar");
  qualifyTimeContainer = time;
  let value = parseInt(qualifyTimeContainer.innerText);

  if (Number.isInteger(value) && value > 0) {
    const intervalId = setInterval(() => {
      value = parseInt(QualifyTimeContainer.innerText);
      value -= 1;
      qualifyTimeContainer.innerText = value;

      if (value <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  }
}
