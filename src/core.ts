export interface IStorage {
  get<T = any>(key: string): T | null;
  set<T = any>(key: string, value: T): void;
  remove(key: string): void;
  keys(): string[];
  getAll<T = any>(): Record<string, T | null>;
  clear(): void;
  has(key: string): boolean;
}

const DEFAULT_OPTIONS = {
  prefix: '@@',
};

export class Storage implements IStorage {
  constructor(private options: typeof DEFAULT_OPTIONS = DEFAULT_OPTIONS) {
    //
  }

  private isValidKey(encodedKey: string) {
    return encodedKey.indexOf(this.options.prefix) === -1;
  }

  private encodeKey(key: string) {
    return `${this.options.prefix}${key}`;
  }

  private decodeKey(encodedKey: string) {
    return this.isValidKey(encodedKey) ? null : encodedKey.replace(this.options.prefix, '');
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
      /* istanbul ignore next line */
      if (console) {
        console.warn(`storage didn't successfully save the '{ ${key}: ${value} }' pair, because the localStorage is full.`);
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
      .map(encodedKey => this.decodeKey(encodedKey) as string)
      .filter(e => !!e);
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
