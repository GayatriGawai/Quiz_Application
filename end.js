const finalScore = document.getElementById('finalScore');
const recentScore = localStorage.getItem('recentScore');
const MAX_QUESTIONS = localStorage.getItem('MAX_QUESTIONS');

console.log('Stored MAX_QUESTIONS:', MAX_QUESTIONS);

finalScore.innerHTML = `${recentScore}/10`;
