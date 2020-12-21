export interface IStorage {
  get<T = any>(key: string): Promise<T | null>;
  set<T = any>(key: string, value: T, options?: ISetOptions): Promise<void>;
  remove(key: string): Promise<void>;
  keys(): Promise<string[]>;
  getAll<T = any>(): Promise<Record<string, T | null>>;
  clear(): Promise<void>;
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
