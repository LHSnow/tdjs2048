describe('The 2048 board', () => {
  let board;

  beforeEach(() => {
    board = new Board();
  });

  it('can be initialized', () => {
    expect(board).toBeDefined();
  });

  it('has 4x4 cells', () => {
    expect(board.height()).toBe(4);
    expect(board.width()).toBe(4);
  });

  it('is empty', () => {
    expect(board.state).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });

  it('places a tile in an empty cell', () => {
    board.placeTileAt({ row: 0, column: 2 }, 4);

    expect(board.state).toEqual([
      [0, 0, 4, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });

  function exOutOfBounds(position, value) {
    it(`Ex: ${position.row},${position.column} = ${value}`, () => {
      expect(board.state).toEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]);
      expect(() => board.placeTileAt(position, value)).toThrowError('OutOfBounds');
    });
  }

  describe('placing tiles outside the board throws exception', () => {
    exOutOfBounds({ row: 5, column: 0 }, 4);
    exOutOfBounds({ row: 0, column: 5 }, 4);
    exOutOfBounds({ row: 0, column: 4 }, 4);
    exOutOfBounds({ row: 0, column: -1 }, 4);
    exOutOfBounds({ row: 0, column: -5 }, 4);
    exOutOfBounds({ row: -1, column: 0 }, 4);
  });

  it('A move to the left moves all tiles as far as possible to the left', () => {
    const board = new Board();
    board.state = [
      [0, 4, 0, 2],
      [4, 0, 2, 0],
      [0, 2, 0, 4],
      [2, 0, 4, 0],
    ];

    board.moveLeft();

    expect(board.state).toEqual([
      [4, 2, 0, 0],
      [4, 2, 0, 0],
      [2, 4, 0, 0],
      [2, 4, 0, 0],
    ]);
  });

  describe('If two tiles of the same value collide they combine into one with the sum of them both', () => {
    const board = new Board();

    it('all rows are checked for collisions at the same time', () => {
      board.state = [
        [2, 2, 0, 0],
        [16, 16, 0, 0],
        [8, 8, 0, 0],
        [4, 4, 0, 0],
      ];
      board.collideLeft();

      expect(board.state).toEqual([
        [4, 0, 0, 0],
        [32, 0, 0, 0],
        [16, 0, 0, 0],
        [8, 0, 0, 0],
      ]);
    });

    function exCollision(before, after) {
      it(`Ex: ${before} move left => ${after}`, () => {
        board.state[0] = before;
        board.collideLeft();
        expect(board.state[0]).toEqual(after);
      });
    }

    exCollision([4, 2, 0, 0], [4, 2, 0, 0]);
    exCollision([2, 2, 0, 0], [4, 0, 0, 0]);
    exCollision([2, 2, 2, 0], [4, 2, 0, 0]);
    exCollision([8, 8, 8, 8], [16, 16, 0, 0]);
    exCollision([4, 4, 2, 2], [8, 4, 0, 0]);
  });

  it('Moves without collisions have no score', () => {
    expect(board.move()).toEqual(0);
  });

  describe('Scoring', () => {
    it('Compares the total board state before and after', () => {
      board.state = [
        [0, 0, 0, 0],
        [2, 0, 0, 0],
        [4, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      const before = [
        [0, 0, 0, 0],
        [2, 0, 0, 0],
        [2, 2, 0, 0],
        [0, 0, 0, 0],
      ];

      expect(board.score(before)).toEqual(4);
    });

    it('Calculates score for row 4400 -> 8000 to 8', () => {
      expect(board.scoreRow([4, 4, 0, 0], [8, 0, 0, 0])).toBe(8);
    });

    it('Calculates score for row 0000 -> 0000 to 0', () => {
      expect(board.scoreRow([0, 0, 0, 0], [0, 0, 0, 0])).toBe(0);
    });

    it('Calculates score for row 4200 -> 4200 to 0', () => {
      expect(board.scoreRow([4, 2, 0, 0], [4, 2, 0, 0])).toBe(0);
    });

    it('Calculates score for row 2222 -> 4400 to 8', () => {
      expect(board.scoreRow([2, 2, 2, 2], [4, 4, 0, 0])).toBe(8);
    });
  });

  it('Rotation of 90 degrees clockwise', () => {
    board.state = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];

    board.rotateClockwise(1);

    expect(board.state).toEqual([
      [13, 9, 5, 1],
      [14, 10, 6, 2],
      [15, 11, 7, 3],
      [16, 12, 8, 4],
    ]);
  });

  describe('Example moves', () => {
    beforeEach(() => {
      board.state = [
        [2, 0, 0, 2],
        [4, 16, 8, 2],
        [2, 64, 32, 4],
        [1024, 1024, 64, 0],
      ];
    });

    it('left', () => {
      board.move('left');
      expect(board.state).toEqual([
        [4, 0, 0, 0],
        [4, 16, 8, 2],
        [2, 64, 32, 4],
        [2048, 64, 0, 0],
      ]);
    });

    it('right', () => {
      board.move('right');
      expect(board.state).toEqual([
        [0, 0, 0, 4],
        [4, 16, 8, 2],
        [2, 64, 32, 4],
        [0, 0, 2048, 64],
      ]);
    });

    it('up', () => {
      board.move('up');
      expect(board.state).toEqual([
        [2, 16, 8, 4],
        [4, 64, 32, 4],
        [2, 1024, 64, 0],
        [1024, 0, 0, 0],
      ]);
    });

    it('down', () => {
      board.move('down');
      expect(board.state).toEqual([
        [2, 0, 0, 0],
        [4, 16, 8, 0],
        [2, 64, 32, 4],
        [1024, 1024, 64, 4],
      ]);
    });

    describe('At most two combination of tiles is possible for each move', () => {
      beforeEach(() => {
        board.state = [
          [2, 2, 4, 8],
          [4, 0, 4, 4],
          [16, 16, 16, 16],
          [32, 16, 16, 32],
        ];
      });

      it('moving left', () => {
        board.move('left');
        expect(board.state).toEqual([
          [4, 4, 8, 0],
          [8, 4, 0, 0],
          [32, 32, 0, 0],
          [32, 32, 32, 0],
        ]);
      });

      it('moving right', () => {
        board.move('right');
        expect(board.state).toEqual([
          [0, 4, 4, 8],
          [0, 0, 4, 8],
          [0, 0, 32, 32],
          [0, 32, 32, 32],
        ]);
      });
    });
  });
});
