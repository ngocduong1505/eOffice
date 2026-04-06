import { useState, useRef, useEffect } from 'react'
import { useNavigation } from '@/hooks/useNavigation'
import { useCurrentUser, ACCOUNTS } from '@/hooks/useCurrentUser'

interface TopbarProps {
  breadcrumb: string[]
  onNavClick?: (index: number) => void
}

export default function Topbar({ breadcrumb, onNavClick }: TopbarProps) {
  const { currentUser, setCurrentUser } = useCurrentUser()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="topbar">
      <div className="breadcrumb">
        {breadcrumb.map((crumb, i) => (
          <>
            {i > 0 && <span key={`sep-${i}`} className="bc-sep">›</span>}
            {i < breadcrumb.length - 1 ? (
              <span
                key={crumb}
                style={{ cursor: onNavClick ? 'pointer' : 'default', color: 'var(--text3)' }}
                onClick={() => onNavClick?.(i)}
              >
                {crumb}
              </span>
            ) : (
              <span key={crumb} className="cur">{crumb}</span>
            )}
          </>
        ))}
      </div>

      <div className="top-right">
        <div className="notif">🔔<div className="ndot" /></div>

        {/* User switcher */}
        <div ref={ref} style={{ position: 'relative' }}>
          <div
            className="user-pill"
            onClick={() => setOpen(p => !p)}
            style={{ cursor: 'pointer', userSelect: 'none', gap: 8 }}
          >
            <div className="uav">{currentUser.avatar}</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.2 }}>
              <div className="uname">{currentUser.name.split(' ').slice(-2).join(' ')}</div>
              <div style={{ fontSize: '.68rem', color: 'var(--text3)', fontWeight: 400 }}>{currentUser.title}</div>
            </div>
            <span style={{ fontSize: '.65rem', color: 'var(--text3)', marginLeft: 2 }}>▼</span>
          </div>

          {open && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 400,
              background: '#fff', border: '1px solid var(--border)', borderRadius: 10,
              boxShadow: '0 8px 28px rgba(0,0,0,.14)', minWidth: 230, padding: '6px 0',
            }}>
              <div style={{ padding: '8px 14px 6px', borderBottom: '1px solid var(--border)', marginBottom: 4 }}>
                <div style={{ fontSize: '.68rem', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.6px' }}>
                  Chuyển tài khoản
                </div>
              </div>
              {ACCOUNTS.map(acc => {
                const active = acc.id === currentUser.id
                return (
                  <div
                    key={acc.id}
                    onClick={() => { setCurrentUser(acc); setOpen(false) }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '9px 14px', cursor: 'pointer',
                      background: active ? '#fff7ed' : 'transparent',
                    }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#f8fafc' }}
                    onMouseLeave={e => { e.currentTarget.style.background = active ? '#fff7ed' : 'transparent' }}
                  >
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%',
                      background: active ? 'var(--orange)' : '#e2e8f0',
                      color: active ? '#fff' : 'var(--text2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '.72rem', fontWeight: 700, flexShrink: 0,
                    }}>
                      {acc.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '.82rem', fontWeight: active ? 700 : 500, color: 'var(--dark)' }}>{acc.name}</div>
                      <div style={{ fontSize: '.72rem', color: 'var(--text3)' }}>{acc.title} · {acc.dept}</div>
                    </div>
                    {active && <span style={{ color: 'var(--orange)', fontSize: '.8rem' }}>✓</span>}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// A simple hook shortcut to use inside screens
export function useGoScreen() {
  const { goScreen } = useNavigation()
  return goScreen
}
