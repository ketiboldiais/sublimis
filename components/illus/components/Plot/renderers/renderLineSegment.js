import { attrs } from "../../utils/attrs/attrs";
import { getBackgroundColor } from "../../utils/getBackgroundColor/getBackgroundColor";

export const renderLineSegment = (
	selection,
	datum,
	index,
	xScale,
	yScale,
	plotLineColor,
	_plotREF,
	markPoints = true,
) => {
	const x1 = xScale(datum.start[0]);
	const y1 = yScale(datum.start[1]);
	const x2 = xScale(datum.end[0]);
	const y2 = yScale(datum.end[1]);
	const className = datum.class
		? ` plot_line_segment_${datum.class}`
		: `plot_line_segment`;
	const canvas = selection.append("g").attr("class", className);
	const stroke = datum.stroke ? datum.stroke : plotLineColor;
	const line = canvas.append("line");
	const lineProperties = {
		x1,
		y1,
		x2,
		y2,
		class: className,
		stroke,
	};
	attrs(line, lineProperties);
	if (markPoints) {
		const fill = datum.fill ? datum.fill : getBackgroundColor(_plotREF);
		const stroke = datum.stroke ? datum.stroke : plotLineColor;
		const segment_marker = canvas
			.append("g")
			.attr("class", "line_segment_markers");
		segment_marker
			.append("circle")
			.attr("r", 2)
			.attr("fill", fill)
			.attr("stroke", stroke)
			.attr("cx", x1)
			.attr("cy", y1);
		segment_marker
			.append("circle")
			.attr("r", 2)
			.attr("fill", fill)
			.attr("stroke", stroke)
			.attr("cx", x2)
			.attr("cy", y2);
	}
};
