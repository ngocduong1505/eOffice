import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigation } from '@/hooks/useNavigation'
import type { FlowItem } from './types'
import { INITIAL_FLOWS, TYPE_LABELS, STATUS_LABELS,
  getMockSteps,
} from './types'

// ─── TOAST ───────────────────────────────────────────────────────────────────
function Toast({ message, type, onHide }: { message: string; type: string; onHide: () => void }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(onHide, 3000)
    return () => clearTimeout(t)
  }, [message, onHide])
  if (!message) return null
  const bg = type === 'success' ? '#15803d' : type === 'error' ? '#dc2626' : '#1f2937'
  return (
    <div style={{
      position: 'fixed', bottom: 28, right: 28, background: bg, color: '#fff',
      padding: '12px 20px', borderRadius: 8, fontSize: 14, zIndex: 600,
      boxShadow: '0 4px 16px rgba(0,0,0,.2)', maxWidth: 360, animation: 'fadeIn .25s',
    }}>
      {message}
    </div>
  )
}

// ─── CONFIRM MODAL ────────────────────────────────────────────────────────────
function ConfirmModal({
  title, body, confirmLabel, isDanger, onConfirm, onClose,
}: {
  title: string; body: string; confirmLabel: string;
  isDanger?: boolean; onConfirm: () => void; onClose: () => void;
}) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div style={{ background: '#fff', borderRadius: 12, padding: 28, maxWidth: 420, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,.2)' }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#1f2937', marginBottom: 10 }}>{title}</div>
        <div style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: body }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 22 }}>
          <button
            onClick={onClose}
            style={{ padding: '8px 18px', borderRadius: 6, border: '1.5px solid #d1d5db', background: '#fff', cursor: 'pointer', fontSize: 14 }}
          >Hủy</button>
          <button
            onClick={() => { onConfirm(); onClose() }}
            style={{ padding: '8px 18px', borderRadius: 6, border: 'none', background: isDanger ? '#dc2626' : '#ea580c', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}
          >{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}

// ─── 3-DOT MENU ───────────────────────────────────────────────────────────────
function RowMenu({
  flow, onEdit, onView, onClone, onDelete, onClose,
}: {
  flow: FlowItem; onEdit: () => void; onView: () => void;
  onClone: () => void; onDelete: () => void; onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose() }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [onClose])

  const item = (icon: string, label: string, onClick: () => void, danger?: boolean, disabled?: boolean) => (
    <div
      onClick={disabled ? undefined : () => { onClick(); onClose() }}
      style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px',
        fontSize: 14, color: disabled ? '#d1d5db' : danger ? '#dc2626' : '#374151',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onMouseEnter={e => { if (!disabled) (e.currentTarget as HTMLElement).style.background = danger ? '#fff5f5' : '#f9fafb' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '' }}
    >
      <span>{icon}</span> {label}
    </div>
  )

  return (
    <div ref={ref} style={{
      position: 'absolute', right: 0, top: 'calc(100% + 4px)', background: '#fff',
      border: '1px solid #e5e7eb', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,.1)',
      minWidth: 170, zIndex: 100, overflow: 'hidden',
    }}>
      {item('👁️', 'Xem', onView)}
      {item('✏️', 'Chỉnh sửa', onEdit)}
      {item('📋', 'Nhân bản', onClone)}
      {item('🗑️', flow.hasDoc ? 'Xóa (đang được dùng)' : 'Xóa', onDelete, true, flow.hasDoc)}
    </div>
  )
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function ML1DanhSach() {
  const { goScreen } = useNavigation()
  const [flows, setFlows] = useState<FlowItem[]>(INITIAL_FLOWS)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const [toast, setToast] = useState({ message: '', type: '' })
  const [modal, setModal] = useState<{ title: string; body: string; confirmLabel: string; isDanger?: boolean; onConfirm: () => void } | null>(null)

  const showToast = useCallback((message: string, type: string) => {
    setToast({ message, type })
  }, [])

  // Filtered list
  const filtered = flows.filter(f => {
    const q = search.toLowerCase()
    const nameMatch = f.name.toLowerCase().includes(q)
    const typeMatch = !filterType || f.types.includes(filterType)
    const statusMatch = !filterStatus || f.status === filterStatus
    return nameMatch && typeMatch && statusMatch
  })

  // Paging
  const totalPages = Math.ceil(filtered.length / pageSize)
  const safeCurrentPage = Math.min(currentPage, Math.max(1, totalPages))
  const start = (safeCurrentPage - 1) * pageSize
  const pageData = filtered.slice(start, start + pageSize)

  const handleFilterChange = () => setCurrentPage(1)

  // Actions
  const handleClone = (f: FlowItem) => {
    const clone: FlowItem = { ...f, id: Date.now(), name: f.name + ' (bản sao)', status: 'draft', hasDoc: false }
    setFlows(prev => [clone, ...prev])
    showToast('Đã tạo bản sao quy trình thành công.', 'success')
  }

  const handleDelete = (f: FlowItem) => {
    setModal({
      title: 'Xóa quy trình xử lý',
      body: 'Bạn có chắc chắn muốn xóa quy trình xử lý này không? Thao tác không thể hoàn tác.',
      confirmLabel: 'Xóa',
      isDanger: true,
      onConfirm: () => {
        setFlows(prev => prev.filter(x => x.id !== f.id))
        showToast('Đã xóa quy trình thành công.', 'success')
      },
    })
  }

  // Pagination helpers
  const pages: (number | '...')[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - safeCurrentPage) <= 1) pages.push(i)
    else if (pages[pages.length - 1] !== '...') pages.push('...')
  }

  const pageBtnStyle = (active?: boolean): React.CSSProperties => ({
    width: 32, height: 32, borderRadius: 6,
    border: `1px solid ${active ? '#ea580c' : '#e5e7eb'}`,
    background: active ? '#ea580c' : '#fff',
    color: active ? '#fff' : '#374151',
    cursor: 'pointer', fontSize: 13,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  })

  return (
    <div className="cw" style={{ overflow: 'hidden' }}>
      {/* ── Header Row 1 ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f3f4f6', padding: '0 24px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 48 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1f2937' }}>Danh sách quy trình xử lý</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#6b7280', position: 'relative' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              <span style={{ position: 'absolute', top: 2, right: 2, width: 7, height: 7, background: '#ea580c', borderRadius: '50%', border: '1.5px solid #fff' }} />
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#6b7280' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
            </button>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>NA</div>
          </div>
        </div>
      </div>

      {/* ── Header Row 2: filters ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 24px', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', height: 48 }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
            <svg style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/></svg>
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); handleFilterChange() }}
              placeholder="Tìm theo tên quy trình..."
              style={{ width: '100%', paddingLeft: 30, height: 32, fontSize: 13, border: '1.5px solid #d1d5db', borderRadius: 6, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <select
            value={filterType}
            onChange={e => { setFilterType(e.target.value); handleFilterChange() }}
            style={{ width: 180, height: 32, fontSize: 13, border: '1.5px solid #d1d5db', borderRadius: 6, padding: '0 10px', cursor: 'pointer' }}
          >
            <option value="">Tất cả loại VB</option>
            <option value="vbd">Văn bản đi</option>
            <option value="vbden">Văn bản đến</option>
            <option value="noi-bo">Nội bộ</option>
          </select>
          <select
            value={filterStatus}
            onChange={e => { setFilterStatus(e.target.value); handleFilterChange() }}
            style={{ width: 185, height: 32, fontSize: 13, border: '1.5px solid #d1d5db', borderRadius: 6, padding: '0 10px', cursor: 'pointer' }}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="draft">Nháp</option>
            <option value="inactive">Không hoạt động</option>
          </select>
          <button
            onClick={() => goScreen('ml2')}
            style={{ padding: '0 14px', height: 32, borderRadius: 6, border: 'none', background: '#ea580c', color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M12 4v16m8-8H4"/></svg>
            Tạo quy trình mới
          </button>
        </div>
      </div>

      {/* ── Table area ── */}
      <div style={{ flex: 1, overflow: 'auto', padding: '12px 24px 16px' }}>
        <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,.06)' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                {[
                  { label: 'STT', w: 40, center: true },
                  { label: 'Tên quy trình' },
                  { label: 'Loại VB áp dụng' },
                  { label: 'Trạng thái' },
                  { label: 'Số bước', center: true },
                  { label: 'Ngày tạo' },
                  { label: 'Người tạo' },
                  { label: 'Thao tác', right: true },
                ].map((h, i) => (
                  <th key={i} style={{
                    background: '#f9fafb', fontSize: 12, fontWeight: 600, color: '#6b7280',
                    textAlign: h.center ? 'center' : h.right ? 'right' : 'left',
                    padding: h.center ? '7px 8px' : '7px 10px',
                    borderBottom: '1px solid #e5e7eb', whiteSpace: 'nowrap',
                    width: h.w,
                    paddingRight: h.right ? 12 : undefined,
                  }}>{h.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 && (
                <tr>
                  <td colSpan={8}>
                    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                      <svg style={{ margin: '0 auto 12px', color: '#d1d5db', display: 'block' }} width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/></svg>
                      <div style={{ fontSize: 15, fontWeight: 600, color: '#6b7280' }}>Không tìm thấy kết quả phù hợp</div>
                      <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>Thử thay đổi từ khóa hoặc bộ lọc</div>
                    </div>
                  </td>
                </tr>
              )}
              {pageData.map((f, idx) => {
                const stt = start + idx + 1
                const st = STATUS_LABELS[f.status]
                return (
                  <tr
                    key={f.id}
                    style={{ borderBottom: '1px solid #f3f4f6', transition: 'background .1s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#fafafa'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ''}
                  >
                    <td style={{ textAlign: 'center', color: '#9ca3af', fontSize: 12, padding: '6px 8px', width: 40 }}>{stt}</td>
                    <td style={{ fontWeight: 600, color: '#1f2937', padding: '6px 10px', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={f.name}>{f.name}</td>
                    <td style={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
                      {f.types.map(t => (
                        <span key={t} className={`ml-badge ${TYPE_LABELS[t]?.cls}`} style={{ marginRight: 3 }}>
                          {TYPE_LABELS[t]?.label}
                        </span>
                      ))}
                    </td>
                    <td style={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
                      <span className={`ml-badge ${st.cls}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <span className={`ml-dot ${st.dot}`} />
                        {st.label}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 600, color: '#374151', padding: '6px 10px' }}>{f.steps}</td>
                    <td style={{ color: '#6b7280', fontSize: 12, padding: '6px 10px', whiteSpace: 'nowrap' }}>{f.created}</td>
                    <td style={{ color: '#374151', padding: '6px 10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 140 }} title={f.author}>{f.author}</td>
                    <td style={{ textAlign: 'right', padding: '6px 10px 6px 6px', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <button
                          onClick={() => goScreen('ml3', { flowId: f.id, flowsSnapshot: flows })}
                          style={{ padding: '3px 10px', borderRadius: 5, border: '1.5px solid #d1d5db', background: '#fff', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}
                        >Xem</button>
                        <div style={{ position: 'relative' }}>
                          <button
                            onClick={e => { e.stopPropagation(); setOpenMenuId(openMenuId === f.id ? null : f.id) }}
                            style={{ padding: '3px 7px', borderRadius: 5, border: '1.5px solid #d1d5db', background: '#fff', cursor: 'pointer' }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                          </button>
                          {openMenuId === f.id && (
                            <RowMenu
                              flow={f}
                              onClose={() => setOpenMenuId(null)}
                              onView={() => goScreen('ml3', { flowId: f.id, flowsSnapshot: flows })}
                              onEdit={() => goScreen('ml2', { editFlow: f })}
                              onClone={() => handleClone(f)}
                              onDelete={() => handleDelete(f)}
                            />
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Pagination */}
          {filtered.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', borderTop: '1px solid #f3f4f6' }}>
              <div style={{ fontSize: 13, color: '#6b7280' }}>
                Hiển thị {start + 1}–{Math.min(start + pageSize, filtered.length)} của {filtered.length} bản ghi
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <button
                  disabled={safeCurrentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  style={{ ...pageBtnStyle(), opacity: safeCurrentPage === 1 ? .4 : 1 }}
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <div style={{ display: 'flex', gap: 4 }}>
                  {pages.map((p, i) =>
                    p === '...'
                      ? <span key={`e${i}`} style={{ padding: '0 4px', color: '#9ca3af', fontSize: 13 }}>…</span>
                      : <button key={p} onClick={() => setCurrentPage(p as number)} style={pageBtnStyle(p === safeCurrentPage)}>{p}</button>
                  )}
                </div>
                <button
                  disabled={safeCurrentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage(p => p + 1)}
                  style={{ ...pageBtnStyle(), opacity: (safeCurrentPage === totalPages || totalPages === 0) ? .4 : 1 }}
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M9 5l7 7-7 7"/></svg>
                </button>
                <select
                  value={pageSize}
                  onChange={e => { setPageSize(parseInt(e.target.value)); setCurrentPage(1) }}
                  style={{ width: 110, height: 32, fontSize: 13, border: '1.5px solid #d1d5db', borderRadius: 6, padding: '0 6px', cursor: 'pointer' }}
                >
                  <option value="10">10 / trang</option>
                  <option value="20">20 / trang</option>
                  <option value="50">50 / trang</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {toast.message && <Toast message={toast.message} type={toast.type} onHide={() => setToast({ message: '', type: '' })} />}
      {modal && <ConfirmModal {...modal} onClose={() => setModal(null)} />}
    </div>
  )
}
