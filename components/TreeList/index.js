import React from "react";
import Route from "../Route";

const Tree = ({ data = [], allLinks = false, clickHandler }) => {
	return (
		<ul>
			{data.map((tree, index) => (
				<TreeNode
					node={tree}
					key={index}
					allLinks={allLinks}
					clickFunction={clickHandler}
				/>
			))}
		</ul>
	);
};

const TreeNode = ({ node, allLinks, clickFunction}) => {
	return (
		<li onClick={clickFunction} className={`navEntry`}>
			{allLinks ? (
				<Route to={node.path} text={node.name} />
			) : (
				<div>{node.name}</div>
			)}
			<ul>
				<Tree data={node.children} allLinks={true} />
			</ul>
		</li>
	);
};

export default Tree;
