import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveContentAction } from "./actions";
import { Footer } from "@/app/page";

export default async function ContentAdminPage({searchParams}:{searchParams:{saved?:string;error?:string}}) {
  const user=await getSession();
  if(!user) redirect("/login");
  if(!["ADMIN","COMPLIANCE"].includes(user.role)) redirect("/dashboard");
  const pages=await prisma.contentPage.findMany({orderBy:{updatedAt:"desc"}});
  return <><header className="header"><Link className="brand" href="/"><span className="mark">S</span><span>SOLTOR <b>CAPITAL</b></span></Link><Link className="link" href="/admin">← Admin console</Link></header><main className="container"><div className="kicker">CONTENT MANAGEMENT</div><h1 className="h2">Website content</h1><p className="muted">Drafts are not published. Content is stored as plain text in this starter; do not render untrusted HTML.</p>{searchParams.saved&&<p className="success">Content saved.</p>}{searchParams.error&&<p className="error">Unable to save content. Check the fields.</p>}<div className="split"><section className="panel"><h2 style={{font:"600 20px Manrope"}}>Create or update page</h2><form action={saveContentAction} className="content-editor"><label className="field">Page slug<input name="slug" placeholder="e.g. about" pattern="[a-z0-9-]+" maxLength={80} required/></label><label className="field">Title<input name="title" maxLength={160} required/></label><label className="field">Summary<input name="summary" maxLength={300}/></label><label className="field">Body<textarea name="body" maxLength={20000} required/></label><label className="field">Status<select name="status"><option value="DRAFT">Draft</option><option value="PUBLISHED">Publish</option><option value="ARCHIVED">Archive</option></select></label><button className="btn btn-dark" type="submit">Save content ↗</button></form></section><section className="panel"><h2 style={{font:"600 20px Manrope"}}>Existing pages</h2>{!pages.length?<p className="muted">No pages yet.</p>:pages.map(p=><div className="status-line" key={p.id}><div><b>{p.title}</b><br/><span className="muted">/{p.slug} · {p.status}</span></div><span className="mono">{p.updatedAt.toLocaleDateString()}</span></div>)}</section></div></main><Footer/></>;
}
