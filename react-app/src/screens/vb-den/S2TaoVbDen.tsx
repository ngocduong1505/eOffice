import { useState } from 'react'
import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

// ─── Types ────────────────────────────────────────────────────────────────────
interface UploadedFile { name: string; size: string; type: string }

// ─── Constants ────────────────────────────────────────────────────────────────
const DON_VI_MAP: Record<string, string> = {
  'Sở Y tế TP.HCM': 'SYT-TPHCM',
  'BHXH TP.HCM': 'BHXH-TPHCM',
  'Sở TT&TT': 'STTTT-TPHCM',
  'Bộ Y tế': 'BYT-HN',
  'CDC TP.HCM': 'CDC-TPHCM',
}

const HO_SO_LIST = [
  { value: 'hs-kcb', label: 'HS-2026-KCB · Hồ sơ KCB 2026' },
  { value: 'hs-bhyt', label: 'HS-2026-BHYT · Hồ sơ BHYT 2026' },
  { value: 'hs-his', label: 'HS-2026-HIS · Hồ sơ HIS 2026' },
  { value: 'hs-hcqg', label: 'HS-2026-HCQG · Công văn đến chung' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────
function WorkflowNode({ icon, title, sub, badge, active }: {
  icon: string; title: string; sub: string; badge: string; active?: boolean
}) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      background: active ? '#fff7ed' : '#f8fafc',
      border: `2px solid ${active ? '#fb923c' : '#cbd5e1'}`,
      borderRadius: 12, padding: '12px 20px', minWidth: 140, textAlign: 'center',
    }}>
      <div style={{ fontSize: '1.3rem', marginBottom: 4 }}>{icon}</div>
      <div style={{ fontSize: '.78rem', fontWeight: 700, color: active ? '#c2410c' : 'var(--dark)' }}>{title}</div>
      <div style={{ fontSize: '.7rem', color: 'var(--text3)', marginTop: 2 }}>{sub}</div>
      <div style={{
        marginTop: 6, fontSize: '.68rem',
        background: active ? '#fb923c' : '#e2e4ed',
        color: active ? '#fff' : '#64748b',
        borderRadius: 20, padding: '2px 8px',
      }}>{badge}</div>
    </div>
  )
}

function FileRow({ file, onRemove }: { file: UploadedFile; onRemove: () => void }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      border: '1px solid var(--border)', borderRadius: 8, padding: '10px 12px',
      background: '#fafbfc', marginBottom: 6,
    }}>
      <span style={{ fontSize: '1.2rem' }}>{file.type === 'xlsx' ? '📊' : '📄'}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--dark)' }}>{file.name}</div>
        <div style={{ fontSize: '.7rem', color: 'var(--text3)' }}>{file.type.toUpperCase()} · {file.size}</div>
      </div>
      <button onClick={onRemove} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text3)', fontSize: '.85rem' }}>✕</button>
    </div>
  )
}

// Multi-select Hồ sơ lưu trữ bằng checkbox dropdown
function HoSoSelect({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(false)

  const toggle = (v: string) => {
    onChange(value.includes(v) ? value.filter(x => x !== v) : [...value, v])
  }

  const selectedLabels = HO_SO_LIST.filter(o => value.includes(o.value)).map(o => o.label.split(' · ')[0])

  return (
    <div style={{ position: 'relative' }}>
      <div
        onClick={() => setOpen(p => !p)}
        style={{
          border: '1px solid var(--border)', borderRadius: 6, padding: '7px 10px',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#fff', minHeight: 36, fontSize: '.85rem',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, flex: 1 }}>
          {selectedLabels.length === 0
            ? <span style={{ color: '#94a3b8' }}>-- Chọn hồ sơ lưu trữ --</span>
            : selectedLabels.map(l => (
              <span key={l} style={{
                background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe',
                borderRadius: 4, padding: '1px 7px', fontSize: '.76rem', fontWeight: 600,
              }}>{l}</span>
            ))
          }
        </div>
        <span style={{ color: 'var(--text3)', fontSize: '.75rem', marginLeft: 6 }}>{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 200,
          background: '#fff', border: '1px solid var(--border)', borderRadius: 8,
          boxShadow: '0 6px 20px rgba(0,0,0,.12)', marginTop: 4, overflow: 'hidden',
        }}
          onMouseLeave={() => setOpen(false)}
        >
          {HO_SO_LIST.map((o, i) => (
            <div
              key={o.value}
              onClick={() => toggle(o.value)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                cursor: 'pointer', fontSize: '.82rem',
                background: value.includes(o.value) ? '#eff6ff' : '#fff',
                borderBottom: i < HO_SO_LIST.length - 1 ? '1px solid var(--border)' : 'none',
              }}
              onMouseEnter={e => { if (!value.includes(o.value)) e.currentTarget.style.background = '#f8fafc' }}
              onMouseLeave={e => { e.currentTarget.style.background = value.includes(o.value) ? '#eff6ff' : '#fff' }}
            >
              <input type="checkbox" checked={value.includes(o.value)} onChange={() => {}} style={{ cursor: 'pointer' }} />
              <span style={{ color: 'var(--dark)' }}>{o.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Step badge cho Khối 5
function StepBadge({ num, color }: { num: number; color: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 22, height: 22, borderRadius: '50%',
      background: color, color: '#fff', fontSize: '.65rem', fontWeight: 700,
    }}>{num}</span>
  )
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function S2TaoVbDen() {
  const { goScreen } = useNavigation()

  const [noiGui, setNoiGui] = useState('Sở Y tế TP.HCM')
  const [maDonVi, setMaDonVi] = useState('SYT-TPHCM')

  const [fileTab, setFileTab] = useState<'upload' | 'soan'>('upload')
  const [mainFiles, setMainFiles] = useState<UploadedFile[]>([
    { name: '45_CV_SYT_KHCB_2026.pdf', size: '2.4 MB', type: 'pdf' },
  ])
  const [attachFiles, setAttachFiles] = useState<UploadedFile[]>([])

  const [hoSo, setHoSo] = useState<string[]>([])

  const [lanhdao, setLanhdao] = useState('')
  const [hanBuoc1, setHanBuoc1] = useState('')
  const [chuaBietBuoc1, setChuaBietBuoc1] = useState(false)
  const [thuky, setThuky] = useState('')
  const [hanBuoc2, setHanBuoc2] = useState('')
  const [chuaBietBuoc2, setChuaBietBuoc2] = useState(false)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showConfirmClose, setShowConfirmClose] = useState(false)

  const handleNoiGuiChange = (v: string) => {
    setNoiGui(v)
    setMaDonVi(DON_VI_MAP[v] ?? '')
  }

  const handleSend = () => {
    const e: Record<string, string> = {}
    if (!chuaBietBuoc1 && !lanhdao) e.lanhdao = 'Vui lòng chọn Lãnh đạo chỉ đạo.'
    if (!chuaBietBuoc2 && !thuky) e.thuky = 'Vui lòng chọn Thư ký điều phối.'
    if (Object.keys(e).length) { setErrors(e); return }
    goScreen('s1')
  }

  return (
    <div className="cw" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Sticky top action bar */}
      <div style={{
        flexShrink: 0, zIndex: 50,
        background: '#ffffff', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 20px',
      }}>
        <div style={{ fontSize: '.95rem', fontWeight: 700, color: 'var(--dark)' }}>
          Tiếp nhận văn bản đến
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" onClick={() => setShowConfirmClose(true)}>✕ Đóng</button>
          <button className="btn btn-ghost">📋 Lưu nháp</button>
          <button className="btn btn-primary" onClick={handleSend}>📤 Gửi</button>
        </div>
      </div>

      {/* Body — split layout */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'grid', gridTemplateColumns: '3fr 2fr' }}>

        {/* ══ CỘT TRÁI: Form (Khối 2 + 3 + 4 + 5) ══ */}
        <div style={{ overflowY: 'auto', padding: '20px 20px 40px', display: 'flex', flexDirection: 'column', gap: 16, borderRight: '1px solid var(--border)' }}>

          {/* Khối 2: Thông tin văn bản */}
          <div className="form-card">
            <div className="fc-title"><span>2</span> Thông tin văn bản</div>

            <div className="form-row">
              <div className="fg">
                <label>Loại văn bản <span className="req">*</span></label>
                <select>
                  <option>Công văn</option>
                  <option>Quyết định</option>
                  <option>Tờ trình</option>
                  <option>Thông báo</option>
                  <option>Kế hoạch</option>
                  <option>Chỉ thị</option>
                </select>
              </div>
              <div className="fg">
                <label>Số ký hiệu VB <span className="req">*</span></label>
                <input type="text" defaultValue="45/CV-SYT" placeholder="VD: 45/CV-SYT" />
              </div>
            </div>

            <div className="form-row full">
              <div className="fg">
                <label>Tên VB (Trích yếu) <span className="req">*</span></label>
                <textarea
                  defaultValue="V/v báo cáo tình hình thực hiện kế hoạch khám chữa bệnh quý I/2026"
                  style={{ height: 68 }}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="fg">
                <label>Đơn vị gửi <span className="req">*</span></label>
                <select value={noiGui} onChange={e => handleNoiGuiChange(e.target.value)}>
                  {Object.keys(DON_VI_MAP).map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
              <div className="fg">
                <label>Mã đơn vị gửi</label>
                <input className="auto" value={maDonVi} readOnly />
                <div className="hint">Tự động điền theo Đơn vị gửi</div>
              </div>
            </div>

            <div className="form-row">
              <div className="fg">
                <label>Mức độ Khẩn</label>
                <select>
                  <option>🔴 Hỏa tốc — xử lý ngay</option>
                  <option>🟠 Thượng khẩn — trong ngày</option>
                  <option>🟡 Khẩn — trong 2 ngày</option>
                  <option>⚪ Thường — trong 5 ngày</option>
                </select>
              </div>
              <div className="fg">
                <label>Mức độ Mật</label>
                <select>
                  <option>Thường (không mật)</option>
                  <option>Mật</option>
                  <option>Tối mật</option>
                  <option>Tuyệt mật</option>
                </select>
              </div>
            </div>
          </div>

          {/* Khối 3: Thông tin đăng ký */}
          <div className="form-card">
            <div className="fc-title"><span>3</span> Thông tin đăng ký</div>

            <div className="form-row">
              <div className="fg">
                <label>Sổ đến <span className="req">*</span></label>
                <select>
                  <option>Sổ công văn đến 2026</option>
                  <option>Sổ quyết định đến 2026</option>
                  <option>Sổ thông báo đến 2026</option>
                </select>
              </div>
              <div className="fg">
                <label>Số đến</label>
                <input className="auto" defaultValue="#47" readOnly />
                <div className="hint">Tự động cấp liên tiếp theo Sổ đến</div>
              </div>
            </div>

            <div className="form-row">
              <div className="fg">
                <label>Ngày đến <span className="req">*</span></label>
                <input type="date" defaultValue="2026-03-25" />
                <div className="hint">Không được lớn hơn ngày hiện tại</div>
              </div>
              <div className="fg">
                <label>Hạn xử lý</label>
                <input type="date" defaultValue="2026-03-28" />
                <div className="hint">Không được trước Ngày đến</div>
              </div>
            </div>

            <div className="fg">
              <label>Hồ sơ lưu trữ</label>
              <HoSoSelect value={hoSo} onChange={setHoSo} />
              <div className="hint">Có thể chọn nhiều hồ sơ. VB sẽ được lưu vào tất cả hồ sơ đã chọn.</div>
            </div>
          </div>

          {/* Khối 4: Luồng xử lý */}
          <div className="form-card">
            <div className="fc-title"><span>4</span> Luồng xử lý</div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '16px 8px', overflowX: 'auto', gap: 0 }}>
              <WorkflowNode icon="📝" title="Tạo VB" sub="Văn thư" badge="Đang thực hiện" active />
              <div style={{ flex: 1, height: 2, background: '#e2e4ed', position: 'relative', minWidth: 24 }}>
                <div style={{ position: 'absolute', right: -8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1.1rem' }}>›</div>
              </div>
              <WorkflowNode icon="👤" title="Lãnh đạo chỉ đạo" sub="BGĐ / Lãnh đạo phòng" badge="Chờ thực hiện" />
              <div style={{ flex: 1, height: 2, background: '#e2e4ed', position: 'relative', minWidth: 24 }}>
                <div style={{ position: 'absolute', right: -8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1.1rem' }}>›</div>
              </div>
              <WorkflowNode icon="🔀" title="Thư ký điều phối" sub="Thư ký / Văn thư" badge="Chờ thực hiện" />
            </div>
            <div className="fg" style={{ marginTop: 4 }}>
              <label>Ý kiến xử lý</label>
              <textarea placeholder="Ghi ý kiến hoặc ghi chú kèm theo..." style={{ height: 68 }} />
            </div>
          </div>

          {/* Khối 5: Danh sách người nhận */}
          <div className="form-card">
            <div className="fc-title"><span>5</span> Danh sách người nhận</div>

            {/* Bước 1 */}
            <div style={{ border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px', marginBottom: 14, background: '#fafbfc' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <StepBadge num={1} color="#fb923c" />
                  <span style={{ fontSize: '.85rem', fontWeight: 700, color: 'var(--dark)' }}>
                    Bước 1: Lãnh đạo chỉ đạo {!chuaBietBuoc1 && <span className="req">*</span>}
                  </span>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '.78rem', color: 'var(--text3)', userSelect: 'none' }}>
                  <input
                    type="checkbox"
                    checked={chuaBietBuoc1}
                    onChange={e => { setChuaBietBuoc1(e.target.checked); if (e.target.checked) { setLanhdao(''); setErrors(p => ({ ...p, lanhdao: '' })) } }}
                    style={{ cursor: 'pointer' }}
                  />
                  Chưa xác định
                </label>
              </div>
              <div className="form-row" style={{ marginBottom: 0, opacity: chuaBietBuoc1 ? 0.45 : 1, pointerEvents: chuaBietBuoc1 ? 'none' : 'auto' }}>
                <div className="fg">
                  <label>Người nhận</label>
                  <select value={lanhdao} onChange={e => { setLanhdao(e.target.value); setErrors(p => ({ ...p, lanhdao: '' })) }}>
                    <option value="">-- Chọn lãnh đạo --</option>
                    <option value="gd">Lê Văn Giám Đốc — BGĐ</option>
                    <option value="pgd">Nguyễn Thị Phó GĐ — BGĐ</option>
                    <option value="tp">Trần Văn Trưởng Phòng — P.KHTH</option>
                  </select>
                  {errors.lanhdao && <div style={{ fontSize: '.75rem', color: '#dc2626', marginTop: 4 }}>{errors.lanhdao}</div>}
                  <div className="hint">Lãnh đạo sẽ nhận VB và ghi ý kiến chỉ đạo</div>
                </div>
                <div className="fg">
                  <label>Hạn xử lý</label>
                  <input type="datetime-local" value={hanBuoc1} onChange={e => setHanBuoc1(e.target.value)} style={{ width: '100%', boxSizing: 'border-box' }} />
                  <div className="hint">Hạn lãnh đạo cần hoàn thành chỉ đạo</div>
                </div>
              </div>
            </div>

            {/* Bước 2 */}
            <div style={{ border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px', background: '#fafbfc' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <StepBadge num={2} color="#64748b" />
                  <span style={{ fontSize: '.85rem', fontWeight: 700, color: 'var(--dark)' }}>
                    Bước 2: Thư ký điều phối {!chuaBietBuoc2 && <span className="req">*</span>}
                  </span>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '.78rem', color: 'var(--text3)', userSelect: 'none' }}>
                  <input
                    type="checkbox"
                    checked={chuaBietBuoc2}
                    onChange={e => { setChuaBietBuoc2(e.target.checked); if (e.target.checked) { setThuky(''); setErrors(p => ({ ...p, thuky: '' })) } }}
                    style={{ cursor: 'pointer' }}
                  />
                  Chưa xác định
                </label>
              </div>
              <div className="form-row" style={{ marginBottom: 0, opacity: chuaBietBuoc2 ? 0.45 : 1, pointerEvents: chuaBietBuoc2 ? 'none' : 'auto' }}>
                <div className="fg">
                  <label>Người nhận</label>
                  <select value={thuky} onChange={e => { setThuky(e.target.value); setErrors(p => ({ ...p, thuky: '' })) }}>
                    <option value="">-- Chọn thư ký --</option>
                    <option value="ntvt">Nguyễn Thị Văn Thư — Văn thư · P.HCNS</option>
                    <option value="ttthy">Trần Thị Thư Ký — Thư ký Ban GĐ · BGĐ</option>
                  </select>
                  {errors.thuky && <div style={{ fontSize: '.75rem', color: '#dc2626', marginTop: 4 }}>{errors.thuky}</div>}
                  <div className="hint">Thư ký nhận VB sau khi lãnh đạo chỉ đạo xong</div>
                </div>
                <div className="fg">
                  <label>Hạn xử lý</label>
                  <input type="datetime-local" value={hanBuoc2} onChange={e => setHanBuoc2(e.target.value)} style={{ width: '100%', boxSizing: 'border-box' }} />
                  <div className="hint">Hạn thư ký cần hoàn thành điều phối</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ CỘT PHẢI: Khối 1 — Tệp (sticky) ══ */}
        <div style={{ overflowY: 'auto', padding: '20px 20px 40px', display: 'flex', flexDirection: 'column', gap: 0, background: 'var(--bg)' }}>
          <div className="form-card" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div className="fc-title"><span>1</span> Tệp</div>

            {/* Tab toggle */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: 14 }}>
              {([['upload', '📎 Tải lên'], ['soan', '✏️ Soạn thảo']] as const).map(([key, label]) => (
                <div
                  key={key}
                  onClick={() => setFileTab(key)}
                  style={{
                    flex: 1, textAlign: 'center', padding: '8px 0',
                    fontSize: '.8rem', fontWeight: 600, cursor: 'pointer',
                    color: fileTab === key ? 'var(--orange)' : 'var(--text3)',
                    borderBottom: fileTab === key ? '2px solid var(--orange)' : '2px solid transparent',
                  }}
                >
                  {label}
                </div>
              ))}
            </div>

            {fileTab === 'upload' ? (
              <>
                {/* Tệp chính */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: 8 }}>
                    Tệp chính
                  </div>
                  {mainFiles.map((f, i) => (
                    <FileRow key={i} file={f} onRemove={() => setMainFiles(prev => prev.filter((_, j) => j !== i))} />
                  ))}
                  <button style={{
                    marginTop: 4, padding: '7px 14px', fontSize: '.8rem',
                    border: '1px dashed var(--border)', borderRadius: 6,
                    background: 'transparent', cursor: 'pointer', color: 'var(--text3)', width: '100%',
                  }}>+ Thêm tệp chính</button>
                </div>

                {/* Tệp đính kèm */}
                <div>
                  <div style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: 8 }}>
                    Tệp đính kèm
                  </div>
                  {attachFiles.map((f, i) => (
                    <FileRow key={i} file={f} onRemove={() => setAttachFiles(prev => prev.filter((_, j) => j !== i))} />
                  ))}
                  <div style={{
                    border: '2px dashed var(--border)', borderRadius: 10, padding: '32px 20px',
                    textAlign: 'center', color: 'var(--text3)', fontSize: '.82rem', cursor: 'pointer',
                    background: '#fafbfc',
                  }}>
                    <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>📎</div>
                    <div>Kéo thả hoặc <span style={{ color: 'var(--orange)', fontWeight: 600 }}>chọn tệp</span></div>
                    <div style={{ fontSize: '.72rem', marginTop: 4 }}>PDF, Word, Excel · Tối đa 20MB/tệp</div>
                  </div>
                </div>
              </>
            ) : (
              /* Soạn thảo trực tiếp */
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                  {['B', 'I', 'U', '≡', '•', '—'].map(f => (
                    <button key={f} style={{
                      border: '1px solid var(--border)', background: '#f8fafc',
                      borderRadius: 4, width: 28, height: 28, cursor: 'pointer',
                      fontSize: '.82rem', fontWeight: f === 'B' ? 700 : 400,
                      fontStyle: f === 'I' ? 'italic' : 'normal',
                      color: 'var(--text2)',
                    }}>{f}</button>
                  ))}
                </div>
                <textarea
                  placeholder="Soạn thảo nội dung văn bản trực tiếp..."
                  style={{ flex: 1, minHeight: 320, resize: 'none', width: '100%', boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirm close popup */}
      {showConfirmClose && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(15,20,40,.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500,
        }}>
          <div style={{
            background: '#fff', borderRadius: 14, padding: '28px 32px',
            boxShadow: '0 16px 48px rgba(0,0,0,.2)', maxWidth: 400, textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>⚠️</div>
            <div style={{ fontSize: '.95rem', fontWeight: 700, color: 'var(--dark)', marginBottom: 8 }}>
              Dữ liệu chưa được lưu
            </div>
            <div style={{ fontSize: '.82rem', color: 'var(--text3)', marginBottom: 20 }}>
              Bạn có chắc chắn muốn thoát? Dữ liệu đã nhập sẽ không được lưu.
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button className="btn btn-ghost" onClick={() => setShowConfirmClose(false)}>Tiếp tục nhập</button>
              <button className="btn btn-primary" style={{ background: '#dc2626', borderColor: '#dc2626' }} onClick={() => goScreen('s1')}>Thoát</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
