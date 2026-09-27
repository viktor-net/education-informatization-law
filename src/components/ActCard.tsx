import type { Act, ActKind } from '../content/article'

export const kindLabels: Record<ActKind, string> = {
  constitution: 'Конституция',
  international: 'Международный акт',
  law: 'Федеральный закон',
  decree: 'Указ Президента',
  government: 'Постановление Правительства',
  order: 'Приказ / письмо',
  code: 'Кодекс',
}

const ChevronIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
  </svg>
)

interface Props {
  act: Act
  index: number
  open: boolean
  onToggleOpen: (id: string) => void
}

export function ActCard({ act, index, open, onToggleOpen }: Props) {
  const bodyId = `act-body-${act.id}`

  return (
    <article className="act" data-open={open} id={`act-${act.id}`}>
      <div className="act__head">
        <button
          type="button"
          className="act__titles"
          onClick={() => onToggleOpen(act.id)}
          aria-expanded={open}
          aria-controls={bodyId}
        >
          <span className="act__short">
            {String(index + 1).padStart(2, '0')} · {act.short}
          </span>
          <span className="act__title">{act.title}</span>
          <span className="act__sub">
            <span className="act__kind">{kindLabels[act.kind]}</span>
            <span>{act.date}</span>
            {act.status && <span>{act.status}</span>}
          </span>
        </button>

        <button
          type="button"
          className="act__toggle"
          onClick={() => onToggleOpen(act.id)}
          aria-expanded={open}
          aria-controls={bodyId}
          aria-label={open ? `Свернуть «${act.short}»` : `Развернуть «${act.short}»`}
        >
          <ChevronIcon />
        </button>
      </div>

      <div className="act__body" id={bodyId} role="region" aria-label={act.short}>
        <div>
          <div className="act__inner">
            <p className="act__gist">{act.gist}</p>

            {act.provisions && act.provisions.length > 0 && (
              <div className="act__block">
                <h5>Ключевые положения</h5>
                <dl className="prov">
                  {act.provisions.map((p) => (
                    <div key={p.cite}>
                      <dt>{p.cite}</dt>
                      <dd>{p.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {act.explanation.length > 0 && (
              <div className="act__block act__text">
                <h5>Разъяснение</h5>
                {act.explanation.map((par, i) => (
                  <p key={i}>{par}</p>
                ))}
              </div>
            )}

            {act.practice && act.practice.length > 0 && (
              <div className="act__block act__practice">
                <h5>Как применять</h5>
                <ul>
                  {act.practice.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
