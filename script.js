const questions = [
    {
        question: "a train 150m long is running at a speed of 60 km per hr.how much time will it take to cross a pole?",
        answers: [
            { text: "6 seconds", correct: false },
            { text: "12 seconds", correct: false },
            { text: "9 seconds", correct: true },
            { text: "15 seconds", correct: false },
        ]
    },
    {
        question: "2 pipes can fill a tank in 15 hrs and 20 hrs respectively. a third pipe can empty the tank in 30 hrs.if all three pipes are opened,how long will it take to fill the tank?",
        answers: [
            { text: "10 hrs", correct: false },
            { text: "12 hrs", correct: true },
            { text: "15 hrs", correct: false },
            { text: "20 hrs", correct: false },
        ]
    },
    {
        question: "A is the father of B,but B is not the son of A.what is the relation between A and B?",
        answers: [
            { text: "daughter", correct: true },
            { text: "mother", correct: false },
            { text: "sister", correct: false },
            { text: "cousin", correct: false },
        ]
    },
    {
        question: "In a group of 120 people,70 like tea,50 like coffee and 30 like both.How many people like neither nor coffee?",
        answers: [
            { text: "20 people", correct: false },
            { text: "40 people", correct: true },
            { text: "30 people", correct: false },
            { text: "50 people", correct: false },
        ]
    },
    {
        question: "find the synonym of the word proficient?",
        answers: [
            { text: "beginner", correct: false },
            { text: "inept", correct: false },
            { text: "untrained", correct: false },
            { text: "skilled", correct: true },
        ]
    },
    {
        question: "choose the word which is closest in meaning to benevolent",
        answers: [
            { text: "malicious", correct: false },
            { text: "aggressive", correct: false },
            { text: "indifferent", correct: false },
            { text: "kind hearted", correct: true },
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60; // Total time for the quiz
let timerInterval;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 300;
    timerElement.innerHTML = `Time Left: ${timeLeft}s`;
    nextButton.innerHTML = "Next";
    startTimer();
    showQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Try once again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
