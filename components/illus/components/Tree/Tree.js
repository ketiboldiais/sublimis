import React, { useRef, useEffect } from "react";
import { Base } from "../base/Base";
import * as d3 from "d3";
import { renderLevelMarks } from "./renderLevelMarks/renderLevelMarks";
import { renderDepthMarks } from "./renderDepthMarks/renderDepthMarks";
import { renderHeightMarks } from "./renderHeightMarks/renderHeightMarks";
import { renderBalanceFactors } from "./renderBalanceFactors/renderBalanceFactors";
import { generateTreeData } from "./generateTreeData/generateTreeData";
import { calculateTreeSize } from "./calculateTreeSize/calculateTreeSize";
import {
	className,
	svg,
	setValue,
	insertArrowDefinitions,
	setClassName,
} from "../utils";

export const Tree = ({
	data = [],
	width = 250,
	height = 140,
	containerWidth,
	containerHeight,
	margins = [20, 20, 20, 20],
	fontFamily = "system-ui",
	edgeLength = null,
	isDirected = false,
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
	const TreeFigure = useRef();
	const _svg = svg(width, height, margins);
	const _data = generateTreeData(data);
	const root = d3
		.stratify()
		.id((d) => d.child)
		.parentId((d) => d.parent)(_data);
	const _edgeLength = setValue(edgeLength, calculateTreeSize(root));
	const treeStructure = d3
		.tree()
		.size([_svg.width, _edgeLength])
		.separation((a, b) => (a.parent === b.parent ? 1 : 1.1));
	treeStructure(root);

	const renderTree = () => {
		const canvas = d3.select(TreeFigure.current).select("g.svgElement");
		const tree = canvas.append("g").attr("class", className.tree.canvas);

		// if tree is directed, define arrows
		if (isDirected) {
			insertArrowDefinitions(
				canvas,
				className.tree.arrowURL,
				25,
				0,
				5,
				5,
				"auto",
				edgeColor,
			);
		}

		// links
		const links = tree.append("g").attr("class", className.tree.edgeGroup);
		links
			.selectAll("line")
			.data(root.links())
			.enter()
			.append("line")
			.attr("stroke", edgeColor)
			.attr("foo", (d) => console.log(d))
			.attr("x1", (d) => d.source.x)
			.attr("y1", (d) => d.source.y)
			.attr("x2", (d) => d.target.x)
			.attr("y2", (d) => d.target.y)
			.attr("display", (d) =>
				d.source.data.display || d.target.data.display
					? "none"
					: "initial",
			)
			.attr("marker-end", `url(#${className.tree.arrowURL})`);

		const nodeGroup = tree
			.append("g")
			.attr("class", className.tree.nodeGroup);

		const nodes = nodeGroup
			.selectAll("circles")
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
			.append("circle")
			.attr("fill", hideNodeCircles ? "inherit" : nodeColor)
			.attr("r", nodeRadius)
			.attr("cx", (d) => d.x)
			.attr("cy", (d) => d.y)
			.attr("stroke", hideNodeCircles ? "none" : nodeStrokeColor);

		// node labels
		nodes
			.filter((d) => !d.data.display)
			.filter((d) => !d.data.label)
			.append("text")
			.attr("font-family", fontFamily)
			.attr("font-size", nodeTextFontSize)
			.attr("x", (d) => d.x)
			.attr("y", (d) => {
				if (d.data.noCircle) {
					return d.y + 10;
				} else {
					return d.y;
				}
			})
			.attr("text-anchor", "middle")
			.attr("dy", "0.3em")
			.text((d) => d.id);

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
			);
	};

	useEffect(() => {
		if (TreeFigure.current) renderTree();
	});
	return (
		<Base
			id={TreeFigure}
			width={width}
			height={height}
			containerWidth={containerWidth}
			containerHeight={containerHeight}
			margins={margins}
		/>
	);
};
