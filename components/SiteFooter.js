import { profile } from '@/data/profile';

// Bottom footer with copyright + email + giant ghost "ROHANNALAM" backdrop.
// Matches the PIPPI-style sign-off (kept the snark — "FROM LITERAL CHICKEN
// SCRATCH" line — without copying their copy verbatim).
export default function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="site-foot-inner">
        <p className="site-foot-line">
          CRAFTED BY YOURS TRULY. FROM A HIGH-SCHOOL DESK IN OHIO.
        </p>
        <p className="site-foot-contact">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          {' · '}
          <a href="tel:+17409722330">740-972-2330</a>
        </p>
      </div>
      <div className="site-foot-ghost" aria-hidden="true">
        {profile.name.replace(' ', '').toUpperCase()}
      </div>
    </footer>
  );
}
