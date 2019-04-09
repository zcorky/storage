export interface IStorage {
  get<T = any>(key: string): T | null;
  set<T = any>(key: string, value: T): void;
  remove(key: string): void;
  keys(): string[];
  getAll<T = any>(): Record<string, T | null>;
  clear(): void;
  has(key: string): boolean;
}

export class Storage implements IStorage {
  private encodeKey(key: string) {
    return key;
  }

  private decodeKey(encodedKey: string) {
    return encodedKey;
  }

  public get<T = any>(key: string): T | null {
    const _key = this.encodeKey(key);

    try {
      return JSON.parse(localStorage.getItem(_key) as string);
    } catch (err) {
      return null;
    }
  }

  public set<T = any>(key: string, value: T) {
    const _key = this.encodeKey(key);

    try {
      localStorage.setItem(_key, JSON.stringify(value));
    } catch (err) {
      if (console) {
        console.warn(`Lockr didn't successfully save the '{ ${key}: ${value} }' pair, because the localStorage is full.`);
      }
    }
  }

  public remove(key: string) {
    const _key = this.encodeKey(key);

    localStorage.removeItem(_key);
  }

  public keys(): string[] {
    return Object
      .keys(localStorage)
      .map(encodedKey => this.decodeKey(encodedKey));
  }

  public getAll<T = any>() {
    return this.keys()
      .reduce((all, key) => {
        all[key] = this.get(key);
        return all;
      }, {} as Record<string, T | null>);
  }

  public clear() {
    localStorage.clear();
  }

  public has(key: string) {
    const _key = this.encodeKey(key);

    return !!localStorage.getItem(_key);
  }
}
