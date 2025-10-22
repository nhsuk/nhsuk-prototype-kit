const formatNhsNumber = require('../../../lib/filters/format-nhs-number')

test('formatNhsNumber with a string of 10 digits', () => {
  expect(formatNhsNumber('9991231230')).toBe('999 123 1230')
})

test('formatNhsNumber with 10 digits as a number', () => {
  expect(formatNhsNumber(9991231230)).toBe('999 123 1230')
})

test('formatNhsNumber with a string of 10 digits containing spaces', () => {
  expect(formatNhsNumber('9 991 23 123 0  ')).toBe('999 123 1230')
})

test('formatNhsNumber with a string of 10 digits and other characters', () => {
  expect(formatNhsNumber('999-123-123-0')).toBe('999 123 1230')
})

test('formatNhsNumber with a string of less than 10 digits', () => {
  expect(formatNhsNumber('99912345')).toBe('99912345')
})

test('formatNhsNumber with a string of more than 10 digits', () => {
  expect(formatNhsNumber('9991234567123')).toBe('9991234567123')
})

test('formatNhsNumber with null', () => {
  expect(formatNhsNumber(null)).toBeNull()
})
