import Link from "next/link";

const investmentAreas = [
  {
    number: "01",
    category: "AVIATION INFRASTRUCTURE",
    title: "Private airports",
    description:
      "A long-view perspective on the infrastructure that connects people, business, and opportunity.",
    image: "investment-image-airport",
    guide: "private-airports"
  },
  {
    number: "02",
    category: "PRIVATE ESTATES",
    title: "Exceptional estates",
    description:
      "Distinctive private properties assessed for their setting, stewardship, and enduring value.",
    image: "investment-image-estate",
    guide: "private-estates"
  },
  {
    number: "03",
    category: "LAND & NATURAL ASSETS",
    title: "Land",
    description:
      "A considered approach to land, grounded in its fundamentals, context, and future potential.",
    image: "investment-image-land",
    guide: "land"
  },
  {
    number: "04",
    category: "REAL ASSETS",
    title: "Real estate development",
    description:
      "Thoughtful development opportunities shaped by place, purpose, and long-term perspective.",
    image: "investment-image-development",
    guide: "real-estate-development"
  }
];

export default function Home() {
  return (
    <>
      <header className="site-header">
        <Link className="site-brand" href="/" aria-label="Soltor Capital home">
          <span className="site-brand-mark" aria-hidden="true">S</span>
          <span className="site-brand-name">SOLTOR <b>CAPITAL</b></span>
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#approach">Our approach</a>
          <a href="#focus">Investment focus</a>
          <Link href="/legal/disclosures">Disclosures</Link>
        </nav>
        <div className="site-header-actions">
          <a className="site-email-link" href="mailto:kng@soltorcapital.com">Get in touch</a>
          <Link className="site-button site-button-dark" href="/login">Investor sign in <span aria-hidden="true">↗</span></Link>
        </div>
      </header>

      <main>
        <section className="site-hero">
          <div className="site-hero-image" role="img" aria-label="An aircraft approaching a runway at dusk" />
          <div className="site-hero-content">
            <div className="site-eyebrow"><span /> INDEPENDENT THINKING · INTERNATIONAL PERSPECTIVE</div>
            <h1>Capital for<br />the places that<br /><em>move us forward.</em></h1>
            <p>
              A considered approach to private aviation, exceptional estates, land, and
              real estate development.
            </p>
            <div className="site-hero-actions">
              <a className="site-button site-button-light" href="#focus">Explore our focus <span aria-hidden="true">↓</span></a>
              <a className="site-text-link" href="mailto:kng@soltorcapital.com">Speak with our team <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="site-hero-note"><span>01 — 04</span><span>INVESTMENT FOCUS</span></div>
          <a className="site-scroll-cue" href="#approach"><span /> SCROLL TO EXPLORE</a>
        </section>

        <section className="site-intro" id="approach">
          <div className="site-section-label"><span>01</span> OUR APPROACH</div>
          <div className="site-intro-copy">
            <h2>Grounded in place.<br /><em>Built for the long view.</em></h2>
            <div className="site-intro-aside">
              <p>
                We look beyond the immediate horizon. Soltor Capital takes a thoughtful,
                disciplined view of real assets and the places where lasting value can
                take shape.
              </p>
              <p>
                From aviation infrastructure to land and development, each opportunity
                deserves its own perspective, careful evaluation, and clear-eyed
                consideration of risk.
              </p>
              <a className="site-inline-link" href="mailto:kng@soltorcapital.com">Begin a conversation <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="site-intro-rule"><span>INDEPENDENT THINKING</span><span>DISCIPLINED CAPITAL</span><span>LONG-TERM PERSPECTIVE</span></div>
        </section>

        <section className="site-focus" id="focus">
          <div className="site-focus-heading">
            <div>
              <div className="site-section-label site-section-label-light"><span>02</span> INVESTMENT FOCUS</div>
              <h2>Real assets.<br /><em>Real perspective.</em></h2>
            </div>
            <p>
              We focus on enduring assets with the potential to shape how people live,
              travel, and build.
            </p>
          </div>
          <div className="site-investment-grid">
            {investmentAreas.map((area) => (
              <article className={`site-investment-card ${area.image}`} key={area.number}>
                <div className="site-card-topline"><span>{area.number}</span><span>INVESTMENT AREA</span></div>
                <div className="site-card-copy">
                  <div className="site-card-category">{area.category}</div>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                  <Link
                    className="site-card-guide-link"
                    href={`/investment-guides/${area.guide}`}
                    aria-label={`Read the ${area.title} investment overview`}
                  >
                    Investment overview <span aria-hidden="true">↗</span>
                  </Link>
                </div>
                <span className="site-card-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
          <p className="site-focus-footnote">
            Areas of focus are illustrative and do not represent a current offering or
            guarantee of investment availability.
          </p>
        </section>

        <section className="site-contact">
          <div className="site-section-label"><span>03</span> A CONVERSATION, WELL BEGUN</div>
          <div className="site-contact-inner">
            <h2>Let&apos;s look<br />further <em>together.</em></h2>
            <div className="site-contact-aside">
              <p>
                For general enquiries and professional introductions, we welcome you
                to get in touch with Soltor Capital.
              </p>
              <a className="site-button site-button-dark" href="mailto:kng@soltorcapital.com">
                kng@soltorcapital.com <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="site-contact-image" role="img" aria-label="Aerial view of a coastal landscape" />
        </section>
      </main>
      <Footer />
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <Link className="site-brand site-brand-footer" href="/" aria-label="Soltor Capital home">
          <span className="site-brand-mark" aria-hidden="true">S</span>
          <span className="site-brand-name">SOLTOR <b>CAPITAL</b></span>
        </Link>
        <a className="site-footer-email" href="mailto:kng@soltorcapital.com">kng@soltorcapital.com <span aria-hidden="true">↗</span></a>
        <div className="site-footer-links">
          <Link href="/legal/disclosures">Disclosures</Link>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/login">Investor sign in</Link>
        </div>
      </div>
      <p className="site-footer-disclosure">
        Website content is for general information only and is not an offer to sell, or
        solicitation to buy, any investment product. It is not investment, legal, or tax
        advice. Investments involve risk, including possible loss of capital. Legal
        entity, regulatory status, products, disclosures, and jurisdictions must be
        verified before launch.
      </p>
      <div className="site-footer-bottom">
        <span>© {new Date().getFullYear()} Soltor Capital. All rights reserved.</span>
        <span>INDEPENDENT THINKING · DISCIPLINED CAPITAL</span>
      </div>
    </footer>
  );
}
