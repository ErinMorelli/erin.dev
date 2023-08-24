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
      <a class="logo" href="#">Erin <span>Morelli</span></a>
      <div>
        <div class={`toggle ${navClass}`} onClick={toggleMenu}>Menu</div>
        <nav class={navClass}>
          <a href="#top">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
