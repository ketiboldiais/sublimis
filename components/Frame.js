export const Frame = ({ src, title, height = 300, width = 300 }) => {
	return <iframe src={src} title={title} height={height} width={width} />;
};
