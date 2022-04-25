# storage

[![NPM version](https://img.shields.io/npm/v/@zcorky/storage.svg?style=flat)](https://www.npmjs.com/package/@zcorky/storage)
[![NPM quality](http://npm.packagequality.com/shield/%40zcorky%2Fstorage.svg)](http://packagequality.com/#?package=@zcorky/storage)
[![Coverage Status](https://codecov.io/gh/zcorky/storage/branch/master/graph/badge.svg)](https://codecov.io/gh/zcorky/storage)
[![Dependencies](https://img.shields.io/david/zcorky/storage.svg?style=flat-square)](https://david-dm.org/zcorky/storage)
[![Build Status](https://travis-ci.com/zcorky/storage.svg?branch=master)](https://travis-ci.com/zcorky/storage)
[![Known Vulnerabilities](https://snyk.io/test/npm/@zcorky/storage/badge.svg?style=flat-square)](https://snyk.io/test/npm/@zcorky/storage)
[![NPM download](https://img.shields.io/npm/dm/@zcorky/storage.svg?style=flat-square)](https://www.npmjs.com/package/@zcorky/storage)
![license](https://img.shields.io/github/license/zcorky/storage.svg)
[![issues](https://img.shields.io/github/issues/zcorky/storage.svg)](https://github.com/zcorky/storage/issues)

> A minimal API wrapper for localStorages, inspired by [tsironis/lockr](https://github.com/tsironis/lockr) and [marcuswestin/store.js](https://github.com/marcuswestin/store.js). It is written fully with Typescript.

* 🕒 Familiar `store` API & patterns
* 🔥 TypeScript

## Install

```
$ npm install @zcorky/storage
```

## Usage


```js
import storage from '@zcorky/storage';

// set sets the value of the given key
// suport maxAge, unit: ms
storage.set('user', { name:'Marcus' }, 30 * 1000)

// get returns the value of the given key
storage.get('user')

// remove removes the value of the given key
storage.remove('user')

// clear clears the storage
storage.clear()

// keys returns the keys of the storage
storage.keys()

// getAll returns the all items of the storage
storage.getAll()

// has checks whether the given key exists
storage.has('user')
```

### Enhancement

```js
// built-in drivers
//  local       - use localStorage
//  session     - use sessionStorage
//  indexeddb   - use IndexedDB
//  service     - use service with http request
storage.setDriver('session')

// custom prefix
storage.setPrefix('my-prefix-')
```

## Advanced Usage

### 1. Create a new Storage
Default storage is a global storage with singleton pattern.
If you want to create a new storage, you can use `storage.create()` method.

```js
const storage = storage.create(options);
```

### 2. Create Custom Driver

```typescript
import { StorageDriver } from '@zcorky/storage';

// 1. Create a class implements StorageDriver
export class CustomStorage extends StorageDriver {
  ...
}

// 2. Register the driver
storage.setDriver('custom', CustomStorage)
```

### API
* See the detailed [API Reference](./docs).

### Relatived
* [lockr](https://github.com/tsironis/lockr) -  A minimal API wrapper for localStorages.
* [store](https://github.com/marcuswestin/store.js)

## License

MIT © [Moeover](https://moeover.com)
