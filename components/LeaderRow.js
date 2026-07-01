// A label · · · · · · value row with a dotted leader line (pippipi signature).
export default function LeaderRow({ label, value, href }) {
  return (
    <div className="lead-row">
      <span className="label">{label}</span>
      <span className="leader" />
      <span className="value">
        {href ? (
          <a href={href} target="_blank" rel="noreferrer">
            {value}
          </a>
        ) : (
          value
        )}
      </span>
    </div>
  );
}

export function SectionHead({ title, count }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      <span className="rule" />
      {count != null && <span className="count">{count}</span>}
    </div>
  );
}
