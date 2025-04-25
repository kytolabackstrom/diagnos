const cases = [
  {
    patient: "Anna, 34 år",
    description: "Hjärtklappning, viktnedgång trots ökad aptit, nervositet, tunt hår.",
    questions: [
      "Har du svettats mer än vanligt?",
      "Känner du dig ofta varm?",
      "Har du haft sömnproblem?",
      "Har du oregelbunden mens?",
      "Har du haft sköldkörtelproblem?",
      "Finns det sköldkörtelsjukdom i familjen?"
    ],
    tests: [
      "TSH/T4/T3-blodprov",
      "EKG",
      "Ultraljud av sköldkörtel",
      "Leverprover",
      "Blodstatus",
      "Autoantikroppar"
    ],
    diagnoses: [
      "Hypertyreos",
      "Hypotyreos",
      "Ångestsyndrom",
      "Järnbristanemi",
      "Diabetes typ 1"
    ],
    correct: "Hypertyreos"
  }
  // Lägg till fler fall här enligt samma format
];

let currentCase = 0;
let score = 80;

const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');
const caseScreen = document.getElementById('case-screen');
const caseText = document.getElementById('case-text');
const scoreText = document.getElementById('score');
const askQuestionButton = document.getElementById('ask-question');
const orderTestButton = document.getElementById('order-test');
const makeDiagnosisButton = document.getElementById('make-diagnosis');
const extraChoices = document.getElementById('extra-choices');
const diagnosisScreen = document.getElementById('diagnosis-screen');
const diagnosisOptions = document.getElementById('diagnosis-options');
const resultScreen = document.getElementById('result-screen');
const resultTitle = document.getElementById('result-title');
const resultText = document.getElementById('result-text');
const nextButton = document.getElementById('next-button');
const finalScreen = document.getElementById('final-screen');
const finalScore = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

startButton.addEventListener('click', startGame);
askQuestionButton.addEventListener('click', () => showExtras('question'));
orderTestButton.addEventListener('click', () => showExtras('test'));
makeDiagnosisButton.addEventListener('click', showDiagnoses);
nextButton.addEventListener('click', nextCase);
restartButton.addEventListener('click', restartGame);

function startGame() {
  startScreen.classList.add('hidden');
  caseScreen.classList.remove('hidden');
  loadCase();
}

function loadCase() {
  const c = cases[currentCase];
  caseText.textContent = `${c.patient}: ${c.description}`;
  scoreText.textContent = `Poäng: ${score}`;
  extraChoices.classList.add('hidden');
  extraChoices.innerHTML = '';
}

function showExtras(type) {
  const c = cases[currentCase];
  extraChoices.classList.remove('hidden');
  extraChoices.innerHTML = '';
  const items = type === 'question' ? c.questions : c.tests;
  items.forEach(item => {
    const btn = document.createElement('button');
    btn.textContent = item;
    btn.onclick = () => {
      score -= (type === 'question') ? 3 : 7;
      scoreText.textContent = `Poäng: ${score}`;
      extraChoices.classList.add('hidden');
    };
    extraChoices.appendChild(btn);
  });
}

function showDiagnoses() {
  caseScreen.classList.add('hidden');
  diagnosisScreen.classList.remove('hidden');
  diagnosisOptions.innerHTML = '';
  const c = cases[currentCase];
  c.diagnoses.forEach(diag => {
    const btn = document.createElement('button');
    btn.textContent = diag;
    btn.onclick = () => checkDiagnosis(diag);
    diagnosisOptions.appendChild(btn);
  });
}

function checkDiagnosis(diag) {
  diagnosisScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  const c = cases[currentCase];
  if (diag === c.correct) {
    resultTitle.textContent = 'Rätt!';
    resultText.textContent = `Bra jobbat, du behöll ${score} poäng.`;
  } else {
    resultTitle.textContent = 'Fel!';
    resultText.textContent = `Rätt diagnos var: ${c.correct}`;
    score = Math.max(score - 10, 0);
  }
}

function nextCase() {
  currentCase++;
  if (currentCase < cases.length) {
    resultScreen.classList.add('hidden');
    caseScreen.classList.remove('hidden');
    loadCase();
  } else {
    resultScreen.classList.add('hidden');
    finalScreen.classList.remove('hidden');
    finalScore.textContent = `Din slutpoäng: ${score}`;
  }
}

function restartGame() {
  location.reload();
}
