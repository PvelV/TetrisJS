class Pile {


    static CheckCollision(block, board) {

        return block.matrix.some((row, y) => {
            return row.some((e, x) => {

                if (e == 1) {
                    if ((x + block.xOffset) < 0 || (x + block.xOffset) > 9
                        || (y + block.yOffset) < 0 || (y + block.yOffset) > 19
                        || board[y + block.yOffset][x + block.xOffset] == 1) {
                        return true;
                    }
                    return false;
                }
            });
        })
    }


    static IsBlockOnGround(block, board) {

        block.Move(0, 1);
        let result = Pile.CheckCollision(block,board);
        block.Move(0, -1);

        return result;
    }





    static Draw(board, context) {
        board.forEach((row, y) => {
            row.forEach((e, x) => {

                if (e == 1) {
                    context.fillStyle = '#333';
                    context.fillRect(x, y, 1, 1);
                }
            })
        })

    }

    static AddBlockToPile(block, board) {

        block.matrix.forEach((row, y) => {
            row.forEach((e, x) => {
                if (e == 1) {
                    board[block.yOffset + y][block.xOffset + x] = 1;
                }

            })
        });
    }
}