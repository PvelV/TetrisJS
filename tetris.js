$(document).keydown(function (e) {
    e.preventDefault();

    if (!gameOver && !pause) {
        game.KeyInput(e);
    }
})


$('#StartButton').click(() => {

    if ($('#StartButton')[0].innerHTML == 'Start Game') {
        pause = false;
        gameOver = false;
        $('#StartButton').text('Pause');
    }
    else if ($('#StartButton')[0].innerHTML == 'Pause') {
        pause = true;
        $('#StartButton').text('Continue');
    }
    else {
        pause = false;
        $('#StartButton').text('Pause');
    }
})


$('#RestartButton').click(() => {
    Restart();
    $('#StartButton').text('Pause');
    pause = false;
})

$('#IncreaseDifficulty').click(() => {

    if (difficulty < 10) {
        difficulty++;
        interval = 1000 / difficulty;
        game.interval = interval;
        game.originalInterval = interval;
        $('#Difficulty').text(difficulty);
    }
})

$('#DecreaseDifficulty').click(() => {
    if (difficulty > 1) {
        difficulty--;
        interval = 1000 / difficulty;
        game.interval = interval;
        game.originalInterval = interval;
        $('#Difficulty').text(difficulty);
    }
})

const canvas = $('#TetrisCanvas')[0];
const context = canvas.getContext('2d');
context.scale(30, 30);

context.fillStyle = '#aaa';
context.fillRect(0, 0, canvas.width, canvas.height);


const nextBlockCanvas = $('#NextBlock')[0];
const nextBlockContext = nextBlockCanvas.getContext('2d');
nextBlockContext.scale(30, 30);

nextBlockContext.fillStyle = '#aaa';
nextBlockContext.fillRect(0, 0, canvas.width, canvas.height);

let difficulty = 5;
let pause = true;
let gameOver = false;
let Score = 0;
let cycle = 0;
let lastTime = 0;
let interval = 1000/difficulty;


let game = new Game(context, nextBlockContext, interval);

update();



function Restart() {

    pause = true;
    gameOver = false;
    game = new Game(context, nextBlockContext, interval);
    Score = 0;
    $('#Score').text(Score);

}

function update(time = 0) {

    dTime = time - lastTime;
    lastTime = time;
    cycle += dTime;


    if (cycle > game.interval && !gameOver && !pause) {

        cycle = 0;

        if (!game.Step()) {
            //game over
            gameOver = true;
            pause = true;
            $('#StartButton').text('Start Game');
            alert('Game Over!');
            Restart();
        }

    }
    context.fillStyle = '#ccc';
    context.fillRect(0, 0, canvas.width, canvas.height);

    nextBlockContext.fillStyle = '#ccc';
    nextBlockContext.fillRect(0, 0, nextBlockCanvas.width, nextBlockCanvas.height);

    game.Draw();

    requestAnimationFrame(update);

}