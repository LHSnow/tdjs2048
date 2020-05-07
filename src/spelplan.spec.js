describe('Spelplan', () => {
  let spelplan;

  beforeEach(() => {
    spelplan = new Spelplan();
  });

  it('kan skapas', () => {
    expect(spelplan).toBeDefined();
  });

  it('har 4x4 rutor', () => {
    expect(spelplan.höjd()).toBe(4);
    expect(spelplan.bredd()).toBe(4);
  });

  it('är tom', () => {
    expect(spelplan.plan).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });

  it('kan placera spelbricka', () => {
    spelplan.placera({ rad: 0, kolumn: 2 }, 4);

    expect(spelplan.plan).toEqual([
      [0, 0, 4, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });

  function outOfBounds(plats, värde) {
    it(`Ex: ${plats.rad},${plats.kolumn} = ${värde}`, () => {
      expect(spelplan.plan).toEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]);
      expect(() => spelplan.placera(plats, värde)).toThrowError('OutOfBounds');
    });
  }

  describe('placera utanför spelplan kastar exception', () => {
    outOfBounds({ rad: 5, kolumn: 0 }, 4);
    outOfBounds({ rad: 0, kolumn: 5 }, 4);
    outOfBounds({ rad: 0, kolumn: 4 }, 4);
    outOfBounds({ rad: 0, kolumn: -1 }, 4);
    outOfBounds({ rad: 0, kolumn: -5 }, 4);
    outOfBounds({ rad: -1, kolumn: 0 }, 4);
  });

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

    it('alla rader kontrolleras för kollision samtidigt', () => {
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

  describe('Drag', () => {
    it('ett drag utan kollisioner ger inga poäng', () => {
      expect(spelplan.utförDrag()).toEqual(0);
    });
  });

  describe('Poängberäkning', () => {
    it('Jämför spelplan före och efter', () => {
      spelplan.plan = [
        [0, 0, 0, 0],
        [2, 0, 0, 0],
        [4, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      const före = [
        [0, 0, 0, 0],
        [2, 0, 0, 0],
        [2, 2, 0, 0],
        [0, 0, 0, 0],
      ];

      expect(spelplan.beräknaPoäng(före)).toEqual(4);
    });

    it('Jämför poäng rad för 4400 -> 8000', () => {
      expect(spelplan.beräknaRadPoäng([4, 4, 0, 0], [8, 0, 0, 0])).toBe(8);
    });

    it('Jämför poäng rad för 0000 -> 0000', () => {
      expect(spelplan.beräknaRadPoäng([0, 0, 0, 0], [0, 0, 0, 0])).toBe(0);
    });

    it('Jämför poäng rad för 4200 -> 4200', () => {
      expect(spelplan.beräknaRadPoäng([4, 2, 0, 0], [4, 2, 0, 0])).toBe(0);
    });

    it('Jämför poäng rad för rad', () => {
      expect(spelplan.beräknaRadPoäng([2, 2, 2, 2], [4, 4, 0, 0])).toBe(8);
    });
  });
});
