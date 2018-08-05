$(document).keydown(function (e) {
    e.preventDefault();
    if (!gameOver) {
        game.KeyInput(e);
    }
})

$('#StopButton').click(() => {
    gameOver = true;
})

$('#StartButton').click(() => {
    gameOver = false;
})

$('#PauseButton').click(() => {
    gameOver = !gameOver;
})

$('#RestartButton').click(() => {
    Restart();
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


let gameOver = true;
let Score = 0;
let cycle = 0;
let lastTime = 0;
let interval = 200;


let game = new Game(context, nextBlockContext, interval);

update();



function Restart() {

    game = new Game(context, nextBlockContext, interval);
    Score = 0;
    $('#Score').text(Score);

}

function update(time = 0) {

    dTime = time - lastTime;
    lastTime = time;
    cycle += dTime;


    if (cycle > game.interval && !gameOver) {

        cycle = 0;

        if (!game.Step()) {
            //game over
            gameOver = true;
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