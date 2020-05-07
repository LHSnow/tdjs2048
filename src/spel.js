function Spel(spelplan) {
  this.poäng = 0;
  this.spelplan = spelplan;

  this.drag = (riktning) => {
    this.poäng += this.spelplan.utförDrag(riktning);
  };
}
