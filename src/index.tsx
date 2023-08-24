import { render } from 'preact';
import { Header } from './header';
import { Footer } from './footer';
import * as Section from './sections';

import content from './assets/content.json';

import './style.scss';

export function App() {
	return (
		<>
			<Header />
			<main>
				<Section.Banner />
				<Section.About about={content.about} />
				<Section.Skills skills={content.skills} />
				<Section.Projects projects={content.projects} />
				<Section.Contact socials={content.socials} />
			</main>
			<Footer />
		</>
	);
}

render(<App />, document.getElementById('app'));
