export interface IStorage {
  get<T = any>(key: string): Promise<T | null>;
  set<T = any>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  keys(): Promise<string[]>;
  getAll<T = any>(): Promise<Record<string, T | null>>;
  clear(): Promise<void>;
  has(key: string): Promise<boolean>;
}

export interface IStorageOptions {
  prefix?: string;
  engine?: 'localStorage' | 'indexeddb';
}