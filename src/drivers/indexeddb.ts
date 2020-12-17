import { IStorageDriverOptions } from '../type';
import { StorageDriver } from '../driver';

const DEFAULT_OPTIONS = {
  prefix: '',
};

export class IndexDBStorage extends StorageDriver {
  // private prefix = this.options?.prefix || '';

  private dbName = 'zodash-db';
  private objectStoreName = 'zodash-store';
  private db: IDBDatabase;

  constructor(options: IStorageDriverOptions = DEFAULT_OPTIONS) {
    super(options);

    const request = window.indexedDB.open(this.dbName, 1);

    request.onerror = (event) => {

    }

    request.onsuccess = (event) => {
      // const db = request.result;

      this.db = (event as any).target.result as unknown as IDBDatabase;;
    };

    request.onupgradeneeded = (event) => {
      const db = (event as any).target.result as unknown as IDBDatabase;
      if (!db.objectStoreNames.contains(this.objectStoreName)) {
        db.createObjectStore(this.objectStoreName);
      }
    }
  }

  public async get<T = any>(key: string): Promise<T | null> {
    const _key = this.encodeKey(key);

    return new Promise((resolve, reject) => {
      const request = this.db
        .transaction(this.objectStoreName, 'readwrite')
        .objectStore(this.objectStoreName)
        .get(_key);

      request.onerror = (event) => {
        reject(event);
      };

      request.onsuccess = (event) => {
        resolve(request.result || null);
      };
    });
  }

  public async set<T = any>(key: string, value: T): Promise<void> {
    const _key = this.encodeKey(key);

    return new Promise((resolve, reject) => {
      const request = this.db
        .transaction(this.objectStoreName, 'readwrite')
        .objectStore(this.objectStoreName)
        .put(value, _key);

      request.onerror = event => {
        reject(event);
      };

      request.onsuccess = event => {
        resolve();
      };
    });
  }

  public async remove(key: string): Promise<void> {
    const _key = this.encodeKey(key);

    return new Promise((resolve, reject) => {
      const request = this.db
        .transaction(this.objectStoreName, 'readwrite')
        .objectStore(this.objectStoreName)
        .delete(_key)

      request.onerror = event => {
        reject(event);
      };

      request.onsuccess = event => {
        resolve();
      };
    });
  }

  public async keys(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const request = this.db
        .transaction(this.objectStoreName, 'readwrite')
        .objectStore(this.objectStoreName)
        .getAllKeys();

      request.onerror = event => {
        reject(event);
      };

      request.onsuccess = event => {
        resolve(request.result as any || []);
      };
    });
  }

  public async getAll<T = any>(): Promise<Record<string, T | null>> {
    return new Promise((resolve, reject) => {
      const request = this.db
        .transaction(this.objectStoreName, 'readwrite')
        .objectStore(this.objectStoreName)
        .getAll();

      request.onerror = event => {
        reject(event);
      };

      request.onsuccess = event => {
        const data = request.result.reduce((all, _key) => {
          const key = this.decodeKey(_key);

          all[key as string] = request.result[_key];

          return all;
        }, {} as any);

        resolve(data);
      };
    });
  }

  public async clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = this.db
        .transaction(this.objectStoreName, 'readwrite')
        .objectStore(this.objectStoreName)
        .clear();

      request.onerror = event => {
        reject(event);
      };

      request.onsuccess = event => {
        resolve();
      };
    });
  }

  public async has(key: string): Promise<boolean> {
    const _key = this.encodeKey(key);
    const keys = await this.keys();

    return _key in keys;
  }
}
