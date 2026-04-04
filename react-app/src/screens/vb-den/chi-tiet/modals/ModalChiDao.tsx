import { useState } from 'react'

// UI_DOC_IN_004_MODAL — Chỉ đạo xử lý
// Trigger: nút [Chỉ đạo ngay] khi trạng thái = "Chờ chỉ đạo"

interface SubmitData {
  ykien: string
  thuKy: string
  hanXuLy: string
}

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (data: SubmitData) => void
  defaultHanXuLy?: string
}

const THU_KY_OPTIONS = [
  { value: 'ntvt', label: 'Nguyễn Thị Văn Thư — Văn thư · P.HCNS' },
  { value: 'ttthy', label: 'Trần Thị Thư Ký — Thư ký Ban GĐ · BGĐ' },
  { value: 'lttl', label: 'Lê Thị Thanh Lâm — Văn thư · P.KHTH' },
]

const TODAY = new Date().toISOString().slice(0, 16)

const RichToolbar = () => (
  <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
    {['B', 'I', 'U', '≡'].map(f => (
      <button key={f} style={{
        border: '1px solid var(--border)', background: '#f8fafc',
        borderRadius: 4, width: 26, height: 26, cursor: 'pointer',
        fontSize: f === 'B' ? '.85rem' : '.8rem',
        fontWeight: f === 'B' ? 700 : 400,
        fontStyle: f === 'I' ? 'italic' : 'normal',
        textDecoration: f === 'U' ? 'underline' : 'none',
        color: 'var(--text2)',
      }}>{f}</button>
    ))}
  </div>
)

export default function ModalChiDao({ open, onClose, onSubmit, defaultHanXuLy = '' }: Props) {
  const [ykien, setYkien] = useState('')
  const [thuKy, setThuKy] = useState('')
  const [hanXuLy, setHanXuLy] = useState(defaultHanXuLy || '2026-03-28T17:00')
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!open) return null

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {}
    if (!ykien.trim()) e.ykien = 'Vui lòng nhập nội dung chỉ đạo.'
    if (!thuKy) e.thuKy = 'Vui lòng chọn Thư ký xử lý.'
    if (!hanXuLy || hanXuLy < TODAY) e.hanXuLy = 'Hạn xử lý không hợp lệ.'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onSubmit({ ykien, thuKy, hanXuLy })
    setYkien(''); setThuKy(''); setHanXuLy(defaultHanXuLy || ''); setErrors({})
  }

  const canSubmit = ykien.trim() && thuKy && hanXuLy

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(15,20,40,.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500,
    }}>
      <div style={{
        background: '#fff', borderRadius: 16, width: 600, maxWidth: '94vw',
        boxShadow: '0 24px 64px rgba(0,0,0,.22)',
        display: 'flex', flexDirection: 'column', maxHeight: '90vh',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 24px 14px', borderBottom: '1px solid var(--border)',
        }}>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--dark)' }}>Chỉ đạo xử lý</div>
            <div style={{ fontSize: '.78rem', color: 'var(--text3)', marginTop: 3 }}>
              45/CV-SYT · V/v báo cáo tình hình KCB quý I/2026
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text3)' }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Ý kiến chỉ đạo */}
          <div className="fg">
            <label style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text2)', marginBottom: 6, display: 'block' }}>
              Ý kiến chỉ đạo <span className="req">*</span>
            </label>
            <textarea
              value={ykien}
              onChange={e => { setYkien(e.target.value); setErrors(p => ({ ...p, ykien: '' })) }}
              placeholder="Nhập nội dung chỉ đạo..."
              style={{ height: 120, resize: 'vertical', width: '100%', boxSizing: 'border-box' }}
            />
            <RichToolbar />
            {errors.ykien && <div style={{ fontSize: '.75rem', color: '#dc2626', marginTop: 4 }}>{errors.ykien}</div>}
          </div>

          {/* Thư ký xử lý */}
          <div className="fg">
            <label style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text2)', marginBottom: 6, display: 'block' }}>
              Thư ký xử lý <span className="req">*</span>
            </label>
            <select value={thuKy} onChange={e => { setThuKy(e.target.value); setErrors(p => ({ ...p, thuKy: '' })) }} style={{ width: '100%' }}>
              <option value="">-- Tìm kiếm và chọn --</option>
              {THU_KY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            {errors.thuKy && <div style={{ fontSize: '.75rem', color: '#dc2626', marginTop: 4 }}>{errors.thuKy}</div>}
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
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
            <div className="hint" style={{ color: '#b91c1c' }}>
              ⚠️ Tự động điền theo Hạn xử lý của văn bản — có thể điều chỉnh
            </div>
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
            📤 Gửi chỉ đạo
          </button>
        </div>
      </div>
    </div>
  )
}
