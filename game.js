//Definitions

var green = new Audio('sounds/green.mp3')
var red = new Audio('sounds/red.mp3')
var yellow = new Audio('sounds/yellow.mp3')
var blue = new Audio('sounds/blue.mp3')
var gameover = new Audio('sounds/wrong.mp3')

var gameLevel = 0;
var sequence = [];
var input = [];


// Functions

function playSound(x) {
    switch (x) {
        case "1":
            green.play();
        break;
        case "2":
            red.play();
        break;
        case "3":
            yellow.play();
        break;
        case "4":
            blue.play();
        break;
        default: //do nothing
    }
}

function flashButton(y) {
    switch (y) {
        case "1":
            var activeButton = $("div.key1");
        break;
        case "2":
            var activeButton = $("div.key2");
        break;
        case "3":
            var activeButton = $("div.key3");
        break;
        case "4":
            var activeButton = $("div.key4");
        break;
        default:
            console.log(y + " flash logged");
    }
    activeButton.addClass("pressed");
    setTimeout(() => {
        activeButton.removeClass("pressed");
    },  200);
}

function addSequence() {
    var randomNum = (Math.floor(Math.random() * 4) + 1);
    sequence.push("" + randomNum + "");
    // console.log(sequence);
    return sequence;
}

function levelUp() {
    addSequence();
    var sequenceNum = sequence[sequence.length-1];
    gameLevel = sequence.length;
    $("h1").text("Level " + gameLevel);
    console.log("Game level " + gameLevel);
    setTimeout(() => {
        flashButton("" + sequenceNum + "");
    }, 500);
    return gameLevel;
}

function gameOver() {
    $("h1").text("Game Over! Press START to try again.");
    $("body").addClass("game-over");
    gameover.play();
    gameLevel = 0;
    console.log("Game level " + gameLevel);
}

function checkAnswer() {
    var result = JSON.stringify(input) == JSON.stringify(sequence);
    if (result) {
        console.log("Passed");
        input = [];
        setTimeout(() => {
            levelUp();
        }, 1000);
    } else {
        console.log("Failed");
        gameOver();
    }
}


// Game Logic

console.log("Game level " + gameLevel);

document.getElementById('button').onclick = function() {
    if (gameLevel == 0) {
        sequence = [];
        input = [];
        $("body").removeClass("game-over");
        setTimeout(() => {
            levelUp();
        }, 500);
    }
}

$("div.btn").click(function () {
    if (gameLevel > 0) {
        playSound(this.innerHTML);
        flashButton(this.innerHTML);
        var inputKey = this.innerHTML;
        input.push(inputKey);
        // console.log(input);
    }
    if (input.length === gameLevel && gameLevel != 0) {
        checkAnswer();
    }
});
