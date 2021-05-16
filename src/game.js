function Game(board) {
  this.score = 0;
  this.board = board;

  this.randomizeTile = () => {
    const emptyCells = this.board.emptyCells();
    const randomEmptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    this.board.placeTileAt(randomEmptyCell, 2);
  };

  this.init = () => {
    this.randomizeTile();
    this.randomizeTile();
  };

  this.move = (direction) => {
    if (this.board.isMovePossibleIn(direction)) {
      this.score += this.board.move(direction);
      this.randomizeTile();
    }
  };
}
