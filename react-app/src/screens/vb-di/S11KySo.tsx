import { useState, useRef } from 'react'
import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'
import MoreMenu from '@/components/MoreMenu'

// ─── Static data ──────────────────────────────────────────────────────────────
interface FileItem { name: string; size: string; type: 'main' | 'attach' }

const FILES: FileItem[] = [
  { name: 'BaoCao_KCB_Q1_2026.docx', size: '2.4 MB', type: 'main' },
  { name: 'Phu_luc_so_lieu.xlsx',    size: '420 KB', type: 'attach' },
]

const APPROVERS = [
  { name: 'Nguyễn Văn Phó GĐ', role: 'Phó Giám đốc · BGĐ', av: 'PG', time: '26/03 14:20' },
  { name: 'Trần Thị Trưởng KHTH', role: 'Trưởng phòng KHTH', av: 'KH', time: '26/03 15:45' },
]

const SIG_POSITIONS = ['Góc dưới-phải', 'Góc dưới-trái', 'Tùy chỉnh'] as const
type SigPos = typeof SIG_POSITIONS[number]

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function S11KySo() {
  const { goScreen, screenParams } = useNavigation()
  const readOnly = !!screenParams.readOnly

  const [tab,          setTab]          = useState<'info' | 'approved'>('info')
  const mainFiles   = FILES.filter(f => f.type === 'main')
  const attachFiles = FILES.filter(f => f.type === 'attach')
  const [selectedFile, setSelectedFile] = useState<FileItem>(FILES[0])
  const [sigPos,       setSigPos]       = useState<SigPos>('Góc dưới-phải')
  const [ghiChu,       setGhiChu]       = useState('')

  // Draggable signature position (% of doc container)
  const [sigXY, setSigXY] = useState({ x: 62, y: 78 })
  const dragRef = useRef<{ startX: number; startY: number; ox: number; oy: number } | null>(null)
  const docRef  = useRef<HTMLDivElement>(null)

  const onSigMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    dragRef.current = { startX: e.clientX, startY: e.clientY, ox: sigXY.x, oy: sigXY.y }
    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current || !docRef.current) return
      const rect = docRef.current.getBoundingClientRect()
      const dx = ((ev.clientX - dragRef.current.startX) / rect.width)  * 100
      const dy = ((ev.clientY - dragRef.current.startY) / rect.height) * 100
      setSigXY({
        x: Math.min(85, Math.max(0, dragRef.current.ox + dx)),
        y: Math.min(92, Math.max(0, dragRef.current.oy + dy)),
      })
    }
    const onUp = () => { dragRef.current = null; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  return (
    <div className="cw" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Topbar
        breadcrumb={['Văn bản Đi', 'Báo cáo KCB Q1/2026', readOnly ? 'Chi tiết' : 'Ký số']}
        onNavClick={i => { if (i === 0) goScreen('s8') }}
      />

      {/* ── Toolbar ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: '1px solid var(--border)', background: 'var(--surface)', flexShrink: 0, flexWrap: 'wrap' }}>
        {readOnly
          ? <span className="stag" style={{ background: '#dcfce7', color: '#15803d' }}>✓ Đã ban hành</span>
          : <>
              <span className="stag" style={{ background: '#eff6ff', color: '#1d4ed8' }}>Chờ ký số</span>
              <span style={{ fontSize: '.78rem', color: '#b91c1c', fontWeight: 600 }}>⚠️ Hạn: 28/03/2026</span>
            </>
        }
        <div style={{ flex: 1 }} />
        {readOnly ? (
          <button className="dp-btn" style={{ background: '#15803d', color: '#fff', borderColor: '#15803d' }}>🗂 Thêm vào hồ sơ</button>
        ) : (
          <>
            <button className="dp-btn" style={{ background: '#1d4ed8', color: '#fff', borderColor: '#1d4ed8' }} onClick={() => goScreen('s12')}>🔐 Ký số ngay</button>
            <button className="dp-btn" onClick={() => goScreen('s10')}>← Trả lại duyệt</button>
          </>
        )}
        <MoreMenu
          items={[
            { key: 'lich-su', label: 'Lịch sử văn bản', icon: '📋' },
            ...(!readOnly ? [{ key: 'thu-hoi', label: 'Thu hồi', icon: '↩', danger: true as const, divider: true as const }] : []),
          ]}
          onAction={() => {}}
        />
        <button className="dp-btn" onClick={() => goScreen('s8')}>✕</button>
      </div>

      {/* ── Split body ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ═══ CỘT TRÁI ═══ */}
        <div style={{
          width: 650, minWidth: 650, maxWidth: 650,
          borderRight: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden', background: '#fff',
        }}>
          {/* Title header */}
          <div style={{ padding: '14px 18px 12px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--dark)', lineHeight: 1.4, marginBottom: 6 }}>
              Báo cáo công tác KCB quý I/2026
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span className="chip">Báo cáo</span>
              <span className="chip s">Đã duyệt</span>
              <span className="chip">BGĐ</span>
            </div>
          </div>

          {/* Tab bar */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg)', flexShrink: 0 }}>
            {([
              { key: 'info'     as const, label: '📋 Thông tin' },
              { key: 'approved' as const, label: '✓ Đã duyệt bởi' },
            ]).map(t => (
              <div key={t.key} onClick={() => setTab(t.key)} style={{
                flex: 1, textAlign: 'center', padding: '9px 0',
                fontSize: '.78rem', fontWeight: 600, cursor: 'pointer',
                color: tab === t.key ? 'var(--orange)' : 'var(--text3)',
                borderBottom: tab === t.key ? '2px solid var(--orange)' : '2px solid transparent',
              }}>{t.label}</div>
            ))}
          </div>

          {/* Scrollable area: tabs + always-visible ký số card */}
          <div style={{ overflowY: 'auto', flex: 1 }}>

            {/* Tab: Thông tin */}
            {tab === 'info' && (
              <div style={{ padding: '14px 18px' }}>
                <div className="info-section">
                  <div className="is-title">Thông tin văn bản</div>
                  {([
                    ['Loại VB',    'Báo cáo'],
                    ['Ngày soạn',  '27/03/2026'],
                    ['Người soạn', 'Nguyễn Văn A · P. KHTH'],
                    ['Trích yếu',  'V/v báo cáo KCB Q1/2026'],
                  ] as [string, string][]).map(([l, v]) => (
                    <div key={l} className="info-row">
                      <div className="ir-l">{l}</div>
                      <div className="ir-v">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Đã duyệt bởi */}
            {tab === 'approved' && (
              <div style={{ padding: '14px 18px' }}>
                <div style={{ fontSize: '.7rem', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: 12 }}>
                  Danh sách đã duyệt
                </div>
                {APPROVERS.map((a, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#16a34a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.6rem', fontWeight: 700 }}>✓</div>
                      {i < APPROVERS.length - 1 && (
                        <div style={{ width: 1, flex: 1, background: '#86efac', marginTop: 4, minHeight: 16 }} />
                      )}
                    </div>
                    <div style={{ flex: 1, paddingBottom: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                        <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.62rem', fontWeight: 700, color: '#15803d', flexShrink: 0 }}>{a.av}</div>
                        <div style={{ fontSize: '.78rem', fontWeight: 600, color: 'var(--dark)' }}>{a.name}</div>
                        <span style={{ marginLeft: 'auto', fontSize: '.68rem', color: '#16a34a', fontWeight: 600 }}>✓ {a.time}</span>
                      </div>
                      <div style={{ fontSize: '.72rem', color: 'var(--text3)', paddingLeft: 30 }}>{a.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Ký số setup card — chỉ hiện khi chưa ban hành ── */}
            {!readOnly &&
            <div style={{ margin: '0 18px 18px', border: '1px solid #bfdbfe', borderRadius: 10, overflow: 'hidden' }}>
              <div className="fc-title" style={{ background: '#eff6ff', borderBottom: '1px solid #bfdbfe', margin: 0, padding: '10px 14px' }}>
                <span style={{ color: '#1d4ed8' }}>🔑</span> Thiết lập ký số
              </div>
              <div style={{ padding: '14px' }}>
                {/* Token + cert side by side */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                  <div style={{ flex: 1, border: '1px solid #bfdbfe', borderRadius: 8, padding: '10px 12px', background: '#f8fbff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                      <span style={{ fontSize: '1.1rem' }}>🔑</span>
                      <span style={{ fontSize: '.78rem', fontWeight: 700, color: '#1e40af' }}>USB Token</span>
                      <span style={{ marginLeft: 'auto', fontSize: '.65rem', background: '#dcfce7', color: '#15803d', borderRadius: 20, padding: '2px 7px', fontWeight: 600 }}>● Đã kết nối</span>
                    </div>
                    <div style={{ fontSize: '.72rem', color: '#374151' }}>
                      <div>Thiết bị: <strong>SafeNet eToken 5110</strong></div>
                      <div style={{ marginTop: 2 }}>Chủ: <strong>Lê Văn Giám Đốc</strong></div>
                    </div>
                  </div>
                  <div style={{ flex: 1, border: '1px solid #bfdbfe', borderRadius: 8, padding: '10px 12px', background: '#f8fbff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                      <span style={{ fontSize: '1.1rem' }}>🎖</span>
                      <span style={{ fontSize: '.78rem', fontWeight: 700, color: '#1e40af' }}>Chứng thư số</span>
                      <span style={{ marginLeft: 'auto', fontSize: '.65rem', background: '#dcfce7', color: '#15803d', borderRadius: 20, padding: '2px 7px', fontWeight: 600 }}>✓ Hợp lệ</span>
                    </div>
                    <div style={{ fontSize: '.72rem', color: '#374151' }}>
                      <div>Tổ chức CA: <strong>VNPT-CA</strong></div>
                      <div style={{ marginTop: 2 }}>Hiệu lực: <strong>đến 15/06/2027</strong></div>
                    </div>
                  </div>
                </div>

                {/* Vị trí chữ ký */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: '.72rem', color: '#374151', fontWeight: 600, marginBottom: 6 }}>Vị trí chữ ký</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {SIG_POSITIONS.map(pos => (
                      <div key={pos} onClick={() => setSigPos(pos)} style={{
                        flex: 1, textAlign: 'center', padding: '6px 4px', borderRadius: 6, cursor: 'pointer', fontSize: '.7rem', fontWeight: 600,
                        border: sigPos === pos ? '1.5px solid #1d4ed8' : '1px solid var(--border)',
                        background: sigPos === pos ? '#eff6ff' : '#f8fafc',
                        color: sigPos === pos ? '#1d4ed8' : 'var(--text3)',
                      }}>{pos}</div>
                    ))}
                  </div>
                </div>

                {/* Ghi chú phát hành */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: '.72rem', color: '#374151', fontWeight: 600, marginBottom: 6 }}>Ghi chú phát hành</div>
                  <textarea
                    value={ghiChu}
                    onChange={e => setGhiChu(e.target.value)}
                    placeholder="VD: Gửi Cty Thiết bị Y tế ABC..."
                    style={{ width: '100%', boxSizing: 'border-box', minHeight: 60, resize: 'none', fontSize: '.82rem', borderRadius: 6, border: '1px solid var(--border)', padding: '8px 10px' }}
                  />
                </div>

                {/* Big sign button */}
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', fontSize: '.9rem', padding: '11px 0', fontWeight: 700 }}
                  onClick={() => goScreen('s12')}
                >
                  🔐 Ký số văn bản này
                </button>
              </div>
            </div>
            }
          </div>

          {/* ── File sections ── */}
          <div style={{ flexShrink: 0, borderTop: '1px solid var(--border)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', background: '#f9fafb', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.5px' }}>📄 Tệp chính</span>
                <span style={{ background: '#e5e7eb', color: '#6b7280', fontSize: '.65rem', fontWeight: 700, borderRadius: 99, padding: '1px 6px' }}>{mainFiles.length}</span>
              </div>
              <div style={{ padding: '6px 12px' }}>
                {mainFiles.map(f => {
                  const active = selectedFile.name === f.name
                  return (
                    <div key={f.name} onClick={() => setSelectedFile(f)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, cursor: 'pointer', marginBottom: 4, border: `1px solid ${active ? 'var(--orange)' : 'var(--border)'}`, background: active ? '#fff7ed' : '#fff' }}>
                      <span style={{ fontSize: '1.1rem' }}>📄</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--dark)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                        <div style={{ fontSize: '.7rem', color: 'var(--text3)' }}>{f.size}</div>
                      </div>
                      <button onClick={e => e.stopPropagation()} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text3)', fontSize: '.8rem' }}>⬇</button>
                    </div>
                  )
                })}
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', background: '#f9fafb', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.5px' }}>📎 Tệp đính kèm</span>
                <span style={{ background: '#e5e7eb', color: '#6b7280', fontSize: '.65rem', fontWeight: 700, borderRadius: 99, padding: '1px 6px' }}>{attachFiles.length}</span>
              </div>
              <div style={{ padding: '6px 12px' }}>
                {attachFiles.map(f => {
                  const active = selectedFile.name === f.name
                  return (
                    <div key={f.name} onClick={() => setSelectedFile(f)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, cursor: 'pointer', marginBottom: 4, border: `1px solid ${active ? 'var(--orange)' : 'var(--border)'}`, background: active ? '#fff7ed' : '#fff' }}>
                      <span style={{ fontSize: '1.1rem' }}>{f.name.endsWith('.xlsx') ? '📊' : '📄'}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--dark)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                        <div style={{ fontSize: '.7rem', color: 'var(--text3)' }}>{f.size}</div>
                      </div>
                      <button onClick={e => e.stopPropagation()} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text3)', fontSize: '.8rem' }}>⬇</button>
                    </div>
                  )
                })}
                {attachFiles.length === 0 && <div style={{ textAlign: 'center', color: 'var(--text3)', fontSize: '.8rem', padding: '10px 0' }}>Không có tệp đính kèm</div>}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ CỘT PHẢI ═══ */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* PDF preview */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f1f3f7', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: '#2d3142', color: '#fff', fontSize: '.75rem', flexShrink: 0 }}>
              <span style={{ flex: 1, opacity: .9 }}>📄 {selectedFile.name}</span>
              <span style={{ background: '#1d4ed8', padding: '2px 8px', borderRadius: 4, fontSize: '.68rem', fontWeight: 600 }}>Chờ ký số</span>
              <button style={{ background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', borderRadius: 4, padding: '3px 8px', cursor: 'pointer', fontSize: '.7rem' }}>🔍−</button>
              <span style={{ fontSize: '.7rem', opacity: .7 }}>100%</span>
              <button style={{ background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', borderRadius: 4, padding: '3px 8px', cursor: 'pointer', fontSize: '.7rem' }}>🔍+</button>
              <button style={{ background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', fontSize: '.7rem' }}>⬇ Tải về</button>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 20, overflowY: 'auto' }}>
              <div
                ref={docRef}
                style={{ width: '100%', maxWidth: 540, background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,.12)', borderRadius: 4, minHeight: 560, padding: '32px 36px', position: 'relative', userSelect: 'none' }}
              >
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: '.65rem', color: '#555', fontWeight: 600, textTransform: 'uppercase', letterSpacing: .5 }}>BỆNH VIỆN ĐA KHOA TỈNH</div>
                  <div style={{ fontSize: '.68rem', color: '#777', marginTop: 3 }}>Số: <em>Tự động cấp khi ban hành</em></div>
                </div>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <div style={{ fontSize: '.8rem', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase' }}>BÁO CÁO CÔNG TÁC KCB QUÝ I/2026</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {[80, 95, 70, 88, 60, 75, 90, 50, 85, 65, 78, 55, 92, 48, 72].map((w, i) => (
                    <div key={i} style={{ height: 7, background: '#f1f5f9', borderRadius: 3, width: `${w}%` }} />
                  ))}
                </div>
                <div style={{ marginTop: 28, height: 80 }} /> {/* spacer for drag area */}

                {/* ── Draggable signature box ── */}
                <div
                  onMouseDown={onSigMouseDown}
                  style={{
                    position: 'absolute',
                    left: `${sigXY.x}%`, top: `${sigXY.y}%`,
                    transform: 'translate(-50%, -50%)',
                    width: 120, cursor: 'grab',
                    border: '1.5px dashed #3b82f6', borderRadius: 5,
                    background: 'rgba(239,246,255,.92)',
                    boxShadow: '0 2px 8px rgba(59,130,246,.2)',
                    padding: '6px 8px', textAlign: 'center',
                  }}
                  title="Kéo để thay đổi vị trí chữ ký"
                >
                  <div style={{ fontSize: '.68rem', color: '#1d4ed8', fontWeight: 700, lineHeight: 1.4 }}>
                    <div style={{ fontSize: '.85rem' }}>✍</div>
                    <div>Lê Văn Giám Đốc</div>
                    <div style={{ fontSize: '.6rem', color: '#6b7280', fontWeight: 400 }}>27/03/2026 · VNPT-CA</div>
                  </div>
                  <div style={{ position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%)', background: '#3b82f6', color: '#fff', fontSize: '.55rem', borderRadius: 3, padding: '1px 5px', whiteSpace: 'nowrap', fontWeight: 600 }}>
                    ✥ Kéo để di chuyển
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
