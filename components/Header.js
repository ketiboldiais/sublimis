const Header = ({ title, description, keywords }) => {
	return (
		<>
			<title>{title}</title>
			<meta charSet="UTF-8" />
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
			<meta name="author" content="Ketib Oldiais" />
		</>
	);
};

export default Header;
