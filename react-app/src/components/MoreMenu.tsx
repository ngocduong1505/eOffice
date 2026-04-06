import { useState } from 'react'

export interface MoreMenuItem {
  key: string
  label: string
  icon?: string
  danger?: boolean
  divider?: boolean  // divider trước item này
}

interface Props {
  items: MoreMenuItem[]
  onAction: (key: string) => void
}

export default function MoreMenu({ items, onAction }: Props) {
  const [open, setOpen] = useState(false)

  if (items.length === 0) return null

  return (
    <div style={{ position: 'relative' }}>
      <button
        className="dp-btn"
        style={{ padding: '7px 12px', fontWeight: 700, letterSpacing: 2 }}
        onClick={() => setOpen(v => !v)}
        title="Thêm thao tác"
      >
        ···
      </button>
      {open && (
        <div
          style={{
            position: 'absolute', right: 0, top: 'calc(100% + 4px)',
            background: '#fff', border: '1px solid var(--border)', borderRadius: 10,
            boxShadow: '0 6px 24px rgba(0,0,0,.13)', zIndex: 300,
            minWidth: 200, padding: '5px 0',
          }}
          onMouseLeave={() => setOpen(false)}
        >
          {items.map((item, i) => (
            <div key={item.key}>
              {item.divider && i > 0 && (
                <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
              )}
              <div
                onClick={() => { setOpen(false); onAction(item.key) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 9,
                  padding: '9px 16px', fontSize: '.82rem', cursor: 'pointer',
                  color: item.danger ? '#dc2626' : 'var(--dark)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f5f6fa')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {item.icon && <span style={{ fontSize: '.9rem', width: 18, textAlign: 'center' }}>{item.icon}</span>}
                {item.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
