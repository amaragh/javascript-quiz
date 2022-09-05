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

var choicesArray = [choice1El, choice2El, choice3El, choice4El];

var responseEmoji = document.querySelector(".emoji");

var nextBtnEl = document.querySelector(".nextBtn");

var saveScoreEl = document.querySelector(".save-score");
var scoreEl = document.querySelector(".score");

var saveInitialsEl = document.querySelector(".save-initials")

var submitScoreEl = document.querySelector(".submit-score");

var displayScoresEl = document.querySelector(".display-scores");
var highScoresEl = document.querySelector(".high-scores");

var restartOrClearEl = document.querySelector(".restart-or-clear");

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


var timeCounter = 60;

var reduceTime = function () {
    timerEl.textContent = "Time Left: " + timeCounter;

    var countdownInterval = setInterval(function () {
        if (timeCounter > 0) {
            timeCounter--;
            timerEl.textContent = "Time Left: " + timeCounter;
        }
        else {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

var stopTimer = function () {
    clearInterval(countdownInterval);
};

questionIndex = 0;

var askQuestions = function (i) {

    i = questionIndex;

    while (i < questions.length) {

        var answer = questions[i].answer;
        questionEl.textContent = questions[i].question;
        choice1El.textContent = questions[i].choice1;
        choice2El.textContent = questions[i].choice2;
        choice3El.textContent = questions[i].choice3;
        choice4El.textContent = questions[i].choice4;

        for (var x = 0; x < choicesArray.length; x++) {

            if (choicesArray[x].textContent === answer) {
                choicesArray[x].setAttribute("data-correct", "yes");
            }
            else {
                choicesArray[x].setAttribute("data-correct", "no");
            }
        }
        return questionContainerEl;
    }
};



var responseHandler = function (event) {
    var targetEl = event.target;

    if (targetEl.matches(".choice")) {
        console.log(targetEl);

        if (targetEl.getAttribute("data-correct") === "yes") {
            targetEl.innerHTML = targetEl.textContent + "<span class=emoji>CORRECT ✅</span>";
        }
        else {
            targetEl.innerHTML = targetEl.textContent + "<span class=emoji>WRONG ❌</span>";
            timeCounter = timeCounter - 5;
        }
    }

    // introduce option to go to next question after an answer has been selected
    nextBtnEl.setAttribute("style", "display:'';")

};

choiceContainerEl.addEventListener("click", responseHandler);

nextBtnEl.addEventListener("click", function () {
    questionIndex++;
    askQuestions(questionIndex);

    if (questionIndex === questions.length) {
        console.log("All questions have been exhausted");
        endQuiz();
    }
});

var highScores = [];

var endQuiz = function () {
    // hide questions container and timer
    questionContainerEl.setAttribute("style", "display:none;");
    timerEl.setAttribute("style", "display:none;")
    var newScore = timeCounter;
    scoreEl.innerHTML = "Your score is " + newScore;
    saveScoreEl.setAttribute("style", "display:'';");
    saveInitialsEl.setAttribute("data-score", newScore);

};


var highScoreHandler = function (event) {
    event.preventDefault();

    var initials = document.querySelector("input[name='initials']").value;
    var currentScore = { "initials": initials, "score": saveInitialsEl.getAttribute("data-score") };
    highScores = loadScores();
    highScores.push(currentScore)
    saveScores();
    displayScores();
}

submitScoreEl.addEventListener("submit", highScoreHandler);

var saveScores = function () {
    localStorage.setItem("highScores", JSON.stringify(highScores));
};

var loadScores = function () {
    var savedHighScores = localStorage.getItem("highScores");

    if (!savedHighScores) {
        savedHighScores = [];
    } else {
        savedHighScores = JSON.parse(savedHighScores);

    }

    return savedHighScores
};


var displayScores = function (scores) {
    saveScoreEl.setAttribute("style", "display:none;");

    scores = loadScores();

    for (var i = 0; i < scores.length; i++) {
        var eachScore = document.createElement("li");
        eachScore.innerHTML = scores[i].initials + " → " + scores[i].score;
        highScoresEl.appendChild(eachScore);
    }

    displayScoresEl.setAttribute("style", "display:'';")
}


displayScoresEl.addEventListener("click", function (event) {
    var targetEl = event.target;

    if (targetEl.matches(".restart-btn")) {
        // reloads the page so that quiz can be taken again
        location.reload();
    }

    else if (targetEl.matches(".clear-btn")) {
        localStorage.removeItem("highScores");
        highScoresEl.setAttribute("style", "display:none;");
    }
})


var startQuiz = function () {
    //  hide header
    headerEl.setAttribute("style", "display:none;")
    // hide Start Quiz button
    startBtnEl.setAttribute("style", "display:none;")
    // once the quiz begins, start the timer
    timerEl.setAttribute("style", "display:'';")
    reduceTime();
    // iterate through the questions by calling the askQuestions function
    askQuestions();

};


startBtnEl.addEventListener("click", startQuiz);