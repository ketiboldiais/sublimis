import React, { useRef, useEffect } from "react";
import { isObjectLiteral } from "../utils/isObjectLiteral/isObjectLiteral";
import { setConditionalValue } from "../utils/setConditionalValue/setConditionalValue";
import { setValue } from "../utils/setValue/setValue";
import { svg } from "../utils/svg/svg";
import { Base } from "../base/Base";
import * as d3 from "d3";
import { translate } from "../utils/translate/translate";

const formatData = (arr = []) => {
	let data = [];
	for (let i = arr.length - 1; i >= 0; i--) {
		if (isObjectLiteral(arr[i])) {
			data.push(arr[i]);
		} else {
			let stackFrame = { val: arr[i] };
			data.push(stackFrame);
		}
	}
	return data;
};

const setDimensions = (length) => {
	let svgWidth, svgHeight, containerWidth, containerHeight;
	switch (length) {
		case 1:
			svgWidth = 150;
			svgHeight = 150;
			containerWidth = 60;
			containerHeight = 6;
			break;
		case 2:
			svgWidth = 160;
			svgHeight = 160;
			containerWidth = 60;
			containerHeight = 10;
			break;
		case 3:
			svgWidth = 170;
			svgHeight = 170;
			containerWidth = 60;
			containerHeight = 14;
			break;
		case 4:
			svgWidth = 180;
			svgHeight = 180;
			containerWidth = 60;
			containerHeight = 20;
			break;
		case 5:
			svgWidth = 190;
			svgHeight = 190;
			containerWidth = 60;
			containerHeight = 22;
			break;
	}
	return {
		svgWidth,
		svgHeight,
		containerWidth,
		containerHeight,
	};
};

export const Stack = ({
	data = [],
	width = 350,
	height = 170,
	frameWidth = 70,
	frameHeight = 20,
	containerWidth = setDimensions(data.length).containerWidth,
	containerHeight = setDimensions(data.length).containerHeight,
	margins = [10, 10, 10, 10],
}) => {
	const stackFigure = useRef();
	const _svg = svg(width, height, margins);
	const _data = formatData(data);
	const frameCount = _data.length;
	const scale = d3
		.scaleBand()
		.domain(_data)
		.range([0, frameCount * 25]);

	useEffect(() => {
		// set up group
		const canvas = d3.select(stackFigure.current).select("g.svgElement");
		const frameGroup = canvas
			.append("g")
			.attr("class", "stack")
			.selectAll("g.frame")
			.data(_data)
			.enter()
			.append("g")
			.attr("class", "stack-frame")
			.attr("transform", (d) => translate(_svg.width / 2, scale(d)));
		const frameRectangle = frameGroup
			.append("rect")
			.attr("class", "stack-frame-rectangle")
			.attr("x", (d) =>
				setConditionalValue(d.popped, frameWidth / 2, -frameWidth / 2),
			)
			.attr("y", 0)
			.attr("fill", (d) => setValue(d.fill, "white"))
			.attr("stroke", (d) => setValue(d.stroke, "black"))
			.attr("opacity", (d) => setValue(d.popped, 1))
			.attr("height", frameHeight)
			.attr("width", frameWidth);
		const frameText = frameGroup
			.append("text")
			.attr("class", "stack-frame-text")
			.attr("text-anchor", "middle")
			.attr("x", (d) => setConditionalValue(d.popped, frameWidth, 0))
			.attr("y", frameHeight / 2)
			.attr("dy", "0.35em")
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
