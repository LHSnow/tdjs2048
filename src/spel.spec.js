describe('2048', () => {
  let spel, spelplan;

  beforeEach(() => {
    spelplan = new Spelplan();
    spel = new Spel(spelplan);
    spel.nytt();
  });

  describe('Nytt spel', () => {
    it('poäng är 0', () => {
      expect(spel.poäng).toEqual(0);
    });

    it('spelplan innehåller två slumpmässigt placerade brickor', () => {
      expect(spelplan.ledigaCeller().length).toBe(14);
    });
  });

  describe('Beräkna poäng', () => {
    beforeEach(() => {
      spelplan.plan = [
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
    });

    it('ökar poäng vid kollision', () => {
      spel.drag('vänster');
      expect(spel.poäng).toBe(4);
    });
  });

  describe('Placera bricka', () => {
    it('slumpmässigt efter varje drag', () => {
      spelplan.plan = [
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      spel.drag('ner');
      expect(spelplan.ledigaCeller().length).toBe(13);
    });

    it('görs inte vid ogiltigt drag', () => {
      spelplan.plan = [
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      spel.drag('upp');
      expect(spelplan.ledigaCeller().length).toBe(14);
    });
  });
});
