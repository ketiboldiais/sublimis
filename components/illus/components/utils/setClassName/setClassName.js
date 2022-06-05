import { isNotNull } from "../isNotNull/isNotNull";
import { isNotUndefined } from "../isNotUndefined/isNotUndefined";

export const setClassName = (userInputClass, defaultClass) => {
	if (isNotUndefined(userInputClass) && isNotNull(userInputClass)) {
		return `${defaultClass} ${userInputClass}`;
	} else {
		return `${defaultClass}`;
	}
};
