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

    it('flytt vänster flyttar brickor så långt till vänster som möjligt', () => {
      spelplan.plan = [
        [2, 2, 0, 0],
        [16, 16, 0, 0],
        [8, 8, 0, 0],
        [4, 4, 0, 0],
      ];
      spelplan.kollideraVänster();

      expect(spelplan.plan).toEqual([
        [4, 0, 0, 0],
        [32, 0, 0, 0],
        [16, 0, 0, 0],
        [8, 0, 0, 0],
      ]);
    });

    function kollisionsExempel(före, efter) {
      it(`Ex: ${före} flytt vänster => ${efter}`, () => {
        spelplan.plan[0] = före;
        spelplan.kollideraVänster();
        expect(spelplan.plan[0]).toEqual(efter);
      });
    }

    kollisionsExempel([4, 2, 0, 0], [4, 2, 0, 0]);
    kollisionsExempel([2, 2, 0, 0], [4, 0, 0, 0]);
    kollisionsExempel([2, 2, 2, 0], [4, 2, 0, 0]);
    kollisionsExempel([8, 8, 8, 8], [16, 16, 0, 0]);
    kollisionsExempel([4, 4, 2, 2], [8, 4, 0, 0]);
  });
});
