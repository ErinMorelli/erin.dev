import { uid } from 'uid';
import { SocialsType } from '../types';
import { ContactForm } from '../components';

type ContactProps = {
  socials: SocialsType;
}

export function Contact({ socials }: Readonly<ContactProps>) {
  return (
    <section id="contact">
      <div>
        <h2>Contact <span>Me</span></h2>
        <div className="content">
          <div className="socials">
            {socials.content.map((s) => (
              <a
                key={uid()}
                href={s.link}
                aria-label={s.title}
                target="_blank"
                rel="external"
              >
                <i className={`icon-${s.iconName}`}></i>
              </a>
            ))}
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
