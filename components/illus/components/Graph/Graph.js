import React, { useRef, useEffect } from "react";
import { svg } from "../utils/svg/svg";
import { Base } from "../base/Base";
import { attrs } from "../utils/attrs/attrs";
import { generateEdges } from "./generateEdges/generateEdges";
import { generateNodes } from "./generateNodes/generateNodes";
import * as d3 from "d3";

export const Graph = ({
	data = [[]],
	fontFamily = "system-ui",
	width = 500,
	height = 500,
	scale=100,
	containerWidth=scale,
	containerHeight,
	repulsion = 0.01,
	edgeLength = 50,
	collisionRadius = 10,
	margins = [50, 50, 50, 50],
	nodeRadius = 5,
	edgeColor = "#0080a7",
	edgeWidth = "",
	nodeFillColor = "#e3f7ca",
	nodeStrokeColor = edgeColor,
	nodeStrokeWidth = "",
	nodeTextColor = "",
	nodeTextFontSize = "0.8rem",
	nodeTextOffsetY=-11,
	nodeTextOffsetX=0,
}) => {
	const _graphREF = useRef();
	const _svg = svg(width, height, margins);
	const edges = generateEdges(data);
	const nodes = Object.values(generateNodes(data, edges));
	const networkCenter = d3
		.forceCenter()
		.x(_svg.width / 2)
		.y(_svg.height / 2);
	const manyBody = d3.forceManyBody().strength(-150).distanceMax(100);
	const forceX = d3.forceX(_svg.width / 2).strength(repulsion);
	const forceY = d3.forceY(_svg.height / 2).strength(repulsion);
	const force = d3
		.forceSimulation(nodes)
		.force("charge", manyBody)
		.force("link", d3.forceLink(edges).distance(edgeLength).iterations(1))
		.force("center", networkCenter)
		.force("x", forceX)
		.force("y", forceY)
		.force("collision", d3.forceCollide().radius(collisionRadius));

	useEffect(() => {
		const canvas = d3.select(_graphREF.current).select("g.svgElement");
		const graph = canvas.append("g").attr("class", "Graph");
		const edgeEnter = graph
			.selectAll("g.edges")
			.data(edges)
			.enter()
			.append("g")
			.attr(
				"class",
				(d) => `graphEdge${d.focus ? ` ${d.focus}` : ""}`,
			);
		const edgeLines = edgeEnter.append("line");
		attrs(edgeLines, {
			stroke: edgeColor,
			strokeWidth: edgeWidth,
		});
		const nodeEnter = graph
			.selectAll("g.nodes")
			.data(nodes)
			.enter()
			.append("g")
			.attr("class", (d) =>
				d.focus ? `graph-node ${d.focus}` : `graph-node`,
			);

		const nodeCircles = nodeEnter
			.append("circle")
			.attr("r", (d) => (d.r ? d.r : nodeRadius))
			.attr("stroke", (d) => (d.stroke ? d.stroke : nodeStrokeColor))
			.attr("stroke-width", (d) =>
				d.strokeWidth ? d.strokeWidth : nodeStrokeWidth,
			)
			.attr("fill", (d) => (d.fill ? d.fill : nodeFillColor));

		const radial = nodeEnter
			.filter((d) => d.radial)
			.append("circle")
			.attr("class", "graphRadialNode")
			.attr("r", (d) =>
				typeof d.radial === "number" ? d.radial : radialRadius,
			)
			.attr("fill", (d) => (d.fill ? d.fill : nodeFillColor))
			.attr("stroke", (d) => (d.stroke ? d.stroke : nodeFillColor))
			.attr("fill-opacity", 0.3)
			.attr("stroke-width", 1)
			.attr("stroke-opacity", 0.6);

		const nodeText = nodeEnter.append("text").text((d) => d.id);

		attrs(nodeText, {
			"font-family": fontFamily,
			"text-anchor": "middle",
			fill: nodeTextColor,
			dy: (d) => (d.dy ? d.dy : nodeTextOffsetY),
			dx: (d) => (d.dx ? d.dy : nodeTextOffsetX),
			"font-size": nodeTextFontSize,
		});

		force.on("tick", function () {
			const edgeSelection = edgeEnter.selectAll("line");
			attrs(edgeSelection, {
				x1: (d) => d.source.x,
				y1: (d) => d.source.y,
				x2: (d) => d.target.x,
				y2: (d) => d.target.y,
			});
			nodeEnter.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
		});
	});
	return (
		<Base
			id={_graphREF}
			width={width}
			height={height}
			containerWidth={containerWidth}
			containerHeight={containerHeight}
			margins={margins}
		/>
	);
};
