import { ISetOptions, IStorageDriver, IStorageDriverOptions } from './type';
import { isInvalidKey, encodeKey, decodeKey } from './utils';

const DEFAULT_OPTIONS = {
  prefix: '@@',
};


export abstract class StorageDriver implements IStorageDriver {
  constructor(protected readonly options: IStorageDriverOptions | undefined = DEFAULT_OPTIONS) {

  }

  get prefix() {
    return this.options?.prefix ?? DEFAULT_OPTIONS.prefix;
  }

  public isInvalidKey(encodedKey: string) {
    return isInvalidKey(encodedKey, this.prefix);
  }

  public encodeKey(key: string) {
    return encodeKey(key, this.prefix);
  }

  public decodeKey(encodedKey: string) {
    return decodeKey(encodedKey, this.prefix);
  }

  // get returns the value of the given key
  public abstract get<T = any>(key: string): Promise<T | null>;
  // set sets the value of the given key
  public abstract set<T = any>(key: string, value: T, options?: ISetOptions): Promise<void>;
  // remove removes the value of the given key
  public abstract remove(key: string): Promise<void>;
  // keys returns the keys of the storage
  public abstract keys(): Promise<string[]>;
  // getAll returns the all items of the storage
  public abstract getAll<T = any>(): Promise<Record<string, T | null>>;
  // clear clears the storage
  public abstract clear(): Promise<void>;
  // has checks whether the given key exists
  public abstract has(key: string): Promise<boolean>;
}