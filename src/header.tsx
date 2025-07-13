import { useEffect, useRef, useState } from 'preact/compat';
import { SectionName } from './constants';

export function Header() {
  const [navClass, setNavClass] = useState('');

  const header = useRef<HTMLElement>(null);
  const sections = useRef<NodeListOf<HTMLElement>>(null);

  const toggleMenu = () => {
    if (navClass === '') {
      setNavClass('menu');
    } else {
      setNavClass('');
    }
  }

  useEffect(() => {
    sections.current = document.querySelectorAll('section');

    const header = document.getElementsByTagName('header')[0];
    const sticky = header.offsetTop;

    window.onscroll = function () {
      if (window.scrollY > sticky) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }
  }, []);

  const scrollToSection = (sectionName: SectionName) => () => {
    const section = [...sections.current.values()].find(s => s.id === sectionName);
    const headerOffset = header.current.clientHeight;

    window.scrollTo({
      top: section.offsetTop - headerOffset,
      behavior: 'smooth'
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <header ref={header}>
      <a className="skip-nav" onClick={scrollToTop}>Skip to content</a>
      <h1 className="logo">
        <a role="button" onClick={scrollToTop}>Erin <span>Morelli</span></a>
      </h1>
      <div>
        <a
          role="button"
          className={`toggle ${navClass}`}
          tabIndex={0}
          onKeyDown={toggleMenu}
          onClick={toggleMenu}>
          Menu
        </a>
        <nav className={navClass} role="menu">
          <span
            role="menuitem"
            onClick={scrollToSection(SectionName.TOP)}>Home</span>
          <span
            role="menuitem"
            onClick={scrollToSection(SectionName.ABOUT)}>About</span>
          <span
            role="menuitem"
            onClick={scrollToSection(SectionName.SKILLS)}>Skills</span>
          <span
            role="menuitem"
            onClick={scrollToSection(SectionName.PROJECTS)}>Projects</span>
          <span
            role="menuitem"
            onClick={scrollToSection(SectionName.CONTACT)}>Contact</span>
        </nav>
      </div>
    </header>
  );
}
