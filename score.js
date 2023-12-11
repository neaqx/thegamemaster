const highScoreList = document.querySelector("#highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScore")) || [];

highScoreList.innerHTML = highScores
highScoreList.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join("");

