import React, { useRef, useEffect } from "react";
import { isObjectLiteral } from "../utils/isObjectLiteral/isObjectLiteral";
import { className } from "../utils/ClassNames";
import { svg } from "../utils/svg/svg";
import { Base } from "../base/Base";
import * as d3 from "d3";
import { insertArrowDefinitions, translate } from "../utils";

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
	arrayPointers = [],
	width = 0.574045 * data.length ** 2 + 22.878 * data.length + 45.8824,
	height = 80,
	scale = 100,
	elementFillColor = "white",
	elementStrokeColor = "black",
	elementFontSize = "1rem",
	indexFontSize = "0.8rem",
	marginTop = 20,
	marginRight = 20,
	marginBottom = 20,
	marginLeft = 20,
	margins = [marginTop, marginRight, marginBottom, marginLeft],
	containerWidth = scale,
	containerHeight,
}) => {
	if (arrayPointers) {
		height = 100;
		margins = [marginTop, marginRight, marginBottom * 2.5, marginLeft];
	}
	const sequenceFigure = useRef();
	const svgDimensions = svg(width, height, margins);
	const sequenceData = generateDataFromArray(data);

	const xScale = d3
		.scaleBand()
		.domain(sequenceData)
		.range([0, svgDimensions.width], 0.05)
		.paddingInner(0.1);

	const renderSequence = () => {
		// set up group
		const canvas = d3
			.select(sequenceFigure.current)
			.select("g.svgElement");
		insertArrowDefinitions(
			canvas,
			"sequencePointerArrow",
			5,
			0,
			5,
			5,
			"auto",
			elementStrokeColor,
		);
		const sequence = canvas
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

		if (arrayPointers) {
			const pointers = canvas
				.selectAll(".arrayPointers")
				.data(arrayPointers)
				.enter()
				.append("g")
				.attr("class", "sequencePointers")
				.attr("transform", translate(0, svgDimensions.height * 2.6));
			pointers
				.append("text")
				.attr(
					"x",
					(d) => d.target * xScale.bandwidth() + xScale.bandwidth() / 2,
				)
				.attr("text-anchor", "middle")
				.attr("font-size", indexFontSize)
				.text((d) => d.text);
			pointers
				.append("line")
				.attr(
					"x1",
					(d) => d.target * xScale.bandwidth() + xScale.bandwidth() / 2,
				)
				.attr("y1", -margins[2] / 4)
				.attr(
					"x2",
					(d) => d.target * xScale.bandwidth() + xScale.bandwidth() / 2,
				)
				.attr("y2", -margins[2] / 1.5)
				.attr("stroke", elementStrokeColor)
				.attr("marker-end", "url(#sequencePointerArrow)");
		}

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
