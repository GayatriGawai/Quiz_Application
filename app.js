const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch('questions.json')
    .then((res) => {
        return res.json(); //json is the method reads the response's body text and attempts to parse it as JSON
    })
    .then((loadedQuestions) => {
        console.log(loadedQuestions);
        questions = loadedQuestions;
        startGame();
    });
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;
console.log('Stored MAX_QUESTIONS:', MAX_QUESTIONS);
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();
};
getNewQuestions = () => {
    if (!availableQuestions.length || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('recentScore', score);
        return window.location.assign('/end.html');
    }

    questionCounter++;

    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`; //You used '' that's why it wasn't working always use `` for the expression

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number']; // study more on this
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex, 1); // study more on this. Alternative you can use filter if you don't know the index number
    // acceptingAnswers = true;
};
choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        // if (!acceptingAnswers) return;
        //  acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestions();
        }, 1000);
        if (classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        }
    });
});
incrementScore = (num) => {
    score += num;
    scoreText.innerHTML = score;
};
// startGame();
