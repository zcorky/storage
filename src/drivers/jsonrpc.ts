import fz from '@zcorky/fz';
import { IStorageDriverOptions } from '../type';
import { StorageDriver } from '../driver';

export interface JSONRPCStorageConfig extends IStorageDriverOptions {  
  uri: string;
  headers?: { [key: string]: string };
}

export class JSONRPCStorage extends StorageDriver {
  private id = 0;

  constructor(private readonly config: JSONRPCStorageConfig) {
    super(config);
  }

  private get headers() {
    const { headers } = this.config;
    return {
      ...headers,
      'Content-Type': 'application/json',
    };
  }

  private async request<T = any>(method: 'get' | 'set' | 'remove' | 'has' | 'keys' | 'getAll' | 'clear', key?: string, value?: T, maxAge?: number) {
    const { uri } = this.config;
    const _key = typeof key === 'undefined' ? '' : this.encodeKey(key);
    this.id++;
    
    try {
      const response = await fz
        .post(uri, {
          headers: this.headers,
          body: {
            jsonrpc: '2.0',
            method,
            params: {
              key: _key,
              value,
              maxAge,
            },
            id: this.id,
          },
        })
        .json<{
          jsonrpc: string;
          result: T | null;
          id: string;
          error?: { code: number, message: string };
        }>();

      if (response?.jsonrpc !== '2.0') {
        throw new Error('invalid response, not jsonrpc 2.0');
      }

      if (response?.error) {
        throw new Error(`[${response.error.code}] ${response.error.message}`);
      }

      return response?.result || null;
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
