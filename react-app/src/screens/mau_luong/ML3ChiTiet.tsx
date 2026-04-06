import { useNavigation } from '@/hooks/useNavigation'
import type { FlowItem } from './types'
import {
  INITIAL_FLOWS, TYPE_LABELS, STATUS_LABELS,
  BEHAVIOR_LABELS, ROLE_LABELS, getMockSteps,
} from './types'

export default function ML3ChiTiet() {
  const { goScreen, screenParams } = useNavigation()

  // Resolve flowId from nav params, fall back to first flow
  const flowId = (screenParams.flowId as number) ?? INITIAL_FLOWS[0].id
  const flowsSnapshot = (screenParams.flowsSnapshot as FlowItem[]) ?? INITIAL_FLOWS
  const flow: FlowItem = flowsSnapshot.find(f => f.id === flowId) ?? INITIAL_FLOWS[0]

  const steps = getMockSteps(flow)
  const st = STATUS_LABELS[flow.status]
  const totalHours = steps.reduce((s, x) => s + x.deadline, 0)
  const uniqueBehaviors = [...new Set(steps.map(s => s.behavior))]
  const uniqueRoles = [...new Set(steps.flatMap(s => s.roles))]

  const timeoutLabel = (t: string) =>
    t === 'stop' ? 'Dừng khi quá hạn' : t === 'skip' ? 'Bỏ qua khi quá hạn' : 'Thông báo & tiếp tục'

  return (
    <div className="cw" style={{ overflow: 'hidden' }}>

      {/* ── Header Row 1: breadcrumb ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f3f4f6', padding: '0 24px', position: 'sticky', top: 0, zIndex: 50, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              onClick={() => goScreen('ml1')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: 4, borderRadius: 4, display: 'flex', alignItems: 'center' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#ea580c'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#6b7280'}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <span style={{ color: '#9ca3af', fontSize: 13, cursor: 'pointer' }} onClick={() => goScreen('ml1')}>Danh sách quy trình xử lý</span>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth="2"><path strokeLinecap="round" d="M9 5l7 7-7 7"/></svg>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#1f2937' }}>{flow.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#6b7280', position: 'relative' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              <span style={{ position: 'absolute', top: 2, right: 2, width: 7, height: 7, background: '#ea580c', borderRadius: '50%', border: '1.5px solid #fff' }} />
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#6b7280' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
            </button>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>NA</div>
          </div>
        </div>
      </div>

      {/* ── Header Row 2: actions ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 24px', position: 'sticky', top: 48, zIndex: 49, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, height: 42 }}>
          <button
            onClick={() => goScreen('ml1')}
            style={{ padding: '5px 14px', borderRadius: 6, border: '1.5px solid #d1d5db', background: '#fff', fontSize: 13, cursor: 'pointer' }}
          >Đóng</button>
          <button
            onClick={() => goScreen('ml2', { editFlow: flow })}
            style={{ padding: '5px 16px', borderRadius: 6, border: 'none', background: '#ea580c', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Chỉnh sửa
          </button>
        </div>
      </div>

      {/* ── Main 3:2 grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', flex: 1, overflow: 'hidden', height: 'calc(100vh - 90px)' }}>

        {/* LEFT: Info + Steps */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', background: '#fff', display: 'flex', flexDirection: 'column', gap: 16, borderRight: '1px solid #e5e7eb' }}>

          {/* Thông tin quy trình */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ background: '#f9fafb', padding: '10px 16px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#ea580c" strokeWidth="2"><path strokeLinecap="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '.05em' }}>Thông tin quy trình</span>
            </div>
            <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { label: 'Tên quy trình', content: <div style={{ fontSize: 15, fontWeight: 700, color: '#1f2937' }}>{flow.name}</div> },
                { label: 'Trạng thái', content: <span className={`ml-badge ${st.cls}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', fontSize: 12 }}><span className={`ml-dot ${st.dot}`} />{st.label}</span> },
                { label: 'Loại VB áp dụng', content: <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{flow.types.map(t => <span key={t} className={`ml-badge ${TYPE_LABELS[t]?.cls}`} style={{ padding: '2px 8px', fontSize: 11 }}>{TYPE_LABELS[t]?.label}</span>)}</div> },
                { label: 'Số bước xử lý', content: <div style={{ fontSize: 14, fontWeight: 700, color: '#ea580c' }}>{flow.steps} bước</div> },
                { label: 'Ngày tạo', content: <div style={{ fontSize: 13, color: '#374151' }}>{flow.created}</div> },
                { label: 'Người tạo', content: <div style={{ fontSize: 13, color: '#374151' }}>{flow.author}</div> },
              ].map(({ label, content }) => (
                <div key={label}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 5 }}>{label}</div>
                  {content}
                </div>
              ))}
            </div>
          </div>

          {/* Các bước xử lý */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ background: '#f9fafb', padding: '10px 16px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#ea580c" strokeWidth="2"><path strokeLinecap="round" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '.05em' }}>Các bước xử lý</span>
              <span style={{ background: '#fff7ed', color: '#ea580c', fontSize: 11, fontWeight: 700, padding: '1px 8px', borderRadius: 99, border: '1px solid #fed7aa', marginLeft: 2 }}>{steps.length} bước</span>
            </div>
            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {steps.map((s, i) => (
                <div key={i} style={{ background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#fff7ed', border: '2px solid #ea580c', color: '#ea580c', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, color: '#1f2937', fontSize: 14, marginBottom: 5 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: '#6b7280', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                        {BEHAVIOR_LABELS[s.behavior] || s.behavior}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                        {s.deadline} giờ
                      </span>
                      {s.roles.length > 0 && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                          {s.roles.map(r => ROLE_LABELS[r] || r).join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    <span style={{ fontSize: 11, background: '#f3f4f6', color: '#6b7280', padding: '2px 8px', borderRadius: 4 }}>{timeoutLabel(s.timeout)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Summary panel */}
        <div style={{ padding: 20, overflowY: 'auto', background: '#f5f6fa', display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Tóm tắt */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.05em', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#ea580c" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 8v4l3 3"/></svg>
              Tóm tắt
            </div>
            {[
              { label: 'Tổng số bước', value: `${flow.steps} bước` },
              { label: 'Tổng thời hạn tối đa', value: `${totalHours} giờ` },
              { label: 'Đang áp dụng cho VB', value: flow.hasDoc ? 'Có' : 'Chưa có' },
            ].map(({ label, value }, i, arr) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                <span style={{ fontSize: 13, color: '#6b7280' }}>{label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#1f2937' }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Hành vi trong quy trình */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.05em', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#ea580c" strokeWidth="2"><path strokeLinecap="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
              Hành vi trong quy trình
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {uniqueBehaviors.map(b => (
                <span key={b} style={{ background: '#fff7ed', color: '#ea580c', border: '1px solid #fed7aa', borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 500 }}>
                  {BEHAVIOR_LABELS[b] || b}
                </span>
              ))}
            </div>
          </div>

          {/* Vai trò tham gia */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.05em', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#ea580c" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
              Vai trò tham gia
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {uniqueRoles.length === 0
                ? <span style={{ fontSize: 13, color: '#9ca3af' }}>Chưa phân công vai trò</span>
                : uniqueRoles.map(r => (
                  <span key={r} style={{ background: '#ede9fe', color: '#7c3aed', border: '1px solid #ddd6fe', borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 500 }}>
                    {ROLE_LABELS[r] || r}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
