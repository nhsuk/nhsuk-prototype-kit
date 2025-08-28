test('core_filters returns correct values', async () => {
  const core_filters = (await import('../../lib/core_filters.js')).default

  const mockEnv = {
    getFilter: jest.fn()
  }

  const result = core_filters(mockEnv)

  expect(typeof result.log).toBe('function')
})
