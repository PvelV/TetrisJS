class Game{
    constructor(){
        this.board=new Array();
        for (var i = 0; i < 20; i++) {
            this.board[i] = new Array(10).fill(0);
        }
    }
    SetBoard(x, y, val) {
        console.log('setBoard 1: '+this.board.toString());
        this.board[x][y] = val;
        console.log('setting '+x+'  '+y+ '  to  '+val);
        console.log('setBoard 2: '+this.board.toString());
    }
}