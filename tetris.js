$(document).keydown(function (e) {
    console.log(e.which);

    switch (e.which) {
        case 32: // space - drop
            console.log('drop');
            block.
                break;
        case 37: //left
            console.log('left');
            block.Move(-1, 0);
            break;
        case 38: //up
            console.log('up');
            block.Move(0, -1);
            break;
        case 39: //right
            console.log('right');
            block.Move(1, 0);
            break;
        case 40: //down
            console.log('down');
            block.Move(0, 1);
            break;

        case 65: //a
            console.log('rotate left');
            block.RotateLeft();
            break;
        case 68: //d
            console.log('rotate right');
            block.RotateRight();
            break;
    }
})



console.log("welcome to tetris");

const canvas = $('#TetrisCanvas')[0];
const context = canvas.getContext('2d');
context.scale(30, 30);

context.fillStyle = '#aaa';
context.fillRect(0, 0, canvas.width, canvas.height);

var block = new revL_Block(context);

let board = new Array(20);

for (var i = 0; i < 20; i++) {
    board[i] = new Array(10);
}

board[1][11] = 1;


update();



//block.CheckCollision(board);

var interval = 500
var cycle = 0;
var lastTime = 0;
var dTime = 0;

function update(time = 0) {
    
    console.log(time);

    cycle += dTime;

    if (cycle > 500){

        cycle = 0;
        context.fillStyle = '#000';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        block.Draw();
        requestAnimationFrame(update);
    }
}

