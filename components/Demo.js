import Styles from "../styles/Layout.module.css";

export const Demo = ({ children, width="300px", height="300px"}) => {
	return (
		<div className={Styles.demo} style={{width, height}}>
			<div className={Styles.win}>
				<div className={Styles.closeBtn} />
				<div className={Styles.minBtn} />
				<div className={Styles.maxBtn} />
			</div>
			<div className={Styles.buffer}>{children}</div>
		</div>
	);
};
