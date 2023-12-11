const highScoreList = document.querySelector("#highScoreLsit");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoreList.innerHTML = highScores
highScoreList.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join("");

