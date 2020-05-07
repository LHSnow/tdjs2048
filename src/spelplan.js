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
    this.plan.map((rad) => rad.reverse());
    this.flyttaHöger();
    this.plan.map((rad) => rad.reverse());
  };

  this.flyttaRadHöger = (rad) => {
    const ingaNollor = rad.filter((cell) => cell > 0);
    return padLeftWithZero(ingaNollor);
  };

  this.kollideraVänster = () => {
    this.plan = this.plan.map((rad) => this.kollideraRadVänster(rad));
  };

  this.utförDrag = (riktning) => {
    this.flyttaVänster();
    const nuvarandePlan = [...this.plan];
    this.kollideraVänster();

    return this.beräknaPoäng(nuvarandePlan);
  };

  this.beräknaPoäng = (före) => {
    return this.plan
      .map((radEfter, i) => this.beräknaRadPoäng(före[i], radEfter))
      .reduce((acc, curr) => acc + curr);
  };

  this.beräknaRadPoäng = (före, efter) => {
    let poäng = 0;
    for (let i = 0; i < före.length; i++) {
      if (efter[i] > före[i]) {
        poäng += efter[i];
      }
    }
    return poäng;
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
