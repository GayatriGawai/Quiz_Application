const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const previousButton = document.getElementById('previousButton');
const nextButton = document.getElementById('nextButton');

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

localStorage.setItem('maxQuestion', `${MAX_QUESTIONS}`); //to set the local storage for max question number

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();
};
getNewQuestions = (isPrevious = false) => {
    if (!availableQuestions.length || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('recentScore', score);

        //return window.location.assign('/end.html');
        //******It was redirecting the previous button to the end page on the tenth question******
        //+++++++++++shifted this line to nextButton++++++++++++++++++++++++
    }
    if (isPrevious) {
        // for previous question
        questionCounter--;
    } else {
        // for next question
        questionCounter++;
    }
    if (questionCounter <= 0) {
        questionCounter = 0;
    }
    // const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = questions[questionCounter - 1];
    question.innerText = currentQuestion.question;
    localStorage.setItem('questionCounter', questionCounter);
    ////////////let see here
    acceptingAnswers = true;
    choices.forEach((choice) => {
        const number = choice.dataset['number']; // study more on this:-  The dataset is a property of HTML elements in JavaScript that provides access to data attributes (data-*) set on the element.
        choice.innerText = currentQuestion['choice' + number];
    });
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`; //You used '' that's why it wasn't working always use `` for the expression
    availableQuestions = availableQuestions.filter(
        (question, index) => index !== questionCounter
    );

    //availableQuestions.splice(questionIndex, 1); // study more on this. Alternative you can use filter if you don't know the index number
    // acceptingAnswers = true;
    // availableQuestions = [...questions];
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
        if (questionCounter === MAX_QUESTIONS) {
            console.log(score);
            window.location.assign('/end.html');
        } else {
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestions();
            }, 1000);
        }

        if (classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        }
    });
});
function updateRecentScore(score) {
    localStorage.setItem('recentScore', score);
    // console.log('recentScore is', recentScore, +'Score:', score);
    if (scoreText) {
        scoreText.innerHTML = `${score} / ${MAX_QUESTIONS}`;
    }
}

incrementScore = (num) => {
    score += num;
    console.log('Score incremented:', score);
    if (score) {
        updateRecentScore(score);
        console.log('Recent Score:', score);
    }
};

// incrementScore = (num) => {
//     score += num;
//     scoreText.innerHTML = `${score} / ${MAX_QUESTIONS}`;
// };
previousButton.addEventListener('click', () => {
    if (questionCounter > 0) {
        console.log('Clicked'); //to check whether it is clicked
        console.log('questionCounter:', questionCounter); //to check the count
        getNewQuestions(true);
    } else {
        window.location.assign('/index.html');
    }
});

nextButton.addEventListener('click', () => {
    if (questionCounter === MAX_QUESTIONS - 1) {
        window.location.assign('/end.html');
    } else {
        getNewQuestions();
    }
});
//***************************************************************************************************************************************************
// function setPreviousButtonText() {
//     if (questionCounter === 0) {
//         previousButton.innerText = 'Back';
//     } else {
//         previousButton.innerText = 'Previous';
//     }
// }
// // Initialize button text when the page loads
// setPreviousButtonText();
// previousButton.addEventListener('click', () => {
//     if (questionCounter > 1) {
//         console.log('Clicked'); //to check whether it is clicked
//         // questionCounter--; // To decrease the count of the question so it will go to the previous question
//         console.log('questionCounter:', questionCounter); //to check the count
//         getNewQuestions(true);
//     } else {
//         window.location.assign('/index.html');
//     }

//     setPreviousButtonText(); // Update button text
// });

// nextButton.addEventListener('click', () => {
//     if (questionCounter < MAX_QUESTIONS - 1) {
//         getNewQuestions();
//         console.log('questionCounter:', questionCounter); //to check the count
//     } else if (questionCounter === MAX_QUESTIONS - 1) {
//         nextButton.innerText = 'Finish';
//         getNewQuestions();
//     } else {
//         window.location.assign('/end.html');
//     }
// });
