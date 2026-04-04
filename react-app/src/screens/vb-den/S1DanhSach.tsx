import { useState } from 'react'
import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

type VbStatus = 'cho-chi-dao' | 'cho-dieu-phoi' | 'cho-xu-ly' | 'dang-xu-ly' | 'hoan-thanh' | 'qua-han'

interface VanBan {
  id: number
  soKyHieu: string
  trichYeu: string
  loaiVB: string
  ngayVB: string
  ngayDen: string
  hanXuLy: string
  donViBanHanh: string
  status: VbStatus
  isOverdue?: boolean
}

const DATA: VanBan[] = [
  { id: 47, soKyHieu: '45/CV-SYT', trichYeu: 'V/v báo cáo tình hình thực hiện kế hoạch KCB quý I/2026', loaiVB: 'Công văn', ngayVB: '24/03/2026', ngayDen: '25/03/2026 08:15', hanXuLy: '28/03/2026', donViBanHanh: 'Sở Y tế TP.HCM', status: 'cho-chi-dao', isOverdue: true },
  { id: 46, soKyHieu: '12/TB-BHXH', trichYeu: 'Thông báo lịch kiểm tra công tác BHYT năm 2026', loaiVB: 'Thông báo', ngayVB: '23/03/2026', ngayDen: '23/03/2026 14:00', hanXuLy: '25/03/2026', donViBanHanh: 'BHXH TP.HCM', status: 'cho-dieu-phoi', isOverdue: true },
  { id: 45, soKyHieu: '08/KH-STTTT', trichYeu: 'Kế hoạch triển khai hệ thống HIS giai đoạn 2', loaiVB: 'Kế hoạch', ngayVB: '22/03/2026', ngayDen: '22/03/2026 09:30', hanXuLy: '01/04/2026', donViBanHanh: 'Sở TT&TT', status: 'cho-xu-ly' },
  { id: 44, soKyHieu: '156/QĐ-BYT', trichYeu: 'Quyết định về việc điều chỉnh định mức thuốc', loaiVB: 'Quyết định', ngayVB: '20/03/2026', ngayDen: '21/03/2026 10:00', hanXuLy: '10/04/2026', donViBanHanh: 'Bộ Y tế', status: 'hoan-thanh' },
  { id: 43, soKyHieu: '89/CV-CDC', trichYeu: 'Công văn hướng dẫn phòng chống dịch mùa hè 2026', loaiVB: 'Công văn', ngayVB: '18/03/2026', ngayDen: '19/03/2026 15:45', hanXuLy: '20/03/2026', donViBanHanh: 'CDC TP.HCM', status: 'qua-han', isOverdue: true },
]

const STATUS_CONFIG: Record<VbStatus, { label: string; cls: string; actionLabel: string; actionCls: string }> = {
  'cho-chi-dao': { label: 'Chờ chỉ đạo', cls: 'stag st-direct', actionLabel: 'Chỉ đạo ngay', actionCls: 'ra ra-warn' },
  'cho-dieu-phoi': { label: 'Chờ điều phối', cls: 'stag st-coord', actionLabel: 'Điều phối ngay', actionCls: 'ra ra-warn' },
  'cho-xu-ly': { label: 'Chờ xử lý', cls: 'stag st-pending', actionLabel: 'Xử lý ngay', actionCls: 'ra ra-p' },
  'dang-xu-ly': { label: 'Đang xử lý', cls: 'stag st-process', actionLabel: 'Xem tiến độ', actionCls: 'ra ra-p' },
  'hoan-thanh': { label: 'Hoàn thành', cls: 'stag st-done', actionLabel: 'Xem', actionCls: 'ra ra-g' },
  'qua-han': { label: 'Quá hạn', cls: 'stag st-overdue', actionLabel: 'Xử lý khẩn', actionCls: 'ra ra-danger' },
}

export default function S1DanhSach() {
  const { goScreen } = useNavigation()
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const [allChecked, setAllChecked] = useState(false)
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const [pageSize, setPageSize] = useState(10)

  const toggleAll = () => {
    if (allChecked) {
      setChecked(new Set())
    } else {
      setChecked(new Set(DATA.map(d => d.id)))
    }
    setAllChecked(!allChecked)
  }

  const toggleOne = (id: number) => {
    const next = new Set(checked)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setChecked(next)
    setAllChecked(next.size === DATA.length)
  }

  const hasChecked = checked.size > 0

  return (
    <div className="cw">
      <Topbar breadcrumb={['Văn phòng số', 'Văn bản đến', 'Văn bản đến chờ xử lý']} />

      {/* Stat strip */}
      <div className="stat-strip">
        <div className="si on"><div className="si-num">47</div><div className="si-lbl">Tổng văn bản đến</div></div>
        <div className="si"><div className="si-num" style={{ color: '#1d4ed8' }}>8</div><div className="si-lbl">Mới tiếp nhận</div></div>
        <div className="si"><div className="si-num" style={{ color: '#c2410c' }}>14</div><div className="si-lbl">Đang xử lý</div></div>
        <div className="si"><div className="si-num" style={{ color: '#b91c1c' }}>3</div><div className="si-lbl">Quá hạn</div></div>
        <div className="si"><div className="si-num" style={{ color: '#1a7a45' }}>22</div><div className="si-lbl">Hoàn thành</div></div>
      </div>

      {/* Filter bar */}
      <div className="fbar">
        <div className="sw">
          <span className="sw-ico">🔍</span>
          <input placeholder="Tìm theo tên, số đến, nơi gửi..." />
        </div>
        <select className="fsel">
          <option>Tất cả trạng thái</option>
          <option>Chờ chỉ đạo</option>
          <option>Chờ điều phối</option>
          <option>Chờ xử lý</option>
          <option>Đang xử lý</option>
          <option>Hoàn thành</option>
          <option>Quá hạn</option>
        </select>
        <input type="date" className="fsel" style={{ color: '#3a3f52' }} title="Từ ngày" />
        <input type="date" className="fsel" style={{ color: '#3a3f52' }} title="Đến ngày" />

        {/* Lưu hồ sơ — chỉ hiện khi có checkbox tick */}
        {hasChecked && (
          <button className="fbtn" style={{ background: '#1d4ed8', color: '#fff' }}>
            💾 Lưu hồ sơ ({checked.size})
          </button>
        )}
        <button className="fbtn primary" onClick={() => goScreen('s2')}>
          + Tiếp nhận văn bản đến
        </button>
      </div>

      {/* Table */}
      <div className="work-area">
        <div className="content-pane">
          <table className="ltable">
            <thead>
              <tr>
                <th style={{ width: 32 }}>
                  <input type="checkbox" checked={allChecked} onChange={toggleAll} />
                </th>
                <th style={{ width: 40 }}>STT</th>
                <th style={{ width: 64 }}>Số đến</th>
                <th>Trích yếu</th>
                <th style={{ width: 120 }}>Số ký hiệu</th>
                <th style={{ width: 88 }}>Loại VB</th>
                <th style={{ width: 96 }}>Ngày VB</th>
                <th style={{ width: 130 }}>Ngày đến</th>
                <th style={{ width: 96 }}>Hạn xử lý</th>
                <th style={{ width: 140 }}>Đơn vị ban hành</th>
                <th style={{ width: 110 }}>Trạng thái</th>
                <th style={{ width: 160 }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {DATA.map((row, idx) => {
                const cfg = STATUS_CONFIG[row.status]
                return (
                  <tr
                    key={row.id}
                    className={checked.has(row.id) ? 'selected' : ''}
                    onClick={() => goScreen('s3', { status: row.status })}
                    style={{ cursor: 'pointer' }}
                  >
                    <td onClick={e => { e.stopPropagation(); toggleOne(row.id) }}>
                      <input type="checkbox" checked={checked.has(row.id)} onChange={() => toggleOne(row.id)} />
                    </td>
                    <td style={{ textAlign: 'center', color: 'var(--text3)', fontSize: '.82rem' }}>{idx + 1}</td>
                    <td style={{ fontWeight: 700, color: '#d94f1e', fontSize: '.9rem' }}>#{row.id}</td>
                    <td>
                      <div style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--dark)', lineHeight: 1.35 }}>{row.trichYeu}</div>
                    </td>
                    <td style={{ fontSize: '.8rem', fontFamily: 'monospace', fontWeight: 600 }}>{row.soKyHieu}</td>
                    <td style={{ fontSize: '.78rem', color: 'var(--text2)' }}>{row.loaiVB}</td>
                    <td style={{ fontSize: '.8rem', color: 'var(--text2)' }}>{row.ngayVB}</td>
                    <td style={{ fontSize: '.78rem', color: 'var(--text2)' }}>{row.ngayDen}</td>
                    <td style={{ fontSize: '.8rem', color: row.isOverdue ? '#b91c1c' : '#1a7a45', fontWeight: row.isOverdue ? 700 : 400 }}>
                      {row.hanXuLy}{row.isOverdue ? ' ⚠️' : ''}
                    </td>
                    <td style={{ fontSize: '.78rem' }}>{row.donViBanHanh}</td>
                    <td><span className={cfg.cls}>{cfg.label}</span></td>
                    <td onClick={e => e.stopPropagation()}>
                      <div className="row-act" style={{ position: 'relative', justifyContent: 'space-between' }}>
                        <button className={cfg.actionCls} onClick={() => goScreen('s3', { status: row.status })}>
                          {cfg.actionLabel}
                        </button>
                        <div style={{ position: 'relative' }}>
                          <button
                            className="ra ra-m"
                            onClick={() => setOpenMenu(openMenu === row.id ? null : row.id)}
                          >···</button>
                          {openMenu === row.id && (
                            <div style={{
                              position: 'absolute', right: 0, top: '100%', background: '#fff',
                              border: '1px solid var(--border)', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,.12)',
                              zIndex: 100, minWidth: 140, padding: '4px 0'
                            }}>
                              {['Ủy quyền', 'Chuyển xử lý', 'Từ chối', 'Thêm vào hồ sơ'].map(act => (
                                <div
                                  key={act}
                                  style={{ padding: '8px 16px', fontSize: '.82rem', cursor: 'pointer', color: 'var(--dark)' }}
                                  onMouseEnter={e => (e.currentTarget.style.background = '#f5f6fa')}
                                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                  onClick={() => setOpenMenu(null)}
                                >
                                  {act}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Phân trang */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 4px', fontSize: '.82rem', color: 'var(--text3)' }}>
            <div>Hiển thị 1–{Math.min(pageSize, DATA.length)} trong tổng số <strong>{DATA.length}</strong> văn bản</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>Số bản ghi/trang:</span>
              <select
                className="fsel"
                style={{ padding: '4px 8px', fontSize: '.82rem' }}
                value={pageSize}
                onChange={e => setPageSize(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <button className="ra ra-m" style={{ padding: '4px 10px' }}>‹</button>
              <span style={{ fontWeight: 600, color: 'var(--dark)' }}>1</span>
              <button className="ra ra-m" style={{ padding: '4px 10px' }}>›</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
