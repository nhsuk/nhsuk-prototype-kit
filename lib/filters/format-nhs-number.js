/**
 * Display an NHS number formatted with spaces
 *
 * The format is 3 3 4: 2 groups of 3 digits followed by 4 digits.
 *
 * For example, "9991234567" becomes "999 123 4567".
 * (This is an example or test number.)
 *
 * This number format makes it easier for people and assistive technologies
 * to read. It also makes it less likely that people will make mistakes.
 *
 * See https://service-manual.nhs.uk/content/a-to-z-of-nhs-health-writing#nhs-number
 *
 * @param {string} nhsNumber - the NHS number to format
 * @returns {string} Formatted NHS number
 */
function formatNhsNumber(nhsNumber) {
  const digitsOnly = String(nhsNumber).replace(/[^0-9]/g, '')

  if (digitsOnly.length != 10) {
    return nhsNumber
  }

  let formatted = `${digitsOnly.substring(0, 3)} ${digitsOnly.substring(3, 6)} ${digitsOnly.substring(6, 10)}`

  return formatted
}

module.exports = formatNhsNumber
