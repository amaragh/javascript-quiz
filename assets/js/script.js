var questionContainerEl = document.querySelector(".questions");

var questionEl = document.createElement("h2");

var choiceContainerEl = document.createElement("ul");
var choice1El = document.createElement("li");
var choice2El = document.createElement("li");
var choice3El = document.createElement("li");
var choice4El = document.createElement("li");

questionEl.className = "question";
choiceContainerEl.className = "choices";
choice1El.className = "choice";
choice2El.className = "choice";
choice3El.className = "choice";
choice4El.className = "choice";

questionContainerEl.appendChild(questionEl);

questionContainerEl.appendChild(choiceContainerEl);
choiceContainerEl.appendChild(choice1El);
choiceContainerEl.appendChild(choice2El);
choiceContainerEl.appendChild(choice3El);
choiceContainerEl.appendChild(choice4El);


var questions = [
    {
        question: "Which of the below methods performs an action for each element in an array?",
        choice1: "for()",
        choice2: "perItem()",
        choice3: "while()",
        choice4: "each()",
        answer:"for()"
    },
    {
        question: "Which statement can be used to declare a variable?",
        choice1: "variable",
        choice2: "value",
        choice3: "var",
        choice4: "class",
        answer:"var"
    }
];