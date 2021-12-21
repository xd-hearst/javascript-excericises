function areObjectsEqual(objA, objB) {
	// you function here
	console.log("a=", objA);
	console.log("B=", objB);
	console.log(objA === objB);
	return objA === objB; // false
}

module.exports = areObjectsEqual;
