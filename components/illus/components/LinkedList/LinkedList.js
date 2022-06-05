import React, { useRef, useEffect } from "react";
import { Base } from "../base/Base";
import * as d3 from "d3";
import {
	svg,
	isObjectLiteral,
	className,
	insertArrowDefinitions,
	translate,
	setClassName,
} from "../utils";

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

export const LinkedList = ({
	data = [1, 2, 3, 4, 5],
	width = 30.1049 * data.length + 70.1515,
	height = 40,
	scale = 100,
	containerWidth = scale,
	containerHeight,
	margins = [10, 40, 10, 20],
	isIndexed = true,
}) => {
	const LinkedListFigure = useRef();
	const _svg = svg(width, height, margins);
	const _data = formatData(data);
	const nodeCount = _data.length;
	const xScale = d3
		.scaleBand()
		.domain(d3.range(nodeCount))
		.rangeRound([0, _svg.width])
		.paddingInner(0.5);
	const nodeWidth = xScale.bandwidth();
	const nodeHeight = 10;

	useEffect(() => {
		const canvas = d3
			.select(LinkedListFigure.current)
			.select("g.svgElement");
		const linkedList = canvas
			.append("g")
			.attr("class", className.linkedList.canvas);
		const nodeGroup = linkedList
			.selectAll("nodes")
			.data(_data)
			.enter()
			.append("g")
			.attr("class", (d) =>
				setClassName(d.focus, className.linkedList.node),
			)
			.attr("transform", (d, i) => translate(xScale(i), 0))
			.attr("y", 0);
		insertArrowDefinitions(
			canvas,
			className.linkedList.arrowURL,
			9,
			0,
			5,
			5,
			"auto",
			"black",
		);
		const dataField = nodeGroup
			.append("g")
			.attr("class", className.linkedList.dataField);
		const dataFieldRectangle = dataField
			.append("rect")
			.attr("width", nodeWidth)
			.attr("height", nodeHeight)
			.attr("stroke", "black")
			.attr("fill", "white");
		const dataFieldText = dataField
			.append("text")
			.attr("text-anchor", "middle")
			.attr("x", nodeWidth / 2)
			.attr("y", nodeHeight / 2)
			.attr("dy", "0.35em")
			.attr("font-size", "7px")
			.text((d) => d.val);
		if (isIndexed) {
			dataField
				.append("g")
				.attr("class", className.linkedList.index)
				.append("text")
				.attr("text-anchor", "middle")
				.attr("fill", "black")
				.style("font-size", "7px")
				.attr("x", nodeWidth / 1.5)
				.attr("y", nodeHeight + 10)
				.text((d, i) => i);
		}

		const nextField = nodeGroup
			.append("g")
			.attr("class", className.linkedList.nextField)
			.attr("transform", translate(xScale.bandwidth(), 0));

		const nextFieldRectangle = nextField
			.append("rect")
			.attr("stroke", "black")
			.attr("fill", "white")
			.attr("width", nodeWidth / 2)
			.attr("height", nodeHeight);

		const nodeLinks = nodeGroup
			.append("g")
			.attr("class", className.linkedList.link)

		nodeLinks
			.append("line")
			.attr("stroke", "black")
			.attr("x1", nodeWidth + nodeWidth / 4)
			.attr("y1", nodeHeight / 2)
			.attr("x2", nodeWidth + xScale.bandwidth())
			.attr("y2", nodeHeight / 2)
			.attr("marker-end", `url(#${className.linkedList.arrowURL}`);

		nodeLinks
			.append("circle")
			.attr("fill", "red")
			.attr("r", 1.5)
			.attr("cx", nodeWidth + nodeWidth / 4)
			.attr("cy", nodeHeight / 2)
			// .attr("cx", nodeWidth + nodeWidth / 4)
			// .attr("cy", nodeHeight / 2);

		const annotation = nextField
			.filter((d) => d.ant)
			.append("g")
			.attr("class", className.linkedList.annotation)
			.append("text")
			.attr("text-anchor", "middle")
			.style("font-size", "8px")
			.attr("x", -xScale.bandwidth() / 4)
			.attr("y", -4)
			.text((d) => d.ant);
	});
	return (
		<Base
			id={LinkedListFigure}
			type="LinkedList"
			width={width}
			height={height}
			containerWidth={containerWidth}
			containerHeight={containerHeight}
			margins={margins}
		/>
	);
};
