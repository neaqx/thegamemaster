const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('.finalScore');
const mostRecentScore = (localStorage.getItem('mostRecentScore'));

const highScores = (localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

// Storage highscore and dispaly input option for username/game name
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = e => {
    console.log('clicked the save button!');
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);

    highScores.sort( (a,b) => {
        return b.score - a.score;
    })

    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/index.html');
}


