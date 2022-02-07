var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {


  if (!started) //started is not the initial value of it,which becomes true.
  { //execute these code.
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true //This will change the initial value of started to true
  }

});



function nextSequence() {
  userClickedPattern = [];
  level++
  $("#level-title").text("Level " + level);
  //random colour selector
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  //sound
  playSound(randomChosenColour);
  //animation
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  //add next color
  gamePattern.push(randomChosenColour);
};

//user selector
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  playSound(userChosenColour);
  animatePress(userChosenColour);

  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


//sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

//pressed animation
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);


}

//checking answer

function checkAnswer(currentlevel) {
  if (userClickedPattern[currentlevel] === gamePattern[currentlevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();

  }

}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
