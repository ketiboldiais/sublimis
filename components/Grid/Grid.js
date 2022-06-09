export const Grid = ({ children, cols = 1, rows = 1, colgap=0, rowgap=0}) => {
	const colsize = `${100 / cols}%`;
	const rowsize = `${100 / rows}%`;
	const gridStyles = {
		display: "grid",
		gridTemplateColumns: `repeat(${cols}, ${colsize})`,
		gridTemplateRows: `repeat(${rows}, ${rowsize})`,
		gap: `${rowgap} ${colgap}`,
	};

	return (
		<div style={gridStyles}>
			{children.map((child) => {
				return <div key={child.props.id}>{child}</div>;
			})}
		</div>
	);
};
