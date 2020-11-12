import { IStorageOptions } from './type';
import { LocalStorage } from './drivers/LocalStorage';
import { SessionStorage } from './drivers/SessionStorage';
import { IndexDBStorage } from './drivers/indexeddb';

export function create(options?: IStorageOptions) {
  const engine = options?.engine || 'localStorage';

  switch (engine) {
    case 'localStorage':
      return new LocalStorage(options);
    case 'sessionStorage':
      return new SessionStorage(options);
    case 'indexeddb':
      return new IndexDBStorage(options);
    default:
      throw new Error(`Unknown storage engine: ${engine}`);
  }
}


