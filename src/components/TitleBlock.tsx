import type { TitleBlock as TitleBlockData } from '../content/article'

interface Props {
  block: TitleBlockData
}

export function TitleBlock({ block }: Props) {
  return (
    <section className="titleblock" aria-label="Титульные сведения">
      <div className="titleblock__uni">
        <span className="label">Университет</span>
        <p className="titleblock__uni-name">{block.university}</p>
        <p className="titleblock__uni-full">{block.universityFull}</p>
      </div>

      <div className="titleblock__discipline">
        <span className="label">Дисциплина</span>
        <p className="titleblock__discipline-name">«{block.discipline}»</p>
      </div>

      <div className="titleblock__signs">
        {block.signatures.map((s) => (
          <div className="titleblock__sign" key={s.role}>
            <span className="label">{s.role}</span>
            <p className="titleblock__sign-name">{s.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
