import Image from "next/image";
import coastConcept from "../../public/images/coast-concept.png";

function ArrowIcon() {
  return (
    <svg
      className="arrow-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 5 19 19M9 19h10V9" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div id="top">
      <p className="notice">
        Portfolio demo — reservations are simulated. No payment is collected.
      </p>
      <div className="shell">
        <header className="header">
          <a className="brand" href="#top" aria-label="LocalTrip home">
            <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" focusable="false">
              <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M9 23 16 12l5 8 3-5 4 8H9Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="24" cy="11" r="2" fill="currentColor" />
            </svg>
            LocalTrip
          </a>
          <nav aria-label="Main navigation">
            <a className="nav-link" href="#about">
              About LocalTrip <ArrowIcon />
            </a>
          </nav>
        </header>

        <main id="main-content" tabIndex={-1}>
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow">
                New Zealand <span className="dash" aria-hidden="true" /> A local outlook
              </p>
              <h1 id="hero-title">
                <span>Good days,</span>
                <span>close to home.</span>
              </h1>
              <p className="intro">
                A fresh perspective on familiar places. A fictional New Zealand
                operator, imagined for thoughtful days out.
              </p>
              <a className="meet" href="#about">
                <span className="arrow"><ArrowIcon /></span>
                Meet LocalTrip
              </a>
              <div className="status">
                <strong>Website preview</strong>
                <p>Activities and reservations are not yet available.</p>
              </div>
            </div>

            <figure className="landscape">
              <Image
                src={coastConcept}
                alt="Concept image of a quiet bay, green headlands and a curving sandy beach."
                sizes="(max-width: 359px) calc(100vw - 40px), (max-width: 760px) calc(100vw - 48px), (max-width: 1100px) calc((100vw - 104px) / 2), (max-width: 1296px) calc((100vw - 168px) / 2), 564px"
                preload
              />
              <figcaption>
                <span>A little room to explore.</span>
                <span>AI-generated concept image</span>
              </figcaption>
            </figure>
          </section>

          <section className="about" id="about" aria-labelledby="about-title" tabIndex={-1}>
            <div>
              <p className="eyebrow">About LocalTrip</p>
              <h2 id="about-title">One operator.<br />A local outlook.</h2>
            </div>
            <div className="about-copy">
              <p>
                LocalTrip is a fictional New Zealand activity operator. The idea
                is simple: thoughtful local experiences, with room to notice the
                little things.
              </p>
              <p>
                <strong>This website is a personal portfolio project.</strong>
                <br />No real tours or services are offered here.
              </p>
            </div>
          </section>
        </main>

        <footer className="footer">
          <span><span className="footer-name">LocalTrip</span> &nbsp;·&nbsp; New Zealand</span>
          <span>A personal portfolio project</span>
        </footer>
      </div>
    </div>
  );
}
