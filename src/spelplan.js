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

  this.ledigaCeller = () => {
    const lediga = [];
    this.plan.forEach((rad, i) => {
      rad.forEach((cell, j) => {
        if (cell === 0) {
          lediga.push({ rad: i, kolumn: j });
        }
      });
    });

    return lediga;
  };

  this.flyttaVänster = () => {
    this.plan = this.plan.map((rad) => this.flyttaRadVänster(rad));
  };

  this.flyttaRadVänster = (rad) => {
    const ingaNollor = rad.filter((cell) => cell > 0);
    return padRightWithZero(ingaNollor);
  };

  this.kollideraVänster = () => {
    this.plan = this.plan.map((rad) => this.kollideraRadVänster(rad));
  };

  const ANTAL_ROTATIONER = { vänster: 0, ner: 1, höger: 2, upp: 3 };

  this.utförDrag = (riktning) => {
    this.roteraMedsols(ANTAL_ROTATIONER[riktning]);

    this.flyttaVänster();
    const nuvarandePlan = [...this.plan];
    this.kollideraVänster();

    this.roteraMedsols((4 - ANTAL_ROTATIONER[riktning]) % 4);

    return this.beräknaPoäng(nuvarandePlan);
  };

  this.möjligtDrag = (riktning) => {
    const save = [...this.plan];
    this.utförDrag(riktning);
    if (!save.equals(this.plan)) {
      this.plan = save;
      return true;
    }
    return false;
  };

  this.roteraMedsols = (antalRotationer) => {
    for (i = 0; i < antalRotationer; i++) {
      this.plan = this.plan[0].map((val, index) =>
        this.plan.map((row) => row[index]).reverse()
      );
    }
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

const padRightWithZero = (rad, radLängd = 4) => [
  ...rad,
  ...new Array(radLängd - rad.length).fill(0),
];
