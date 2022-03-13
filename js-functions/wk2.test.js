const romanToInt = require('./wk2');

describe('w2 romanToInt', () => {
	const testCases = [
		{
			data: 'III',
			expected: 3,
		},
		{
			data: 'LVIII',
			expected: 58,
		},
		{
			data: 'MCMXCIV',
			expected: 1994,
		},

		{
			data: 'MMXXII',
			expected: 22,
		},
	];

	testCases.forEach(({ data, expected }) => {
		test(`roman numeral ${data} should be ${expected}`, () => {
			expect(romanToInt(data)).toBe(expected);
		});
	});
});
