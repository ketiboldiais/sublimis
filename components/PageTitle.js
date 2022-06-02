import React from "react";
import styles from "../styles/PageTitle.module.css";

export const PageTitle = ({ text }) => {
	return (
		<div className={styles.titleContainer}>
			<h1 className={styles.titleText}>{text}</h1>
			<div className={styles.divider}/>
		</div>
	);
};

