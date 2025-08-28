# ES Modules Migration Guide

The NHS prototype kit now supports ES modules as an opt-in feature using `.mjs` file extensions while maintaining full CommonJS compatibility for all `.js` files.

## Key Features

- **CommonJS Default**: All `.js` files continue using CommonJS (`require`/`module.exports`)
- **ES Modules Opt-in**: Use `.mjs` extension for modern ES module syntax
- **Dual Implementation**: Core files available in both CommonJS (`.js`) and ES module (`.mjs`) versions
- **No Breaking Changes**: Existing workflows continue to work unchanged

## ES Module Files Available

The following core files have been migrated to ES modules:

- `app.mjs` - Main application (ES module version)
- `gulpfile.mjs` - Build configuration (ES module version)
- `lib/utils.mjs` - Core utility functions
- `lib/core_filters.mjs` - Nunjucks filters
- `lib/middleware/auto-routing.mjs` - Auto routing middleware
- `lib/utils/find-available-port.mjs` - Port utility
- `lib/example-module.mjs` - Example ES module (already existed)

## Running with ES Modules

To run the application using ES modules:

```bash
# Use the ES module version
node app.mjs

# Build using ES module gulpfile
npm run build  # Already configured to use gulpfile.mjs
```

To run the original CommonJS version:

```bash
# Use the original CommonJS version
node app.js
```

## ES Module Syntax Examples

### Importing ES Modules

```javascript
// Import ES modules using .mjs extension
import utils from './lib/utils.mjs'
import { findAvailablePort } from './lib/utils/find-available-port.mjs'
import automaticRouting from './lib/middleware/auto-routing.mjs'
```

### ES Module Features

ES modules provide modern JavaScript features:

```javascript
// Named exports
export function myFunction() { ... }
export const myConstant = 'value'

// Default export
export default { myFunction, myConstant }

// Top-level await
const data = await fetch('/api/data')

// Import meta URL
const __dirname = dirname(fileURLToPath(import.meta.url))
```

## CommonJS to ES Module Migration

### File Extension
Change `.js` to `.mjs` to enable ES module features.

### Import/Export Syntax

```javascript
// CommonJS (.js file)
const fs = require('node:fs')
const { join } = require('node:path')

function readFile(filePath) {
  return fs.readFileSync(join(__dirname, filePath), 'utf8')
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

### __dirname and __filename

In ES modules, recreate these using:

```javascript
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
```

## Mixing CommonJS and ES Modules

### Importing CommonJS from ES Modules

```javascript
// Import CommonJS module from ES module
const config = (await import('./app/config.js')).default
```

### Importing ES Modules from CommonJS

```javascript
// Import ES module from CommonJS (async required)
async function useESModule() {
  const { exampleFunction } = await import('./lib/example-module.mjs')
  return exampleFunction('Hello from CommonJS!')
}
```

## Benefits

- **Modern Syntax**: Use latest JavaScript module features
- **Better Tree-shaking**: Improved bundle optimization
- **Top-level Await**: Async operations at module level
- **Static Analysis**: Better tooling support
- **Future-ready**: Aligned with JavaScript standards
- **Gradual Migration**: Convert files one at a time

## Package.json Configuration

The package.json has been updated to support both module systems:

```json
{
  "main": "app.mjs",
  "scripts": {
    "start": "node app.mjs",
    "build": "gulp build --gulpfile gulpfile.mjs",
    "watch": "gulp --gulpfile gulpfile.mjs"
  }
}
```

## Testing

Tests continue to work with CommonJS. The original `.js` files are preserved to maintain test compatibility.
