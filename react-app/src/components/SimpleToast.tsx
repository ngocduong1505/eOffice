import { useEffect } from 'react'

interface SimpleToastProps {
  msg: string
  type?: 'success' | 'info'
  onDismiss: () => void
}

export default function SimpleToast({ msg, type = 'success', onDismiss }: SimpleToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000)
    return () => clearTimeout(t)
  }, [onDismiss])

  const bg = type === 'success' ? '#16a34a' : '#2d3142'

  return (
    <div style={{
      position: 'fixed', top: 20, right: 24, zIndex: 1000,
      background: bg, color: '#fff',
      borderRadius: 10, padding: '12px 16px',
      boxShadow: '0 8px 28px rgba(0,0,0,.22)',
      display: 'flex', alignItems: 'center', gap: 10,
      minWidth: 260, maxWidth: 360,
      animation: 'fadeSlideUp .2s ease',
    }}>
      <span style={{ fontSize: '1rem', flexShrink: 0 }}>✅</span>
      <span style={{ fontSize: '.84rem', fontWeight: 600, flex: 1, lineHeight: 1.4 }}>{msg}</span>
      <span onClick={onDismiss} style={{ cursor: 'pointer', opacity: .7, fontSize: '.85rem', flexShrink: 0 }}>✕</span>
    </div>
  )
}
