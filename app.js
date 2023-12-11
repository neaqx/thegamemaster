const question = document.querySelector('#question');
const choices = Array.from(document.querySelector('.choice-text'));
const progressText = document.querySelector('#prgessText');
const scoreTecxt = document.querySelector('#score');
const timerBarEmpty = document.querySelector('#timerBarEmpty');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [ 
    {
     questions: 'What is 2 + 2?',
     choice1: '2',  
     choice2: '3',  
     choice3: '21',  
     choice4: '4',
     answer:4,  
    }
]
