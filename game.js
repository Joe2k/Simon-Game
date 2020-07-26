var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;


function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);
    //console.log(randomNumber);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(200).fadeIn(200);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level "+level);
}

$(".btn").click(function () {
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    //console.log(userClickedPattern);
});

function playSound(name) {
    var obj = document.createElement("audio");
    obj.src = "sounds/"+name+".mp3";
    obj.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColour).removeClass("pressed");
    },100);
}

$(document).keydown(function () {
    nextSequence();

});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
        if (currentLevel === level - 1) {
            setTimeout(function () {
                nextSequence()
            }, 1000);
            userClickedPattern = [];
        }
    }
    else
        {
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            },200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }
}

function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
}
