import { useState } from 'react'
import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import MoreMenu from '@/components/MoreMenu'

// ─── Types ────────────────────────────────────────────────────────────────────
interface FileItem { name: string; size: string; type: 'main' | 'attach' }
type ReviewStatus = 'done' | 'active' | 'pending'
interface Reviewer { name: string; role: string; av: string; status: ReviewStatus; time?: string; note?: string }

// ─── Static data ──────────────────────────────────────────────────────────────
const FILES: FileItem[] = [
  { name: 'BaoCao_KCB_Q1_2026.docx', size: '2.4 MB', type: 'main' },
  { name: 'Phu_luc_so_lieu.xlsx',    size: '420 KB', type: 'attach' },
]

const REVIEWERS: Reviewer[] = [
  { name: 'Nguyễn Văn Phó GĐ',       role: 'Phó Giám đốc · BGĐ',         av: 'PG', status: 'done',   time: '27/03 09:15', note: 'Nội dung đầy đủ, số liệu khớp.' },
  { name: 'Trần Thị Trưởng P.KHTH',  role: 'Trưởng phòng KHTH',           av: 'KH', status: 'done',   time: '27/03 10:30' },
  { name: 'Lê Thị Trưởng P.TCKT',    role: 'Trưởng phòng Tài chính KT',   av: 'TC', status: 'active' },
]

const DOT: Record<ReviewStatus, React.CSSProperties> = {
  done:    { background: '#16a34a', color: '#fff', border: 'none' },
  active:  { background: '#ea580c', color: '#fff', border: 'none' },
  pending: { background: '#fff',    color: '#94a3b8', border: '2px solid #cbd5e1' },
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function S10DuyetSongSong() {
  const { goScreen } = useNavigation()
  const { currentUser } = useCurrentUser()

  const [tab,          setTab]          = useState<'info' | 'progress'>('info')
  const [fileType,     setFileType]     = useState<'main' | 'attach'>('main')
  const [selectedFile, setSelectedFile] = useState<FileItem>(FILES[0])
  const [noteText,     setNoteText]     = useState('')

  const canReview   = currentUser.role === 'thu-ky' || currentUser.role === 'xu-ly'
  const doneCount   = REVIEWERS.filter(r => r.status === 'done').length
  const visibleFiles = FILES.filter(f => f.type === fileType)

  return (
    <div className="cw" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Topbar
        breadcrumb={['Văn bản Đi', 'Báo cáo KCB Q1/2026', 'Duyệt song song']}
        onNavClick={i => { if (i === 0) goScreen('s8') }}
      />

      {/* ── Toolbar ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: '1px solid var(--border)', background: 'var(--surface)', flexShrink: 0, flexWrap: 'wrap' }}>
        <span className="stag" style={{ background: '#fff7ed', color: '#c2410c' }}>Chờ duyệt song song</span>
        <span style={{ fontSize: '.75rem', color: '#1d4ed8', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 20, padding: '2px 10px', fontWeight: 600 }}>
          {doneCount}/{REVIEWERS.length} đã duyệt
        </span>
        <span style={{ fontSize: '.78rem', color: '#b91c1c', fontWeight: 600 }}>⚠️ Hạn: 28/03/2026</span>
        <div style={{ flex: 1 }} />
        {canReview ? (
          <>
            <button className="dp-btn" style={{ background: '#16a34a', color: '#fff', borderColor: '#16a34a' }} onClick={() => goScreen('s11')}>✓ Đồng ý duyệt</button>
            <button className="dp-btn" style={{ background: '#fef2f2', borderColor: '#fca5a5', color: '#b91c1c' }} onClick={() => goScreen('s8')}>✕ Từ chối</button>
            <button className="dp-btn">📝 Yêu cầu chỉnh sửa</button>
          </>
        ) : (
          <span style={{ fontSize: '.75rem', color: 'var(--text3)', padding: '6px 10px', border: '1px solid var(--border)', borderRadius: 6, background: '#f8fafc' }}>👁 Chỉ xem</span>
        )}
        <MoreMenu
          items={[
            { key: 'lich-su',   label: 'Lịch sử văn bản', icon: '📋' },
            { key: 'them-ho-so', label: 'Thêm vào hồ sơ', icon: '🗂', divider: true },
            { key: 'thu-hoi',   label: 'Thu hồi',          icon: '↩', danger: true, divider: true },
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
              <span className="chip s">Chờ duyệt</span>
              <span className="chip">BGĐ</span>
            </div>
          </div>

          {/* Tab bar */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg)', flexShrink: 0 }}>
            {([
              { key: 'info'     as const, label: '📋 Thông tin' },
              { key: 'progress' as const, label: '📊 Tiến độ duyệt' },
            ]).map(t => (
              <div key={t.key} onClick={() => setTab(t.key)} style={{
                flex: 1, textAlign: 'center', padding: '9px 0',
                fontSize: '.78rem', fontWeight: 600, cursor: 'pointer',
                color: tab === t.key ? 'var(--orange)' : 'var(--text3)',
                borderBottom: tab === t.key ? '2px solid var(--orange)' : '2px solid transparent',
              }}>{t.label}</div>
            ))}
          </div>

          {/* Tab: Thông tin */}
          {tab === 'info' && (
            <div style={{ overflowY: 'auto', flex: 1 }}>
              <div style={{ padding: '14px 18px' }}>
                <div className="info-section">
                  <div className="is-title">Thông tin văn bản</div>
                  {([
                    ['Loại VB',    'Báo cáo'],
                    ['Người soạn', 'Nguyễn Văn A · P. KHTH'],
                    ['Ngày soạn',  '27/03/2026'],
                    ['Trích yếu',  'V/v báo cáo công tác KCB Q1/2026'],
                    ['Hạn xử lý', '28/03/2026'],
                    ['Mức khẩn',   'Khẩn'],
                  ] as [string, string][]).map(([l, v]) => (
                    <div key={l} className="info-row">
                      <div className="ir-l">{l}</div>
                      <div className="ir-v" style={
                        l === 'Hạn xử lý' ? { color: '#b91c1c', fontWeight: 600 } :
                        l === 'Mức khẩn'  ? { color: '#c2410c' } : {}
                      }>{v}</div>
                    </div>
                  ))}
                </div>
                <div className="info-section">
                  <div className="is-title">Nơi nhận</div>
                  <div className="info-row">
                    <div className="ir-l">Đơn vị nhận</div>
                    <div className="ir-v">Sở Y tế TP.HCM</div>
                  </div>
                </div>

                {/* Action box — chỉ hiện khi canReview */}
                {canReview && (
                  <div style={{ marginTop: 16, border: '1.5px solid var(--orange)', borderRadius: 10, padding: '14px 16px', background: '#fff7ed' }}>
                    <div style={{ fontSize: '.72rem', fontWeight: 700, color: '#c2410c', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 10 }}>
                      Hành động của bạn
                    </div>
                    <textarea
                      value={noteText}
                      onChange={e => setNoteText(e.target.value)}
                      placeholder="Ghi chú hoặc yêu cầu chỉnh sửa (nếu có)..."
                      style={{ width: '100%', boxSizing: 'border-box', minHeight: 72, resize: 'none', fontSize: '.82rem', borderRadius: 6, marginBottom: 10 }}
                    />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-primary" style={{ flex: 1, background: '#1a7a45', borderColor: '#1a7a45' }} onClick={() => goScreen('s11')}>✓ Đồng ý</button>
                      <button className="btn" style={{ flex: 1, background: '#fef2f2', borderColor: '#fca5a5', color: '#b91c1c' }} onClick={() => goScreen('s8')}>✕ Từ chối</button>
                    </div>
                    <button className="btn btn-ghost" style={{ width: '100%', marginTop: 6 }}>📝 Yêu cầu chỉnh sửa</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab: Tiến độ duyệt */}
          {tab === 'progress' && (
            <div style={{ overflowY: 'auto', flex: 1, padding: '14px 18px' }}>
              {/* Progress bar */}
              <div style={{ background: '#f7f8fb', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 12px', marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.78rem', color: 'var(--text2)', marginBottom: 5 }}>
                  <span>Tiến độ duyệt song song</span>
                  <span style={{ fontWeight: 700, color: '#c2410c' }}>{doneCount}/{REVIEWERS.length}</span>
                </div>
                <div style={{ height: 6, background: '#f0f1f4', borderRadius: 3 }}>
                  <div style={{ height: 6, width: `${(doneCount / REVIEWERS.length) * 100}%`, background: '#f59e0b', borderRadius: 3, transition: 'width .3s' }} />
                </div>
                <div style={{ fontSize: '.7rem', color: '#92400e', marginTop: 4 }}>
                  Chờ {REVIEWERS.length - doneCount} người nữa để chuyển Trình ký
                </div>
              </div>

              {/* Reviewers timeline */}
              <div style={{ fontSize: '.7rem', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: 10 }}>
                Danh sách người duyệt
              </div>
              {REVIEWERS.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '.6rem', fontWeight: 700, ...DOT[r.status],
                    }}>
                      {r.status === 'done' ? '✓' : r.status === 'active' ? '⏳' : '…'}
                    </div>
                    {i < REVIEWERS.length - 1 && (
                      <div style={{ width: 1, flex: 1, background: r.status === 'done' ? '#86efac' : '#e2e8f0', marginTop: 4 }} />
                    )}
                  </div>
                  <div style={{ flex: 1, paddingBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: r.status === 'done' ? '#dcfce7' : r.status === 'active' ? '#ffedd5' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.62rem', fontWeight: 700, color: r.status === 'done' ? '#15803d' : r.status === 'active' ? '#c2410c' : '#94a3b8', flexShrink: 0 }}>
                        {r.av}
                      </div>
                      <div style={{ fontSize: '.78rem', fontWeight: 600, color: 'var(--dark)' }}>{r.name}</div>
                      {r.time && <span style={{ marginLeft: 'auto', fontSize: '.68rem', color: 'var(--text3)' }}>{r.time}</span>}
                    </div>
                    <div style={{ fontSize: '.72rem', color: 'var(--text3)', paddingLeft: 30 }}>{r.role}</div>
                    {r.note && (
                      <div style={{ marginTop: 4, marginLeft: 30, fontSize: '.72rem', color: '#374151', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 6, padding: '6px 8px' }}>
                        "{r.note}"
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
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
                color: fileType === t.key ? 'var(--orange)' : 'var(--text3)',
                borderBottom: fileType === t.key ? '2px solid var(--orange)' : '2px solid transparent',
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
                  border: `1px solid ${active ? 'var(--orange)' : 'var(--border)'}`,
                  background: active ? '#fff7ed' : '#fafbfc',
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
              <button style={{ background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', borderRadius: 4, padding: '3px 8px', cursor: 'pointer', fontSize: '.7rem' }}>🔍−</button>
              <span style={{ fontSize: '.7rem', opacity: .7 }}>100%</span>
              <button style={{ background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', borderRadius: 4, padding: '3px 8px', cursor: 'pointer', fontSize: '.7rem' }}>🔍+</button>
              <button style={{ background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', fontSize: '.7rem' }}>⬇ Tải về</button>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 20, overflowY: 'auto' }}>
              <div style={{ width: '100%', maxWidth: 540, background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,.12)', borderRadius: 4, minHeight: 560, padding: '32px 36px' }}>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: '.65rem', color: '#555', fontWeight: 600, textTransform: 'uppercase', letterSpacing: .5 }}>BỆNH VIỆN ĐA KHOA TỈNH</div>
                  <div style={{ fontSize: '.68rem', color: '#777', marginTop: 3 }}>Số: <em>Chưa cấp</em></div>
                </div>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <div style={{ fontSize: '.8rem', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase' }}>BÁO CÁO CÔNG TÁC KCB QUÝ I/2026</div>
                </div>
                {[80, 95, 70, 88, 60, 75, 90, 50, 85, 65, 78, 55].map((w, i) => (
                  <div key={i} style={{ height: 7, background: '#f1f5f9', borderRadius: 3, marginBottom: 8, width: `${w}%` }} />
                ))}
                <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ textAlign: 'center', minWidth: 150 }}>
                    <div style={{ fontSize: '.7rem', color: '#555', fontStyle: 'italic' }}>TP.HCM, 27/03/2026</div>
                    <div style={{ fontSize: '.75rem', fontWeight: 700, marginTop: 4 }}>GIÁM ĐỐC</div>
                    <div style={{ height: 36 }} />
                    <div style={{ fontSize: '.76rem', fontWeight: 700, borderTop: '1px solid #ccc', paddingTop: 5 }}>Lê Văn Giám Đốc</div>
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
