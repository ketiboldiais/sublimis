import React, { useRef, useEffect } from "react";
import {
	className,
	isObjectLiteral,
	svg,
	translate,
	insertArrowDefinitions,
} from "../utils";
import { Base } from "../base/Base";
import * as d3 from "d3";

const formatData = (arr = []) => {
	let data = [];
	for (let i = 0; i < arr.length; i++) {
		if (isObjectLiteral(arr[i])) {
			data.push(arr[i]);
		} else {
			let node = { val: arr[i] };
			data.push(node);
		}
	}
	return data;
};

export const DoublyLinkedList = ({
	data = [],
	fontFamily = "system-ui",
	listName = "root",
	width = 240,
	height = 40,
	containerWidth,
	containerHeight,
	fontSize = 8,
	fontColor = "#000000",

	dataFieldFontSize = fontSize,
	dataFieldColor = "#ffffff",
	dataFieldStrokeColor = fontColor,
	dataFieldTextColor = fontColor,

	nextFieldColor = dataFieldColor,
	nextFieldStrokeColor = fontColor,

	prevFieldColor = dataFieldColor,
	prevFieldStrokeColor = fontColor,

	rootFontSize = fontSize,
	rootTextColor = fontColor,

	antFontSize = 10,
	antFontColor = fontColor,

	linkColor = fontColor,

	nextPointerColor = linkColor,
	nextCircleColor = linkColor,
	prevPointerColor = linkColor,
	prevCircleColor = linkColor,

	indexFontSize = fontSize - 2,
	indexFontColor = fontColor,
	margins = [15, 30, 10, 30],
	isIndexed = true,
}) => {
	const _doublyLinkedListREF = useRef();
	const _svg = svg(width, height, margins);
	const _data = formatData(data);
	const nodeCount = _data.length;
	const scale = d3
		.scaleBand()
		.domain(d3.range(nodeCount))
		.rangeRound([0, _svg.width])
		.paddingInner(0.5);
	const nodeWidth = scale.bandwidth();
	const nodeHeight = scale.bandwidth() / 2;

	const renderDoublyLinkedList = () => {
		const canvas = d3
			.select(_doublyLinkedListREF.current)
			.select("g.svgElement");
		const doublyLinkedListCanvas = canvas
			.append("g")
			.attr("class", className.doublyLinkedList.canvas);
		insertArrowDefinitions(
			doublyLinkedListCanvas,
			className.doublyLinkedList.nextArrow,
			8,
			0,
			4,
			4,
			"auto",
			nextPointerColor,
		);
		insertArrowDefinitions(
			doublyLinkedListCanvas,
			className.doublyLinkedList.prevArrow,
			8,
			0,
			4,
			4,
			"auto",
			prevPointerColor,
		);
		const nodeGroup = doublyLinkedListCanvas
			.selectAll("nodeGroups")
			.data(_data)
			.enter()
			.append("g")
			.attr("class", className.doublyLinkedList.node)
			.attr("transform", (d, i) => translate(scale(i), 0))
			.attr("y", 0);
		const dataField = nodeGroup
			.append("g")
			.attr("class", className.doublyLinkedList.dataField)
			.attr("transform", translate(scale.bandwidth() / 3, 0));
		// Data Field Rectangle
		dataField
			.append("rect")
			.attr("width", nodeWidth)
			.attr("height", nodeHeight)
			.attr("stroke", dataFieldStrokeColor)
			.attr("fill", dataFieldColor);
		// Data field text
		dataField
			.append("text")
			.attr("font-family", fontFamily)
			.attr("fill", dataFieldTextColor)
			.attr("text-anchor", "middle")
			.attr("font-size", dataFieldFontSize)
			.attr("x", nodeWidth / 3)
			.attr("y", nodeHeight / 2)
			.attr("dy", "0.35em")
			.text((d) => d.val);
		if (isIndexed) {
			dataField
				.append("g")
				.attr("class", className.doublyLinkedList.index)
				.append("text")
				.attr("font-family", fontFamily)
				.attr("text-anchor", "middle")
				.attr("fill", indexFontColor)
				.attr("font-size", indexFontSize)
				.attr("x", nodeWidth / 3)
				.attr("y", nodeHeight + 10)
				.text((d, i) => i + 1);
		}
		const nextField = nodeGroup
			.append("g")
			.attr("class", className.doublyLinkedList.nextField)
			.attr("transform", translate(scale.bandwidth(), 0));
		// next field rectangle
		nextField
			.append("rect")
			.attr("stroke", nextFieldStrokeColor)
			.attr("fill", nextFieldColor)
			.attr("width", nodeWidth / 3)
			.attr("height", nodeHeight);
		const prevField = nodeGroup
			.append("g")
			.attr("class", className.doublyLinkedList.prevField);
		// prev field rectangle
		prevField
			.append("rect")
			.attr("stroke", prevFieldStrokeColor)
			.attr("fill", prevFieldColor)
			.attr("width", nodeWidth / 3)
			.attr("height", nodeHeight);
		const links = nodeGroup
			.append("g")
			.attr("class", className.doublyLinkedList.link);
		// next link
		links
			.append("line")
			.attr("class", className.doublyLinkedList.nextLink)
			.attr("stroke", nextPointerColor)
			.attr("x1", nodeWidth + nodeWidth / 8)
			.attr("y1", nodeHeight / 4)
			.attr("x2", nodeWidth + scale.bandwidth())
			.attr("y2", nodeHeight / 4)
			.attr("marker-end", `url(#${className.doublyLinkedList.nextArrow})`);
		// next link pointer circle
		links
			.append("circle")
			.attr("fill", nextCircleColor)
			.attr("r", 1.5)
			.attr("cx", nodeWidth + nodeWidth / 6)
			.attr("cy", nodeHeight / 4);
		// prev link
		links
			.append("line")
			.attr("class", className.doublyLinkedList.prevLink)
			.attr("stroke", prevPointerColor)
			.attr("x1", -nodeWidth + (scale.bandwidth() + scale.bandwidth() / 5))
			.attr("y1", nodeHeight / 1.5)
			.attr("x2", -nodeWidth + nodeWidth / 3)
			.attr("y2", nodeHeight / 1.5)
			.attr("marker-end", `url(#${className.doublyLinkedList.prevArrow})`);
		// prev link pointer circle
		links
			.append("circle")
			.attr("fill", prevCircleColor)
			.attr("r", 1.5)
			.attr("cx", -nodeWidth + (scale.bandwidth() + scale.bandwidth() / 6))
			.attr("cy", nodeHeight / 1.5);
		// annotations
		const annotations = dataField
			.append("g")
			.attr("class", className.doublyLinkedList.annotation);
		const rootPointer = doublyLinkedListCanvas
			.append("g")
			.attr("class", className.doublyLinkedList.node)
			.attr(
				"transform",
				translate(-scale.bandwidth() / 2, -scale.bandwidth() / 4),
			);
		// root pointer text
		rootPointer
			.append("text")
			.attr("font-family", fontFamily)
			.attr("text-anchor", "middle")
			.attr("font-size", rootFontSize)
			.attr("fill", rootTextColor)
			.text(listName);
		// root pointer link
		rootPointer
			.append("g")
			.attr("class", className.doublyLinkedList.link)
			.append("path")
			.attr("fill", "none")
			.attr("stroke", linkColor)
			.attr("d", () => {
				const m1 = 0;
				const m2 = 2;

				const L1 = 0;
				const L2 = scale.bandwidth() / 3;

				const l1 = scale.bandwidth() / 2;
				const l2 = 0;
				return `M ${m1},${m2} L ${L1},${L2} l ${l1},${l2}`;
			})
			.attr("marker-end", `url(#${className.doublyLinkedList.nextArrow})`);

		// annotations
		nextField
			.filter((d) => d.ant)
			.append("g")
			.attr("class", className.doublyLinkedList.annotation)
			.append("text")
			.attr("text-anchor", "middle")
			.attr("font-size", antFontSize)
			.attr("fill", antFontColor)
			.attr("x", -scale.bandwidth() / 4)
			.attr("y", -margins[0] / 2)
			.text((d) => d.ant);
	};

	useEffect(() => {
		if (_doublyLinkedListREF.current) renderDoublyLinkedList(); 
	});
	return (
		<Base
			id={_doublyLinkedListREF}
			width={width}
			height={height}
			containerWidth={containerWidth}
			containerHeight={containerHeight}
			margins={margins}
		/>
	);
};
