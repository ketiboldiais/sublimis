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
		<div className={toggleStyles.container}>
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
				{active ? (
					<svg viewBox="0 0 34.85 34.85">
						<g fill="var(--red)">
							<path d="M17.424 26.788c-5.163 0-9.363-4.2-9.363-9.363 0-5.164 4.2-9.364 9.363-9.364s9.363 4.201 9.363 9.364c.001 5.163-4.2 9.363-9.363 9.363zm0-17.727c-4.611 0-8.363 3.752-8.363 8.364 0 4.611 3.752 8.363 8.363 8.363s8.363-3.752 8.363-8.363c.001-4.612-3.751-8.364-8.363-8.364zM17.424 4.982a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 1 0v3.982c0 .277-.223.5-.5.5zM17.424 34.85a.5.5 0 0 1-.5-.5v-3.982a.5.5 0 0 1 1 0v3.982a.5.5 0 0 1-.5.5zM4.482 17.925H.5a.5.5 0 0 1 0-1h3.981a.5.5 0 0 1 .001 1zM34.349 17.925h-3.982a.5.5 0 0 1 0-1h3.982a.5.5 0 0 1 0 1zM8.274 8.771a.502.502 0 0 1-.354-.146L5.104 5.811a.5.5 0 0 1 .707-.707l2.816 2.814a.5.5 0 0 1-.353.853zM29.393 29.893a.502.502 0 0 1-.354-.146l-2.816-2.817a.5.5 0 0 1 .707-.707l2.816 2.817a.5.5 0 0 1-.353.853zM5.458 29.893a.5.5 0 0 1-.354-.853l2.816-2.817a.5.5 0 0 1 .707.707l-2.816 2.817a.502.502 0 0 1-.353.146zM26.577 8.771a.5.5 0 0 1-.354-.853l2.816-2.814a.5.5 0 0 1 .707.707L26.93 8.625a.494.494 0 0 1-.353.146z" />
						</g>
					</svg>
				) : (
					<svg viewBox="0 0 600 600">
						<path
							d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"
							fill="var(--lavender)"
						/>
					</svg>
				)}
			</label>
		</div>
	);
}
