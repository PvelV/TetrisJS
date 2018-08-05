class Game{
    constructor(){
        this.board=new Array();
        for (var i = 0; i < 20; i++) {
            this.board[i] = new Array(10).fill(0);
        }
    }
    SetBoard(x, y, val) {
        this.board[x][y] = val;
    }

    
}