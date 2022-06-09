import { isObjectLiteral, isNotUndefined } from "../utils";

export const formatDotPlotData = (data) => {
	let _data = [];
	for (let i = 0; i < data.length; i++) {
		if (isObjectLiteral(data[i])) {
			if (isNotUndefined(data[i].val)) {
				_data.push(data[i]);
			} else {
				throw new Error(
					"Improper object literal data format. Expected format: {name: <name> val: <value>}",
				);
			}
		} else {
			let datum = { Name: i, Value: data[i] };
			_data.push(datum);
		}
	}
	return _data;
};