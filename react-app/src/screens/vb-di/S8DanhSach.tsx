import { useState, useMemo } from 'react'
import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import MoreMenu from '@/components/MoreMenu'
import type { MoreMenuItem } from '@/components/MoreMenu'

// ─── Types ────────────────────────────────────────────────────────────────────
type DiStatus = 'dang-soan' | 'cho-duyet' | 'cho-ky' | 'cho-ban-hanh' | 'da-ban-hanh'

interface VanBanDi {
  id: number
  ten: string
  trichYeu: string
  loaiVB: string
  nguoiSoan: string
  phongBan: string
  ngaySoan: string
  han: string
  soKyHieu: string
  status: DiStatus
  nguoiKy?: string
  // IDs người trong luồng; van-thu không cần — thấy tất cả
  participants: string[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const DATA: VanBanDi[] = [
  {
    // nguyen-van-a soạn → tran-thi-tk duyệt → le-van-gd ký
    id: 1,
    ten: 'Báo cáo công tác KCB quý I/2026',
    trichYeu: 'V/v báo cáo tình hình thực hiện kế hoạch khám chữa bệnh quý I/2026',
    loaiVB: 'Báo cáo', nguoiSoan: 'Nguyễn Văn A', phongBan: 'P. KHTH',
    ngaySoan: '27/03/2026', han: '28/03/2026', soKyHieu: '',
    status: 'cho-duyet',
    participants: ['nguyen-van-a', 'tran-thi-tk', 'le-van-gd', 'nguyen-thi-vt'],
  },
  {
    // tran-thi-c soạn → tran-thi-tk duyệt → le-van-gd ký
    id: 2,
    ten: 'Công văn đề nghị cung cấp vật tư y tế',
    trichYeu: 'V/v đề nghị cung cấp vật tư y tế tiêu hao quý II/2026',
    loaiVB: 'Công văn', nguoiSoan: 'Trần Thị C', phongBan: 'P. HCNS',
    ngaySoan: '26/03/2026', han: '30/03/2026', soKyHieu: '',
    status: 'cho-ky', nguoiKy: 'Lê Văn Giám Đốc',
    participants: ['tran-thi-c', 'tran-thi-tk', 'le-van-gd', 'nguyen-thi-vt'],
  },
  {
    // pham-van-cu soạn → tran-thi-tk duyệt → le-van-gd ký → chờ ban hành
    id: 3,
    ten: 'Quyết định thành lập tổ công tác phòng chống dịch',
    trichYeu: 'V/v thành lập tổ công tác phòng chống dịch bệnh mùa hè 2026',
    loaiVB: 'Quyết định', nguoiSoan: 'Phạm Văn Xử Lý', phongBan: 'P. CNTT',
    ngaySoan: '25/03/2026', han: '31/03/2026', soKyHieu: '',
    status: 'cho-ban-hanh', nguoiKy: 'Lê Văn Giám Đốc',
    participants: ['pham-van-cu', 'tran-thi-tk', 'le-van-gd', 'nguyen-thi-vt'],
  },
  {
    // nguyen-thi-vt soạn & ban hành
    id: 4,
    ten: 'Thông báo lịch họp giao ban tháng 4/2026',
    trichYeu: 'V/v thông báo lịch họp giao ban tháng 4/2026',
    loaiVB: 'Thông báo', nguoiSoan: 'Nguyễn Thị Văn Thư', phongBan: 'Văn phòng',
    ngaySoan: '24/03/2026', han: '25/03/2026', soKyHieu: '47/TB-BV',
    status: 'da-ban-hanh', nguoiKy: 'Lê Văn Giám Đốc',
    participants: ['nguyen-thi-vt', 'tran-thi-tk', 'le-van-gd'],
  },
  {
    // nguyen-van-a soạn → đã ban hành
    id: 5,
    ten: 'Công văn phản hồi kết quả kiểm tra BHYT',
    trichYeu: 'V/v phản hồi kết quả kiểm tra công tác BHYT năm 2025',
    loaiVB: 'Công văn', nguoiSoan: 'Nguyễn Văn A', phongBan: 'P. KHTH',
    ngaySoan: '20/03/2026', han: '22/03/2026', soKyHieu: '46/CV-BV',
    status: 'da-ban-hanh', nguoiKy: 'Lê Văn Giám Đốc',
    participants: ['nguyen-van-a', 'tran-thi-tk', 'le-van-gd', 'nguyen-thi-vt'],
  },
  {
    // pham-van-cu đang soạn, chưa gửi duyệt
    id: 6,
    ten: 'Tờ trình xin chủ trương nâng cấp hệ thống HIS',
    trichYeu: 'V/v trình xin chủ trương nâng cấp hệ thống thông tin bệnh viện giai đoạn 2026-2028',
    loaiVB: 'Tờ trình', nguoiSoan: 'Phạm Văn Xử Lý', phongBan: 'P. CNTT',
    ngaySoan: '22/03/2026', han: '01/04/2026', soKyHieu: '',
    status: 'dang-soan',
    participants: ['pham-van-cu'],
  },
  {
    // tran-thi-c soạn báo cáo tài chính → chờ duyệt
    id: 7,
    ten: 'Báo cáo tài chính quý I/2026',
    trichYeu: 'V/v báo cáo tình hình tài chính quý I năm 2026',
    loaiVB: 'Báo cáo', nguoiSoan: 'Trần Thị C', phongBan: 'P. TCKT',
    ngaySoan: '28/03/2026', han: '05/04/2026', soKyHieu: '',
    status: 'cho-duyet',
    participants: ['tran-thi-c', 'tran-thi-tk', 'le-van-gd', 'nguyen-thi-vt'],
  },
  {
    // tran-thi-c soạn CV tăng lương → đã ban hành
    id: 8,
    ten: 'Công văn đề xuất tăng lương cơ sở nhân viên',
    trichYeu: 'V/v đề xuất điều chỉnh lương theo Nghị định 73/2024/NĐ-CP',
    loaiVB: 'Công văn', nguoiSoan: 'Trần Thị C', phongBan: 'P. HCNS',
    ngaySoan: '15/03/2026', han: '20/03/2026', soKyHieu: '44/CV-BV',
    status: 'da-ban-hanh', nguoiKy: 'Lê Văn Giám Đốc',
    participants: ['tran-thi-c', 'tran-thi-tk', 'le-van-gd', 'nguyen-thi-vt'],
  },
]

// ─── Status config ─────────────────────────────────────────────────────────────
const STATUS_CFG: Record<DiStatus, { label: string; color: string; bg: string; border: string }> = {
  'dang-soan':    { label: 'Đang soạn',         color: '#6b7280', bg: '#f9fafb',  border: '#e5e7eb' },
  'cho-duyet':    { label: 'Chờ duyệt',          color: '#c2410c', bg: '#fff7ed',  border: '#fed7aa' },
  'cho-ky':       { label: 'Chờ ký số',          color: '#1d4ed8', bg: '#eff6ff',  border: '#bfdbfe' },
  'cho-ban-hanh': { label: 'Chờ ban hành',       color: '#059669', bg: '#f0fdf4',  border: '#bbf7d0' },
  'da-ban-hanh':  { label: 'Đã ban hành',        color: '#15803d', bg: '#dcfce7',  border: '#86efac' },
}

// ─── Role visibility ───────────────────────────────────────────────────────────
// van-thu: thấy tất cả
// giam-doc: chỉ thấy chờ ký
// thu-ky/xu-ly: chỉ thấy chờ duyệt + đang soạn
const ROLE_STATUSES: Record<string, DiStatus[]> = {
  'van-thu':  ['dang-soan', 'cho-duyet', 'cho-ky', 'cho-ban-hanh', 'da-ban-hanh'],
  'giam-doc': ['cho-ky', 'da-ban-hanh'],
  'thu-ky':   ['cho-duyet', 'dang-soan', 'da-ban-hanh'],
  'xu-ly':    ['dang-soan', 'cho-duyet', 'da-ban-hanh'],
}

// Role → primary action per status
const STATUS_PRIMARY_ROLE: Partial<Record<DiStatus, string>> = {
  'dang-soan':    'xu-ly',       // người soạn tiếp tục → s9
  'cho-duyet':    'thu-ky',      // thu ký duyệt → s10
  'cho-ky':       'giam-doc',    // giám đốc ký → s11
  'cho-ban-hanh': 'van-thu',     // văn thư cấp số → s12
}

const STATUS_ACTION_LABEL: Partial<Record<DiStatus, string>> = {
  'dang-soan':    'Tiếp tục soạn',
  'cho-duyet':    'Duyệt ngay',
  'cho-ky':       'Ký số ngay',
  'cho-ban-hanh': 'Cấp số & Ban hành',
  'da-ban-hanh':  'Xem',
}

const STATUS_NAV: Record<DiStatus, string> = {
  'dang-soan':    's9',
  'cho-duyet':    's10',
  'cho-ky':       's11',
  'cho-ban-hanh': 's12',
  'da-ban-hanh':  's11',  // xem chi tiết văn bản đã ban hành
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function S8DanhSach() {
  const { goScreen } = useNavigation()
  const { currentUser } = useCurrentUser()

  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<DiStatus | 'all'>('all')
  const [filterLoai, setFilterLoai] = useState('all')
  const [checked,    setChecked]    = useState<Set<number>>(new Set())
  const [allChecked, setAllChecked] = useState(false)
  const [pageSize,   setPageSize]   = useState(10)

  const allowedStatuses = ROLE_STATUSES[currentUser.role] ?? ROLE_STATUSES['van-thu']

  const visibleData = useMemo(() => {
    return DATA.filter(row => {
      if (!allowedStatuses.includes(row.status)) return false
      // van-thu thấy tất cả; các role khác chỉ thấy VB mình tham gia
      if (currentUser.role !== 'van-thu' && !row.participants.includes(currentUser.id)) return false
      if (filterStatus !== 'all' && row.status !== filterStatus) return false
      if (filterLoai !== 'all' && row.loaiVB !== filterLoai) return false
      if (search && !row.ten.toLowerCase().includes(search.toLowerCase()) &&
          !row.soKyHieu.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [allowedStatuses, currentUser.id, currentUser.role, filterStatus, filterLoai, search])

  const counts = useMemo(() => {
    const c: Partial<Record<DiStatus | 'total', number>> = { total: 0 }
    DATA.filter(r => allowedStatuses.includes(r.status)).forEach(r => {
      c[r.status] = (c[r.status] ?? 0) + 1
      c.total = (c.total ?? 0) + 1
    })
    return c
  }, [allowedStatuses])

  const toggleAll = () => {
    if (allChecked) { setChecked(new Set()); setAllChecked(false) }
    else { setChecked(new Set(visibleData.map(r => r.id))); setAllChecked(true) }
  }

  const toggleOne = (id: number) => {
    const next = new Set(checked)
    if (next.has(id)) next.delete(id); else next.add(id)
    setChecked(next)
    setAllChecked(next.size === visibleData.length && visibleData.length > 0)
  }

  // kind:
  //  'published' → đã ban hành: primary = Thêm vào hồ sơ, secondary = 👁 Xem
  //  'mine'      → user là người thực hiện bước này: primary action button
  //  'watch'     → user không có action ở bước này: chỉ xem
  const getRowAction = (row: VanBanDi) => {
    const nav   = STATUS_NAV[row.status]
    const viewParams = { readOnly: true }

    if (row.status === 'da-ban-hanh') {
      return { kind: 'published' as const, nav, viewParams }
    }

    const primaryRole = STATUS_PRIMARY_ROLE[row.status]
    const isMine = !primaryRole || primaryRole === currentUser.role
    return {
      kind: isMine ? 'mine' as const : 'watch' as const,
      label: STATUS_ACTION_LABEL[row.status] ?? 'Xem',
      nav,
      params: {} as Record<string, unknown>,
    }
  }

  const LOAI_OPTIONS = ['Báo cáo', 'Công văn', 'Quyết định', 'Thông báo', 'Tờ trình']

  return (
    <div className="cw">
      <Topbar breadcrumb={['Văn phòng số', 'Văn bản Đi']} />

      {/* Stat strip */}
      <div className="stat-strip">
        <div className={`si${filterStatus === 'all' ? ' on' : ''}`} onClick={() => setFilterStatus('all')} style={{ cursor: 'pointer' }}>
          <div className="si-num">{counts.total ?? 0}</div>
          <div className="si-lbl">Tổng văn bản đi</div>
        </div>
        {allowedStatuses.filter(s => s !== 'da-ban-hanh').map(s => {
          const cfg = STATUS_CFG[s]
          return (
            <div key={s} className={`si${filterStatus === s ? ' on' : ''}`} onClick={() => setFilterStatus(filterStatus === s ? 'all' : s)} style={{ cursor: 'pointer' }}>
              <div className="si-num" style={{ color: cfg.color }}>{counts[s] ?? 0}</div>
              <div className="si-lbl">{cfg.label}</div>
            </div>
          )
        })}
        <div className={`si${filterStatus === 'da-ban-hanh' ? ' on' : ''}`} onClick={() => setFilterStatus(filterStatus === 'da-ban-hanh' ? 'all' : 'da-ban-hanh')} style={{ cursor: 'pointer' }}>
          <div className="si-num" style={{ color: '#15803d' }}>{counts['da-ban-hanh'] ?? 0}</div>
          <div className="si-lbl">Đã ban hành</div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="fbar">
        <div className="sw">
          <span className="sw-ico">🔍</span>
          <input
            placeholder="Tìm tên VB, số ký hiệu..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="fsel" value={filterLoai} onChange={e => setFilterLoai(e.target.value)}>
          <option value="all">Tất cả loại VB</option>
          {LOAI_OPTIONS.map(l => <option key={l}>{l}</option>)}
        </select>
        <select className="fsel" value={filterStatus} onChange={e => setFilterStatus(e.target.value as DiStatus | 'all')}>
          <option value="all">Tất cả trạng thái</option>
          {allowedStatuses.map(s => (
            <option key={s} value={s}>{STATUS_CFG[s].label}</option>
          ))}
        </select>
        {checked.size > 0 && currentUser.role === 'van-thu' && (
          <button className="fbtn" style={{ background: '#1d4ed8', color: '#fff' }}>
            💾 Lưu hồ sơ ({checked.size})
          </button>
        )}
        {(currentUser.role === 'van-thu' || currentUser.role === 'xu-ly') && (
          <button className="fbtn primary" onClick={() => goScreen('s9')}>+ Soạn VB mới</button>
        )}
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
                <th style={{ width: 64 }}>Số VB</th>
                <th>Tên văn bản</th>
                <th style={{ width: 118 }}>Số ký hiệu</th>
                <th style={{ width: 88 }}>Loại</th>
                <th style={{ width: 120 }}>Người soạn</th>
                <th style={{ width: 96 }}>Hạn</th>
                <th style={{ width: 118 }}>Trạng thái</th>
                <th style={{ width: 190 }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {visibleData.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text3)', fontSize: '.85rem' }}>
                    Không có văn bản nào phù hợp
                  </td>
                </tr>
              ) : visibleData.map((row, idx) => {
                const cfg = STATUS_CFG[row.status]
                const act = getRowAction(row)
                const rowNav = act.kind === 'published'
                  ? () => goScreen(act.nav, act.viewParams)
                  : () => goScreen(act.nav, act.kind === 'watch' ? { readOnly: true } : (act.params ?? {}))
                const isOverdue = ['cho-duyet', 'cho-ky', 'dang-soan'].includes(row.status) && row.han <= '31/03/2026'

                return (
                  <tr
                    key={row.id}
                    className={checked.has(row.id) ? 'selected' : ''}
                    onClick={rowNav}
                    style={{ cursor: 'pointer' }}
                  >
                    <td onClick={e => { e.stopPropagation(); toggleOne(row.id) }}>
                      <input type="checkbox" checked={checked.has(row.id)} onChange={() => toggleOne(row.id)} />
                    </td>
                    <td style={{ textAlign: 'center', color: 'var(--text3)', fontSize: '.82rem' }}>{idx + 1}</td>
                    <td style={{ fontWeight: 700, color: '#d94f1e', fontSize: '.9rem' }}>#{row.id}</td>
                    <td>
                      <div style={{ minWidth: 200, fontSize: '.82rem', fontWeight: 600, color: 'var(--dark)', lineHeight: 1.35 }}>{row.ten}</div>
                      <div style={{ fontSize: '.72rem', color: 'var(--text3)', marginTop: 2, lineHeight: 1.3 }}>{row.trichYeu}</div>
                    </td>
                    <td style={{ fontSize: '.8rem', fontFamily: 'monospace', fontWeight: row.soKyHieu ? 700 : 400, color: row.soKyHieu ? '#15803d' : '#9aa0b4', fontStyle: row.soKyHieu ? 'normal' : 'italic' }}>
                      {row.soKyHieu || 'Chưa cấp'}
                    </td>
                    <td style={{ fontSize: '.78rem', color: 'var(--text2)' }}>{row.loaiVB}</td>
                    <td style={{ fontSize: '.78rem', color: 'var(--text2)' }}>{row.nguoiSoan}</td>
                    <td style={{ fontSize: '.8rem', color: isOverdue ? '#b91c1c' : '#1a7a45', fontWeight: isOverdue ? 700 : 400 }}>
                      {row.han}{isOverdue ? ' ⚠️' : ''}
                    </td>
                    <td><span className={`stag${row.status === 'da-ban-hanh' ? ' st-done' : row.status === 'cho-duyet' ? ' st-coord' : row.status === 'cho-ky' ? ' st-direct' : row.status === 'dang-soan' ? ' st-draft' : ''}`}>{cfg.label}</span></td>
                    <td onClick={e => e.stopPropagation()}>
                      <div className="row-act" style={{ position: 'relative' }}>
                        {act.kind === 'published' && (
                          <button
                            className="ra"
                            style={{ flexShrink: 0, width: '130px', background: '#15803d', color: '#fff', border: 'solid 1px #15803d' }}
                            onClick={() => {}}
                          >
                            🗂 Thêm vào hồ sơ
                          </button>
                        )}
                        {act.kind === 'mine' && (
                          <button
                            className="ra"
                            style={{ flexShrink: 0, width: '130px', border: 'solid 1px #bfbfbf' }}
                            onClick={() => goScreen(act.nav, act.params)}
                          >
                            {act.label}
                          </button>
                        )}
                        {act.kind === 'watch' && (
                          <button
                            className="ra"
                            style={{ flexShrink: 0, width: '130px', border: 'solid 1px #bfbfbf', color: 'var(--text3)' }}
                            onClick={() => goScreen(act.nav, { readOnly: true })}
                          >
                            👁 Chỉ xem
                          </button>
                        )}
                        <MoreMenu
                          items={[
                            { key: 'lich-su', label: 'Lịch sử văn bản', icon: '📋' },
                            ...(act.kind === 'published'
                              ? [{ key: 'xem', label: 'Xem chi tiết', icon: '👁', divider: true as const }]
                              : []),
                            ...(row.status === 'dang-soan' && (currentUser.role === 'van-thu' || currentUser.role === 'xu-ly')
                              ? [{ key: 'xoa', label: 'Xóa văn bản', icon: '🗑', danger: true as const, divider: true as const }]
                              : []),
                          ] as MoreMenuItem[]}
                          onAction={key => { if (key === 'xem') goScreen(act.nav, act.kind === 'published' ? act.viewParams : {}) }}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 4px', fontSize: '.82rem', color: 'var(--text3)' }}>
            <div>
              Hiển thị 1–{Math.min(pageSize, visibleData.length)} trong tổng số <strong>{visibleData.length}</strong> văn bản
              {checked.size > 0 && <span style={{ color: 'var(--orange)', fontWeight: 600, marginLeft: 12 }}>· Đã chọn {checked.size}</span>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>Số bản ghi/trang:</span>
              <select className="fsel" style={{ padding: '4px 8px', fontSize: '.82rem' }} value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
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
