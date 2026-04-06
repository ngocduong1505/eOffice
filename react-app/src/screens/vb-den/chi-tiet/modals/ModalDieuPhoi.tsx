import { useState } from 'react'

// UI_DOC_IN_005_MODAL — Điều phối xử lý
// Trigger: nút [Điều phối ngay] khi trạng thái = "Chờ điều phối"

interface AssigneeRow {
  id: number
  nguoiXuLy: string
  hanXuLy: string
  ghiChu: string
}

interface SubmitData {
  assignees: AssigneeRow[]
}

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (data: SubmitData) => void
  chiDaoInfo?: { nguoiChiDao: string; thoiGian: string; noiDung: string }
  defaultHanXuLy?: string
}

const NGUOI_XU_LY_OPTIONS = [
  { value: 'nva', label: 'Nguyễn Văn A — Trưởng phòng · P.KHTH' },
  { value: 'tthb', label: 'Trần Thị Hồng B — Chuyên viên · P.KHTH' },
  { value: 'lvc', label: 'Lê Văn C — Phó phòng · P.TCKT' },
  { value: 'pttd', label: 'Phạm Thị Thu D — Chuyên viên · P.HCNS' },
]

const TODAY = new Date().toISOString().slice(0, 16)

let nextId = 1

function makeRow(): AssigneeRow {
  return { id: nextId++, nguoiXuLy: '', hanXuLy: '', ghiChu: '' }
}

export default function ModalDieuPhoi({ open, onClose, onSubmit, chiDaoInfo, defaultHanXuLy }: Props) {
  const [rows, setRows] = useState<AssigneeRow[]>([makeRow()])
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!open) return null

  const defaultHan = defaultHanXuLy

  const updateRow = (id: number, field: keyof AssigneeRow, value: string) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r))
    setErrors(p => ({ ...p, [`row_${id}_${field}`]: '' }))
  }

  const addRow = () => setRows(prev => [...prev, makeRow()])

  const removeRow = (id: number) => {
    if (rows.length === 1) return
    setRows(prev => prev.filter(r => r.id !== id))
  }

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {}
    if (rows.length === 0) { e.rows = 'Vui lòng thêm ít nhất một người xử lý.'; return e }
    rows.forEach(r => {
      if (!r.nguoiXuLy) e[`row_${r.id}_nguoiXuLy`] = 'Vui lòng chọn người xử lý.'
      if (!r.hanXuLy || r.hanXuLy < TODAY) e[`row_${r.id}_hanXuLy`] = 'Hạn xử lý không hợp lệ.'
      else if (defaultHan && r.hanXuLy > defaultHan) e[`row_${r.id}_hanXuLy`] = 'Hạn xử lý không được trễ hơn hạn xử lý gốc.'
    })
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onSubmit({ assignees: rows })
    setRows([makeRow()]); setErrors({})
  }

  const canSubmit = rows.every(r => r.nguoiXuLy && r.hanXuLy)

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
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--dark)' }}>Điều phối xử lý</div>
            <div style={{ fontSize: '.78rem', color: 'var(--text3)', marginTop: 3 }}>
              45/CV-SYT · V/v báo cáo tình hình KCB quý I/2026
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text3)' }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Info card: chỉ đạo lãnh đạo */}
          <div style={{
            background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10,
            padding: '12px 16px',
          }}>
            <div style={{ fontSize: '.72rem', fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: 8 }}>
              Chỉ đạo của Lãnh đạo
            </div>
            <div style={{ fontSize: '.82rem', color: 'var(--dark)', lineHeight: 1.6 }}>
              {chiDaoInfo?.noiDung ?? 'Giao P.KHTH chủ trì, phối hợp P.TCKT xây dựng báo cáo KCB quý I/2026. Hoàn thành trước 28/03/2026.'}
            </div>
            <div style={{ fontSize: '.72rem', color: '#1d4ed8', marginTop: 8 }}>
              {chiDaoInfo?.nguoiChiDao ?? 'Lê Văn Giám Đốc'} · {chiDaoInfo?.thoiGian ?? '25/03/2026 09:45'}
            </div>
          </div>

          {/* Danh sách người xử lý */}
          <div className="fg">
            <label style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text2)', marginBottom: 10, display: 'block' }}>
              Danh sách người xử lý <span className="req">*</span>
            </label>
            {errors.rows && <div style={{ fontSize: '.75rem', color: '#dc2626', marginBottom: 8 }}>{errors.rows}</div>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {rows.map((row, idx) => (
                <div key={row.id} style={{
                  border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px',
                  background: '#fafbfc', display: 'flex', flexDirection: 'column', gap: 10,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--text3)' }}>Người xử lý {idx + 1}</span>
                    {rows.length > 1 && (
                      <button onClick={() => removeRow(row.id)} style={{
                        border: 'none', background: 'transparent', cursor: 'pointer',
                        color: '#dc2626', fontSize: '.75rem',
                      }}>✕ Xóa</button>
                    )}
                  </div>

                  {/* Người xử lý */}
                  <div>
                    <select
                      value={row.nguoiXuLy}
                      onChange={e => updateRow(row.id, 'nguoiXuLy', e.target.value)}
                      style={{ width: '100%' }}
                    >
                      <option value="">-- Tìm kiếm người / phòng ban --</option>
                      {NGUOI_XU_LY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    {errors[`row_${row.id}_nguoiXuLy`] && (
                      <div style={{ fontSize: '.72rem', color: '#dc2626', marginTop: 3 }}>{errors[`row_${row.id}_nguoiXuLy`]}</div>
                    )}
                  </div>

                  {/* Hạn xử lý */}
                  <div>
                    <label style={{ fontSize: '.75rem', color: 'var(--text3)', display: 'block', marginBottom: 4 }}>Hạn xử lý *</label>
                    <input
                      type="datetime-local"
                      value={row.hanXuLy}
                      onChange={e => updateRow(row.id, 'hanXuLy', e.target.value)}
                      min={TODAY}
                      max={defaultHan}
                      style={{ width: '100%', boxSizing: 'border-box' }}
                    />
                    {errors[`row_${row.id}_hanXuLy`] && (
                      <div style={{ fontSize: '.72rem', color: '#dc2626', marginTop: 3 }}>{errors[`row_${row.id}_hanXuLy`]}</div>
                    )}
                  </div>

                  {/* Ghi chú */}
                  <div>
                    <label style={{ fontSize: '.75rem', color: 'var(--text3)', display: 'block', marginBottom: 4 }}>Ghi chú cho người xử lý</label>
                    <input
                      type="text"
                      value={row.ghiChu}
                      onChange={e => updateRow(row.id, 'ghiChu', e.target.value)}
                      placeholder="Nhập ghi chú (nếu có)..."
                      style={{ width: '100%', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={addRow}
              style={{
                marginTop: 10, border: '1px dashed var(--border)', background: 'transparent',
                borderRadius: 8, padding: '8px 14px', cursor: 'pointer',
                fontSize: '.8rem', color: 'var(--text2)', width: '100%',
              }}
            >
              + Thêm người xử lý
            </button>
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
            📋 Điều phối
          </button>
        </div>
      </div>
    </div>
  )
}
