import { useEffect, useState } from 'preact/compat';

export function Header() {
  const [navClass, setNavClass] = useState('');

  const toggleMenu = () => {
    if (navClass === '') {
      setNavClass('menu');
    } else {
      setNavClass('');
    }
  }

  useEffect(() => {
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

  return (
    <header>
      <a className="skip-nav" href="#top">Skip to content</a>
      <h1 className="logo">
        <a href="#" role="button">Erin <span>Morelli</span></a>
      </h1>
      <div>
        <div className={`toggle ${navClass}`} onClick={toggleMenu}>Menu</div>
        <nav className={navClass} role="menu">
          <a href="#top" role="menuitem">Home</a>
          <a href="#about" role="menuitem">About</a>
          <a href="#skills" role="menuitem">Skills</a>
          <a href="#projects" role="menuitem">Projects</a>
          <a href="#contact" role="menuitem">Contact</a>
        </nav>
      </div>
    </header>
  );
}
