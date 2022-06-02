import Layout from "../components/Layout";
import React from "react";
import { MDXProvider } from "@mdx-js/react";
import "../styles/code.css";
import "../styles/globals.css";
import "../styles/figure.css";
import MDXComponents from "../components/MDXComponents";

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<MDXProvider components={MDXComponents}>
				<Component {...pageProps} />
			</MDXProvider>
		</Layout>
	);
}

export default MyApp;
