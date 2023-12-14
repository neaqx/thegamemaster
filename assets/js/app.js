const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progessText');
const scoreText = document.querySelector('#score');
const timerBarEmpty = document.querySelector('#timerBarEmpty');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//creating question array, with choices and answers
let questions = [ 
    {
     questions: 'What planet is closest to the sun?',
     choice1: 'Mercury',  
     choice2: 'Venus',  
     choice3: 'Earth',  
     choice4: 'Mars',
     answer:1,  
    },
    {
     questions: 'How many hearts does an octopus have?',
     choice1: '2',  
     choice2: '3',  
     choice3: '11',  
     choice4: '1',
     answer:2,  
    },
    {
     questions: 'In what country was Elon Musk born?',
     choice1: 'South Africa',  
     choice2: 'Germany',  
     choice3: 'US',  
     choice4: 'Nowhere, he is an alien form Mars :)',
     answer:1,  
    },
    {
     questions: 'What country has the most islands in the world?',
     choice1: 'Sweden',  
     choice2: 'Indonesia',  
     choice3: 'Norway',  
     choice4: 'Finland',
     answer:1,  
    },

]

//constants for score points and max questions
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion();
}

// creating function for new question
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html');
    }

    //creating question counter and progress bar
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    //creating random question 
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.questions;

    // TODO: Create random answers
    //creating choices for questions
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}    

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct': 'incorrect';

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS);
        }
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000)
})   

} )

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();