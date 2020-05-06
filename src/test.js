describe('tabell', () => {
  console.log('a');

  beforeAll(() => {
    console.log('before all 1');
  });

  beforeEach(() => {
    console.log('before each 1');
  });

  describe('kan sorteras', () => {
    console.log('A');
    beforeEach(() => {
      console.log('before each A');
    });

    beforeEach(() => {
      console.log('before each A2');
    });

    it('med avseende på förnamn', () => {
      console.log('1');
      expect(true).toBe(true);
    });
    it('med avseende på efternamn', () => {
      console.log('2');
      expect(true).toBe(true);
    });

    fit('stigande', () => {
      console.log('3');
      expect(true).toBe(true);
    });
  });

  describe('nästlad B', () => {
    console.log('B');

    beforeAll(() => {
      console.log('before all B');
    });

    it('tre', () => {
      console.log(3);
      expect(true).toBe(true);
    });
  });
});
