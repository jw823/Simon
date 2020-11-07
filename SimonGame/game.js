// alert("sup");
var buttonCol = ["red", "blue", "green", "yellow"];

var gamePattern = []
var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
}
});

$(".btn").click(function(){
    var userCol = $(this).attr("id");
    userClickedPattern.push(userCol);
    playSound(userCol);
    animatePress(userCol);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currLevel){
    if (gamePattern[currLevel] === userClickedPattern[currLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
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

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randNum = Math.floor(Math.random() * 4);
    var randCol = buttonCol[randNum];
    gamePattern.push(randCol);
    $("#" + randCol).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randCol);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currCol) {
  $("#" + currCol).addClass("pressed");
  setTimeout(function () {
    $("#" + currCol).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
