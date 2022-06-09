import React, { useRef, useEffect } from "react";
import { Base } from "../base/Base";
import * as d3 from "d3";
import { renderLevelMarks } from "../Tree/renderLevelMarks/renderLevelMarks";
import { renderDepthMarks } from "../Tree/renderDepthMarks/renderDepthMarks";
import { renderHeightMarks } from "../Tree/renderHeightMarks/renderHeightMarks";
import { renderBalanceFactors } from "../Tree/renderBalanceFactors/renderBalanceFactors";
import { calculateTreeSize } from "../Tree/calculateTreeSize/calculateTreeSize";
import { generateMTreeData } from "./generateMTreeData";
import {
	className,
	svg,
	setValue,
	setClassName,
	translate,
	insertArrowDefinitions,
} from "../utils";

export const MTree = ({
	data = [],
	label = "",
	width = 250,
	scale = 100,
	height = 140,
	tighten = 0,
	containerWidth = scale,
	containerHeight,
	margins = [20, 20 + tighten, 20, 20 + tighten],
	edgeLength = null,
	labelOffsetX = 0,
	labelOffsetY = 0,
	nodeRadius = 7,
	nodeColor = "#ffffff",
	edgeColor = "#000000",
	nodeStrokeColor = edgeColor,
	markBalanceFactor = false,
	markHeight = false,
	markDepth = false,
	markLevels = false,
	nodeTextFontSize = 8,
	balancedTextColor = edgeColor,
	imbalancedTextColor = edgeColor,
	heightFontSize = 7,
	heightTextColor = edgeColor,
	hideNodeCircles = false,
	balanceFactorFontSize = 7,
	levelLineColor = "grey",
	levelTextColor = "grey",
	levelFontSize = 7,
}) => {
	const _mtreeREF = useRef();
	const _svg = svg(width, height, margins);
	const _data = generateMTreeData(data);

	const root = d3
		.stratify()
		.id((d) => d.child.id)
		.parentId((d) => d.parent)(_data);
	const _edgeLength = setValue(edgeLength, calculateTreeSize(root));
	const treeStructure = d3
		.tree()
		.size([_svg.width, _edgeLength])
		.separation((a, b) => (a.parent === b.parent ? 1 : 1.1));
	treeStructure(root);

	const renderTree = () => {
		const canvas = d3.select(_mtreeREF.current).select("g.svgElement");
		const tree = canvas.append("g").attr("class", "MTree");

		insertArrowDefinitions(
			tree,
			"MTreeArrow",
			30,
			0,
			5,
			5,
			"auto",
			"initial",
		);

		// links
		const links = tree.append("g").attr("class", "MTreeEdges");
		links
			.selectAll("line")
			.data(root.links())
			.enter()
			.append("line")
			.attr("stroke", edgeColor)
			.attr("x1", (d) => d.source.x)
			.attr("y1", (d) => d.source.y)
			.attr("x2", (d) => d.target.x)
			.attr("y2", (d) => d.target.y)
			.attr("display", (d) =>
				d.source.data.display || d.target.data.display
					? "none"
					: "initial",
			)
			.attr("marker-end", "url(#MTreeArrow)");

		const nodeGroup = tree.append("g").attr("class", "MTreeNode");

		const nodes = nodeGroup
			.selectAll("mtreenodes")
			.data(root.descendants())
			.enter()
			.append("g")
			.attr("class", (d) => {
				if (d.height === 0) {
					return setClassName(d.data.focus, className.tree.leaf);
				} else {
					return setClassName(d.data.focus, className.tree.branch);
				}
			});

		// annotations
		const annotations = tree
			.append("g")
			.attr("class", className.tree.annotations);
		annotations
			.selectAll("text.annotate")
			.data(root)
			.enter()
			.filter((d) => d.data.ant)
			.append("text")
			.text((d) => d.data.ant)
			.attr("x", (d) => d.x)
			.attr("y", (d) => d.y - nodeRadius * 1.5)
			.attr("text-anchor", "middle")
			.attr("fill", "black")
			.style("font-size", "0.6rem");

		// node circles
		nodes
			.filter((d) => d.data.display !== "none")
			.filter((d) => !d.data.display)
			.filter((d) => !d.data.noCircle)
			.filter((d) => !d.data.type)
			.append("g")
			.attr("transform", (d) => translate(d.x - 10, d.y - 10))
			.selectAll("rects")
			.data((d) => d.data.child.keys)
			.enter()
			.append("rect")
			.attr("foo", (d) => console.log(d))
			.attr("height", 10)
			.attr("width", 10)
			.attr("x", (d, i) => i * 10)
			.attr("fill", hideNodeCircles ? "inherit" : nodeColor)
			.attr("stroke", hideNodeCircles ? "none" : nodeStrokeColor);

		// node labels
		nodes
			.filter((d) => !d.data.display)
			.filter((d) => !d.data.label)
			.append("g")
			.attr("font-size", nodeTextFontSize)
			.attr("transform", (d) => translate(d.x - 5, d.y))
			.selectAll("labels")
			.data((d) => d.data.child.keys)
			.enter()
			.append("text")
			.attr("text-anchor", "middle")
			.attr("font-size", "0.45rem")
			.attr("dy", "-0.3em")
			.attr("fill", "black")
			.attr("x", (d, i) => i * 10)
			.text((d) => d);

		if (markLevels)
			renderLevelMarks(
				tree,
				root,
				_svg,
				levelFontSize,
				levelTextColor,
				levelLineColor,
			);
		if (markDepth) renderDepthMarks(tree, root, nodeRadius);
		if (markHeight)
			renderHeightMarks(
				tree,
				root,
				nodeRadius,
				heightTextColor,
				heightFontSize,
			);
		if (markBalanceFactor)
			renderBalanceFactors(
				tree,
				root.descendants(),
				nodeRadius,
				balanceFactorFontSize,
				balancedTextColor,
				imbalancedTextColor,
				10,
				2,
			);
		if (label) {
			tree
				.append("g")
				.attr("class", "treeLabel")
				.attr(
					"transform",
					translate(
						_svg.width / 2 + labelOffsetX,
						_svg.height + labelOffsetY,
					),
				)
				.attr("font-size", levelFontSize + 2)
				.attr("text-anchor", "middle")
				.append("text")
				.text(label);
		}
	};

	useEffect(() => {
		if (_mtreeREF.current) renderTree();
	});
	return (
		<Base
			id={_mtreeREF}
			width={width}
			height={height}
			containerWidth={containerWidth}
			containerHeight={containerHeight}
			margins={margins}
		/>
	);
};
