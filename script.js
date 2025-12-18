const questions = [
  "Tell me about yourself",
  "What is HTML and why is it used?",
  "Explain JavaScript variables",
  "What are your strengths?"
];

let currentIndex = 0;
let timer;
let timeLeft = 60;
let totalScore = 0;

const startScreen = document.getElementById("startScreen");
const interviewScreen = document.getElementById("interviewScreen");
const resultScreen = document.getElementById("resultScreen");

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const timerEl = document.getElementById("timer");
const finalScoreEl = document.getElementById("finalScore");
const feedbackEl = document.getElementById("feedback");

function startInterview() {
  startScreen.classList.add("hidden");
  interviewScreen.classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  questionEl.textContent = questions[currentIndex];
  answerEl.value = "";
  timeLeft = 60;
  timerEl.textContent = "Time: 60";
  timerEl.classList.remove("danger");

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;

    if (timeLeft <= 10) {
      timerEl.classList.add("danger");
    }

    if (timeLeft === 0) {
      nextQuestion();
    }
  }, 1000);
}

function calculateScore(answer) {
  let score = 0;
  if (answer.length > 40) score += 30;
  if (answer.length > 90) score += 40;
  if (timeLeft > 10) score += 30;
  return score;
}

function nextQuestion() {
  clearInterval(timer);

  const answer = answerEl.value.trim();
  totalScore += calculateScore(answer);

  currentIndex++;

  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  interviewScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const avgScore = Math.round(totalScore / questions.length);
  finalScoreEl.textContent = "Confidence Score: " + avgScore + " / 100";

  if (avgScore >= 70) {
    feedbackEl.textContent = "Excellent confidence under pressure 👍";
  } else if (avgScore >= 40) {
    feedbackEl.textContent = "Average performance. Practice more 🙂";
  } else {
    feedbackEl.textContent = "Low confidence. Needs improvement 😕";
  }
}

// 🎙 Voice Input
function startVoice() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition not supported in this browser");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = (event) => {
    answerEl.value += " " + event.results[0][0].transcript;
  };
}
