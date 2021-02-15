var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

//lancer le jeu

$(document).keypress(function() {
  if(!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

//selection de la couleur avec click
$(".btn").click (function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

// choix aleatoire de la couleur
function nextSequence(){

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  randomNumber = Math.floor(Math.random()* 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

  function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");


  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


//check answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

    } else {

    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();

    }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
