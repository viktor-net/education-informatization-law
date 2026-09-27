import type { Article } from '../content/article'

interface Props {
  article: Article
  actTotal: number
}

export function Colophon({ article, actTotal }: Props) {
  const year = 2026

  return (
    <footer className="colophon">
      <div className="colophon__grid">
        <div>
          <h2>Источники</h2>
          <ul className="sources">
            {article.sources.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Редакционная справка</h2>
          <ul className="editorial">
            {article.editorial.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="colophon__foot">
        <span>Краткий конспект · {article.titleBlock.discipline}</span>
        <span>
          {actTotal} актов · {article.sections.length} разделов
        </span>
        <span>Собрано в один HTML-файл · работает офлайн</span>
        <span>© {year}</span>
      </div>
    </footer>
  )
}
