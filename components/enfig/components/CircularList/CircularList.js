import React, { useRef, useEffect } from "react";
import { isObjectLiteral } from "../utils/isObjectLiteral/isObjectLiteral";
import { svg } from "../utils/svg/svg";
import { Base } from "../base/Base";
import * as d3 from "d3";
import { translate } from "../utils/translate/translate";
import { insertArrowDefinitions } from "../utils/insertArrowDefinitions/insertArrowDefinitions";

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
	containerWidth = 80,
	containerHeight = 20,
	margins = [20, 25, 20, 20],
	isIndexed = true,
	arrowFillColor,
	linkColor,
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

	useEffect(() => {
		const canvas = d3
			.select(CircularListFigure.current)
			.select("g.svgElement");
		const nodeGroup = canvas
			.append("g")
			.attr("class", "circular-list")
			.selectAll("nodes")
			.data(_data)
			.enter()
			.append("g")
			.attr("class", "circular-list-node")
			.attr("transform", (d, i) => translate(scale(i), 0))
			.attr("y", 0);
		insertArrowDefinitions(
			canvas,
			"circular-list-arrow",
			10,
			0,
			4,
			4,
			"auto",
			arrowFillColor,
		);
		const dataField = nodeGroup
			.append("g")
			.attr("class", "node-data-field");
		const dataFieldRectangle = dataField
			.append("rect")
			.attr("class", "node-data-field-rectangle")
			.attr("width", nodeWidth)
			.attr("height", nodeHeight)
			.attr("stroke", "black")
			.attr("fill", "white");
		const dataFieldText = dataField
			.append("text")
			.attr("class", "node-data-field-text")
			.attr("text-anchor", "middle")
			.attr("x", nodeWidth / 2)
			.attr("y", nodeHeight / 2)
			.attr("dy", "0.35em")
			.attr("font-size", "7px")
			.text((d) => d.val);
		if (isIndexed) {
			dataField
				.append("text")
				.attr("class", "node-index-text")
				.attr("text-anchor", "middle")
				.attr("fill", "black")
				.style("font-size", "7px")
				.attr("x", nodeWidth / 1.5)
				.attr("y", nodeHeight + 10)
				.text((d, i) => i);
		}

		const nextField = nodeGroup
			.append("g")
			.attr("class", "node-next-field")
			.attr("transform", translate(scale.bandwidth(), 0));

		const nextFieldRectangle = nextField
			.append("rect")
			.attr("stroke", "black")
			.attr("fill", "white")
			.attr("width", nodeWidth / 2)
			.attr("height", nodeHeight);

		const nodeLinks = nodeGroup
			.filter((d, i) => i !== _data.length - 1)
			.append("line")
			.attr("class", "circular-list-link")
			.attr("stroke", linkColor)
			.attr("x1", nodeWidth + nodeWidth / 4)
			.attr("y1", nodeHeight / 2)
			.attr("x2", nodeWidth + scale.bandwidth())
			.attr("y2", nodeHeight / 2)
			.attr("marker-end", "url(#circular-list-arrow)");

		const lastNodeLink = nodeGroup
			.filter((d, i) => i === _data.length - 1)
			.append("path")
			.attr("class", "circular-list-link")
			.attr("fill", "none")
			.attr("stroke", linkColor)
			.attr("marker-end", "url(#circular-list-arrow)")
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

		const rootPointer = canvas
			.append("g")
			.attr("class", "root-pointer")
			.attr(
				"transform",
				translate(-scale.bandwidth() / 2, scale.bandwidth() / 4),
			);

		const rootPointerText = rootPointer
			.append("text")
			.attr("class", "root-pointer-text")
			.attr("text-anchor", "start")
			.attr("x", -nodeWidth / 8)
			.attr("y", _svg.height + margins[2] / 3)
			.attr("dx", "-0.2em")
			.attr("font-size", "7px")
			.text(name);

		const rootPointerLink = rootPointer
			.append("path")
			.attr("class", "circular-list-link root-pointer-link")
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("d", () => {
				const m1 = -nodeWidth / 8;
				const m2 = _svg.height;
				const H1 = margins[3] / 2;
				const V1 = nodeHeight / 3;
				return `M ${m1},${m2} V ${V1} H ${H1}`;
			})
			.attr("marker-end", "url(#circular-list-arrow)");

		const nodeLinkCircle = nodeGroup
			.append("circle")
			.attr('class', 'circular-list-pointer-start')
			.attr("r", 1.5)
			.attr("cx", nodeWidth + nodeWidth / 4)
			.attr("cy", nodeHeight / 2);

		const annotation = nextField
			.filter((d) => d.ant)
			.append("g")
			.attr("class", "linked-list-annotation")
			.append("text")
			.attr("text-anchor", "middle")
			.style("font-size", "8px")
			.attr("x", -scale.bandwidth() / 4)
			.attr("y", -margins[0] / 2)
			.text((d) => d.ant);
	});
	return (
		<Base
			id={CircularListFigure}
			width={width}
			height={height}
			containerWidth={containerWidth}
			containerHeight={containerHeight}
			margins={margins}
		/>
	);
};
