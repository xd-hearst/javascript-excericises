const areObjectsEqual = require("./object-comparison");

describe("Object comparison test", () => {
	const testCases = [
		{ A: { a: 1 }, B: { a: 2 }, expected: false },
		{ A: { a: 1, b: 2 }, B: { a: 2 }, expected: false },
		{ A: { c: 2 }, B: { a: 2 }, expected: false },
		{ A: { x: 1, y: 1 }, B: { x: 1, y: 1 }, expected: true },
	];
	testCases.forEach(({ A, B, expected }) => {
		it("objA and objB comparison should return correct result", () => {
			
			expect(areObjectsEqual(A, B)).toBe(expected);
		});
	});
});
