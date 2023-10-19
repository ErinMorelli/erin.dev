export function Footer() {
  return (
    <footer>
      <small>
        <a
          rel="external license"
          className="license"
          href="https://creativecommons.org/licenses/by-nc/4.0/"
          title="Creative Commons Attribution-NonCommercial 4.0 International license"
          aria-label="Creative Commons Attribution-NonCommercial 4.0 International license"
        >
          <i className="icon-cc"></i>
          <i className="icon-cc-by"></i>
          <i className="icon-cc-nc"></i>
        </a> {new Date().getFullYear()} Erin Morelli.
      </small>
      <small>
        Made by me with <a
          href="https://preactjs.com/"
          rel="external nofollow noreferrer"
          target="_blank"
          aria-label="Preact"
        >Preact</a> and <a
          href="/humans.txt"
          rel="author"
          target="_blank"
          title="humans.txt"
          aria-label="humans.txt"
        >love</a> &hearts;.
      </small>
    </footer>
  );
}
