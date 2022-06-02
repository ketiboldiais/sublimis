import { mathText } from "../../utils/mathText/mathText";
import { translate } from "../../utils/translate/translate";

export const renderRectangle = (
	selection,
	datum,
	index,
	xScale,
	yScale,
	scaleDimensionX,
	scaleDimensionY,
) => {
	const xPosition = xScale(datum.pos[0]);
	const yPosition = yScale(datum.pos[1]);
	const width = scaleDimensionX(datum.width);
	const height = scaleDimensionY(datum.height);
	const id = datum.name ? datum.name : `rect-${index}-${Date.now()}`;
	const rectangle = selection
		.append("g")
		.attr("transform", translate(xPosition, yPosition));
	rectangle
		.append("rect")
		.attr("stroke", datum.stroke ? datum.stroke : "black")
		.attr("fill", datum.fill ? datum.fill : "none")
		.attr("fill-opacity", datum.opacity ? datum.opacity : 0.2)
		.attr("width", width)
		.attr("height", height);
	if (datum.markCenter) {
		rectangle
			.append("circle")
			.attr("r", 2)
			.attr("fill", "red")
			.attr("stroke", "black");
	}
	if (datum.markDimensions) {
		const widthText = rectangle
			.append("g")
			.attr("transform", translate(width / 4, -20));
		mathText(
			widthText,
			`w = ${datum.width}`,
			labelFontSize,
			40,
			20,
			`rect-width-${id}`,
		);
		const heightText = rectangle
			.append("g")
			.attr("transform", translate(width, height / 2.5));
		mathText(
			heightText,
			`h = ${datum.height}`,
			labelFontSize,
			40,
			20,
			`rect-height-${id}`,
		);
	}
};
