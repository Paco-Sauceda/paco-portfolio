export interface MessageRow {
  id: number | string
  name: string | null
  email: string | null
  project_type: string | null
  message: string | null
  status: string | null
  created_at: string | null
}

type MessageStatus = 'new' | 'read' | 'archived'

interface MessagesTableProps {
  messages: MessageRow[]
  isLoading: boolean
  errorMessage: string | null
  onUpdateStatus?: (id: number | string, status: MessageStatus) => void
  updatingId?: number | string | null
  filter: MessageStatus | 'all'
  onFilterChange: (filter: MessageStatus | 'all') => void
}

function formatDate(value: string | null) {
  if (!value) return 'Sin fecha'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Sin fecha'

  return date.toLocaleString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const STATUS_LABELS: Record<string, string> = {
  new: 'Nuevo',
  read: 'Leído',
  archived: 'Archivado',
}

const STATUS_CLASSES: Record<string, string> = {
  new: 'status-badge-new',
  read: 'status-badge-read',
  archived: 'status-badge-archived',
}

function MessagesTable({
  messages,
  isLoading,
  errorMessage,
  onUpdateStatus,
  updatingId,
  filter,
  onFilterChange,
}: MessagesTableProps) {
  const newCount = messages.filter((m) => (m.status ?? 'new') === 'new').length

  const filtered =
    filter === 'all'
      ? messages
      : messages.filter((m) => (m.status ?? 'new') === filter)

  return (
    <section className="admin-panel-card admin-messages-panel">
      <div className="admin-panel-header">
        <div>
          <p className="admin-kicker">Inbox</p>
          <h2 className="admin-section-title">
            Mensajes recibidos
            {newCount > 0 ? (
              <span className="inbox-badge">{newCount}</span>
            ) : null}
          </h2>
        </div>
      </div>

      <div className="message-filters">
        {(['all', 'new', 'read', 'archived'] as const).map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'filter-btn-active' : ''}`}
            onClick={() => onFilterChange(f)}
            type="button"
          >
            {f === 'all' ? 'Todos' : STATUS_LABELS[f]}
            {f === 'new' && newCount > 0 ? ` (${newCount})` : ''}
          </button>
        ))}
      </div>

      {isLoading ? <p className="admin-muted">Cargando mensajes...</p> : null}
      {errorMessage ? <p className="admin-error">{errorMessage}</p> : null}

      {!isLoading && !errorMessage && filtered.length === 0 ? (
        <p className="admin-muted">No hay mensajes en esta categoría.</p>
      ) : null}

      {!isLoading && !errorMessage && filtered.length > 0 ? (
        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Producto</th>
                <th>Mensaje</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const status = (item.status ?? 'new') as MessageStatus
                return (
                  <tr key={item.id} className={status === 'new' ? 'row-new' : ''}>
                    <td>
                      <span className={`status-badge ${STATUS_CLASSES[status] ?? ''}`}>
                        {STATUS_LABELS[status] ?? status}
                      </span>
                    </td>
                    <td>{formatDate(item.created_at)}</td>
                    <td>{item.name ?? '-'}</td>
                    <td>{item.email ?? '-'}</td>
                    <td>{item.project_type ?? '-'}</td>
                    <td className="message-cell">{item.message ?? '-'}</td>
                    <td>
                      {onUpdateStatus ? (
                        <div className="message-actions">
                          {status === 'new' ? (
                            <button
                              className="admin-btn admin-btn-ghost admin-btn-sm"
                              disabled={updatingId === item.id}
                              onClick={() => onUpdateStatus(item.id, 'read')}
                              type="button"
                            >
                              Marcar leído
                            </button>
                          ) : null}
                          {status === 'read' ? (
                            <button
                              className="admin-btn admin-btn-ghost admin-btn-sm"
                              disabled={updatingId === item.id}
                              onClick={() => onUpdateStatus(item.id, 'archived')}
                              type="button"
                            >
                              Archivar
                            </button>
                          ) : null}
                          {status === 'archived' ? (
                            <button
                              className="admin-btn admin-btn-ghost admin-btn-sm"
                              disabled={updatingId === item.id}
                              onClick={() => onUpdateStatus(item.id, 'new')}
                              type="button"
                            >
                              Reabrir
                            </button>
                          ) : null}
                        </div>
                      ) : null}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  )
}

export default MessagesTable
