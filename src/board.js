function Spelplan() {
  this.plan = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  this.höjd = () => this.plan.length;
  this.bredd = () => this.plan[0].length;
  this.toString = () => {
    return this.plan
      .map((rad) => {
        return rad.map((cell) => (cell === 0 ? '-' : cell)).join('');
      })
      .join('\n');
  };
}
