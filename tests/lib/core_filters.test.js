const core_filters = require('../../lib/core_filters');

test('test core_filters returns correct values', () => {
    const mockEnv = {
        getFilter: jest.fn(),
    };
    const result = core_filters(mockEnv);

    expect(typeof result.log).toBe('function');
});