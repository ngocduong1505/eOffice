import { useState } from 'react'

// UI_DOC_IN_006_MODAL — Ủy quyền xử lý
// Trigger: chọn [Ủy quyền] trong Menu [...] — có mặt ở TẤT CẢ các trạng thái

interface SubmitData {
  nguoiNhan: string
  lyDo: string
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
]

const TODAY = new Date().toISOString().slice(0, 16)
const DEFAULT_HAN = '2026-03-28T17:00'

export default function ModalUyQuyen({ open, onClose, onSubmit, defaultHanXuLy }: Props) {
  const [nguoiNhan, setNguoiNhan] = useState('')
  const [lyDo, setLyDo] = useState('')
  const [hanXuLy, setHanXuLy] = useState(defaultHanXuLy || DEFAULT_HAN)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!open) return null

  const defaultHan = defaultHanXuLy || DEFAULT_HAN

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {}
    if (!nguoiNhan) e.nguoiNhan = 'Vui lòng chọn người được ủy quyền.'
    if (!lyDo.trim()) e.lyDo = 'Vui lòng nhập lý do ủy quyền.'
    if (!hanXuLy || hanXuLy < TODAY) e.hanXuLy = 'Hạn xử lý không hợp lệ.'
    else if (hanXuLy > defaultHan) e.hanXuLy = 'Hạn xử lý không được trễ hơn hạn xử lý gốc.'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onSubmit({ nguoiNhan, lyDo, hanXuLy })
    setNguoiNhan(''); setLyDo(''); setHanXuLy(defaultHanXuLy || DEFAULT_HAN); setErrors({})
  }

  const canSubmit = nguoiNhan && lyDo.trim() && hanXuLy

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
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--dark)' }}>Ủy quyền xử lý</div>
            <div style={{ fontSize: '.78rem', color: 'var(--text3)', marginTop: 3 }}>
              45/CV-SYT · V/v báo cáo tình hình KCB quý I/2026
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text3)' }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Người được ủy quyền */}
          <div className="fg">
            <label style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text2)', marginBottom: 6, display: 'block' }}>
              Người được ủy quyền <span className="req">*</span>
            </label>
            <select value={nguoiNhan} onChange={e => { setNguoiNhan(e.target.value); setErrors(p => ({ ...p, nguoiNhan: '' })) }} style={{ width: '100%' }}>
              <option value="">-- Tìm kiếm và chọn --</option>
              {NGUOI_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            {errors.nguoiNhan && <div style={{ fontSize: '.75rem', color: '#dc2626', marginTop: 4 }}>{errors.nguoiNhan}</div>}
          </div>

          {/* Lý do ủy quyền */}
          <div className="fg">
            <label style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text2)', marginBottom: 6, display: 'block' }}>
              Lý do ủy quyền <span className="req">*</span>
            </label>
            <textarea
              value={lyDo}
              onChange={e => { setLyDo(e.target.value); setErrors(p => ({ ...p, lyDo: '' })) }}
              placeholder="Nhập lý do ủy quyền..."
              style={{ height: 100, resize: 'vertical', width: '100%', boxSizing: 'border-box' }}
            />
            {errors.lyDo && <div style={{ fontSize: '.75rem', color: '#dc2626', marginTop: 4 }}>{errors.lyDo}</div>}
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

          {/* Lưu ý */}
          <div style={{ background: '#fefce8', border: '1px solid #fde68a', borderRadius: 8, padding: '10px 14px', fontSize: '.78rem', color: '#92400e' }}>
            ⚠️ Sau khi ủy quyền, bạn sẽ không còn nút thao tác chính — chỉ còn xem. Ủy quyền bậc 2 không được phép.
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
            Ủy quyền
          </button>
        </div>
      </div>
    </div>
  )
}
