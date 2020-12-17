
import storage from '../src';

describe('storage', () => {
  describe('storage.set', () => {
    it('string', async () => {
      await storage.set('key', 'value');
      // console.log('sss:', storage.encodeKey('key', '@@'));
      expect(JSON.parse(localStorage.getItem(storage.encodeKey('key', '@@')) as string)).toEqual('value');
    });

    it('number', async () => {
      await storage.set('key', 0);

      expect(JSON.parse(localStorage.getItem(storage.encodeKey('key', '@@')) as string)).toEqual(0);
    });

    it('boolean', async () => {
      await storage.set('key', false);

      expect(JSON.parse(localStorage.getItem(storage.encodeKey('key', '@@')) as string)).toEqual(false);
    });

    it('array', async () => {
      await storage.set('key', [1, '2', false, { x: '2' }]);

      expect(JSON.parse(localStorage.getItem(storage.encodeKey('key', '@@')) as string)).toEqual([1, '2', false, { x: '2' }]);
    });

    it('object', async () => {
      await storage.set('key', { x: 'y' });

      expect(JSON.parse(localStorage.getItem(storage.encodeKey('key', '@@')) as string)).toEqual({ x: 'y' });
    });

    it('null', async () => {
      await storage.set('key', null);
      expect(JSON.parse(localStorage.getItem(storage.encodeKey('key', '@@')) as string)).toEqual(null);
    });
  });

  describe('storage.get', () => {
    it('string', async () => {
      await storage.set('key', 'value');

      expect(await storage.get('key')).toEqual('value');
    });

    it('number', async () => {
      await storage.set('key', 0);

      expect(await storage.get('key')).toEqual(0);
    });

    it('boolean', async () => {
      await storage.set('key', false);

      expect(await storage.get('key')).toEqual(false);
    });

    it('array', async () => {
      await storage.set('key', [1, '2', false, { x: '2' }]);

      expect(await storage.get('key')).toEqual([1, '2', false, { x: '2' }]);
    });

    it('object', async () => {
      await storage.set('key', { x: 'y' });

      expect(await storage.get('key')).toEqual({ x: 'y' });
    });

    it('null', async () => {
      await storage.set('key', null);

      expect(await storage.get('key')).toEqual(null);
    });

    it('exception catch', async () => {
      (global as any).localStorage.setItem('@@exception', 'xxxx');

      try {
        // expect(await storage.get('exception')).not.toThrow();
        expect(await storage.get('exception')).toBe(null);
      } finally {
        (global as any).localStorage.removeItem('@@exception');
      }
    });

    it('invalid key', async () => {
      (global as any).localStorage.setItem('invalidKey', 'xxxx');
    });
  });

  describe('storage.remove', () => {
    it('string', async () => {
      await storage.set('key', 'value');
      expect(await storage.get('key')).toEqual('value');
      await storage.remove('key');
      expect(await storage.get('key')).toEqual(null);
    });

    it('number', async () => {
      await storage.set('key', 0);
      expect(await storage.get('key')).toEqual(0);
      await storage.remove('key');
      expect(await storage.get('key')).toEqual(null);
    });

    it('boolean', async () => {
      await storage.set('key', false);
      expect(await storage.get('key')).toEqual(false);
      await storage.remove('key');
      expect(await storage.get('key')).toEqual(null);
    });

    it('array', async () => {
      await storage.set('key', [1, '2', false, { x: '2' }]);
      expect(await storage.get('key')).toEqual([1, '2', false, { x: '2' }]);
      await storage.remove('key');
      expect(await storage.get('key')).toEqual(null);
    });

    it('object', async () => {
      await storage.set('key', { x: 'y' });
      expect(await storage.get('key')).toEqual({ x: 'y' });
      await storage.remove('key');
      expect(await storage.get('key')).toEqual(null);
    });

    it('null', async () => {
      await storage.set('key', null);
      expect(await storage.get('key')).toEqual(null);
      await storage.remove('key');
      expect(await storage.get('key')).toEqual(null);
    });
  });

  describe('storage.keys', () => {
    it('works', async () => {
      await storage.set('string', 'value');
      await storage.set('number', 0);
      await storage.set('boolean', false);
      await storage.set('array', ['1', 2, true, { x: 1 }]);
      await storage.set('object', { x: 'y' });
      await storage.set('null', null);

      expect(await storage.keys()).toEqual(['string', 'number', 'boolean', 'array', 'object', 'null']);
    });
  });

  describe('storage.getAll', () => {
    it('works', async () => {
      await storage.set('string', 'value');
      await storage.set('number', 0);
      await storage.set('boolean', false);
      await storage.set('array', ['1', 2, true, { x: 1 }]);
      await storage.set('object', { x: 'y' });
      await storage.set('null', null);

      expect(await storage.getAll()).toEqual({
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
    it('works', async () => {
      await storage.set('string', 'value');
      await storage.set('number', 0);
      await storage.set('boolean', false);
      await storage.set('array', ['1', 2, true, { x: 1 }]);
      await storage.set('object', { x: 'y' });
      await storage.set('null', null);

      expect(await storage.getAll()).toEqual({
        'string': 'value',
        'number': 0,
        'boolean': false,
        'array': ['1', 2, true, { x: 1 }],
        'object': { x: 'y' },
        'null': null,
      });

      await storage.clear();
      expect(await storage.getAll()).toEqual({});
    });
  });

  describe('storage.has', () => {
    it('works', async () => {
      await storage.set('string', 'value');
      await storage.set('number', 0);
      await storage.set('boolean', false);
      await storage.set('array', ['1', 2, true, { x: 1 }]);
      await storage.set('object', { x: 'y' });
      await storage.set('null', null);

      expect(await storage.has('string')).toBeTruthy();
      expect(await storage.has('number')).toBeTruthy();
      expect(await storage.has('boolean')).toBeTruthy();
      expect(await storage.has('array')).toBeTruthy();
      expect(await storage.has('object')).toBeTruthy();
      expect(await storage.has('null')).toBeTruthy();

      await storage.clear();
      expect(await storage.has('string')).toBeFalsy();
      expect(await storage.has('number')).toBeFalsy();
      expect(await storage.has('boolean')).toBeFalsy();
      expect(await storage.has('array')).toBeFalsy();
      expect(await storage.has('object')).toBeFalsy();
      expect(await storage.has('null')).toBeFalsy();
    });
  });
});
