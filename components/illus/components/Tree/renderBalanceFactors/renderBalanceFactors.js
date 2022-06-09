import { attrs } from "../../utils/attrs/attrs";
import { calculateBalanceFactor } from "../calculateBalanceFactor/calculateBalanceFactor";
export const renderBalanceFactors = (
	selection,
	data,
	radius,
	balanceFactorFontSize,
	balancedTextColor,
	imbalancedTextColor,
	offsetX=0,
	offsetY=0,
) => {
	const bfNums = selection
		.append("g")
		.attr("class", "treeBalanceFactorMark");
	const bfNumText = bfNums
		.selectAll("text")
		.data(data)
		.enter()
		.filter((d) => !d.data.display)
		.filter((d) => !d.data.type)
		.append("text")
		.text((d) => calculateBalanceFactor(d));
	attrs(bfNumText, {
		class: (d) => {
			if (Math.abs(calculateBalanceFactor(d)) > 1) {
				return `balanceFactorImbalanced`;
			} else {
				return `balanceFactorBalanced`;
			}
		},
		x: (d) => d.x - offsetX,
		y: (d) => d.y - offsetY,
		dy: -radius - radius / 2,
		"text-anchor": "middle",
		fill: (d) => {
			if (Math.abs(calculateBalanceFactor(d)) > 1) {
				return imbalancedTextColor;
			} else {
				return balancedTextColor;
			}
		},
		"font-size": balanceFactorFontSize,
	});
};
