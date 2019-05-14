import { delay } from '@zcorky/delay';
import storage from '../src';

describe('expiration', () => {
  // it('1ms', async () => {
  //   storage.set('expiration', 'value', 1);
  //   expect(storage.get('expiration')).toEqual('value');

  //   await delay(1);
  //   expect(storage.has('expiration')).toBeTruthy()
  //   expect(storage.get('expiration')).toEqual(null);
  //   expect(storage.has('expiration')).toBeFalsy();
  // });

  it('10ms', async () => {
    storage.set('expiration', 'value', 10);
    expect(storage.get('expiration')).toEqual('value');

    await delay(11);
    expect(storage.has('expiration')).toBeTruthy()
    expect(storage.get('expiration')).toEqual(null);
    expect(storage.has('expiration')).toBeFalsy();
  });

  it('100ms', async () => {
    storage.set('expiration', 'value', 100);
    expect(storage.get('expiration')).toEqual('value');

    await delay(101);
    expect(storage.has('expiration')).toBeTruthy()
    expect(storage.get('expiration')).toEqual(null);
    expect(storage.has('expiration')).toBeFalsy();
  });
});
