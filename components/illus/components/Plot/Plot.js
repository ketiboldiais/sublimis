import React, { useRef, useEffect } from "react";
import { Base } from "../base/Base";
import * as d3 from "d3";
import {
	renderAngle,
	renderArea,
	renderAxes,
	renderRectangle,
	renderCircle,
	renderRay,
	renderLabel,
	renderLine,
	renderPoint,
	renderLineSegment,
} from "./renderers";
import { svg, getPropertyValues } from "../utils";
import { generateFunctionData } from "./generateFunctionData/generateFunctionData";
import { computePath } from "./computePath/computePath";

export const Plot = ({
	id = `plot-${Date.now()}`,
	functions,
	geo,
	domain = [-10, 10],
	range = domain,
	samples = 500,
	width = 400,
	height = 400,
	containerWidth,
	containerHeight,
	noAxes = false,
	renderXAxis = true,
	renderYAxis = true,
	tickCount = domain[1] * 2,
	xTickCount = tickCount,
	yTickCount = xTickCount,
	noTicks = false,
	xLabel = { text: "x", w: 20 },
	yLabel = { text: "y" },
	fontFamily = "system-ui",
	fontSize = 0.6,
	tickFontSize = 0.5,
	axesColor = "#606060",
	plotLineColor = "lightgrey",
	strokeWidth = 1,
	margins = [50, 50, 50, 50],
}) => {
	const _plotREF = useRef();
	const _svg = svg(width, height, margins);
	const _domainLowerBound = domain[0];
	const _domainUpperBound = domain[1];
	const _rangeLowerBound = range[0];
	const _rangeUpperBound = range[1];

	const xScale = d3.scaleLinear(
		[_domainLowerBound, _domainUpperBound],
		[0, _svg.width],
	);

	const scaleDimensionX = d3.scaleLinear(
		[0, _domainUpperBound * 2],
		[0, _svg.width],
	);

	const yScale = d3.scaleLinear(
		[_rangeLowerBound, _rangeUpperBound],
		[_svg.height, 0],
	);

	const xAxis = d3
		.axisBottom(xScale)
		.tickSizeInner(3)
		.tickSizeOuter(0)
		.ticks(xTickCount);
	const yAxis = d3
		.axisLeft(yScale)
		.tickSizeInner(3)
		.tickSizeOuter(0)
		.ticks(yTickCount);

	const renderPlot = (plot) => {
		const userFunctions = getPropertyValues(functions, "f");

		const funcGroupData = generateFunctionData(
			functions,
			userFunctions,
			samples,
			_domainUpperBound,
			_domainLowerBound,
			_rangeUpperBound,
			_rangeLowerBound,
		);

		for (let i = 0; i < funcGroupData.length; i++) {
			if (funcGroupData[i].integral) {
				const integral = funcGroupData[i].integral;
				if (integral.bounds) {
					const bounds = integral.bounds;
					plot
						.append("g")
						.attr("class", "integral-area")
						.append("path")
						.datum(funcGroupData[i].data)
						.attr("fill", "red")
						.attr("fill-opacity", 0.2)
						.attr("d", renderArea(bounds, xScale, yScale));
				}
			}
			plot
				.append("path")
				.datum(funcGroupData[i].data)
				.attr("shape-rendering", "geometric-precision")
				.attr("clip-path", "url(#chart-area)")
				.attr("fill", "none")
				.attr(
					"stroke",
					funcGroupData[i].color ? funcGroupData[i].color : plotLineColor,
				)
				.attr("stroke-width", strokeWidth)
				.attr(
					"stroke-dasharray",
					funcGroupData[i].dash ? funcGroupData[i].dash : 0,
				)
				.attr("d", computePath(yScale, xScale));
		}
	};

	const renderGeometries = (geometries, plot) => {
		for (let i = 0; i < geometries.length; i++) {
			let geometry = geometries[i];
			switch (geometry.type) {
				case "rectangle":
					renderRectangle(plot, geometry, i, xScale, yScale, plotLineColor);
					break;
				case "point":
					renderPoint(
						plot,
						geometry,
						i,
						xScale,
						yScale,
						_plotREF,
						plotLineColor,
					);
					break;
				case "segment":
					renderLineSegment(
						plot,
						geometry,
						i,
						xScale,
						yScale,
						plotLineColor,
						_plotREF,
					);
					break;
				case "line":
					renderLine(plot, geometry, i, xScale, yScale, plotLineColor);
					break;
				case "ray":
					renderRay(plot, geometry, i, xScale, yScale, plotLineColor);
					break;
				case "label":
					renderLabel(plot, geometry, i, xScale, yScale, fontSize, id);
					break;
				case "circle":
					renderCircle(
						plot,
						geometry,
						i,
						xScale,
						yScale,
						scaleDimensionX,
						plotLineColor,
						_plotREF,
					);
					break;
				case "angle":
					renderAngle(
						plot,
						geometry,
						i,
						scaleDimensionX,
						plotLineColor,
						xScale,
						yScale,
						id,
						fontSize,
					);
					break;
			}
		}
	};

	useEffect(() => {
		if (_plotREF.current) {
			const canvas = d3.select(_plotREF.current).select("g.svgElement");
			const plot = canvas.append("g").attr("class", "plot");
			if (!noAxes) {
				renderAxes(
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
				);
			}
			if (geo) {
				renderGeometries(geo, plot);
			}
			if (functions) {
				renderPlot(canvas, plot);
			}
		}
	});
	return (
		<Base
			id={_plotREF}
			type="Plot"
			width={width}
			height={height}
			containerWidth={containerWidth}
			containerHeight={containerHeight}
			margins={margins}
		/>
	);
};
