import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Upload from "@/components/Upload";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <section id="features" className="section-placeholder">
        <div className="section-container">
          <span className="section-eyebrow">FEATURES</span>
          <h2 className="section-title">
            Everything you need to create ASCII art
          </h2>
          <p className="section-description">
            Convert images directly in your browser with powerful controls and
            instant results.
          </p>
        </div>
      </section>
      <Upload />
      <section id="examples" className="section-placeholder">
        <div className="section-container">
          <span className="section-eyebrow">EXAMPLES</span>
          <h2 className="section-title">See what ASCII Studio can create</h2>
          <p className="section-description">
            Examples and presets will be added here next.
          </p>
        </div>
      </section>
    </main>
  );
}
