import { Children } from "react";
import Styles from "./TableMatrix.module.css";

const getChildren = (childrenArray, targetIndex = 0) => {
	const result = Children.toArray(childrenArray)[
		targetIndex
	].props.children.filter((child) => child !== "\n");
	return result;
};

const formatData = (children, headers) => {
	const leftColumns = getChildren(children);
	let leftHeaders = [];

	for (let i = 0; i < leftColumns.length; i++) {
		let text = leftColumns[i].props.children[0];
		leftHeaders.push(text);
	}

	let cells = [];

	for (let i = 0; i < leftColumns.length; i++) {
		let rowDatum = getChildren(leftColumns[i]);
		let cleanRowData = getChildren(rowDatum, 1);
		if (cleanRowData.length > headers.length) {
			throw new Error(
				`More cells in row ${i} than there are headers. TableMatrix requires the number of cells per row to be the same as the number of headers.`,
			);
		}
		let cell = [];
		for (let j = 0; j < headers.length; j++) {
			let cellText = cleanRowData[j].props.children;
			cell.push(cellText);
		}
		cells.push(cell);
	}
	for (let i = 0; i < cells.length; i++) {
		cells[i].unshift(leftHeaders[i]);
	}
	return {
		headers,
		cells,
	};
};

export const TableMatrix = ({ children, headers }) => {
	const data = formatData(children, headers);
	return (
		<table className={"TableMatrix"}>
			<thead>
				<tr>
					<th className={"shifter"}></th>
					{data.headers.map((d) => (
						<th key={`${d}`}>{d}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.cells.map((d, i) => (
					<tr key={`row-${i}`}>
						{d.map((cell, j) => (
							<td key={`cell-${i}-${j}`}>{cell}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};
