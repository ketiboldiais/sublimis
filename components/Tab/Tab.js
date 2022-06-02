import TabStyle from "./Tab.module.css";
import { Children, isValidElement, useEffect, useState } from "react";

const Tab = ({ children, active = 0 }) => {
	const [activeTab, setActiveTab] = useState(active);
	const [tabsData, setTabsData] = useState([]);

	useEffect(() => {
		let data = [];
		Children.forEach(children, (element) => {
			if (!isValidElement(element)) return;
			const {
				props: { className, children },
			} = element;
			data.push({ className, children });
		});


		setTabsData(data);
	}, [children]);

	return (
		<div className={TabStyle.tab}>
			<ul className={TabStyle.tabNav}>
				{tabsData.map((section, idx) => (
					<li
						key={`${section}-${idx}`}
						href="#"
						className={
							idx === activeTab ? TabStyle.active : TabStyle.navLink
						}
						onClick={() => setActiveTab(idx)}>
						{section.className}
					</li>
				))}
			</ul>
			<div className={TabStyle.tabContent}>
				{tabsData[activeTab] && tabsData[activeTab].children}
			</div>
		</div>
	);
};

export default Tab;
