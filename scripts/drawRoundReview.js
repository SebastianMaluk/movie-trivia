export function drawRoundReview(correct_answer, graded_answer, grade, sendReview) {
  const roundReviewAnswerContainer = document.getElementById("roundReviewAnswerContainer");
  const correctAnswerText = document.getElementById("correctAnswerText");
  const gradedAnswerText = document.getElementById("gradedAnswerText");
  const gradeText = document.getElementById("preguntonGradeText");

  const questionContainer = document.getElementById("questionContainer");

  roundReviewAnswerContainer.classList.remove("hidden");
  correctAnswerText.innerText = correct_answer;
  gradedAnswerText.innerText = graded_answer;
  // map grade to text from map
  const gradeMap = {
    0: "Mala",
    1: "Cerca",
    2: "Buena"
  }
  gradeText.innerText = gradeMap[grade];

  const goodEvaluationBtn = document.getElementById("goodEvaluationBtn");
  goodEvaluationBtn.addEventListener("click", () => {
    sendReview(true);
    roundReviewAnswerContainer.classList.add("hidden");
    questionContainer.classList.add("hidden");
  });


  const badEvaluationBtn = document.getElementById("badEvaluationBtn");
  badEvaluationBtn.addEventListener("click", () => {
    sendReview(false);
    roundReviewAnswerContainer.classList.add("hidden");
    questionContainer.classList.add("hidden");

  });

  // hide player answer keeping question
  const answerContainer = document.getElementById("answerContainer");
  answerContainer.classList.add("hidden");

}
