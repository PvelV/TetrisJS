$(document).keydown(function (e) {


    switch (e.which) {
        case 32: // space - drop
            block.dropping = true;
            break;
        case 37: //left
            block.Move(-1, 0);
            if (block.CheckCollision(board)) {
                block.Move(1, 0);
            }
            break;


        case 38: //up - testing only
            //block.Move(0, -1);
            //           if (block.CheckCollision(board)) {
            //              block.Move(0, 1);
            //         }
            break;


        case 39: //right
            block.Move(1, 0);
            if (block.CheckCollision(board)) {
                block.Move(-1, 0);
            }
            break;
        case 40: //down
            block.Move(0, 1);
            if (block.CheckCollision(board)) {
                block.Move(0, -1);
            }
            break;

        case 65: //a
            block.RotateLeft();
            if (block.CheckCollision(board)) {
                block.RotateRight();
            }
            break;
        case 68: //d
            block.RotateRight();
            if (block.CheckCollision(board)) {
                block.RotateLeft();
            }
            break;
    }
})

var pile = new Array();


const canvas = $('#TetrisCanvas')[0];
const context = canvas.getContext('2d');
context.scale(30, 30);

context.fillStyle = '#aaa';
context.fillRect(0, 0, canvas.width, canvas.height);

var block = GenerateBlock();

let board = new Array(21);

for (var i = 0; i < 20; i++) {
    board[i] = new Array(10).fill(0);
}
// board[20] = new Array(10).fill(1);
// board[21] = new Array(10).fill(1);
// board[22] = new Array(10).fill(1);
// board[23] = new Array(10).fill(1);

update();

var interval = 250;
var cycle = 0;
var lastTime = 0;

function update(time = 0) {

    dTime = time - lastTime;
    lastTime = time;
    cycle += dTime;


    if (cycle > interval) {

        cycle = 0;

        if (block.IsOnGround(board)) {
            AddBlockToPile();
            interval = 500;

            RemoveRows(CheckRowFill());

            block = GenerateBlock();
        }
        else {

            block.Move(0, 1);
        }
    }
    context.fillStyle = '#ccc';
    context.fillRect(0, 0, canvas.width, canvas.height);

    block.Draw();
    DrawPile();

    requestAnimationFrame(update);

}


function RemoveRows(rows) {
    rows.forEach((index) => {
        console.log(index);
        for (let i = 0; i < index; i++) {
            board[index - i] = board[index - i - 1];
        }
    })
}

function CheckRowFill() {

    let res = new Array();

    board.forEach((row, y) => {
        if (row.every((e, x) => { return e == 1; })) {
            res.push(y);
        }
    })
    return res;
}


function DrawPile() {
    board.forEach((row, y) => {
        row.forEach((e, x) => {

            if (e == 1) {
                context.fillStyle = '#333';
                context.fillRect(x, y, 1, 1);
            }
            if (e == 2) {
                console.log('paint 2')
                context.fillStyle = 'red';
                context.fillRect(x, y, 1, 1);
            }

        })
    })

}

function AddBlockToPile() {
    pile.push(block);
    block.matrix.forEach((row, y) => {
        row.forEach((e, x) => {
            if (e == 1) {
                board[block.yOffset + y][block.xOffset + x] = 1;
            }
        })
    });
}


function GenerateBlock() {

    switch (Math.floor(Math.random() * 6)) {

        case 0:
            return new T_Block(context);
            break;


        case 1:
            return new I_Block(context);
            break;


        case 2:
            return new L_Block(context);
            break;


        case 3:
            return new revL_Block(context);
            break;


        case 4:
            return new S_Block(context);
            break;


        case 5:
            return new Square_Block(context);
            break;

        default:
            console.log('wrong random')
    }
}