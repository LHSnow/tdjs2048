function Board() {
  this.state = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  this.height = () => this.state.length;
  this.width = () => this.state[0].length;

  this.placeTileAt = (position, value) => {
    if (
      position.column < 0 ||
      position.row < 0 ||
      position.column >= this.width() ||
      position.row >= this.height()
    ) {
      throw new Error('OutOfBounds');
    }
    this.state[position.row][position.column] = value;
  };

  this.emptyCells = () => {
    const empty = [];
    this.state.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 0) {
          empty.push({ row: i, column: j });
        }
      });
    });

    return empty;
  };

  this.moveLeft = () => {
    this.state = this.state.map((rad) => this.moveRowLeft(rad));
  };

  this.moveRowLeft = (row) => {
    const noZeroes = row.filter((cell) => cell > 0);
    return padRightWithZero(noZeroes);
  };

  this.collideLeft = () => {
    this.state = this.state.map((rad) => this.collideRowLeft(rad));
  };

  const ROTATIONS_FOR = { left: 0, down: 1, right: 2, up: 3 };

  this.move = (direction) => {
    this.rotateClockwise(ROTATIONS_FOR[direction]);

    this.moveLeft();
    const currentState = [...this.state];
    this.collideLeft();

    this.rotateClockwise((4 - ROTATIONS_FOR[direction]) % 4);

    return this.score(currentState);
  };

  this.isMovePossibleIn = (direction) => {
    const savedState = [...this.state];
    this.move(direction);
    if (boardStateEquals(savedState, this.state)) {
      return false;
    }
    this.state = savedState;
    return true;
  };

  this.rotateClockwise = (rotations) => {
    for (let i = 0; i < rotations; i++) {
      this.state = this.state[0].map((val, index) =>
        this.state.map((row) => row[index]).reverse()
      );
    }
  };

  this.score = (rowBefore) => {
    return this.state
      .map((rowAfter, i) => this.scoreRow(rowBefore[i], rowAfter))
      .reduce((acc, curr) => acc + curr);
  };

  this.scoreRow = (before, after) => {
    let score = 0;
    for (let i = 0; i < before.length; i++) {
      if (after[i] > before[i]) {
        score += after[i];
      }
    }
    return score;
  };

  this.collideRowLeft = (row) => {
    let j = 0;
    let result = [0, 0, 0, 0];
    for (let i = 0; i < row.length; i++) {
      let cellValue = row[i];
      if (cellValue === row[i + 1]) {
        result[j++] = cellValue * 2;
        i++;
      } else {
        result[j++] = cellValue;
      }
    }
    return result;
  };
}

const padRightWithZero = (row, rowLength = 4) => [
  ...row,
  ...new Array(rowLength - row.length).fill(0),
];

const boardStateEquals = (a, b) => {
  for(let i = 0; i < a.length; i++) {
    for(let j = 0; j < a[0].length; j++) {
      if(a[i][j] !== b[i][j]) {
        return false;
      }
    }
  }
  return true;
}

