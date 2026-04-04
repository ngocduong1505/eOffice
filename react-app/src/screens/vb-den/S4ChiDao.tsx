import { useState } from 'react'
import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

type FlowStep = { label: string; sub: string; status: 'done' | 'active' | 'pending'; note?: string; time?: string }

const FLOW_STEPS: FlowStep[] = [
  { label: 'Tiếp nhận & Đóng dấu đến', sub: 'Nguyễn Thị Văn Thư · Văn thư',    status: 'done',    note: 'Đã đóng dấu #47',        time: '25/03/2026 lúc 08:15' },
  { label: 'Lãnh đạo Ghi ý kiến chỉ đạo', sub: 'Lê Văn Giám Đốc · BGĐ',       status: 'active',  note: '⏳ Đang chờ · Hạn 28/03', time: 'Nhận lúc 08:15 · chưa xử lý' },
  { label: 'Thư ký điều phối',          sub: 'Chưa xác định · sau khi chỉ đạo', status: 'pending', note: '— Chờ Giám đốc giao' },
  { label: 'Đơn vị xử lý & Phản hồi',   sub: 'Chờ xác định',                   status: 'pending', note: '— Chưa bắt đầu' },
  { label: 'Hoàn thành & Lưu trữ',      sub: 'Đóng hồ sơ, lưu trữ',            status: 'pending', note: '— Chưa bắt đầu' },
]

type AttachFile = { name: string; size: string; icon: string }
const ATTACHMENTS: AttachFile[] = [
  { name: '45_CV_SYT_KCB_Q1_2026.pdf', size: '2.4 MB', icon: '📄' },
  { name: 'Phu_luc_bao_cao.pdf',        size: '850 KB', icon: '📄' },
  { name: 'Bang_tong_hop.xlsx',         size: '120 KB', icon: '📊' },
]

const DOT_STYLE: Record<'done' | 'active' | 'pending', React.CSSProperties> = {
  done:    { background: '#16a34a', color: '#fff', border: 'none' },
  active:  { background: '#ea580c', color: '#fff', border: 'none' },
  pending: { background: '#fff', color: '#94a3b8', border: '2px solid #cbd5e1' },
}
const LINE_COLOR: Record<'done' | 'active' | 'pending', string> = {
  done: '#16a34a', active: '#ea580c', pending: '#e2e4ed',
}

export default function S4ChiDao() {
  const { goScreen } = useNavigation()
  const [selectedFile, setSelectedFile] = useState<AttachFile>(ATTACHMENTS[0])
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  // Modal state
  const [ykien, setYkien] = useState('')
  const [thuKy, setThuKy] = useState('')
  const [hanXuLy, setHanXuLy] = useState('2026-03-28')
  const canSubmit = ykien.trim() !== '' && thuKy !== '' && hanXuLy !== ''

  const handleGuiChiDao = () => {
    if (!canSubmit) return
    setModalOpen(false)
    goScreen('s5')
  }

  return (
    <div className="cw" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Topbar */}
      <Topbar
        breadcrumb={['Văn bản Đến', '45/CV-SYT · Sở Y tế TP.HCM', 'Bút phê tài liệu']}
        onNavClick={i => { if (i === 0) goScreen('s1'); if (i === 1) goScreen('s3') }}
      />

      {/* ── Toolbar hành động ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px',
        borderBottom: '1px solid var(--border)', background: 'var(--surface)', flexShrink: 0,
      }}>
        {/* Trạng thái + meta */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span className="stag st-direct">Chờ chỉ đạo</span>
          <span className="chip hot" style={{ fontSize: '.72rem' }}>🔴 Hỏa tốc</span>
          <span style={{ fontSize: '.78rem', color: '#b91c1c', fontWeight: 600 }}>
            ⚠️ Hạn: 28/03/2026 · còn 3 ngày
          </span>
        </div>

        {/* Nút Chỉ đạo xử lý */}
        <button
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          onClick={() => setModalOpen(true)}
        >
          ✏️ Chỉ đạo xử lý
        </button>

        {/* Nút ···  — dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            className="dp-btn"
            style={{ padding: '7px 12px', fontWeight: 700, letterSpacing: 2 }}
            onClick={() => setMenuOpen(v => !v)}
          >
            ···
          </button>
          {menuOpen && (
            <div style={{
              position: 'absolute', right: 0, top: '110%', background: '#fff',
              border: '1px solid var(--border)', borderRadius: 10,
              boxShadow: '0 6px 24px rgba(0,0,0,.13)', zIndex: 200,
              minWidth: 160, padding: '5px 0',
            }}
              onMouseLeave={() => setMenuOpen(false)}
            >
              {[
                { icon: '🚫', label: 'Từ chối',   danger: true },
                { icon: '🔁', label: 'Ủy quyền',  danger: false },
                { icon: '💾', label: 'Lưu hồ sơ', danger: false },
              ].map(item => (
                <div
                  key={item.label}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '9px 16px', fontSize: '.82rem', cursor: 'pointer',
                    color: item.danger ? '#dc2626' : 'var(--dark)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f5f6fa')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  {item.icon} {item.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="dp-btn" style={{ marginLeft: 4 }} onClick={() => goScreen('s3')}>✕</button>
      </div>

      {/* ── Split-View body ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ═══ CỘT TRÁI ═══ */}
        <div style={{
          width: 400, minWidth: 360, maxWidth: 480,
          borderRight: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
        }}>
          {/* Tiêu đề văn bản */}
          <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--dark)', lineHeight: 1.4, marginBottom: 8 }}>
              V/v báo cáo tình hình thực hiện kế hoạch KCB quý I/2026
            </div>
          </div>

          {/* Khối 2: Thông tin văn bản — read-only */}
          <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)' }}>
            <div className="info-section" style={{ marginBottom: 0 }}>
              <div className="is-title">Văn bản gốc</div>
              {[
                ['Số ký hiệu',    '45/CV-SYT'],
                ['Loại văn bản',  'Công văn'],
                ['Nơi gửi',       'Sở Y tế TP.HCM'],
                ['Ngày ban hành', '24/03/2026'],
              ].map(([l, v]) => (
                <div key={l} className="info-row">
                  <div className="ir-l">{l}</div>
                  <div className="ir-v" style={l === 'Số ký hiệu' ? { fontFamily: 'monospace', fontWeight: 700 } : {}}>{v}</div>
                </div>
              ))}
            </div>
            <div className="info-section" style={{ marginBottom: 0, marginTop: 10 }}>
              <div className="is-title">Thông tin tiếp nhận</div>
              {[
                ['Sổ đến',         'Sổ công văn đến 2026'],
                ['Số đến',         '#47'],
                ['Ngày đến',       '25/03/2026 08:15'],
                ['Hạn xử lý',      '28/03/2026'],
                ['Mức khẩn',       '🔴 Hỏa tốc'],
              ].map(([l, v]) => (
                <div key={l} className="info-row">
                  <div className="ir-l">{l}</div>
                  <div className="ir-v" style={
                    l === 'Hạn xử lý' ? { color: '#b91c1c', fontWeight: 600 } :
                    l === 'Mức khẩn'  ? { color: '#b91c1c' } :
                    l === 'Số đến'    ? { fontWeight: 700, color: '#d94f1e' } : {}
                  }>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Khối 5: Danh sách đính kèm */}
          <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: 8 }}>
              📎 Danh sách đính kèm
            </div>
            {ATTACHMENTS.map(f => (
              <div
                key={f.name}
                onClick={() => setSelectedFile(f)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
                  borderRadius: 8, cursor: 'pointer', marginBottom: 6,
                  border: `1px solid ${selectedFile.name === f.name ? 'var(--orange)' : 'var(--border)'}`,
                  background: selectedFile.name === f.name ? '#fff7ed' : '#fff',
                  transition: 'all .15s',
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{f.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '.78rem', fontWeight: 600, color: 'var(--dark)' }}>{f.name}</div>
                  <div style={{ fontSize: '.7rem', color: 'var(--text3)' }}>{f.size}</div>
                </div>
                <button
                  onClick={e => e.stopPropagation()}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text3)', fontSize: '.8rem' }}
                  title="Tải về"
                >⬇</button>
              </div>
            ))}
          </div>

          {/* Khối 4: Timeline xử lý */}
          <div style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: 12 }}>
              Lịch sử xử lý
            </div>
            {FLOW_STEPS.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 12 }}>
                {/* Dot + connector line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '.65rem', fontWeight: 700,
                    ...DOT_STYLE[step.status],
                  }}>
                    {step.status === 'done' ? '✓' : step.status === 'active' ? '!' : '…'}
                  </div>
                  {i < FLOW_STEPS.length - 1 && (
                    <div style={{
                      width: 2, flex: 1, minHeight: 18,
                      background: LINE_COLOR[step.status],
                      margin: '3px 0',
                    }} />
                  )}
                </div>
                {/* Info */}
                <div style={{ paddingBottom: 16 }}>
                  <div style={{ fontSize: '.8rem', fontWeight: 600, color: step.status === 'pending' ? '#94a3b8' : 'var(--dark)' }}>
                    {step.label}
                  </div>
                  <div style={{ fontSize: '.72rem', color: 'var(--text3)', marginTop: 2 }}>{step.sub}</div>
                  {step.note && (
                    <div style={{
                      fontSize: '.72rem', marginTop: 3, fontWeight: 500,
                      color: step.status === 'done' ? '#16a34a' : step.status === 'active' ? '#ea580c' : '#94a3b8',
                    }}>{step.note}</div>
                  )}
                  {step.time && (
                    <div style={{ fontSize: '.68rem', color: 'var(--text3)', marginTop: 2 }}>{step.time}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ CỘT PHẢI — PDF Viewer ═══ */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          background: '#f1f3f7', overflow: 'hidden',
        }}>
          {/* PDF toolbar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px',
            background: '#2d3142', color: '#fff', fontSize: '.78rem', flexShrink: 0,
          }}>
            <span style={{ flex: 1, fontSize: '.8rem', fontWeight: 500, opacity: .9 }}>
              📄 {selectedFile.name}
            </span>
            {[['🔍−', ''], ['100%', ''], ['🔍+', '']].map(([txt], i) => (
              i === 1
                ? <span key={i} style={{ fontSize: '.75rem', opacity: .7 }}>{txt}</span>
                : <button key={i} style={{
                    background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff',
                    borderRadius: 4, padding: '3px 8px', cursor: 'pointer', fontSize: '.75rem',
                  }}>{txt}</button>
            ))}
            <button style={{
              background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff',
              borderRadius: 4, padding: '4px 10px', cursor: 'pointer', fontSize: '.75rem',
            }}>⬇ Tải về</button>
          </div>

          {/* PDF content */}
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24, overflowY: 'auto',
          }}>
            <div style={{
              width: '100%', maxWidth: 680,
              background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,.12)',
              borderRadius: 4, minHeight: 860, padding: 40,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
            }}>
              <div style={{ fontSize: '3rem' }}>📄</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--dark)', textAlign: 'center' }}>
                {selectedFile.name}
              </div>
              <div style={{ fontSize: '.82rem', color: 'var(--text3)', textAlign: 'center', maxWidth: 340 }}>
                Trình xem tài liệu hiển thị nội dung tại đây.
                Nhấp vào tên tệp ở cột trái để chuyển đổi.
              </div>
              <div style={{
                background: '#f8fafc', border: '1px solid var(--border)',
                borderRadius: 8, padding: '10px 20px', fontSize: '.78rem', color: 'var(--text3)',
              }}>
                Kích thước: {selectedFile.size}
              </div>
              <div style={{ width: '100%', marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {Array.from({ length: 14 }).map((_, i) => (
                  <div key={i} style={{
                    height: 10, borderRadius: 4, background: '#f1f5f9',
                    width: i % 3 === 2 ? '55%' : i % 2 === 0 ? '100%' : '80%',
                  }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ MODAL: Chỉ đạo xử lý ═══ */}
      {modalOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(15,20,40,.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 500,
        }}>
          <div style={{
            background: '#fff', borderRadius: 16, width: 600, maxWidth: '94vw',
            boxShadow: '0 24px 64px rgba(0,0,0,.22)',
            display: 'flex', flexDirection: 'column', maxHeight: '90vh',
          }}>
            {/* Modal header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '18px 24px 14px', borderBottom: '1px solid var(--border)',
            }}>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--dark)' }}>✏️ Chỉ đạo xử lý</div>
                <div style={{ fontSize: '.78rem', color: 'var(--text3)', marginTop: 3 }}>
                  45/CV-SYT · V/v báo cáo tình hình KCB quý I/2026
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                style={{ border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text3)' }}
              >✕</button>
            </div>

            {/* Modal body */}
            <div style={{ padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Ý kiến chỉ đạo — mandatory */}
              <div className="fg">
                <label style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text2)', marginBottom: 6, display: 'block' }}>
                  Ý kiến chỉ đạo <span className="req">*</span>
                </label>
                <textarea
                  value={ykien}
                  onChange={e => setYkien(e.target.value)}
                  placeholder="Nhập nội dung chỉ đạo..."
                  style={{ height: 120, resize: 'vertical', width: '100%', boxSizing: 'border-box' }}
                />
                {/* Simulated rich text hint */}
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
                    }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chọn thư ký xử lý — mandatory */}
              <div className="fg">
                <label style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text2)', marginBottom: 6, display: 'block' }}>
                  Chọn thư ký xử lý <span className="req">*</span>
                </label>
                <select
                  value={thuKy}
                  onChange={e => setThuKy(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <option value="">-- Tìm kiếm và chọn thư ký --</option>
                  <option value="ntvt">Nguyễn Thị Văn Thư — Văn thư · P.HCNS</option>
                  <option value="ttthy">Trần Thị Thư Ký — Thư ký Ban GĐ · BGĐ</option>
                  <option value="lttl">Lê Thị Thanh Lâm — Văn thư · P.KHTH</option>
                </select>
              </div>

              {/* Hạn xử lý — mandatory, auto-fill từ VB */}
              <div className="fg">
                <label style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text2)', marginBottom: 6, display: 'block' }}>
                  Hạn xử lý <span className="req">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={hanXuLy ? hanXuLy + 'T17:00' : ''}
                  onChange={e => setHanXuLy(e.target.value.split('T')[0])}
                  min={new Date().toISOString().split('T')[0] + 'T00:00'}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
                <div className="hint" style={{ color: '#b91c1c' }}>
                  ⚠️ Tự động điền theo Hạn xử lý của văn bản — có thể điều chỉnh
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10,
              padding: '14px 24px', borderTop: '1px solid var(--border)',
            }}>
              <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>Đóng</button>
              <button
                className="btn btn-primary"
                style={{ opacity: canSubmit ? 1 : .45, cursor: canSubmit ? 'pointer' : 'not-allowed' }}
                onClick={handleGuiChiDao}
                disabled={!canSubmit}
              >
                📤 Gửi chỉ đạo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
