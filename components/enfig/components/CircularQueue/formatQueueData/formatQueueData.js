import { isObjectLiteral } from "../../utils/isObjectLiteral/isObjectLiteral";

export const formatQueueData = (arr = []) => {
	let data = [];
	let datum;
	for (let i = 0; i < arr.length; i++) {
		if (isObjectLiteral(arr[i])) {
			datum = { ...arr[i], data: 1 };
			data.push(datum);
		} else {
			let queuer = { val: arr[i], data: 1, ...arr[i]};
			data.push(queuer);
		}
	}
	return data;
};
