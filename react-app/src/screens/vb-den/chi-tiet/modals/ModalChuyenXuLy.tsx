import { useState, useRef, useEffect } from 'react'

// UI_DOC_IN_007_MODAL — Chuyển tiếp xử lý
// Trigger: [Chuyển tiếp xử lý] trong Menu [...] khi trạng thái = "Chờ xử lý"

type LoaiChuyen = 'chinh' | 'phoi-hop'

interface SubmitData {
  loaiChuyen: LoaiChuyen
  nguoiNhan: string[]
  ykienChuyen: string
  hanXuLy: string
}

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (data: SubmitData) => void
  defaultHanXuLy?: string
}

const NGUOI_OPTIONS = [
  { value: 'nva', label: 'Nguyễn Văn A — Trưởng phòng · P.KHTH' },
  { value: 'tthb', label: 'Trần Thị Hồng B — Chuyên viên · P.KHTH' },
  { value: 'lvc', label: 'Lê Văn C — Phó phòng · P.TCKT' },
  { value: 'pttd', label: 'Phạm Thị Thu D — Chuyên viên · P.HCNS' },
  { value: 'nths', label: 'Nguyễn Thị Hoa S — Trưởng phòng · P.HCNS' },
]

const CURRENT_USER = 'nva' // giả lập người dùng hiện tại (không được tự chọn mình)
const TODAY = new Date().toISOString().slice(0, 16)
const DEFAULT_HAN = '2026-03-28T17:00'
const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB
const ALLOWED_EXT = ['.pdf', '.doc', '.docx', '.xls', '.xlsx']

export default function ModalChuyenXuLy({ open, onClose, onSubmit, defaultHanXuLy }: Props) {
  const [loaiChuyen, setLoaiChuyen] = useState<LoaiChuyen | ''>('')
  const [nguoiNhan, setNguoiNhan] = useState<string[]>([])
  const [ykienChuyen, setYkienChuyen] = useState('')
  const [hanXuLy, setHanXuLy] = useState(defaultHanXuLy || DEFAULT_HAN)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [nguoiOpen, setNguoiOpen] = useState(false)
  const nguoiRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!nguoiOpen) return
    const handler = (e: MouseEvent) => {
      if (nguoiRef.current && !nguoiRef.current.contains(e.target as Node)) setNguoiOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [nguoiOpen])

  if (!open) return null

  const defaultHan = defaultHanXuLy || DEFAULT_HAN

  const toggleNguoiNhan = (val: string) => {
    setNguoiNhan(prev =>
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
    )
    setErrors(p => ({ ...p, nguoiNhan: '' }))
  }

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {}
    if (!loaiChuyen) e.loaiChuyen = 'Vui lòng chọn loại chuyển xử lý.'
    if (nguoiNhan.length === 0) e.nguoiNhan = 'Vui lòng chọn ít nhất một người nhận.'
    if (nguoiNhan.includes(CURRENT_USER)) e.nguoiNhan = 'Không thể chuyển xử lý cho chính mình.'
    // if (!hanXuLy || hanXuLy < TODAY) e.hanXuLy = 'Hạn xử lý không hợp lệ.'
    // else if (hanXuLy > defaultHan) e.hanXuLy = 'Hạn xử lý không được trễ hơn hạn xử lý gốc.'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onSubmit({ loaiChuyen: loaiChuyen as LoaiChuyen, nguoiNhan, ykienChuyen, hanXuLy })
    setLoaiChuyen(''); setNguoiNhan([]); setYkienChuyen(''); setHanXuLy(defaultHanXuLy || DEFAULT_HAN); setErrors({})
  }

  const canSubmit = loaiChuyen && nguoiNhan.length > 0 && hanXuLy

  const fmtSize = (b: number) => b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.round(b / 1024)} KB`

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(15,20,40,.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500,
    }}>
      <div style={{
        background: '#fff', borderRadius: 16, width: 640, maxWidth: '94vw',
        boxShadow: '0 24px 64px rgba(0,0,0,.22)',
        display: 'flex', flexDirection: 'column', maxHeight: '90vh',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 24px 14px', borderBottom: '1px solid var(--border)',
        }}>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--dark)' }}>Chuyển tiếp xử lý</div>
            <div style={{ fontSize: '.78rem', color: 'var(--text3)', marginTop: 3 }}>
              45/CV-SYT · V/v báo cáo tình hình KCB quý I/2026
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text3)' }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Loại chuyển */}
          <div className="fg">
            <label style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text2)', marginBottom: 6, display: 'block' }}>
              Loại chuyển <span className="req">*</span>
            </label>
            <select
              value={loaiChuyen}
              onChange={e => { setLoaiChuyen(e.target.value as LoaiChuyen | ''); setErrors(p => ({ ...p, loaiChuyen: '' })) }}
              style={{ width: '100%', boxSizing: 'border-box' }}
            >
              <option value="">-- Chọn loại chuyển --</option>
              <option value="chinh">Chuyển chính — Bàn giao toàn bộ trách nhiệm</option>
              <option value="phoi-hop">Chuyển phối hợp — Xử lý song song</option>
            </select>
            {errors.loaiChuyen && <div style={{ fontSize: '.75rem', color: '#dc2626', marginTop: 4 }}>{errors.loaiChuyen}</div>}
          </div>

          {/* Người nhận */}
          <div className="fg">
            <label style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text2)', marginBottom: 6, display: 'block' }}>
              Người nhận <span className="req">*</span>
            </label>
            <div ref={nguoiRef} style={{ position: 'relative' }}>
              {/* Trigger */}
              <div
                onClick={() => setNguoiOpen(o => !o)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  border: `1px solid ${errors.nguoiNhan ? '#dc2626' : nguoiOpen ? 'var(--orange)' : 'var(--border)'}`,
                  borderRadius: 8, padding: '8px 12px', cursor: 'pointer', background: '#fff', minHeight: 38,
                  boxShadow: nguoiOpen ? '0 0 0 2px rgba(234,88,12,.2)' : 'none',
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, flex: 1 }}>
                  {nguoiNhan.length === 0
                    ? <span style={{ fontSize: '.82rem', color: 'var(--text3)' }}>Chọn người nhận...</span>
                    : nguoiNhan.map(v => {
                        const opt = NGUOI_OPTIONS.find(o => o.value === v)
                        const name = opt?.label.split(' — ')[0]
                        return (
                          <span key={v} style={{
                            display: 'inline-flex', alignItems: 'center', gap: 4,
                            background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 4,
                            padding: '2px 8px', fontSize: '.75rem', color: '#c2410c',
                          }}>
                            {name}
                            <span
                              onMouseDown={e => { e.stopPropagation(); toggleNguoiNhan(v) }}
                              style={{ cursor: 'pointer', lineHeight: 1, marginLeft: 2 }}
                            >×</span>
                          </span>
                        )
                      })
                  }
                </div>
                <span style={{ fontSize: '.7rem', color: 'var(--text3)', marginLeft: 8, flexShrink: 0 }}>
                  {nguoiOpen ? '▲' : '▼'}
                </span>
              </div>

              {/* Dropdown */}
              {nguoiOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
                  border: '1px solid var(--border)', borderRadius: 8, background: '#fff',
                  boxShadow: '0 8px 24px rgba(0,0,0,.12)', zIndex: 10, overflow: 'hidden',
                }}>
                  {NGUOI_OPTIONS.filter(o => o.value !== CURRENT_USER).map((o, i, arr) => (
                    <div
                      key={o.value}
                      onMouseDown={e => { e.preventDefault(); toggleNguoiNhan(o.value) }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 14px', cursor: 'pointer',
                        background: nguoiNhan.includes(o.value) ? '#fff7ed' : '#fff',
                        borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                      }}
                    >
                      <input type="checkbox" checked={nguoiNhan.includes(o.value)} onChange={() => {}} style={{ cursor: 'pointer' }} />
                      <span style={{ fontSize: '.82rem', color: 'var(--dark)' }}>{o.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.nguoiNhan && <div style={{ fontSize: '.75rem', color: '#dc2626', marginTop: 4 }}>{errors.nguoiNhan}</div>}
          </div>

          {/* Ý kiến chuyển */}
          <div className="fg">
            <label style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text2)', marginBottom: 6, display: 'block' }}>
              Ý kiến chuyển
            </label>
            <textarea
              value={ykienChuyen}
              onChange={e => setYkienChuyen(e.target.value)}
              placeholder="Nhập ý kiến chuyển xử lý (nếu có)..."
              style={{ height: 90, resize: 'vertical', width: '100%', boxSizing: 'border-box' }}
            />
          </div>

          {/* Hạn xử lý */}
          <div className="fg">
            <label style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text2)', marginBottom: 6, display: 'block' }}>
              Hạn xử lý <span className="req">*</span>
            </label>
            <input
              type="datetime-local"
              value={hanXuLy}
              onChange={e => { setHanXuLy(e.target.value); setErrors(p => ({ ...p, hanXuLy: '' })) }}
              min={TODAY}
              max={defaultHan}
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
            <div className="hint">Không được trễ hơn hạn xử lý gốc: 28/03/2026</div>
            {errors.hanXuLy && <div style={{ fontSize: '.75rem', color: '#dc2626', marginTop: 4 }}>{errors.hanXuLy}</div>}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10,
          padding: '14px 24px', borderTop: '1px solid var(--border)',
        }}>
          <button className="btn btn-ghost" onClick={onClose}>Hủy</button>
          <button
            className="btn btn-primary"
            style={{ opacity: canSubmit ? 1 : .45, cursor: canSubmit ? 'pointer' : 'not-allowed' }}
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            ↪ Chuyển xử lý
          </button>
        </div>
      </div>
    </div>
  )
}
