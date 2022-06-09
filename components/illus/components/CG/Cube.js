import React, { useEffect, useRef } from "react";
import * as Three from "three";

export const Cube = ({ width = "300px", height = "300px" }) => {
	const cubeRef = useRef(null);
	const render = () => {
		const scene = new Three.Scene();
		scene.background = new Three.Color(0x000000);
		const camera = new Three.PerspectiveCamera(
			75,
			cubeRef.current.clientWidth / cubeRef.current.clientHeight,
			0.1,
			1000,
		);
		const renderer = new Three.WebGLRenderer();
		renderer.setSize(
			cubeRef.current.clientWidth,
			cubeRef.current.clientHeight,
		);
		cubeRef.current.appendChild(renderer.domElement);

		const geometry = new Three.BoxGeometry();
		const material = new Three.MeshBasicMaterial({ color: 0x00ff00 });
		const cube = new Three.Mesh(geometry, material);
		scene.add(cube);
		camera.position.z = 5;

		// const animate = function () {
		// 	requestAnimationFrame(animate);
		// 	cube.rotation.x += 0.01;
		// 	cube.rotation.y += 0.01;

		// };
		// animate();
		renderer.render(scene, camera);
	};

	useEffect(() => {
		if (cubeRef.current) render();
	}, []);

	return (
		<div className="illus">
			<div ref={cubeRef} style={{ width, height }} />
		</div>
	);
};
