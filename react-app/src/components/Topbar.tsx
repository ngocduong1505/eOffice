import { useState, useRef, useEffect } from 'react'
import { useNavigation } from '@/hooks/useNavigation'
import { useCurrentUser, ACCOUNTS } from '@/hooks/useCurrentUser'
import type { UserAccount } from '@/hooks/useCurrentUser'

interface TopbarProps {
  breadcrumb: string[]
  onNavClick?: (index: number) => void
}

// ─── Notification data ────────────────────────────────────────────────────────
interface Notif {
  id: string
  icon: string
  title: string
  sub: string
  time: string
  screen: string
  params?: Record<string, unknown>
  unread?: boolean
}

function getNotifs(role: UserAccount['role']): Notif[] {
  switch (role) {
    case 'giam-doc': return [
      { id: 'gd1', icon: '📄', title: 'VB đến chờ chỉ đạo', sub: '45/CV-SYT · Sở Y tế TP.HCM', time: '08:14', screen: 's3', params: { status: 'cho-chi-dao' }, unread: true },
      { id: 'gd2', icon: '📄', title: 'VB đến chờ chỉ đạo', sub: '32/TB-BYT · Bộ Y tế', time: 'Hôm qua', screen: 's3', params: { status: 'cho-chi-dao' }, unread: true },
      { id: 'gd3', icon: '🔐', title: 'VB đi chờ ký số', sub: 'Báo cáo KCB Q1/2026', time: '10:30', screen: 's11', unread: true },
      { id: 'gd4', icon: '🔐', title: 'VB đi chờ ký số', sub: 'Kế hoạch đào tạo 2026', time: 'Hôm qua', screen: 's11' },
    ]
    case 'thu-ky': return [
      { id: 'tk1', icon: '🔀', title: 'VB đến chờ điều phối', sub: '45/CV-SYT · Lãnh đạo đã chỉ đạo', time: '09:05', screen: 's3', params: { status: 'cho-dieu-phoi' }, unread: true },
      { id: 'tk2', icon: '🔀', title: 'VB đến chờ điều phối', sub: '12/QĐ-UBND · UBND TP.HCM', time: 'Hôm qua', screen: 's3', params: { status: 'cho-dieu-phoi' } },
      { id: 'tk3', icon: '✅', title: 'VB đi cần duyệt', sub: 'Báo cáo KCB Q1/2026', time: '10:00', screen: 's10', unread: true },
    ]
    case 'van-thu': return [
      { id: 'vt1', icon: '📥', title: 'VB đến mới cần tiếp nhận', sub: 'Từ Sở Y tế TP.HCM', time: '07:50', screen: 's2', unread: true },
      { id: 'vt2', icon: '📥', title: 'VB đến mới cần tiếp nhận', sub: 'Từ BHXH TP.HCM', time: '08:20', screen: 's2', unread: true },
      { id: 'vt3', icon: '🏷', title: 'VB đi chờ cấp số & ban hành', sub: 'Báo cáo KCB Q1/2026', time: '11:00', screen: 's12', unread: true },
      { id: 'vt4', icon: '🏷', title: 'VB đi chờ cấp số & ban hành', sub: 'Kế hoạch đào tạo 2026', time: 'Hôm qua', screen: 's12' },
    ]
    case 'xu-ly': return [
      { id: 'xl1', icon: '📋', title: 'VB được giao xử lý', sub: '45/CV-SYT · Hạn: 28/03/2026', time: '09:30', screen: 's3', params: { status: 'cho-xu-ly' }, unread: true },
      { id: 'xl2', icon: '📋', title: 'VB được giao xử lý', sub: '12/QĐ-UBND · Hạn: 01/04/2026', time: 'Hôm qua', screen: 's3', params: { status: 'cho-xu-ly' } },
      { id: 'xl3', icon: '✅', title: 'VB đi cần duyệt nội dung', sub: 'Báo cáo KCB Q1/2026', time: '10:00', screen: 's10', unread: true },
    ]
    default: return []
  }
}

export default function Topbar({ breadcrumb, onNavClick }: TopbarProps) {
  const { goScreen } = useNavigation()
  const { currentUser, setCurrentUser } = useCurrentUser()
  const [open, setOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [readIds, setReadIds] = useState<Set<string>>(new Set())
  const ref = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)

  const notifs = getNotifs(currentUser.role)
  const unreadCount = notifs.filter(n => n.unread && !readIds.has(n.id)).length

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleNotifClick = (n: Notif) => {
    setReadIds(prev => new Set([...prev, n.id]))
    setNotifOpen(false)
    goScreen(n.screen, n.params)
  }

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
        {/* ── Bell ── */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <div
            className="notif"
            onClick={() => setNotifOpen(p => !p)}
            style={{ cursor: 'pointer', position: 'relative' }}
          >
            🔔
            {unreadCount > 0 && (
              <div className="ndot" style={{ position: 'absolute', top: 0, right: 0, background: '#ef4444', color: '#fff', borderRadius: '50%', width: 16, height: 16, fontSize: '.6rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
                {unreadCount}
              </div>
            )}
          </div>

          {notifOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0, zIndex: 500,
              background: '#fff', border: '1px solid var(--border)', borderRadius: 12,
              boxShadow: '0 10px 32px rgba(0,0,0,.16)', width: 320,
            }}>
              <div style={{ padding: '12px 16px 10px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '.85rem', fontWeight: 700, color: 'var(--dark)' }}>Thông báo</div>
                {unreadCount > 0 && (
                  <button
                    onClick={() => setReadIds(new Set(notifs.map(n => n.id)))}
                    style={{ fontSize: '.72rem', color: 'var(--orange)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Đánh dấu đã đọc
                  </button>
                )}
              </div>
              <div style={{ maxHeight: 360, overflowY: 'auto' }}>
                {notifs.length === 0 ? (
                  <div style={{ padding: '28px 16px', textAlign: 'center', color: 'var(--text3)', fontSize: '.82rem' }}>
                    Không có thông báo
                  </div>
                ) : notifs.map(n => {
                  const isUnread = n.unread && !readIds.has(n.id)
                  return (
                    <div
                      key={n.id}
                      onClick={() => handleNotifClick(n)}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: 10,
                        padding: '11px 16px', cursor: 'pointer',
                        background: isUnread ? '#fffbf5' : '#fff',
                        borderBottom: '1px solid #f1f5f9',
                        transition: 'background .12s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#fff7ed' }}
                      onMouseLeave={e => { e.currentTarget.style.background = isUnread ? '#fffbf5' : '#fff' }}
                    >
                      <div style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: 1 }}>{n.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '.8rem', fontWeight: isUnread ? 700 : 500, color: 'var(--dark)', display: 'flex', alignItems: 'center', gap: 6 }}>
                          {n.title}
                          {isUnread && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--orange)', display: 'inline-block', flexShrink: 0 }} />}
                        </div>
                        <div style={{ fontSize: '.72rem', color: 'var(--text3)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.sub}</div>
                      </div>
                      <div style={{ fontSize: '.68rem', color: 'var(--text3)', flexShrink: 0, marginTop: 2 }}>{n.time}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

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
