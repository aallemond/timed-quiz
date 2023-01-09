// Defines questions along with choices and the correct answer//
var questions = [{

    question: "How do you assign a variable in JavaScript?",
    choices: ["a. var (variableName)", "b. var variableName", "c. var = variableName", "d. variableName =" ],
    answer: "b. var variableName"
},

{
    question: "Which HTML element is the JavaScript stored?",
    choices: ["a. <header> ", "b. <p>", "c. <script>", "d.<h1>"],
    answer: "c. <script>"
},

{
    question: "Wich data type is 'Twenty'?",
    choices: ["a. number", "b. boolean", "c. null", "d. string"],
    answer: "d. string"
},

{
    question: "In 'console.log(this)' 'this' is referring to what?",
    choices: ["a. the window", "b. the header element", "c. the css stylesheet", "d. the word 'this'"],
    answer: "a. the window"
},

{
    question: "The 'unshift' method does what?",
    choices: ["a. adds an object to the end of an array", "b. changes to lowercase lettering", "c. adds an object to the beginning of an array", "d. deletes an array"],
    answer: "c. adds an object to the beginning of an array"
},

{
    question: "In JavaScript a function is...",
    choices: ["a. a reuseable line of code that preforms a specified task", "b. an ordered list", "c. a set of values ", "d. not neccessary"],
    answer: "a. a reuseable line of code that preforms a specified task"
},

{
    question: "What does JavaScript do for your code?",
    choices: ["a. makes it look pretty", "b. adds functionality", "c. provides a basic structure", "d. all of the above"],
    answer: "b. adds functionality"
},

{
    question: "Which would be the first object in an array?",
    choices: ["a. 0", "b. 1", "c. first", "d. none of the above"],
    answer: "a. 0"
}
];

//Defining variables for HTML elements

//Timer
var timer = document.getElementById('timer');
var timeLeft = document.getElementById("time-left");
var timesUp = document.getElementById("times-up")

//Start Button
var startDiv = document.getElementById('start');
var startBtn = document.getElementById('start-btn');

//Question element
var questionDiv = document.getElementById('questions');
var questionTxt = document.getElementById('question-txt');
var choiceA = document.getElementById('btn1');
var choiceB = document.getElementById('btn2');
var choiceC = document.getElementById('btn3');
var choiceD = document.getElementById('btn4');
var answerCheck = document.getElementById('correct-answer');

//Summary element
var summary = document.getElementById('summary');
var submitInitialBtn = document.getElementById('submit-initials-btn');
var initalInput = document.getElementById('initials');

var scoresDiv =document.getElementById('scores');
var goBack = document.getElementById('go-back-btn');
var clearHighScores = document.getElementById('clear-high-score-btn');
var viewHighScore = document.getElementById('high-scores');
var highScoresList = document.getElementById('high-score-list');
var finalScore = document.getElementById("finalScore");


var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

//Function to start timer on button press

var totalTime = 60;
function newQuiz() {
questionIndex = 0;
totalTime = 60;
timeLeft.textContent = totalTime;



startDiv.style.display = "none";
questionDiv.style.display = "block";
timer.style.display = "block";
timesUp.style.display = "none";
summary.style.display = "none";



var startTimer = setInterval(function() {
    totalTime --;
    timeLeft.textContent = totalTime;
    if(totalTime <= 0) {
        clearInterval(startTimer);
        if (questionIndex < questions.length - 1){
            gameOver();
        }
    }
},1000);

showQuiz();

};

//Show Questions and choices when quiz starts

function showQuiz() {
    nextQuestion();
}

function nextQuestion(){
    questionTxt.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];

   
    
}

//Shows correct answer after player has made their choice

function checkAnswer(answer){
    
    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display ="block";
    answerCheck.style.display ="block";
   
    if(questions[questionIndex].answer === questions[questionIndex].choices[answer]){

    
    //Add to score if correct answer
    questionIndex++;
    correctAns++;
    answerCheck.textContent = "Correct!";

    nextQuestion();

    //If wrong answer


}  else {
    totalTime -= 5;
    timeLeft.textContent = totalTime;
    answerCheck.textContent = 'Wrong! The correct answer was: ' + questions[questionIndex].answer;

    questionIndex ++;
    nextQuestion();
}
};


//Ends the quiz if all questions are answered
if (questionIndex < questions.length) {
    nextQuestion();
} else {

    gameOver();
}

function chooseA() { checkAnswer(0);}

function chooseB() { checkAnswer(1);}

function chooseC() { checkAnswer(2);}

function chooseD() { checkAnswer(3);}

//When timer gets to 0 or all questions answered, bring up game over

function gameOver() {
    summary.style.display ='block';
    questionDiv.style.display = 'none';
    startDiv.style.display = 'none';
    timer.style.display = 'none';
    timesUp.style.display = 'block';

//Shows final player score

finalScore.textContent =correctAns;

}

//Enter initials for high scores
function storeHighScore (event) {
    event.preventDefault();

    startDiv.style.display = 'none';
    timer.style.display = 'none';
    timesUp.style.display = 'none';
    summary.style.display = 'none';
    highScoresList.style.display = 'block';

    //Store high scores in local storage
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null){
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initalInput.value,
        scores: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);

    showHighScores();
}

//Shows high scores
var i =0;
function showHighScores(){
    startDiv.style.display ='none';
    timer.style.display = 'none';
    questionDiv.style.display = 'none';
    timesUp.style.display = 'none';
    summary.style.display = 'none';
    highScoresList.style.display = 'block';

    var savedHighScores = localStorage.getItem("high scores");

    if (savedHighScores === null){
        return;
    }

    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewScore = document.createElement("p");
        eachNewScore.innerHTML = storedHighScores[i].initials + ":" + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewScore);
    }
}

//Event Listeners
startBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitInitialBtn.addEventListener("click", function(event){
    storeHighScore(event);
});

goBack.addEventListener("click", function(){
    startDiv.style.display = "block";
    highScoresList.style.display = "none";

});


