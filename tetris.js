$(document).keydown(function (e) {
    game.KeyInput(e);
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

let gameOver = false;
let Score = 0;
let interval = 250;
let cycle = 0;
let lastTime = 0;

let game = new Game(context);

update();

function SetScore(increment) {
    Score += increment;
    $('#Score').text(Score);
}

function Restart() {

    game = new Game(context);
    Score = 0;
    $('#Score').text(Score);

}

function update(time = 0) {

    dTime = time - lastTime;
    lastTime = time;
    cycle += dTime;


    if (cycle > interval && !gameOver) {

        cycle = 0;

        game.Step();

        // if (block.IsOnGround(game.board)) {

        //     AddBlockToPile();

        //     interval = 500;

        //     var rows = CheckRowFill();
        //     RemoveRows(rows);
        //     SetScore(rows.length);


        //     if (IsGameOver()) {
        //         gameOver = true;
        //         alert('Game Over!');
        //         Restart();
        //     }


        //     block = GenerateBlock();
        // }
        // else {

        //     block.Move(0, 1);
        // }
    }
    context.fillStyle = '#ccc';
    context.fillRect(0, 0, canvas.width, canvas.height);

    game.Draw();

    requestAnimationFrame(update);

}













