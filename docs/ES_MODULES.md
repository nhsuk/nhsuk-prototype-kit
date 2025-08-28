# ES Modules Opt-in Guide

With the NHS prototype kit, you can now use ES modules on an opt-in basis while keeping CommonJS as the default for all `.js` files.

## Using ES Modules

To use ES modules, create files with the `.mjs` extension. These files can use:

- `import` statements instead of `require()`
- `export` statements instead of `module.exports`
- Top-level `await`
- `import.meta.url` for current module URL

## Example

See `lib/example-module.mjs` for a demonstration of how to write ES modules.

### From CommonJS to ES Module:

```javascript
// CommonJS (.js file)
const fs = require('node:fs')
const path = require('node:path')

function readFile(filePath) {
  return fs.readFileSync(path.join(__dirname, filePath), 'utf8')
}

module.exports = { readFile }
```

```javascript
// ES Module (.mjs file)
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function readFile(filePath) {
  return readFileSync(join(__dirname, filePath), 'utf8')
}

export { readFile }
```

## Importing ES Modules in CommonJS

To use an ES module from a CommonJS file, use dynamic imports:

```javascript
// In a CommonJS .js file
async function useESModule() {
  const { exampleFunction } = await import('./lib/example-module.mjs')
  return exampleFunction('Hello from CommonJS!')
}
```

## Benefits

- **Gradual migration**: Convert files to ES modules one at a time
- **Modern syntax**: Use latest JavaScript module features
- **Better tree-shaking**: Improved bundle optimization
- **Interoperability**: Can import CommonJS from ES modules and vice versa
