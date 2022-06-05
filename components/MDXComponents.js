import Image from "next/image";
import ImgStyles from "../styles/image.module.css";
import Link from "next/link";
import { Fig } from "./Fig";

import Header from "./Header";
const MDXComponents = {
	a: (props) => (
		<a href={props.href} target="_blank">
			{props.children}
		</a>
	),
	img: (props) => (
		<div>
			<figure className={ImgStyles.fig}>
				<Image
					{...props}
					alt={props.alt}
					layout="fill"
					objectFit="contain"
				/>
			</figure>
			<figcaption className={ImgStyles.figcaption}>{props.alt}</figcaption>
		</div>
	),
	Link,
	Fig,
	del: (props) => <small>{props.children}</small>,
	Metadata: (props) => (
		<Header
			title={props.title}
			description={props.description}
			keywords={props.keywords}
		/>
	),
};

export default MDXComponents;
