import fz from '@zcorky/fz';
import { IStorageDriverOptions } from '../type';
import { StorageDriver } from '../driver';

export interface ServiceStorageConfig extends IStorageDriverOptions {  
  uri: string;
  headers?: { [key: string]: string };
}

export class ServiceStorage extends StorageDriver {
  constructor(private readonly config: ServiceStorageConfig) {
    super(config);
  }

  private get headers() {
    const { headers } = this.config;
    return {
      ...headers,
      'Content-Type': 'application/json',
    };
  }

  private async request<T = any>(action: 'get' | 'set' | 'remove' | 'has' | 'keys' | 'getAll' | 'clear', key?: string, value?: T, maxAge?: number) {
    const { uri } = this.config;
    const _key = typeof key === 'undefined' ? '' : this.encodeKey(key);
    
    try {
      const item = await fz
        .post(uri, {
          headers: this.headers,
          body: {
            action,
            key: _key,
            value,
            maxAge,
          },
        })
        .json<T | null>();

      return item || null;
    } catch (error) {
      return null;
    }
  }

  public async get<T = any>(key: string): Promise<T | null> {
    return this.request<T>('get', key);
  }

  public async set<T = any>(key: string, value: T, maxAge?: number): Promise<void> {
    await this.request<T>('set', key, value, maxAge);
  }

  public async remove(key: string): Promise<void> {
    await this.request('remove', key);
  }

  public async keys(): Promise<string[]> {
    return this.request<string[]>('keys') as any;
  }

  public async getAll<T = any>(): Promise<Record<string, T | null>> {
    return this.request<Record<string, T | null>>('getAll') as any;
  }

  public async clear(): Promise<void> {
    await this.request('clear');
  }

  public async has(key: string): Promise<boolean> {
    return await this.request('has', key) as any;
  }
}
