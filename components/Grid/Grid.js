export const Grid = ({ children, cols = 1, rows = 1 }) => {
	const colsize = `${100 / cols}%`;
	const rowsize = `${100 / rows}%`;
	const gridStyles = {
		display: "grid",
		gridTemplateColumns: `repeat(${cols}, ${colsize})`,
		gridTemplateRows: `repeat(${rows}, ${rowsize})`,
	};

	return (
		<div style={gridStyles}>
			{children.map((child) => {
				return <div key={child.props.id}>{child}</div>;
			})}
		</div>
	);
};
