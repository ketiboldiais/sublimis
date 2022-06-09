import React, { useRef, useEffect } from "react";
import { translate, svg, className } from "../utils";
import { Base } from "../base/Base";
import { formatDotPlotData } from "./formatDotPlotData";
import * as d3 from "d3";
import { MathText } from "../utils/MathText/MathText";

export const DotPlot = ({
	data = [],
	width = 500,
	height = 200,
	xMin = 0,
	xMax = data.length - 1,
	scale = 100,
	containerWidth = scale,
	containerHeight,
	marginTop=70,
	marginRight=70,
	marginBottom=70,
	marginLeft=70,
	margins = [marginTop, marginRight, marginBottom, marginLeft],
	xLabel = "x",
	labelOffsetY = 30,
	labelOffsetX = margins[1] / 3,
	labelFontSize = 0.7,
	labelWidth = 50,
	labelHeight = 50,
	id = `dotPlot${Date.now()}`,
}) => {
	const _dotPlotREF = useRef();
	const _svg = svg(width, height, margins);
	const _class = className.dotPlot;
	const x = d3
		.scaleLinear()
		.rangeRound([0, _svg.width])
		.domain([xMin, xMax]);
	const formattedData = formatDotPlotData(data);
	const histogram = d3
		.bin()
		.domain(x.domain())
		.thresholds(x.ticks(20))
		.value(function (d) {
			return d.Value;
		});
	// filter empty bins
	const bins = histogram(formattedData).filter((d) => d.length > 0);

	const renderDotPlot = () => {
		const canvas = d3
			.select(_dotPlotREF.current)
			.select("g.svgElement")
			.append("g")
			.attr("class", _class.canvas);
		// generate g container for each bin
		const binContainer = canvas.selectAll("g.bin").data(bins);
		binContainer.exit().remove();
		const binContainerEnter = binContainer
			.enter()
			.append("g")
			.attr("class", _class.bin)
			.attr("transform", (d) => translate(x(d.x0), _svg.height));
		// populate bin containers
		binContainerEnter
			.selectAll("dots")
			.data((d) => {
				return d.map((p, i) => {
					const val = {
						idx: i,
						name: p.Name,
						value: p.Value,
						radius: (x(d.x1) - x(d.x0)) / 2,
					};
					return val;
				});
			})
			.enter()
			.append("circle")
			.attr("cx", 0)
			.attr("cy", function (d) {
				return -d.idx * 2 * d.radius - d.radius;
			})
			.attr("fill", "white")
			.attr("stroke", "black")
			.attr("r", 5);
		// append x axis
		canvas
			.append("g")
			.attr("class", _class.xAxis)
			.attr("transform", translate(0, _svg.height))
			.call(d3.axisBottom(x));
		// append x-axis label
		const xAxisLabel = canvas
			.append("g")
			.attr("class", _class.xAxisLabel)
			.attr(
				"transform",
				translate(_svg.width + labelOffsetX, _svg.height - labelOffsetY),
			);
		MathText(
			xAxisLabel,
			xLabel,
			labelFontSize,
			labelWidth,
			labelHeight,
			id,
			"inherit",
		);
	};

	useEffect(() => {
		if (_dotPlotREF.current) renderDotPlot();
	});
	return (
		<Base
			id={_dotPlotREF}
			width={width}
			height={height}
			containerWidth={containerWidth}
			containerHeight={containerHeight}
			margins={margins}
		/>
	);
};
