import { useState, useRef, useEffect } from 'react'

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


export default function ModalHoanThanh({ open, onClose, onSubmit, chiDaoInfo }: Props) {
  const [ketQua, setKetQua] = useState('')
  const [files, setFiles] = useState<AttachedFile[]>([])
  const [hoSo, setHoSo] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [hoSoOpen, setHoSoOpen] = useState(false)
  const hoSoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hoSoOpen) return
    const handler = (e: MouseEvent) => {
      if (hoSoRef.current && !hoSoRef.current.contains(e.target as Node)) setHoSoOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [hoSoOpen])

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
            {errors.ketQua && <div style={{ fontSize: '.75rem', color: '#dc2626', marginTop: 4 }}>{errors.ketQua}</div>}
          </div>

          {/* Hồ sơ lưu trữ */}
          <div className="fg">
            <label style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text2)', marginBottom: 6, display: 'block' }}>
              Hồ sơ lưu trữ
            </label>
            <div ref={hoSoRef} style={{ position: 'relative' }}>
              {/* Trigger button */}
              <div
                onClick={() => setHoSoOpen(o => !o)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px',
                  cursor: 'pointer', background: '#fff', minHeight: 38,
                  boxShadow: hoSoOpen ? '0 0 0 2px rgba(22,163,74,.25)' : 'none',
                  borderColor: hoSoOpen ? '#16a34a' : 'var(--border)',
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, flex: 1 }}>
                  {hoSo.length === 0
                    ? <span style={{ fontSize: '.82rem', color: 'var(--text3)' }}>Chọn hồ sơ lưu trữ...</span>
                    : hoSo.map(v => {
                        const opt = HO_SO_OPTIONS.find(o => o.value === v)
                        return (
                          <span key={v} style={{
                            display: 'inline-flex', alignItems: 'center', gap: 4,
                            background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 4,
                            padding: '2px 8px', fontSize: '.75rem', color: '#15803d',
                          }}>
                            {opt?.label}
                            <span
                              onMouseDown={e => { e.stopPropagation(); toggleHoSo(v) }}
                              style={{ cursor: 'pointer', lineHeight: 1, marginLeft: 2, color: '#16a34a' }}
                            >×</span>
                          </span>
                        )
                      })
                  }
                </div>
                <span style={{ fontSize: '.7rem', color: 'var(--text3)', marginLeft: 8, flexShrink: 0 }}>
                  {hoSoOpen ? '▲' : '▼'}
                </span>
              </div>

              {/* Dropdown */}
              {hoSoOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
                  border: '1px solid var(--border)', borderRadius: 8, background: '#fff',
                  boxShadow: '0 8px 24px rgba(0,0,0,.12)', zIndex: 10, overflow: 'hidden',
                }}>
                  {HO_SO_OPTIONS.map((o, i, arr) => (
                    <div
                      key={o.value}
                      onMouseDown={e => { e.preventDefault(); toggleHoSo(o.value) }}
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
              )}
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
