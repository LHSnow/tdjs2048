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
}
