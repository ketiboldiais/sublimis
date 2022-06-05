import React, { useRef, useEffect } from "react";
import { Base } from "../base/Base";
import * as d3 from "d3";
import {
	svg,
	className,
	isObjectLiteral,
	translate,
	insertArrowDefinitions,
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

export const CircularList = ({
	name = "root",
	data = [],
	width = 240,
	height = 60,
	linkColor = "black",
	arrowFillColor,
	fontFamily = "system-ui",
	fill = "white",
	dataFieldFill = "white",
	nextFieldFill = "white",
	indexFieldFontSize = 0.5,
	strokeColor = "black",
	containerWidth,
	containerHeight,
	margins = [20, 25, 20, 20],
	isIndexed = true,
}) => {
	const CircularListFigure = useRef();
	const _svg = svg(width, height, margins);
	const _data = formatData(data);
	const nodeCount = _data.length;
	const scale = d3
		.scaleBand()
		.domain(d3.range(nodeCount))
		.rangeRound([0, _svg.width])
		.paddingInner(0.5);
	const nodeWidth = scale.bandwidth();
	const nodeHeight = 10;

	const renderCicularList = () => {
		const canvas = d3
			.select(CircularListFigure.current)
			.select("g.svgElement");
		const circularListCanvas = canvas
			.append("g")
			.attr("class", className.circularList.canvas);
		const nodeGroup = circularListCanvas
			.selectAll("nodes")
			.data(_data)
			.enter()
			.append("g")
			.attr("class", className.circularList.node)
			.attr("transform", (d, i) => translate(scale(i), 0))
			.attr("y", 0);
		insertArrowDefinitions(
			circularListCanvas,
			className.circularList.arrow,
			10,
			0,
			4,
			4,
			"auto",
			arrowFillColor,
		);
		const dataField = nodeGroup
			.append("g")
			.attr("class", className.circularList.dataField);
		const dataFieldRectangle = dataField
			.append("rect")
			.attr("width", nodeWidth)
			.attr("height", nodeHeight)
			.attr("stroke", strokeColor)
			.attr("fill", dataFieldFill ? dataFieldFill : fill);
		const dataFieldText = dataField
			.append("text")
			.attr("font-family", fontFamily)
			.attr("text-anchor", "middle")
			.attr("x", nodeWidth / 2)
			.attr("y", nodeHeight / 2)
			.attr("dy", "0.35em")
			.attr("font-size", "7px")
			.text((d) => d.val);
		if (isIndexed) {
			dataField
				.append("g")
				.attr("class", className.circularList.index)
				.append("text")
				.attr("font-family", fontFamily)
				.attr("text-anchor", "middle")
				.attr("font-size", `${indexFieldFontSize}rem`)
				.attr("x", nodeWidth / 1.5)
				.attr("y", nodeHeight + 10)
				.text((d, i) => i);
		}

		const nextField = nodeGroup
			.append("g")
			.attr("class", className.circularList.nextField)
			.attr("transform", translate(scale.bandwidth(), 0));

		const nextFieldRectangle = nextField
			.append("rect")
			.attr("stroke", "black")
			.attr("fill", nextFieldFill ? nextFieldFill : fill)
			.attr("width", nodeWidth / 2)
			.attr("height", nodeHeight);

		const nodeLinks = nodeGroup
			.append("g")
			.attr("class", className.circularList.link);
		nodeLinks
			.filter((d, i) => i !== _data.length - 1)
			.append("line")
			.attr("stroke", linkColor)
			.attr("x1", nodeWidth + nodeWidth / 4)
			.attr("y1", nodeHeight / 2)
			.attr("x2", nodeWidth + scale.bandwidth())
			.attr("y2", nodeHeight / 2)
			.attr("marker-end", `url(#${className.circularList.arrow})`);

		// circle at end of links
		nodeLinks
			.append("circle")
			.attr("fill", "black")
			.attr("r", 1.5)
			.attr("cx", nodeWidth + nodeWidth / 4)
			.attr("cy", nodeHeight / 2);

		// last node link
		nodeLinks
			.filter((d, i) => i === _data.length - 1)
			.append("path")
			.attr("fill", "none")
			.attr("stroke", linkColor)
			.attr("marker-end", `url(#${className.circularList.arrow})`)
			.attr("d", () => {
				const M1 = nodeWidth + nodeWidth / 4;
				const M2 = nodeHeight / 2;
				const H1 = nodeWidth + scale.bandwidth();
				const V1 = -nodeHeight / 2;
				const H2 = -_svg.width + margins[3] / 2;
				const V3 = nodeHeight / 4;
				const H3 = -_svg.width + margins[3];
				return `M ${M1} ${M2}, H ${H1}, V ${V1} H ${H2} V ${V3} H ${H3}`;
			});

		const rootPointer = circularListCanvas
			.append("g")
			.attr(
				"class",
				`${className.circularList.root} ${className.circularList.link}`,
			)
			.attr(
				"transform",
				translate(-scale.bandwidth() / 2, scale.bandwidth() / 4),
			);
		// root pointer text
		rootPointer
			.append("text")
			.attr("font-family", fontFamily)
			.attr("text-anchor", "start")
			.attr("x", -nodeWidth / 8)
			.attr("y", _svg.height + margins[2] / 3)
			.attr("dx", "-0.2em")
			.attr("font-size", "7px")
			.text(name);
		// root pointer link
		rootPointer
			.append("path")
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("d", () => {
				const m1 = -nodeWidth / 8;
				const m2 = _svg.height;
				const H1 = margins[3] / 2;
				const V1 = nodeHeight / 3;
				return `M ${m1},${m2} V ${V1} H ${H1}`;
			})
			.attr("marker-end", `url(#${className.circularList.arrow})`);

		// annotations
		nextField
			.filter((d) => d.ant)
			.append("g")
			.attr("class", className.circularList.annotation)
			.append("text")
			.attr("text-anchor", "middle")
			.style("font-size", "8px")
			.attr("x", -scale.bandwidth() / 4)
			.attr("y", -margins[0] / 2)
			.text((d) => d.ant);
	};

	useEffect(() => {
		if (CircularListFigure.current) renderCicularList();
	});
	return (
		<Base
			id={CircularListFigure}
			type={"CircularList"}
			width={width}
			height={height}
			containerWidth={containerWidth}
			containerHeight={containerHeight}
			margins={margins}
		/>
	);
};
