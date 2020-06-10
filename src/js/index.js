const startBtn = document.querySelector('#start-btn');
const nextBtn = document.querySelector('#next-btn');
const quesitonContainer = document.querySelector('#question-container');
const quetionElement = document.querySelector('#question');
const answerBtns = document.querySelector('#answer-btn');

startBtn.addEventListener('click', startGame);


let shuffledQustion;
let currentQuestion;

nextBtn.addEventListener('click', (e) => {
  currentQuestion++;
  setNextQuestion();
});

function startGame(e) {
  startBtn.classList.add('hide');
  quesitonContainer.classList.remove('hide');
  shuffledQustion = questions.sort(() => Math.random() - .5);
  currentQuestion = 0;
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQustion[currentQuestion]);
}

function showQuestion(q) {
  quetionElement.innerHTML = q.question;
  q.answer.forEach(ans => {
    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.textContent = ans.text;
    if (ans.correct) {
      btn.dataset.correct = ans.correct;
    }
    btn.addEventListener('click', checkAnswer);
    answerBtns.appendChild(btn);
  });
}

function checkAnswer(e) {
  const seletedBtn = e.target;
  const correct = seletedBtn.dataset.correct;
  clearStatus(document.body);
  correct ? document.body.classList.add('correct') : document.body.classList.add('wrong');
  Array.from(answerBtns.childNodes).forEach((btn, i) => {
    setStatus(btn, btn.dataset.correct);
  });
  if (shuffledQustion.length > currentQuestion + 1) {
    nextBtn.classList.remove('hide');
  } else {
    startBtn.textContent = 'Restart';
    startBtn.classList.remove('hide');
  }
}

function setStatus(element, answer) {
  clearStatus(element);
  if (answer) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatus(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function resetState() {
  nextBtn.classList.add('hide');
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
}


const questions = [
  {
    question: 'What is 2+2?',
    answer: [
      { text: 4, correct: true },
      { text: 5, correct: false }
    ]
  },
  {
    question: 'What is 2+7?',
    answer: [
      { text: 4, correct: false },
      { text: 9, correct: true },
      { text: 5, correct: false },
    ]
  },
  {
    question: 'What is the capital of Bangladesh?',
    answer: [
      { text: 'Rajshahi', correct: false },
      { text: 'Dhaka', correct: true },
      { text: 'Khulna', correct: false },
    ]
  }
]