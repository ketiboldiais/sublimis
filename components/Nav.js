import React, { useState, useRef } from "react";
import navStyles from "../styles/Nav.module.css";
import Routes from "./Routes";
import Tree from "./TreeList";
import { Toggle } from "./Toggle/Toggle";

export const NavBody = ({ className }) => {
	const ref = useRef();
	const [navbarOpen, setNavbarOpen] = useState(false);
	const handleToggle = () => {
		setNavbarOpen((prev) => !prev);
	};
	return (
		<>
			<div className={navStyles.navControls}>
				<button
					className={
						navbarOpen
							? `${navStyles.pressed} ${navStyles.button}`
							: navStyles.button
					}
					onClick={handleToggle}
					ref={ref}>
					{navbarOpen
						? "Close Table of Contents"
						: "Open Table of Contents"}
				</button>
				<Toggle />
			</div>
			<div
				className={`${navStyles.navContent} ${
					navbarOpen ? navStyles.showNav : ""
				}`}>
				<Tree data={Routes} allLinks={true} clickHandler={handleToggle} />
			</div>
		</>
	);
};
