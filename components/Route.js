import Link from "next/link";

const Route = ({ to, text, clickHandler}) => {
	return <Link href={to} onClick={clickHandler}>{text}</Link>;
};

export default Route;
