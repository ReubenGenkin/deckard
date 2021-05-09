
// arrays for questions
var questions = [
  {
    question: "Who is the main charactor in Blade Runner?",
    choices: ["Bucky", "David Tenant", "Rick Deckard", "Roy Batty"],
    answer: "Rick Deckard",
  },
  {
    question:
      "The ending monologue said by Roy Batty starts with...",
    choices: ["Like tears in rain", "I've seen things you people wouldn't believe", "Time to die", "Does she know"],
    answer: "I've seen things you people wouldn't belive",
  },
  {
    question: "What is the Tyrell Corp motto?",
    choices: ["More human then human", "Have it your way", "Lets do it>", "Like tears in rain"],
    answer: "More human then human",
  },
  {
    question:
      "What are the antagonists?",
    choices: ["Robots", "Terminators", "Replicants", "Androids"],
    answer: "Replicants",
  },
  {
    question:
      "What origami animal is seen in the last scene of the final cut",
    choices: ["Cat", "Dragon", "Pegasus", "Unicorn"],
    answer: "Unicorn",
  },
];


// selecting the html elements thats being manipulated
var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");

// keeping track of score and what question were on
var questionIndex = 0;
var correctCount = 0;

//variables for the timer
var time = 70;
var intervalId;


function endQuiz() {
  clearInterval(intervalId);




  if (correctCount > localStorage.getItem('highScore')) {

    initials = "";

    winInitials = initials;
    winCount = correctCount;

    localStorage.setItem('player', winInitials);
    localStorage.setItem('highScore', correctCount);

    // var body = document.body;
    // body.classList.add("body-class");
    // body.innerHTML = "Game over, You scored " + correctCount + "." + " You have the new high score!";
  } else {
    var body = document.body;
    body.classList.add("body-class");
    body.innerHTML = "Game over, You scored " + correctCount + "." + " You loose to " + localStorage.getItem('player');
  }

  // if (input) {
  // localStorage.setItem('newPlayer', initials);
  // localStorage.setItem('newScore', correctCount);
  // checkScore123();}


}
//stopping the quiz on timout
function updateTime() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();

  }
}

function renderQuestion() {

  if (time == 0) {
    updateTime();
    return;
  }

  intervalId = setInterval(updateTime, 1000);

  document.getElementById('timer-title').textContent = "Time Left:";

  questionEl.textContent = questions[questionIndex].question;

  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";

  var choices = questions[questionIndex].choices;
  var choicesLenth = choices.length;

  for (var i = 0; i < choicesLenth; i++) {
    var questionListItem = document.createElement("li");
    questionListItem.textContent = choices[i];
    optionListEl.append(questionListItem);
  }
}
//stopping the quiz once you reach the last question
function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
}

function checkAnswer(event) {
  clearInterval(intervalId);
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct";
      correctCount++;
    } else {
      questionResultEl.textContent = "Incorrect";
      time = time - 10;
      timerEl.textContent = time;
    }
  }
  setTimeout(nextQuestion, 2000);
}


optionListEl.addEventListener("click", checkAnswer);


winCount = "";

function storeStart () {
newInitials = document.getElementById("input-start");
localStorage.setItem("playerNew", newInitials);
}


function preQuiz() {

  contentDiv = document.getElementById('content');
  contentDiv.classList.add("content-class");

  headStart = document.createElement('h2');
  headStart.classList.add("start-title");
  headStart.textContent = "Welcome to the quiz. Enter your Name and press the start button when your ready to begin";
  contentDiv.appendChild(headStart);

  inputDiv = document.createElement('div');
  inputDiv.classList.add("input-div");
  contentDiv.append(inputDiv);

  inputStart = document.createElement('INPUT');
  inputStart.setAttribute("type", "text");
  inputStart.classList.add("input-start");
  inputStart.setAttribute('id', "input-start");
  // inputStart.textContent = "Enter Name"
  inputDiv.appendChild(inputStart);

  buttonDiv = document.createElement('div');
  inputDiv.classList.add("button-div");
  contentDiv.append(buttonDiv);

  buttStart = document.createElement('button');
  buttStart.classList.add("start-button");
  content.setAttribute("id", "start-button");
  buttStart.textContent = "Start";
  buttonDiv.append(buttStart);

  start = buttStart.querySelector("#start-button");
  buttStart.addEventListener("click", renderQuestion);
  buttStart.addEventListener("click", clear);
  buttStart.addEventListener("click", storeStart);
}

function clear() {
  headStart.remove();
  buttStart.remove();
  inputStart.remove();
  inputDiv.remove();
}

preQuiz();