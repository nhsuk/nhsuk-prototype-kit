const coreFilters = require('../../lib/core_filters')

test('core_filters returns correct values', () => {
  const mockEnv = {
    getFilter: jest.fn()
  }

  const result = coreFilters(mockEnv)

  expect(typeof result.log).toBe('function')
})
