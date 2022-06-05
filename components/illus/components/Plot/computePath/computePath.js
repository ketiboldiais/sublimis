import { line } from "d3";

export const computePath = (yScale, xScale) => {
	return line()
		.y((d) => {
			return yScale(d.y);
		})
		.defined(function (d) {
			return d.y !== null;
		})
		.x((d) => {
			return xScale(d.x);
		});
};
