function Spelplan() {
  this.plan = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  this.höjd = () => this.plan.length;
  this.bredd = () => this.plan[0].length;

  this.placera = (plats, värde) => {
    if (
      plats.kolumn < 0 ||
      plats.rad < 0 ||
      plats.kolumn >= this.bredd() ||
      plats.rad >= this.höjd()
    ) {
      throw new Error('OutOfBounds');
    }
    this.plan[plats.rad][plats.kolumn] = värde;
  };

  this.flyttaHöger = () => {
    this.plan = this.plan.map((rad) => this.flyttaRadHöger(rad));
  };

  this.flyttaVänster = () => {
    this.plan = [
      [4, 2, 0, 0],
      [4, 2, 0, 0],
      [2, 4, 0, 0],
      [2, 4, 0, 0],
    ];
  };

  this.flyttaRadHöger = (rad) => {
    const ingaNollor = rad.filter((cell) => cell > 0);
    return padLeftWithZero(ingaNollor);
  };

  this.kollideraVänster = () => {
    this.plan = this.plan.map((rad) => this.kollideraRadVänster(rad));
  };

  this.kollideraRadVänster = (rad) => {
    let j = 0;
    let resultat = [0, 0, 0, 0];
    for (let i = 0; i < rad.length; i++) {
      let cell = rad[i];
      if (cell === rad[i + 1]) {
        resultat[j++] = cell * 2;
        i++;
      } else {
        resultat[j++] = cell;
      }
    }
    return resultat;
  };
}

const padLeftWithZero = (rad, radLängd = 4) => [
  ...new Array(radLängd - rad.length).fill(0),
  ...rad,
];
