$(document).keydown(function (e) {

    if (block.dropping)
        return;

    switch (e.which) {
        case 32: // space - drop
            block.dropping = true;
            interval = 1;
            break;
        case 37: //left
            block.Move(-1, 0);
            if (block.CheckCollision(game.board)) {
                block.Move(1, 0);
            }
            break;

        case 39: //right
            block.Move(1, 0);
            if (block.CheckCollision(game.board)) {
                block.Move(-1, 0);
            }
            break;
        case 40: //down
            block.Move(0, 1);
            if (block.CheckCollision(game.board)) {
                block.Move(0, -1);
            }
            break;

        case 65: //a
            block.RotateLeft();
            if (block.CheckCollision(game.board)) {
                block.RotateRight();
            }
            break;
        case 68: //d
            block.RotateRight();
            if (block.CheckCollision(game.board)) {
                block.RotateLeft();
            }
            break;
    }
})

let game = new Game();

const canvas = $('#TetrisCanvas')[0];
const context = canvas.getContext('2d');
context.scale(30, 30);

context.fillStyle = '#aaa';
context.fillRect(0, 0, canvas.width, canvas.height);

var block = GenerateBlock();

var pile = new Array();
let gameOver = false;

update();


var interval = 250;
var cycle = 0;
var lastTime = 0;

function update(time = 0) {

    dTime = time - lastTime;
    lastTime = time;
    cycle += dTime;


    if (cycle > interval && !gameOver) {

        cycle = 0;
        
        if (block.IsOnGround(game.board)) {
            
            AddBlockToPile();
            
            interval = 500;
            
            RemoveRows(CheckRowFill());

            
            if (IsGameOver()) {
                gameOver = true;
                alert('Game Over!');
            }
            
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



function IsGameOver() {
    for (let i = 0; i < 2; i++) {
        if (game.board[i].some((e, x) => { return e == 1; })) {

            return true;
        }
    }
    return false;
}

function RemoveRows(rows) {
    console.log(rows)
    console.log(game.board.toString());
    if (rows == undefined || rows.length === 0) {
        console.log('not')
        return;
    }
    console.log('removing');
    
    rows.forEach((index) => {

        for (let i = 0; i < index; i++) {
            game.board[index - i] = game.board[index - i - 1].slice();
        }
    })

}

function CheckRowFill() {

    let res = new Array();

    game.board.forEach((row, y) => {
        if (row.every((e, x) => { return e == 1; })) {
            res.push(y);
        }
    })
    return res;
}


function DrawPile() {
    game.board.forEach((row, y) => {
        row.forEach((e, x) => {

            if (e == 1) {
                context.fillStyle = '#333';
                context.fillRect(x, y, 1, 1);
            }
        })
    })

}

function AddBlockToPile() {
    let addedBlocks = 0;
    block.matrix.forEach((row, y) => {
        row.forEach((e, x) => {
            if (e == 1) {
                game.SetBoard((block.yOffset + y),(block.xOffset + x), 1);
                addedBlocks++;
                console.log('added blocks:' + addedBlocks);
            }
            if (addedBlocks > 4) {
                alert('error');
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

    }
}