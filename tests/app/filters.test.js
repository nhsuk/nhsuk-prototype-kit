const filters = require('../../app/filters');

test('test filters returns empty', () => {
    const result = filters();

    expect(result).toStrictEqual({});
});