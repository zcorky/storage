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

// Store current user
store.set('user', { name:'Marcus' })

// Get current user
store.get('user')

// Remove current user
store.remove('user')

// Clear all keys
store.clear()
```

### API
* See the detailed [API Reference](./docs).

### Relatived
* [lockr]([https://github.com/iamkun/dayjs](https://github.com/tsironis/lockr)) -  A minimal API wrapper for localStorages.
* [store](https://github.com/marcuswestin/store.js)

## License

MIT © [Moeover](https://moeover.com)
