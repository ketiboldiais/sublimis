import React from "react";
import styles from "../styles/Layout.module.css";
import { useState, useEffect } from "react";
import Nav from "./Nav";

const Layout = ({ children }) => {
	const [theme, setTheme] = useState("");
	useEffect(() => {
		let localTheme = window.localStorage.getItem("theme");
		setTheme(localTheme);
	}, []);

	const switchTheme = () => {
		const newTheme = theme === "dark" ? "light" : "dark";
		window.localStorage.setItem("theme", newTheme);
		setTheme(newTheme);
	}
	return (
		<div className={`${styles.mainContent} ${theme}`}>
			<Nav clickHandler={() => switchTheme()} theme={theme}/>
			<div className={styles.container}>
				<main className={styles.main}>{children}</main>
			</div>
		</div>
	);
};

export default Layout;
