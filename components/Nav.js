import React, { useState, useRef } from "react";
import navStyles from "../styles/Nav.module.css";
import Routes from "./Routes";
import Tree from "./TreeList";

const Nav = ({ clickHandler, theme }) => {
	const ref = useRef();
	const [navbarOpen, setNavbarOpen] = useState(false);
	const handleToggle = () => {
		setNavbarOpen((prev) => !prev);
	};
	return (
		<nav className={navStyles.nav}>
			<div className={navStyles.headBar}>
				<button
					className={navbarOpen ? navStyles.pressed : navStyles.button}
					onClick={handleToggle}
					ref={ref}>
					{navbarOpen
						? "Close Table of Contents"
						: "Open Table of Contents"}
				</button>
				<div className={navStyles.themeToggleDiv}>
					<input type="checkbox" id="themeToggle" />
					<label
						htmlFor="themeToggle"
						onClick={clickHandler}
						theme={theme}></label>
				</div>
			</div>
			<div
				className={`${navStyles.navContent} ${
					navbarOpen ? navStyles.showNav : ""
				}`}>
				<Tree data={Routes} allLinks={true} clickHandler={handleToggle} />
			</div>
		</nav>
	);
};
export default Nav;
