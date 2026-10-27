# Soltor Capital Platform — starter v2

A full-stack foundation for a corporate investment website, investor portal, and operations console. Built with Next.js App Router, TypeScript, Prisma, and SQLite for local development.

> **Important:** This is an implementation starter, not a production-ready regulated investment or payments platform. The payment flow only records requests; it does not transfer funds. KYC is a manual status workflow; it does not verify identity. Do not use real investor data or accept funds until the controls and integrations in this document are completed and independently reviewed.

## Features in this repository

- Corporate website covering private airports, private estates, land, and real estate development
- Category-specific investment overviews with downloadable PDFs covering considerations, risks, and due diligence
- Investment overviews with an embedded PDF reader and a site-wide, privacy-conscious assistant for common questions
- Direct general-enquiry contact at kng@soltorcapital.com
- Email/password sign-in with bcrypt password hashing and an HTTP-only session cookie
- Role-gated investor dashboard (`INVESTOR`), admin (`ADMIN`), and compliance (`COMPLIANCE`) console
- Investor onboarding request and KYC status workflow
- Deposit/withdrawal request logging (not payment processing)
- Manual review status workflow and audit events
- CMS-style draft/published content management
- Privacy, terms, and investment disclosure placeholder pages
- Security response headers and Zod validation on server actions
- Prisma schema and seed script for bootstrap admin

## Requirements

- Node.js 20 LTS recommended (Node.js 18.17+)
- npm

## Local setup

```bash
cp .env.example .env
```

Set `SESSION_SECRET` to a random value of at least 32 characters. Set a unique `BOOTSTRAP_ADMIN_EMAIL` and `BOOTSTRAP_ADMIN_PASSWORD` of at least 14 characters. Do not use the example values.

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

Open `http://localhost:3000`, then sign in at `/login` using the bootstrap admin credentials. The admin account is for development only; use an enterprise identity provider/MFA in production.

## Database

SQLite is used only to simplify local development. For production, use a managed PostgreSQL database, set `DATABASE_URL` appropriately, change the Prisma datasource provider to `postgresql`, and create/test a migration. Backups, encryption at rest, access control, retention, point-in-time recovery, and restore drills are required.

## Routes

- `/` — corporate website
- `/login` — provisioned-user sign-in
- `/dashboard` — investor dashboard
- `/onboarding` — onboarding request / KYC status
- `/transactions` — deposit / withdrawal request log
- `/admin` — operations and compliance console
- `/admin/content` — CMS page management
- `/legal/disclosures`, `/legal/privacy`, `/legal/terms` — legal placeholders
- `/contact` — general enquiries and professional introductions
- `/investment-guides/<category>` — category-specific overview and PDF download
- The floating Soltor assistant answers common questions from published website content without sending chat messages to an external AI service
- `/investment-guides/private-airports.pdf`, `/investment-guides/private-estates.pdf`, `/investment-guides/land.pdf`, `/investment-guides/real-estate-development.pdf` — downloadable category overviews

## Security and production hardening checklist

### Identity and access
- Replace custom password sessions with a maintained identity provider or thoroughly reviewed authentication stack; add MFA/passkeys, email verification, password reset, session rotation/revocation, login rate limits, lockout/alerting, CSRF review, and credential-stuffing defenses.
- Review the `__Host-` cookie behavior behind your production HTTPS deployment and ensure every production route is TLS-only.
- Add automated authorization tests for every route/action and object-level access test. Never rely on hidden UI controls as authorization.
- Add least-privilege roles, approval separation, maker-checker controls, and immutable/externally shipped audit logs.

### Data and privacy
- Replace SQLite with managed PostgreSQL. Encrypt sensitive data in transit and at rest; manage secrets in a vault; restrict production access.
- Create data inventory, lawful-basis assessment, retention/deletion schedule, data-subject request process, breach response plan, vendor agreements, and cross-border transfer assessment.
- Do not store raw identity documents or payment card data in this application. Use vendor-hosted KYC and hosted payment pages/tokenization where possible.
- Add structured logging with PII redaction, monitoring, alerting, backups, and tested incident/restore procedures.

### KYC / AML / sanctions
- Integrate an appropriately licensed KYC/AML vendor, verify signed webhooks, handle retries idempotently, and record provider event IDs.
- Define risk-based due diligence, beneficial ownership for entities, PEP/sanctions/adverse-media screening where required, source-of-funds checks, escalation, periodic refresh, and recordkeeping with counsel.
- The current manual KYC status dropdown is a prototype only and is not evidence of compliance approval.

### Payments and transaction integrity
- Integrate a licensed payment provider only after legal review and jurisdiction/eligibility checks. Use hosted payment flows; never collect card data directly.
- Implement signed webhook verification, idempotency, duplicate-event protection, reconciliation, ledger entries, refunds/chargebacks, withdrawal approval, limits, sanctions checks, and alerting.
- Separate request status from settlement status. A manually changed status is not proof that money settled.
- Do not allow deposits, withdrawals, investment subscriptions, trades, or distributions to execute from this starter.

### CMS / web security
- Use a sanitizing Markdown renderer or a strict safe-content format if rich content is introduced; never render arbitrary CMS HTML directly.
- Review CSP against actual deployment. Current CSP is a starter and may require changes for the chosen provider; avoid adding broad script allowances where possible.
- Add dependency scanning, SAST/DAST, penetration testing, security headers review, abuse protection, and an accessibility review.
- Add CSRF and origin checks where appropriate, especially for state-changing actions; rate-limit all public and authentication endpoints.

### Legal and regulatory review
- Determine the exact entity, operating jurisdictions, licence/registration scope, client categories, product structure, custody arrangements, offering restrictions, and marketing rules.
- Have counsel approve privacy, terms, risk disclosures, fee/conflicts statements, complaints process, investor eligibility, and all claims before public launch.
- Ensure any displayed valuations and performance data have a controlled source, timestamp, methodology, reconciliation, and disclosure.
- This repository does not provide legal, tax, compliance, or investment advice.

## Known prototype limitations

- SQLite local database only; no production migrations/connection pooling configured.
- No MFA, password reset, email verification, or login throttling.
- No real KYC vendor or identity-document processing.
- No payment gateway, settlement, bank connectivity, ledger, or webhook endpoint.
- CMS content is stored but public rendering and sanitization are not implemented.
- No portfolio import/reconciliation pipeline; reported values are admin-entered snapshots.
- No unit, integration, authorization, or end-to-end tests yet.
- Contact form intentionally avoids collecting personal data until a secure backend and privacy notice are configured.

## Suggested deployment architecture

Browser → CDN/WAF → Next.js app (private server runtime) → managed PostgreSQL; secrets in a vault; identity provider with MFA; KYC vendor and payment provider via signed webhook endpoints; centralized audit logging/SIEM; encrypted backups; monitoring and incident alerting. Keep payment/KYC credentials server-side and separate staging from production.
