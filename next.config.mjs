import createMDX from "@next/mdx";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkPrism from "remark-prism";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeSlug from "rehype-slug";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	images: {
		domains: ["res.cloudinary.com"],
	},
};

const withMDX = createMDX({
	extension: /\.mdx?$/,
	options: {
		providerImportSource: "@mdx-js/react",
		remarkPlugins: [
			remarkUnwrapImages,
			remarkMath,
			[remarkPrism, { plugins: ["line-numbers"] }],
			remarkGfm,
		],
		rehypePlugins: [[rehypeKatex, { strict: false }], rehypeSlug],
	},
});

export default withMDX(nextConfig);
