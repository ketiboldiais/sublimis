import { translate } from "../../utils/translate/translate";
import { getBackgroundColor } from "../../utils/getBackgroundColor/getBackgroundColor";
import { attrs } from "../../utils/attrs/attrs";

export const renderPoint = (
	selection,
	datum,
	index,
	xScale,
	yScale,
	_plotREF,
	plotLineColor,
) => {
	const xPosition = xScale(datum.xy[0]);
	const yPosition = yScale(datum.xy[1]);
	const pointProperties = {
		class: datum.class ? `plot_point ${datum.class}` : "plot_point",
		transform: translate(xPosition, yPosition),
	};
	const circleProperties = {
		r: datum.r ? datum.r : 2,
		fill: datum.fill ? datum.fill : getBackgroundColor(_plotREF),
		stroke: datum.stroke ? datum.stroke : plotLineColor,
	};

	const point = selection.append("g");

	attrs(point, pointProperties);

	const circle = point.append("circle");

	attrs(circle, circleProperties);
};
