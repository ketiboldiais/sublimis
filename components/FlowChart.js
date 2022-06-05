import dynamic from "next/dynamic";

const Graphviz = dynamic(() => import("graphviz-react"), { ssr: false });

export const FlowChart = ({
	data,
	height = 200,
	width = 200,
	type = "digraph",
	nodeShape = "plain",
	nodeHeight = 0.2,
	rankdir = "TB",
	arrowSize = 0.4,
	fontSize = 7,
	engine = "dot",
}) => {
	return (
		<figure className="flowchart">
			<Graphviz
				options={{
					className: "flowchart",
					// width: width,
					// height: height,
					zoom: false,
					useWorker: false,
					engine: engine,
					fit: true,
				}}
				dot={`
					${type} {
						rankdir=${rankdir}
						edge[arrowsize=${arrowSize}]
						node[shape=${nodeShape},height=${nodeHeight},fontsize=${fontSize}]
							${data}
					}
				`}
			/>
		</figure>
	);
};
