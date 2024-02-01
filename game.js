var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence() {

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    //console.log(gamePattern);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    // let path = `./sounds/${randomChosenColour}.mp3`;

    var audio = new Audio(`./sounds/${randomChosenColour}.mp3`);
    audio.play();

    level = level + 1; //increase the level by 1 every time nextSequence() is called.
    $("#level-title").text("Level " + level);
}

$(".btn").on( "click", function(e){
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour); //play sound when user clicked that button
    animatePress(userChosenColour);


    checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColour){

    $("#"+ currentColour).addClass("pressed");

    //remove the animation after sometime
    setTimeout(function() {
        $("#"+ currentColour).removeClass("pressed");

    }, 100);
}


$(document).on("keypress", function() {

    if(!started){

    $("#level-title").text("Level" + level);

    nextSequence(); 
    started = true;
    }
    //console.log(started);
});

// function to check the answers
function checkAnswer(currentLevel) {


    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        console.log("success");
        //console.log(userClickedPattern);
        //console.log(gamePattern);
        if(userClickedPattern.length === gamePattern.length){
            
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }
    else {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}