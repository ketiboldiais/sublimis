import React, { useRef, useEffect } from "react";
import {
	className,
	svg,
	translate,
	setValue,
	setClassName,
} from "../utils";
import { Base } from "../base/Base";
import * as d3 from "d3";
import { formatQueueData } from "./formatQueueData/formatQueueData";

export const CircularQueue = ({
	data = [],
	width = 300,
	height = 300,
	scale = 100,
	containerWidth = scale,
	containerHeight,
	margins = [150, 100, 150, 100],
	isIndexed = true,
	outerRadius = null,
	innerRadius = null,
	elementFillColor = "#ffffff",
	elementStrokeColor = "#000000",
	elementTextColor = "#000000",
	indexTextColor = "#000000",
	strokeWidth = 2,
}) => {
	const circularQueueFigure = useRef();
	const _svg = svg(width, height, margins);
	const _data = formatQueueData(data);
	const pieData = d3.pie().value((d) => d.data)(_data);
	const _outerRadius = setValue(outerRadius, _svg.width / 2);
	const _innerRadius = setValue(innerRadius, _svg.width);
	const arc = d3.arc().innerRadius(_innerRadius).outerRadius(_outerRadius);
	const indexArc = d3
		.arc()
		.innerRadius(_innerRadius)
		.outerRadius(_outerRadius * 3);

	const renderCircularqueue = () => {
		const canvas = d3
			.select(circularQueueFigure.current)
			.select("g.svgElement");
		const pie = canvas
			.append("g")
			.attr("class", className.circularQueue.canvas)
			.attr("transform", translate(_svg.width / 2, 0));
		const queuer = pie
			.selectAll("piePaths")
			.data(pieData)
			.enter()
			.append("g")
			.attr("class", (d) =>
				setClassName(d.focus, className.circularQueue.queuer),
			);
		// queuer paths
		queuer
			.append("path")
			.attr("d", (d) => arc(d))
			.attr("fill", elementFillColor)
			.attr("stroke", elementStrokeColor)
			.attr("stroke-width", strokeWidth);
		// queuer labels
		queuer
			.append("text")
			.text((d) => d.data.val)
			.attr("dy", "0.3em")
			.attr("text-anchor", "middle")
			.attr("transform", (d) => `translate(${arc.centroid(d)})`)
			.attr("fill", elementTextColor);

		if (isIndexed) {
			const indices = pie
				.append("g")
				.attr("class", className.circularQueue.index);
			indices
				.selectAll("indices")
				.data(pieData)
				.enter()
				.append("text")
				.attr("dy", "0.35em")
				.attr("dx", "-0.3em")
				.attr("fill", indexTextColor)
				.attr("transform", (d) => `translate(${indexArc.centroid(d)})`)
				.text((d, i) => i);
		}
	};

	useEffect(() => {
		if (circularQueueFigure.current) renderCircularqueue();
	});
	return (
		<Base
			id={circularQueueFigure}
			width={width}
			height={height}
			containerWidth={containerWidth}
			containerHeight={containerHeight}
			margins={margins}
		/>
	);
};
