var headerEl = document.querySelector("header");

var startBtnEl = document.querySelector(".startBtn");

var timerEl = document.querySelector(".timer");

var questionContainerEl = document.querySelector(".questions");

var questionEl = document.querySelector(".question");

var choiceContainerEl = document.querySelector(".choices");

var choice1El = document.querySelector(".choice1");
var choice2El = document.querySelector(".choice2");
var choice3El = document.querySelector(".choice3");
var choice4El = document.querySelector(".choice4");


var questions = [
    {
        question: "Which of the below methods performs an action for each element in an array?",
        choice1: "for()",
        choice2: "perItem()",
        choice3: "while()",
        choice4: "each()",
        answer: "for()"
    },
    {
        question: "Which statement can be used to declare a variable?",
        choice1: "variable",
        choice2: "value",
        choice3: "var",
        choice4: "class",
        answer: "var"
    }
];

// var timeCounter = 60;

var reduceTime = function () {
    var timeCounter = 60;

    var countdownInterval = setInterval(function () {
        if (timeCounter > 0) {
            timerEl.textContent = "Time Left: " + timeCounter;
            timeCounter--;
        }
        else {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

var askQuestions = function () {

    for (var i = 0; i < questions.length; i++) {

        var answerEl = questions[i].answer;
        questionEl.textContent = questions[i].question;
        choice1El.textContent = questions[i].choice1;
        choice2El.textContent = questions[i].choice2;
        choice3El.textContent = questions[i].choice3;
        choice4El.textContent = questions[i].choice4;

        console.log(questionEl);
        console.log(choiceContainerEl);

        
        return questionContainerEl;

    }

};



var responseHandler = function(event) {
    var targetEl = event.target;

    if (targetEl.matches(".choice")) {
        console.log(targetEl);
    }

    // var responseEmoji = document.querySelector(".emoji");
    // if (currentQuestion.currentChoice === currentQuestion.answer) {
    //     responseEmoji.textContent = "CORRECT! ✅"
    // }

}

choiceContainerEl.addEventListener("click", responseHandler);

var startQuiz = function () {
    //  hide header
    headerEl.setAttribute("style", "display:none;")
    // hide Start Quiz button
    startBtnEl.setAttribute("style", "display:none;")
    // once the quiz begins, start the timer
    timerEl.setAttribute("style", "display:'';")
    reduceTime();

    askQuestions();

    // iterate through the questions by calling the askQuestions function


};


startBtnEl.addEventListener("click", startQuiz);