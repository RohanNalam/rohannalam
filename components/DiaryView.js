'use client';

import { useState } from 'react';
import { diary } from '@/data/misc';

// List-first diary: a simple Title | Date table of entries; clicking a row
// opens the full entry (paragraphs + Spotify embeds) with a back button.
export default function DiaryView() {
  const [open, setOpen] = useState(null);

  if (open !== null) {
    const d = diary[open];
    return (
      <>
        <button className="diary-back" onClick={() => setOpen(null)}>
          ← All entries
        </button>
        <article className="diary-card">
          <span className="diary-card-date">{d.date}</span>
          <h2 className="diary-card-title">{d.title}</h2>
          <div className="diary-card-body">
            {(Array.isArray(d.body) ? d.body : [d.body]).map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </div>
          {d.songs?.length > 0 && (
            <div className="diary-songs">
              {d.songs.map((s) => (
                <iframe
                  key={s.spotify}
                  src={`https://open.spotify.com/embed/track/${s.spotify}?utm_source=generator&theme=0`}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={`${s.title} — ${s.artist}`}
                />
              ))}
            </div>
          )}
        </article>
      </>
    );
  }

  return (
    <div className="diary-table">
      <div className="diary-table-head">
        <span>Title</span>
        <span>Date</span>
      </div>
      {diary.map((d, i) => (
        <button className="diary-row" key={i} onClick={() => setOpen(i)}>
          <span className="diary-row-title">{d.title}</span>
          <span className="diary-row-date">{d.date}</span>
        </button>
      ))}
    </div>
  );
}
