describe('2048', () => {
  describe('Beräkna poäng', () => {
    let spel, spelplan;

    beforeEach(() => {
      spelplan = new Spelplan();
      spelplan.plan = [
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      spel = new Spel(spelplan);
    });

    it('startar på 0', () => {
      expect(spel.poäng).toEqual(0);
    });

    it('ökar poäng vid kollision', () => {
      spel.drag('vänster');
      expect(spel.poäng).toBe(4);
    });
  });
});
