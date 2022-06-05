import { translate } from "../../utils/translate/translate";
import { reduceFraction } from "../../utils/reduceFraction/reduceFraction";
import { attrs } from "../../utils/attrs/attrs";
import { MathText } from "../../utils/MathText/MathText";
import { arc } from "d3";

export const renderAngle = (
	selection,
	datum,
	index,
	scaleDimensionX,
	plotLineColor,
	xScale,
	yScale,
	id,
	fontSize,
) => {
	const user_input_arm1_length = datum.arms ? datum.arms[0] : 5;
	const user_input_arm2_length = datum.arms ? datum.arms[1] : 5;
	const arm_1_length = scaleDimensionX(user_input_arm1_length);
	const arm_2_length = scaleDimensionX(user_input_arm2_length);
	const className = datum.className
		? `plot-angle ${datum.className}`
		: `plot-angle`;
	const stroke = datum.color ? datum.color : plotLineColor;
	const xPosition = xScale(datum.xy[0]);
	const yPosition = yScale(datum.xy[1]);
	const angleCanvas = selection
		.append("g")
		.attr("class", className)
		.attr("transform", translate(xPosition, yPosition));
	const arm1 = angleCanvas.append("line");
	const arm2 = angleCanvas.append("line");
	attrs(arm1, {
		stroke,
		x1: 0,
		y1: 0,
		x2: arm_1_length,
		y2: 0,
	});
	attrs(arm2, {
		stroke,
		x1: 0,
		y1: 0,
		x2: arm_2_length,
		y2: 0,
		transform: `rotate(-${datum.angle})`,
	});

	// angle marker
	if (datum.angle === 90) {
		const angleMarkerPath = `M 0 -8 H 0 8 V 0 0`;
		angleCanvas
			.append("path")
			.attr("fill", "none")
			.attr("stroke", stroke)
			.attr("d", angleMarkerPath);
	} else {
		const _arc = arc()
			.innerRadius(10)
			.outerRadius(10)
			.startAngle(0)
			.endAngle((datum.angle * Math.PI) / 180);
		const angleMarker = angleCanvas
			.append("g")
			.attr("transform", `rotate(${90 - datum.angle})`);
		angleMarker
			.append("path")
			.attr("fill", "none")
			.attr("stroke", stroke)
			.attr("d", _arc);
	}
	if (datum.label) {
		const x = xScale(datum.label.xy[0]);
		const y = yScale(datum.label.xy[1]);
		const labelWidth = datum.label.w ? datum.label.w : 100;
		const labelHeight = datum.label.h ? datum.label.h : 50;
		const angleMeasure = selection
			.append("g")
			.attr("transform", translate(x, y));
		const label =
			datum.label.type === "radians"
				? `\\dfrac{${reduceFraction(datum.angle, 180)[0]}}{${
						reduceFraction(datum.angle, 180)[1]
				  }}\\pi`
				: `${datum.angle}^\\circ`;
		const _id = datum.id ? datum.id : `angle-measure-${id}`;
		MathText(angleMeasure, label, fontSize, labelWidth, labelHeight, _id);
	}
};
