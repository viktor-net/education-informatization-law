import type { Block } from '../content/article'

interface Props {
  blocks: Block[]
}

export function Prose({ blocks }: Props) {
  return (
    <div className="prose">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'p':
            return <p key={i}>{block.text}</p>

          case 'ul':
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )

          case 'ol':
            return (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            )

          case 'quote':
            return (
              <blockquote className="quote" key={i}>
                <p>{block.text}</p>
                <cite>{block.source}</cite>
              </blockquote>
            )

          case 'note':
            return (
              <aside className="note" key={i}>
                <h4>{block.title}</h4>
                <ul>
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </aside>
            )

          case 'table':
            return (
              <figure className="table-wrap" key={i}>
                {block.caption && <figcaption>{block.caption}</figcaption>}
                <table>
                  <thead>
                    <tr>
                      {block.head.map((cell) => (
                        <th key={cell} scope="col">
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row) => (
                      <tr key={row.join('|')}>
                        {row.map((cell, j) => (
                          <td key={j}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </figure>
            )

          case 'acts':
            return null
        }
      })}
    </div>
  )
}
