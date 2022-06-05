export const defineCircleMarkers = (
	selection,
	markerId = "dot",
	r = 5,
	stroke = "grey",
	fill = "none",
	markerWidth = r,
	markerHeight = r,
	orient = "auto",
	viewBox = `0 0 ${r * 2 + 2} ${r * 2 + 2}`,
) => {
	selection
		.append("svg:defs")
		.selectAll("marker")
		.data(["end"])
		.enter()
		.append("svg:marker")
		.attr("id", markerId)
		.attr("viewBox", viewBox)
		.attr("refX", r)
		.attr("refY", r)
		.attr("markerWidth", markerWidth)
		.attr("markerHeight", markerHeight)
		.attr("orient", orient)
		.append("svg:circle")
		.attr("cx", r)
		.attr("cy", r)
		.attr("r", r)
		.attr("fill", fill)
		.attr("stroke", stroke);
};
