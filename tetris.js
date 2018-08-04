$(document).keydown(function (e) {
    console.log(e.which);

    switch (e.which) {
        case 32: // space - drop
            break;
        case 37: //left
            block.Move(-1, 1);
            break;

        case 39: //right
            block.Move(1, 1);
            break;
        case 40: //down
            block.Move(0, 1);
            break;

        case 65: //a
            block.RotateLeft();
            break;
        case 68: //d
            block.RotateRight();
            break;
    }
})

var pile = new Array();


const canvas = $('#TetrisCanvas')[0];
const context = canvas.getContext('2d');
context.scale(30, 30);

context.fillStyle = '#aaa';
context.fillRect(0, 0, canvas.width, canvas.height);

var block = new T_Block(context);

let board = new Array(21);

for (var i = 0; i < 20; i++) {
    board[i] = new Array(10);
}
board[20] = new Array(10).fill(1);
board[21] = new Array(10).fill(1);
board[22] = new Array(10).fill(1);
board[23] = new Array(10).fill(1);

update();

var interval = 500
var cycle = 0;
var lastTime = 0;

function update(time = 0) {

    dTime = time - lastTime;
    lastTime = time;
    cycle += dTime;


    if (cycle > 500) {

        cycle = 0;

        if (block.IsOnGround(board)) {
            console.log('impact');
            pile.push(block);
            block = new I_Block(context);
        }
        else {

            block.Move(0, 1);
        }
    }
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    block.Draw();
    pile.forEach((e)=>e.Draw());

    requestAnimationFrame(update);

}

