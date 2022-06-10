import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					{/* <link
						href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&display=swap&text=0123456789()"
						rel="stylesheet"></link> */}
				</Head>
				<body>
					<Main />
					<NextScript />
					<link
						href="https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500&display=swap"
						rel="stylesheet"
						media="print"
						onLoad={
							"this.onload=null;this.removeAttribute('media');"
						}></link>

					<link
						rel="stylesheet"
						href="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.css"
						integrity="sha384-A3N+UgNMKg9+LRsC2HUE0ECxFY7qhztVFORxHQZEPm7lnog2poqmm7CQ91wSEnBc"
						crossOrigin="anonymous"
						media="print"
						onLoad={"this.onload=null;this.removeAttribute('media');"}
					/>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
