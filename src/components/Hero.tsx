import type { Article } from '../content/article'

interface Props {
  article: Article
  actTotal: number
}

export function Hero({ article, actTotal }: Props) {
  return (
    <header className="hero">

      <h1>{article.title}</h1>

      <p className="hero__standfirst">{article.standfirst}</p>
      <p className="hero__abstract">{article.abstract}</p>

      <div className="hero__keywords">
        {article.keywords.map((k) => (
          <span className="chip" key={k}>
            {k}
          </span>
        ))}
      </div>

      <dl className="hero__meta">
        {article.meta.map((m) => (
          <div key={m.label}>
            <dt>{m.label}</dt>
            <dd>{m.value}</dd>
          </div>
        ))}
        <div>
          <dt>Актов разобрано</dt>
          <dd>{actTotal}</dd>
        </div>
      </dl>
    </header>
  )
}
