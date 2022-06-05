import { attrs } from "../../utils/attrs/attrs";

export const renderLine = (
	selection,
	datum,
	index,
	xScale,
	yScale,
	plotLineColor,
) => {
	const x1 = xScale(datum.start[0]);
	const y1 = yScale(datum.start[1]);
	const x2 = xScale(datum.end[0]);
	const y2 = yScale(datum.end[1]);
	const className = datum.class ? `plot_line_${datum.class}` : `plot_line`;
	const canvas = selection.append("g").attr("class", className);
	const stroke = datum.stroke ? datum.stroke : plotLineColor;
	const line = canvas.append("line");
	const lineProperties = {
		x1,
		y1,
		x2,
		y2,
		stroke,
	};
	attrs(line, lineProperties);
};
