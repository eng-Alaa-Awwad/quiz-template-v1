import questions from "../data/questions.js";
const quizContainer = document.querySelector(".question-container");
const nextBtn = document.querySelector(".btn--next");
const preBtn = document.querySelector(".btn--previous");
const numerbOfQuestion = questions.length;

let currentQuestion = 0;
let userAnswersIndex = [];
const correctAnswerIndex = questions.map((e) => e.correctAnswerIndex);

function startQuiz() {
  currentQuestion = 0;
  userAnswersIndex = [];
  getQuestion();
}

function getQuestion() {
  quizContainer.innerHTML = "";
  let markup = `
  <div class="quiz__progress">
    <div class="progress__number">QUESTION
      <span>${currentQuestion + 1}</span>/
      <span>${numerbOfQuestion}</span>
    </div>
    <div class="progress__bar">
      <div class="progress__bar--fill" style="--width:${Math.ceil(
        ((currentQuestion + 1) * 100) / numerbOfQuestion
      )}%">${Math.ceil(((currentQuestion + 1) * 100) / numerbOfQuestion)}%</div>
    </div>
  </div>
  <div class="question">
    <h2 class="question__text">${questions[currentQuestion].question}</h2>
    <div class="question__answers">
    ${questions[currentQuestion].answers
      .map((e, i) => {
        return `<div class="answer">
    <input type="radio" name="answer" id="answer-${i}" value="${i}">
    <label for="answer-${i}">${e}</label>
  </div>`;
      })
      .join(" ")}
    </div>
  </div>`;
  quizContainer.insertAdjacentHTML("beforeend", markup);
  preBtn.style.display = "block";
  if (currentQuestion === 0) preBtn.style.display = "none";
  nextBtn.innerHTML = "next";
  if (currentQuestion === numerbOfQuestion - 1) {
    nextBtn.innerHTML = "submit";
  }
}
startQuiz();

nextBtn.addEventListener("click", () => {
  if (nextBtn.innerHTML === "submit") {
    let score = 0;
    userAnswersIndex.forEach((answer, index) => {
      if (answer === correctAnswerIndex[index]) {
        score++;
      }
      quizContainer.innerHTML = `your score is ${score} of ${numerbOfQuestion}`;
      preBtn.style.display = "none";
      nextBtn.style.display = "none";
    });
  }

  userAnswersIndex[currentQuestion] =
    document.querySelector(`input[name="answer"]:checked`)?.value * 1;
  console.log(userAnswersIndex);
  if (currentQuestion === numerbOfQuestion - 1) return;
  currentQuestion++;

  getQuestion();
});
preBtn.addEventListener("click", () => {
  if (currentQuestion === 0) return;

  currentQuestion--;
  getQuestion();
});
