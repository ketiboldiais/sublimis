import { insertArrowDefinitions } from "../../utils/insertArrowDefinitions/insertArrowDefinitions";
import { defineCircleMarkers } from "../../utils/defineCircleMarkers/defineCircleMarkers";
import { attrs } from "../../utils/attrs/attrs";

export const renderRay = (selection, datum, index, xScale, yScale, plotLineColor) => {
	const x1 = xScale(datum.start[0]);
	const y1 = yScale(datum.start[1]);
	const x2 = xScale(datum.end[0]);
	const y2 = yScale(datum.end[1]);
	const className = datum.class
		? ` plot_line_segment_${datum.class}`
		: `plot_line_segment`;
	const canvas = selection.append("g").attr("class", className);
	const stroke = datum.stroke ? datum.stroke : plotLineColor;
	const endPointFill = datum.fill ? datum.fill : stroke;
	insertArrowDefinitions(
		canvas,
		"ray_arrow_end",
		0,
		0,
		5,
		5,
		"auto",
		endPointFill,
	);
	defineCircleMarkers(
		canvas,
		"ray_start_point",
		5,
		endPointFill,
		endPointFill,
	);
	const line = canvas.append("line");
	const arrowEnd = "url(#ray_arrow_end)";
	const circleStart = "url(#ray_start_point)";
	const lineProperties = {
		x1,
		y1,
		x2,
		y2,
		class: className,
		stroke,
		"marker-start": circleStart,
		"marker-end": arrowEnd,
	};
	attrs(line, lineProperties);
};