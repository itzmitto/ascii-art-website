export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <a href="#top" className="logo" aria-label="ASCII Studio home">
          ASCII Studio
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#top">Home</a>
          <a href="#features">Features</a>
          <a href="#converter">Converter</a>
          <a href="#examples">Examples</a>
        </nav>
        <a
          className="github-btn"
          href="https://github.com/itzmitto/ascii-art-website"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
