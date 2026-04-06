import { useEffect } from 'react'
import type { UserAccount } from '@/hooks/useCurrentUser'

interface HandoffToastProps {
  msg: string
  nextUser: UserAccount
  onSwitch: () => void
  onDismiss: () => void
}

export default function HandoffToast({ msg, nextUser, onSwitch, onDismiss }: HandoffToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 5000)
    return () => clearTimeout(t)
  }, [onDismiss])

  return (
    <div style={{
      position: 'fixed', bottom: 28, right: 28, zIndex: 1000,
      background: '#1e293b', color: '#f8fafc',
      borderRadius: 14, padding: '14px 16px 14px 16px',
      boxShadow: '0 12px 40px rgba(0,0,0,.3)',
      display: 'flex', flexDirection: 'column', gap: 12,
      minWidth: 290, maxWidth: 340,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <span style={{ fontSize: '.78rem', letterSpacing: '.4px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
          Handoff
        </span>
        <span style={{
          marginLeft: 'auto', cursor: 'pointer', color: '#64748b',
          fontSize: '.9rem', lineHeight: 1,
        }} onClick={onDismiss}>✕</span>
      </div>

      {/* Message */}
      <div style={{ fontSize: '.86rem', fontWeight: 600, lineHeight: 1.45, color: '#f1f5f9' }}>
        {msg}
      </div>

      {/* Next user + action */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        borderTop: '1px solid #334155', paddingTop: 12,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
          background: '#ea580c', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '.72rem', fontWeight: 700,
        }}>{nextUser.avatar}</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '.82rem', fontWeight: 600, color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {nextUser.name}
          </div>
          <div style={{ fontSize: '.72rem', color: '#94a3b8' }}>{nextUser.title} · {nextUser.dept}</div>
        </div>

        <button
          onClick={onSwitch}
          style={{
            background: '#ea580c', color: '#fff', border: 'none',
            borderRadius: 7, padding: '7px 13px', cursor: 'pointer',
            fontSize: '.78rem', fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0,
          }}
        >
          Chuyển →
        </button>
      </div>
    </div>
  )
}
