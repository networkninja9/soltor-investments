import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { onboardingAction } from "./actions";
import { Footer } from "@/app/page";

export default async function OnboardingPage() {
  const user = await getSession();
  if (!user) redirect("/login");
  return <><header className="header"><Link className="brand" href="/"><span className="mark">S</span><span>SOLTOR <b>CAPITAL</b></span></Link><Link className="link" href="/dashboard">← Dashboard</Link></header><main className="container"><div className="kicker">INVESTOR ONBOARDING</div><h1 className="h2">Identity verification status</h1><p className="muted">Current status: <b>{user.kycStatus.replaceAll("_"," ")}</b></p><div className="panel" style={{maxWidth:720}}><p className="muted">This prototype records a request for compliance review. It does not verify identity or collect identity documents. Production onboarding must use an approved KYC/AML provider and jurisdiction-specific policy.</p><form action={onboardingAction} className="form"><label className="field">Organization (optional)<input name="organization" defaultValue={user.organization||""} maxLength={160}/></label><label className="field">Additional context (do not include identity numbers or sensitive documents)<textarea name="note" maxLength={1000} placeholder="Briefly describe your onboarding enquiry."/></label><label className="field" style={{display:"flex",gridTemplateColumns:"auto 1fr",alignItems:"start"}}><span><input type="checkbox" name="consent" required/> I understand this submits an onboarding request and is not a verification or approval.</span></label><button className="btn btn-dark" type="submit">Submit for review ↗</button></form></div></main><Footer/></>;
}
