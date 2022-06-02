import React, { useRef, useEffect } from "react";
import { svg } from "../utils/svg/svg";
import { mathText } from "../utils/mathText/mathText";
import { Base } from "../base/Base";
import { appendArrowDefinitions } from "../Plot/appendArrowDefinitions/appendArrowDefinitions";
import { translate } from "../utils/translate/translate";
import * as d3 from "d3";
import { getBackgroundColor } from "../utils/getBackgroundColor/getBackgroundColor";
import { removeEndTicks } from "../utils/removeEndTicks/removeEndTicks";
import { reduceFraction } from "../utils/reduceFraction/reduceFraction";
import { renderRectangle } from "./renderRectangle/renderRectangle";

export const Plane = ({
	data = [{ shape: "angle", deg: 45, arms: [3, 3], pos: [0, 0] }],
	id = "plane",
	width = 500,
	height = 500,
	containerWidth = 100,
	containerHeight = 100,
	axisColor = "teal",
	xLabel = "x",
	yLabel = "y",
	labelFontSize = 0.7,
	xLabelWidth = 50,
	xLabelHeight = 50,
	yLabelWidth = 50,
	yLabelHeight = 50,
	noTicks = false,
	xMax = 10,
	xMin = -xMax,
	yMax = xMax,
	yMin = -yMax,
	tickCount = xMax * 2,
	margins = [70, 70, 70, 70],
}) => {
	const _planeFigureREF = useRef();
	const _svg = svg(width, height, margins);
	const xScale = d3.scaleLinear([xMin, xMax], [0, _svg.width]);
	const yScale = d3.scaleLinear([yMin, yMax], [_svg.height, 0]);
	const shift_y_axis_scale = d3.scaleLinear(
		[0, xMax - xMin],
		[0, _svg.width / 2],
	);
	const scaleDimensionX = d3.scaleLinear([0, xMax * 2], [1, _svg.width]);

	const scaleDimensionY = d3.scaleLinear([0, yMax * 2], [1, _svg.height]);

	const xAxis = d3
		.axisBottom(xScale)
		.tickSizeInner(3)
		.tickSizeOuter(0)
		.ticks(tickCount);
	const yAxis = d3
		.axisLeft(yScale)
		.tickSizeInner(3)
		.tickSizeOuter(0)
		.ticks(tickCount);

	const renderPoint = (selection, datum, index) => {
		const xPosition = xScale(datum.pos[0]);
		const yPosition = yScale(datum.pos[1]);
		const point = selection
			.append("g")
			.attr("transform", translate(xPosition, yPosition));
		point
			.append("circle")
			.attr("r", 2)
			.attr("fill", "red")
			.attr("stroke", "black");
		// mathText(point, "x=4", labelFontSize, 30, 50, `point-${index}`);
	};

	const renderAngle = (selection, datum, index) => {
		const xPosition = xScale(datum.pos[0]);
		const yPosition = yScale(datum.pos[1]);
		const arm1Length = scaleDimensionX(datum.arms[0]);
		const arm2Length = scaleDimensionX(datum.arms[1]);
		const group = selection
			.append("g")
			.attr("transform", translate(xPosition, yPosition));
		// arm 1
		group
			.append("line")
			.attr("stroke", "black")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", arm1Length)
			.attr("y2", 0);
		// arm 2
		group
			.append("line")
			.attr("stroke", "black")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", arm1Length)
			.attr("y2", 0)
			.attr("transform", `rotate(-${datum.deg})`);
		// angle marker
		if (datum.deg === 90) {
			group
				.append("path")
				.attr("fill", "none")
				.attr("stroke", "black")
				.attr("d", `M 0 -${arm1Length / 6} H 0 ${arm1Length / 6} V 0 0`);
		} else {
			const arc = d3
				.arc()
				.innerRadius(10)
				.outerRadius(10)
				.startAngle(0)
				.endAngle(datum.deg * (Math.PI / 180));
			const angleLabel = group
				.append("g")
				.attr("transform", `rotate(${90 - datum.deg})`);
			angleLabel
				.append("path")
				.attr("fill", "none")
				.attr("stroke", "red")
				.attr("d", arc);
		}
		const angleMeasure = group
			.append("g")
			.attr("transform", translate(arm1Length / 2, -arm2Length / 2));
		const frac = reduceFraction(datum.deg, 180);
		const radianLabel = `\\dfrac{${frac[0]}}{${frac[1]}}\\pi`;
		const degreeLabel = `${datum.deg}^\\circ`;
		mathText(
			angleMeasure,
			`\\theta = ${radianLabel}`,
			labelFontSize,
			arm1Length,
			50,
			`angle-${Date.now()}-${index}`,
		);
	};

	const renderCircle = (selection, datum, index) => {
		const xPosition = xScale(datum.pos[0]);
		const yPosition = yScale(datum.pos[1]);
		const radius = scaleDimensionX(datum.r);
		const circle = selection
			.append("g")
			.attr("transform", translate(xPosition, yPosition));
		circle
			.append("circle")
			.attr("r", radius)
			.attr("stroke", "black")
			.attr("fill", "none");
		if (datum.markRadius) {
			circle
				.append("line")
				.attr("x1", 0)
				.attr("y1", 0)
				.attr("x2", radius)
				.attr("y2", 0)
				.attr("stroke", "black");

			mathText(
				circle,
				`r = ${datum.r}`,
				10,
				50,
				50,
				`circle-${Date.now()}-${index}`,
			);

			circle
				.append("circle")
				.attr("r", 2)
				.attr("stroke", "black")
				.attr("fill", getBackgroundColor(_planeFigureREF));
		}
	};

	const renderLine = (selection, datum, index) => {
		const x1 = xScale(datum.start[0]);
		const y1 = yScale(datum.start[1]);
		const x2 = xScale(datum.end[0]);
		const y2 = yScale(datum.end[1]);
		const className = datum.class ? ` plane-line-${datum.class}` : "";
		const canvas = selection
			.append("g")
			.attr("class", "plane-line" + className);
		canvas
			.append("line")
			.attr("x1", x1)
			.attr("y1", y1)
			.attr("x2", x2)
			.attr("y2", y2)
			.attr("stroke", "black");
	};

	const renderPlaneFigure = () => {
		const canvas = d3
			.select(_planeFigureREF.current)
			.select("g.svgElement");
		const plane = canvas.append("g").attr("class", "plane");
		const axes = plane.append("g").attr("class", "illus-axis");

		appendArrowDefinitions(plane, axisColor);

		const x_axis_y_translate = _svg.height / 2;

		const render_xAxis = axes
			.append("g")
			.attr("class", "plot-x-axis")
			.attr("transform", translate(0, x_axis_y_translate))
			.call(xAxis);

		const x_axis_label = render_xAxis
			.append("g")
			.attr("transform", translate(_svg.width + 10, -10));

		mathText(
			x_axis_label,
			xLabel,
			labelFontSize,
			xLabelWidth,
			xLabelHeight,
			`${id}-figure-${xLabel}`,
		);

		// elongate x-axis ticks
		render_xAxis.selectAll(".tick").selectAll("line").attr("y1", -3);

		const y_axis_shift = _svg.width / 2;
		const offset = shift_y_axis_scale(xMax + xMin);

		const render_yAxis = axes
			.append("g")
			.attr("class", "plot-y-axis")
			.attr("transform", translate(y_axis_shift - offset, 0))
			.call(yAxis);

		const y_axis_label = render_yAxis
			.append("g")
			.attr("transform", translate(-yLabelWidth / 2, -margins[0] / 3));

		mathText(
			y_axis_label,
			yLabel,
			labelFontSize,
			yLabelWidth,
			yLabelHeight,
			`${id}-figure-${yLabel}`,
		);

		if (noTicks) {
			render_yAxis.selectAll(".tick").attr("display", "none");
			render_xAxis.selectAll(".tick").attr("display", "none");
		} else {
			// elongate y-axis ticks
			render_yAxis.selectAll(".tick").selectAll("line").attr("x1", 3);

			render_xAxis.selectAll("text").attr("fill", axisColor);
			render_yAxis.selectAll("text").attr("fill", axisColor);
			render_xAxis.selectAll("path").attr("stroke", axisColor);
			render_yAxis.selectAll("path").attr("stroke", axisColor);
			render_xAxis.selectAll("line").attr("stroke", axisColor);
			render_yAxis.selectAll("line").attr("stroke", axisColor);

			removeEndTicks(plane);
		}
		// add x-axis arrow heads
		render_xAxis
			.select("path")
			.attr("marker-end", "url(#xArrowLeft)")
			.attr("marker-start", "url(#xArrowRight)");

		// add y-axis arrow heads
		render_yAxis
			.select("path")
			.attr("marker-end", "url(#yArrowTop)")
			.attr("marker-start", "url(#yArrowBottom)");

		for (let i = 0; i < data.length; i++) {
			let figure = data[i];
			if (figure.shape === "circle") renderCircle(plane, figure, i);
			else if (figure.shape === "rectangle")
				renderRectangle(
					plane,
					figure,
					i,
					xScale,
					yScale,
					scaleDimensionX,
					scaleDimensionY,
				);
			else if (figure.shape === "point") renderPoint(plane, figure, i);
			else if (figure.shape === "angle") renderAngle(plane, figure, i);
			else if (figure.shape === "line") renderLine(plane, figure, i);
		}
	};

	useEffect(() => {
		if (_planeFigureREF.current) {
			renderPlaneFigure();
		}
	});
	return (
		<Base
			id={_planeFigureREF}
			width={width}
			height={height}
			containerWidth={containerWidth}
			containerHeight={containerHeight}
			margins={margins}
		/>
	);
};
