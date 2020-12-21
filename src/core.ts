import { IStorage, IStorageOptions,IStorageDriverType, ISetOptions } from './type';

import { isInvalidKey, encodeKey, decodeKey } from './utils';

import { LocalStorage } from './drivers/localStorage';
import { SessionStorage } from './drivers/sessionStorage';
import { IndexDBStorage } from './drivers/indexeddb';

const DEFAULT_OPTIONS = {
  prefix: '@@',
};

export function create(options?: IStorageOptions) {
  const driver = options?.driver || 'localStorage';

  switch (driver) {
    case 'localStorage':
      return new LocalStorage(options);
    case 'sessionStorage':
      return new SessionStorage(options);
    case 'indexeddb':
      return new IndexDBStorage(options);
    default:
      throw new Error(`Unknown storage driver: ${driver}`);
  }
}

export class Storage implements IStorage {
  public static _singletonInstance: IStorage;
  public static _defaultDiriver: IStorageDriverType = 'localStorage';

  private _instance: IStorage;

  public static create(options: IStorageOptions = DEFAULT_OPTIONS) {
    return create(options);
  }

  constructor(private readonly options?: IStorageOptions) {
    
  }

  private get instance() {
    if (!this._instance) {
      const driver = this.options?.driver || Storage._defaultDiriver;

      this._instance = Storage.create({
        ...this.options,
        driver,
      });
    }

    return this._instance;
  }

  public async get<T = any>(key: string): Promise<T | null> {
    const item = await this.instance.get<T>(key) as any;

    if (item?.expiredAt) {
      // data expired
      if (Date.now() > item.expiredAt) {
        await this.remove(key);
        return null;
      }

      return item.value;
    }

    return item;
  }

  public async set<T = any>(key: string, value: T, options?: ISetOptions) {
    const maxAge = options?.maxAge;
    let item: any;
    
    if (maxAge === undefined) {
      item = value;
    } else {
      item = {
        expiredAt: Date.now() + maxAge,
        value,
      };
    }

    return this.instance.set(key, item);
  }

  public async remove(key: string) {
    return this.instance.remove(key);
  }

  public async keys() {
    return this.instance.keys();
  }

  public async getAll<T = any>() {
    return this.instance.getAll<T>();
  }

  public async clear() {
    return this.instance.clear();
  }

  public async has(key: string) {
    return this.instance.has(key);
  }

  // static, use like a object
  private static get instance() {
    if (!Storage._singletonInstance) {
      Storage._singletonInstance = this.create({
        driver: Storage._defaultDiriver,
      });
    }

    return Storage._singletonInstance;
  }

  public static async get<T = any>(key: string): Promise<T | null> {
    const item = await this.instance.get<T>(key) as any;

    if (item?.expiredAt) {
      // data expired
      if (Date.now() > item.expiredAt) {
        await this.remove(key);
        return null;
      }

      return item.value;
    }

    return item;
  }

  public static async set<T = any>(key: string, value: T, options?: ISetOptions) {
    const maxAge = options?.maxAge;
    let item: any;
    
    if (maxAge === undefined) {
      item = value;
    } else {
      item = {
        expiredAt: Date.now() + maxAge,
        value,
      };
    }

    return this.instance.set(key, item);
  }

  public static async remove(key: string) {
    return this.instance.remove(key);
  }

  public static async keys() {
    return this.instance.keys();
  }

  public static async getAll<T = any>() {
    return this.instance.getAll<T>();
  }

  public static async clear() {
    return this.instance.clear();
  }

  public static async has(key: string) {
    return this.instance.has(key);
  }

  // utils
  public static isInvalidKey(encodedKey: string, prefix: string) {
    return isInvalidKey(encodedKey, prefix);
  }

  public static encodeKey(key: string, prefix: string) {
    return encodeKey(key, prefix);
  }

  public static decodeKey(encodedKey: string, prefix: string) {
    return decodeKey(encodedKey, prefix);
  }
}
