import Image from "next/image";
import ImgStyles from "../styles/image.module.css";
import Link from "next/link";
import { PageTitle } from "./PageTitle";
import { FlowChart } from "./FlowChart";
import { BinaryTree } from "./illus/components/BinaryTree/BinaryTree";
import { HTree } from "@enfig/HTree/HTree";
import { Matrix } from "@enfig/Matrix/Matrix";
import { PTree } from "@enfig/PTree/PTree";
import { LinkedList } from "./illus/components/LinkedList/LinkedList";
import { Plot3D } from "@enfig/Plot3D/Plot3D";
import { Sequence } from "@enfig/Sequence/Sequence";
import { CircularList } from "./illus/components/CircularList/CircularList";
import { CircularQueue } from "@enfig/CircularQueue/CircularQueue";
import { Graph } from "@enfig/Graph/Graph";
import { DoublyLinkedList } from "@enfig/DoublyLinkedList/DoublyLinkedList";
import { Stack } from "@enfig/Stack/Stack";
import { Queue } from "@enfig/Queue/Queue";
import { Tree } from "@enfig/Tree/Tree";
import { Plane } from "@enfig/Plane/Plane";
import { Fig } from "./Fig";
import { Plot } from "./illus/components/Plot/Plot";

import Header from "./Header";
const MDXComponents = {
	a: (props) => (
		<a href={props.href} target="_blank">
			{props.children}
		</a>
	),
	Graph,
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
	PTree,
	Fig,
	del: (props) => <small>{props.children}</small>,
	h1: (props) => <PageTitle text={props.children} />,
	BinaryTree,
	Plane,
	Plot,
	Stack,
	Queue,
	CircularQueue,
	DoublyLinkedList,
	LinkedList,
	CircularList,
	HTree,
	Tree,
	Sequence,
	Plot3D,
	FlowChart,
	Matrix,
	Metadata: (props) => (
		<Header
			title={props.title}
			description={props.description}
			keywords={props.keywords}
		/>
	),
};

export default MDXComponents;
