export interface IStorage {
  get<T = any>(key: string, defaultValue?: T): T | null;
  set<T = any>(key: string, value: T, expiredAt?: number): void;
  remove(key: string): void;
  keys(): string[];
  getAll<T = any>(): Record<string, T | null>;
  clear(): void;
  has(key: string): boolean;
}

interface Data<T> {
  expiredAt: number;
  value: T;
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

  private isValidValue<T>(data: Data<T>, encodeKey: string) {
    if (!data || !data.hasOwnProperty('value'))  return false;

    // expired, remove
    if (data.expiredAt && Date.now() > data.expiredAt) {
      localStorage.removeItem(encodeKey);
      return false;
    }

    return true;
  }

  private encodeKey(key: string) {
    return `${this.options.prefix}${key}`;
  }

  private decodeKey(encodedKey: string) {
    return this.isValidKey(encodedKey) ? null : encodedKey.replace(this.options.prefix, '');
  }

  private encodeValue<T>(value: T, expiredAt?: number) {
    const now = Date.now();

    if (!expiredAt) return {
      value,
    };

    return {
      expiredAt: now + expiredAt,
      value,
    };
  }

  public get<T = any>(key: string, defaultValue: T = null as any as T): T | null {
    const _key = this.encodeKey(key);
    
    try {
      const _value = JSON.parse(localStorage.getItem(_key) as string) as Data<T>;

      // value is invalid
      if (!this.isValidValue(_value, _key)) {
        return defaultValue;
      }

      return _value.value;
    } catch (err) {
      return defaultValue;
    }
  }

  public set<T = any>(key: string, value: T, expiredAt?: number) {
    const _key = this.encodeKey(key);
    const _value = this.encodeValue(value, expiredAt);

    try {
      localStorage.setItem(_key, JSON.stringify(_value));
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
    this
      .keys()
      .map(rawKey => this.encodeKey(rawKey))
      .forEach(key => {
        localStorage.removeItem(key);
      });
  }

  public has(key: string) {
    const _key = this.encodeKey(key);

    return !!localStorage.getItem(_key);
  }
}
