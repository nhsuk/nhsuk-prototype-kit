const { findAvailablePort } = require('../../lib/utils/find-available-port')

// Mock portscanner to control port availability
jest.mock('portscanner', () => ({
  checkPortStatus: jest.fn(),
  findAPortNotInUse: jest.fn()
}))

// Mock inquirer to avoid interactive prompts in tests
jest.mock('@inquirer/prompts', () => ({
  confirm: jest.fn()
}))

const { checkPortStatus, findAPortNotInUse } = require('portscanner')
const inquirer = require('@inquirer/prompts')

describe('Port configuration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('findAvailablePort returns provided port when available', async () => {
    checkPortStatus.mockResolvedValue('closed')
    
    const result = await findAvailablePort(2000)
    
    expect(result).toBe(2000)
    expect(checkPortStatus).toHaveBeenCalledWith(2000, '127.0.0.1')
  })

  test('findAvailablePort finds alternative when port is in use and user agrees', async () => {
    checkPortStatus.mockResolvedValue('open')
    inquirer.confirm.mockResolvedValue(true)
    findAPortNotInUse.mockResolvedValue(2001)
    
    const result = await findAvailablePort(2000)
    
    expect(result).toBe(2001)
    expect(inquirer.confirm).toHaveBeenCalled()
    expect(findAPortNotInUse).toHaveBeenCalledWith(2000, 3000, '127.0.0.1')
  })

  test('findAvailablePort returns undefined when port is in use and user declines', async () => {
    checkPortStatus.mockResolvedValue('open')
    inquirer.confirm.mockResolvedValue(false)
    
    const result = await findAvailablePort(2000)
    
    expect(result).toBeUndefined()
    expect(inquirer.confirm).toHaveBeenCalled()
    expect(findAPortNotInUse).not.toHaveBeenCalled()
  })
})