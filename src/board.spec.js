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
});
