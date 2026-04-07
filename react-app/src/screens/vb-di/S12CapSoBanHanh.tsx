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

const HISTORY = [
  { label: 'Soạn thảo',                desc: 'Nguyễn Văn A · P. KHTH',          time: '27/03 08:00', done: true },
  { label: 'Duyệt song song (2/2)',     desc: 'Phó GĐ + Trưởng KHTH đồng ý',     time: '27/03 10:30', done: true },
  { label: 'Ký số',                    desc: 'Lê Văn Giám Đốc ✓',               time: '27/03 11:45', done: true },
  { label: 'Chờ ban hành',             desc: 'Đang chờ Văn thư cấp số',          time: '',            done: false },
]

const STAMP_POS = ['Chữ ký phải · Dấu trái', 'Phủ chữ ký'] as const
type StampPos = typeof STAMP_POS[number]

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function S12CapSoBanHanh() {
  const { goScreen } = useNavigation()

  const [tab,          setTab]          = useState<'info' | 'history'>('info')
  const [selectedFile, setSelectedFile] = useState<FileItem>(FILES[0])
  const mainFiles   = FILES.filter(f => f.type === 'main')
  const attachFiles = FILES.filter(f => f.type === 'attach')
  const [stampPos,     setStampPos]     = useState<StampPos>('Chữ ký phải · Dấu trái')
  const [ghiChu,       setGhiChu]       = useState('')

  // Draggable stamp + so hieu positions (% of doc container)
  const [stampXY,  setStampXY]  = useState({ x: 20, y: 82 })
  const [soHieuXY, setSoHieuXY] = useState({ x: 50, y: 12 })
  const docRef = useRef<HTMLDivElement>(null)

  const makeDrag = (
    current: { x: number; y: number },
    setter: (v: { x: number; y: number }) => void,
  ) => (e: React.MouseEvent) => {
    e.preventDefault()
    const start = { mx: e.clientX, my: e.clientY, ox: current.x, oy: current.y }
    const onMove = (ev: MouseEvent) => {
      if (!docRef.current) return
      const rect = docRef.current.getBoundingClientRect()
      const dx = ((ev.clientX - start.mx) / rect.width)  * 100
      const dy = ((ev.clientY - start.my) / rect.height) * 100
      setter({ x: Math.min(88, Math.max(0, start.ox + dx)), y: Math.min(93, Math.max(0, start.oy + dy)) })
    }
    const onUp = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const visibleFiles = FILES.filter(f => f.type === fileType)

  return (
    <div className="cw" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Topbar
        breadcrumb={['Văn bản Đi', 'Báo cáo KCB Q1/2026', 'Cấp số & Ban hành']}
        onNavClick={i => { if (i === 0) goScreen('s8') }}
      />

      {/* ── Toolbar ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: '1px solid var(--border)', background: 'var(--surface)', flexShrink: 0, flexWrap: 'wrap' }}>
        <span className="stag" style={{ background: '#f0fdf4', color: '#15803d' }}>Chờ cấp số &amp; ban hành</span>
        <div style={{ flex: 1 }} />
        <button className="dp-btn" style={{ background: '#1a7a45', color: '#fff', borderColor: '#1a7a45' }} onClick={() => goScreen('s13')}>✓ Cấp số &amp; Ban hành</button>
        <button className="dp-btn" onClick={() => goScreen('s11')}>← Quay lại</button>
        <MoreMenu
          items={[
            { key: 'lich-su', label: 'Lịch sử xử lý',  icon: '📋' },
            { key: 'xem-ct',  label: 'Xem chi tiết',    icon: '👁', divider: true },
            { key: 'thu-hoi', label: 'Thu hồi',         icon: '↩', danger: true, divider: true },
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
              <span className="chip s">Đã ký số</span>
              <span className="chip">BGĐ</span>
            </div>
          </div>

          {/* Tab bar */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg)', flexShrink: 0 }}>
            {([
              { key: 'info'    as const, label: '📋 Thông tin' },
              { key: 'history' as const, label: '🔐 Lịch sử xử lý' },
            ]).map(t => (
              <div key={t.key} onClick={() => setTab(t.key)} style={{
                flex: 1, textAlign: 'center', padding: '9px 0',
                fontSize: '.78rem', fontWeight: 600, cursor: 'pointer',
                color: tab === t.key ? 'var(--orange)' : 'var(--text3)',
                borderBottom: tab === t.key ? '2px solid var(--orange)' : '2px solid transparent',
              }}>{t.label}</div>
            ))}
          </div>

          {/* Scrollable area: tabs + always-visible form card */}
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
                    ['Người ký',   'Lê Văn Giám Đốc'],
                  ] as [string, string][]).map(([l, v]) => (
                    <div key={l} className="info-row">
                      <div className="ir-l">{l}</div>
                      <div className="ir-v">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Lịch sử xử lý */}
            {tab === 'history' && (
              <div style={{ padding: '14px 18px' }}>
                <div style={{ fontSize: '.7rem', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: 12 }}>
                  Lịch sử xử lý
                </div>
                {HISTORY.map((h, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: h.done ? '#16a34a' : '#f1f5f9',
                        color: h.done ? '#fff' : '#94a3b8',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '.6rem', fontWeight: 700,
                        border: h.done ? 'none' : '2px solid #cbd5e1',
                      }}>
                        {h.done ? '✓' : '…'}
                      </div>
                      {i < HISTORY.length - 1 && (
                        <div style={{ width: 1, flex: 1, background: h.done ? '#86efac' : '#e2e8f0', marginTop: 4, minHeight: 16 }} />
                      )}
                    </div>
                    <div style={{ flex: 1, paddingBottom: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                        <div style={{ fontSize: '.78rem', fontWeight: 700, color: h.done ? 'var(--dark)' : 'var(--text3)' }}>{h.label}</div>
                        {h.time && <span style={{ marginLeft: 'auto', fontSize: '.68rem', color: 'var(--text3)' }}>{h.time}</span>}
                      </div>
                      <div style={{ fontSize: '.72rem', color: 'var(--text3)' }}>{h.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Card 1: Cấp số văn bản — ALWAYS visible ── */}
            <div style={{ margin: '0 18px 14px', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
              <div className="fc-title" style={{ margin: 0, padding: '10px 14px', borderBottom: '1px solid var(--border)', background: '#f8fafc' }}>
                Cấp số văn bản đi
              </div>
              <div style={{ padding: '14px' }}>
                <div className="form-row">
                  <div className="fg">
                    <label>Số đi (tự động)</label>
                    <input className="auto" defaultValue="#48" readOnly />
                    <div className="hint">Theo sổ VB Đi 2026</div>
                  </div>
                  <div className="fg">
                    <label>Ngày ban hành</label>
                    <input className="auto" defaultValue="31/03/2026" readOnly />
                  </div>
                </div>
                <div className="form-row">
                  <div className="fg">
                    <label>Ký hiệu VB <span className="req">*</span></label>
                    <input defaultValue="48/BC-BVĐK" />
                  </div>
                  <div className="fg">
                    <label>Sổ đi</label>
                    <select><option>Sổ VB Đi 2026 (hiện tại: 47)</option></select>
                  </div>
                </div>
                <div className="form-row full">
                  <div className="fg">
                    <label>Đơn vị / người nhận</label>
                    <input placeholder="VD: Các phòng ban, BHXH TP.HCM..." />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Card 2: Đóng dấu & Phát hành — ALWAYS visible ── */}
            <div style={{ margin: '0 18px 18px', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
              <div className="fc-title" style={{ margin: 0, padding: '10px 14px', borderBottom: '1px solid var(--border)', background: '#f8fafc' }}>
                Đóng dấu &amp; Phát hành
              </div>
              <div style={{ padding: '14px' }}>
                {/* Digital signed notice */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#edfbf4', border: '1px solid #a7f3d0', borderRadius: 8, marginBottom: 14 }}>
                  <span style={{ fontSize: '1.1rem' }}>✅</span>
                  <div style={{ fontSize: '.82rem', color: '#065f46' }}>Văn bản đã được ký số điện tử — Không cần đóng dấu vật lý</div>
                </div>

                {/* Con dấu selection mock */}
                <div style={{ border: '1px solid #bbf7d0', borderRadius: 8, padding: '12px', background: '#f0fdf4', marginBottom: 14 }}>
                  <div style={{ fontSize: '.72rem', fontWeight: 700, color: '#15803d', marginBottom: 8 }}>Con dấu</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 52, height: 52, borderRadius: '50%', border: '2.5px solid #dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', flexShrink: 0 }}>
                      <div style={{ textAlign: 'center', fontSize: '.42rem', color: '#dc2626', fontWeight: 700, lineHeight: 1.2, padding: '2px' }}>
                        <div>BVĐK</div>
                        <div style={{ fontSize: '.55rem' }}>★</div>
                        <div>TỈNH</div>
                      </div>
                    </div>
                    <div style={{ flex: 1, fontSize: '.72rem', color: '#374151' }}>
                      <div style={{ fontWeight: 600 }}>Bệnh viện Đa khoa Tỉnh</div>
                      <div style={{ color: '#6b7280', marginTop: 2 }}>Phòng Hành chính</div>
                      <div style={{ marginTop: 4, background: '#dcfce7', color: '#15803d', borderRadius: 20, padding: '1px 8px', display: 'inline-block', fontSize: '.63rem', fontWeight: 600 }}>● Đang dùng</div>
                    </div>
                  </div>
                </div>

                {/* Vị trí đóng dấu */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: '.72rem', color: '#374151', fontWeight: 600, marginBottom: 6 }}>Vị trí đóng dấu</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {STAMP_POS.map(pos => (
                      <div key={pos} onClick={() => setStampPos(pos)} style={{
                        flex: 1, textAlign: 'center', padding: '6px 4px', borderRadius: 6, cursor: 'pointer', fontSize: '.7rem', fontWeight: 600,
                        border: stampPos === pos ? '1.5px solid #059669' : '1px solid var(--border)',
                        background: stampPos === pos ? '#f0fdf4' : '#f8fafc',
                        color: stampPos === pos ? '#059669' : 'var(--text3)',
                      }}>{pos}</div>
                    ))}
                  </div>
                </div>

                {/* Ghi chú phát hành */}
                <div className="form-row full">
                  <div className="fg">
                    <label>Ghi chú phát hành</label>
                    <textarea
                      value={ghiChu}
                      onChange={e => setGhiChu(e.target.value)}
                      placeholder="Hướng dẫn gửi văn bản..."
                      style={{ minHeight: 60, resize: 'none' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ CỘT PHẢI ═══ */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* File tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: '#fff', flexShrink: 0 }}>
            {([
              { key: 'main'   as const, label: '📄 Tệp chính' },
              { key: 'attach' as const, label: '📎 Đính kèm' },
            ]).map(t => (
              <div key={t.key} onClick={() => setFileType(t.key)} style={{
                flex: 1, textAlign: 'center', padding: '10px 0',
                fontSize: '.78rem', fontWeight: 600, cursor: 'pointer',
                color: fileType === t.key ? '#059669' : 'var(--text3)',
                borderBottom: fileType === t.key ? '2px solid #059669' : '2px solid transparent',
              }}>{t.label}</div>
            ))}
          </div>

          {/* File list */}
          <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', flexShrink: 0, background: '#fff', maxHeight: 200, overflowY: 'auto' }}>
            {visibleFiles.map(f => {
              const active = selectedFile.name === f.name
              return (
                <div key={f.name} onClick={() => setSelectedFile(f)} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
                  borderRadius: 8, cursor: 'pointer', marginBottom: 6,
                  border: `1px solid ${active ? '#059669' : 'var(--border)'}`,
                  background: active ? '#f0fdf4' : '#fafbfc',
                }}>
                  <span style={{ fontSize: '1.1rem' }}>{f.name.endsWith('.xlsx') ? '📊' : '📄'}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--dark)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                    <div style={{ fontSize: '.7rem', color: 'var(--text3)' }}>{f.size}</div>
                  </div>
                  <button onClick={e => e.stopPropagation()} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text3)', fontSize: '.8rem' }}>⬇</button>
                </div>
              )
            })}
          </div>

          {/* PDF preview */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f1f3f7', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: '#2d3142', color: '#fff', fontSize: '.75rem', flexShrink: 0 }}>
              <span style={{ flex: 1, opacity: .9 }}>📄 {selectedFile.name}</span>
              <span style={{ background: '#059669', padding: '2px 8px', borderRadius: 4, fontSize: '.68rem', fontWeight: 600 }}>Chờ đóng dấu</span>
              <button style={{ background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', borderRadius: 4, padding: '3px 8px', cursor: 'pointer', fontSize: '.7rem' }}>🔍−</button>
              <span style={{ fontSize: '.7rem', opacity: .7 }}>100%</span>
              <button style={{ background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', borderRadius: 4, padding: '3px 8px', cursor: 'pointer', fontSize: '.7rem' }}>🔍+</button>
              <button style={{ background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', fontSize: '.7rem' }}>⬇ Tải về</button>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 20, overflowY: 'auto' }}>
              <div
                ref={docRef}
                style={{ width: '100%', maxWidth: 540, background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,.12)', borderRadius: 4, minHeight: 580, padding: '32px 36px', position: 'relative', userSelect: 'none' }}
              >
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: '.65rem', color: '#555', fontWeight: 600, textTransform: 'uppercase', letterSpacing: .5 }}>BỆNH VIỆN ĐA KHOA TỈNH</div>
                </div>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <div style={{ fontSize: '.8rem', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase' }}>BÁO CÁO CÔNG TÁC KCB QUÝ I/2026</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {[80, 95, 70, 88, 60, 75, 90, 50, 85, 65, 78, 55, 92, 48, 72].map((w, i) => (
                    <div key={i} style={{ height: 7, background: '#f1f5f9', borderRadius: 3, width: `${w}%` }} />
                  ))}
                </div>
                <div style={{ marginTop: 28, display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ textAlign: 'center', minWidth: 160 }}>
                    <div style={{ fontSize: '.7rem', color: '#555', fontStyle: 'italic' }}>TP.HCM, 31/03/2026</div>
                    <div style={{ fontSize: '.75rem', fontWeight: 700, marginTop: 4 }}>GIÁM ĐỐC</div>
                    <div style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ fontFamily: 'cursive', fontSize: '.7rem', color: '#1d4ed8', textAlign: 'center', lineHeight: 1.3 }}>
                        <div style={{ fontSize: '.9rem' }}>Lê Văn GĐ</div>
                        <div style={{ fontSize: '.6rem', color: '#6b7280' }}>27/03/2026</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '.78rem', fontWeight: 700, borderTop: '1px solid #ccc', paddingTop: 6 }}>Lê Văn Giám Đốc</div>
                  </div>
                </div>
                <div style={{ height: 40 }} />

                {/* ── Draggable: Số hiệu văn bản ── */}
                <div
                  onMouseDown={makeDrag(soHieuXY, setSoHieuXY)}
                  style={{
                    position: 'absolute', left: `${soHieuXY.x}%`, top: `${soHieuXY.y}%`,
                    transform: 'translate(-50%, -50%)', cursor: 'grab',
                    border: '1.5px dashed #059669', borderRadius: 4,
                    background: 'rgba(240,253,244,.95)', padding: '4px 10px',
                    boxShadow: '0 2px 8px rgba(5,150,105,.15)', whiteSpace: 'nowrap',
                  }}
                  title="Kéo để đặt vị trí số hiệu"
                >
                  <div style={{ fontSize: '.72rem', color: '#059669', fontWeight: 700 }}>Số: 48/BC-BVĐK</div>
                  <div style={{ fontSize: '.6rem', color: '#6b7280' }}>Ngày: 31/03/2026</div>
                  <div style={{ position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%)', background: '#059669', color: '#fff', fontSize: '.55rem', borderRadius: 3, padding: '1px 5px', fontWeight: 600 }}>
                    ✥ Số hiệu
                  </div>
                </div>

                {/* ── Draggable: Con dấu ── */}
                <div
                  onMouseDown={makeDrag(stampXY, setStampXY)}
                  style={{
                    position: 'absolute', left: `${stampXY.x}%`, top: `${stampXY.y}%`,
                    transform: 'translate(-50%, -50%)', cursor: 'grab',
                    width: 60, height: 60, borderRadius: '50%',
                    border: '2.5px solid #dc2626',
                    background: 'rgba(255,255,255,.88)',
                    boxShadow: '0 2px 10px rgba(220,38,38,.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  title="Kéo để đặt vị trí con dấu"
                >
                  <div style={{ textAlign: 'center', fontSize: '.38rem', color: '#dc2626', fontWeight: 700, lineHeight: 1.3 }}>
                    <div>BVĐK</div><div style={{ fontSize: '.55rem' }}>★</div><div>TỈNH</div>
                  </div>
                  <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: '#dc2626', color: '#fff', fontSize: '.55rem', borderRadius: 3, padding: '1px 5px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    ✥ Con dấu
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
