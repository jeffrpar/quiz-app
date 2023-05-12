const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const timerText = document.querySelector("#timer");

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Arrays in JavaScript can be used to store what?',
        choice1: 'numbers and strings',
        choice2: 'booleans',
        choice3: 'other arrays',
        choice4: 'All of the above',
        answer: 4, 
    },
    {
        question: 
            'What does HTML stand for?',
        choice1: 'Hyper Text Markup Language',
        choice2: 'Hyper Tag Markup Language',
        choice3: 'Hyperlinks Text Mark Language',
        choice4: 'Hyperlinking Text Marking Language',
        answer: 1, 
    },
    {
        question: 'Choose the correct HTML element for the largest heading.',
        choice1: '<h6>',
        choice2: '<h1>',
        choice3: '<head>',
        choice4: '<header>',
        answer: 2, 
    },
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<javascript>',
        choice2: '<js>',
        choice3: '<link>',
        choice4: '<script>',
        answer: 4, 
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

let timeLeft = 75; // Time in seconds
let timer;

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
    startTimer()
}

// Function to start the timer
const startTimer = () => {
    timer = setInterval(() => {
      timeLeft--
      timerText.innerText = timeLeft
  
      if (timeLeft <= 0) {
        clearInterval(timer)
        // Timer has reached zero, perform actions here
        // For example, display a message or redirect to another page
        window.location.href = "end.html"
      }
    }, 1000) // Update timer every second (1000 milliseconds)
}

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      localStorage.setItem("mostRecentScore", score);
  
      return (window.location.href = "end.html");
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        else {
            reduceTimer(15)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

reduceTimer = seconds => {
    timeLeft -= seconds;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
    timerText.innerText = timeLeft;
  };

startGame()