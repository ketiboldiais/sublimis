import React, { useRef, useEffect } from "react";
import { isObjectLiteral } from "../utils/isObjectLiteral/isObjectLiteral";
import { svg } from "../utils/svg/svg";
import { Base } from "../base/Base";
import * as d3 from "d3";
import { translate } from "../utils/translate/translate";

const formatData = (arr = []) => {
	let data = [];
	for (let i = 0; i < arr.length; i++) {
		if (isObjectLiteral(arr[i])) {
			data.push(arr[i]);
		} else {
			let queuer = { val: arr[i] };
			data.push(queuer);
		}
	}
	return data;
};

const setDimensions = (length) => {
	let svgWidth, svgHeight, containerWidth, containerHeight;
	switch (length) {
		case 1:
			svgWidth = 120;
			svgHeight = 120;
			containerWidth = 20;
			containerHeight = 20;
			break;
		case 2:
			svgWidth = 170;
			svgHeight = 170;
			containerWidth = 25;
			containerHeight = 20;
			break;
		case 3:
			svgWidth = 210;
			svgHeight = 210;
			containerWidth = 30;
			containerHeight = 20;
			break;
		case 4:
			svgWidth = 300;
			svgHeight = 300;
			containerWidth = 35;
			containerHeight = 20;
			break;
		case 5:
			svgWidth = 350;
			svgHeight = 350;
			containerWidth = 40;
			containerHeight = 20;
			break;
		case 6:
			svgWidth = 410;
			svgHeight = 410;
			containerWidth = 45;
			containerHeight = 20;
			break;
		case 7:
			svgWidth = 440;
			svgHeight = 440;
			containerWidth = 50;
			containerHeight = 20;
			break;
		case 8:
			svgWidth = 480;
			svgHeight = 480;
			containerWidth = 55;
			containerHeight = 20;
			break;
		case 9:
			svgWidth = 510;
			svgHeight = 510;
			containerWidth = 60;
			containerHeight = 20;
			break;
		case 10:
			svgWidth = 550;
			svgHeight = 550;
			containerWidth = 70;
			containerHeight = 20;
			break;
		case 11:
			svgWidth = 640;
			svgHeight = 640;
			containerWidth = 75;
			containerHeight = 20;
			break;
		case 12:
			svgWidth = 720;
			svgHeight = 720;
			containerWidth = 80;
			containerHeight = 20;
			break;
		case 13:
			svgWidth = 830;
			svgHeight = 830;
			containerWidth = 85;
			containerHeight = 20;
			break;
	}
	return {
		svgWidth,
		svgHeight,
		containerWidth,
		containerHeight,
	};
};

export const Queue = ({
	data = [],
	// default 300
	width = setDimensions(data.length).svgWidth,
	// default 300
	height = setDimensions(data.length).svgHeight,
	// default 45
	containerWidth = setDimensions(data.length).containerWidth,
	// default 15
	containerHeight = 20,
	margins = [60, 30, 20, 30],
}) => {
	const queueFigure = useRef();
	const _svg = svg(width, height, margins);
	const _data = formatData(data);
	const frameCount = _data.length;
	const xScale = d3
		.scaleBand()
		.domain(d3.range(frameCount))
		.range([0, _svg.width])
		.paddingInner(0.1);
	const yScale = d3
		.scaleBand()
		.domain(d3.range(frameCount))
		.range([_svg.height, 0]);

	useEffect(() => {
		const canvas = d3.select(queueFigure.current).select("g.svgElement");
		const queueGroup = canvas
			.append('g')
			.attr('class', 'queue')
			.selectAll("g.queuers")
			.data(_data)
			.enter()
			.append("g")
			.attr("class", d => `queuer ${d.focus ? "focus-" + d.focus : ""}`)
			.attr("transform", (d, i) => translate(xScale(i), 0));
		const queuerRectangle = queueGroup
			.append('g')
			.attr('class', 'queuer-data-field')
			.append("rect")
			.attr("width", xScale.bandwidth())
			.attr("height", yScale.bandwidth())
			.attr("fill", "white")
			.attr("stroke", "black");
		const queuerText = queueGroup
			.append('g')
			.attr('class', 'queue-data')
			.append("text")
			.attr("text-anchor", "middle")
			.attr("fill", "black")
			.attr("x", xScale.bandwidth() / 2)
			.attr("y", yScale.bandwidth() / 2)
			.attr("dy", "0.4em")
			.text((d) => d.val);
		const indexGroup = queueGroup
			.append('g')
			.attr('class', 'queuer-index-field')
		// rectangle for index
		indexGroup
			.append("rect")
			.attr("width", xScale.bandwidth())
			.attr("height", yScale.bandwidth() / 2)
			.attr("y", yScale.bandwidth())
			.attr("fill", "white")
			.attr("stroke", "black");
		// index text
		indexGroup
			.append("text")
			.attr("text-anchor", "middle")
			.attr("fill", "black")
			.attr("x", xScale.bandwidth() / 2)
			.attr("y", yScale.bandwidth() + yScale.bandwidth() / 3)
			.text((d, i) => i);
		const annotation = queueGroup
			.filter((d) => d.ant)
			.append("g")
			.attr("class", "queue-annotation")
			.append("text")
			.attr("text-anchor", "middle")
			.attr("x", xScale.bandwidth() / 2)
			.attr("y", -4)
			.text((d) => d.ant);
	});
	return (
		<Base
			id={queueFigure}
			width={width}
			height={height}
			containerWidth={containerWidth}
			containerHeight={containerHeight}
			margins={margins}
		/>
	);
};
