export interface IStorage {
  // get returns the value of the given key
  get<T = any>(key: string): Promise<T | null>;
  // set sets the value of the given key
  set<T = any>(key: string, value: T, maxAge?: number): Promise<void>;
  // remove removes the value of the given key
  remove(key: string): Promise<void>;
  // keys returns the keys of the storage
  keys(): Promise<string[]>;
  // getAll returns the all items of the storage
  getAll<T = any>(): Promise<Record<string, T | null>>;
  // clear clears the storage
  clear(): Promise<void>;
  // has checks whether the given key exists
  has(key: string): Promise<boolean>;
}

export interface ISetOptions {
  maxAge?: number;
}
export interface IStorageOptions extends IStorageDriverOptions {
  driver?: IStorageDriverType;
}

export interface IStorageDriver {
  isInvalidKey(encodedKey: string): boolean;
  encodeKey(key: string): string;
  decodeKey(encodedKey: string): string | null;
}

export interface IStorageDriverOptions {
  prefix?: string;
}

export type IStorageDriverType = 'localStorage' | 'sessionStorage' | 'indexeddb';
