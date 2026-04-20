interface StatItem {
  value: string
  label: string
  detail: string
}

interface StatsSectionProps {
  items: StatItem[]
}

function StatsSection({ items }: StatsSectionProps) {
  return (
    <section className="section-block stats-shell">
      <div className="container stats-grid">
        {items.map((item) => (
          <article className="stat-card" key={item.label}>
            <p className="stat-value">{item.value}</p>
            <h3>{item.label}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default StatsSection