import { IStorage, IStorageOptions,IStorageDriverType } from './type';

import { isInvalidKey, encodeKey, decodeKey } from './utils';

import { LocalStorage } from './drivers/LocalStorage';
import { SessionStorage } from './drivers/SessionStorage';
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

  public get<T = any>(key: string) {
    return this.instance.get<T>(key);
  }

  public set<T = any>(key: string, value: T) {
    return this.instance.set(key, value);
  }

  public remove(key: string) {
    return this.instance.remove(key);
  }

  public keys() {
    return this.instance.keys();
  }

  public getAll<T = any>() {
    return this.instance.getAll<T>();
  }

  public clear() {
    return this.instance.clear();
  }

  public has(key: string) {
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

  public static get<T = any>(key: string) {
    return this.instance.get<T>(key);
  }

  public static set<T = any>(key: string, value: T) {
    return this.instance.set(key, value);
  }

  public static remove(key: string) {
    return this.instance.remove(key);
  }

  public static keys() {
    return this.instance.keys();
  }

  public static getAll<T = any>() {
    return this.instance.getAll<T>();
  }

  public static clear() {
    return this.instance.clear();
  }

  public static has(key: string) {
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
