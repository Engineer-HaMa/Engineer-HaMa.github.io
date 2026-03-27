import { useState, useMemo, useRef, useEffect } from 'react';
import type { BibEntry } from '../../utils/bibtex';
import { getTitle, getAuthors, getVenue, getYear, getBoolField } from '../../utils/bibtex';

const PERSONA_LAST_NAME = 'einstein';

interface Props {
  entries: BibEntry[];
  maxAuthorLimit?: number;
  showThumbnails?: boolean;
}

function entryUrl(entry: BibEntry): string {
  if (entry.fields.html) return entry.fields.html;
  if (entry.fields.doi) return `https://doi.org/${entry.fields.doi}`;
  return '';
}

function buildBibtex(entry: BibEntry): string {
  const fields = Object.entries(entry.fields)
    .filter(([k]) => !['abbr', 'abstract', 'selected', 'preview', 'bibtex_show',
      'award', 'award_name', 'html', 'code', 'blog', 'website', 'altmetric',
      'dimensions', 'google_scholar_id', 'inspirehep_id'].includes(k))
    .map(([k, v]) => `  ${k} = {${v}}`)
    .join(',\n');
  return `@${entry.type}{${entry.key},\n${fields}\n}`;
}

function PublicationEntry({
  entry,
  maxAuthorLimit = 3,
  showThumbnails = true,
}: {
  entry: BibEntry;
  maxAuthorLimit?: number;
  showThumbnails?: boolean;
}) {
  const [abstractOpen, setAbstractOpen] = useState(false);
  const [bibtexOpen, setBibtexOpen] = useState(false);
  const [awardOpen, setAwardOpen] = useState(false);

  const abbr = entry.fields.abbr ?? '';
  const preview = entry.fields.preview ?? '';
  const title = getTitle(entry);
  const url = entryUrl(entry);
  const authorsRaw = getAuthors(entry);
  const authorList = authorsRaw ? authorsRaw.split(', ') : [];
  const venue = getVenue(entry);
  const year = getYear(entry);
  const abstract = entry.fields.abstract ?? '';
  const doi = entry.fields.doi ?? '';
  const arxiv = entry.fields.arxiv ?? '';
  const hal = entry.fields.hal ?? '';
  const pdfPath = entry.fields.pdf ?? '';
  const supp = entry.fields.supp ?? '';
  const codeUrl = entry.fields.code ?? '';
  const blog = entry.fields.blog ?? '';
  const website = entry.fields.website ?? '';
  const slides = entry.fields.slides ?? '';
  const poster = entry.fields.poster ?? '';
  const video = entry.fields.video ?? '';
  const hasAward = entry.fields.award ?? '';
  const awardName = entry.fields.award_name ?? '';
  const bibtex_show = getBoolField(entry, 'bibtex_show');

  const visibleAuthors = maxAuthorLimit ? authorList.slice(0, maxAuthorLimit) : authorList;
  const hiddenCount = authorList.length - visibleAuthors.length;

  const contentColClass = showThumbnails && (abbr || preview) ? 'col-sm-8' : 'col-sm-10';

  return (
    <li>
      <div className="row">
        {/* Left column: abbr badge + thumbnail */}
        {showThumbnails && (abbr || preview) && (
          <div className="col col-sm-2 abbr">
            {abbr && (
              <abbr className="badge rounded w-100">
                {abbr}
              </abbr>
            )}
            {preview && (
              <img
                className="preview z-depth-1 rounded"
                src={preview.includes('://') ? preview : `/assets/img/publication_preview/${preview}`}
                alt={preview}
                loading="lazy"
              />
            )}
          </div>
        )}

        {/* Right column: content */}
        <div id={entry.key} className={contentColClass}>
          {/* Title */}
          <div className="title">
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer">
                {title}
              </a>
            ) : (
              title
            )}
          </div>

          {/* Authors */}
          {authorList.length > 0 && (
            <div className="author">
              {visibleAuthors.map((author, i) => {
                const isMe = author.toLowerCase().includes(PERSONA_LAST_NAME);
                const isLast = i === visibleAuthors.length - 1 && hiddenCount === 0;
                return (
                  <span key={i}>
                    {isMe ? <em>{author}</em> : author}
                    {!isLast && ', '}
                  </span>
                );
              })}
              {hiddenCount > 0 && (
                <span>, and {hiddenCount} more author{hiddenCount > 1 ? 's' : ''}</span>
              )}
            </div>
          )}

          {/* Venue + year */}
          {(venue || year) && (
            <div className="periodical">
              {venue && <em>{venue}</em>}
              {venue && year ? ', ' : ''}
              {year || ''}
            </div>
          )}

          {/* Link buttons */}
          <div className="links">
            {hasAward && (
              <button
                className="award btn btn-sm z-depth-0"
                onClick={() => setAwardOpen(!awardOpen)}
                style={{ cursor: 'pointer', background: 'none' }}
              >
                {awardName || 'Awarded'}
              </button>
            )}
            {abstract && (
              <button
                className="abstract btn btn-sm z-depth-0"
                onClick={() => setAbstractOpen(!abstractOpen)}
                style={{ cursor: 'pointer', background: 'none' }}
              >
                Abs
              </button>
            )}
            {doi && (
              <a href={`https://doi.org/${doi}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm z-depth-0">DOI</a>
            )}
            {arxiv && (
              <a href={`https://arxiv.org/abs/${arxiv}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm z-depth-0">arXiv</a>
            )}
            {hal && (
              <a href={`https://hal.science/${hal}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm z-depth-0">HAL</a>
            )}
            {bibtex_show && (
              <button
                className="bibtex btn btn-sm z-depth-0"
                onClick={() => setBibtexOpen(!bibtexOpen)}
                style={{ cursor: 'pointer', background: 'none' }}
              >
                Bib
              </button>
            )}
            {pdfPath && (
              <a
                href={pdfPath.startsWith('http') ? pdfPath : `/assets/pdf/${pdfPath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm z-depth-0"
              >
                PDF
              </a>
            )}
            {supp && (
              <a
                href={supp.startsWith('http') ? supp : `/assets/pdf/${supp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm z-depth-0"
              >
                Supp
              </a>
            )}
            {slides && (
              <a
                href={slides.startsWith('http') ? slides : `/assets/pdf/${slides}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm z-depth-0"
              >
                Slides
              </a>
            )}
            {poster && (
              <a
                href={poster.startsWith('http') ? poster : `/assets/pdf/${poster}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm z-depth-0"
              >
                Poster
              </a>
            )}
            {video && (
              <a href={video} target="_blank" rel="noopener noreferrer" className="btn btn-sm z-depth-0">Video</a>
            )}
            {codeUrl && (
              <a href={codeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm z-depth-0">Code</a>
            )}
            {blog && (
              <a href={blog} target="_blank" rel="noopener noreferrer" className="btn btn-sm z-depth-0">Blog</a>
            )}
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer" className="btn btn-sm z-depth-0">Website</a>
            )}
          </div>

          {/* Award hidden block */}
          {hasAward && (
            <div className={`award hidden${awardOpen ? ' open' : ''}`}>
              <p>{hasAward}</p>
            </div>
          )}

          {/* Abstract hidden block */}
          {abstract && (
            <div className={`abstract hidden${abstractOpen ? ' open' : ''}`}>
              <p>{abstract}</p>
            </div>
          )}

          {/* BibTeX hidden block */}
          {bibtex_show && (
            <div className={`bibtex hidden${bibtexOpen ? ' open' : ''}`}>
              <pre>{buildBibtex(entry)}</pre>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export function BibSearch({ entries, maxAuthorLimit = 3, showThumbnails = true }: Props) {
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
    <div className="publications">
      {/* Search bar */}
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
        <p style={{ marginTop: '0.375rem', fontSize: '0.8125rem', color: 'var(--global-text-color-light)' }}>
          Showing {filtered.length} of {entries.length} publication{entries.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Publications grouped by year */}
      {filtered.length === 0 ? (
        <p style={{ color: 'var(--global-text-color-light)' }}>No publications match your search.</p>
      ) : (
        years.map((year) => (
          <div key={year}>
            <h2 className="year">{year}</h2>
            <ol className="bibliography">
              {byYear.get(year)!.map((entry) => (
                <PublicationEntry
                  key={entry.key}
                  entry={entry}
                  maxAuthorLimit={maxAuthorLimit}
                  showThumbnails={showThumbnails}
                />
              ))}
            </ol>
          </div>
        ))
      )}
    </div>
  );
}

export default BibSearch;
