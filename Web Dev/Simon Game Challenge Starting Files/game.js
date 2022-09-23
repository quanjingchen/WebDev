var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;
$(window).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

//response
$(".btn").on("click", function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];
  var randNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randNumber];
  gamePattern.push(randomChosenColour);
  // show patter
  $("#" + randomChosenColour).fadeIn("100").fadeOut("100").fadeIn("100");
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] != gamePattern[currentLevel]) {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  } else {
    console.log("success");
    if (currentLevel + 1 == level) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}
