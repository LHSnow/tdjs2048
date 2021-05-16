describe('2048', () => {
  let game, board;

  beforeEach(() => {
    board = new Board();
    game = new Game(board);
    game.init();
  });

  describe('In a new game', () => {
    it('scoring is 0', () => {
      expect(game.score).toEqual(0);
    });

    it('the board contains 2 random tiles', () => {
      expect(board.emptyCells().length).toBe(14);
    });
  });

  describe('Scoring', () => {
    beforeEach(() => {
      board.state = [
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
    });

    it('increments score with collisions', () => {
      game.move('left');
      expect(game.score).toBe(4);
    });
  });

  describe('Placing of new tiles', () => {
    it('happens randomly after each possible move', () => {
      board.state = [
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      game.move('down');
      expect(board.emptyCells().length).toBe(13);
    });

    it('does not happen after an impossible move', () => {
      board.state = [
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      game.move('up');
      expect(board.emptyCells().length).toBe(14);
    });
  });
});
