class Game {

    constructor(_context) {
        this.context = _context;
        this.board = new Array();
        for (var i = 0; i < 20; i++) {
            this.board[i] = new Array(10).fill(0);
        }
        this.block = this.GenerateBlock(_context);
    }


    GenerateBlock(context) {

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

    Draw() {
        this.block.Draw();
        Pile.Draw(this.board, this.context);
    }

    Step() {


        if (Pile.IsBlockOnGround(this.block, this.board)) {

            Pile.AddBlockToPile(this.block, this.board);
            var rows = this.CheckRowFill();
            this.RemoveRows(rows);

            this.block = this.GenerateBlock(this.context);

        }
        else {
            this.block.Move(0, 1);
        }

    }


    IsGameOver() {
        for (let i = 0; i < 2; i++) {
            if (board[i].some((e, x) => { return e == 1; })) {

                return true;
            }
        }
        return false;
    }


    CheckRowFill() {

        let res = new Array();

        this.board.forEach((row, y) => {
            if (row.every((e, x) => { return e == 1; })) {
                res.push(y);
            }
        })
        return res;
    }


    RemoveRows(rows) {
        if (rows == undefined || rows.length === 0) {
            return;
        }

        rows.forEach((index) => {

            for (let i = 0; i < index; i++) {
                this.board[index - i] = this.board[index - i - 1].slice();
            }
        })
    }


    KeyInput(e) {

        if (this.block.dropping)
            return;

        switch (e.which) {
            case 32: // space - drop
            this.block.dropping = true;
//                interval = 1;
                break;
            case 37: //left
            this.block.Move(-1, 0);
                if (Pile.CheckCollision(this.block, this.board)) {
                    this.block.Move(1, 0);
                }
                break;

            case 39: //right
            this.block.Move(1, 0);
                if (Pile.CheckCollision(this.block, this.board)) {
                    this.block.Move(-1, 0);
                }
                break;
            case 40: //down
            this.block.Move(0, 1);
                if (Pile.CheckCollision(this.block, this.board)) {
                    this.block.Move(0, -1);
                }
                break;

            case 65: //a
            this.block.RotateLeft();
                if (Pile.CheckCollision(this.block, this.board)) {
                    this.block.RotateRight();
                }
                break;
            case 68: //d
            this.block.RotateRight();
                if (Pile.CheckCollision(this.block, this.board)) {
                    this.block.RotateLeft();
                }
                break;
        }
    }


}