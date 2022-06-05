export const renderRectangle = (
	selection,
	datum,
	index,
	xScale,
	yScale,
	plotLineColor,
) => {
	const className = datum.class
		? `plot-rectangle ${datum.class}`
		: `plot-rectangle`;
	const rectangle = selection.append("g").attr("class", className);

	const stroke = datum.stroke ? datum.stroke : plotLineColor;
	const fill = datum.fill ? datum.fill : stroke;
	const originX = datum.xy[0] - datum.w / 2;
	const originY = datum.xy[1] - datum.h / 2;

	const m1 = xScale(originX);
	const m2 = yScale(originY);

	const b1 = xScale(originX + datum.w);
	const b2 = yScale(originY);

	const t3 = xScale(originX + datum.w);
	const t4 = yScale(originY + datum.h);

	const l3 = xScale(originX);
	const l4 = yScale(originY + datum.h);

	const path = `M ${m1} ${m2} L ${b1} ${b2} L ${t3} ${t4} L ${l3} ${l4} Z`;

	rectangle
		.append("path")
		.attr("d", path)
		.attr("stroke", stroke)
		.attr("fill", fill)
		.attr("fill-opacity", 0.2);

	if (datum.markCenter) {
		rectangle
			.append("circle")
			.attr("stroke", plotLineColor)
			.attr("fill", plotLineColor)
			.attr("r", 2)
			.attr("cx", xScale(originX + datum.w / 2))
			.attr("cy", yScale(originY + datum.h / 2));
	}
};
