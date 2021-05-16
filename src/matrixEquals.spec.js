describe('Matrix equals', () => {
  const a = [[1,2],[3,4]]
  const b = [[1,2],[3,4]]
  const c = [[1,2],[5,4]]

  it('is true if all positions in matrixes have the same value', () => {
    expect(boardStateEquals(a, b)).toBe(true);
  });

  it('is false if any position differs in value', () => {
    expect(boardStateEquals(a, c)).toBe(false);
  });
});
