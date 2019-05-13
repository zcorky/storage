
import storage from '../src';

describe('storage', () => {
  describe('storage.set', () => {
    it('string', () => {
      storage.set('key', 'value');

      expect(JSON.parse(localStorage.getItem((storage as any).encodeKey('key')) as string)).toEqual({
        value: 'value',
      });
    });

    it('number', () => {
      storage.set('key', 0);

      expect(JSON.parse(localStorage.getItem((storage as any).encodeKey('key')) as string)).toEqual({
        value: 0,
      });
    });

    it('boolean', () => {
      storage.set('key', false);

      expect(JSON.parse(localStorage.getItem((storage as any).encodeKey('key')) as string)).toEqual({
        value: false,
      });
    });

    it('array', () => {
      storage.set('key', [1, '2', false, { x: '2' }]);

      expect(JSON.parse(localStorage.getItem((storage as any).encodeKey('key')) as string)).toEqual({
        value: [1, '2', false, { x: '2' }],
      });
    });

    it('object', () => {
      storage.set('key', { x: 'y' });

      expect(JSON.parse(localStorage.getItem((storage as any).encodeKey('key')) as string)).toEqual({
        value: { x: 'y' },
      });
    });

    it('null', () => {
      storage.set('key', null);

      expect(JSON.parse(localStorage.getItem((storage as any).encodeKey('key')) as string)).toEqual({
        value: null,
      });
    });
  });

  describe('storage.get', () => {
    it('string', () => {
      storage.set('key', 'value');

      expect(storage.get('key')).toEqual('value');
    });

    it('number', () => {
      storage.set('key', 0);

      expect(storage.get('key')).toEqual(0);
    });

    it('boolean', () => {
      storage.set('key', false);

      expect(storage.get('key')).toEqual(false);
    });

    it('array', () => {
      storage.set('key', [1, '2', false, { x: '2' }]);

      expect(storage.get('key')).toEqual([1, '2', false, { x: '2' }]);
    });

    it('object', () => {
      storage.set('key', { x: 'y' });

      expect(storage.get('key')).toEqual({ x: 'y' });
    });

    it('null', () => {
      storage.set('key', null);

      expect(storage.get('key')).toEqual(null);
    });

    it('exception catch', () => {
      (global as any).localStorage.setItem('@@exception', 'xxxx');

      expect(() => storage.get('exception')).not.toThrow();
      expect(storage.get('exception')).toBe(null);
      (global as any).localStorage.removeItem('@@exception');
    });

    it('invalid key', () => {
      (global as any).localStorage.setItem('invalidKey', 'xxxx');
    });
  });

  describe('storage.remove', () => {
    it('string', () => {
      storage.set('key', 'value');
      expect(storage.get('key')).toEqual('value');
      storage.remove('key');
      expect(storage.get('key')).toEqual(null);
    });

    it('number', () => {
      storage.set('key', 0);
      expect(storage.get('key')).toEqual(0);
      storage.remove('key');
      expect(storage.get('key')).toEqual(null);
    });

    it('boolean', () => {
      storage.set('key', false);
      expect(storage.get('key')).toEqual(false);
      storage.remove('key');
      expect(storage.get('key')).toEqual(null);
    });

    it('array', () => {
      storage.set('key', [1, '2', false, { x: '2' }]);
      expect(storage.get('key')).toEqual([1, '2', false, { x: '2' }]);
      storage.remove('key');
      expect(storage.get('key')).toEqual(null);
    });

    it('object', () => {
      storage.set('key', { x: 'y' });
      expect(storage.get('key')).toEqual({ x: 'y' });
      storage.remove('key');
      expect(storage.get('key')).toEqual(null);
    });

    it('null', () => {
      storage.set('key', null);
      expect(storage.get('key')).toEqual(null);
      storage.remove('key');
      expect(storage.get('key')).toEqual(null);
    });
  });

  describe('storage.keys', () => {
    it('works', () => {
      storage.set('string', 'value');
      storage.set('number', 0);
      storage.set('boolean', false);
      storage.set('array', ['1', 2, true, { x: 1 }]);
      storage.set('object', { x: 'y' });
      storage.set('null', null);

      expect(storage.keys()).toEqual(['string', 'number', 'boolean', 'array', 'object', 'null']);
    });
  });

  describe('storage.getAll', () => {
    it('works', () => {
      storage.set('string', 'value');
      storage.set('number', 0);
      storage.set('boolean', false);
      storage.set('array', ['1', 2, true, { x: 1 }]);
      storage.set('object', { x: 'y' });
      storage.set('null', null);

      expect(storage.getAll()).toEqual({
        'string': 'value',
        'number': 0,
        'boolean': false,
        'array': ['1', 2, true, { x: 1 }],
        'object': { x: 'y' },
        'null': null,
      });
    });
  });

  describe('storage.clear', () => {
    it('works', () => {
      storage.set('string', 'value');
      storage.set('number', 0);
      storage.set('boolean', false);
      storage.set('array', ['1', 2, true, { x: 1 }]);
      storage.set('object', { x: 'y' });
      storage.set('null', null);

      expect(storage.getAll()).toEqual({
        'string': 'value',
        'number': 0,
        'boolean': false,
        'array': ['1', 2, true, { x: 1 }],
        'object': { x: 'y' },
        'null': null,
      });

      storage.clear();
      expect(storage.getAll()).toEqual({});
    });
  });

  describe('storage.has', () => {
    it('works', () => {
      storage.set('string', 'value');
      storage.set('number', 0);
      storage.set('boolean', false);
      storage.set('array', ['1', 2, true, { x: 1 }]);
      storage.set('object', { x: 'y' });
      storage.set('null', null);

      expect(storage.has('string')).toBeTruthy();
      expect(storage.has('number')).toBeTruthy();
      expect(storage.has('boolean')).toBeTruthy();
      expect(storage.has('array')).toBeTruthy();
      expect(storage.has('object')).toBeTruthy();
      expect(storage.has('null')).toBeTruthy();

      storage.clear();
      expect(storage.has('string')).toBeFalsy();
      expect(storage.has('number')).toBeFalsy();
      expect(storage.has('boolean')).toBeFalsy();
      expect(storage.has('array')).toBeFalsy();
      expect(storage.has('object')).toBeFalsy();
      expect(storage.has('null')).toBeFalsy();
    });
  });
});
