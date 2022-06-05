import React, { useRef, useEffect } from "react";
import { svg } from "../utils/svg/svg";
import { Base } from "../base/Base";
import * as d3 from "d3";
import { setValue } from "../utils/setValue/setValue";
import { attrs } from "../utils/attrs/attrs";
import { insertArrowDefinitions } from "../utils/insertArrowDefinitions/insertArrowDefinitions";
import { renderLevelMarks } from "../Tree/renderLevelMarks/renderLevelMarks";
import { renderDepthMarks } from "../Tree/renderDepthMarks/renderDepthMarks";
import { renderHeightMarks } from "../Tree/renderHeightMarks/renderHeightMarks";
import { renderBalanceFactors } from "../Tree/renderBalanceFactors/renderBalanceFactors";
import { calculateTreeSize } from "../Tree/calculateTreeSize/calculateTreeSize";
import { generateBinaryTreeData } from "./GenerateBinaryTreeData/generateBinaryTreeData";
import { className, getBackgroundColor } from "../utils";

export const BinaryTree = ({
	data = [[]],
	width = 300,
	height = 150,
	narrow = 0,
	containerWidth,
	containerHeight,
	marginTop = 20,
	marginLeft = 20,
	marginBottom = 20,
	marginRight = 20,
	fontFamily = "system-ui",
	margins = [
		marginTop,
		marginRight + narrow,
		marginBottom,
		marginLeft + narrow,
	],
	edgeLength = 100,
	isDirected = false,
	nodeRadius = 7,
	nodeTextColor = "black",
	nodeStrokeColor = "black",
	nodeFillColor = "white",
	markBalanceFactor = false,
	markHeight = false,
	markDepth = false,
	markLevels = false,
	nodeTextFontSize = 0.55,
	balancedTextColor = "black",
	imbalancedTextColor = "black",
	hideNodeCircles = false,
	edgeColor = "black",
	edgeThickness = 1,
	heightFontSize = 0.6,
	heightTextColor = "black",
	balanceFactorFontSize = 0.6,
	levelLineColor = "grey",
	levelTextColor = "grey",
	levelFontSize = 0.55,
}) => {
	const TreeFigure = useRef();
	const _svg = svg(width, height, margins);
	const _data = generateBinaryTreeData(data);
	const root = d3
		.stratify()
		.id((d) => (d.child.val ? d.child.val : d.child))
		.parentId((d) => (d.parent.val ? d.parent.val : d.parent))(_data);
	const _edgeLength = setValue(edgeLength, calculateTreeSize(root));
	const treeStructure = d3
		.tree()
		.size([_svg.width - narrow, _edgeLength])
		.separation((a, b) => (a.parent === b.parent ? 1 : 1.1));
	treeStructure(root);

	useEffect(() => {
		const canvas = d3.select(TreeFigure.current).select("g.svgElement");
		const tree = canvas
			.append("g")
			.attr("class", className.binaryTree.canvas);
		if (isDirected) {
			insertArrowDefinitions(
				canvas,
				className.binaryTree.arrowURL,
				25,
				0,
				5,
				5,
				"auto",
				edgeColor,
			);
		}
		const links = tree
			.append("g")
			.attr("class", className.binaryTree.edgeGroup);
		const linkLines = links
			.selectAll("line")
			.data(root.links())
			.enter()
			.append("line");
		attrs(linkLines, {
			class: className.binaryTree.edge,
			display: (d) =>
				d.source.data.display || d.target.data.display
					? "none"
					: "initial",
			x1: (d) => d.source.x,
			y1: (d) => d.source.y,
			x2: (d) => d.target.x,
			y2: (d) => d.target.y,
			stroke: edgeColor,
			"stroke-opacity": (d) => setValue(d.target.data.opacity, 1),
			"marker-end": "url(#arrow_end)",
			"stroke-width": edgeThickness,
		});

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

		const nodes = tree
			.selectAll("circles")
			.data(root.descendants())
			.enter()
			.append("g")
			.attr("class", (d) => {
				if (d.data.child && d.data.child.focus) {
					return `${className.binaryTree.node} ${d.data.child.focus}`;
				} else if (d.data.focus) {
					return `${className.binaryTree.node} ${d.data.focus}`;
				} else {
					return className.binaryTree.node;
				}
			});

		if (!hideNodeCircles) {
			const nodeCircles = nodes
				.filter((d) => !d.data.display)
				.filter((d) => !d.data.noCircle)
				.filter((d) => !d.data.type)
				.append("circle")
				.attr("class", (d) =>
					d.height === 0
						? className.binaryTree.leaf
						: className.binaryTree.branch,
				);
			attrs(nodeCircles, {
				cx: (d) => d.x,
				cy: (d) => d.y,
				r: nodeRadius,
				stroke: (d) => {
					if (hideNodeCircles) {
						return "none";
					} else if (d.data.focus) {
						return nodeFocusStrokeColor;
					} else {
						return nodeStrokeColor;
					}
				},

				fill: (d) => {
					if (hideNodeCircles) {
						return getBackgroundColor(TreeFigure);
					} else if (d.data.focus) {
						return nodeFocusFillColor;
					} else {
						return nodeFillColor;
					}
				},
			});
		}

		const nodeLabels = tree
			.append("g")
			.attr("class", className.binaryTree.textGroup);
		const dataField = nodeLabels
			.selectAll("dataFieldLabels")
			.data(root)
			.enter()
			.filter((d) => !d.data.display)
			.filter((d) => !d.data.label)
			.append("g")
			.attr("class", (d) =>
				d.height === 0
					? className.binaryTree.leafText
					: className.binaryTree.branchText,
			)
			.append("text")
			.text((d) => d.data.child.val || d.data.child);
		attrs(dataField, {
			"font-family": fontFamily,
			x: (d) => d.x,
			y: (d) => {
				if (d.data.noCircle) {
					return d.y + 18;
				} else if (d.data.type) {
					return d.y + nodeRadius;
				} else {
					return d.y;
				}
			},
			dy: "0.3em",
			opacity: (d) => setValue(d.data.opacity, 1),
			"text-anchor": "middle",
			fill: nodeTextColor,
			"font-size": `${nodeTextFontSize}rem`,
		});
	});
	return (
		<Base
			id={TreeFigure}
			type="BinaryTree"
			width={width}
			height={height}
			containerWidth={containerWidth}
			containerHeight={containerHeight}
			margins={margins}
		/>
	);
};
