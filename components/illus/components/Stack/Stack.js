import React, { useRef, useEffect } from "react";
import { Base } from "../base/Base";
import * as d3 from "d3";
import {
	className,
	translate,
	svg,
	setValue,
	isObjectLiteral,
	setConditionalValue,
	setClassName,
} from "../utils";

const formatData = (arr = []) => {
	let data = [];
	for (let i = 0; i < arr.length; i++) {
		if (isObjectLiteral(arr[i])) {
			data.push(arr[i]);
		} else {
			let stackFrame = { val: arr[i] };
			data.push(stackFrame);
		}
	}
	return data;
};

export const Stack = ({
	data = [],
	width = 350,
	height = data.length * 10 + 70,
	frameWidth = 70,
	frameHeight = 20,
	scale=100,
	containerWidth=scale,
	containerHeight,
	marginTop=10,
	marginRight=10,
	marginBottom=10,
	marginLeft=10,
	margins = [marginTop, marginRight, marginBottom, marginLeft],
}) => {
	const stackFigure = useRef();
	const _svg = svg(width, height, margins);
	const _data = formatData(data);
	const frameCount = _data.length;
	const _scale = d3
		.scaleBand()
		.domain(_data)
		.range([0, frameCount * 25]);

	useEffect(() => {
		// set up group
		const canvas = d3.select(stackFigure.current).select("g.svgElement");
		const frameGroup = canvas
			.selectAll("g.frame")
			.data(_data)
			.enter()
			.append("g")
			.attr("class", className.stack.canvas)
			.attr("transform", (d) => translate(_svg.width / 2, _scale(d)));
		const frame = frameGroup
			.append("g")
			.attr("class", (d) => setClassName(d.focus, className.stack.frame));
		frame
			.append("rect")
			.attr("x", (d) =>
				setConditionalValue(d.popped, frameWidth / 2, -frameWidth / 2),
			)
			.attr("y", 0)
			.attr("fill", (d) => setValue(d.fill, "white"))
			.attr("stroke", (d) => setValue(d.stroke, "black"))
			.attr("opacity", (d) => setValue(d.popped, 1))
			.attr("height", frameHeight)
			.attr("width", frameWidth);
		frame
			.append("text")
			.attr("text-anchor", "middle")
			.attr("x", (d) => setConditionalValue(d.popped, frameWidth, 0))
			.attr("y", frameHeight / 2)
			.attr("dy", 5)
			.text((d) => `${d.val}`);
	});
	return (
		<Base
			id={stackFigure}
			width={width}
			height={height}
			containerWidth={containerWidth}
			containerHeight={containerHeight}
			margins={margins}
		/>
	);
};
