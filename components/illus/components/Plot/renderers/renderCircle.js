import { getBackgroundColor } from "../../utils/getBackgroundColor/getBackgroundColor";
import { attrs } from "../../utils/attrs/attrs";

export const renderCircle = (
	selection,
	datum,
	index,
	xScale,
	yScale,
	scaleDimensionX,
	plotLineColor,
	_plotREF,
) => {
	const cx = xScale(datum.xy[0]);
	const cy = yScale(datum.xy[1]);
	const stroke = datum.stroke ? datum.stroke : plotLineColor;
	const fill = datum.fill ? datum.fill : getBackgroundColor(_plotREF);
	const r = datum.r ? scaleDimensionX(datum.r) : scaleDimensionX(5);
	const className = datum.class
		? `plot-circle ${datum.class}`
		: `plot-circle`;
	const circleCanvas = selection.append("g").attr("class", className);
	const circle = circleCanvas.append("circle");
	attrs(circle, { r, stroke, fill, cx, cy });
	if (datum.markCenter) {
		const center = circleCanvas.append("circle");
		attrs(center, { stroke, fill, r: 2, cx, cy });
	}
};
