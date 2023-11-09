const finalScore = document.getElementById('finalScore');
const recentScore = parseInt(localStorage.getItem('recentScore'), 10);
const MAX_QUESTIONS = parseInt(localStorage.getItem('maxQuestion'), 10);

// Display the recent score
console.log('Recent Score:', recentScore);

finalScore.innerHTML = `${recentScore}/${MAX_QUESTIONS} <br>(${(
    (recentScore / MAX_QUESTIONS) *
    100
).toFixed(2)}%)`;

const percentageScore = (recentScore / MAX_QUESTIONS) * 100;
let grade = '';
if (percentageScore >= 90) {
    grade = 'Great!';
} else if (percentageScore >= 70) {
    grade = 'Good!';
} else if (percentageScore >= 50) {
    grade = 'Not bad';
} else if (percentageScore >= 35) {
    grade = 'You need practice';
} else {
    grade = 'F';
}

// Display the grade
const gradeText = document.createElement('p');
gradeText.textContent = `${grade}`;
finalScore.appendChild(gradeText);
