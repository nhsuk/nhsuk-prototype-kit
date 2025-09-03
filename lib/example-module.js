// Example ES module using .js extension
// This demonstrates how to opt-in to ES modules while keeping CommonJS as default

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Example ES module function
 * @param {string} message - Message to log
 * @returns {object} Example data object
 */
export function exampleFunction(message) {
  console.log('ES Module:', message)
  return {
    type: 'ES Module',
    message,
    timestamp: new Date().toISOString()
  }
}

/**
 * Example function to read package.json using ES modules
 * @returns {object} Package.json contents
 */
export function readPackageInfo() {
  const packagePath = join(__dirname, '..', 'package.json')
  const packageContent = readFileSync(packagePath, 'utf8')
  return JSON.parse(packageContent)
}

export default {
  exampleFunction,
  readPackageInfo
}
