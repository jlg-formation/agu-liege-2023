import { EllipsisPipe } from './ellipsis.pipe';

describe('EllipsisPipe', () => {
  it('create an instance', () => {
    const pipe = new EllipsisPipe();
    let result = pipe.transform('truc');
    expect(result).toBe('truc');
    result = pipe.transform('truc', 3);
    expect(result).toBe('tru...');
    result = pipe.transform('01234567890');
    expect(result).toBe('0123456789...');
    let mustGoHere = false;
    try {
      pipe.transform(12);
    } catch (err) {
      mustGoHere = true;
    }
    expect(mustGoHere).toBe(true);
    expect(pipe).toBeTruthy();
  });
});
