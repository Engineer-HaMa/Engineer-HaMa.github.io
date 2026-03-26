import { useState, useMemo } from 'react';
import type { BibEntry } from '../../utils/bibtex';
import { getTitle, getAuthors, getVenue, getYear, getBoolField } from '../../utils/bibtex';

const MAX_AUTHORS = 3;
const PERSONA_LAST_NAME = 'Einstein';

interface Props {
  entries: BibEntry[];
}

function entryUrl(entry: BibEntry): string {
  const html = entry.fields.html;
  const doi = entry.fields.doi;
  if (html) return html;
  if (doi) return `https://doi.org/${doi}`;
  return '';
}

function PublicationEntry({ entry }: { entry: BibEntry }) {
  const abbr = entry.fields.abbr ?? '';
  const title = getTitle(entry);
  const url = entryUrl(entry);
  const authorsRaw = getAuthors(entry);
  const authorList = authorsRaw ? authorsRaw.split(', ') : [];
  const showMore = authorList.length > MAX_AUTHORS;
  const visibleAuthors = showMore ? authorList.slice(0, MAX_AUTHORS) : authorList;
  const venue = getVenue(entry);
  const year = getYear(entry);
  const isSelected = getBoolField(entry, 'selected');
  const abstract = entry.fields.abstract ?? '';
  const doi = entry.fields.doi ?? '';
  const pdfPath = entry.fields.pdf ?? '';
  const codeUrl = entry.fields.code ?? '';
  const hasAward = entry.fields.award ?? '';
  const awardName = entry.fields.award_name ?? '';

  return (
    <li
      className={`pub-entry flex gap-4${isSelected ? ' selected' : ''}`}
      style={
        isSelected
          ? {
              backgroundColor: 'var(--global-hover-color)',
              borderRadius: '4px',
              padding: '0.5rem',
              marginLeft: '-0.5rem',
            }
          : undefined
      }
    >
      {/* Venue badge */}
      <div style={{ flexShrink: 0, width: '4rem', textAlign: 'right' }}>
        {abbr && (
          <span
            className="badge-abbr"
            style={{
              fontSize: '0.75rem',
              backgroundColor: 'var(--global-theme-color)',
              color: 'var(--global-hover-text-color)',
              display: 'inline-block',
            }}
          >
            {abbr}
          </span>
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Title */}
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="pub-title"
            style={{
              fontWeight: 600,
              display: 'block',
              color: 'var(--global-text-color)',
              textDecoration: 'none',
            }}
          >
            {title}
          </a>
        ) : (
          <span
            style={{
              fontWeight: 600,
              display: 'block',
              color: 'var(--global-text-color)',
            }}
          >
            {title}
          </span>
        )}

        {/* Award badge */}
        {hasAward && (
          <span
            className="badge-abbr"
            style={{
              fontSize: '0.75rem',
              marginTop: '0.25rem',
              display: 'inline-block',
              backgroundColor: '#c8a400',
              color: '#fff',
            }}
          >
            {awardName || hasAward}
          </span>
        )}

        {/* Authors */}
        {authorList.length > 0 && (
          <p
            style={{
              fontSize: '0.875rem',
              marginTop: '0.125rem',
              color: 'var(--global-text-color-light)',
            }}
          >
            {visibleAuthors.map((author, i) => {
              const isMe = author.includes(PERSONA_LAST_NAME);
              return (
                <span key={i}>
                  {isMe ? <strong>{author}</strong> : author}
                  {i < visibleAuthors.length - 1 && ', '}
                </span>
              );
            })}
            {showMore && <span> and {authorList.length - MAX_AUTHORS} more</span>}
          </p>
        )}

        {/* Venue + year */}
        {venue && (
          <p
            style={{
              fontSize: '0.875rem',
              fontStyle: 'italic',
              marginTop: '0.125rem',
              color: 'var(--global-text-color-light)',
            }}
          >
            {venue}
            {year ? `, ${year}` : ''}
          </p>
        )}

        {/* Links row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
          {doi && (
            <a
              href={`https://doi.org/${doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="badge-abbr"
              style={{
                fontSize: '0.75rem',
                backgroundColor: 'var(--global-divider-color)',
                color: 'var(--global-text-color)',
              }}
            >
              DOI
            </a>
          )}
          {pdfPath && (
            <a
              href={pdfPath.startsWith('http') ? pdfPath : `/assets/pdf/${pdfPath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="badge-abbr"
              style={{
                fontSize: '0.75rem',
                backgroundColor: 'var(--global-divider-color)',
                color: 'var(--global-text-color)',
              }}
            >
              PDF
            </a>
          )}
          {codeUrl && (
            <a
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="badge-abbr"
              style={{
                fontSize: '0.75rem',
                backgroundColor: 'var(--global-divider-color)',
                color: 'var(--global-text-color)',
              }}
            >
              Code
            </a>
          )}
        </div>

        {/* Inline badges (Altmetric / Dimensions) */}
        {doi && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem', alignItems: 'center' }}>
            <div
              className="altmetric-embed"
              data-badge-type="2"
              data-badge-popover="right"
              data-doi={doi}
            />
            <span
              className="__dimensions_badge_embed__"
              data-doi={doi}
              data-legend="hover-right"
              data-style="small_circle"
            />
          </div>
        )}

        {/* Abstract (collapsible) */}
        {abstract && (
          <details style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
            <summary
              style={{ cursor: 'pointer', userSelect: 'none', color: 'var(--global-theme-color)' }}
            >
              Abstract
            </summary>
            <p
              style={{
                marginTop: '0.25rem',
                paddingLeft: '0.5rem',
                fontSize: '0.875rem',
                color: 'var(--global-text-color-light)',
                borderLeft: '2px solid var(--global-divider-color)',
              }}
            >
              {abstract}
            </p>
          </details>
        )}
      </div>
    </li>
  );
}

export function BibSearch({ entries }: Props) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    const words = q.split(/\s+/).filter(Boolean);
    return entries.filter((entry) => {
      const haystack = [
        getTitle(entry),
        getAuthors(entry),
        getVenue(entry),
        String(getYear(entry)),
      ]
        .join(' ')
        .toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
  }, [entries, query]);

  // Group filtered entries by year
  const byYear = useMemo(() => {
    const map = new Map<number, BibEntry[]>();
    for (const entry of filtered) {
      const year = getYear(entry);
      if (!map.has(year)) map.set(year, []);
      map.get(year)!.push(entry);
    }
    return map;
  }, [filtered]);

  const years = useMemo(
    () => [...byYear.keys()].sort((a, b) => b - a),
    [byYear],
  );

  return (
    <div>
      {/* Search input */}
      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search publications…"
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            fontSize: '0.9375rem',
            border: '1px solid var(--global-divider-color)',
            borderRadius: '6px',
            color: 'var(--global-text-color)',
            backgroundColor: 'transparent',
            outline: 'none',
          }}
          aria-label="Search publications"
        />
        <p
          style={{
            marginTop: '0.375rem',
            fontSize: '0.8125rem',
            color: 'var(--global-text-color-light)',
          }}
        >
          Showing {filtered.length} of {entries.length} publication
          {entries.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Publications grouped by year */}
      {filtered.length === 0 ? (
        <p style={{ color: 'var(--global-text-color-light)' }}>No publications match your search.</p>
      ) : (
        years.map((year) => (
          <section key={year} style={{ marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                marginBottom: '1rem',
                color: 'var(--global-theme-color)',
                borderBottom: '1px solid var(--global-divider-color)',
                paddingBottom: '0.25rem',
              }}
            >
              {year}
            </h2>
            <ol
              style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              {byYear.get(year)!.map((entry) => (
                <PublicationEntry key={entry.key} entry={entry} />
              ))}
            </ol>
          </section>
        ))
      )}
    </div>
  );
}

export default BibSearch;
