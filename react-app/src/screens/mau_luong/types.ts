// ─── SHARED TYPES & DATA for Mẫu quy trình screens ──────────────────────────

export interface FlowItem {
  id: number
  name: string
  types: string[]
  status: 'active' | 'draft' | 'inactive'
  steps: number
  created: string
  author: string
  hasDoc: boolean
}

export interface StepItem {
  name: string
  behavior: string
  deadline: number
  timeout: 'stop' | 'skip' | 'notify'
  roles: string[]
}

// ─── LABELS ──────────────────────────────────────────────────────────────────

export const TYPE_LABELS: Record<string, { label: string; cls: string }> = {
  vbd:    { label: 'Văn bản đi',  cls: 'ml-badge-vbd' },
  vbden:  { label: 'Văn bản đến', cls: 'ml-badge-vbden' },
  'noi-bo': { label: 'Nội bộ',   cls: 'ml-badge-noibo' },
}

export const STATUS_LABELS: Record<string, { label: string; cls: string; dot: string }> = {
  active:   { label: 'Đang hoạt động',  cls: 'ml-badge-active',   dot: 'ml-dot-active' },
  draft:    { label: 'Nháp',            cls: 'ml-badge-draft',    dot: 'ml-dot-draft' },
  inactive: { label: 'Không hoạt động', cls: 'ml-badge-inactive', dot: 'ml-dot-inactive' },
}

export const BEHAVIOR_LABELS: Record<string, string> = {
  duyet:       'Duyệt nội dung',
  'y-kien':    'Ghi ý kiến',
  'phan-cong': 'Phân công',
  'ky-so':     'Ký số',
  'dong-dau':  'Đóng dấu & Cấp số',
  'ban-hanh':  'Ban hành',
  'luu-ho-so': 'Lưu hồ sơ',
}

export const ROLE_LABELS: Record<string, string> = {
  vp: 'Văn phòng',
  pb: 'Phòng ban',
  ld: 'Lãnh đạo',
  vt: 'Văn thư',
  kh: 'Kế hoạch',
}

export const APPLY_OPTIONS: Record<string, string> = {
  vbd:      'Văn bản đi',
  vbden:    'Văn bản đến',
  'noi-bo': 'Văn bản nội bộ',
}

export const ROLE_OPTIONS: Record<string, string> = {
  vp: 'Văn phòng',
  pb: 'Phòng ban',
  ld: 'Lãnh đạo',
  vt: 'Văn thư',
  kh: 'Kế hoạch',
}

export const BEHAVIOR_SELECT_OPTIONS = [
  { value: 'duyet',       label: '📋 Duyệt nội dung — Người duyệt đồng ý hoặc yêu cầu sửa' },
  { value: 'y-kien',      label: '✏️ Ghi ý kiến / Bút phê — Ghi chú chỉ đạo' },
  { value: 'phan-cong',   label: '👤 Phân công người xử lý — Chỉ định người nhận tiếp theo' },
  { value: 'ky-so',       label: '🔏 Ký số văn bản — Ký điện tử bằng chứng thư số' },
  { value: 'dong-dau',    label: '🏛️ Đóng dấu & Cấp số — Cấp số hiệu và đóng dấu pháp nhân' },
  { value: 'ban-hanh',    label: '📤 Ban hành / Phân phát — Gửi và kết thúc quy trình' },
  { value: 'luu-ho-so',   label: '🗄️ Lưu hồ sơ — Đưa vào kho lưu trữ số' },
]

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

export const MOCK_STEP_POOLS: Record<string, StepItem[]> = {
  vbd: [
    { name: 'Văn thư tiếp nhận hồ sơ',      behavior: 'luu-ho-so', deadline: 4,  timeout: 'stop',   roles: ['vt'] },
    { name: 'Lãnh đạo phòng soạn thảo',      behavior: 'y-kien',    deadline: 8,  timeout: 'notify', roles: ['pb'] },
    { name: 'Duyệt nội dung văn bản',         behavior: 'duyet',     deadline: 8,  timeout: 'stop',   roles: ['pb', 'ld'] },
    { name: 'Phê duyệt lãnh đạo cơ quan',    behavior: 'duyet',     deadline: 4,  timeout: 'stop',   roles: ['ld'] },
    { name: 'Ký số văn bản',                  behavior: 'ky-so',     deadline: 4,  timeout: 'stop',   roles: ['ld'] },
    { name: 'Đóng dấu & Cấp số phát hành',   behavior: 'dong-dau',  deadline: 2,  timeout: 'stop',   roles: ['vt'] },
    { name: 'Ban hành văn bản',               behavior: 'ban-hanh',  deadline: 2,  timeout: 'stop',   roles: ['vt'] },
  ],
  vbden: [
    { name: 'Văn thư tiếp nhận & Đăng ký',   behavior: 'luu-ho-so', deadline: 2,  timeout: 'stop',   roles: ['vt'] },
    { name: 'Lãnh đạo phân công xử lý',       behavior: 'phan-cong', deadline: 4,  timeout: 'stop',   roles: ['ld'] },
    { name: 'Phòng ban nghiên cứu, xử lý',    behavior: 'duyet',     deadline: 16, timeout: 'notify', roles: ['pb'] },
    { name: 'Ghi ý kiến chuyên môn',           behavior: 'y-kien',    deadline: 8,  timeout: 'notify', roles: ['pb'] },
    { name: 'Lưu hồ sơ theo dõi',             behavior: 'luu-ho-so', deadline: 2,  timeout: 'notify', roles: ['vt'] },
  ],
  'noi-bo': [
    { name: 'Phòng ban khởi tạo tài liệu',   behavior: 'y-kien',    deadline: 4,  timeout: 'notify', roles: ['pb'] },
    { name: 'Duyệt nội bộ cấp phòng',         behavior: 'duyet',     deadline: 8,  timeout: 'stop',   roles: ['pb'] },
    { name: 'Phê duyệt lãnh đạo',             behavior: 'duyet',     deadline: 4,  timeout: 'stop',   roles: ['ld'] },
    { name: 'Lưu hồ sơ nội bộ',               behavior: 'luu-ho-so', deadline: 2,  timeout: 'notify', roles: ['vt'] },
  ],
}

export function getMockSteps(f: FlowItem): StepItem[] {
  const primaryType = f.types[0] ?? 'vbd'
  const pool = MOCK_STEP_POOLS[primaryType] ?? MOCK_STEP_POOLS.vbd
  return pool.slice(0, Math.min(f.steps, pool.length))
}

export const INITIAL_FLOWS: FlowItem[] = [
  { id: 1,  name: 'Quy trình duyệt VB đi cấp Phòng',      types: ['vbd'],                  status: 'active',   steps: 3, created: '12/03/2025', author: 'Nguyễn Văn An',    hasDoc: true  },
  { id: 2,  name: 'Quy trình xử lý VB đến khẩn',           types: ['vbden'],                status: 'active',   steps: 5, created: '01/04/2025', author: 'Trần Thị Bình',    hasDoc: false },
  { id: 3,  name: 'Quy trình nội bộ báo cáo tuần',          types: ['noi-bo'],               status: 'draft',    steps: 2, created: '20/03/2025', author: 'Lê Minh Cường',    hasDoc: false },
  { id: 4,  name: 'Quy trình ký số và ban hành VB đi',      types: ['vbd'],                  status: 'active',   steps: 6, created: '05/02/2025', author: 'Phạm Thu Hà',      hasDoc: true  },
  { id: 5,  name: 'Quy trình tổng hợp đa loại VB',          types: ['vbd', 'vbden', 'noi-bo'], status: 'inactive', steps: 4, created: '10/01/2025', author: 'Hoàng Đức Mạnh', hasDoc: false },
  { id: 6,  name: 'Quy trình lưu hồ sơ cuối năm',           types: ['noi-bo'],               status: 'draft',    steps: 3, created: '28/03/2025', author: 'Vũ Lan Anh',       hasDoc: false },
  { id: 7,  name: 'Quy trình phân công VB đến thường',      types: ['vbden'],                status: 'inactive', steps: 2, created: '15/02/2025', author: 'Đinh Quang Huy',   hasDoc: true  },
  { id: 8,  name: 'Quy trình ban hành quyết định',           types: ['vbd'],                  status: 'active',   steps: 7, created: '22/03/2025', author: 'Bùi Thế Vinh',     hasDoc: true  },
  { id: 9,  name: 'Quy trình nội bộ họp định kỳ',           types: ['noi-bo'],               status: 'draft',    steps: 2, created: '01/04/2025', author: 'Ngô Kim Ngân',     hasDoc: false },
  { id: 10, name: 'Quy trình duyệt nhanh VB đi cấp Cục',   types: ['vbd', 'noi-bo'],        status: 'active',   steps: 4, created: '30/03/2025', author: 'Cao Thị Lan',      hasDoc: true  },
  { id: 11, name: 'Quy trình xử lý khiếu nại VB đến',      types: ['vbden'],                status: 'active',   steps: 5, created: '18/03/2025', author: 'Phan Bảo Long',    hasDoc: false },
  { id: 12, name: 'Quy trình cấp số văn bản thường',        types: ['vbd'],                  status: 'inactive', steps: 3, created: '08/01/2025', author: 'Tô Thanh Tâm',     hasDoc: true  },
]
