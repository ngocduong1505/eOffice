import { useState } from 'react'
import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'
import ModalChiDao from './modals/ModalChiDao'
import ModalDieuPhoi from './modals/ModalDieuPhoi'
import ModalUyQuyen from './modals/ModalUyQuyen'
import ModalChuyenXuLy from './modals/ModalChuyenXuLy'
import ModalHoanThanh from './modals/ModalHoanThanh'

// ─── Types ────────────────────────────────────────────────────────────────────
type VbStatus = 'cho-chi-dao' | 'cho-dieu-phoi' | 'cho-xu-ly' | 'hoan-thanh'
type FileItem = { name: string; size: string; type: 'main' | 'attach' }
type StepStatus = 'done' | 'active' | 'pending'
type FlowStep = { label: string; sub: string; status: StepStatus; note?: string; time?: string }

// ─── Static data ──────────────────────────────────────────────────────────────
const FILES: FileItem[] = [
  { name: '45_CV_SYT_KCB_Q1_2026.pdf', size: '2.4 MB', type: 'main' },
  { name: 'Phu_luc_bao_cao.pdf', size: '850 KB', type: 'attach' },
  { name: 'Bang_tong_hop.xlsx', size: '120 KB', type: 'attach' },
]

const FLOW_STEPS: Record<VbStatus, FlowStep[]> = {
  'cho-chi-dao': [
    { label: 'Tiếp nhận văn bản', sub: 'Nguyễn Thị Văn Thư · Văn thư', status: 'done', note: '', time: '25/03/2026 lúc 08:15' },
    { label: 'Giám đốc — Ghi ý kiến chỉ đạo', sub: 'Lê Văn Giám Đốc · BGĐ', status: 'active', note: '⏳ Đang chờ · Hạn 28/03', time: 'Nhận lúc 08:15 · chưa xử lý' },
    { label: 'Thư ký điều phối', sub: 'Chưa xác định', status: 'pending', note: '— Chờ Giám đốc giao' },
    { label: 'Xử lý và phản hồi', sub: 'Chờ xác định', status: 'pending', note: '— Chưa bắt đầu' },
    { label: 'Hoàn thành & lưu trữ', sub: 'Đóng hồ sơ, lưu trữ', status: 'pending', note: '— Chưa bắt đầu' },
  ],
  'cho-dieu-phoi': [
    { label: 'Tiếp nhận văn bản', sub: 'Nguyễn Thị Văn Thư · Văn thư', status: 'done', note: '', time: '25/03/2026 08:15' },
    { label: 'Giám đốc — Ý kiến chỉ đạo', sub: 'Lê Văn Giám Đốc · BGĐ', status: 'done', note: '✓ Đã ghi chỉ đạo', time: '25/03/2026 09:45' },
    { label: 'Thư ký điều phối', sub: 'Trần Thị Thư Ký · BGĐ', status: 'active', note: '⏳ Chờ phân công · Hạn 28/03', time: 'Nhận lúc 09:45' },
    { label: 'Xử lý và phản hồi', sub: 'Chờ xác định', status: 'pending', note: '— Chờ thư ký phân công' },
  ],
  'cho-xu-ly': [
    { label: 'Tiếp nhận văn bản', sub: 'Nguyễn Thị Văn Thư · Văn thư', status: 'done', note: '', time: '25/03/2026 08:15' },
    { label: 'Giám đốc — Ý kiến chỉ đạo', sub: 'Lê Văn Giám Đốc · BGĐ', status: 'done', note: '✓ Đã chỉ đạo & giao P.KHTH', time: '25/03/2026 09:45' },
    { label: 'Thư ký — Đã điều phối', sub: 'Trần Thị Thư Ký · BGĐ', status: 'done', note: '✓ Giao P.KHTH + P.TCKT phối hợp', time: '25/03/2026 10:00' },
    { label: 'P. Kế hoạch TH — Xử lý', sub: 'Nguyễn Văn A · Trưởng phòng KHTH', status: 'active', note: '⏳ Đang xử lý · Hạn 28/03', time: 'Nhận lúc 10:00' },
    { label: 'Hoàn thành', sub: 'Đóng hồ sơ, lưu trữ', status: 'pending', note: '— Chờ P.KHTH xử lý xong' },
  ],
  'hoan-thanh': [
    { label: 'Tiếp nhận văn bản', sub: 'Nguyễn Thị Văn Thư · Văn thư', status: 'done', note: '', time: '25/03/2026 08:15' },
    { label: 'Giám đốc — Ý kiến chỉ đạo', sub: 'Lê Văn Giám Đốc · BGĐ', status: 'done', note: '✓ Đã chỉ đạo & giao P.KHTH', time: '25/03/2026 09:45' },
    { label: 'Thư ký — Đã điều phối', sub: 'Trần Thị Thư Ký · BGĐ', status: 'done', note: '✓ Giao P.KHTH chủ trì', time: '25/03/2026 10:00' },
    { label: 'P. Kế hoạch TH — Đã hoàn thành', sub: 'Nguyễn Văn A · Trưởng phòng KHTH', status: 'done', note: '✓ Hoàn thành · Đúng hạn', time: '27/03/2026 16:30' },
    { label: 'Hoàn thành & Lưu trữ', sub: 'Đóng hồ sơ, lưu trữ', status: 'done', note: '✓ Đã lưu vào hồ sơ công việc', time: '27/03/2026 16:30' },
  ],
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STATUS_LABEL: Record<VbStatus, string> = {
  'cho-chi-dao': 'Chờ chỉ đạo',
  'cho-dieu-phoi': 'Chờ điều phối',
  'cho-xu-ly': 'Chờ xử lý',
  'hoan-thanh': 'Hoàn thành',
}

const STATUS_CLS: Record<VbStatus, string> = {
  'cho-chi-dao': 'stag st-direct',
  'cho-dieu-phoi': 'stag st-coord',
  'cho-xu-ly': 'stag st-pending',
  'hoan-thanh': 'stag st-done',
}

const DOT_STYLE: Record<StepStatus, React.CSSProperties> = {
  done: { background: '#16a34a', color: '#fff', border: 'none' },
  active: { background: '#ea580c', color: '#fff', border: 'none' },
  pending: { background: '#fff', color: '#94a3b8', border: '2px solid #cbd5e1' },
}

const STATUS_COLOR: Record<StepStatus, string> = {
  done: '#16a34a', active: '#ea580c', pending: '#94a3b8',
}

// ─── Sub-components ───────────────────────────────────────────────────────────
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

// ─── Toolbar — đúng theo spec: Badge + Nút chính + Menu [...] ─────────────────
function Toolbar({ status, onAction }: {
  status: VbStatus
  onAction: (action: 'chi-dao' | 'dieu-phoi' | 'hoan-thanh' | 'chuyen-xu-ly' | 'uy-quyen' | 'tu-choi' | 'them-ho-so' | 'lich-su') => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  const primaryBtn = () => {
    if (status === 'cho-chi-dao') return <button className="dp-btn primary" onClick={() => onAction('chi-dao')}>Chỉ đạo ngay</button>
    if (status === 'cho-dieu-phoi') return <button className="dp-btn primary" onClick={() => onAction('dieu-phoi')}>Điều phối ngay</button>
    if (status === 'cho-xu-ly') return (
      <button className="dp-btn primary" style={{ background: '#16a34a', borderColor: '#16a34a' }} onClick={() => onAction('hoan-thanh')}>
        Hoàn thành xử lý
      </button>
    )
    if (status === 'hoan-thanh') return <button className="dp-btn primary" onClick={() => onAction('them-ho-so')}>Thêm vào hồ sơ</button>
    return null
  }

  const menuItems = () => {
    const base = [
      { key: 'uy-quyen' as const, label: 'Ủy quyền' },
      { key: 'tu-choi' as const, label: 'Từ chối', danger: true },
      { key: 'them-ho-so' as const, label: 'Thêm vào hồ sơ' },
      { key: 'lich-su' as const, label: 'Lịch sử văn bản' },
    ]
    if (status === 'cho-xu-ly') {
      return [
        { key: 'chuyen-xu-ly' as const, label: 'Chuyển tiếp xử lý' },
        { key: 'tao-vb-di' as const, label: 'Tạo văn bản đi' },
        ...base,
      ]
    }
    return base
  }

  return (
    <>
      <span className={STATUS_CLS[status]} style={{ fontSize: '.75rem' }}>{STATUS_LABEL[status]}</span>
      <span className="chip hot" style={{ fontSize: '.72rem' }}>🔴 Hỏa tốc</span>
      {status !== 'hoan-thanh' && (
        <span style={{ fontSize: '.78rem', color: '#b91c1c', fontWeight: 600 }}>⚠️ Hạn: 28/03/2026 · còn 3 ngày</span>
      )}
      {status === 'hoan-thanh' && (
        <span style={{ fontSize: '.78rem', color: '#16a34a', fontWeight: 600 }}>✅ Hoàn thành · 27/03/2026 · Đúng hạn</span>
      )}
      <div style={{ flex: 1 }} />
      {primaryBtn()}
      <div style={{ position: 'relative' }}>
        <button
          className="dp-btn"
          style={{ padding: '7px 12px', fontWeight: 700, letterSpacing: 2 }}
          onClick={() => setMenuOpen(v => !v)}
        >
          ···
        </button>
        {menuOpen && (
          <div
            style={{
              position: 'absolute', right: 0, top: '110%', background: '#fff',
              border: '1px solid var(--border)', borderRadius: 10,
              boxShadow: '0 6px 24px rgba(0,0,0,.13)', zIndex: 200,
              minWidth: 180, padding: '5px 0',
            }}
            onMouseLeave={() => setMenuOpen(false)}
          >
            {menuItems().map(item => (
              <div
                key={item.key}
                onClick={() => { setMenuOpen(false); if (item.key !== 'tao-vb-di') onAction(item.key as Parameters<typeof onAction>[0]) }}
                style={{
                  padding: '9px 16px', fontSize: '.82rem', cursor: 'pointer',
                  color: (item as { danger?: boolean }).danger ? '#dc2626' : 'var(--dark)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f5f6fa')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function S3ChiTiet() {
  const { goScreen, screenParams } = useNavigation()
  const status = (screenParams.status as VbStatus) ?? 'cho-chi-dao'

  const [selectedFile, setSelectedFile] = useState<FileItem>(FILES[0])
  const [tab, setTab] = useState<'info' | 'history'>('info')

  // Modal open states
  const [openChiDao, setOpenChiDao] = useState(false)
  const [openDieuPhoi, setOpenDieuPhoi] = useState(false)
  const [openUyQuyen, setOpenUyQuyen] = useState(false)
  const [openChuyenXuLy, setOpenChuyenXuLy] = useState(false)
  const [openHoanThanh, setOpenHoanThanh] = useState(false)

  const handleAction = (action: string) => {
    if (action === 'chi-dao') setOpenChiDao(true)
    else if (action === 'dieu-phoi') setOpenDieuPhoi(true)
    else if (action === 'hoan-thanh') setOpenHoanThanh(true)
    else if (action === 'chuyen-xu-ly') setOpenChuyenXuLy(true)
    else if (action === 'uy-quyen') setOpenUyQuyen(true)
  }

  const flowSteps = FLOW_STEPS[status]

  const breadcrumbSub = status === 'hoan-thanh'
    ? '45/CV-SYT · Hoàn thành'
    : status === 'cho-xu-ly'
      ? '45/CV-SYT · Chờ xử lý'
      : '45/CV-SYT · Sở Y tế TP.HCM'

  return (
    <div className="cw" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Topbar */}
      <Topbar breadcrumb={['Văn bản Đến', breadcrumbSub]} onNavClick={() => goScreen('s1')} />

      {/* Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
        borderBottom: '1px solid var(--border)', background: 'var(--surface)', flexShrink: 0,
      }}>
        <Toolbar status={status} onAction={handleAction} />
        <button className="dp-btn" style={{ marginLeft: 4 }} onClick={() => goScreen('s1')}>✕</button>
      </div>

      {/* Split-view body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ===== CỘT TRÁI ===== */}
        <div style={{
          width: 650, minWidth: 650, maxWidth: 650,
          borderRight: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Tiêu đề */}
          <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--dark)', lineHeight: 1.4 }}>
              V/v báo cáo tình hình thực hiện kế hoạch KCB quý I/2026
            </div>
          </div>

          {/* Banner trạng thái */}
          {status === 'hoan-thanh' && (
            <div style={{
              margin: '12px 20px 0', padding: '12px 16px', flexShrink: 0,
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

          {status === 'cho-xu-ly' && (
            <div style={{ padding: '12px 20px', background: '#fff7ed', borderBottom: '1px solid #fed7aa', flexShrink: 0 }}>
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

          {/* Tab bar: Thông tin | Lịch sử xử lý */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg)', flexShrink: 0 }}>
            {([
              { key: 'info' as const, label: '📋 Thông tin' },
              { key: 'history' as const, label: '🕐 Lịch sử xử lý' },
            ]).map(t => (
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
            <div style={{ overflowY: 'auto', flex: 1 }}>
              <div style={{ padding: '12px 20px' }}>
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
                    ['Hạn xử lý', '10/04/2026'],
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

              {/* Tệp đính kèm — luôn hiển thị dưới Thông tin */}
              <div style={{ borderTop: '1px solid var(--border)', padding: '14px 20px' }}>
                <div style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: 10 }}>
                  📎 Tệp
                </div>
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
            </div>
          )}

          {/* Tab: Lịch sử xử lý */}
          {tab === 'history' && (
            <div style={{ overflowY: 'auto', flex: 1 }}>
              <Timeline steps={flowSteps} />
            </div>
          )}
        </div>

        {/* ===== CỘT PHẢI — PDF Viewer ===== */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f1f3f7', overflow: 'hidden' }}>
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
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, overflowY: 'auto' }}>
            <div style={{
              width: '100%', maxWidth: 680, background: '#fff',
              boxShadow: '0 4px 24px rgba(0,0,0,.12)', borderRadius: 4,
              minHeight: 860, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', padding: 40, gap: 16,
            }}>
              <div style={{ fontSize: '3rem' }}>📄</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--dark)', textAlign: 'center' }}>{selectedFile.name}</div>
              <div style={{ fontSize: '.82rem', color: 'var(--text3)', textAlign: 'center', maxWidth: 340 }}>
                Trình xem PDF sẽ hiển thị nội dung tệp tại đây. Nhấp vào tên tệp ở cột trái để đổi tài liệu.
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 20px', fontSize: '.78rem', color: 'var(--text3)', marginTop: 8 }}>
                Kích thước: {selectedFile.size}&nbsp;·&nbsp;Loại: {selectedFile.name.endsWith('.xlsx') ? 'Excel' : 'PDF'}
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

      {/* ===== MODALS ===== */}
      <ModalChiDao
        open={openChiDao}
        onClose={() => setOpenChiDao(false)}
        onSubmit={() => { setOpenChiDao(false); goScreen('s3', { status: 'cho-dieu-phoi' }) }}
      />
      <ModalDieuPhoi
        open={openDieuPhoi}
        onClose={() => setOpenDieuPhoi(false)}
        onSubmit={() => { setOpenDieuPhoi(false); goScreen('s3', { status: 'cho-xu-ly' }) }}
      />
      <ModalUyQuyen
        open={openUyQuyen}
        onClose={() => setOpenUyQuyen(false)}
        onSubmit={() => setOpenUyQuyen(false)}
      />
      <ModalChuyenXuLy
        open={openChuyenXuLy}
        onClose={() => setOpenChuyenXuLy(false)}
        onSubmit={() => { setOpenChuyenXuLy(false); goScreen('s3', { status: 'cho-xu-ly' }) }}
      />
      <ModalHoanThanh
        open={openHoanThanh}
        onClose={() => setOpenHoanThanh(false)}
        onSubmit={() => { setOpenHoanThanh(false); goScreen('s3', { status: 'hoan-thanh' }) }}
      />
    </div>
  )
}
