test('addNunjucksFilters filter added', async () => {
  // Import modules dynamically
  const customFilters = (await import('../../app/filters.js')).default
  const coreFilters = (await import('../../lib/core_filters.js')).default
  const { addNunjucksFilters } = await import('../../lib/utils.js')

  // Create a mock env with getFilter method
  const mockEnv = {
    addFilter: jest.fn(() => {
      return
    }),
    getFilter: jest.fn(() => {
      return jest.fn() // Mock filter function
    })
  }

  // Call the function (note: this test will actually call the real functions)
  await addNunjucksFilters(mockEnv)

  // Verify that addFilter was called (the actual number depends on the implementation)
  expect(mockEnv.addFilter).toHaveBeenCalled()
})

test('matchRoutes no error', async () => {
  const { matchRoutes } = await import('../../lib/utils.js')

  const mockRequest = {
    path: 'http://www.example.com'
  }

  const mockResponse = {
    set: jest.fn(),
    end: jest.fn(),
    render: jest.fn((routePath, cb) => {
      // Call the callback with a template not found error the first time
      cb()
    })
  }

  const mockNext = jest.fn()

  matchRoutes(mockRequest, mockResponse, mockNext)

  expect(mockResponse.render).toHaveBeenCalled()
  expect(mockResponse.set).toHaveBeenCalled()
  expect(mockResponse.end).toHaveBeenCalled()
  expect(mockNext).not.toHaveBeenCalled()
})

test('matchRoutes with other error', async () => {
  const { matchRoutes } = await import('../../lib/utils.js')

  const mockRequest = {
    path: 'http://www.example.com'
  }

  const mockResponse = {
    set: jest.fn(),
    end: jest.fn(),
    render: jest.fn((routePath, cb) => {
      // Call the callback with a template not found error the first time
      cb(new Error('template in folder'))
    })
  }

  const mockNext = jest.fn()

  matchRoutes(mockRequest, mockResponse, mockNext)

  expect(mockResponse.render).toHaveBeenCalled()
  expect(mockResponse.set).not.toHaveBeenCalled()
  expect(mockResponse.end).not.toHaveBeenCalled()
  expect(mockNext).toHaveBeenCalled()
})

test('matchRoutes with template error', async () => {
  const { matchRoutes } = await import('../../lib/utils.js')

  const mockRequest = {
    path: 'http://www.example.com'
  }

  const mockResponse = {
    set: jest.fn(),
    end: jest.fn(),
    render: jest.fn((routePath, cb) => {
      // Call the callback with a template not found error the first time
      cb(new Error('template not found'))
    })
  }

  const mockNext = jest.fn()

  matchRoutes(mockRequest, mockResponse, mockNext)

  expect(mockResponse.render).toHaveBeenCalled()
  expect(mockResponse.set).not.toHaveBeenCalled()
  expect(mockResponse.end).not.toHaveBeenCalled()
  expect(mockNext).toHaveBeenCalled()
})

test('matchRoutes with empty path', async () => {
  const { matchRoutes } = await import('../../lib/utils.js')

  const mockRequest = {
    path: ''
  }

  const mockResponse = {
    set: jest.fn(),
    end: jest.fn(),
    render: jest.fn((routePath, cb) => {
      // Call the callback with a template not found error the first time
      cb(new Error('template not found'))
    })
  }

  const mockNext = jest.fn()

  matchRoutes(mockRequest, mockResponse, mockNext)

  expect(mockResponse.render).toHaveBeenCalled()
  expect(mockResponse.set).not.toHaveBeenCalled()
  expect(mockResponse.end).not.toHaveBeenCalled()
  expect(mockNext).toHaveBeenCalled()
})

test('autoStoreData with request session data not set', async () => {
  const { autoStoreData } = await import('../../lib/utils.js')

  const mockRequest = {
    session: {},
    body: { 1: { 2: 'two' } },
    query: { _one: '_one' }
  }

  const mockResponse = {
    set: jest.fn(),
    end: jest.fn(),
    render: jest.fn((routePath, cb) => {
      // Call the callback with a template not found error the first time
      cb(new Error('template not found'))
    }),
    locals: { data: {} }
  }

  const mockNext = jest.fn()

  autoStoreData(mockRequest, mockResponse, mockNext)

  expect(mockResponse.locals.data).toStrictEqual({ 1: { 2: 'two' } })
})

test('autoStoreData with unchecked in the request', async () => {
  const { autoStoreData } = await import('../../lib/utils.js')

  const mockRequest = {
    session: {},
    body: { 1: '_unchecked' },
    query: { 2: ['one', '_unchecked', 'three'] }
  }

  const mockResponse = {
    set: jest.fn(),
    end: jest.fn(),
    render: jest.fn((routePath, cb) => {
      // Call the callback with a template not found error the first time
      cb(new Error('template not found'))
    }),
    locals: { data: {} }
  }

  const mockNext = jest.fn()

  autoStoreData(mockRequest, mockResponse, mockNext)

  expect(mockResponse.locals.data).toStrictEqual({ 2: ['one', 'three'] })
})
