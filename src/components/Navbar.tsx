export default function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-container">
                <a href="/" className="logo">ASCII Studio</a>
                <nav className="nav-links">
                    <a href="#">Home</a>
                    <a href="#">Features</a>
                    <a href="#">Examples</a>
                    <a href="#">Contact</a>
                </nav>
                <a className="github-btn"
                    href="https://github.com/itzmitto/ascii-art-website"
                    target="_blank"
                    rel="noopener noreferrer">GitHub</a>
            </div>
        </header>
    );
}