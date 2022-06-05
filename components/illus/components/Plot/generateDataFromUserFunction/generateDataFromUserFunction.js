export const generateDataFromUserFunction = (
	f,
	samples,
	_domainUpperBound,
	_domainLowerBound,
	_rangeUpperBound,
	_rangeLowerBound,
) => {
	let dataset = [];
	let x, y;
	for (let i = -samples; i < samples; i++) {
		if (typeof f !== "function") {
			x = f;
			y = i;
		} else {
			x = (i / samples) * _domainUpperBound;
			y = f(x);
		}
		if (
			y >= 2 * _rangeUpperBound ||
			y <= 2 * _rangeLowerBound ||
			isNaN(y)
		) {
			y = null;
		}
		dataset.push({ x, y });
	}
	return dataset;
};
