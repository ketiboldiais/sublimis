import React from "react";
import Image from "next/image";
import styles from "../styles/Fig.module.css";

const Fig = ({
	link,
	caption = "Figure",
	width = 30,
	height = 30,
	imwidth = 150,
	imheight = 150,
	layout = "responsive",
	fit = "cover",
}) => {
	return (
		<figure
			className={styles.fig}
			style={{ width: `${width}%`, height: `${height}%` }}>
			<Image
				src={link}
				className="figureImage"
				alt={caption}
				width={imwidth}
				height={imheight}
				layout={layout}
				objectFit={fit}
			/>
			<figcaption>{caption}</figcaption>
		</figure>
	);
};

export default Fig;
