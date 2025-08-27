const inquirer = require('@inquirer/prompts')
const { checkPortStatus, findAPortNotInUse } = require('portscanner')

/**
 * Find an available port to run a server on. This will check
 * whether the default port is available and if not, will ask
 * the user whether to switch to an available port.
 *
 * @param {number} [startPort] - Find port starting from this port number (optional)
 */
async function findAvailablePort(startPort = 3000) {
  const host = '127.0.0.1'

  // Check default port is free
  if ((await checkPortStatus(startPort, host)) === 'closed') {
    return startPort
  }

  console.error(
    `ERROR: Port ${startPort} in use - you may have another prototype running.\n`
  )

  const change = inquirer.confirm({
    message: 'Change to an available port?',
    default: false
  })

  // Check whether the default port or the default port + 1000
  // is free. (1000 is added because that’s what we use for BrowserSync)
  if (await change.catch(() => false)) {
    return findAPortNotInUse(startPort, startPort + 1000, host)
  }

  return undefined
}

module.exports = {
  findAvailablePort
}
