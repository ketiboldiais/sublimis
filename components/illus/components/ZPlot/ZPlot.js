import React, { useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PerspectiveCamera } from "three";
import { AxesHelper } from "three";
import * as THREE from "three";
import { GridHelper } from "three";

function Plot({ paramFunction, scale, segments }) {
	const ref = useRef();
	const graphGeometry = new ParametricGeometry(
		paramFunction,
		segments,
		segments,
		true,
	);
	return (
		<mesh ref={ref} scale={scale} geometry={graphGeometry}>
			<meshNormalMaterial side={THREE.DoubleSide} />
		</mesh>
	);
}

const CameraController = () => {
	const { camera, gl } = useThree();
	useEffect(() => {
		const controls = new OrbitControls(camera, gl.domElement);
		controls.minDistance = 5;
		controls.maxDistance = 20;
		return () => {
			controls.dispose();
		};
	}, [camera, gl]);
	return null;
};

const CameraHelper = () => {
	const camera = new PerspectiveCamera(50, 1, 1, 3);
	return <cameraHelper args={[camera]} />;
};

const Axes = () => {
	const _axes = new AxesHelper(1);
	return <Axes args={_axes} />;
};

export function ZPlot({
	cameraParams = {
		fov: 60,
		position: [12, 5, 12],
		near: 0.1,
		far: 30,
	},
	z = (x, y) => Math.sin(Math.sqrt(x ** 2 + y ** 2)),
	segments = 100,
	xMin = -10,
	gridColor = "lightgrey",
	xMax = 10,
	xRange = xMax - xMin,
	yMin = -10,
	yMax = 10,
	yRange = yMax - yMin,
	scale = 0.3,
	size = [500, 500],
}) {
	const canvasSize = { width: size[0], height: size[1] };
	var paramFunction = function (x, y, target) {
		x = xRange * x + xMin;
		y = yRange * y + yMin;
		var zVal = z(x, y);
		if (isNaN(zVal)) return target.set(0, 0, 0);
		else return target.set(x, zVal, y);
	};
	return (
		<div className="illus">
			<div style={canvasSize}>
				<Canvas
					camera={cameraParams}
					onCreated={({ camera }) => camera.lookAt(0, 0, 0)}>
					<CameraController />
					<pointLight position={[0, 250, 0]} color={0xffffff} />
					<primitive object={new AxesHelper(10)} />
					<primitive
						object={new GridHelper(10, 20, gridColor, gridColor)}
					/>
					<Plot
						paramFunction={paramFunction}
						scale={scale}
						segments={segments}
					/>
				</Canvas>
			</div>
		</div>
	);
}
