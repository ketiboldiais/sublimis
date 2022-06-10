import { Canvas } from "@react-three/fiber";

export const Scene = ({
	size = [300, 300],
	width = size[0],
	height = size[1],
}) => {
	const styles = { width, height };
	return (
		<div className="illus">
			<div style={styles}>
				<Canvas>
					<pointLight position={[10, 10, 10]} />
					<mesh>
						<sphereBufferGeometry/>
					</mesh>
				</Canvas>
			</div>
		</div>
	);
};
