import { useState, useRef } from 'react'

// UI_DOC_IN_008_MODAL — Hoàn thành xử lý
// Trigger: nút [Hoàn thành xử lý] khi trạng thái = "Chờ xử lý"

interface AttachedFile { name: string; size: number }

interface SubmitData {
  ketQua: string
  fileDinhKem: AttachedFile[]
  hoSoLuuTru: string[]
}

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (data: SubmitData) => void
  chiDaoInfo?: { nguoiGiao: string; thoiGian: string; noiDung: string }
}

const HO_SO_OPTIONS = [
  { value: 'hs-kcb-2026', label: 'Hồ sơ KCB 2026 · P.KHTH' },
  { value: 'hs-bcth-q1', label: 'Báo cáo tổng hợp Q1/2026 · BGĐ' },
  { value: 'hs-congvan-di', label: 'Công văn đi 2026 · Văn thư' },
]

const MAX_FILE_SIZE = 20 * 1024 * 1024
const ALLOWED_EXT = ['.pdf', '.doc', '.docx', '.xls', '.xlsx']

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

export default function ModalHoanThanh({ open, onClose, onSubmit, chiDaoInfo }: Props) {
  const [ketQua, setKetQua] = useState('')
  const [files, setFiles] = useState<AttachedFile[]>([])
  const [hoSo, setHoSo] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileRef = useRef<HTMLInputElement>(null)

  if (!open) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? [])
    const errs: string[] = []
    const valid: AttachedFile[] = []
    picked.forEach(f => {
      const ext = '.' + f.name.split('.').pop()?.toLowerCase()
      if (!ALLOWED_EXT.includes(ext)) { errs.push(`${f.name}: sai định dạng.`); return }
      if (f.size > MAX_FILE_SIZE) { errs.push(`${f.name}: vượt quá 20MB.`); return }
      valid.push({ name: f.name, size: f.size })
    })
    if (errs.length) setErrors(p => ({ ...p, files: errs.join(' ') }))
    setFiles(prev => [...prev, ...valid])
    e.target.value = ''
  }

  const removeFile = (name: string) => setFiles(prev => prev.filter(f => f.name !== name))

  const toggleHoSo = (val: string) => {
    setHoSo(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val])
  }

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {}
    if (!ketQua.trim()) e.ketQua = 'Vui lòng nhập kết quả xử lý trước khi hoàn thành.'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onSubmit({ ketQua, fileDinhKem: files, hoSoLuuTru: hoSo })
    setKetQua(''); setFiles([]); setHoSo([]); setErrors({})
  }

  const canSubmit = ketQua.trim()

  const fmtSize = (b: number) => b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.round(b / 1024)} KB`

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(15,20,40,.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500,
    }}>
      <div style={{
        background: '#fff', borderRadius: 16, width: 620, maxWidth: '94vw',
        boxShadow: '0 24px 64px rgba(0,0,0,.22)',
        display: 'flex', flexDirection: 'column', maxHeight: '90vh',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 24px 14px', borderBottom: '1px solid var(--border)',
        }}>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--dark)' }}>Hoàn thành xử lý</div>
            <div style={{ fontSize: '.78rem', color: 'var(--text3)', marginTop: 3 }}>
              45/CV-SYT · V/v báo cáo tình hình KCB quý I/2026
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text3)' }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Info card: chỉ đạo / giao việc */}
          <div style={{
            background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10,
            padding: '12px 16px',
          }}>
            <div style={{ fontSize: '.72rem', fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: 8 }}>
              Chỉ đạo / Giao việc
            </div>
            <div style={{ fontSize: '.82rem', color: 'var(--dark)', lineHeight: 1.6 }}>
              {chiDaoInfo?.noiDung ?? 'Giao P.KHTH chủ trì xây dựng báo cáo KCB quý I/2026. Hoàn thành trước 28/03/2026.'}
            </div>
            <div style={{ fontSize: '.72rem', color: '#1d4ed8', marginTop: 8 }}>
              {chiDaoInfo?.nguoiGiao ?? 'Lê Văn Giám Đốc'} · {chiDaoInfo?.thoiGian ?? '25/03/2026 09:45'}
            </div>
          </div>

          {/* Kết quả xử lý */}
          <div className="fg">
            <label style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text2)', marginBottom: 6, display: 'block' }}>
              Kết quả xử lý <span className="req">*</span>
            </label>
            <textarea
              value={ketQua}
              onChange={e => { setKetQua(e.target.value); setErrors(p => ({ ...p, ketQua: '' })) }}
              placeholder="Nhập kết quả xử lý..."
              style={{ height: 130, resize: 'vertical', width: '100%', boxSizing: 'border-box' }}
            />
            <RichToolbar />
            {errors.ketQua && <div style={{ fontSize: '.75rem', color: '#dc2626', marginTop: 4 }}>{errors.ketQua}</div>}
          </div>

          {/* Tệp kết quả đính kèm */}
          <div className="fg">
            <label style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text2)', marginBottom: 6, display: 'block' }}>
              Tệp kết quả đính kèm
            </label>
            <input ref={fileRef} type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx" style={{ display: 'none' }} onChange={handleFileChange} />
            <button
              onClick={() => fileRef.current?.click()}
              style={{
                border: '1px dashed var(--border)', background: '#fafbfc', borderRadius: 8,
                padding: '10px 16px', cursor: 'pointer', fontSize: '.8rem', color: 'var(--text2)',
                width: '100%',
              }}
            >
              📎 Đính kèm văn bản phản hồi / báo cáo (PDF, Word, Excel · tối đa 20MB/tệp)
            </button>
            {errors.files && <div style={{ fontSize: '.75rem', color: '#dc2626', marginTop: 4 }}>{errors.files}</div>}
            {files.length > 0 && (
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {files.map(f => (
                  <div key={f.name} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: '#f8fafc', border: '1px solid var(--border)', borderRadius: 6,
                    padding: '6px 10px',
                  }}>
                    <span style={{ fontSize: '.8rem', flex: 1, color: 'var(--dark)' }}>📄 {f.name}</span>
                    <span style={{ fontSize: '.72rem', color: 'var(--text3)' }}>{fmtSize(f.size)}</span>
                    <button onClick={() => removeFile(f.name)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#dc2626', fontSize: '.8rem' }}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hồ sơ lưu trữ */}
          <div className="fg">
            <label style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text2)', marginBottom: 6, display: 'block' }}>
              Hồ sơ lưu trữ
            </label>
            <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
              {HO_SO_OPTIONS.map((o, i, arr) => (
                <div
                  key={o.value}
                  onClick={() => toggleHoSo(o.value)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 14px', cursor: 'pointer',
                    background: hoSo.includes(o.value) ? '#f0fdf4' : '#fff',
                    borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <input type="checkbox" checked={hoSo.includes(o.value)} onChange={() => {}} style={{ cursor: 'pointer' }} />
                  <span style={{ fontSize: '.82rem', color: 'var(--dark)' }}>{o.label}</span>
                </div>
              ))}
            </div>
            <div className="hint">Không bắt buộc. Văn bản sẽ được lưu vào các hồ sơ đã chọn sau khi hoàn thành.</div>
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
            style={{
              background: canSubmit ? '#16a34a' : undefined,
              borderColor: canSubmit ? '#16a34a' : undefined,
              opacity: canSubmit ? 1 : .45,
              cursor: canSubmit ? 'pointer' : 'not-allowed',
            }}
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            ✓ Hoàn thành xử lý
          </button>
        </div>
      </div>
    </div>
  )
}
