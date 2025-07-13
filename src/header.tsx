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
      <span
        role="button"
        tabIndex={0}
        className="skip-nav"
        onKeyDown={scrollToTop}
        onClick={scrollToTop}>Skip to content</span>
      <h1 className="logo">
        <span
          role="button"
          tabIndex={0}
          onKeyDown={scrollToTop}
          onClick={scrollToTop}>Erin <span>Morelli</span></span>
      </h1>
      <div>
        <span
          role="button"
          className={`toggle ${navClass}`}
          tabIndex={0}
          onKeyDown={toggleMenu}
          onClick={toggleMenu}>
          Menu
        </span>
        <nav className={navClass} role="menu">
          <span
            role="menuitem"
            tabIndex={0}
            onKeyDown={scrollToSection(SectionName.TOP)}
            onClick={scrollToSection(SectionName.TOP)}>Home</span>
          <span
            role="menuitem"
            tabIndex={0}
            onKeyDown={scrollToSection(SectionName.ABOUT)}
            onClick={scrollToSection(SectionName.ABOUT)}>About</span>
          <span
            role="menuitem"
            tabIndex={0}
            onKeyDown={scrollToSection(SectionName.SKILLS)}
            onClick={scrollToSection(SectionName.SKILLS)}>Skills</span>
          <span
            role="menuitem"
            tabIndex={0}
            onKeyDown={scrollToSection(SectionName.PROJECTS)}
            onClick={scrollToSection(SectionName.PROJECTS)}>Projects</span>
          <span
            role="menuitem"
            tabIndex={0}
            onKeyDown={scrollToSection(SectionName.CONTACT)}
            onClick={scrollToSection(SectionName.CONTACT)}>Contact</span>
        </nav>
      </div>
    </header>
  );
}
