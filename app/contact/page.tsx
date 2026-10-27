import Link from "next/link";
import { Footer } from "@/app/page";

export default function ContactPage() {
  return (
    <>
      <header className="site-header">
        <Link className="site-brand" href="/" aria-label="Soltor Capital home">
          <span className="site-brand-mark" aria-hidden="true">S</span>
          <span className="site-brand-name">SOLTOR <b>CAPITAL</b></span>
        </Link>
        <Link className="site-back-link" href="/">← Back to home</Link>
      </header>
      <main className="site-contact-page">
        <div className="site-section-label"><span>CONTACT</span> GENERAL ENQUIRIES</div>
        <h1>Every good<br />partnership starts<br /><em>with a conversation.</em></h1>
        <p>
          For general enquiries and professional introductions, contact the Soltor
          Capital team.
        </p>
        <a className="site-button site-button-dark" href="mailto:kng@soltorcapital.com">
          kng@soltorcapital.com <span aria-hidden="true">↗</span>
        </a>
        <div className="site-contact-page-note">
          This email link opens your email application. Please do not send confidential
          financial, identity, or account information by email.
        </div>
      </main>
      <Footer />
    </>
  );
}
