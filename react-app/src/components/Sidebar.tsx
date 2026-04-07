import { useState } from 'react'
import { useNavigation } from '@/hooks/useNavigation'

interface SidebarNavItem { id: string; label: string }
interface SidebarGroup {
  key: string
  label: string
  badge?: { count: number; urgent?: boolean }
  defaultScreen: string
  items: SidebarNavItem[]
  noDropdown?: boolean
}

const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    key: 'vb-den', label: 'Văn bản Đến',
    badge: { count: 86, urgent: true },
    defaultScreen: 's1', noDropdown: true,
    items: [{ id: 's1', label: 'Danh sách' }],
  },
  {
    key: 'vb-di', label: 'Văn bản Đi',
    badge: { count: 68, urgent: true },
    defaultScreen: 's8', noDropdown: true,
    items: [{ id: 's8', label: 'Danh sách' }],
  },
  {
    key: 'noi-bo', label: 'Văn bản Nội bộ',
    defaultScreen: 's14',
    items: [{ id: 's14', label: 'Danh sách' }, { id: 's15', label: 'Tạo mới' }],
  },
  {
    key: 'ho-so', label: 'Hồ sơ lưu trữ',
    defaultScreen: 's16',
    items: [
      { id: 's16', label: 'Danh sách' }, { id: 's17', label: 'Tạo hồ sơ' },
      { id: 's18', label: 'Chi tiết' },  { id: 's19', label: 'Nộp lưu' },
    ],
  },
  {
    key: 'so-bc', label: 'Sổ & Báo cáo',
    defaultScreen: 's20',
    items: [
      { id: 's20', label: 'Sổ đăng ký' },
      { id: 's21', label: 'Cấu hình sổ' },
      { id: 's22', label: 'Báo cáo' },
    ],
  },
  {
    key: 'mau-luong', label: 'Quy trình xử lý',
    badge: { count: 88, urgent: true },
    defaultScreen: 'ml1', noDropdown: true,
    items: [{ id: 's1', label: 'Danh sách' }],
  },
]

// ── Icon config per group ──────────────────────────────────────────────────────
const ICON_CFG: Record<string, { bg: string; stroke: string; paths: React.ReactNode }> = {
  'vb-den': {
    bg: '#fee2e2', stroke: '#dc2626',
    paths: <path strokeLinecap="round" d="M3 16l4 4 4-4M7 20V4M13 8h8M13 12h6M13 16h4" />,
  },
  'vb-di': {
    bg: '#dbeafe', stroke: '#1d4ed8',
    paths: <path strokeLinecap="round" d="M21 8l-4-4-4 4M17 4v16M11 16H3M11 12H5M11 8H7" />,
  },
  'noi-bo': {
    bg: '#fef9c3', stroke: '#a16207',
    paths: <path strokeLinecap="round" d="M9 12h6M9 16h6M7 4h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" />,
  },
  'ho-so': {
    bg: '#f3f4f6', stroke: '#374151',
    paths: <>
      <path strokeLinecap="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
      <path strokeLinecap="round" d="M10 12h4" />
    </>,
  },
  'so-bc': {
    bg: '#fef3c7', stroke: '#d97706',
    paths: <path strokeLinecap="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
  },
  'mau-luong': {
    bg: '#fff7ed', stroke: '#ea580c',
    paths: <>
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" d="M19.07 4.93l-1.41 1.41M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M2 12h2M20 12h2" />
    </>,
  },
}

function GroupIcon({ groupKey }: { groupKey: string }) {
  const cfg = ICON_CFG[groupKey]
  if (!cfg) return null
  return (
    <div className="sb-icon" style={{ background: cfg.bg }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={cfg.stroke} strokeWidth="2.5">
        {cfg.paths}
      </svg>
    </div>
  )
}

const WORKSPACES = [
  {
    value: 'van-phong-so', label: 'Văn phòng số',
    color: '#ea580c',
    icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/><path strokeLinecap="round" d="M3 7l9 6 9-6"/></svg>,
  },
  {
    value: 'hop-dong', label: 'Hợp đồng điện tử',
    color: '#2563eb',
    icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" d="M9 12h6M9 16h6M7 4h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"/><path strokeLinecap="round" d="M9 4v4h6V4"/></svg>,
  },
]

function WorkspaceSwitcher() {
  const [active, setActive] = useState('van-phong-so')
  const [open, setOpen] = useState(false)
  const current = WORKSPACES.find(w => w.value === active)!

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(p => !p)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 10px', borderRadius: 9, cursor: 'pointer',
          border: '1.5px solid #e2e8f0', background: '#f8fafc',
          boxShadow: '0 1px 3px rgba(0,0,0,.06)', textAlign: 'left',
        }}
      >
        <span style={{ color: current.color, flexShrink: 0, display: 'flex' }}>{current.icon}</span>
        <span style={{ flex: 1, fontSize: 12.5, fontWeight: 700, color: '#1f2937', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{current.label}</span>
        <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth="2.5" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}>
          <path strokeLinecap="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          style={{
            position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 300,
            background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10,
            boxShadow: '0 6px 20px rgba(0,0,0,.12)', overflow: 'hidden',
          }}
        >
          {WORKSPACES.map(w => (
            <div
              key={w.value}
              onClick={() => { setActive(w.value); setOpen(false) }}
              style={{
                display: 'flex', alignItems: 'center', gap: 9, padding: '9px 12px',
                cursor: 'pointer', fontSize: 12.5, fontWeight: w.value === active ? 700 : 500,
                color: '#1f2937', background: w.value === active ? '#fff7ed' : '#fff',
              }}
              onMouseEnter={e => { if (w.value !== active) e.currentTarget.style.background = '#f8fafc' }}
              onMouseLeave={e => { e.currentTarget.style.background = w.value === active ? '#fff7ed' : '#fff' }}
            >
              <span style={{ color: w.color, display: 'flex', flexShrink: 0 }}>{w.icon}</span>
              <span style={{ flex: 1 }}>{w.label}</span>
              {w.value === active && <span style={{ color: w.color, fontSize: 11, fontWeight: 800 }}>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Sidebar() {
  const { currentScreen, currentGroup, openGroups, goScreen, toggleNavGroup } = useNavigation()

  return (
    <div className="sidebar">

      {/* ── Logo ── */}
      <div style={{ padding: '16px 16px 14px', borderBottom: '1px solid #f3f4f6', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, flexShrink: 0,
            background: 'linear-gradient(135deg, #ea580c, #f97316)',
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path strokeLinecap="round" d="M9 12h6M9 16h6M7 4h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" />
              <path strokeLinecap="round" d="M9 4v4h6V4" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#1f2937', lineHeight: 1.15 }}>
              Easy<span style={{ color: '#ea580c' }}>Docs</span>
            </div>
            <div style={{ fontSize: 10, color: '#9ca3af', letterSpacing: '.02em' }}>Document Management</div>
          </div>
        </div>
      </div>

      {/* ── Workspace Switcher ── */}
      <div style={{ padding: '10px 12px 8px', flexShrink: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 5, paddingLeft: 2 }}>
          
        </div>
        <WorkspaceSwitcher />
      </div>

      {/* ── Nav: Văn phòng số ── */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
        <div className="nav-sec">Văn phòng số</div>

        {SIDEBAR_GROUPS.map(group => {
          const isOpen   = openGroups.has(group.key)
          const isActive = currentGroup === group.key

          if (group.noDropdown) {
            return (
              <div
                key={group.key}
                className={`sb-item${isActive ? ' on' : ''}`}
                onClick={() => goScreen(group.defaultScreen)}
              >
                <div className="sb-item-left">
                  <GroupIcon groupKey={group.key} />
                  <span className="sb-label">{group.label}</span>
                </div>
                {group.badge && (
                  <span className={`nbg${group.badge.urgent ? ' u' : ''}`}>{group.badge.count}</span>
                )}
              </div>
            )
          }

          return (
            <div key={group.key}>
              <div
                className={`sb-item${isActive ? ' on' : ''}`}
                onClick={() => toggleNavGroup(group.key, group.defaultScreen)}
              >
                <div className="sb-item-left">
                  <GroupIcon groupKey={group.key} />
                  <span className="sb-label">{group.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {group.badge && (
                    <span className={`nbg${group.badge.urgent ? ' u' : ''}`}>{group.badge.count}</span>
                  )}
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke={isActive ? '#ea580c' : '#9ca3af'} strokeWidth="2.5"
                    style={{ transition: 'transform .2s', transform: isOpen ? 'rotate(90deg)' : 'none' }}
                  >
                    <path strokeLinecap="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              <div className={`ni-children${isOpen ? '' : ' collapsed'}`}>
                {group.items.map(item => (
                  <div
                    key={item.id}
                    className={`sb-sub-item${currentScreen === item.id ? ' on' : ''}`}
                    onClick={() => goScreen(item.id)}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
