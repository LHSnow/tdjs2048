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

  it('kan visa lediga celler', () => {});

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

  it('skall roteras 90 grader', () => {
    spelplan.plan = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];

    spelplan.roteraMedsols(1);

    expect(spelplan.plan).toEqual([
      [13, 9, 5, 1],
      [14, 10, 6, 2],
      [15, 11, 7, 3],
      [16, 12, 8, 4],
    ]);
  });

  describe('Exempeldrag', () => {
    beforeEach(() => {
      spelplan.plan = [
        [2, 0, 0, 2],
        [4, 16, 8, 2],
        [2, 64, 32, 4],
        [1024, 1024, 64, 0],
      ];
    });

    it('vänster', () => {
      spelplan.utförDrag('vänster');
      expect(spelplan.plan).toEqual([
        [4, 0, 0, 0],
        [4, 16, 8, 2],
        [2, 64, 32, 4],
        [2048, 64, 0, 0],
      ]);
    });

    it('höger', () => {
      spelplan.utförDrag('höger');
      expect(spelplan.plan).toEqual([
        [0, 0, 0, 4],
        [4, 16, 8, 2],
        [2, 64, 32, 4],
        [0, 0, 2048, 64],
      ]);
    });

    it('upp', () => {
      spelplan.utförDrag('upp');
      expect(spelplan.plan).toEqual([
        [2, 16, 8, 4],
        [4, 64, 32, 4],
        [2, 1024, 64, 0],
        [1024, 0, 0, 0],
      ]);
    });

    it('ner', () => {
      spelplan.utförDrag('ner');
      expect(spelplan.plan).toEqual([
        [2, 0, 0, 0],
        [4, 16, 8, 0],
        [2, 64, 32, 4],
        [1024, 1024, 64, 4],
      ]);
    });

    describe('Högst två ihopslagningar på samma rad per drag', () => {
      beforeEach(() => {
        spelplan.plan = [
          [2, 2, 4, 8],
          [4, 0, 4, 4],
          [16, 16, 16, 16],
          [32, 16, 16, 32],
        ];
      });

      it('vid drag till vänster', () => {
        spelplan.utförDrag('vänster');
        expect(spelplan.plan).toEqual([
          [4, 4, 8, 0],
          [8, 4, 0, 0],
          [32, 32, 0, 0],
          [32, 32, 32, 0],
        ]);
      });

      it('vid drag till höger', () => {
        spelplan.utförDrag('höger');
        expect(spelplan.plan).toEqual([
          [0, 4, 4, 8],
          [0, 0, 4, 8],
          [0, 0, 32, 32],
          [0, 32, 32, 32],
        ]);
      });
    });
  });
});
