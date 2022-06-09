import React, { useEffect, useState } from "react";
import toggleStyles from "../../styles/Toggle.module.css";
import { setTheme } from "../Themes/Themes";

export function Toggle() {
	// false = dark mode because of the way I wrote the CSS
	const [active, setActive] = useState(false);
	// the opposite, for screen readers
	const [ariaActive, setAriaActive] = useState(true);
	let theme;
	if (typeof window !== "undefined") theme = localStorage.getItem("theme");

	const changeThemeAndToggle = () => {
		if (localStorage.getItem("theme") === "theme-dark") {
			setTheme("theme-light");
			setActive(true);
			setAriaActive(false);
		} else {
			setTheme("theme-dark");
			setActive(false);
			setAriaActive(true);
		}
	};

	const handleOnClick = () => {
		changeThemeAndToggle();
	};

	const handleKeypress = (e) => {
		changeThemeAndToggle();
	};

	useEffect(() => {
		if (localStorage.getItem("theme") === "theme-dark") {
			setActive(false);
			setAriaActive(true);
		} else if (localStorage.getItem("theme") === "theme-light") {
			setActive(true);
			setAriaActive(false);
		}
	}, [theme]);

	return (
		<div className="container--toggle">
			<input
				aria-label="dark mode toggle"
				role="switch"
				aria-checked={ariaActive}
				onKeyPress={handleKeypress}
				type="checkbox"
				id="toggle"
				className={toggleStyles.checkbox}
				onClick={handleOnClick}
				checked={active}
				readOnly
			/>
			<label htmlFor="toggle" className={toggleStyles.label}>
				<span className="toggle--label-background">
					{active ? "☀️ Light" : "🌔 Dark"}
				</span>
			</label>
		</div>
	);
}
