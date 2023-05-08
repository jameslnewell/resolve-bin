# @jameslnewell/resolve-bin

Resolve the path of a npm package's binary

## Installation

```sh
npm i -S @jameslnewell/resolve-bin
```

## Usage

```js
import resolveBin from "@jameslnewell/resolve-bin";

const path = await resolveBin("typescript", {
  from: __dirname,
  executable: "tsc",
});
```
