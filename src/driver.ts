import { IStorageDriver, IStorageDriverOptions } from './type';
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

  //
  public abstract get<T = any>(key: string): Promise<T | null>;
  public abstract set<T = any>(key: string, value: T): Promise<void>;
  public abstract remove(key: string): Promise<void>;
  public abstract keys(): Promise<string[]>;
  public abstract getAll<T = any>(): Promise<Record<string, T | null>>;
  public abstract clear(): Promise<void>;
  public abstract has(key: string): Promise<boolean>;
}