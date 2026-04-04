import { useState } from 'react'
import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

// ─── Types ────────────────────────────────────────────────────────────────────
type VbStatus = 'cho-chi-dao' | 'cho-dieu-phoi' | 'cho-xu-ly' | 'dang-xu-ly' | 'hoan-thanh' | 'qua-han'
type FileItem = { name: string; size: string; type: 'main' | 'attach' }
type FlowStep = { label: string; sub: string; status: 'done' | 'active' | 'pending'; note?: string; time?: string }

// ─── Static data ──────────────────────────────────────────────────────────────
const FILES: FileItem[] = [
  { name: '45_CV_SYT_KCB_Q1_2026.pdf', size: '2.4 MB', type: 'main' },
  { name: 'Phu_luc_bao_cao.pdf', size: '850 KB', type: 'attach' },
  { name: 'Bang_tong_hop.xlsx', size: '120 KB', type: 'attach' },
]

const FLOW_CHO_CHI_DAO: FlowStep[] = [
  { label: 'Tiếp nhận & Đóng dấu đến', sub: 'Nguyễn Thị Văn Thư · Văn thư', status: 'done', note: 'Đã đóng dấu #47', time: '25/03/2026 lúc 08:15' },
  { label: 'Giám đốc — Ghi ý kiến chỉ đạo', sub: 'Lê Văn Giám Đốc · BGĐ', status: 'active', note: '⏳ Đang chờ · Hạn 28/03', time: 'Nhận lúc 08:15 · chưa xử lý' },
  { label: 'Đơn vị xử lý', sub: 'Chưa xác định · BGĐ sẽ chỉ định', status: 'pending', note: '— Chờ Giám đốc giao' },
  { label: 'Xử lý và phản hồi', sub: 'Chờ xác định', status: 'pending', note: '— Chưa bắt đầu' },
  { label: 'Hoàn thành & lưu trữ', sub: 'Đóng hồ sơ, lưu trữ', status: 'pending', note: '— Chưa bắt đầu' },
]

const FLOW_DANG_XU_LY: FlowStep[] = [
  { label: 'Tiếp nhận & Đóng dấu đến', sub: 'Nguyễn Thị Văn Thư · Văn thư', status: 'done', note: 'Đã đóng dấu #47', time: '25/03/2026 08:15' },
  { label: 'Giám đốc — Ý kiến chỉ đạo', sub: 'Lê Văn Giám Đốc · BGĐ', status: 'done', note: '✓ Đã ghi chỉ đạo & giao P.KHTH', time: '25/03/2026 09:45' },
  { label: 'P. Kế hoạch TH — Xử lý', sub: 'Nguyễn Văn A · Trưởng phòng KHTH', status: 'active', note: '⏳ Đang xử lý · Hạn 28/03', time: 'Nhận lúc 09:45' },
  { label: 'Hoàn thành', sub: 'Đóng hồ sơ, lưu trữ', status: 'pending', note: '— Chờ P.KHTH xử lý xong' },
]

const FLOW_HOAN_THANH: FlowStep[] = [
  { label: 'Tiếp nhận & Đóng dấu đến', sub: 'Nguyễn Thị Văn Thư · Văn thư', status: 'done', note: 'Đã đóng dấu #47', time: '25/03/2026 08:15' },
  { label: 'Giám đốc — Ý kiến chỉ đạo', sub: 'Lê Văn Giám Đốc · BGĐ', status: 'done', note: '✓ Đã chỉ đạo & giao P.KHTH', time: '25/03/2026 09:45' },
  { label: 'P. Kế hoạch TH — Xử lý', sub: 'Nguyễn Văn A · Trưởng phòng KHTH', status: 'done', note: '✓ Hoàn thành · Đúng hạn', time: '27/03/2026 16:30' },
  { label: 'Hoàn thành & Lưu trữ', sub: 'Đóng hồ sơ, lưu trữ', status: 'done', note: '✓ Đã lưu vào hồ sơ công việc', time: '27/03/2026 16:30' },
]

const DOT_STYLE: Record<'done' | 'active' | 'pending', React.CSSProperties> = {
  done: { background: '#16a34a', color: '#fff', border: 'none' },
  active: { background: '#ea580c', color: '#fff', border: 'none' },
  pending: { background: '#fff', color: '#94a3b8', border: '2px solid #cbd5e1' },
}
const STATUS_COLOR: Record<'done' | 'active' | 'pending', string> = {
  done: '#16a34a', active: '#ea580c', pending: '#94a3b8',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getFlowSteps(status: VbStatus): FlowStep[] {
  if (status === 'dang-xu-ly' || status === 'cho-xu-ly') return FLOW_DANG_XU_LY
  if (status === 'hoan-thanh') return FLOW_HOAN_THANH
  return FLOW_CHO_CHI_DAO // cho-chi-dao, cho-dieu-phoi, qua-han
}

function getStatusLabel(status: VbStatus): string {
  const map: Record<VbStatus, string> = {
    'cho-chi-dao': 'Chờ chỉ đạo',
    'cho-dieu-phoi': 'Chờ điều phối',
    'cho-xu-ly': 'Chờ xử lý',
    'dang-xu-ly': 'Đang xử lý',
    'hoan-thanh': 'Hoàn thành',
    'qua-han': 'Quá hạn',
  }
  return map[status]
}

function getStatusCls(status: VbStatus): string {
  const map: Record<VbStatus, string> = {
    'cho-chi-dao': 'st-direct',
    'cho-dieu-phoi': 'st-coord',
    'cho-xu-ly': 'st-pending',
    'dang-xu-ly': 'st-process',
    'hoan-thanh': 'st-done',
    'qua-han': 'st-overdue',
  }
  return `stag ${map[status]}`
}

// ─── Timeline component ───────────────────────────────────────────────────────
function Timeline({ steps }: { steps: FlowStep[] }) {
  return (
    <div style={{ borderTop: '1px solid var(--border)', padding: '16px 20px' }}>
      <div style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: 12 }}>
        Lịch sử xử lý
      </div>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '.65rem', fontWeight: 700, ...DOT_STYLE[step.status],
            }}>
              {step.status === 'done' ? '✓' : step.status === 'active' ? '!' : '…'}
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: 2, flex: 1, minHeight: 18, background: step.status === 'done' ? '#16a34a' : '#e2e4ed', margin: '3px 0' }} />
            )}
          </div>
          <div style={{ paddingBottom: 16 }}>
            <div style={{ fontSize: '.8rem', fontWeight: 600, color: step.status === 'pending' ? '#94a3b8' : 'var(--dark)' }}>
              {step.label}
            </div>
            <div style={{ fontSize: '.72rem', color: 'var(--text3)', marginTop: 2 }}>{step.sub}</div>
            {step.note && (
              <div style={{ fontSize: '.72rem', marginTop: 3, fontWeight: 500, color: STATUS_COLOR[step.status] }}>
                {step.note}
              </div>
            )}
            {step.time && (
              <div style={{ fontSize: '.68rem', color: 'var(--text3)', marginTop: 2 }}>{step.time}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Toolbar buttons per status ───────────────────────────────────────────────
function ToolbarButtons({ status, onChiDao, goScreen }: {
  status: VbStatus
  onChiDao: () => void
  goScreen: (id: string, params?: Record<string, unknown>) => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  if (status === 'cho-chi-dao' || status === 'qua-han') {
    return (
      <>
        <button className="dp-btn primary" onClick={onChiDao}>✏️ Ghi ý kiến chỉ đạo</button>
        <button className="dp-btn">📎 Tải xuống</button>
        <button className="dp-btn" style={{ background: '#eff6ff', color: '#1d4ed8' }}>💾 Lưu hồ sơ</button>
        <button className="dp-btn danger">↩ Trả lại</button>
      </>
    )
  }

  if (status === 'cho-dieu-phoi') {
    return (
      <>
        <button className="dp-btn primary" onClick={onChiDao}>📋 Phân công xử lý</button>
        <button className="dp-btn">📎 Tải xuống</button>
        <button className="dp-btn danger">↩ Trả lại</button>
      </>
    )
  }

  if (status === 'cho-xu-ly' || status === 'dang-xu-ly') {
    return (
      <>
        <button className="dp-btn primary" onClick={() => goScreen('s6')}>✓ Hoàn thành xử lý</button>
        <button className="dp-btn">↪ Chuyển tiếp</button>
        <button className="dp-btn">📎 Tải xuống</button>
        <div style={{ position: 'relative' }}>
          <button className="dp-btn" style={{ padding: '7px 12px', fontWeight: 700, letterSpacing: 2 }}
            onClick={() => setMenuOpen(v => !v)}>···</button>
          {menuOpen && (
            <div style={{
              position: 'absolute', right: 0, top: '110%', background: '#fff',
              border: '1px solid var(--border)', borderRadius: 10,
              boxShadow: '0 6px 24px rgba(0,0,0,.13)', zIndex: 200,
              minWidth: 160, padding: '5px 0',
            }} onMouseLeave={() => setMenuOpen(false)}>
              {[{ icon: '🚫', label: 'Từ chối', danger: true }, { icon: '🔁', label: 'Ủy quyền', danger: false }].map(item => (
                <div key={item.label} onClick={() => setMenuOpen(false)} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '9px 16px', fontSize: '.82rem', cursor: 'pointer',
                  color: item.danger ? '#dc2626' : 'var(--dark)',
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f5f6fa')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  {item.icon} {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    )
  }

  if (status === 'hoan-thanh') {
    return (
      <>
        <button className="dp-btn">📂 Thêm vào hồ sơ</button>
        <button className="dp-btn">📎 Tải xuống</button>
        <button className="dp-btn">📋 Xem sổ đăng ký</button>
      </>
    )
  }

  return null
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function S3ChiTiet() {
  const { goScreen, screenParams } = useNavigation()
  const status = (screenParams.status as VbStatus) ?? 'cho-chi-dao'

  const [selectedFile, setSelectedFile] = useState<FileItem>(FILES[0])
  const [tab, setTab] = useState<'info' | 'files' | 'flow'>('info')
  const [modalOpen, setModalOpen] = useState(false)

  // Modal (Chỉ đạo / Phân công)
  const [ykien, setYkien] = useState('')
  const [thuKy, setThuKy] = useState('')
  const [hanXuLy, setHanXuLy] = useState('2026-03-28')
  const canSubmit = ykien.trim() !== '' && thuKy !== '' && hanXuLy !== ''

  const handleGuiChiDao = () => {
    if (!canSubmit) return
    setModalOpen(false)
    goScreen('s3', { status: 'dang-xu-ly' })
  }

  const flowSteps = getFlowSteps(status)

  // Tab list depending on status
  const tabs: { key: 'info' | 'files' | 'flow'; label: string }[] = [
    { key: 'info', label: '📋 Thông tin' },
    { key: 'files', label: '📎 Tệp đính kèm' },
    ...(status !== 'cho-chi-dao' && status !== 'cho-dieu-phoi'
      ? [{ key: 'flow' as const, label: '🔄 Luồng xử lý' }]
      : []),
  ]

  // Breadcrumb per status
  const breadcrumbSub = status === 'dang-xu-ly' ? '45/CV-SYT · Đang xử lý'
    : status === 'hoan-thanh' ? '45/CV-SYT · Hoàn thành'
      : '45/CV-SYT · Sở Y tế TP.HCM'

  // Modal title per status
  const modalTitle = status === 'cho-dieu-phoi' ? '📋 Phân công xử lý' : '✏️ Chỉ đạo xử lý'

  return (
    <div className="cw" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Topbar */}
      <Topbar
        breadcrumb={['Văn bản Đến', breadcrumbSub]}
        onNavClick={() => goScreen('s1')}
      />

      {/* Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
        borderBottom: '1px solid var(--border)', background: 'var(--surface)', flexShrink: 0,
      }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span className={getStatusCls(status)} style={{ fontSize: '.75rem' }}>{getStatusLabel(status)}</span>
          <span className="chip hot" style={{ fontSize: '.72rem' }}>🔴 Hỏa tốc</span>
          {status !== 'hoan-thanh' && (
            <span style={{ fontSize: '.78rem', color: '#b91c1c', fontWeight: 600 }}>⚠️ Hạn: 28/03/2026 · còn 3 ngày</span>
          )}
          {status === 'hoan-thanh' && (
            <span style={{ fontSize: '.78rem', color: '#16a34a', fontWeight: 600 }}>✅ Hoàn thành · 27/03/2026 · Đúng hạn</span>
          )}
        </div>
        <ToolbarButtons status={status} onChiDao={() => setModalOpen(true)} goScreen={goScreen} />
        <button className="dp-btn" style={{ marginLeft: 4 }} onClick={() => goScreen('s1')}>✕</button>
      </div>

      {/* Split-view body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ===== CỘT TRÁI ===== */}
        <div style={{
          width: 650, minWidth: 650, maxWidth: 650,
          borderRight: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
        }}>
          {/* Tiêu đề */}
          <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--dark)', lineHeight: 1.4, marginBottom: 8 }}>
              V/v báo cáo tình hình thực hiện kế hoạch KCB quý I/2026
            </div>
          </div>

          {/* Hoàn thành banner */}
          {status === 'hoan-thanh' && (
            <div style={{
              margin: '12px 20px', padding: '12px 16px',
              background: '#edfbf4', border: '1px solid #a7f3d0', borderRadius: 10,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ fontSize: '1.5rem' }}>✅</div>
              <div>
                <div style={{ fontSize: '.85rem', fontWeight: 700, color: '#1a7a45' }}>Đã xử lý hoàn thành</div>
                <div style={{ fontSize: '.75rem', color: '#166534' }}>P.KHTH hoàn thành xử lý lúc 27/03/2026 · Đúng hạn</div>
              </div>
            </div>
          )}

          {/* Đang xử lý — thông tin xử lý */}
          {(status === 'dang-xu-ly' || status === 'cho-xu-ly') && (
            <div style={{ padding: '12px 20px', background: '#fff7ed', borderBottom: '1px solid #fed7aa' }}>
              <div style={{ fontSize: '.72rem', fontWeight: 700, color: '#c2410c', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: 8 }}>
                📌 Thông tin xử lý
              </div>
              {[
                ['Đơn vị chủ trì', 'P. Kế hoạch TH'],
                ['Đơn vị phối hợp', 'P. Tài chính KT'],
                ['Người giao', 'Lê Văn Giám Đốc'],
              ].map(([l, v]) => (
                <div key={l} className="info-row" style={{ padding: '3px 0' }}>
                  <div className="ir-l">{l}</div>
                  <div className="ir-v" style={{ fontWeight: 600, color: '#c2410c' }}>{v}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg)', flexShrink: 0 }}>
            {tabs.map(t => (
              <div key={t.key} onClick={() => setTab(t.key)} style={{
                flex: 1, textAlign: 'center', padding: '10px 0',
                fontSize: '.8rem', fontWeight: 600, cursor: 'pointer',
                color: tab === t.key ? 'var(--orange)' : 'var(--text3)',
                borderBottom: tab === t.key ? '2px solid var(--orange)' : '2px solid transparent',
              }}>
                {t.label}
              </div>
            ))}
          </div>

          {/* Tab: Thông tin */}
          {tab === 'info' && (
            <div style={{ padding: '12px 20px', flex: 1 }}>
              <div className="info-section">
                <div className="is-title">Văn bản gốc</div>
                {[
                  ['Số ký hiệu', '45/CV-SYT'],
                  ['Loại văn bản', 'Công văn'],
                  ['Nơi gửi', 'Sở Y tế TP.HCM'],
                  ['Ngày ban hành', '24/03/2026'],
                ].map(([l, v]) => (
                  <div key={l} className="info-row">
                    <div className="ir-l">{l}</div>
                    <div className="ir-v" style={l === 'Số ký hiệu' ? { fontFamily: 'monospace', fontWeight: 700 } : {}}>{v}</div>
                  </div>
                ))}
              </div>
              <div className="info-section">
                <div className="is-title">Thông tin tiếp nhận</div>
                {[
                  ['Sổ đến', 'Sổ công văn đến 2026'],
                  ['Số đến', '#47'],
                  ['Ngày đến', '25/03/2026 08:15'],
                  ['Người tiếp nhận', 'Nguyễn Thị Văn Thư'],
                  ['Hạn xử lý', '28/03/2026'],
                  ['Mức khẩn', '🔴 Hỏa tốc'],
                ].map(([l, v]) => (
                  <div key={l} className="info-row">
                    <div className="ir-l">{l}</div>
                    <div className="ir-v" style={
                      l === 'Hạn xử lý' ? { color: '#b91c1c', fontWeight: 600 } :
                        l === 'Mức khẩn' ? { color: '#b91c1c' } :
                          l === 'Số đến' ? { fontWeight: 700, color: '#d94f1e' } : {}
                    }>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Tệp đính kèm */}
          {tab === 'files' && (
            <div style={{ padding: '12px 20px', flex: 1 }}>
              {(['main', 'attach'] as const).map(type => (
                <div key={type}>
                  <div style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.7px', margin: type === 'attach' ? '12px 0 8px' : '0 0 8px' }}>
                    {type === 'main' ? 'Tệp chính' : 'Tệp đính kèm'}
                  </div>
                  {FILES.filter(f => f.type === type).map(f => (
                    <div key={f.name} onClick={() => setSelectedFile(f)} style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                      borderRadius: 8, cursor: 'pointer', marginBottom: 6, transition: 'all .15s',
                      border: `1px solid ${selectedFile.name === f.name ? 'var(--orange)' : 'var(--border)'}`,
                      background: selectedFile.name === f.name ? '#fff7ed' : '#fff',
                    }}>
                      <span style={{ fontSize: '1.3rem' }}>{f.name.endsWith('.xlsx') ? '📊' : '📄'}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--dark)' }}>{f.name}</div>
                        <div style={{ fontSize: '.7rem', color: 'var(--text3)' }}>{f.name.endsWith('.xlsx') ? 'Excel' : 'PDF'} · {f.size}</div>
                      </div>
                      <button onClick={e => e.stopPropagation()} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text3)', fontSize: '.8rem' }}>⬇</button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Tab: Luồng xử lý (cho dang-xu-ly / hoan-thanh) */}
          {tab === 'flow' && (
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {/* Dấu đến block */}
              <div style={{
                margin: '12px 20px', padding: '12px 16px',
                background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 10,
              }}>
                <div style={{ fontSize: '.72rem', fontWeight: 700, color: '#c2410c', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: 8 }}>
                  🔴 Dấu Đến
                </div>
                <div style={{ display: 'flex', gap: 24 }}>
                  <div>
                    <div style={{ fontSize: '.7rem', color: 'var(--text3)' }}>Số đến</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#d94f1e' }}>#47</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '.7rem', color: 'var(--text3)' }}>Ngày tiếp nhận</div>
                    <div style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--dark)' }}>25/03/2026 08:15</div>
                  </div>
                </div>
              </div>
              <Timeline steps={flowSteps} />
            </div>
          )}

          {/* Timeline luôn hiển thị ở cuối cột trái khi không ở tab flow */}
          {tab !== 'flow' && <Timeline steps={flowSteps} />}
        </div>

        {/* ===== CỘT PHẢI — PDF Viewer ===== */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f1f3f7', overflow: 'hidden' }}>
          {/* PDF toolbar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px',
            background: '#2d3142', color: '#fff', fontSize: '.78rem', flexShrink: 0,
          }}>
            <span style={{ flex: 1, fontSize: '.8rem', fontWeight: 500, opacity: .9 }}>📄 {selectedFile.name}</span>
            <button style={{ background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', borderRadius: 4, padding: '3px 8px', cursor: 'pointer', fontSize: '.75rem' }}>🔍−</button>
            <span style={{ fontSize: '.75rem', opacity: .7 }}>100%</span>
            <button style={{ background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', borderRadius: 4, padding: '3px 8px', cursor: 'pointer', fontSize: '.75rem' }}>🔍+</button>
            <button style={{ background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', fontSize: '.75rem' }}>⬇ Tải về</button>
          </div>

          {/* PDF content */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, overflowY: 'auto' }}>
            <div style={{
              width: '100%', maxWidth: 680,
              background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,.12)',
              borderRadius: 4, minHeight: 860,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: 40, gap: 16,
            }}>
              <div style={{ fontSize: '3rem' }}>📄</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--dark)', textAlign: 'center' }}>{selectedFile.name}</div>
              <div style={{ fontSize: '.82rem', color: 'var(--text3)', textAlign: 'center', maxWidth: 340 }}>
                Trình xem PDF sẽ hiển thị nội dung tệp tại đây.
                Nhấp vào tên tệp ở cột trái để đổi tài liệu.
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 20px', fontSize: '.78rem', color: 'var(--text3)', marginTop: 8 }}>
                Kích thước: {selectedFile.size}&nbsp;·&nbsp;
                Loại: {selectedFile.name.endsWith('.xlsx') ? 'Excel' : 'PDF'}
              </div>
              <div style={{ width: '100%', marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} style={{ height: 10, borderRadius: 4, background: '#f1f5f9', width: i % 3 === 2 ? '60%' : i % 2 === 0 ? '100%' : '85%' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MODAL: Chỉ đạo / Phân công ===== */}
      {modalOpen && (
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
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--dark)' }}>{modalTitle}</div>
                <div style={{ fontSize: '.78rem', color: 'var(--text3)', marginTop: 3 }}>
                  45/CV-SYT · V/v báo cáo tình hình KCB quý I/2026
                </div>
              </div>
              <button onClick={() => setModalOpen(false)} style={{ border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text3)' }}>✕</button>
            </div>

            {/* Body */}
            <div style={{ padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="fg">
                <label style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text2)', marginBottom: 6, display: 'block' }}>
                  {status === 'cho-dieu-phoi' ? 'Nội dung phân công' : 'Ý kiến chỉ đạo'} <span className="req">*</span>
                </label>
                <textarea
                  value={ykien}
                  onChange={e => setYkien(e.target.value)}
                  placeholder={status === 'cho-dieu-phoi' ? 'Nhập nội dung phân công...' : 'Nhập nội dung chỉ đạo...'}
                  style={{ height: 120, resize: 'vertical', width: '100%', boxSizing: 'border-box' }}
                />
                <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                  {['B', 'I', 'U', '≡'].map(f => (
                    <button key={f} style={{
                      border: '1px solid var(--border)', background: '#f8fafc',
                      borderRadius: 4, width: 26, height: 26, cursor: 'pointer',
                      fontSize: f === 'B' ? '.85rem' : '.8rem', fontWeight: f === 'B' ? 700 : 400,
                      fontStyle: f === 'I' ? 'italic' : 'normal',
                      textDecoration: f === 'U' ? 'underline' : 'none',
                      color: 'var(--text2)',
                    }}>{f}</button>
                  ))}
                </div>
              </div>

              <div className="fg">
                <label style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text2)', marginBottom: 6, display: 'block' }}>
                  {status === 'cho-dieu-phoi' ? 'Chọn đơn vị xử lý' : 'Chọn thư ký xử lý'} <span className="req">*</span>
                </label>
                <select value={thuKy} onChange={e => setThuKy(e.target.value)} style={{ width: '100%' }}>
                  <option value="">-- Tìm kiếm và chọn --</option>
                  <option value="ntvt">Nguyễn Thị Văn Thư — Văn thư · P.HCNS</option>
                  <option value="ttthy">Trần Thị Thư Ký — Thư ký Ban GĐ · BGĐ</option>
                  <option value="lttl">Lê Thị Thanh Lâm — Văn thư · P.KHTH</option>
                </select>
              </div>

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

            {/* Footer */}
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
                📤 {status === 'cho-dieu-phoi' ? 'Gửi phân công' : 'Gửi chỉ đạo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
