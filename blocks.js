class BaseBlock {
    constructor() {
        this.matrix = [[], []];
        this.color;
        this.dropping = false;

        this.xOffset = 3;
        this.yOffset = 0;
    }

    Move(x, y) {
        this.xOffset += x;
        this.yOffset += y;
        if (y != 0) {
        }
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



    Draw(context) {
        this.matrix.forEach((row, y) => {
            row.forEach((element, x) => {
                if (element !== 0) {
                    context.fillStyle = this.color;
                    context.fillRect(this.xOffset + x, this.yOffset + y, 1, 1);
                }
            })

        });
    }

    DrawNextBlock(context) {
        this.matrix.forEach((row, y) => {
            row.forEach((element, x) => {
                if (element !== 0) {
                    context.fillStyle = this.color;
                    context.fillRect(x, y, 1, 1);
                }
            })

        });
    }
}

class T_Block extends BaseBlock {
    constructor() {
        super();

        this.color = 'red';
        this.matrix = [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ]
    }
}

class Square_Block extends BaseBlock {
    constructor() {
        super();

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
    constructor() {
        super();

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
    constructor() {
        super();

        this.color = 'yellow';
        this.matrix = [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ];
    }
}


class revL_Block extends BaseBlock {
    constructor() {
        super();

        this.color = 'yellow';
        this.matrix = [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ];
    }
}

class S_Block extends BaseBlock {
    constructor() {
        super();

        this.color = '#d36c19';
        this.matrix = [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ];
    }
}