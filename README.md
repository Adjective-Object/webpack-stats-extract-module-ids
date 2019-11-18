# webpack-stats-extract-ids

[npm](https://www.npmjs.com/package/webpack-stats-extract-ids), [github](https://github.com/Adjective-Object/webpack-stats-extract-ids)

A utility to get a mapping between webpack IDs and modules

## Usage

`yarn add webpack-bundle-diff-add-children`

```js
const getModuleIds = require('webpack-stats-extract-ids').getModuleIds;

// Get your bundle stats somehow
const webpackStats = require('fs').readFileSync('./stats.json', 'utf-8');

// Derive webpack-bundle-diff data
const moduleIdToNameMap = getModuleIds(webpackStats);
```

## Development

```sh
yarn # install dependencies
yarn build # build.             Can also use `rollup -c`
yarn watch # build with watch.  Can also use `rollup -cw`
yarn jest # run tests
```
