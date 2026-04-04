import { useState } from 'react'
import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

type FileItem = { name: string; size: string; type: 'main' | 'attach' }

const FILES: FileItem[] = [
  { name: '45_CV_SYT_KCB_Q1_2026.pdf', size: '2.4 MB', type: 'main' },
  { name: 'Phu_luc_bao_cao.pdf', size: '850 KB', type: 'attach' },
  { name: 'Bang_tong_hop.xlsx', size: '120 KB', type: 'attach' },
]

type FlowStep = {
  label: string
  sub: string
  status: 'done' | 'active' | 'pending'
  note?: string
  time?: string
}
const FLOW_STEPS: FlowStep[] = [
  { label: 'Tiếp nhận & Đóng dấu đến', sub: 'Nguyễn Thị Văn Thư · Văn thư', status: 'done', note: 'Đã đóng dấu #47', time: '25/03/2026 lúc 08:15' },
  { label: 'Giám đốc — Ghi ý kiến chỉ đạo', sub: 'Lê Văn Giám Đốc · BGĐ', status: 'active', note: '⏳ Đang chờ · Hạn 28/03', time: 'Nhận lúc 08:15 · chưa xử lý' },
  { label: 'Đơn vị xử lý', sub: 'Chưa xác định · BGĐ sẽ chỉ định', status: 'pending', note: '— Chờ Giám đốc giao' },
  { label: 'Xử lý và phản hồi', sub: 'Chờ xác định', status: 'pending', note: '— Chưa bắt đầu' },
  { label: 'Hoàn thành & lưu trữ', sub: 'Đóng hồ sơ, lưu trữ', status: 'pending', note: '— Chưa bắt đầu' },
]

const DOT_STYLE: Record<'done' | 'active' | 'pending', React.CSSProperties> = {
  done: { background: '#16a34a', color: '#fff', border: 'none' },
  active: { background: '#ea580c', color: '#fff', border: 'none' },
  pending: { background: '#fff', color: '#94a3b8', border: '2px solid #cbd5e1' },
}
const STATUS_COLOR: Record<'done' | 'active' | 'pending', string> = {
  done: '#16a34a',
  active: '#ea580c',
  pending: '#94a3b8',
}

export default function S3ChiTiet() {
  const { goScreen } = useNavigation()
  const [selectedFile, setSelectedFile] = useState<FileItem>(FILES[0])
  const [tab, setTab] = useState<'info' | 'files'>('info')

  return (
    <div className="cw" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Topbar */}
      <Topbar
        breadcrumb={['Văn bản Đến', '45/CV-SYT · Sở Y tế TP.HCM']}
        onNavClick={() => goScreen('s1')}
      />

      {/* Toolbar hành động */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
        borderBottom: '1px solid var(--border)', background: 'var(--surface)', flexShrink: 0
      }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span className="stag st-direct" style={{ fontSize: '.75rem' }}>Chờ chỉ đạo</span>
          <span className="chip hot" style={{ fontSize: '.72rem' }}>🔴 Hỏa tốc</span>
          <span style={{ fontSize: '.78rem', color: '#b91c1c', fontWeight: 600 }}>⚠️ Hạn: 28/03/2026 · còn 3 ngày</span>
        </div>
        {/* Nút dynamic theo trạng thái "Chờ xử lý" */}
        <button className="dp-btn primary" onClick={() => goScreen('s4')}>✏️ Ghi ý kiến chỉ đạo</button>
        <button className="dp-btn">📎 Tải xuống</button>
        <button className="dp-btn" style={{ background: '#eff6ff', color: '#1d4ed8' }}>💾 Lưu hồ sơ</button>
        <button className="dp-btn danger">↩ Trả lại</button>
        <button className="dp-btn" style={{ marginLeft: 4 }} onClick={() => goScreen('s1')}>✕</button>
      </div>

      {/* Split-view body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ===== CỘT TRÁI ===== */}
        <div style={{
          width: 500, minWidth: 500, maxWidth: 500,
          borderRight: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto'
        }}>
          {/* Tiêu đề văn bản */}
          <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--dark)', lineHeight: 1.4, marginBottom: 8 }}>
              V/v báo cáo tình hình thực hiện kế hoạch KCB quý I/2026
            </div>
          </div>

          {/* Tab: Thông tin | Tệp đính kèm */}
          <div style={{
            display: 'flex', borderBottom: '1px solid var(--border)',
            background: 'var(--bg)', flexShrink: 0
          }}>
            {(['info', 'files'] as const).map(t => (
              <div
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1, textAlign: 'center', padding: '10px 0',
                  fontSize: '.8rem', fontWeight: 600, cursor: 'pointer',
                  color: tab === t ? 'var(--orange)' : 'var(--text3)',
                  borderBottom: tab === t ? '2px solid var(--orange)' : '2px solid transparent',
                }}
              >
                {t === 'info' ? '📋 Thông tin' : '📎 Tệp đính kèm'}
              </div>
            ))}
          </div>

          {/* Tab content */}
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
                    <div className="ir-v"
                      style={
                        l === 'Hạn xử lý' ? { color: '#b91c1c', fontWeight: 600 } :
                          l === 'Mức khẩn' ? { color: '#b91c1c' } :
                            l === 'Số đến' ? { fontWeight: 700, color: '#d94f1e' } : {}
                      }
                    >{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'files' && (
            <div style={{ padding: '12px 20px', flex: 1 }}>
              <div style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: 8 }}>
                Tệp chính
              </div>
              {FILES.filter(f => f.type === 'main').map(f => (
                <div
                  key={f.name}
                  onClick={() => setSelectedFile(f)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                    borderRadius: 8, cursor: 'pointer', marginBottom: 6,
                    border: `1px solid ${selectedFile.name === f.name ? 'var(--orange)' : 'var(--border)'}`,
                    background: selectedFile.name === f.name ? '#fff7ed' : '#fff',
                  }}
                >
                  <span style={{ fontSize: '1.3rem' }}>📄</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--dark)' }}>{f.name}</div>
                    <div style={{ fontSize: '.7rem', color: 'var(--text3)' }}>PDF · {f.size}</div>
                  </div>
                  <button style={{
                    border: 'none', background: 'transparent', cursor: 'pointer',
                    color: 'var(--text3)', fontSize: '.8rem'
                  }}>⬇</button>
                </div>
              ))}
              <div style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.7px', margin: '12px 0 8px' }}>
                Tệp đính kèm
              </div>
              {FILES.filter(f => f.type === 'attach').map(f => (
                <div
                  key={f.name}
                  onClick={() => setSelectedFile(f)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                    borderRadius: 8, cursor: 'pointer', marginBottom: 6,
                    border: `1px solid ${selectedFile.name === f.name ? 'var(--orange)' : 'var(--border)'}`,
                    background: selectedFile.name === f.name ? '#fff7ed' : '#fff',
                  }}
                >
                  <span style={{ fontSize: '1.3rem' }}>{f.name.endsWith('.xlsx') ? '📊' : '📄'}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--dark)' }}>{f.name}</div>
                    <div style={{ fontSize: '.7rem', color: 'var(--text3)' }}>{f.name.endsWith('.xlsx') ? 'Excel' : 'PDF'} · {f.size}</div>
                  </div>
                  <button style={{
                    border: 'none', background: 'transparent', cursor: 'pointer',
                    color: 'var(--text3)', fontSize: '.8rem'
                  }}>⬇</button>
                </div>
              ))}
            </div>
          )}

          {/* Timeline xử lý */}
          <div style={{ borderTop: '1px solid var(--border)', padding: '16px 20px' }}>
            <div style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: 12 }}>
              Lịch sử xử lý
            </div>
            {FLOW_STEPS.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < FLOW_STEPS.length - 1 ? 0 : 0 }}>
                {/* Dot + line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: '.65rem', fontWeight: 700,
                    ...DOT_STYLE[step.status]
                  }}>
                    {step.status === 'done' ? '✓' : step.status === 'active' ? '!' : '…'}
                  </div>
                  {i < FLOW_STEPS.length - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 20, background: step.status === 'done' ? '#16a34a' : '#e2e4ed', marginTop: 2, marginBottom: 2 }} />
                  )}
                </div>
                {/* Content */}
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
        </div>

        {/* ===== CỘT PHẢI — PDF Viewer ===== */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          background: '#f1f3f7', overflow: 'hidden'
        }}>
          {/* PDF toolbar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px',
            background: '#2d3142', color: '#fff', fontSize: '.78rem', flexShrink: 0
          }}>
            <span style={{ flex: 1, fontSize: '.8rem', fontWeight: 500, opacity: .9 }}>
              📄 {selectedFile.name}
            </span>
            <button style={{
              background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff',
              borderRadius: 4, padding: '3px 8px', cursor: 'pointer', fontSize: '.75rem'
            }}>🔍−</button>
            <span style={{ fontSize: '.75rem', opacity: .7 }}>100%</span>
            <button style={{
              background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff',
              borderRadius: 4, padding: '3px 8px', cursor: 'pointer', fontSize: '.75rem'
            }}>🔍+</button>
            <button style={{
              background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff',
              borderRadius: 4, padding: '4px 10px', cursor: 'pointer', fontSize: '.75rem'
            }}>⬇ Tải về</button>
          </div>

          {/* PDF content area */}
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24, overflowY: 'auto'
          }}>
            <div style={{
              width: '100%', maxWidth: 680,
              background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,.12)',
              borderRadius: 4, minHeight: 860,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', padding: 40, gap: 16
            }}>
              <div style={{ fontSize: '3rem' }}>📄</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--dark)', textAlign: 'center' }}>
                {selectedFile.name}
              </div>
              <div style={{ fontSize: '.82rem', color: 'var(--text3)', textAlign: 'center', maxWidth: 340 }}>
                Trình xem PDF sẽ hiển thị nội dung tệp tại đây.
                Nhấp vào tên tệp ở cột trái để đổi tài liệu.
              </div>
              <div style={{
                background: '#f8fafc', border: '1px solid var(--border)',
                borderRadius: 8, padding: '10px 20px', fontSize: '.78rem',
                color: 'var(--text3)', marginTop: 8
              }}>
                Kích thước: {selectedFile.size} &nbsp;·&nbsp;
                Loại: {selectedFile.name.endsWith('.xlsx') ? 'Excel' : 'PDF'}
              </div>
              {/* Simulated PDF lines */}
              <div style={{ width: '100%', marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} style={{
                    height: 10, borderRadius: 4, background: '#f1f5f9',
                    width: i % 3 === 2 ? '60%' : i % 2 === 0 ? '100%' : '85%'
                  }} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
