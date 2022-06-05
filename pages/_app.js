import Layout from "../components/Layout";
import React, { useEffect } from "react";
import { MDXProvider } from "@mdx-js/react";
import "../styles/reset.css";
import "../styles/globals.css";
import "../styles/code.css";
import MDXComponents from "../components/MDXComponents";
import { keepTheme } from "../components/Themes/Themes";

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		keepTheme();
	})
	return (
		<Layout>
			<MDXProvider components={MDXComponents}>
				<Component {...pageProps} />
			</MDXProvider>
		</Layout>
	);
}

export default MyApp;
