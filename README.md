# @jameslnewell/resolve-bin

Resolve the path of a npm package's binary

## Installation

```sh
npm i -S @jameslnewell/resolve-bin
```

## Usage

```js
import resolveBin from "@jameslnewell/resolve-bin";

const path = resolveBin({
  from: __dirname,
  package: 'typescript',
  command: 'tsc',
})
```
