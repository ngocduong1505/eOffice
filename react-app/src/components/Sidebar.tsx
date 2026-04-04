import { useNavigation } from '@/hooks/useNavigation'
import logo from "../assets/logo_EasyDocs.png";
interface SidebarNavItem {
  id: string
  label: string
}

interface SidebarGroup {
  key: string
  icon: string
  label: string
  badge?: { count: number; urgent?: boolean }
  defaultScreen: string
  items: SidebarNavItem[]
}

const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    key: 'vb-den', icon: '📥', label: 'Văn bản Đến',
    badge: { count: 8, urgent: true },
    defaultScreen: 's1',
    items: [
      { id: 's1', label: 'Danh sách' },
      { id: 's2', label: 'Tiếp nhận (Tạo văn bản)' },
      { id: 's3', label: 'Chi tiết' },
    ],
  },
  {
    key: 'vb-di', icon: '📤', label: 'Văn bản Đi',
    defaultScreen: 's8',
    items: [
      { id: 's8', label: 'Danh sách' },
      { id: 's9', label: 'Soạn thảo' },
      { id: 's10', label: 'Duyệt song song' },
      { id: 's11', label: 'GĐ ký số' },
      { id: 's12', label: 'Cấp số & Ban hành' },
      { id: 's13', label: 'Đã ban hành' },
    ],
  },
  {
    key: 'noi-bo', icon: '📋', label: 'Văn bản Nội bộ',
    defaultScreen: 's14',
    items: [
      { id: 's14', label: 'Danh sách' },
      { id: 's15', label: 'Tạo mới' },
    ],
  },
  {
    key: 'ho-so', icon: '🗂', label: 'Hồ sơ lưu trữ',
    defaultScreen: 's16',
    items: [
      { id: 's16', label: 'Danh sách' },
      { id: 's17', label: 'Tạo hồ sơ' },
      { id: 's18', label: 'Chi tiết' },
      { id: 's19', label: 'Nộp lưu' },
    ],
  },
  {
    key: 'so-bc', icon: '📒', label: 'Sổ & Báo cáo',
    defaultScreen: 's20',
    items: [
      { id: 's20', label: 'Sổ đăng ký' },
      { id: 's21', label: 'Cấu hình sổ' },
      { id: 's22', label: 'Báo cáo' },
    ],
  },
  {
    key: 'template', icon: '⚙️', label: 'Mẫu luồng',
    defaultScreen: 's7',
    items: [
      { id: 's7', label: 'Thiết lập luồng' },
    ],
  },
]

export default function Sidebar() {
  const { currentScreen, currentGroup, openGroups, goScreen, toggleNavGroup } = useNavigation()

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="logo-row">
        <img src={logo} alt="Logo" />
      </div>

      <button className="new-btn" onClick={() => goScreen('s2')}>
        + Tiếp nhận văn bản
      </button>

      {/* Văn phòng số nav groups */}
      <div className="nav-g">
        <div className="nav-sec">Văn phòng số</div>

        {SIDEBAR_GROUPS.map(group => {
          const isOpen = openGroups.has(group.key)
          const isParentActive = currentGroup === group.key

          return (
            <div key={group.key}>
              <div
                className={`ni sub ${isParentActive ? 'on' : ''}`}
                onClick={() => toggleNavGroup(group.key, group.defaultScreen)}
              >
                {group.icon} {group.label}
                {group.badge && (
                  <span className={`nbg ${group.badge.urgent ? 'u' : ''}`} style={{ marginLeft: 4 }}>
                    {group.badge.count}
                  </span>
                )}
                <span className="ni-arrow">▾</span>
              </div>
              <div className={`ni-children ${isOpen ? '' : 'collapsed'}`}>
                {group.items.map(item => (
                  <div
                    key={item.id}
                    className={`ni sub-2 ${currentScreen === item.id ? 'on' : ''}`}
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

      {/* Tài liệu */}
      <div className="nav-g">
        <div className="nav-sec">Tài liệu</div>
        <div className="ni">📄 Tài liệu của tôi</div>
        <div className="ni">✉️ Chờ tôi ký <span className="nbg u">12</span></div>
        <div className="ni">✅ Đã gửi</div>
      </div>

      {/* Hệ thống */}
      <div className="nav-g">
        <div className="nav-sec">Hệ thống</div>
        <div className="ni">🏢 Đơn vị</div>
        <div className="ni">⚙️ Cấu hình</div>
      </div>
    </div>
  )
}
