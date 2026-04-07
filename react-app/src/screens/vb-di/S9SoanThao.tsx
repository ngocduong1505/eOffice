import { useState, useRef } from 'react'
import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

interface UploadedFile { name: string; size: string; ext: string; url?: string }

const MOCK_MAIN: UploadedFile = { name: 'BaoCao_KCB_Q1_2026.docx', size: '2.4 MB', ext: 'docx' }

function FileRow({ file, selected, onClick, onRemove }: {
  file: UploadedFile; selected?: boolean
  onClick: () => void; onRemove: () => void
}) {
  const icon = file.ext === 'xlsx' ? '📊' : file.ext === 'docx' || file.ext === 'doc' ? '📝' : '📄'
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
      borderRadius: 8, cursor: 'pointer', marginBottom: 6,
      border: `1px solid ${selected ? 'var(--orange)' : 'var(--border)'}`,
      background: selected ? '#fff7ed' : '#fafbfc',
    }}>
      <span style={{ fontSize: '1.15rem' }}>{icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--dark)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
        <div style={{ fontSize: '.7rem', color: 'var(--text3)' }}>{file.ext.toUpperCase()} · {file.size}</div>
      </div>
      <button onClick={e => { e.stopPropagation(); onRemove() }} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text3)', fontSize: '.85rem' }}>✕</button>
    </div>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg className={`proc-chevron${open ? ' proc-open' : ''}`} width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button className="s9-rm-btn" onClick={onClick} title="Xóa">
      <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )
}

export default function S9SoanThao() {
  const { goScreen } = useNavigation()

  const [fileTab, setFileTab] = useState<'main' | 'attach' | 'draft'>('main')
  const [mainFiles, setMainFiles] = useState<UploadedFile[]>([MOCK_MAIN])
  const [attachFiles, setAttachFiles] = useState<UploadedFile[]>([])
  const [preview, setPreview] = useState<UploadedFile | null>(MOCK_MAIN)
  const [showConfirm, setShowConfirm] = useState(false)

  const mainFileInputRef = useRef<HTMLInputElement>(null)
  const attachFileInputRef = useRef<HTMLInputElement>(null)

  const addFiles = (
    files: FileList | null,
    setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>,
  ) => {
    if (!files) return
    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file)
      const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin'
      const size = file.size < 1024 * 1024
        ? `${(file.size / 1024).toFixed(1)} KB`
        : `${(file.size / 1024 / 1024).toFixed(1)} MB`
      const newFile: UploadedFile = { name: file.name, size, ext, url }
      setFiles(prev => [...prev, newFile])
      setPreview(newFile)
    })
  }

  // collapsible proc-step state
  const [step1Open, setStep1Open] = useState(true)
  const [step2Open, setStep2Open] = useState(false)
  const [step3Open, setStep3Open] = useState(false)

  return (
    <div className="cw" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Topbar breadcrumb={['Văn bản Đi', 'Tạo văn bản mới']} onNavClick={() => goScreen('s8')} />

      {/* Action bar */}
      <div className="form-actionbar">
        <div className="form-actionbar-title">Soạn Văn bản Đi mới</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" onClick={() => setShowConfirm(true)}>← Hủy</button>
          <button className="btn btn-ghost">💾 Lưu nháp</button>
          <button className="btn btn-primary" onClick={() => goScreen('s10')}>Gửi duyệt →</button>
        </div>
      </div>

      {/* Body: 3fr / 2fr */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'grid', gridTemplateColumns: '3fr 2fr' }}>

        {/* ══ CỘT TRÁI: Form ══ */}
        <div style={{ overflowY: 'auto', borderRight: '1px solid var(--border)', background: 'var(--bg)' }}>

          {/* Card 1: Thông tin văn bản */}
          <div className="form-card">
            <div className="fc-title">Thông tin văn bản</div>

            <div className="form-row full">
              <div className="fg">
                <label>Tên văn bản <span className="req">*</span></label>
                <input defaultValue="Báo cáo công tác KCB quý I/2026" placeholder="Nhập tên chính thức của văn bản..." />
              </div>
            </div>

            <div className="form-row full">
              <div className="fg">
                <label>Trích yếu nội dung <span className="req">*</span></label>
                <textarea
                  defaultValue="V/v báo cáo tình hình thực hiện kế hoạch khám chữa bệnh quý I năm 2026"
                  placeholder="Tóm tắt nội dung chính của văn bản..."
                  style={{ height: 62 }}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="fg">
                <label>Loại VB <span className="req">*</span></label>
                <select defaultValue="Báo cáo">
                  <option>Công văn</option>
                  <option>Tờ trình</option>
                  <option>Quyết định</option>
                  <option>Thông báo</option>
                  <option>Báo cáo</option>
                  <option>Kế hoạch</option>
                </select>
              </div>
              <div className="fg">
                <label>Mức khẩn / Mật</label>
                <select>
                  <option>Thường</option>
                  <option>Khẩn</option>
                  <option>Thượng khẩn</option>
                  <option>Hỏa tốc</option>
                  <option disabled>──────────</option>
                  <option>Mật</option>
                  <option>Tối mật</option>
                  <option>Tuyệt mật</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="fg">
                <label>Sổ đi</label>
                <select><option>Sổ VB Đi 2026 (hiện tại: 47)</option><option>Sổ Nội bộ 2026</option></select>
              </div>
              <div className="fg">
                <label>Số ký hiệu <span style={{ fontSize: '.68rem', color: '#9ca3af', fontWeight: 400 }}>(cấp sau khi ban hành)</span></label>
                <input className="auto" defaultValue="Tự động cấp sau khi ban hành" disabled />
              </div>
            </div>

            <div className="form-row">
              <div className="fg">
                <label>Ngày ban hành <span style={{ fontSize: '.68rem', color: '#9ca3af', fontWeight: 400 }}>(cấp sau khi ban hành)</span></label>
                <input type="text" className="auto" defaultValue="Tự động cấp sau khi ban hành" disabled />
              </div>
            </div>
          </div>

          {/* Card 2: Quy trình xử lý */}
          <div className="form-card">
            <div className="fc-title"> Quy trình xử lý</div>

            <div className="qt-flow">

              {/* Step 1: Duyệt — active */}
              <div className="qt-step qt-active">
                <div className="qt-icon" style={{ background: '#fff3ed', border: '2px solid var(--orange)' }}>
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="var(--orange)" strokeWidth="2">
                    <path strokeLinecap="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </div>
                <div className="qt-name">Duyệt</div>
                <div className="qt-role">Phó GĐ / Trưởng phòng</div>
                <span className="qt-badge qt-badge-active">Đang thực hiện</span>
              </div>

              <div className="qt-arrow">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth="2.5">
                  <path strokeLinecap="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Step 2: Ký số */}
              <div className="qt-step">
                <div className="qt-icon">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth="2">
                    <path strokeLinecap="round" d="M15.232 5.232l3.536 3.536M9 13l6.5-6.5a2 2 0 012.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-3 1 1-3a4 4 0 01.828-1.414z" />
                    <path strokeLinecap="round" d="M16 19h6M3 21l3-1" />
                  </svg>
                </div>
                <div className="qt-name">Ký số</div>
                <div className="qt-role">Giám đốc · BGĐ</div>
                <span className="qt-badge qt-badge-wait">Chờ thực hiện</span>
              </div>

              <div className="qt-arrow">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth="2.5">
                  <path strokeLinecap="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Step 3: Đóng dấu & Cấp số */}
              <div className="qt-step">
                <div className="qt-icon">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth="2">
                    <path strokeLinecap="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="qt-name" style={{ fontSize: '.74rem' }}>Đóng dấu &amp; Cấp số</div>
                <div className="qt-role">Văn thư · P. HC</div>
                <span className="qt-badge qt-badge-wait">Chờ thực hiện</span>
              </div>

              <div className="qt-arrow">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth="2.5">
                  <path strokeLinecap="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Step 4: Ban hành */}
              <div className="qt-step">
                <div className="qt-icon">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth="2">
                    <path strokeLinecap="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <div className="qt-name">Ban hành</div>
                <div className="qt-role">Phòng Hành chính</div>
                <span className="qt-badge qt-badge-wait">Chờ thực hiện</span>
              </div>

            </div>
          </div>

          {/* Card 3: Danh sách người xử lý */}
          <div className="form-card">
            <div className="fc-title">Danh sách người xử lý</div>

            {/* Bước 1 — Duyệt nội dung */}
            <div className="proc-step" style={{ borderLeft: '3px solid var(--orange)' }}>
              <div className="proc-step-hd" onClick={() => setStep1Open(v => !v)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="proc-num" style={{ background: 'var(--orange)' }}>1</span>
                  <div>
                    <span className="proc-title">Bước 1 — Duyệt nội dung</span>
                    <span className="proc-count">2 người</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="stag st-process" style={{ fontSize: '.7rem' }}>Điểm khởi đầu</span>
                  <ChevronIcon open={step1Open} />
                </div>
              </div>
              {step1Open && (
                <div className="proc-body">
                  <div className="form-row">
                    <div className="fg">
                      <label>Hình thức xử lý <span className="req">*</span></label>
                      <select><option value="tuan-tu">Tuần tự</option><option value="song-song">Song song</option></select>
                    </div>
                    <div className="fg">
                      <label>Hạn xử lý</label>
                      <input type="date" />
                    </div>
                  </div>
                  <div className="fg" style={{ marginBottom: 10 }}>
                    <label>Danh sách người duyệt <span className="req">*</span></label>
                    <div className="s9-person-list">
                      <div className="person-item">
                        <div className="pi-av orange">PG</div>
                        <div>
                          <div className="pi-name">Nguyễn Văn Phó GĐ</div>
                          <div className="pi-role">Phó Giám đốc · BGĐ</div>
                        </div>
                        <span className="stag s9-ptag" style={{ background: '#fef0eb', color: '#c2410c' }}>Duyệt</span>
                        <RemoveBtn onClick={() => {}} />
                      </div>
                      <div className="person-item">
                        <div className="pi-av">KH</div>
                        <div>
                          <div className="pi-name">Trần Thị Trưởng KHTH</div>
                          <div className="pi-role">Trưởng phòng · P. KHTH</div>
                        </div>
                        <span className="stag s9-ptag" style={{ background: '#fef0eb', color: '#c2410c' }}>Duyệt</span>
                        <RemoveBtn onClick={() => {}} />
                      </div>
                    </div>
                  </div>
                  <button className="add-person-btn">+ Thêm người duyệt</button>
                </div>
              )}
            </div>

            {/* Bước 2 — Ký số */}
            <div className="proc-step" style={{ borderLeft: '3px solid #1d4ed8' }}>
              <div className="proc-step-hd" onClick={() => setStep2Open(v => !v)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="proc-num" style={{ background: '#1d4ed8' }}>2</span>
                  <div>
                    <span className="proc-title">Bước 2 — Ký số</span>
                    <span className="proc-count">1 người</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="stag" style={{ fontSize: '.7rem', background: '#eff6ff', color: '#1d4ed8' }}>Yêu cầu CTS</span>
                  <ChevronIcon open={step2Open} />
                </div>
              </div>
              {step2Open && (
                <div className="proc-body">
                  <div className="form-row">
                    <div className="fg">
                      <label>Hình thức xử lý <span className="req">*</span></label>
                      <select><option value="tuan-tu">Tuần tự</option><option value="song-song">Song song</option></select>
                    </div>
                    <div className="fg">
                      <label>Hạn xử lý</label>
                      <input type="date" />
                    </div>
                  </div>
                  <div className="fg" style={{ marginBottom: 10 }}>
                    <label>Danh sách lãnh đạo ký số <span className="req">*</span></label>
                    <div className="s9-person-list">
                      <div className="person-item">
                        <div className="pi-av" style={{ background: '#c2410c' }}>GĐ</div>
                        <div>
                          <div className="pi-name">Lê Văn Giám Đốc</div>
                          <div className="pi-role">Giám đốc · BGĐ · USB Token</div>
                        </div>
                        <span className="stag s9-ptag" style={{ background: '#dcfce7', color: '#15803d' }}>✓ CTS hợp lệ</span>
                        <RemoveBtn onClick={() => {}} />
                      </div>
                    </div>
                  </div>
                  <button className="add-person-btn" style={{ borderColor: '#bfdbfe', color: '#1d4ed8' }}>+ Thêm lãnh đạo ký</button>
                </div>
              )}
            </div>

            {/* Bước 3 — Đóng dấu & Cấp số */}
            <div className="proc-step" style={{ borderLeft: '3px solid #059669' }}>
              <div className="proc-step-hd" onClick={() => setStep3Open(v => !v)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="proc-num" style={{ background: '#059669' }}>3</span>
                  <div>
                    <span className="proc-title">Bước 3 — Đóng dấu &amp; Cấp số</span>
                    <span className="proc-count">1 người</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="stag" style={{ fontSize: '.7rem', background: '#f0fdf4', color: '#15803d' }}>Sinh số hiệu</span>
                  <ChevronIcon open={step3Open} />
                </div>
              </div>
              {step3Open && (
                <div className="proc-body">
                  <div className="form-row">
                    <div className="fg">
                      <label>Hình thức xử lý <span className="req">*</span></label>
                      <select><option value="tuan-tu">Tuần tự</option><option value="song-song">Song song</option></select>
                    </div>
                    <div className="fg">
                      <label>Hạn xử lý</label>
                      <input type="date" />
                    </div>
                  </div>
                  <div className="fg" style={{ marginBottom: 10 }}>
                    <label>Cán bộ văn thư thực hiện <span className="req">*</span></label>
                    <div className="s9-person-list">
                      <div className="person-item">
                        <div className="pi-av" style={{ background: '#059669' }}>VT</div>
                        <div>
                          <div className="pi-name">Nguyễn Thị Văn Thư</div>
                          <div className="pi-role">Văn thư · Phòng HC</div>
                        </div>
                        <span className="stag s9-ptag" style={{ background: '#f0fdf4', color: '#15803d' }}>Đóng dấu</span>
                        <RemoveBtn onClick={() => {}} />
                      </div>
                    </div>
                  </div>
                  <button className="add-person-btn" style={{ borderColor: '#bbf7d0', color: '#059669' }}>+ Thêm văn thư phối hợp</button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ══ CỘT PHẢI: Tệp + Soạn thảo ══ */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg)' }}>

          {/* Tab bar */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: '#fff', flexShrink: 0 }}>
            {([
              { key: 'main' as const, label: '📄 Tệp chính' },
              { key: 'attach' as const, label: '📎 Đính kèm' },
              { key: 'draft' as const, label: '✏️ Soạn thảo' },
            ]).map(t => (
              <div key={t.key} onClick={() => setFileTab(t.key)} style={{
                flex: 1, textAlign: 'center', padding: '10px 0',
                fontSize: '.78rem', fontWeight: 600, cursor: 'pointer',
                color: fileTab === t.key ? 'var(--orange)' : 'var(--text3)',
                borderBottom: fileTab === t.key ? '2px solid var(--orange)' : '2px solid transparent',
              }}>{t.label}</div>
            ))}
          </div>

          {/* Tab: Tệp chính */}
          {fileTab === 'main' && (
            <div style={{ padding: '12px 16px', maxHeight: 260, overflowY: 'auto', flexShrink: 0, borderBottom: '1px solid var(--border)', background: '#fff' }}>
              {mainFiles.map((f, i) => (
                <FileRow
                  key={i} file={f}
                  selected={preview?.name === f.name}
                  onClick={() => setPreview(f)}
                  onRemove={() => { if (f.url) URL.revokeObjectURL(f.url); setMainFiles(p => p.filter((_, j) => j !== i)); if (preview?.name === f.name) setPreview(null) }}
                />
              ))}
              <input ref={mainFileInputRef} type="file" accept=".pdf,.doc,.docx,.xlsx,.xls,.png,.jpg,.jpeg" multiple style={{ display: 'none' }} onChange={e => addFiles(e.target.files, setMainFiles)} />
              <button onClick={() => mainFileInputRef.current?.click()} style={{ marginTop: 4, padding: '7px 14px', fontSize: '.8rem', border: '1px dashed var(--border)', borderRadius: 6, background: 'transparent', cursor: 'pointer', color: 'var(--text3)', width: '100%' }}>
                + Tải lên tệp Word/PDF
              </button>
            </div>
          )}

          {/* Tab: Đính kèm */}
          {fileTab === 'attach' && (
            <div style={{ padding: '12px 16px', maxHeight: 260, overflowY: 'auto', flexShrink: 0, borderBottom: '1px solid var(--border)', background: '#fff' }}>
              {attachFiles.map((f, i) => (
                <FileRow
                  key={i} file={f}
                  onClick={() => setPreview(f)}
                  selected={preview?.name === f.name}
                  onRemove={() => { if (f.url) URL.revokeObjectURL(f.url); setAttachFiles(p => p.filter((_, j) => j !== i)); if (preview?.name === f.name) setPreview(null) }}
                />
              ))}
              <input ref={attachFileInputRef} type="file" accept=".pdf,.doc,.docx,.xlsx,.xls,.png,.jpg,.jpeg" multiple style={{ display: 'none' }} onChange={e => addFiles(e.target.files, setAttachFiles)} />
              <div
                onClick={() => attachFileInputRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); addFiles(e.dataTransfer.files, setAttachFiles) }}
                style={{ border: '2px dashed var(--border)', borderRadius: 8, padding: '24px 16px', textAlign: 'center', color: 'var(--text3)', fontSize: '.82rem', cursor: 'pointer', background: '#fafbfc' }}>
                <div style={{ fontSize: '1.6rem', marginBottom: 6 }}>📎</div>
                <div>Kéo thả hoặc <span style={{ color: 'var(--orange)', fontWeight: 600 }}>chọn tệp</span></div>
                <div style={{ fontSize: '.72rem', marginTop: 4 }}>PDF, Word, Excel · Tối đa 20MB/tệp</div>
              </div>
            </div>
          )}

          {/* Tab: Soạn thảo */}
          {fileTab === 'draft' && (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3, padding: '7px 12px', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', flexShrink: 0, background: '#fff' }}>
                {[
                  { t: 'B', s: { fontWeight: 700 } },
                  { t: 'I', s: { fontStyle: 'italic' as const } },
                  { t: 'U', s: { textDecoration: 'underline' as const } },
                ].map(b => (
                  <button key={b.t} style={{ border: '1px solid var(--border)', background: '#f8fafc', borderRadius: 4, width: 28, height: 26, cursor: 'pointer', fontSize: '.8rem', color: 'var(--text2)', ...b.s }}>{b.t}</button>
                ))}
                <div style={{ width: 1, height: 18, background: 'var(--border)', margin: '0 3px' }} />
                {['H1', 'H2', '≡', '•', '1.'].map(t => (
                  <button key={t} style={{ border: '1px solid var(--border)', background: '#f8fafc', borderRadius: 4, padding: '0 6px', height: 26, cursor: 'pointer', fontSize: '.73rem', color: 'var(--text2)' }}>{t}</button>
                ))}
                <div style={{ width: 1, height: 18, background: 'var(--border)', margin: '0 3px' }} />
                <button style={{ border: '1px solid var(--border)', background: '#f8fafc', borderRadius: 4, padding: '0 7px', height: 26, cursor: 'pointer', fontSize: '.72rem', color: 'var(--text2)' }}>🔗</button>
                <button style={{ border: '1px solid var(--border)', background: '#f8fafc', borderRadius: 4, padding: '0 7px', height: 26, cursor: 'pointer', fontSize: '.72rem', color: 'var(--text2)' }}>📷</button>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                  <button style={{ border: '1px solid var(--border)', background: '#f8fafc', borderRadius: 4, padding: '0 8px', height: 26, cursor: 'pointer', fontSize: '.7rem', color: 'var(--text2)' }}>⬇ PDF</button>
                  <button style={{ border: '1px solid var(--border)', background: '#f8fafc', borderRadius: 4, padding: '0 8px', height: 26, cursor: 'pointer', fontSize: '.7rem', color: 'var(--text2)' }}>📝 Word</button>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 12px', background: '#f8fafc', borderBottom: '1px solid var(--border)', fontSize: '.7rem', color: 'var(--text3)', flexShrink: 0 }}>
                <span>A4 · Dọc</span><span>|</span>
                <span>Lề: 2.5 / 2 / 2 / 1.5 cm</span><span>|</span>
                <span>14pt · Times New Roman</span>
                <div style={{ marginLeft: 'auto' }}>
                  <select style={{ fontSize: '.7rem', border: 'none', background: 'transparent', color: 'var(--text3)', cursor: 'pointer' }}>
                    <option>100%</option><option>75%</option><option>125%</option>
                  </select>
                </div>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', background: '#e8eaed', padding: '16px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: 620, background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,.12)', borderRadius: 2, padding: '32px 36px', minHeight: 700 }}>
                  <div style={{ textAlign: 'center', marginBottom: 20, borderBottom: '2px solid #1a1a1a', paddingBottom: 10 }}>
                    <div style={{ fontSize: '.78rem', fontWeight: 700, color: '#1a1a1a', letterSpacing: '.5px', textTransform: 'uppercase' }}>BỆNH VIỆN ĐA KHOA TỈNH</div>
                    <div style={{ fontSize: '.7rem', color: '#555', marginTop: 3 }}>Số: <span style={{ fontStyle: 'italic' }}>........./BC-BV</span></div>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{ fontSize: '.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px' }}>BÁO CÁO</div>
                    <div style={{ fontSize: '.85rem', fontStyle: 'italic', marginTop: 4 }}>Công tác KCB quý I/2026</div>
                    <div style={{ fontSize: '.75rem', color: '#777', marginTop: 4 }}>Kính gửi: Sở Y tế TP.HCM</div>
                  </div>
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    style={{ outline: 'none', fontSize: '.84rem', lineHeight: 1.85, color: '#1a1a1a', minHeight: 380 }}
                  >
                    <p style={{ marginBottom: 10 }}>Thực hiện Kế hoạch số 45/KH-SYT ngày 15/01/2026 của Sở Y tế TP.HCM về việc báo cáo tình hình thực hiện kế hoạch khám chữa bệnh, Bệnh viện Đa khoa Tỉnh xin báo cáo như sau:</p>
                    <p style={{ fontWeight: 700, marginBottom: 8 }}>I. KẾT QUẢ THỰC HIỆN</p>
                    <p style={{ marginBottom: 10 }}>1. Tổng số lượt khám bệnh: <strong>47.235 lượt</strong>, đạt 98,4% kế hoạch quý.</p>
                    <p style={{ marginBottom: 10 }}>2. Tổng số lượt điều trị nội trú: <strong>8.642 lượt</strong>, đạt 102,1% kế hoạch.</p>
                    <p style={{ marginBottom: 10 }}>3. Doanh thu dịch vụ y tế: <strong>12,4 tỷ đồng</strong>, đạt 95,2% kế hoạch.</p>
                    <p style={{ fontWeight: 700, marginBottom: 8, marginTop: 16 }}>II. TỒN TẠI, HẠN CHẾ</p>
                    <p style={{ marginBottom: 10, color: '#555', fontStyle: 'italic' }}>[ Tiếp tục soạn thảo nội dung... ]</p>
                  </div>
                  <div style={{ marginTop: 32, display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ textAlign: 'center', minWidth: 180 }}>
                      <div style={{ fontSize: '.75rem', fontStyle: 'italic', color: '#555' }}>TP.HCM, ngày ... tháng ... năm 2026</div>
                      <div style={{ fontSize: '.78rem', fontWeight: 700, marginTop: 4 }}>GIÁM ĐỐC</div>
                      <div style={{ height: 48 }} />
                      <div style={{ fontSize: '.8rem', fontWeight: 700, borderTop: '1px solid #ccc', paddingTop: 6 }}>Lê Văn Giám Đốc</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preview (khi không ở tab soạn thảo) */}
          {fileTab !== 'draft' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f1f3f7', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: '#2d3142', color: '#fff', fontSize: '.75rem', flexShrink: 0 }}>
                <span style={{ flex: 1, opacity: .9 }}>{preview ? `📄 ${preview.name}` : 'Chọn file để xem trước'}</span>
                {preview && (
                  <>
                    <button style={{ background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', borderRadius: 4, padding: '3px 8px', cursor: 'pointer', fontSize: '.7rem' }}>🔍−</button>
                    <span style={{ fontSize: '.7rem', opacity: .7 }}>100%</span>
                    <button style={{ background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', borderRadius: 4, padding: '3px 8px', cursor: 'pointer', fontSize: '.7rem' }}>🔍+</button>
                    <button style={{ background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', borderRadius: 4, padding: '3px 8px', cursor: 'pointer', fontSize: '.7rem' }}>⬇</button>
                  </>
                )}
              </div>
              {preview?.url && preview.ext === 'pdf' ? (
                <iframe
                  src={preview.url}
                  title={preview.name}
                  style={{ flex: 1, width: '100%', border: 'none', display: 'block' }}
                />
              ) : preview?.url && ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(preview.ext) ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, overflow: 'auto' }}>
                  <img src={preview.url} alt={preview.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,.1)' }} />
                </div>
              ) : preview ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, overflow: 'auto' }}>
                  <div style={{ width: '100%', maxWidth: 540, background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,.1)', borderRadius: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, gap: 10 }}>
                    <div style={{ fontSize: '2.5rem' }}>{preview.ext === 'xlsx' || preview.ext === 'xls' ? '📊' : preview.ext === 'docx' || preview.ext === 'doc' ? '📝' : '📄'}</div>
                    <div style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--dark)', textAlign: 'center' }}>{preview.name}</div>
                    <div style={{ fontSize: '.75rem', color: 'var(--text3)' }}>{preview.ext.toUpperCase()} · {preview.size}</div>
                    {preview.url && <div style={{ fontSize: '.75rem', color: 'var(--text3)', textAlign: 'center' }}>Không thể xem trực tiếp tệp {preview.ext.toUpperCase()} trên trình duyệt.</div>}
                  </div>
                </div>
              ) : (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8, color: 'var(--text3)', fontSize: '.82rem' }}>
                  <div style={{ fontSize: '2rem' }}>📂</div>
                  <div>Chọn file để xem trước</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal xác nhận hủy */}
      {showConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,20,40,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500 }}>
          <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', boxShadow: '0 16px 48px rgba(0,0,0,.2)', maxWidth: 400, textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>⚠️</div>
            <div style={{ fontSize: '.95rem', fontWeight: 700, color: 'var(--dark)', marginBottom: 8 }}>Dữ liệu chưa được lưu</div>
            <div style={{ fontSize: '.82rem', color: 'var(--text3)', marginBottom: 20 }}>Bạn có chắc chắn muốn hủy? Nội dung đã soạn sẽ không được lưu.</div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button className="btn btn-ghost" onClick={() => setShowConfirm(false)}>Tiếp tục soạn</button>
              <button className="btn btn-primary" style={{ background: '#dc2626', borderColor: '#dc2626' }} onClick={() => goScreen('s8')}>Hủy bỏ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
