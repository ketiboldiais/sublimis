import React, { useRef, useEffect } from "react";
import {
	svg,
	translate,
	className,
	setClassName,
	getPropertyValues,
	isObjectLiteral,
} from "../utils";
import { Base } from "../base/Base";
import * as d3 from "d3";

const formatData = (arr) => {
	let data = [];
	for (let row = 0; row < arr.length; row++) {
		for (let col = 0; col < arr[row].length; col++) {
			let element = { val: arr[row][col], row: row, col: col };
			data.push(element);
		}
	}
	return data;
};

export const Matrix = ({
	data = [[]],
	width = 500,
	height = 500,
	scale = 100,
	containerWidth = scale,
	fontSize = 2,
	containerHeight,
	margins = [30, 30, 30, 30],
	isRowIndexed = true,
	isColumnIndexed = true,
	isIndexed = isRowIndexed && isColumnIndexed,
}) => {
	const _matrixREF = useRef();
	const _svg = svg(width, height, margins);
	const _data = formatData(data);

	const rows = getPropertyValues(_data, "row");
	const numberOfRows = Math.max(...rows) + 1;

	const columns = getPropertyValues(_data, "col");
	const numberOfColumns = Math.max(...columns) + 1;

	const x = d3.scaleBand().domain(columns).range([0, _svg.width]).padding(0.04);
	const y = d3.scaleBand().domain(rows).range([0, _svg.height]).padding(0.04);

	const renderColumnIndices = (selection) => {
		const columnIndices = selection
			.selectAll(".columnIndices")
			.data(d3.range(numberOfColumns))
			.enter()
			.append("g")
			.attr('class', 'matrixIndices matrixColumnIndex')
			.attr("transform", (d) => translate(x(d), 0));

		columnIndices
			.append("text")
			.attr("x", x.bandwidth() / 2)
			.attr("font-size", `${fontSize - 0.5}rem`)
			.attr("dy", "-0.5em")
			.attr("text-anchor", "middle")
			.text((d) => d);
	};

	const renderRowIndices = (selection) => {
		const rowIndices = selection
			.selectAll(".rowIndices")
			.data(d3.range(numberOfRows))
			.enter()
			.append("g")
			.attr('class', 'matrixIndices matrixRowIndex')
			.attr("transform", (d) => translate(0, y(d)));

		rowIndices
			.append("text")
			.attr("font-size", `${fontSize - 0.5}rem`)
			.attr("y", y.bandwidth() / 2)
			.attr("dy", "0.32em")
			.attr("dx", "-0.8em")
			.attr("text-anchor", "middle")
			.text((d) => d);
	};

	const renderMatrix = () => {
		const canvas = d3.select(_matrixREF.current).select("g.svgElement");
		const matrixCanvas = canvas
			.append("g")
			.attr("class", className.matrix.canvas);
		const matrixElements = matrixCanvas
			.selectAll(".elements")
			.data(_data)
			.enter()
			.append("g")
			.attr("class", (d) =>
				setClassName(d.val.focus, className.matrix.element),
			)
			.attr("transform", (d) => translate(x(d.col), y(d.row)));
		matrixElements
			.append("rect")
			.attr("width", x.bandwidth())
			.attr("height", y.bandwidth())
			.attr("fill", "white")
			.attr("stroke", "black");
		// labels
		matrixElements
			.append("text")
			.attr("class", className.matrix.text)
			.attr("font-size", `${fontSize}rem`)
			.attr("dy", `0.32em`)
			.attr("text-anchor", "middle")
			.attr("x", x.bandwidth() / 2)
			.attr("y", y.bandwidth() / 2)
			.text((d) => (isObjectLiteral(d.val) ? d.val.val : d.val));
		// indices labeled
		if (isIndexed) {
			renderRowIndices(matrixCanvas);
			renderColumnIndices(matrixCanvas);
		} else if (isColumnIndexed) {
			renderColumnIndices(matrixCanvas);
		} else if (isRowIndexed) {
			renderRowIndices(matrixCanvas);
		}
	};

	useEffect(() => {
		if (_matrixREF.current) renderMatrix();
	});
	return (
		<Base
			id={_matrixREF}
			type="Matrix"
			width={width}
			height={height}
			containerWidth={containerWidth}
			containerHeight={containerHeight}
			margins={margins}
		/>
	);
};
