import { AboutType } from '../types';

type AboutProps = {
  about: AboutType;
}
export function About({ about }: AboutProps) {
  return (
    <section id="about">
      <div>
        <h2>About <span>Me</span></h2>
        <div class="content">
          <div class="photo">
            <img src="/img/photo.webp" width="350" height="350" alt="Erin Morelli" />
          </div>
          <div class="summary">
            {about.content.map((p, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: p }}></p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
