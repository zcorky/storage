import { IStorage, IStorageOptions } from '../type';

const DEFAULT_OPTIONS = {
  prefix: '@@',
};

export class LocalStorage implements IStorage {
  private prefix = this.options?.prefix || '';

  constructor(private options: IStorageOptions = DEFAULT_OPTIONS) {
    //
  }

  private isInvalidKey(encodedKey: string) {
    return encodedKey.indexOf(this.prefix) === -1;
  }

  private encodeKey(key: string) {
    return `${this.prefix}${key}`;
  }

  private decodeKey(encodedKey: string) {
    return this.isInvalidKey(encodedKey) ? null : encodedKey.replace(this.prefix, '');
  }

  public async get<T = any>(key: string): Promise<T | null> {
    const _key = this.encodeKey(key);

    return new Promise((resolve, reject) => {
      try {
        return resolve(JSON.parse(localStorage.getItem(_key) as string));
      } catch (err) {
        // return reject(err);
        return resolve(null);
      }
    });
  }

  public async set<T = any>(key: string, value: T): Promise<void> {
    const _key = this.encodeKey(key);

    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(_key, JSON.stringify(value));
        return resolve();
      } catch (err) {
        /* istanbul ignore next line */
        if (console) {
          console.warn(`storage didn't successfully save the '{ ${key}: ${value} }' pair, because the localStorage is full.`);
        }

        return reject(err);
      }
    });
  }

  public async remove(key: string): Promise<void> {
    const _key = this.encodeKey(key);

    return new Promise((resolve, reject) => {
      try {
        localStorage.removeItem(_key);
        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  }

  public async keys(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      try {
        const keys = Object
          .keys(localStorage)
          .map(encodedKey => this.decodeKey(encodedKey) as string)
          .filter(e => !!e);

        return resolve(keys);
      } catch (err) {
        return reject(err);
      }
    });
  }

  public async getAll<T = any>(): Promise<Record<string, T | null>> {
    const keys = await this.keys();

    const data = {};
    for (const key of keys) {
      data[key] = await this.get(key);
    }

    return data;
  }

  public async clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        localStorage.clear();
        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  }

  public async has(key: string): Promise<boolean> {
    const _key = this.encodeKey(key);

    return new Promise((resolve, reject) => {
      try {
        return resolve(!!localStorage.getItem(_key));
      } catch (err) {
        return reject(err);
      }
    });
  }
}
