import React, { useEffect, useRef } from "react";
import * as Three from "three";

export const Canvas = ({
	width = "300px",
	height = "300px",
	background = 0x000000,
	camera = { type: "Perspective", fov: 75, near: 0.1, far: 1000 },
}) => {
	const canvasRef = useRef(null);
	const render = () => {
		const scene = new Three.Scene();
		scene.background = new Three.Color(background);
		const _camera = new Three.PerspectiveCamera(
			camera.fov,
			canvasRef.current.clientWidth / canvasRef.current.clientHeight,
			camera.near,
			camera.far,
		);
		const renderer = new Three.WebGLRenderer();
		renderer.setSize(
			canvasRef.current.clientWidth,
			canvasRef.current.clientHeight,
		);
		canvasRef.current.appendChild(renderer.domElement);
		_camera.position.z = 5;
		renderer.render(scene, _camera);
	};

	useEffect(() => {
		if (canvasRef.current) render();
	}, []);

	return (
		<div className="illus">
			<div ref={canvasRef} style={{ width, height }} />
		</div>
	);
};
