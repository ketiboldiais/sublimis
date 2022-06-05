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
	const label = selection.append("g");
	attrs(label, labelProperties);
	MathText(label, datum.id, labelFontSize, datum.w, datum.h, _id, fill);
};
