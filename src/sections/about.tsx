import { uid } from 'uid';
import { AboutType } from '../types';

type AboutProps = {
  about: AboutType;
}
export function About({ about }: Readonly<AboutProps>) {
  return (
    <section id="about">
      <div>
        <h2>About <span>Me</span></h2>
        <div className="content">
          <div className="photo">
            <img src="/img/photo.webp" width="350" height="350" alt="Erin Morelli" />
          </div>
          <div className="summary">
            {about.content.map((p) => (
              <p key={uid()} dangerouslySetInnerHTML={{ __html: p }}></p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
