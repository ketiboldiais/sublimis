import { Children } from "react";
import Styles from "./Tbl.module.css";

const splitArray = (flatArray, numCols) => {
	const newArray = [];
	for (let c = 0; c < numCols; c++) {
		newArray.push([]);
	}
	for (let i = 0; i < flatArray.length; i++) {
		let mod = i % numCols;
		newArray[mod].push(flatArray[i]);
	}
	return newArray;
};

const Tabl = ({ children, headers = ["a", "b", "c"] }) => {
	const cells = Children.toArray(
		Children.toArray(children).filter((child) => child !== "\n")[0].props
			.children,
	).filter((child) => child !== "\n");
	const rows = splitArray(cells, headers.length);

	return (
		<table className={Styles.Tbl}>
			<thead>
				<tr>
					{headers.map((title) => {
						return <th key={title}>{title}</th>;
					})}
				</tr>
			</thead>
			<tbody>
				{rows.map((row) => {
					return (
						<tr>
							{row.map((cell) => {
								return <td>{cell}</td>;
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default Tabl;
