const highScoreList = document.querySelector("#highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScore")) || [];

// TODO: This is not working, FIXING Leaderbroad
highScoreList.innerHTML = highScores
highScoreList.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join("");

