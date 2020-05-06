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
});
