import type { MessageRow } from './MessagesTable'

const PRODUCT_COLORS: Record<string, string> = {
  'Fotografía': '#6e8de6',
  'Marcos': '#e6a56e',
  'Video': '#6ee6a5',
  'Bodas': '#e66e8d',
  'Comercial': '#a56ee6',
}

const ALL_PRODUCTS = ['Fotografía', 'Marcos', 'Video', 'Bodas', 'Comercial']

interface ProductAnalyticsProps {
  messages: MessageRow[]
}

function ProductAnalytics({ messages }: ProductAnalyticsProps) {
  const counts: Record<string, number> = {}
  for (const product of ALL_PRODUCTS) {
    counts[product] = 0
  }
  for (const msg of messages) {
    const type = msg.project_type ?? ''
    if (type in counts) {
      counts[type]++
    } else if (type) {
      counts[type] = (counts[type] || 0) + 1
    }
  }

  const total = messages.length
  const sorted = Object.entries(counts)
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a)

  const maxCount = sorted.length > 0 ? sorted[0][1] : 1

  // Recent trend: messages from last 30 days vs previous 30 days
  const now = Date.now()
  const thirtyDays = 30 * 24 * 60 * 60 * 1000
  const recentMessages = messages.filter((m) => {
    const t = m.created_at ? new Date(m.created_at).getTime() : 0
    return now - t < thirtyDays
  })
  const olderMessages = messages.filter((m) => {
    const t = m.created_at ? new Date(m.created_at).getTime() : 0
    return now - t >= thirtyDays && now - t < thirtyDays * 2
  })

  const trendDelta = recentMessages.length - olderMessages.length
  const trendLabel =
    trendDelta > 0
      ? `+${trendDelta} vs mes anterior`
      : trendDelta < 0
        ? `${trendDelta} vs mes anterior`
        : 'Sin cambio vs mes anterior'

  // Most popular product this month
  const recentCounts: Record<string, number> = {}
  for (const msg of recentMessages) {
    const type = msg.project_type ?? ''
    if (type) recentCounts[type] = (recentCounts[type] || 0) + 1
  }
  const topRecent = Object.entries(recentCounts).sort(([, a], [, b]) => b - a)[0]

  return (
    <section className="admin-panel-card">
      <div className="admin-panel-header">
        <div>
          <p className="admin-kicker">Analíticas</p>
          <h2 className="admin-section-title">Demanda por producto</h2>
        </div>
      </div>

      <div className="analytics-summary-row">
        <div className="analytics-stat">
          <strong>{total}</strong>
          <span>Total consultas</span>
        </div>
        <div className="analytics-stat">
          <strong>{recentMessages.length}</strong>
          <span>Últimos 30 días</span>
        </div>
        <div className="analytics-stat">
          <strong>{trendLabel}</strong>
          <span>Tendencia</span>
        </div>
        {topRecent ? (
          <div className="analytics-stat">
            <strong>{topRecent[0]}</strong>
            <span>Más pedido este mes ({topRecent[1]})</span>
          </div>
        ) : null}
      </div>

      {sorted.length === 0 ? (
        <p className="admin-muted">No hay datos de consultas todavía.</p>
      ) : (
        <div className="analytics-bars">
          {sorted.map(([product, count]) => {
            const pct = total > 0 ? Math.round((count / total) * 100) : 0
            const barWidth = Math.max((count / maxCount) * 100, 4)
            const color = PRODUCT_COLORS[product] ?? '#6e8de6'

            return (
              <div className="analytics-bar-row" key={product}>
                <span className="analytics-bar-label">{product}</span>
                <div className="analytics-bar-track">
                  <div
                    className="analytics-bar-fill"
                    style={{ width: `${barWidth}%`, background: color }}
                  />
                </div>
                <span className="analytics-bar-value">
                  {count} ({pct}%)
                </span>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default ProductAnalytics
