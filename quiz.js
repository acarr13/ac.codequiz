// Gathering HTML elements for manipulation
var startQuizButn = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("firstPage");
var bigScoreContainer = document.getElementById("bigScoreContainer");
var bigScoreDiv = document.getElementById("bigScorePage");
var bigScoreInputName = document.getElementById("initials");
var bigScoreDisplayName = document.getElementById("bigScoreInitials");
var body = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalElScore = document.getElementById("yourScore");
var gameoverDiv = document.getElementById("quizEnd");
var quesEl = document.getElementById("questions");
var quizTimeCount = document.getElementById("timer");
var finishGameButton = document.getElementById("finishGameButton");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplay = document.getElementById("highScoreDisplayScore");
var butnA = document.getElementById("aButton");
var butnB = document.getElementById("bButton");
var butnC = document.getElementById("cButton");
var butnD = document.getElementById("dButton");

// Quiz question object
var quizQuestionsBank = [{
    question: "How many elements can you apply an 'ID' attribute to?",
    choiceA: "As many as you want",
    choiceB: "3",
    choiceC: "1",
    choiceD: "128",
    correctAnswer: "c"},
  {
    question: "What does DOM stand for?",
    choiceA: "Document Object Model",
    choiceB: "Display Object Management",
    choiceC: "Digital Ordinance Model",
    choiceD: "Desktop Oriented Mode",
    correctAnswer: "a"},
   {
    question: "What is used primarily to add styling to a web page?",
    choiceA: "HTML",
    choiceB: "CSS",
    choiceC: "Python",
    choiceD: "React.js",
    correctAnswer: "b"},
    {
    question: "What HTML tags are JavaScript code wrapped in?",
    choiceA: "&lt;div&gt;",
    choiceB: "&lt;link&gt;",
    choiceC: "&lt;head&gt;",
    choiceD: "&lt;script&gt;",
    correctAnswer: "d"},
    {
    question: "When is localStorage data cleared?",
    choiceA: "No expiration time",
    choiceB: "On page reload",
    choiceC: "On browser close",
    choiceD: "On computer restart",
    correctAnswer: "a"},  
    {
    question: "What does WWW stand for?",
    choiceA: "Web World Workings",
    choiceB: "Weak Winter Wind",
    choiceC: "World Wide Web",
    choiceD: "Wendy Wants Waffles",
    correctAnswer: "c"},
    {
    question: "What HTML attribute references an external JavaScript file?",
    choiceA: "href",
    choiceB: "src",
    choiceC: "class",
    choiceD: "index",
    correctAnswer: "b"},
        
    
    ];
// Other global variables
var lastQuestionIndex = quizQuestionsBank.length;
var currQuestionIndex = 0;
var remaningTime = 76;
var timerInterval;
var score = 0;
var correct;

// This function cycles through the object array containing the quiz questions to generate the questions and answers.
function displayQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currQuestionIndex === lastQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestionsBank[currQuestionIndex];
    quesEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    butnA.innerHTML = currentQuestion.choiceA;
    butnB.innerHTML = currentQuestion.choiceB;
    butnC.innerHTML = currentQuestion.choiceC;
    butnD.innerHTML = currentQuestion.choiceD;
};

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    displayQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        remaningTime--;
        quizTimeCount.textContent = "Time left: " + remaningTime;
    
        if(remaningTime === 0) {
          clearInterval(timerInterval);
          displayScore();
        }
      }, 1000);
    body.style.display = "block";
}
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function displayScore(){
    body.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    bigScoreInputName.value = "";
    finalElScore.innerHTML = "You got " + score + " out of " + quizQuestionsBank.length + " correct!";
}

// On click of the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in local stoage
// as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(bigScoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = bigScoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        bigScoreContainer.style.display = "flex";
        bigScoreDiv.style.display = "block";
        finishGameButton.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores(){
    bigScoreDisplayName.innerHTML = "";
    highscoreDisplay.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        bigScoreDisplayName.appendChild(newNameSpan);
        highscoreDisplay.appendChild(newScoreSpan);
    }
}

// This function displays the high scores page while hiding all of the other pages from 
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    bigScoreContainer.style.display = "flex";
    bigScoreDiv.style.display = "block";
    finishGameButton.style.display = "flex";

    generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore(){
    window.localStorage.clear();
    bigScoreDisplayName.textContent = "";
    highscoreDisplay.textContent = "";
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz(){
    bigScoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    remaningTime = 76;
    score = 0;
    currQuestionIndex = 0;
}

// This function checks the response to each answer 
function checkAnswer(answer){
    correct = quizQuestionsBank[currQuestionIndex].correctAnswer;

    if (answer === correct && currQuestionIndex !== lastQuestionIndex){
        score++;
        alert("That Is Correct!");
        currQuestionIndex++;
        displayQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currQuestionIndex !== lastQuestionIndex){
        alert("That Is Incorrect.")
        currQuestionIndex++;
        displayQuizQuestion();
        //display in the results div that the answer is wrong.
    }else{
        showScore();
    }
}

// This button starts the quiz!
startQuizButn.addEventListener("click",startQuiz);