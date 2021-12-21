const areObjectsEqual = require("./object-comparison");

describe("test", () => {
	const testCases = [{ A: { a: 1 }, B: { a: 2 }, expected: false }];
	testCases.forEach(({ A, B, expected }) => {
		it("test", () => {
			expect(areObjectsEqual(A, B)).toBe(expected);
		});
	});
});
