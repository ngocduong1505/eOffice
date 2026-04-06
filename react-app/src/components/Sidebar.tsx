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

      {/* ── CTA ── */}
      <div style={{ padding: '12px 12px 8px', flexShrink: 0 }}>
        <button
          className="new-btn"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, margin: 0, width: '100%' }}
          onClick={() => goScreen('s2')}
        >
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" d="M12 4v16m8-8H4" />
          </svg>
          Tiếp nhận văn bản
        </button>
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
