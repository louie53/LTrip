export default function HomePage() {
  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="LocalTrip home">
          <span className="brand-mark" aria-hidden="true">↗</span>
          LocalTrip<span className="wordmark-dot">.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#about">About LocalTrip</a>
        </nav>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">New Zealand · Local experiences</p>
            <h1 id="hero-title">Good days,<br />close to home.</h1>
            <p className="hero-description">
              A fresh perspective on familiar places. Discover the idea behind
              LocalTrip, a small activity operator with a local outlook.
            </p>
            <a className="text-link" href="#about">
              Meet LocalTrip <span aria-hidden="true">↗</span>
            </a>
          </div>

          <aside className="preview-card" aria-labelledby="preview-title">
            <div className="landscape" aria-hidden="true">
              <span className="landscape-sun" />
              <span className="landscape-hill landscape-hill-back" />
              <span className="landscape-hill landscape-hill-front" />
            </div>
            <div className="preview-copy">
              <p className="eyebrow">Site preview</p>
              <h2 id="preview-title">A first look.</h2>
              <p>
                We’re starting with a simple introduction. Activities and
                reservations are not yet available.
              </p>
            </div>
          </aside>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div>
            <p className="eyebrow">About LocalTrip</p>
            <h2 id="about-title">One operator.<br />A local outlook.</h2>
          </div>
          <div className="about-copy">
            <p>
              LocalTrip is a fictional New Zealand tourism operator. The idea is
              simple: thoughtful local activities, with the details you need to
              plan a day out.
            </p>
            <p>
              This website is a personal portfolio project. No real tours or
              services are offered here.
            </p>
          </div>
        </section>

        <p className="demo-notice">
          Portfolio demo — reservations are simulated. No payment is collected.
        </p>
      </main>

      <footer className="site-footer">
        <span>LocalTrip · New Zealand</span>
        <span>A personal portfolio project</span>
      </footer>
    </div>
  );
}
