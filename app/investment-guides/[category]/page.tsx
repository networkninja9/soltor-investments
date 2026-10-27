import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { investmentGuides } from "../data";
import "./guide.css";

type Props = {
  params: {
    category: string;
  };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return investmentGuides.map(({ slug }) => ({ category: slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const guide = investmentGuides.find(({ slug }) => slug === params.category);

  return {
    title: guide
      ? `${guide.title} | Soltor Capital Investment Overview`
      : "Investment Overview | Soltor Capital",
    description: guide?.subtitle
  };
}

export default function InvestmentGuidePage({ params }: Props) {
  const guide = investmentGuides.find(({ slug }) => slug === params.category);

  if (!guide) {
    notFound();
  }

  const pdfPath = `/investment-guides/${guide.slug}.pdf`;

  return (
    <main className="guide-page">
      <header className="guide-header">
        <Link className="guide-brand" href="/" aria-label="Soltor Capital home">
          <span className="guide-brand-mark" aria-hidden="true">S</span>
          <span>SOLTOR <b>CAPITAL</b></span>
        </Link>
        <div className="guide-document-label">INVESTMENT OVERVIEW <span>·</span> OCTOBER 2026</div>
      </header>

      <section className="guide-hero">
        <div className="guide-overline"><span>{guide.number}</span> {guide.category}</div>
        <h1>{guide.title}</h1>
        <p>{guide.subtitle}</p>
        <a className="guide-download" href={pdfPath} download>
          Download PDF <span aria-hidden="true">↓</span>
        </a>
        <span className="guide-hero-watermark" aria-hidden="true">{guide.number}</span>
      </section>

      <div className="guide-content">
        <section className="guide-overview">
          <div className="guide-section-label">THE INVESTMENT LENS</div>
          <p>{guide.overview}</p>
        </section>

        <div className="guide-columns">
          <section className="guide-column">
            <h2>Considerations</h2>
            <ul>{guide.investmentConsiderations.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section className="guide-column guide-risks">
            <h2>Risks to understand</h2>
            <ul>{guide.keyRisks.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>

        <section className="guide-diligence">
          <div>
            <div className="guide-section-label">BEFORE CONSIDERING AN OPPORTUNITY</div>
            <h2>Start with the questions that matter.</h2>
          </div>
          <ol>{guide.diligenceQuestions.map((item) => <li key={item}>{item}</li>)}</ol>
        </section>

        <section className="guide-pdf" id="document">
          <div className="guide-pdf-heading">
            <div>
              <div className="guide-section-label">READ THE COMPLETE OVERVIEW</div>
              <h2>Explore the PDF.</h2>
            </div>
            <a className="guide-download guide-pdf-download" href={pdfPath} download>
              Download PDF <span aria-hidden="true">↓</span>
            </a>
          </div>
          <iframe
            className="guide-pdf-viewer"
            src={`${pdfPath}?embedded=1#toolbar=1&navpanes=0&view=FitH`}
            title={`${guide.title} investment overview PDF`}
            loading="lazy"
          />
          <p className="guide-pdf-fallback">
            If the PDF doesn’t display in your browser, <a href={pdfPath}>open the PDF directly</a>.
          </p>
        </section>
      </div>

      <footer className="guide-footer">
        <div className="guide-footer-top">
          <Link className="guide-brand" href="/">
            <span className="guide-brand-mark" aria-hidden="true">S</span>
            <span>SOLTOR <b>CAPITAL</b></span>
          </Link>
          <a href="mailto:kng@soltorcapital.com">kng@soltorcapital.com ↗</a>
        </div>
        <p>
          For general informational purposes only; not investment, legal, tax, or other
          professional advice and not an offer to sell or solicitation to buy any
          investment product. No current offering, return, valuation, financing,
          regulatory status, or investment availability is represented. Each investment
          involves risk, including possible loss of capital; real assets may be illiquid
          and may require additional capital. All information, legal entities, jurisdictions,
          permissions, risks, and offering materials must be independently verified and
          reviewed by qualified advisers before any decision.
        </p>
        <div className="guide-footer-bottom">
          <span>© {new Date().getFullYear()} Soltor Capital</span>
          <Link href="/legal/disclosures">Important disclosures ↗</Link>
        </div>
      </footer>
    </main>
  );
}
