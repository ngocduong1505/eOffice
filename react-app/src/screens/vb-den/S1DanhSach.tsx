import { useState, useMemo, useEffect, useCallback } from 'react'
import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import SimpleToast from '@/components/SimpleToast'
import ModalChiDao from './chi-tiet/modals/ModalChiDao'
import ModalDieuPhoi from './chi-tiet/modals/ModalDieuPhoi'
import ModalUyQuyen from './chi-tiet/modals/ModalUyQuyen'
import ModalChuyenXuLy from './chi-tiet/modals/ModalChuyenXuLy'
import ModalHoanThanh from './chi-tiet/modals/ModalHoanThanh'

type VbStatus = 'nhap' | 'cho-chi-dao' | 'cho-dieu-phoi' | 'cho-xu-ly' | 'dang-xu-ly' | 'hoan-thanh' | 'qua-han'
type MucDo = 'hoa-toc' | 'khan' | 'thuong'

interface VanBan {
  id: number
  soKyHieu: string
  trichYeu: string
  loaiVB: string
  ngayVB: string
  ngayDen: string
  hanXuLy: string
  donViBanHanh: string
  mucDo: MucDo
  status: VbStatus
  isOverdue?: boolean
  // IDs của những người trong luồng xử lý; van-thu không cần — thấy tất cả
  participants: string[]
}

const DATA: VanBan[] = [
  // cho-chi-dao → Giám đốc chỉ đạo
  { id: 47, soKyHieu: '45/CV-SYT',  trichYeu: 'V/v báo cáo tình hình thực hiện kế hoạch KCB quý I/2026',  loaiVB: 'Công văn',  ngayVB: '24/03/2026', ngayDen: '25/03/2026 08:15', hanXuLy: '28/03/2026', donViBanHanh: 'Sở Y tế TP.HCM',  mucDo: 'hoa-toc', status: 'cho-chi-dao',  isOverdue: true,  participants: ['le-van-gd'] },
  // cho-dieu-phoi → Thư ký điều phối
  { id: 46, soKyHieu: '12/TB-BHXH', trichYeu: 'Thông báo lịch kiểm tra công tác BHYT năm 2026',            loaiVB: 'Thông báo', ngayVB: '23/03/2026', ngayDen: '23/03/2026 14:00', hanXuLy: '25/03/2026', donViBanHanh: 'BHXH TP.HCM',     mucDo: 'khan',    status: 'cho-dieu-phoi', isOverdue: true,  participants: ['tran-thi-tk'] },
  // cho-xu-ly → P.CNTT xử lý HIS
  { id: 45, soKyHieu: '08/KH-STTTT',trichYeu: 'Kế hoạch triển khai hệ thống HIS giai đoạn 2',              loaiVB: 'Kế hoạch', ngayVB: '22/03/2026', ngayDen: '22/03/2026 09:30', hanXuLy: '01/04/2026', donViBanHanh: 'Sở TT&TT',       mucDo: 'thuong',  status: 'cho-xu-ly',                       participants: ['pham-van-cu'] },
  // hoan-thanh → P.KHTH đã xử lý thuốc
  { id: 44, soKyHieu: '156/QĐ-BYT', trichYeu: 'Quyết định về việc điều chỉnh định mức thuốc',               loaiVB: 'Quyết định',ngayVB: '20/03/2026', ngayDen: '21/03/2026 10:00', hanXuLy: '10/04/2026', donViBanHanh: 'Bộ Y tế',         mucDo: 'thuong',  status: 'hoan-thanh',                      participants: ['nguyen-van-a'] },
  // qua-han → P.KHTH xử lý dịch (quá hạn)
  { id: 43, soKyHieu: '89/CV-CDC',   trichYeu: 'Công văn hướng dẫn phòng chống dịch mùa hè 2026',            loaiVB: 'Công văn',  ngayVB: '18/03/2026', ngayDen: '19/03/2026 15:45', hanXuLy: '20/03/2026', donViBanHanh: 'CDC TP.HCM',      mucDo: 'hoa-toc', status: 'qua-han',       isOverdue: true,  participants: ['nguyen-van-a'] },
  // nhap → Văn thư xử lý, chưa phân công
  { id: 42, soKyHieu: '03/CV-SKHDT', trichYeu: 'Yêu cầu báo cáo tình hình thực hiện dự án đầu tư',          loaiVB: 'Công văn',  ngayVB: '15/03/2026', ngayDen: '16/03/2026 08:00', hanXuLy: '30/03/2026', donViBanHanh: 'Sở KH&ĐT',       mucDo: 'khan',    status: 'nhap',                            participants: [] },
  // dang-xu-ly → P.HCNS đang xử lý thiên tai
  { id: 41, soKyHieu: '77/CV-UBND',  trichYeu: 'Triển khai kế hoạch phòng chống thiên tai năm 2026',         loaiVB: 'Công văn',  ngayVB: '14/03/2026', ngayDen: '15/03/2026 10:00', hanXuLy: '05/04/2026', donViBanHanh: 'UBND TP.HCM',     mucDo: 'thuong',  status: 'dang-xu-ly',                      participants: ['tran-thi-c'] },
]

// ─── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<VbStatus, { label: string; cls: string; actionLabel: string; actionCls: string }> = {
  'nhap': { label: 'Nháp', cls: 'stag st-draft', actionLabel: 'Tiếp tục', actionCls: 'ra' },
  'cho-chi-dao': { label: 'Chờ chỉ đạo', cls: 'stag st-direct', actionLabel: 'Chỉ đạo ngay', actionCls: 'ra' },
  'cho-dieu-phoi': { label: 'Chờ điều phối', cls: 'stag st-coord', actionLabel: 'Điều phối ngay', actionCls: 'ra' },
  'cho-xu-ly': { label: 'Chờ xử lý', cls: 'stag st-pending', actionLabel: 'Hoàn thành xử lý', actionCls: 'ra' },
  'dang-xu-ly': { label: 'Đang xử lý', cls: 'stag st-coord', actionLabel: 'Xem chi tiết', actionCls: 'ra' },
  'hoan-thanh': { label: 'Hoàn thành', cls: 'stag st-done', actionLabel: 'Thêm vào hồ sơ', actionCls: 'ra' },
  'qua-han': { label: 'Quá hạn', cls: 'stag st-overdue', actionLabel: 'Xử lý khẩn', actionCls: 'ra' },
}

// ─── Hạn xử lý filter ────────────────────────────────────────────────────────
type HanPreset = 'all' | 'overdue' | 'today' | 'week' | 'month' | 'custom'

const HAN_PRESETS: { key: HanPreset; label: string; desc: string; color?: string }[] = [
  { key: 'all', label: 'Tất cả', desc: 'Không lọc theo hạn' },
  { key: 'overdue', label: 'Quá hạn', desc: 'Hạn xử lý đã qua', color: '#dc2626' },
  { key: 'today', label: 'Hôm nay', desc: 'Hạn trong ngày hôm nay', color: '#c2410c' },
  { key: 'week', label: '7 ngày tới', desc: 'Hạn trong 7 ngày tới' },
  { key: 'month', label: 'Tháng này', desc: 'Hạn trong tháng hiện tại' },
  { key: 'custom', label: 'Tùy chỉnh', desc: 'Chọn khoảng ngày cụ thể' },
]

function HanXuLyFilter() {
  const [open, setOpen] = useState(false)
  const [preset, setPreset] = useState<HanPreset>('all')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const activePreset = HAN_PRESETS.find(p => p.key === preset)!

  const triggerLabel = () => {
    if (preset === 'all') return 'Hạn xử lý'
    if (preset === 'custom' && (fromDate || toDate)) {
      const parts = [fromDate, toDate].filter(Boolean)
      return parts.length === 2 ? `${fromDate} → ${toDate}` : parts[0]
    }
    return activePreset.label
  }

  const isActive = preset !== 'all'

  const handlePreset = (key: HanPreset) => {
    setPreset(key)
    if (key !== 'custom') { setFromDate(''); setToDate('') }
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(p => !p)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '7px 12px', borderRadius: 7, cursor: 'pointer',
          border: `1px solid ${isActive ? 'var(--orange)' : 'var(--border)'}`,
          background: isActive ? '#fff7ed' : '#fff',
          color: isActive ? 'var(--orange)' : 'var(--text2)',
          fontSize: '.82rem', fontWeight: isActive ? 600 : 400,
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: '.85rem' }}>📅</span>
        <span>{triggerLabel()}</span>
        {isActive && (
          <span
            onClick={e => { e.stopPropagation(); setPreset('all'); setFromDate(''); setToDate('') }}
            style={{ marginLeft: 2, color: '#94a3b8', fontWeight: 400, fontSize: '.78rem' }}
          >✕</span>
        )}
        {!isActive && <span style={{ color: '#94a3b8', fontSize: '.72rem' }}>▼</span>}
      </button>

      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          style={{
            position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 300,
            background: '#fff', border: '1px solid var(--border)', borderRadius: 10,
            boxShadow: '0 8px 28px rgba(0,0,0,.13)', minWidth: 260, padding: '6px 0',
          }}
        >
          {/* Header */}
          <div style={{ padding: '8px 14px 6px', borderBottom: '1px solid var(--border)', marginBottom: 4 }}>
            <div style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.6px' }}>
              Lọc theo Hạn xử lý
            </div>
          </div>

          {/* Preset options */}
          {HAN_PRESETS.map(p => (
            <div
              key={p.key}
              onClick={() => { handlePreset(p.key); if (p.key !== 'custom') setOpen(false) }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '9px 14px', cursor: 'pointer',
                background: preset === p.key ? '#fff7ed' : 'transparent',
              }}
              onMouseEnter={e => { if (preset !== p.key) e.currentTarget.style.background = '#f8fafc' }}
              onMouseLeave={e => { e.currentTarget.style.background = preset === p.key ? '#fff7ed' : 'transparent' }}
            >
              <div>
                <div style={{ fontSize: '.82rem', fontWeight: preset === p.key ? 600 : 400, color: p.color ?? 'var(--dark)' }}>
                  {p.label}
                </div>
                <div style={{ fontSize: '.72rem', color: 'var(--text3)', marginTop: 1 }}>{p.desc}</div>
              </div>
              {preset === p.key && <span style={{ color: 'var(--orange)', fontSize: '.8rem' }}>✓</span>}
            </div>
          ))}

          {/* Custom range */}
          {preset === 'custom' && (
            <div style={{ borderTop: '1px solid var(--border)', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.5px' }}>
                Khoảng ngày
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '.7rem', color: 'var(--text3)', marginBottom: 3 }}>Từ ngày</div>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={e => setFromDate(e.target.value)}
                    style={{ width: '100%', boxSizing: 'border-box', fontSize: '.8rem' }}
                  />
                </div>
                <span style={{ color: 'var(--text3)', fontSize: '.8rem', marginTop: 14 }}>→</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '.7rem', color: 'var(--text3)', marginBottom: 3 }}>Đến ngày</div>
                  <input
                    type="date"
                    value={toDate}
                    min={fromDate}
                    onChange={e => setToDate(e.target.value)}
                    style={{ width: '100%', boxSizing: 'border-box', fontSize: '.8rem' }}
                  />
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  padding: '6px 0', background: 'var(--orange)', color: '#fff',
                  border: 'none', borderRadius: 6, cursor: 'pointer',
                  fontSize: '.8rem', fontWeight: 600, marginTop: 2,
                }}
              >
                Áp dụng
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Mức độ badge ─────────────────────────────────────────────────────────────
function MucDoBadge({ mucDo }: { mucDo: MucDo }) {
  if (mucDo === 'thuong') return null
  if (mucDo === 'hoa-toc') return <span className="chip hot" style={{ fontSize: '.68rem' }}>Hỏa tốc</span>
  return <span className="chip" style={{ fontSize: '.68rem', background: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa' }}>Khẩn</span>
}

// ─── Role → primary action permission ────────────────────────────────────────
// null = tất cả role đều xem được (không có action riêng)
const STATUS_PRIMARY_ROLE: Partial<Record<VbStatus, string>> = {
  'nhap':         'van-thu',
  'cho-chi-dao':  'giam-doc',
  'cho-dieu-phoi':'thu-ky',
  'cho-xu-ly':    'xu-ly',
  'qua-han':      'xu-ly',
  'hoan-thanh':   'van-thu',
}

// ─── Row action menu ──────────────────────────────────────────────────────────
function RowMenu({ status, role, onClose, onUyQuyen, onChuyenXuLy, onTaoVbDi }: {
  status: VbStatus
  role: string
  onClose: () => void
  onUyQuyen: () => void
  onChuyenXuLy: () => void
  onTaoVbDi: () => void
}) {
  const items: { label: string; danger?: boolean; action?: () => void }[] = [
    ...(role === 'giam-doc' ? [
      { label: 'Ủy quyền', action: onUyQuyen },
      { label: 'Từ chối', danger: true },
    ] : []),
    ...(status === 'cho-xu-ly' && role === 'xu-ly' ? [
      { label: 'Chuyển tiếp xử lý', action: onChuyenXuLy },
      { label: 'Tạo văn bản đi', action: onTaoVbDi },
    ] : []),
    ...(role === 'van-thu' ? [
      { label: 'Thêm vào hồ sơ' },
    ] : []),
  ]
  if (items.length === 0) return null
  return (
    <div style={{
      position: 'absolute', right: 0, top: '100%', background: '#fff',
      border: '1px solid var(--border)', borderRadius: 8,
      boxShadow: '0 4px 16px rgba(0,0,0,.12)',
      zIndex: 100, minWidth: 170, padding: '4px 0',
    }}>
      {items.map(item => (
        <div
          key={item.label}
          style={{ padding: '8px 16px', fontSize: '.82rem', cursor: 'pointer', color: item.danger ? '#dc2626' : 'var(--dark)' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#f5f6fa')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          onClick={() => { item.action?.(); onClose() }}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
}

// ─── Role → visible statuses ─────────────────────────────────────────────────
const ROLE_STATUSES: Record<string, VbStatus[]> = {
  'van-thu':  ['nhap', 'cho-chi-dao', 'cho-dieu-phoi', 'cho-xu-ly', 'dang-xu-ly', 'hoan-thanh', 'qua-han'],
  'giam-doc': ['cho-chi-dao'],
  'thu-ky':   ['cho-dieu-phoi'],
  'xu-ly':    ['cho-xu-ly', 'dang-xu-ly', 'qua-han'],
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function S1DanhSach() {
  const { goScreen } = useNavigation()
  const { currentUser } = useCurrentUser()
  const { screenParams } = useNavigation()
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const [allChecked, setAllChecked] = useState(false)
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const [openChiDao, setOpenChiDao] = useState<number | null>(null)
  const [openDieuPhoi, setOpenDieuPhoi] = useState<number | null>(null)
  const [openUyQuyen, setOpenUyQuyen] = useState<number | null>(null)
  const [openChuyenXuLy, setOpenChuyenXuLy] = useState<number | null>(null)
  const [openHoanThanh, setOpenHoanThanh] = useState<number | null>(null)
  const [pageSize, setPageSize] = useState(10)
  const [toast, setToast] = useState<string | null>(null)

  const dismissToast = useCallback(() => setToast(null), [])

  // Nhận handoff từ S2
  useEffect(() => {
    if (screenParams.handoff) {
      const { msg } = screenParams.handoff as { msg: string; nextUserId: string }
      setToast(msg)
    }
  }, [screenParams.handoff])

  const getActionHandler = (row: VanBan) => {
    switch (row.status) {
      case 'nhap': return () => goScreen('s2')
      case 'cho-chi-dao': return () => setOpenChiDao(row.id)
      case 'cho-dieu-phoi': return () => setOpenDieuPhoi(row.id)
      case 'cho-xu-ly': return () => setOpenHoanThanh(row.id)
      case 'dang-xu-ly': return () => goScreen('s3', { status: row.status })
      case 'qua-han': return () => setOpenHoanThanh(row.id)
      default: return () => goScreen('s3', { status: row.status })
    }
  }

  const toggleAll = () => {
    if (allChecked) {
      setChecked(new Set())
    } else {
      setChecked(new Set(visibleData.map(d => d.id)))
    }
    setAllChecked(!allChecked)
  }

  const toggleOne = (id: number) => {
    const next = new Set(checked)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setChecked(next)
    setAllChecked(next.size === visibleData.length)
  }

  const visibleData = useMemo(() => {
    const allowed = ROLE_STATUSES[currentUser.role] ?? []
    return DATA.filter(d => {
      if (!allowed.includes(d.status)) return false
      // van-thu thấy tất cả; các role khác chỉ thấy VB mình tham gia
      if (currentUser.role === 'van-thu') return true
      return d.participants.includes(currentUser.id)
    })
  }, [currentUser.id, currentUser.role])

  const hasChecked = checked.size > 0

  return (
    <div className="cw">
      <Topbar breadcrumb={['Văn phòng số', 'Văn bản đến', 'Văn bản đến chờ xử lý']} />

      {/* Stat strip */}
      <div className="stat-strip">
        <div className="si on"><div className="si-num">{visibleData.length}</div><div className="si-lbl">Tổng văn bản đến</div></div>
        <div className="si"><div className="si-num" style={{ color: '#1d4ed8' }}>{visibleData.filter(d => d.status === 'nhap').length}</div><div className="si-lbl">Mới tiếp nhận</div></div>
        <div className="si"><div className="si-num" style={{ color: '#c2410c' }}>{visibleData.filter(d => d.status === 'dang-xu-ly' || d.status === 'cho-xu-ly').length}</div><div className="si-lbl">Đang xử lý</div></div>
        <div className="si"><div className="si-num" style={{ color: '#b91c1c' }}>{visibleData.filter(d => d.status === 'qua-han').length}</div><div className="si-lbl">Quá hạn</div></div>
        <div className="si"><div className="si-num" style={{ color: '#1a7a45' }}>{visibleData.filter(d => d.status === 'hoan-thanh').length}</div><div className="si-lbl">Hoàn thành</div></div>
      </div>

      {/* Filter bar */}
      <div className="fbar">
        <div className="sw">
          <span className="sw-ico">🔍</span>
          <input placeholder="Tìm theo tên, số đến, nơi gửi..." />
        </div>
        <select className="fsel">
          <option>Tất cả trạng thái</option>
          <option>Nháp</option>
          <option>Chờ chỉ đạo</option>
          <option>Chờ điều phối</option>
          <option>Chờ xử lý</option>
          <option>Hoàn thành</option>
          <option>Quá hạn</option>
        </select>
        <HanXuLyFilter />

        {hasChecked && currentUser.role === 'van-thu' && (
          <button className="fbtn" style={{ background: '#1d4ed8', color: '#fff' }}>
            💾 Lưu hồ sơ ({checked.size})
          </button>
        )}
        {currentUser.role === 'van-thu' && (
          <button className="fbtn primary" onClick={() => goScreen('s2')}>
            + Tiếp nhận văn bản đến
          </button>
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
                <th style={{ width: 64 }}>Số đến</th>
                <th>Trích yếu</th>
                <th style={{ width: 120 }}>Số ký hiệu</th>
                <th style={{ width: 88 }}>Loại VB</th>
                <th style={{ width: 96 }}>Ngày VB</th>
                <th style={{ width: 130 }}>Ngày đến</th>
                <th style={{ width: 96 }}>Hạn xử lý</th>
                <th style={{ width: 140 }}>Đơn vị ban hành</th>
                <th style={{ width: 100 }}>Mức độ</th>
                <th style={{ width: 110 }}>Trạng thái</th>
                <th style={{ width: 180 }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {visibleData.map((row, idx) => {
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
                    <td style={{ fontWeight: 700, color: '#d94f1e', fontSize: '.9rem' }}>{row.id}</td>
                    <td>
                      <div style={{ minWidth: 200, fontSize: '.82rem', fontWeight: 600, color: 'var(--dark)', lineHeight: 1.35 }}>{row.trichYeu}</div>
                    </td>
                    <td style={{ fontSize: '.8rem', fontFamily: 'monospace', fontWeight: 600 }}>{row.soKyHieu}</td>
                    <td style={{ fontSize: '.78rem', color: 'var(--text2)' }}>{row.loaiVB}</td>
                    <td style={{ fontSize: '.8rem', color: 'var(--text2)' }}>{row.ngayVB}</td>
                    <td style={{ fontSize: '.78rem', color: 'var(--text2)' }}>{row.ngayDen}</td>
                    <td style={{ fontSize: '.8rem', color: row.isOverdue ? '#b91c1c' : '#1a7a45', fontWeight: row.isOverdue ? 700 : 400 }}>
                      {row.hanXuLy}{row.isOverdue ? ' ⚠️' : ''}
                    </td>
                    <td style={{ fontSize: '.78rem' }}>{row.donViBanHanh}</td>
                    <td style={{ minWidth: 100 }}><MucDoBadge mucDo={row.mucDo} /></td>
                    <td><span className={cfg.cls}>{cfg.label}</span></td>
                    <td onClick={e => e.stopPropagation()}>
                      <div className="row-act" style={{ position: 'relative' }}>
                        {/* Primary action: chỉ hiện nếu đúng role, còn lại "Xem chi tiết" */}
                        {(() => {
                          const requiredRole = STATUS_PRIMARY_ROLE[row.status]
                          const canAct = !requiredRole || requiredRole === currentUser.role
                          if (canAct) {
                            return (
                              <button
                                className={cfg.actionCls}
                                style={{ flexShrink: 0, width: '110px', border: 'solid 1px #bfbfbf' }}
                                onClick={getActionHandler(row)}
                              >
                                {cfg.actionLabel}
                              </button>
                            )
                          }
                          return (
                            <button
                              className="ra"
                              style={{ flexShrink: 0, width: '110px', border: 'solid 1px #bfbfbf', color: 'var(--text3)' }}
                              onClick={() => goScreen('s3', { status: row.status })}
                            >
                              Xem chi tiết
                            </button>
                          )
                        })()}
                        <div style={{ position: 'relative' }}>
                          <button
                            className="ra ra-m"
                            onClick={() => setOpenMenu(openMenu === row.id ? null : row.id)}
                          >···</button>
                          {openMenu === row.id && (
                            <RowMenu
                              status={row.status}
                              role={currentUser.role}
                              onClose={() => setOpenMenu(null)}
                              onUyQuyen={() => { setOpenUyQuyen(row.id); setOpenMenu(null) }}
                              onChuyenXuLy={() => { setOpenChuyenXuLy(row.id); setOpenMenu(null) }}
                              onTaoVbDi={() => { setOpenMenu(null); goScreen('s9', { vbDenGoc: row.trichYeu }) }}
                            />
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
            <div>Hiển thị 1–{Math.min(pageSize, visibleData.length)} trong tổng số <strong>{visibleData.length}</strong> văn bản</div>
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
      <ModalChiDao
        open={openChiDao !== null}
        onClose={() => setOpenChiDao(null)}
        onSubmit={() => { setOpenChiDao(null); setToast('Đã ghi ý kiến chỉ đạo. Chuyển Thư ký phân công xử lý.') }}
      />
      <ModalDieuPhoi
        open={openDieuPhoi !== null}
        onClose={() => setOpenDieuPhoi(null)}
        onSubmit={() => { setOpenDieuPhoi(null); setToast('Đã điều phối. Chuyên viên nhận nhiệm vụ xử lý văn bản.') }}
      />
      <ModalUyQuyen
        open={openUyQuyen !== null}
        onClose={() => setOpenUyQuyen(null)}
        onSubmit={() => setOpenUyQuyen(null)}
      />
      <ModalChuyenXuLy
        open={openChuyenXuLy !== null}
        onClose={() => setOpenChuyenXuLy(null)}
        onSubmit={() => { setOpenChuyenXuLy(null); setToast('Đã chuyển tiếp xử lý. Chuyên viên tiếp nhận nhiệm vụ.') }}
      />
      <ModalHoanThanh
        open={openHoanThanh !== null}
        onClose={() => setOpenHoanThanh(null)}
        onSubmit={() => { setOpenHoanThanh(null); setToast('Đã hoàn thành xử lý. Văn thư lưu hồ sơ và đóng quy trình.') }}
      />

      {toast && <SimpleToast msg={toast} onDismiss={dismissToast} />}
    </div>
  )
}
