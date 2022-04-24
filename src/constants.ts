import { IStorageOptions, IStorageDriverType } from './type';

export const DEFAULT_DRIVER: IStorageDriverType = 'localStorage';
export const DEFAULT_PREFIX = '@@';

export const DEFAULT_OPTIONS: IStorageOptions = {
  prefix: DEFAULT_PREFIX,
  driver: DEFAULT_DRIVER,
};

