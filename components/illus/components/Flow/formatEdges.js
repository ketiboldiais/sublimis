export const formatEdges = (data) => {
	let edges = [];
	let edge;
	let source;
	let target;
	let datum;
	for (let i = 0; i < data.length; i++) {
		datum = data[i];
		if (typeof datum[0] === "string" && typeof datum[1] === "string") {
			source = { label: datum[0] };
			target = { label: datum[1] };
		} else if (
			typeof datum[0] === "string" &&
			typeof datum[1] !== "string"
		) {
			source = { label: datum[0] };
			target = { label: datum[1].id, ...datum[1] };
		} else if (
			typeof datum[0] !== "string" &&
			typeof datum[1] === "string"
		) {
			source = { label: datum[0].id, ...datum[0] };
			target = { label: datum[1] };
		} else {
			source = { label: datum[0].id, ...datum[0] };
			target = { label: datum[1].id, ...datum[1] };
		}
		edge = { source, target };
		edges.push(edge);
	}
	return edges;
};
