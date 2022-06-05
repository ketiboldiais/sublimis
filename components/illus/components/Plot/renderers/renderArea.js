import { area } from "d3";

export const renderArea = (bounds, xScale, yScale) => {
	const lowerBound = xScale(bounds[0]);
	const upperBound = xScale(bounds[1]);
	return area()
		.defined((d) => {
			return xScale(d.x) < upperBound && xScale(d.x) > lowerBound;
		})
		.x((d) => {
			return xScale(d.x);
		})
		.y0(yScale(0))
		.y1((d) => {
			return yScale(d.y);
		});
};
