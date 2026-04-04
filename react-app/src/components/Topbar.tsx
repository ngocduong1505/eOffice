import { useNavigation } from '@/hooks/useNavigation'

interface TopbarProps {
  breadcrumb: string[]
  onNavClick?: (index: number) => void
}

export default function Topbar({ breadcrumb, onNavClick }: TopbarProps) {
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
        <div className="user-pill">
          <div className="uav">VT</div>
          <div className="uname">Văn Thư</div>
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
