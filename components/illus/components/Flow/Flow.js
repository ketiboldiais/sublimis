import React, { useRef, useEffect } from "react";
import { formatEdges } from "./formatEdges";
import dagreD3 from "dagre-d3";
import { textwrap } from "d3-textwrap";
import { svg } from "../utils/svg/svg";
import { Base } from "../base/Base";
import * as d3 from "d3";
import { formatNodes } from "./formatNodes";

export const Flow = ({
	data = [],
	id = `${Date.now()}`,
	width = 800,
	height = 500,
	scale = 100,
	containerWidth = scale,
	containerHeight,
	margins = [50, 50, 50, 50],
	nodesep = 50,
	edgesep = 10,
	rankdir = "TB",
	ranker = "network-simplex",
	align,
}) => {
	const _flowREF = useRef();
	const _svg = svg(width, height, margins);

	const edges = formatEdges(data);
	const nodes = Object.values(formatNodes(edges));

	var g = new dagreD3.graphlib.Graph()
		.setGraph({})
		.setDefaultEdgeLabel(function () {
			return {};
		});

	nodes.forEach((node) => {
		g.setNode(node.label, { label: node.label, ...node });
	});

	g.nodes().forEach((n) => {
		let node = g.node(n);
		node.wrapId ? (node.id = node.wrapId) : "";
	});

	edges.forEach((edge) => {
		g.setEdge(edge.source.label, edge.target.label);
	});

	g.graph().nodesep = nodesep;
	g.graph().edgesep = edgesep;
	g.graph().rankdir = rankdir;
	g.graph().align = align;
	g.graph().ranker = ranker;

	useEffect(() => {
		if (_flowREF.current) {
			const canvas = d3.select(_flowREF.current).select("g.svgElement");
			const flow = canvas.append("g").attr("class", "Flow").attr("id", id);
			const render = new dagreD3.render();
			render(flow, g);
			flow
				.selectAll("g.node rect")
				.attr("fill", "white")
				.attr("stroke", "black");
			flow.selectAll("g.edgePaths path").attr("stroke", "black");

			function wrapper(text, h, w) {
				const wrap = textwrap()
					.bounds({ height: h, width: w })
					.method("tspans");
				text.call(wrap);
			}
			d3.selectAll("g#b text").attr("x", 90).call(wrapper, 400, 100);
		}
	});
	return (
		<Base
			id={_flowREF}
			width={width}
			height={height}
			containerWidth={containerWidth}
			containerHeight={containerHeight}
			margins={margins}
		/>
	);
};
