import { IStorage } from './type';
import { create } from './core';
export * from './type';

export const storage = {
  create,
} as IStorage & { _self: any, create: typeof create };

function ensure() {
  if (!storage._self) {
    storage._self = create();
  }
}

Object.defineProperties(storage, {
  get: {
    get() {
      ensure();
  
      return (...args: any[]) => storage._self.get(...args);
    }
  },
  set: {
    get() {
      ensure();
  
      return (...args: any[]) => storage._self.set(...args);
    }
  },
  remove: {
    get() {
      ensure();
  
      return (...args: any[]) => storage._self.remove(...args);
    }
  },
  keys: {
    get() {
      ensure();
  
      return (...args: any[]) => storage._self.keys(...args);
    }
  },
  getAll: {
    get() {
      ensure();
  
      return (...args: any[]) => storage._self.getAll(...args);
    }
  },
  clear: {
    get() {
      ensure();
  
      return (...args: any[]) => storage._self.clear(...args);
    }
  },
  has: {
    get() {
      ensure();
  
      return (...args: any[]) => storage._self.has(...args);
    }
  },
  encodeKey: {
    get() {
      ensure();
  
      return (...args: any[]) => storage._self.encodeKey(...args);
    }
  },
  decodeKey: {
    get() {
      ensure();
  
      return (...args: any[]) => storage._self.decodeKey(...args);
    }
  },
});

export default storage;