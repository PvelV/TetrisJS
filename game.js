class Game {

    constructor(context, nextBlockContext, interval) {
        this.context = context;
        this.nextBlockContext = nextBlockContext;
        this.board = new Array();
        for (var i = 0; i < 20; i++) {
            this.board[i] = new Array(10).fill(0);
        }
        this.block = this.GenerateBlock();
        this.nextBlock = this.GenerateBlock();


        this.interval = interval;
        this.originalInterval = interval;
        this.score = 0;
    }




    Step() {

        if (Pile.IsBlockOnGround(this.block, this.board)) {

            Pile.AddBlockToPile(this.block, this.board);

            this.interval = this.originalInterval;

            var rows = this.CheckRowFill();
            this.RemoveRows(rows);
            this.SetScore(rows.length);


            if (this.IsGameOver()) {
                return false;
            }

            this.block = this.nextBlock;
            this.nextBlock = this.GenerateBlock();
            return true;
        }
        else {
            this.block.Move(0, 1);
            return true;
        }

    }

    SetScore(increment) {
        this.score += increment;
        $('#Score').text(this.score);
    }

    Draw() {
        this.block.Draw(this.context);
        this.nextBlock.DrawNextBlock(this.nextBlockContext);
        Pile.Draw(this.board, this.context);

    }


    IsGameOver() {
        for (let i = 0; i < 2; i++) {
            if (this.board[i].some(
                (e, x) => { return e == 1; })) {

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
                this.interval = 1;
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

    GenerateBlock() {

        switch (Math.floor(Math.random() * 7)) {

            case 0:
                return new T_Block();
                break;


            case 1:
                return new I_Block();
                break;


            case 2:
                return new L_Block();
                break;


            case 3:
                return new revL_Block();
                break;


            case 4:
                return new S_Block();
                break;


            case 5:
                return new Square_Block();
                break;
                
                
            case 6:
                return new Z_Block();
                break;

        }
    }

}
