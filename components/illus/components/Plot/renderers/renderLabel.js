import { translate } from "../../utils/translate/translate";
import { MathText } from "../../utils/MathText/MathText";
import { attrs } from "../../utils/attrs/attrs";

export const renderLabel = (
	selection,
	datum,
	index,
	xScale,
	yScale,
	fontSize,
	id
) => {
	const xPosition = datum.xy ? xScale(datum.xy[0]) : xScale(0);
	const yPosition = datum.xy ? yScale(datum.xy[1]) : yScale(0);
	const labelFontSize = datum.fontSize ? datum.fontSize : fontSize;
	const _id = id + datum.id.replace(/\s/g, "") + `${index}`;
	const fill = datum.fill ? datum.fill : "";
	const labelProperties = {
		class: datum.class ? `plot_label ${datum.class}` : "plot_label",
		transform: translate(xPosition, yPosition),
	};
	const _width = datum.w ? datum.w : 70;
	const _height = datum.h ? datum.h : 10;
	const label = selection.append("g");
	attrs(label, labelProperties);
	MathText(label, datum.id, labelFontSize, _width, _height, _id, fill);
};
