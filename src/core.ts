import { IStorageOptions } from './type';
import { LocalStorage } from './drivers/LocalStorage';
import { IndexDBStorage } from './drivers/indexeddb';

export function create(options?: IStorageOptions) {
  const engine = options?.engine || 'localStorage';

  switch (engine) {
    case 'localStorage':
      return new LocalStorage(options);
    case 'indexeddb':
      return new IndexDBStorage(options);
    default:
      throw new Error(`Unknown storage engine: ${engine}`);
  }
}


