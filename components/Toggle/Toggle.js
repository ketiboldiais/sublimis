import React, { useEffect, useState } from "react";
import toggleStyles from "../../styles/Toggle.module.css";
import { setTheme } from "../Themes/Themes";

export function Toggle() {
	const [togClass, setTogClass] = useState("dark");
	let theme;
	if (typeof window !== "undefined") {
		theme = localStorage.getItem("theme");
	}

	const handleOnClick = () => {
		if (localStorage.getItem("theme") === "theme-dark") {
			setTheme("theme-light");
			setTogClass("light");
		} else {
			setTheme("theme-dark");
			setTogClass("dark");
		}
	};

	useEffect(() => {
		if (localStorage.getItem("theme") === "theme-dark") {
			setTogClass("dark");
		} else if (localStorage.getItem("theme") === "theme-light") {
			setTogClass("light");
		}
	}, [theme]);

	return (
		<label htmlFor="toggle" className={toggleStyles.label}>
			<div className={toggleStyles.container}>
				{togClass === "light" ? (
					<input
						type="checkbox"
						id="toggle"
						className={toggleStyles.checkbox}
						onClick={handleOnClick}
						checked
					/>
				) : (
					<input
						type="checkbox"
						id="toggle"
						className={toggleStyles.checkbox}
						onClick={handleOnClick}
					/>
				)}
				<div className={toggleStyles.indicator}></div>
			</div>
		</label>
	);
}
