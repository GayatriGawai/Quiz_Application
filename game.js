const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));

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
];
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 7;
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestions();
};
getNewQuestions = () => {
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign('/end.html');
    }

    questionCounter++;
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
        console.log(selectedAnswer);
        getNewQuestions();
    });
});
startGame();
