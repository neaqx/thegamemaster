const highScoresList = document.querySelector("#highScoresList");
const highScores = JSON.parse(localStorage.getItem("#highScores")) || [];
console.log("#highScores" + highScores);

//Local Storage for Leaderboard & display scores
highScoresList.innerHTML = highScores.map(score => { 
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join("");

