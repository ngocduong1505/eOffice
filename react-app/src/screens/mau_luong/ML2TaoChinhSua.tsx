import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigation } from '@/hooks/useNavigation'
import type { FlowItem, StepItem } from './types'
import { APPLY_OPTIONS, ROLE_OPTIONS,
  BEHAVIOR_SELECT_OPTIONS, BEHAVIOR_LABELS,
} from './types'

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ message, type, onHide }: { message: string; type: string; onHide: () => void }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(onHide, 3000)
    return () => clearTimeout(t)
  }, [message, onHide])
  if (!message) return null
  const bg = type === 'success' ? '#15803d' : '#dc2626'
  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, background: bg, color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 14, zIndex: 700, boxShadow: '0 4px 16px rgba(0,0,0,.2)', maxWidth: 360 }}>
      {message}
    </div>
  )
}

// ─── CONFIRM MODAL ────────────────────────────────────────────────────────────
function ConfirmModal({ title, body, confirmLabel, isDanger, onConfirm, onClose }: {
  title: string; body: string; confirmLabel: string; isDanger?: boolean; onConfirm: () => void; onClose: () => void
}) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 28, maxWidth: 420, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,.2)' }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#1f2937', marginBottom: 10 }}>{title}</div>
        <div style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>{body}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 22 }}>
          <button onClick={onClose} style={{ padding: '8px 18px', borderRadius: 6, border: '1.5px solid #d1d5db', background: '#fff', cursor: 'pointer', fontSize: 14 }}>Hủy</button>
          <button onClick={() => { onConfirm(); onClose() }} style={{ padding: '8px 18px', borderRadius: 6, border: 'none', background: isDanger ? '#dc2626' : '#ea580c', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}

// ─── MULTI-SELECT DROPDOWN ────────────────────────────────────────────────────
function MultiSelect({
  id, options, selected, onChange, placeholder,
}: {
  id: string
  options: Record<string, string>
  selected: string[]
  onChange: (next: string[]) => void
  placeholder: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const toggle = (key: string) => {
    if (selected.includes(key)) onChange(selected.filter(k => k !== key))
    else onChange([...selected, key])
  }

  return (
    <div ref={ref} style={{ position: 'relative' }} id={id}>
      <div
        onClick={() => setOpen(p => !p)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 12px', border: `1.5px solid ${open ? '#ea580c' : '#d1d5db'}`,
          borderRadius: 6, cursor: 'pointer', background: '#fff', minHeight: 38,
          boxShadow: open ? '0 0 0 2px #fed7aa40' : 'none',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, flex: 1 }}>
          {selected.length === 0
            ? <span style={{ color: '#9ca3af', fontSize: 13 }}>{placeholder}</span>
            : selected.map(k => (
              <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#ffedd5', color: '#ea580c', borderRadius: 4, padding: '1px 6px', fontSize: 12, fontWeight: 500 }}>
                {options[k]}
                <span
                  onClick={e => { e.stopPropagation(); toggle(k) }}
                  style={{ cursor: 'pointer', opacity: .7, fontSize: 14, lineHeight: 1 }}
                >×</span>
              </span>
            ))}
        </div>
        <svg style={{ flexShrink: 0, color: '#9ca3af', transform: open ? 'rotate(180deg)' : '', transition: 'transform .2s' }} width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M19 9l-7 7-7-7"/></svg>
      </div>
      {open && (
        <div style={{ position: 'absolute', left: 0, right: 0, top: 'calc(100% + 4px)', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,.1)', zIndex: 200, maxHeight: 240, overflowY: 'auto' }}>
          {Object.entries(options).map(([key, label]) => (
            <div
              key={key}
              onClick={() => toggle(key)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', fontSize: 14, cursor: 'pointer', background: selected.includes(key) ? '#fff7ed' : '' }}
              onMouseEnter={e => { if (!selected.includes(key)) (e.currentTarget as HTMLElement).style.background = '#fff7ed' }}
              onMouseLeave={e => { if (!selected.includes(key)) (e.currentTarget as HTMLElement).style.background = '' }}
            >
              <input type="checkbox" checked={selected.includes(key)} readOnly style={{ accentColor: '#ea580c' }} />
              <span style={{ color: selected.includes(key) ? '#ea580c' : undefined }}>{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── STEP CARD ────────────────────────────────────────────────────────────────
function StepCard({
  step, index, isActive, onEdit, onDelete, isDragging, isDragOver,
  onDragStart, onDragOver, onDrop, onDragLeave,
}: {
  step: StepItem; index: number; isActive: boolean;
  onEdit: () => void; onDelete: () => void;
  isDragging: boolean; isDragOver: boolean;
  onDragStart: () => void; onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void; onDragLeave: () => void;
}) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
      style={{
        background: isDragOver ? '#fff7ed' : '#fff',
        border: `1.5px solid ${isDragOver ? '#fb923c' : isActive ? '#ea580c' : '#e5e7eb'}`,
        borderRadius: 10, padding: '14px 16px', cursor: 'grab',
        boxShadow: isActive ? '0 0 0 3px #fed7aa50' : undefined,
        opacity: isDragging ? 0.5 : 1,
        transition: 'border-color .15s',
      } as React.CSSProperties}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        {/* Drag handle */}
        <div style={{ cursor: 'grab', color: '#9ca3af', marginTop: 2, display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2, padding: 2 }}>
          {[...Array(6)].map((_, i) => <span key={i} style={{ width: 3, height: 3, borderRadius: '50%', background: 'currentColor', display: 'block' }} />)}
        </div>
        {/* Step number */}
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#fff7ed', border: '2px solid #ea580c', color: '#ea580c', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{index + 1}</div>
        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, color: '#1f2937', fontSize: 14, marginBottom: 4 }}>{step.name}</div>
          <div style={{ fontSize: 12, color: '#6b7280', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              {BEHAVIOR_LABELS[step.behavior] || step.behavior}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              {step.deadline} giờ
            </span>
            {step.roles.length > 0 && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                {step.roles.length} vai trò
              </span>
            )}
          </div>
        </div>
        {/* Actions */}
        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          <button onClick={onEdit} title="Sửa bước" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 4, borderRadius: 4 }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#ea580c'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#9ca3af'}
          >
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button onClick={onDelete} title="Xóa bước" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 4, borderRadius: 4 }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#dc2626'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#9ca3af'}
          >
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function ML2TaoChinhSua() {
  const { goScreen, screenParams } = useNavigation()
  const editFlow = screenParams.editFlow as FlowItem | undefined

  const [flowName, setFlowName] = useState(editFlow?.name ?? '')
  const [flowDesc, setFlowDesc] = useState('')
  const [flowActive, setFlowActive] = useState(editFlow ? editFlow.status === 'active' : true)
  const [selectedTypes, setSelectedTypes] = useState<string[]>(editFlow?.types ?? [])
  const [steps, setSteps] = useState<StepItem[]>([])

  // Step panel state
  const [panelMode, setPanelMode] = useState<'guide' | 'step'>('guide')
  const [editingStepIdx, setEditingStepIdx] = useState<number | null>(null)
  const [stepName, setStepName] = useState('')
  const [stepBehavior, setStepBehavior] = useState('')
  const [stepDeadline, setStepDeadline] = useState('')
  const [stepTimeout, setStepTimeout] = useState<'stop' | 'skip' | 'notify'>('stop')
  const [stepRoles, setStepRoles] = useState<string[]>([])

  // Drag state
  const dragSrcIdx = useRef<number | null>(null)
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null)
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null)

  // Toast / modal
  const [toast, setToast] = useState({ message: '', type: '' })
  const [modal, setModal] = useState<{ title: string; body: string; confirmLabel: string; isDanger?: boolean; onConfirm: () => void } | null>(null)

  const showToast = useCallback((msg: string, type: string) => setToast({ message: msg, type }), [])

  // ── Open / close step panel ──
  const openStepPanel = (idx: number | null) => {
    setEditingStepIdx(idx)
    setPanelMode('step')
    if (idx !== null && steps[idx]) {
      const s = steps[idx]
      setStepName(s.name)
      setStepBehavior(s.behavior)
      setStepDeadline(String(s.deadline))
      setStepTimeout(s.timeout)
      setStepRoles([...s.roles])
    } else {
      setStepName(''); setStepBehavior(''); setStepDeadline(''); setStepTimeout('stop'); setStepRoles([])
    }
  }

  const closeStepPanel = () => {
    setPanelMode('guide')
    setEditingStepIdx(null)
  }

  const saveStep = () => {
    if (!stepName.trim()) { showToast('Vui lòng nhập tên bước.', 'error'); return }
    if (!stepBehavior) { showToast('Vui lòng chọn loại hành vi.', 'error'); return }
    if (!stepDeadline) { showToast('Vui lòng nhập thời hạn xử lý.', 'error'); return }
    const data: StepItem = { name: stepName.trim(), behavior: stepBehavior, deadline: parseInt(stepDeadline), timeout: stepTimeout, roles: [...stepRoles] }
    if (editingStepIdx !== null) {
      setSteps(prev => prev.map((s, i) => i === editingStepIdx ? data : s))
      showToast('Đã cập nhật bước.', 'success')
    } else {
      setSteps(prev => [...prev, data])
      showToast('Đã thêm bước mới.', 'success')
    }
    closeStepPanel()
  }

  const deleteStep = (idx: number) => {
    setModal({
      title: 'Xóa bước xử lý',
      body: 'Bạn có chắc chắn muốn xóa bước xử lý này không?',
      confirmLabel: 'Xóa',
      isDanger: true,
      onConfirm: () => {
        if (editingStepIdx === idx) closeStepPanel()
        setSteps(prev => prev.filter((_, i) => i !== idx))
      },
    })
  }

  // ── Drag & Drop ──
  const handleDragStart = (idx: number) => {
    dragSrcIdx.current = idx
    setTimeout(() => setDraggingIdx(idx), 0)
  }
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault()
    if (idx !== dragSrcIdx.current) setDragOverIdx(idx)
  }
  const handleDragLeave = () => setDragOverIdx(null)
  const handleDrop = (e: React.DragEvent, idx: number) => {
    e.preventDefault()
    const src = dragSrcIdx.current
    if (src === null || src === idx) { dragSrcIdx.current = null; setDraggingIdx(null); setDragOverIdx(null); return }
    setSteps(prev => {
      const arr = [...prev]
      const [moved] = arr.splice(src, 1)
      arr.splice(idx, 0, moved)
      return arr
    })
    dragSrcIdx.current = null; setDraggingIdx(null); setDragOverIdx(null)
  }

  // ── Save flow ──
  const saveFlow = () => {
    if (!flowName.trim()) { showToast('Vui lòng nhập tên quy trình trước khi lưu.', 'error'); return }
    showToast('Đã lưu quy trình thành công.', 'success')
    setTimeout(() => goScreen('ml1'), 800)
  }

  const confirmClose = () => {
    if (flowName.trim() || steps.length > 0) {
      setModal({
        title: 'Thoát không lưu?',
        body: 'Thông tin quy trình chưa được lưu. Bạn có chắc chắn muốn thoát?',
        confirmLabel: 'Thoát',
        isDanger: true,
        onConfirm: () => goScreen('ml1'),
      })
    } else {
      goScreen('ml1')
    }
  }

  const isEditing = !!editFlow
  const screenTitleText = isEditing ? 'Chỉnh sửa quy trình' : 'Tạo quy trình mới — Thiết lập bước'

  // Field styles
  const fieldInput: React.CSSProperties = {
    width: '100%', border: '1.5px solid #d1d5db', borderRadius: 6, padding: '8px 12px',
    fontSize: 14, outline: 'none', boxSizing: 'border-box',
  }
  const fieldLabel: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }

  return (
    <div className="cw" style={{ overflow: 'hidden' }}>
      {/* ── Header Row 1 ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f3f4f6', padding: '0 24px', position: 'sticky', top: 0, zIndex: 50, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 48 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1f2937' }}>{screenTitleText}</div>
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

      {/* ── Header Row 2: actions ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 24px', position: 'sticky', top: 48, zIndex: 49, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, height: 42 }}>
          <button onClick={confirmClose} style={{ padding: '5px 14px', borderRadius: 6, border: '1.5px solid #d1d5db', background: '#fff', fontSize: 13, cursor: 'pointer' }}>Đóng</button>
          <button onClick={saveFlow} style={{ padding: '5px 16px', borderRadius: 6, border: 'none', background: '#ea580c', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M5 13l4 4L19 7"/></svg>
            Lưu
          </button>
        </div>
      </div>

      {/* ── Main 4:3 grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '4fr 3fr', flex: 1, overflow: 'hidden', height: 'calc(100vh - 90px)' }}>

        {/* LEFT: form + steps */}
        <div style={{ padding: '16px 20px', overflowY: 'auto', background: '#fff', display: 'flex', flexDirection: 'column', gap: 0, borderRight: '1px solid #e5e7eb' }}>

          {/* Thông tin quy trình */}
          <div style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 12 }}>Thông tin quy trình</div>

            {/* Row 1: Tên + Loại VB */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div>
                <div style={fieldLabel}>Tên quy trình <span style={{ color: '#ef4444' }}>*</span></div>
                <input
                  value={flowName}
                  onChange={e => setFlowName(e.target.value)}
                  placeholder="VD: Quy trình duyệt VB đi cấp Phòng"
                  style={fieldInput}
                />
              </div>
              <div>
                <div style={fieldLabel}>Loại văn bản áp dụng <span style={{ color: '#ef4444' }}>*</span></div>
                <MultiSelect
                  id="apply-select"
                  options={APPLY_OPTIONS}
                  selected={selectedTypes}
                  onChange={setSelectedTypes}
                  placeholder="Chọn loại văn bản..."
                />
                <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 5 }}>Có thể chọn nhiều loại cùng lúc.</div>
              </div>
            </div>

            {/* Row 2: Mô tả + Trạng thái */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'start' }}>
              <div>
                <div style={fieldLabel}>Mô tả quy trình</div>
                <textarea
                  value={flowDesc}
                  onChange={e => setFlowDesc(e.target.value)}
                  placeholder="Ghi chú mục đích sử dụng của quy trình này..."
                  style={{ ...fieldInput, minHeight: 60, resize: 'none' }}
                />
              </div>
              <div style={{ minWidth: 160 }}>
                <div style={fieldLabel}>Trạng thái</div>
                <div
                  onClick={() => setFlowActive(p => !p)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', border: '1.5px solid #e5e7eb', borderRadius: 6, background: '#fff', cursor: 'pointer', userSelect: 'none' }}
                >
                  <div style={{ width: 36, height: 20, borderRadius: 99, background: flowActive ? '#16a34a' : '#d1d5db', flexShrink: 0, position: 'relative', transition: 'background .2s' }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: flowActive ? 18 : 2, transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />
                  </div>
                  <span style={{ fontSize: 13, color: flowActive ? '#16a34a' : '#9ca3af', fontWeight: 500 }}>
                    {flowActive ? 'Đang hoạt động' : 'Không hoạt động'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quy trình xử lý (steps) */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.05em' }}>Quy trình xử lý</div>
              <button
                onClick={() => openStepPanel(null)}
                style={{ padding: '4px 12px', borderRadius: 6, border: '1.5px solid #ea580c', background: '#fff', color: '#ea580c', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M12 4v16m8-8H4"/></svg>
                Thêm bước
              </button>
            </div>

            {steps.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '28px 16px', background: '#fafafa', borderRadius: 8, border: '1.5px dashed #e5e7eb', marginTop: 4 }}>
                <svg style={{ margin: '0 auto 8px', color: '#d1d5db', display: 'block' }} width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                <div style={{ fontSize: 13, color: '#9ca3af' }}>Chưa có bước nào. Nhấn <strong style={{ color: '#ea580c' }}>Thêm bước</strong> để bắt đầu.</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {steps.map((s, i) => (
                  <StepCard
                    key={i}
                    step={s}
                    index={i}
                    isActive={editingStepIdx === i && panelMode === 'step'}
                    onEdit={() => openStepPanel(i)}
                    onDelete={() => deleteStep(i)}
                    isDragging={draggingIdx === i}
                    isDragOver={dragOverIdx === i}
                    onDragStart={() => handleDragStart(i)}
                    onDragOver={e => handleDragOver(e, i)}
                    onDrop={e => handleDrop(e, i)}
                    onDragLeave={handleDragLeave}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Guide or Step config panel */}
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>

          {/* Panel A: Guide */}
          {panelMode === 'guide' && (
            <div style={{ padding: 16, overflowY: 'auto', height: '100%', background: '#f9fafb' }}>
              <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', padding: 18, marginBottom: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1f2937', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 16v-4M12 8h.01"/></svg>
                  Hướng dẫn nhanh
                </div>
                {[
                  'Điền <strong>tên quy trình</strong> và chọn <strong>loại văn bản áp dụng</strong>.',
                  'Nhấn <strong style="color:#ea580c">Thêm bước</strong> để cấu hình từng bước xử lý.',
                  'Kéo thả biểu tượng <strong>⠿</strong> để thay đổi thứ tự các bước.',
                  'Nhấn <strong style="color:#ea580c">Lưu</strong> để lưu cấu hình quy trình.',
                ].map((txt, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < 3 ? '1px solid #f3f4f6' : 'none' }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#ea580c', color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>{i + 1}</div>
                    <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: txt }} />
                  </div>
                ))}
              </div>
              <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', padding: 18 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1f2937', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2"><path strokeLinecap="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
                  Danh mục hành vi
                </div>
                {[
                  { title: '📋 Duyệt nội dung', desc: 'Xem xét, phê duyệt hoặc yêu cầu sửa đổi. Hỗ trợ duyệt song song hoặc lần lượt.' },
                  { title: '✏️ Ghi ý kiến / Bút phê', desc: 'Ghi chú chỉ đạo, không mang tính phê duyệt pháp lý.' },
                  { title: '👤 Phân công người xử lý', desc: 'Đọc ý kiến và chỉ định người nhận ở bước tiếp theo.' },
                  { title: '🔏 Ký số văn bản', desc: 'Sử dụng chứng thư số để ký điện tử vào tệp tin.' },
                  { title: '🏛️ Đóng dấu & Cấp số', desc: 'Cấp số hiệu chính thức và đóng dấu pháp nhân. Dành cho Văn thư.' },
                  { title: '📤 Ban hành / Phân phát', desc: 'Gửi văn bản đến nơi nhận và kết thúc quy trình.' },
                ].map((b, i, arr) => (
                  <div key={i} style={{ padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1f2937', marginBottom: 3 }}>{b.title}</div>
                    <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5 }}>{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Panel B: Step config */}
          {panelMode === 'step' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff', position: 'absolute', inset: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #e5e7eb', flexShrink: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1f2937' }}>{editingStepIdx !== null ? 'Chỉnh sửa bước' : 'Thêm bước'}</div>
                <button onClick={closeStepPanel} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 4, borderRadius: 4 }}>
                  <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
                <div style={{ marginBottom: 18 }}>
                  <div style={fieldLabel}>Tên bước <span style={{ color: '#ef4444' }}>*</span></div>
                  <input value={stepName} onChange={e => setStepName(e.target.value)} placeholder="VD: Duyệt nội dung, Ký số..." style={fieldInput} />
                  <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 5 }}>Đặt tên theo nghiệp vụ — người thực hiện sẽ thấy tên này.</div>
                </div>
                <div style={{ marginBottom: 6 }}>
                  <div style={fieldLabel}>Loại hành vi <span style={{ color: '#ef4444' }}>*</span></div>
                  <select
                    value={stepBehavior}
                    onChange={e => setStepBehavior(e.target.value)}
                    style={{ ...fieldInput, height: 38, cursor: 'pointer' }}
                  >
                    <option value="">— Chọn loại hành vi —</option>
                    {BEHAVIOR_SELECT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <div style={fieldLabel}>Người thực hiện</div>
                  <MultiSelect id="role-select" options={ROLE_OPTIONS} selected={stepRoles} onChange={setStepRoles} placeholder="Chọn chức vụ người thực hiện" />
                  <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 5 }}>Có thể chọn nhiều chức vụ.</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
                  <div>
                    <div style={fieldLabel}>Thời hạn xử lý (giờ) <span style={{ color: '#ef4444' }}>*</span></div>
                    <input value={stepDeadline} onChange={e => setStepDeadline(e.target.value)} type="number" min="1" placeholder="VD: 8" style={fieldInput} />
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 5 }}>Tính từ lúc bước bắt đầu.</div>
                  </div>
                  <div>
                    <div style={fieldLabel}>Khi quá hạn / lỗi <span style={{ color: '#ef4444' }}>*</span></div>
                    <select
                      value={stepTimeout}
                      onChange={e => setStepTimeout(e.target.value as 'stop' | 'skip' | 'notify')}
                      style={{ ...fieldInput, height: 40, cursor: 'pointer' }}
                    >
                      <option value="stop">Dừng quy trình, chờ xử lý</option>
                      <option value="skip">Bỏ qua, chuyển bước tiếp</option>
                      <option value="notify">Thông báo và tiếp tục</option>
                    </select>
                  </div>
                </div>
              </div>
              <div style={{ padding: '14px 20px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: 10, flexShrink: 0 }}>
                <button onClick={closeStepPanel} style={{ padding: '7px 18px', borderRadius: 6, border: '1.5px solid #d1d5db', background: '#fff', fontSize: 13, cursor: 'pointer' }}>Hủy</button>
                <button onClick={saveStep} style={{ padding: '7px 18px', borderRadius: 6, border: 'none', background: '#ea580c', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M5 13l4 4L19 7"/></svg>
                  Lưu bước
                </button>
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
