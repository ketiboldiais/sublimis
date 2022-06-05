import React, { useRef, useEffect } from "react";
import { isObjectLiteral } from "../utils/isObjectLiteral/isObjectLiteral";
import { className } from "../utils/ClassNames";
import { svg } from "../utils/svg/svg";
import { Base } from "../base/Base";
import * as d3 from "d3";

const generateDataFromArray = (arr = []) => {
	let data = [];
	for (let i = 0; i < arr.length; i++) {
		if (isObjectLiteral(arr[i])) {
			data.push(arr[i]);
		} else {
			let sequenceElement = { val: arr[i] };
			data.push(sequenceElement);
		}
	}
	return data;
};

export const Sequence = ({
	data = [1, 2, 3, 4, 5],
	width = 0.574045 * data.length ** 2 + 22.878 * data.length + 45.8824,
	height = 80,
	scale = 100,
	elementFillColor = "white",
	elementStrokeColor = "black",
	elementFontSize = "1rem",
	indexFontSize = "0.8rem",
	margins = [20, 20, 20, 20],
	containerWidth = scale,
	containerHeight,
}) => {
	const sequenceFigure = useRef();
	const svgDimensions = svg(width, height, margins);
	const sequenceData = generateDataFromArray(data);

	const yScale = d3
		.scaleBand()
		.domain(sequenceData)
		.range([0, svgDimensions.height])
		.paddingInner(0.1);

	const xScale = d3
		.scaleBand()
		.domain(sequenceData)
		.range([0, svgDimensions.width], 0.05)
		.paddingInner(0.1);

	const renderSequence = () => {
		// set up group
		const sequence = d3
			.select(sequenceFigure.current)
			.select("g.svgElement")
			.append("g")
			.attr("class", className.sequence.canvas)
			.selectAll("g.Rects")
			.data(sequenceData)
			.enter()
			.append("g")
			.attr("class", (d) =>
				d.focus
					? `${className.sequence.element} ${d.focus}`
					: `${className.sequence.element}`,
			)
			.attr("transform", (d) => `translate(${xScale(d)})`);
		const squares = sequence
			.append("rect")
			.attr("fill", elementFillColor)
			.attr("stroke", elementStrokeColor)
			.attr("width", xScale.bandwidth())
			.attr("height", xScale.bandwidth());

		const dataLabels = sequence
			.append("g")
			.attr("class", className.sequence.elementText)
			.append("text")
			.attr("font-size", elementFontSize)
			.attr("text-anchor", "middle")
			.attr("x", xScale.bandwidth() / 2)
			.attr("y", xScale.bandwidth() / 2)
			.attr("dy", "0.35em")
			.text((d) => `${d.val}`);

		const indices = sequence
			.append("g")
			.attr("class", className.sequence.indexText)
			.append("text")
			.attr("font-size", indexFontSize)
			.attr("text-anchor", "middle")
			.attr("x", xScale.bandwidth() / 2)
			.attr("y", xScale.bandwidth() + xScale.bandwidth() / 2.5)
			.attr("dy", "0.5em")
			.text((d, i) => i);

		const annotation = sequence
			.filter((d) => d.ant)
			.append("g")
			.attr("class", className.sequence.annotationText)
			.append("text")
			.attr("text-anchor", "middle")
			.attr("x", xScale.bandwidth() / 2)
			.attr("y", -4)
			.text((d) => d.ant);
	};

	useEffect(() => {
		if (sequenceFigure.current) renderSequence();
	});
	return (
		<Base
			id={sequenceFigure}
			type="Sequence"
			width={width}
			height={height}
			containerWidth={containerWidth}
			containerHeight={containerHeight}
			margins={margins}
		/>
	);
};
