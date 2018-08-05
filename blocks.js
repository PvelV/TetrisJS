class BaseBlock {
    constructor(CanvasContext) {
        this.matrix = [[], []];
        this.board = CanvasContext;
        this.color;
        this.dropping = false;

        this.xOffset = 3;
        this.yOffset = 0;
    }

    Move(x, y) {
        this.xOffset += x;
        this.yOffset += y;
        if (y!=0) {
            console.log(this.yOffset);
        }
    }

    IsOnGround(globalMatrix) {

        this.Move(0, 1);
        let result = this.CheckCollision(globalMatrix);
        this.Move(0, -1);
        console.log('IsOnGround ' + globalMatrix.toString());
        
        return result;
    }

    RotateRight() {

        // reverse the rows
        this.matrix = this.matrix.reverse();
        // swap the symmetric elements
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < i; j++) {
                var temp = this.matrix[i][j];
                this.matrix[i][j] = this.matrix[j][i];
                this.matrix[j][i] = temp;
            }
        }
    }


    RotateLeft() {

        this.matrix = this.matrix.map(function (row) {
            return row.reverse();
        });

        // swap the symmetric elements
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < i; j++) {
                var temp = this.matrix[i][j];
                this.matrix[i][j] = this.matrix[j][i];
                this.matrix[j][i] = temp;
            }
        }
    }

    CheckCollision(globalMatrix) {

        return this.matrix.some((row, y) => {
            return row.some((e, x) => {

                if (e == 1) {
                    if ((x + this.xOffset) < 0 || (x + this.xOffset) > 9 || (y + this.yOffset) < 0 || (y + this.yOffset) > 19
                        || globalMatrix[y + this.yOffset][x + this.xOffset] == 1) {
                        return true;
                    }
                    return false;
                }
            });
        })
    }


    Draw() {
        this.matrix.forEach((row, y) => {
            row.forEach((element, x) => {
                if (element !== 0) {
                    this.board.fillStyle = this.color;
                    this.board.fillRect(this.xOffset + x, this.yOffset + y, 1, 1);
                }
            })

        });
    }
}

class T_Block extends BaseBlock {
    constructor(CanvasContext) {
        super(CanvasContext);

        this.color = 'red';
        this.matrix = [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ]
    }
}

class Square_Block extends BaseBlock {
    constructor(CanvasContext) {
        super(CanvasContext);

        this.color = 'green';
        this.matrix = [
            [1, 1],
            [1, 1]
        ]
    }

    RotateLeft() { }
    RotateRight() { }
}

class I_Block extends BaseBlock {
    constructor(CanvasContext) {
        super(CanvasContext);

        this.color = 'blue';
        this.matrix = [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    }
}


class L_Block extends BaseBlock {
    constructor(CanvasContext) {
        super(CanvasContext);

        this.color = 'yellow';
        this.matrix = [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ];
    }
}


class revL_Block extends BaseBlock {
    constructor(CanvasContext) {
        super(CanvasContext);

        this.color = 'yellow';
        this.matrix = [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ];
    }
}

class S_Block extends BaseBlock {
    constructor(CanvasContext) {
        super(CanvasContext);

        this.color = 'yellow';
        this.matrix = [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ];
    }
}