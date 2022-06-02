import Table2Style from "./Table2.module.css";
import { Children } from "react";

const Cells = ({ children }) => {
	const listLevel_1_children = Children.toArray(children)[0].props.children.filter(
		(child) => child !== "\n",
	);
	let leftCell;
	let rightCell;
	return (
		<>
			{Children.map(listLevel_1_children, (child) => {
				leftCell = child.props.children.filter(child => child !== "\n")[0];
				rightCell = child.props.children.filter(child => child !== "\n")[1];
				return (
					<tr>
						<td>{leftCell}</td>
						<td>{rightCell}</td>
					</tr>
				);
			})}
		</>
	);
};

const Table2Col = ({ children, col1="header1", col2="header2"}) => {
	return (
		<table className={Table2Style.container}>
			<thead>
				<tr>
					<th>{col1}</th>
					<th>{col2}</th>
				</tr>
			</thead>
			<tbody>
				<Cells children={children} />
			</tbody>
		</table>
	);
};

export default Table2Col;
