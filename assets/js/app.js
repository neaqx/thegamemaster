const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

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
    {
     questions: 'What is the name of the largest ocean on Earth?',
     choice1: 'North Sea',  
     choice2: 'Atlantic Ocean',  
     choice3: 'Pacific Ocean',  
     choice4: 'Indian Ocean',
     answer:3,  
    },
    {
     questions: 'What famous music group was John Lennon a part of before pursuing a solo career?',
     choice1: 'The Beatles',  
     choice2: 'The Rolling Stones',  
     choice3: 'The Who',  
     choice4: 'Take That',
     answer:1,  
    },
    {
     questions: 'In the story of Snow White, how many dwarfs are there?',
     choice1: '7',  
     choice2: '8',  
     choice3: '9',  
     choice4: '10',
     answer:1,  
    },
    {
     questions: 'In what galaxy is our solar system located?',
     choice1: 'Andromeda',  
     choice2: 'Milky Way',  
     choice3: 'Messier 81',  
     choice4: 'Messier 82',
     answer:2,  
    },
    {
     questions: 'Which geometric shape has four equal sides and four right angles?',
     choice1: 'Quadrilateral',  
     choice2: 'Triangle',  
     choice3: 'Circle',  
     choice4: 'Square',
     answer:4,  
    },
    {
     questions: 'What is the main ingredient in the dish sushi?',
     choice1: 'Pasta',  
     choice2: 'Rice',  
     choice3: 'Potato',  
     choice4: 'Fish',
     answer:2,  
    },
    {
     questions: 'Who painted the Mona Lisa?',
     choice1: 'Leonardo da Vinci',  
     choice2: 'Vincent van Gogh',  
     choice3: 'Pablo Picasso', 
     choice4: 'Claude Monet',
     answer:1,  
    },
    {
     questions: 'Who is known as the “Father of the United States” and the first President of the country?',
     choice1: 'Samuel Adams',  
     choice2: 'George Washington',  
     choice3: 'John Adams',  
     choice4: 'Thomas Jefferson',
     answer:2,  
    },
    

]

//constants for score points and max questions
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 8;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}

// creating function for new question
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html');
    }

    //creating question counter and progress bar
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;


    //creating random question 
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.questions;
    
    //creating random choices by using shuffleArray function
     const choicesArray = [
        { text: currentQuestion.choice1, number: 1 },
        { text: currentQuestion.choice2, number: 2 },
        { text: currentQuestion.choice3, number: 3 },
        { text: currentQuestion.choice4, number: 4 }
    ];
    shuffleArray(choicesArray);

    choices.forEach((choice, index) => {
        choice.innerText = choicesArray[index].text;
        choice.dataset['number'] = choicesArray[index].number;

        if (choice.number === currentQuestion.answer) {
            currentQuestion.answer = index + 1;
        }
    });

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