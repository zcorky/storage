import { IStorage, IStorageOptions, IStorageDriverType } from './type';
import { isInvalidKey, encodeKey, decodeKey } from './utils';

import { StorageDriver } from './driver';
import { LocalStorage } from './drivers/localStorage';
import { SessionStorage } from './drivers/sessionStorage';
import { IndexDBStorage } from './drivers/indexeddb';

import * as constants from './constants';

const supportDrivers: Record<string, typeof StorageDriver> = {
  'localStorage': LocalStorage,
  'sessionStorage': SessionStorage,
  'indexeddb': IndexDBStorage,
};

export function registerDriver(type: string, driver: typeof StorageDriver) {
  if (supportDrivers[type]) {
    supportDrivers[type] = driver;
  }
}

export function create(options?: IStorageOptions) {
  const driver = options?.driver || 'localStorage';
  const DriverClass = supportDrivers[driver];
  if (!DriverClass) {
    throw new Error(`Unsupported driver: ${driver}, current availables: ${Object.keys(supportDrivers).join(', ')}`);
  }

  // @TODO
  return new (DriverClass as any)(options);
}

// Storage is an enhanced storage, support multiple drivers.
export class Storage implements IStorage {
  private _instances: Record<IStorageDriverType, IStorage> = {} as any;
  private _diriver = this.options?.driver || constants.DEFAULT_DRIVER;
  private _prefix = this.options?.prefix || constants.DEFAULT_PREFIX;

  constructor(private options?: IStorageOptions) {}

  private get instance() {
    const driver = this.driver;

    if (!this._instances[driver]) {
      this._instances[driver] = create({
        ...this.options,
        driver,
      });
    }

    return this._instances[driver];
  }

  // create creates a new Storage instance
  public create(options: IStorageOptions = constants.DEFAULT_OPTIONS) {
    return new Storage(options);
  }

  // config configs the options of the storage
  public config(options: IStorageOptions) {
    this.options = options;
  }

  // driver is the storage driver name
  public get driver() {
    return this._diriver;
  }

  // setDriver sets the storage driver name
  public setDriver(driver: IStorageDriverType) {
    this._diriver = driver;
  }

  // prefix is the prefix of the key
  public get prefix() {
    return this._prefix;
  }

  // setPrefix sets the prefix of the key
  public setPrefix(prefix: string) {
    this._prefix = prefix;
  }

  // register registers the given driver
  public register(type: string, driver: typeof StorageDriver) {
    registerDriver(type, driver);
  }

  // get returns the value of the given key
  public async get<T = any>(key: string): Promise<T | null> {
    const item = await this.instance.get<T>(key) as any;
    if (!item) {
      return null;
    }

    // invalid item
    if (!('expiredAt' in item) || !('value' in item)) {
      return null;
    }

    // never expired
    if (item.expiredAt === -1) {
      return item.value;
    }

    // data expired
    if (Date.now() > item.expiredAt) {
      await this.remove(key);
      return null;
    }

    return item.value;
  }

  // set sets the value of the given key
  public async set<T = any>(key: string, value: T, maxAge?: number) {
    const item = {
      expiredAt: maxAge === undefined ? -1 : Date.now() + maxAge,
      value,
    };

    return this.instance.set(key, item, maxAge);
  }

  // remove removes the value of the given key
  public async remove(key: string) {
    return this.instance.remove(key);
  }

  // keys returns the keys of the storage
  public async keys() {
    return this.instance.keys();
  }

  // getAll returns the all items of the storage
  public async getAll<T = any>() {
    const keys = await this.keys();
    const items = await Promise.all(keys.map((key) => {
      return this.get<T>(key);
    })) as any as T[];

    return keys.reduce((result, key, index) => {
      result[key] = items[index];
      return result;
    }, {} as Record<string, T>);
  }

  // clear clears the storage
  public async clear() {
    return this.instance.clear();
  }

  // has checks whether the given key exists
  public async has(key: string) {
    return this.instance.has(key);
  }

  // isInvalidKey checks whether the given key is invalid
  public isInvalidKey(encodedKey: string, prefix: string) {
    return isInvalidKey(encodedKey, prefix);
  }

  // encodeKey encodes the given key
  public encodeKey(key: string, prefix: string) {
    return encodeKey(key, prefix);
  }

  // decodeKey decodes the given key
  public decodeKey(encodedKey: string, prefix: string) {
    return decodeKey(encodedKey, prefix);
  }
}
