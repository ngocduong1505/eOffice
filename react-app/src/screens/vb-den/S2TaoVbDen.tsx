import { useState } from 'react'
import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

// ─── Types ────────────────────────────────────────────────────────────────────
interface UploadedFile { name: string; size: string; type: string }

// ─── Don vi map ───────────────────────────────────────────────────────────────
const DON_VI_MAP: Record<string, string> = {
  'Sở Y tế TP.HCM': 'SYT-TPHCM',
  'BHXH TP.HCM': 'BHXH-TPHCM',
  'Sở TT&TT': 'STTTT-TPHCM',
  'Bộ Y tế': 'BYT-HN',
  'CDC TP.HCM': 'CDC-TPHCM',
}

// ─── Workflow node ─────────────────────────────────────────────────────────────
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

// ─── File row ──────────────────────────────────────────────────────────────────
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

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function S2TaoVbDen() {
  const { goScreen } = useNavigation()

  // Khối 2: thông tin VB
  const [noiGui, setNoiGui] = useState('Sở Y tế TP.HCM')
  const [maDonVi, setMaDonVi] = useState('SYT-TPHCM')

  // Khối 1: tệp
  const [fileTab, setFileTab] = useState<'upload' | 'soan'>('upload')
  const [mainFiles, setMainFiles] = useState<UploadedFile[]>([
    { name: '45_CV_SYT_KHCB_2026.pdf', size: '2.4 MB', type: 'pdf' },
  ])
  const [attachFiles, setAttachFiles] = useState<UploadedFile[]>([])

  // Khối 5: người nhận
  const [lanhdao, setLanhdao] = useState('')
  const [hanBuoc1, setHanBuoc1] = useState('')
  const [thuky, setThuky] = useState('')
  const [hanBuoc2, setHanBuoc2] = useState('')

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showConfirmClose, setShowConfirmClose] = useState(false)

  const handleNoiGuiChange = (v: string) => {
    setNoiGui(v)
    setMaDonVi(DON_VI_MAP[v] ?? '')
  }

  const handleSend = () => {
    const e: Record<string, string> = {}
    if (!lanhdao) e.lanhdao = 'Vui lòng chọn Lãnh đạo chỉ đạo.'
    if (!thuky) e.thuky = 'Vui lòng chọn Thư ký điều phối.'
    if (Object.keys(e).length) { setErrors(e); return }
    goScreen('s1')
  }

  const handleClose = () => {
    setShowConfirmClose(true)
  }

  const removeMainFile = (idx: number) => setMainFiles(prev => prev.filter((_, i) => i !== idx))
  const removeAttachFile = (idx: number) => setAttachFiles(prev => prev.filter((_, i) => i !== idx))

  return (
    <div className="cw" style={{ paddingBottom: 80, height: '100%', overflowY: 'auto' }}>

      {/* Sticky top action bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: '#ffffff', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 20px',
      }}>
        <div style={{ fontSize: '.95rem', fontWeight: 700, color: 'var(--dark)' }}>
          Tiếp nhận văn bản đến
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" onClick={handleClose}>✕ Đóng</button>
          <button className="btn btn-ghost">📋 Lưu nháp</button>
          <button className="btn btn-primary" onClick={handleSend}>📤 Gửi</button>
        </div>
      </div>

      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* ── Top: Khối 1 (Tệp) | Khối 2 (Thông tin VB) + Khối 3 (Thông tin đăng ký) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>

          {/* Khối 1: Tệp */}
          <div className="form-card" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div className="fc-title"><span>1</span> Tệp</div>

            {/* Tab toggle */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: 14 }}>
              {([['upload', '📎 Tải lên tệp'], ['soan', '✏️ Soạn thảo trực tiếp']] as const).map(([key, label]) => (
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
                <div className="fg" style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 8 }}>
                    Tệp chính
                  </label>
                  {mainFiles.map((f, i) => <FileRow key={i} file={f} onRemove={() => removeMainFile(i)} />)}
                  <button style={{
                    marginTop: 4, padding: '7px 14px', fontSize: '.8rem',
                    border: '1px dashed var(--border)', borderRadius: 6,
                    background: 'transparent', cursor: 'pointer', color: 'var(--text3)',
                  }}>+ Thêm tệp chính</button>
                </div>

                {/* Tệp đính kèm */}
                <div className="fg">
                  <label style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 8 }}>
                    Tệp đính kèm
                  </label>
                  {attachFiles.map((f, i) => <FileRow key={i} file={f} onRemove={() => removeAttachFile(i)} />)}
                  <div style={{
                    border: '2px dashed var(--border)', borderRadius: 8, padding: '28px 20px',
                    textAlign: 'center', color: 'var(--text3)', fontSize: '.82rem', cursor: 'pointer',
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>📎</div>
                    <div>Kéo thả hoặc <span style={{ color: 'var(--orange)', fontWeight: 600 }}>chọn tệp</span></div>
                    <div style={{ fontSize: '.72rem', marginTop: 4 }}>Hỗ trợ PDF, Word, Excel · Tối đa 20MB</div>
                  </div>
                </div>
              </>
            ) : (
              /* Soạn thảo trực tiếp */
              <div className="fg">
                <label style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 8 }}>
                  Nội dung văn bản
                </label>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                  {['B', 'I', 'U', '≡', '—', '•'].map(f => (
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
                  style={{ height: 280, resize: 'vertical', width: '100%', boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
              </div>
            )}
          </div>

          {/* Cột phải: Khối 2 + Khối 3 xếp dọc */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

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
                    style={{ height: 72 }}
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

              <div className="fg" style={{ marginBottom: 12 }}>
                <label>Sổ đến <span className="req">*</span></label>
                <select>
                  <option>Sổ công văn đến 2026</option>
                  <option>Sổ quyết định đến 2026</option>
                  <option>Sổ thông báo đến 2026</option>
                </select>
              </div>

              <div className="fg" style={{ marginBottom: 12 }}>
                <label>Số đến</label>
                <input className="auto" defaultValue="#47" readOnly />
                <div className="hint">Tự động cấp liên tiếp trong năm theo Sổ đến</div>
              </div>

              <div className="form-row" style={{ marginBottom: 0 }}>
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

              <div className="fg" style={{ marginTop: 12 }}>
                <label>Hồ sơ lưu trữ</label>
                <select>
                  <option>-- Chọn hồ sơ (có thể chọn nhiều) --</option>
                  <option>HS-2026-KCB</option>
                  <option>HS-2026-BHYT</option>
                  <option>HS-2026-HIS</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ── Khối 4: Luồng xử lý ── */}
        <div className="form-card">
          <div className="fc-title"><span>4</span> Luồng xử lý</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, padding: '16px 8px', overflowX: 'auto' }}>
            <WorkflowNode icon="📝" title="Tạo VB" sub="Văn thư" badge="Đang thực hiện" active />
            <div style={{ flex: 1, height: 2, background: '#e2e4ed', position: 'relative', minWidth: 32 }}>
              <div style={{ position: 'absolute', right: -8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1.1rem' }}>›</div>
            </div>
            <WorkflowNode icon="👤" title="Lãnh đạo chỉ đạo" sub="BGĐ / Lãnh đạo phòng" badge="Chờ thực hiện" />
            <div style={{ flex: 1, height: 2, background: '#e2e4ed', position: 'relative', minWidth: 32 }}>
              <div style={{ position: 'absolute', right: -8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1.1rem' }}>›</div>
            </div>
            <WorkflowNode icon="🔀" title="Thư ký điều phối" sub="Thư ký / Văn thư" badge="Chờ thực hiện" />
          </div>
          <div className="fg" style={{ marginTop: 8 }}>
            <label>Ý kiến xử lý</label>
            <textarea placeholder="Ghi ý kiến hoặc ghi chú kèm theo..." style={{ height: 72 }} />
          </div>
        </div>

        {/* ── Khối 5: Danh sách người nhận ── */}
        <div className="form-card">
          <div className="fc-title"><span>5</span> Danh sách người nhận</div>

          {/* Bước 1 */}
          <div style={{
            border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px', marginBottom: 14,
            background: '#fafbfc',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 22, height: 22, borderRadius: '50%',
                background: '#fb923c', color: '#fff', fontSize: '.65rem', fontWeight: 700,
              }}>1</span>
              <span style={{ fontSize: '.85rem', fontWeight: 700, color: 'var(--dark)' }}>
                Bước 1: Lãnh đạo chỉ đạo <span className="req">*</span>
              </span>
            </div>
            <div className="form-row" style={{ marginBottom: 0 }}>
              <div className="fg">
                <label>Người nhận</label>
                <select value={lanhdao} onChange={e => { setLanhdao(e.target.value); setErrors(p => ({ ...p, lanhdao: '' })) }}>
                  <option value="">-- Chọn lãnh đạo --</option>
                  <option value="gd">Lê Văn Giám Đốc — BGĐ</option>
                  <option value="pgd">Nguyễn Thị Phó GĐ — BGĐ</option>
                  <option value="tp">Trần Văn Trưởng Phòng — P.KHTH</option>
                </select>
                {errors.lanhdao && <div style={{ fontSize: '.75rem', color: '#dc2626', marginTop: 4 }}>{errors.lanhdao}</div>}
                <div className="hint">Lãnh đạo sẽ nhận văn bản và ghi ý kiến chỉ đạo</div>
              </div>
              <div className="fg">
                <label>Hạn xử lý</label>
                <input
                  type="datetime-local"
                  value={hanBuoc1}
                  onChange={e => setHanBuoc1(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
                <div className="hint">Hạn lãnh đạo cần hoàn thành chỉ đạo</div>
              </div>
            </div>
          </div>

          {/* Bước 2 */}
          <div style={{
            border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px',
            background: '#fafbfc',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 22, height: 22, borderRadius: '50%',
                background: '#64748b', color: '#fff', fontSize: '.65rem', fontWeight: 700,
              }}>2</span>
              <span style={{ fontSize: '.85rem', fontWeight: 700, color: 'var(--dark)' }}>
                Bước 2: Thư ký điều phối <span className="req">*</span>
              </span>
            </div>
            <div className="form-row" style={{ marginBottom: 0 }}>
              <div className="fg">
                <label>Người nhận</label>
                <select value={thuky} onChange={e => { setThuky(e.target.value); setErrors(p => ({ ...p, thuky: '' })) }}>
                  <option value="">-- Chọn thư ký --</option>
                  <option value="ntvt">Nguyễn Thị Văn Thư — Văn thư · P.HCNS</option>
                  <option value="ttthy">Trần Thị Thư Ký — Thư ký Ban GĐ · BGĐ</option>
                </select>
                {errors.thuky && <div style={{ fontSize: '.75rem', color: '#dc2626', marginTop: 4 }}>{errors.thuky}</div>}
                <div className="hint">Thư ký nhận văn bản sau khi lãnh đạo chỉ đạo xong</div>
              </div>
              <div className="fg">
                <label>Hạn xử lý</label>
                <input
                  type="datetime-local"
                  value={hanBuoc2}
                  onChange={e => setHanBuoc2(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
                <div className="hint">Hạn thư ký cần hoàn thành điều phối</div>
              </div>
            </div>
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
