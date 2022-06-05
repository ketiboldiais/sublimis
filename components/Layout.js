import React from "react";
import styles from "../styles/Layout.module.css";
import { NavBody } from "./Nav";

const Layout = ({ children }) => {
	return (
		<div className={styles.master}>
			<nav className={styles.navbar}>
				<NavBody />
			</nav>
			<main className={styles.page}>{children}</main>
		</div>
	);
};

export default Layout;
