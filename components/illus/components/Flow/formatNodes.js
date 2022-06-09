export const formatNodes = (edges) => {
	let nodes = {};
	let _source, _target;
	edges.forEach(function (link) {
		if (typeof link.source === "string") {
			_source = { label: link.source };
		} else {
			_source = { label: link.source.label, ...link.source };
		}
		if (typeof link.target === "string") {
			_target = { label: link.target };
		} else {
			_target = { label: link.target.label, ...link.target };
		}
		link.target =
			nodes[link.target] || (nodes[link.target.label] = _target);
		link.source =
			nodes[link.source] || (nodes[link.source.label] = _source);
	});
	return nodes;
};
