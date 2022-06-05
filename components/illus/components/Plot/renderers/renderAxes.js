import { appendArrowDefinitions } from "../appendArrowDefinitions/appendArrowDefinitions";
import { removeEndTicks } from "../../utils/removeEndTicks/removeEndTicks";
import { translate } from "../../utils/translate/translate";
import { MathText } from "../../utils/MathText/MathText";

export const renderAxes = (
	plot,
	axesColor,
	renderXAxis,
	renderYAxis,
	_svg,
	xAxis,
	yAxis,
	tickFontSize,
	noTicks,
	xLabel,
	yLabel,
	fontSize,
	fontFamily,
	id,
) => {
	appendArrowDefinitions(plot, axesColor);

	const axes = plot.append("g").attr("class", "illus-axis");

	if (renderXAxis) {
		const render_xAxis = axes
			.append("g")
			.attr("class", "plot-x-axis")
			.attr("transform", translate(-0.5, _svg.height / 2 - 0.5));

		render_xAxis.call(xAxis);

		// elongate x-axis ticks
		render_xAxis
			.selectAll(".tick")
			.selectAll("line")
			.attr("y1", -3)
			.attr("stroke", axesColor);

		// add x-axis arrow heads
		render_xAxis
			.select("path")
			.attr("stroke", axesColor)
			.attr("marker-end", "url(#xArrowLeft)")
			.attr("marker-start", "url(#xArrowRight)");

		if (noTicks) {
			render_xAxis.selectAll(".tick").attr("display", "none");
		}

		// add axes labels
		const _xLabelText = xLabel?.text ? xLabel.text : xLabel;
		const _xLabelFontSize = xLabel?.fontSize ? xLabel.fontSize : fontSize;
		const _xLabelWidth = xLabel?.w ? xLabel.w : 10;
		const _xLabelHeight = xLabel?.h ? xLabel.h : 10;
		const _xLabel_id = xLabel?.id ? xLabel?.id : `${id}_x_label`;
		const x_axis_label = render_xAxis
			.append("g")
			.attr(
				"transform",
				translate(_svg.width + _xLabelWidth / 2, -(_xLabelHeight / 2)),
			);

		MathText(
			x_axis_label,
			_xLabelText,
			_xLabelFontSize,
			_xLabelWidth,
			_xLabelHeight,
			_xLabel_id,
		);
	}

	if (renderYAxis) {
		const render_yAxis = axes
			.append("g")
			.attr("class", "plot-y-axis")
			.attr("transform", translate(_svg.width / 2 - 0.5, -0.5));
		render_yAxis.call(yAxis);

		// elongate y-axis ticks
		render_yAxis
			.selectAll(".tick")
			.selectAll("line")
			.attr("x1", 3)
			.attr("stroke", axesColor);

		if (noTicks) {
			render_yAxis.selectAll(".tick").attr("display", "none");
		}

		// add y-axis arrow heads
		render_yAxis
			.select("path")
			.attr("stroke", axesColor)
			.attr("marker-end", "url(#yArrowTop)")
			.attr("marker-start", "url(#yArrowBottom)");

		const _yLabelText = yLabel?.text ? yLabel.text : yLabel;
		const _yLabelFontSize = yLabel?.fontSize ? yLabel.fontSize : fontSize;
		const _yLabelWidth = yLabel?.w ? yLabel.w : 5;
		const _yLabelHeight = yLabel?.h ? yLabel.h : 40;
		const _yLabel_id = yLabel?.id ? yLabel?.id : `${id}_y_label`;
		const y_axis_label = render_yAxis
			.append("g")
			.attr(
				"transform",
				translate(-_yLabelWidth / 2, -(_yLabelHeight / 2)),
			);

		MathText(
			y_axis_label,
			_yLabelText,
			_yLabelFontSize,
			_yLabelWidth,
			_yLabelHeight,
			_yLabel_id,
		);
	}

	// remove all of the end ticks
	removeEndTicks(axes);

	// set font size and color for the tick labels
	axes
		.selectAll("text")
		.attr("font-family", fontFamily)
		.attr("font-size", `${tickFontSize}rem`)
		.attr("fill", axesColor);

	// set plot boundary using a clipPath
	axes
		.append("clipPath")
		.attr("id", "chart-area")
		.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", _svg.width)
		.attr("height", _svg.height);
};
