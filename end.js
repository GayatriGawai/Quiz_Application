const finalScore = document.getElementById('finalScore');
const recentScore = localStorage.getItem('recentScore');
const MAX_QUESTIONS = localStorage.getItem('maxQuestion');

console.log('Stored MAX_QUESTIONS:', MAX_QUESTIONS);

finalScore.innerHTML = `${recentScore}/${MAX_QUESTIONS}`;
