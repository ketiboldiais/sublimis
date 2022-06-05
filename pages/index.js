import Head from "next/head";

export default function Home() {
	return (
		<div style={{height: "100vh"}}>
			<Head>
				<title>Sublimis</title>
				<meta name="keywords" content="math and cs notes" />
			</Head>
			<h1>Sublimis</h1>
			<p>
				Sublimis is a collection of some math and CS notes I've taken over
				the years. The collection comprises two volumes,{" "}
				<small>Review of Computer Science</small> and{" "}
				<small>Review of Mathematics</small>. These two volumes are then
				divided into topics (corresponding to a course I've taken),
				articles (a topic in that course), sections, and subsections. Click
				on the <i>Open Table of Contents</i> button for viewing.
			</p>
			<p>
				The notes come from a smorgasbord of sources: lectures, seminars,
				academic papers, books, YouTube videos, discussions with
				colleagues, and so on. Some of the notes come from quick scribbles
				on a napkin or haphazard typing on my phone's <i>Notes</i> app, the
				rest my erratic handwriting—as much as I enjoy working with
				computers, I grew up with pencil and paper.
			</p>
			<p>
				Why "Sublimis?" At the time, the lecture notes in front of me had
				"Sublimis" written in red (something about Kant, the sublime, and
				mathematical aesthetics). I couldn't think of a better domain name.
			</p>
			<p>I hope the notes prove useful.</p>
			<br />
			<p>
				<a href="https://ketiboldiais.com/" target="_blank">
					Ketib
				</a>
			</p>
		</div>
	);
}
