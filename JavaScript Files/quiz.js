// The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
window.addEventListener("DOMContentLoaded", init);

//global variables
var marks = 0;
var time = 0; //seconds
var maxTime = 60;
var answers = [];
var activeQuestion = 0;
var optionElements = null;
var startButton = null;
var nextQuestionButton = null;
var questionContainer = null;
var background = "green";
var interval = "null";
var resultsContainer = null;
var timeContainer = null;
var marksContainer = null;
var timer = null;
var correct = [];
var wrong = [];

/**
 * firest when DOMContentLoaded
 */
function init() {
  // attaching start button event
  startButton = document.getElementById("start");
  nextQuestionButton = document.getElementById("next");
  questionContainer = document.getElementById("question_container");
  resultsContainer = document.getElementById("results");
  timeContainer = document.getElementById("time");
  marksContainer = document.getElementById("marks");
  timerContainer = document.getElementById("timer");

  // start button on click bind
  startButton.addEventListener("click", startQuiz);

  // next question button bind
  nextQuestionButton.addEventListener("click", handleNextQuestion);

  // bind option click handler to options
  optionElements = document.getElementsByClassName("option");
  for (let i = 0; i < optionElements.length; i++) {
    optionElements[i].addEventListener("click", handleOptionClick);
  }
}

/**
 * gets values from question object and display them
 * @param {Number} questionIndex
 */
function displayQuestion(questionIndex) {
  // add question
  var question = document.getElementById("question");
  question.innerHTML = "(" + (questionIndex+1) + ") " + window.questions[questionIndex].question;

  //add options
  questions[questionIndex].options.forEach((option, index) => {
    var elementID = "option-" + index;
    var optionElement = document.getElementById(elementID);
    optionElement.innerHTML = option;
  });
}

/**
 * fires when the next quesion button clicks
 */
function handleNextQuestion() {
  // unselect the currently selected options
  unselectOption();
  //disable next button for the next question
  nextQuestionButton.disabled = true;
  // increment active question
  activeQuestion++;
  // check if that's the last question
  if (activeQuestion < questions.length) {

    if(activeQuestion == questions.length -1){
      // this is the last question
      nextQuestionButton.innerHTML = "Finish Quiz"
    }
    displayQuestion(activeQuestion);
  } else {
    // we have reached the end of questions, need to finish the course
    finishQuiz();
  }
}

/**
 *  unselect whatever the option that has been selected
 */
function unselectOption() {
  for (let i = 0; i < optionElements.length; i++) {
    optionElements[i].classList.remove("active");
  }
}

// saves the answer when you click on an option
function handleOptionClick(e) {
  // unselect all
  unselectOption();

  // select the clicked item
  e.target.classList.add("active");

  // save answer
  answers[activeQuestion] = parseInt(e.target.dataset.option);
  console.log(answers);

  //unlock next button
  nextQuestionButton.disabled = false;
}

function startQuiz(e) {
  //hide the start quiz button
  questionContainer.style.display = "block";
  e.target.style.display = "none";

  //display the first question
  displayQuestion(0);
  interval = setInterval(function () {
    // every second this function fires
    time = time + 1;
    timerContainer.innerHTML = time + "/" + maxTime

    if (time >= maxTime) {
      finishQuiz();
    }
  }, 1000);
}

function finishQuiz(params) {
  // stop timer
  clearInterval(interval);
  // hide question container
  questionContainer.style.display = "none";
  //mark
  markQuiz();
  // display score
  resultsContainer.style.display = "flex";
  timeContainer.innerHTML = "You have spent "+ time + " seconds";
  marksContainer.innerHTML = "Your score is " + marks + "</br> You gave correct answers to questions: " + correct + "</br> You gave wrong answers to questions: " + wrong + "";
  if (marks < 0) {
    background = "red";
  } else if (marks < 5) {
    background = "orange";
  } else if (marks < 10) {
    background = "yellow";
  } else if (marks < 15) {
    background = "lightgreen";
  } else {
    background = "green";
  }


  document.querySelector("body").style.background = background;
}

function markQuiz() {
  for (let i = 0; i < questions.length; i++) {
    console.log(answers[i] == questions[i].answer);
    if (answers[i] == questions[i].answer) {
      marks = marks + 2;
      correct.push(i+1) // i+1 is the question number
    } else {
      marks = marks - 1;
      wrong.push(i+1)
    }
  }

  console.log(marks);
}
