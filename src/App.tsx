import { useCallback, useEffect, useMemo } from 'react'
import { article } from './content/article'
import { useActiveSection, usePersistentIds } from './hooks'
import { ActCard } from './components/ActCard'
import { Colophon } from './components/Colophon'
import { Hero } from './components/Hero'
import { Prose } from './components/Prose'
import { Toc } from './components/Toc'
import { TitleBlock } from './components/TitleBlock'

export default function App() {
  const sectionIds = useMemo(() => article.sections.map((s) => s.id), [])

  const allActIds = useMemo(
    () => article.sections.flatMap((s) => s.acts.filter((a) => !a.inline).map((a) => a.id)),
    [],
  )

  const [open, toggleOpen, setOpen] = usePersistentIds('ir-informatics:open', allActIds)

  const activeSection = useActiveSection(sectionIds)

  const jump = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const allOpen = open.length >= allActIds.length

  const toggleAll = useCallback(() => {
    setOpen(allOpen ? [] : allActIds)
  }, [allOpen, allActIds, setOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return

      if (e.key >= '1' && e.key <= '9') {
        const section = article.sections[Number(e.key) - 1]
        if (section) {
          e.preventDefault()
          jump(section.id)
        }
      } else if (e.key === '0') {
        e.preventDefault()
        jump(sectionIds[0])
      } else if (/^[rкRК]$/.test(e.key)) {
        e.preventDefault()
        toggleAll()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [jump, sectionIds, toggleAll])

  const actIndex = useMemo(() => {
    const map = new Map<string, number>()
    let n = 0
    for (const section of article.sections) {
      for (const act of section.acts) {
        if (!act.inline) map.set(act.id, n++)
      }
    }
    return map
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержанию
      </a>

      <main id="main" className="shell">
        <TitleBlock block={article.titleBlock} />

        <Hero article={article} actTotal={allActIds.length} />

        <Toc
          sections={article.sections.map((s) => ({
            id: s.id,
            num: s.num,
            title: s.title,
            actCount: s.acts.filter((a) => !a.inline).length,
          }))}
          activeId={activeSection}
          onJump={jump}
        />

        {article.sections.map((section) => {
          const visible = section.acts.filter((a) => !a.inline)

          return (
            <section className="section" id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
              <div className="section__head">
                <div className="section__num">{String(section.num).padStart(2, '0')}</div>
                <div>
                  <span className="label section__kicker">{section.kicker}</span>
                  <h2 className="section__title" id={`${section.id}-title`}>
                    {section.title}
                  </h2>
                </div>
              </div>

              <Prose blocks={section.intro.map((text) => ({ type: 'p', text }) as const)} />

              {section.blocks.length > 0 && <Prose blocks={section.blocks} />}

              {visible.length > 0 && (
                <div className="acts">
                  {visible.map((act) => (
                    <ActCard
                      key={act.id}
                      act={act}
                      index={actIndex.get(act.id) ?? 0}
                      open={open.includes(act.id)}
                      onToggleOpen={toggleOpen}
                    />
                  ))}
                </div>
              )}
            </section>
          )
        })}

        <section className="practice" id="practice" aria-labelledby="practice-title">
          <div className="section__head">
            <div className="section__num">§</div>
            <div>
              <span className="label section__kicker">Итог</span>
              <h2 className="section__title" id="practice-title">
                Практические выводы
              </h2>
            </div>
          </div>

          <div className="practice__grid">
            {article.practice.map((p) => (
              <div className="practice__item" key={p.num}>
                <div className="practice__num">{String(p.num).padStart(2, '0')}</div>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="hint">
            <span>
              <kbd>1</kbd>–<kbd>9</kbd> переход к разделу
            </span>
            <span>
              <kbd>0</kbd> в начало
            </span>
            <span>
              <kbd>R</kbd> развернуть / свернуть все карточки
            </span>
          </p>
        </section>

        <Colophon article={article} actTotal={allActIds.length} />
      </main>
    </>
  )
}
