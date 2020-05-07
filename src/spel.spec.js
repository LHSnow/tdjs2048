describe('2048', () => {
  describe('Riktningshantering', () => {
    const spelplan = new Spelplan();
    beforeEach(() => {
      spelplan.plan = [
        [0, 4, 0, 2],
        [4, 0, 2, 0],
        [0, 2, 0, 4],
        [2, 0, 4, 0],
      ];
    });

    it('flytt höger flyttar brickor så långt till höger som möjligt', () => {
      spelplan.flyttaHöger();

      expect(spelplan.plan).toEqual([
        [0, 0, 4, 2],
        [0, 0, 4, 2],
        [0, 0, 2, 4],
        [0, 0, 2, 4],
      ]);
    });

    it('flytt vänster flyttar brickor så långt till vänster som möjligt', () => {
      spelplan.flyttaVänster();

      expect(spelplan.plan).toEqual([
        [4, 2, 0, 0],
        [4, 2, 0, 0],
        [2, 4, 0, 0],
        [2, 4, 0, 0],
      ]);
    });
  });

  describe('Om två brickor med samma valör kolliderar blir de en ny bricka med summan av de två', () => {
    const spelplan = new Spelplan();

    it('4200<- => 4200', () => {
      spelplan.plan[0] = [4, 2, 0, 0];
      spelplan.kollideraVänster();
      expect(spelplan.plan[0]).toEqual([4, 2, 0, 0]);
    });

    it('2200<- => 4000', () => {
      spelplan.plan[0] = [2, 2, 0, 0];
      spelplan.kollideraVänster();
      expect(spelplan.plan[0]).toEqual([4, 0, 0, 0]);
    });

    it('4422<- => 8400', () => {
      spelplan.plan[0] = [4, 4, 2, 2];
      spelplan.kollideraVänster();
      expect(spelplan.plan[0]).toEqual([8, 4, 0, 0]);
    });
  });
});
