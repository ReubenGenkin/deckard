
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
        choices: ["Like tears in rain", "I've seen things you people wouldn't belive", "Time to die", "Does she know"],
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
    var body = document.body;
    body.innerHTML = "Game over, You scored " + correctCount;
    if (correctCount > highScore) {
      localStorage.setItem('player', correctCount);
      localStorage.setItem('highScore', correctCount);
    }
  }
    //stopping the quiz on timout
  function updateTime() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      endQuiz();
    }
  }
  // no more questions when tim is zero
  // same functio also gives questions
  function renderQuestion() {
    initials = prompt("Welcome to the blade runner quiz. Your time will start once you enter your initials");
    if (time == 0) {
      updateTime();
      return;
    }
  
    intervalId = setInterval(updateTime, 1000);
    
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
        time = time - 5;
        timerEl.textContent = time;
      }
    }
    setTimeout(nextQuestion, 2000);
  }
  
  renderQuestion();
  optionListEl.addEventListener("click", checkAnswer);


  localStorage.setItem('player', initials);
  localStorage.setItem('highScore', correctCount);
  console.log(localStorage.player);