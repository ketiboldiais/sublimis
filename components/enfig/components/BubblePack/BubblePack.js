import React, { useRef, useEffect } from "react";
import "./BubblePack.css";
import { translate } from "../utils/translate/translate";
import { svg } from "../utils/svg/svg";
import { getArrayMax } from "../utils/getArrayMax/getArrayMax";
import { getPropertyValues } from "../utils/getPropertyValues/getPropertyValues";
import { Base } from "../base/Base";
import * as d3 from "d3";

export const BubblePack = ({
	data = [],
	width = 420,
	height = 420,
	colorWeight = ["#e0fffe", "#f9fffe"],
	containerWidth = 80,
	containerHeight = 80,
	margins = [50, 50, 50, 50],
}) => {
	const BubblePackFigure = useRef();
	const _svg = svg(width, height, margins);
	const maxVal = getArrayMax(getPropertyValues(data, "val"));
	const circleCount = data.length;
	const stratify = d3
		.stratify()
		.id((d) => d.id)
		.parentId((d) => d.parent);
	const rootNode = stratify(data).sum((d) => d.val);
	const pack = d3.pack().size([_svg.width, _svg.height]).padding(5);
	const bubbleData = pack(rootNode).descendants();
	const circleFillColor = d3
		.scaleLinear()
		.domain([0, rootNode.height])
		.range(colorWeight);

	useEffect(() => {
		const canvas = d3
			.select(BubblePackFigure.current)
			.select("g.svgElement")
			.attr("class", "bubble-pack");
		const nodes = canvas
			.selectAll("g.nodes")
			.data(bubbleData)
			.enter()
			.append("g")
			.attr("class", "bubble-pack-circle-group")
			.attr("transform", (d) => translate(d.x, d.y));
		const circles = nodes
			.append("circle")
			.attr("r", (d) => d.r)
			.attr("class", "bubble-pack-circle")
			.attr("fill", (d) => circleFillColor(d.depth));
		const circleLabelNoChildren = nodes
			.filter((d) => !d.children)
			.append("text")
			.attr("text-anchor", "middle")
			.attr("dy", "0.3em")
			.attr("class", "bubble-pack-circle-label leaf-node-label")
			.text((d) => d.data.id);
		const circleLabelHasChildren = nodes
			.filter((d) => d.children)
			.append("text")
			.attr("text-anchor", "middle")
			.attr("dy", (d) => -d.r - 10)
			.attr("class", "bubble-pack-circle-label branch-node-label")
			.text((d) => d.id);
	});
	return (
		<Base
			id={BubblePackFigure}
			width={width}
			height={height}
			containerWidth={containerWidth}
			containerHeight={containerHeight}
			margins={margins}
		/>
	);
};
