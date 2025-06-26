const portScanner = require('portscanner');
const inquirer = require('@inquirer/prompts');

/**
 * Find an available port to run a server on. This will check
 * whether the default port is available and if not, will ask
 * the user whether to switch to an available port.
 *
 * @param {Function} callback - Callback function which will be called with the port selected
 * @param {Object} options - An options object which can specify a defaultPort (defaults to 3000)
 */
function findAvailablePort(callback, options = {}) {
  const defaultPort = options.defaultPort || 3000;

  // Check whether the default port or the default port + 1000
  // is free. (1000 is added because that’s what we use for BrowserSync)
  portScanner.findAPortNotInUse(
    defaultPort,
    defaultPort + 1000,
    '127.0.0.1',
    async (error, availablePort) => {
      if (error) {
        throw error;
      }

      if (defaultPort === availablePort) {
        // Default port is free, return it via the callback
        callback(defaultPort);
      } else {
        console.error(`ERROR: Port ${defaultPort} in use - you may have another prototype running.\n`); // eslint-disable-line no-console

        inquirer.confirm({
          message: 'Change to an available port?',
        }).then((answeredYes) => {
          if (answeredYes) {
            callback(availablePort);
          } else {
            // User answered no, exit
            process.exit(0);
          }
        });
      }
    },
  );
}

module.exports = findAvailablePort;
