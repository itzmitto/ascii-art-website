export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-content">
        <span className="hero-badge">✦ Fast • Browser Based • Free</span>
        <h1 className="hero-title">
          Turn Images & GIFs
          <br />
          Into Beautiful ASCII Art
        </h1>
        <p className="hero-description">
          Transform your images and GIFs into high-quality ASCII art instantly.
          Everything runs directly in your browser, so your files stay on your
          device.
        </p>
        <div className="hero-buttons">
          <button
            className="primary-btn"
            onClick={() => {
              document.getElementById("converter")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Start Creating
          </button>
          <button
            className="secondary-btn"
            onClick={() => {
              document.getElementById("examples")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            View Examples
          </button>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <strong>100%</strong>
            <span>Browser based</span>
          </div>
          <div className="hero-stat">
            <strong>4+</strong>
            <span>Image formats</span>
          </div>
          <div className="hero-stat">
            <strong>Free</strong>
            <span>No signup required</span>
          </div>
        </div>
      </div>
    </section>
  );
}
