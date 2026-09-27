interface Props {
  sections: { id: string; num: number; title: string; actCount: number }[]
  activeId: string
  onJump: (id: string) => void
}

export function Toc({ sections, activeId, onJump }: Props) {
  return (
    <nav className="toc" aria-labelledby="toc-title">
      <div className="toc__head">
        <h2 id="toc-title">Содержание</h2>
        <span className="label label--muted">{sections.length} разделов</span>
      </div>

      <ol className="toc__list">
        {sections.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              className="toc__row"
              aria-current={activeId === s.id}
              onClick={() => onJump(s.id)}
            >
              <span className="toc__num">{String(s.num).padStart(2, '0')}</span>
              <span className="toc__title">{s.title}</span>
              {s.actCount > 0 && <span className="toc__n">{s.actCount}</span>}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
