const nextBtn = document.getElementById("nextBtn");

const quizQuestions = [
  {
    question:
      "In Naruto, what is the name of Naruto Uzumaki’s signature technique?",
    answers: [
      { text: "Rasengan", correct: true },
      { text: "Chidori", correct: false },
      { text: "Amaterasu", correct: false },
      { text: "Shadow Clone Jutsu", correct: false },
    ],
  },
  {
    question:
      "In Death Note, what is the real name of the character known as “L”?",
    answers: [
      { text: "Light Yagami", correct: false },
      { text: "L Lawliet", correct: true },
      { text: "Ryuk", correct: false },
      { text: "Near", correct: false },
    ],
  },
  {
    question: "Which anime features the Survey Corps fighting against Titans?",
    answers: [
      { text: "Fullmetal Alchemist", correct: false },
      { text: "One Piece", correct: false },
      { text: "Attack on Titan", correct: true },
      { text: "Bleach", correct: false },
    ],
  },
  {
    question: "In One Piece, what is the name of Luffy’s pirate crew?",
    answers: [
      { text: "Straw Hat Pirates", correct: true },
      { text: "Blackbeard Pirates", correct: false },
      { text: "Red-Haired Pirates", correct: false },
      { text: "Whitebeard Pirates", correct: false },
    ],
  },
  {
    question: "In Hunter x Hunter, what is Killua’s favorite type of food?",
    answers: [
      { text: "Chocolate", correct: false },
      { text: "Ice Cream", correct: false },
      { text: "Cake", correct: false },
      { text: "Chocolate Balls", correct: true },
    ],
  },
];

let currentIndex = 0;
let selectedAnswerIndex = null; // store which answer was clicked
let answered = false; // NEW state: has the user already answered?
let score = 0;
let gameOver = false;

nextBtn.addEventListener("click", () => {
  if (gameOver) {
    //Restart game
    currentIndex = 0;
    score = 0;
    gameOver = false;
    selectedAnswerIndex = null;
    answered = false;
    nextBtn.innerText = "Next";
    render();
    return;
  }
  if (currentIndex < quizQuestions.length - 1) {
    currentIndex++;
    selectedAnswerIndex = null; // reset selection for new question
    answered = false; // unlock for new question
    render();
  } else {
    showResults();
  }
});

function selectAnswer(ansIndex) {
  if (answered) return; //  prevent multiple clicks
  selectedAnswerIndex = ansIndex;
  answered = true; // lock after first answer
  if (quizQuestions[currentIndex].answers[ansIndex].correct) {
    score++;
  }
  render();
}

function render() {
  let quizhtml = "";

  const question = quizQuestions[currentIndex];

  quizhtml += `<p>${currentIndex + 1}. ${question.question}</p>`;

  question.answers.forEach((answer, ansIndex) => {
    let bg = "";

    // if an answer was chosen, decide coloring
    if (selectedAnswerIndex !== null) {
      if (ansIndex === selectedAnswerIndex) {
        bg = answer.correct ? "lightgreen" : "lightcoral";
      } else if (
        !question.answers[selectedAnswerIndex].correct &&
        answer.correct
      ) {
        // if clicked wrong → also highlight the correct one
        bg = "lightgreen";
      }
    }

    // disable click if answered
    const cursor = answered ? "not-allowed" : "pointer";
    const pointerEvents = answered ? "none" : "auto";

    quizhtml += `<p onclick="selectAnswer(${ansIndex})"
                   style="padding: 10px; border:1px solid black; background:${bg};
                   cursor:${cursor}; pointer-events:${pointerEvents}">
                   ${answer.text}
                 </p>`;
  });

  console.log(currentIndex, quizQuestions.length - 1);
  document.getElementById("quizContainer").innerHTML = quizhtml;
}

function showResults() {
  gameOver = true;
  document.getElementById(
    "quizContainer"
  ).innerHTML = `<p>Your score: ${score} / ${quizQuestions.length}</p>`;
  nextBtn.innerText = "Play Again";
}
render();
