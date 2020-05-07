function Spel(spelplan) {
  this.poäng = 0;
  this.spelplan = spelplan;

  this.slumpaBricka = () => {
    const ledigaCeller = this.spelplan.ledigaCeller();
    const plats = ledigaCeller[Math.floor(Math.random() * ledigaCeller.length)];
    this.spelplan.placera(plats, 2);
  };

  this.nytt = () => {
    this.slumpaBricka();
    this.slumpaBricka();
  };

  this.drag = (riktning) => {
    if (this.spelplan.möjligtDrag(riktning)) {
      this.poäng += this.spelplan.utförDrag(riktning);
      this.slumpaBricka();
    }
  };
}
