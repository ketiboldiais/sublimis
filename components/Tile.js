import Masonry from "react-masonry-css";

export const Tile = ({ children }) => {
	return (
		<Masonry
			breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
			className="my-masonry-grid"
			columnClassName="my-masonry-grid_column">
			{children}
		</Masonry>
	);
};
