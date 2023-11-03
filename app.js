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

let questions = [
    {
        question: 'What is the capital of France?',
        choice1: 'Berlin',
        choice2: 'Madrid',
        choice3: 'Paris',
        choice4: 'Rome',
        answer: 3,
    },
    {
        question: 'Which planet is known as the Red Planet??',
        choice1: 'Venus',
        choice2: 'Jupiter',
        choice3: 'Mars',
        choice4: 'Saturn',
        answer: 3,
    },
    {
        question: 'Who wrote the play "Romeo and Juliet"?',
        choice1: 'Charles Dickens',
        choice2: 'William Shakespeare',
        choice3: 'Jane Austen',
        choice4: 'Mark Twain',
        answer: 2,
    },
    {
        question: 'What is the chemical symbol for water?',
        choice1: 'Wo',
        choice2: 'H2O',
        choice3: 'Co',
        choice4: 'O2',
        answer: 2,
    },
    {
        question:
            'Which gas do plants absorb from the atmosphere and use during photosynthesis?',
        choice1: 'Oxygen',
        choice2: 'Carbon dioxide',
        choice3: 'Nitrogen',
        choice4: 'Hydrogen',
        answer: 2,
    },
    {
        question: 'What is the largest organ in the human body?',
        choice1: 'Brain',
        choice2: 'Heart',
        choice3: 'Skin',
        choice4: 'Liver',
        answer: 3,
    },
    {
        question:
            'If a triangle has a right angle (90 degrees), what is the name of the longest side?',
        choice1: 'Hypotenuse',
        choice2: 'Adjacent',
        choice3: 'Diagonal',
        choice4: 'Opposite',
        answer: 1,
    },
    {
        question: 'What does the HTML stands for?',
        choice1: 'Hyperlink and Text Markup Language',
        choice2: 'Hyper Text Markup Language',
        choice3: 'High-Level Text Markup Language',
        choice4: 'Hyper Transfer Markup Language',
        answer: 2,
    },
    {
        question: 'Which company developed the Python programming language?',
        choice1: 'Google',
        choice2: 'Microsoft',
        choice3: 'Facebook',
        choice4: 'Python Software Foundation',
        answer: 4,
    },
    {
        question:
            'What is the most widely used programming language for web development?',
        choice1: 'Python',
        choice2: 'Java',
        choice3: 'C++',
        choice4: 'JavaScript',
        answer: 4,
    },
];
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();
};
getNewQuestions = () => {
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('recentScore', score);

        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.innerText =
        'Question ' + questionCounter + '/' + MAX_QUESTIONS;

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`; //You used '' that's why it wasn't working always use `` for the expression

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};
choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        let classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
        }
        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        alert('You are anwser is ' + classToApply);
        getNewQuestions();
    });
});
incrementScore = (num) => {
    score += num;
    scoreText.innerHTML = score;
};
startGame();
