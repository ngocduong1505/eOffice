import { useNavigation } from '@/hooks/useNavigation'

const FLOW_ITEMS = [
  { group: 'VB ĐẾN', items: [
    { id: 's1', label: '① Danh sách' },
    { id: 's2', label: '② Tiếp nhận' },
    { id: 's3', label: '③ Chờ chỉ đạo' },
    { id: 's4', label: '④ BGĐ chỉ đạo' },
    { id: 's7', label: '⑤ TK thiết lập luồng' },
    { id: 's5', label: '⑥ Đang xử lý' },
    { id: 's6', label: '⑦ Hoàn thành' },
  ]},
  { group: 'VB ĐI', items: [
    { id: 's8',  label: '⑧ Danh sách' },
    { id: 's9',  label: '⑨ Soạn thảo' },
    { id: 's10', label: '⑩ Duyệt song song' },
    { id: 's11', label: '⑪ GĐ ký số' },
    { id: 's12', label: '⑫ Cấp số & Ban hành' },
    { id: 's13', label: '⑬ Đã ban hành' },
  ]},
  { group: 'NỘI BỘ', items: [
    { id: 's14', label: '⑭ Danh sách' },
    { id: 's15', label: '⑮ Tạo mới' },
  ]},
  { group: 'HỒ SƠ', items: [
    { id: 's16', label: '⑯ Danh sách' },
    { id: 's17', label: '⑰ Tạo hồ sơ' },
    { id: 's18', label: '⑱ Chi tiết' },
    { id: 's19', label: '⑲ Nộp lưu' },
  ]},
  { group: 'SỔ & BC', items: [
    { id: 's20', label: '⑳ Sổ đăng ký' },
    { id: 's21', label: '㉑ Cấu hình sổ' },
    { id: 's22', label: '㉒ Báo cáo' },
  ]},
]

export default function FlowNav() {
  const { currentScreen, goScreen } = useNavigation()

  return (
    <div className="flow-nav">
      {FLOW_ITEMS.map((section, i) => (
        <>
          {i > 0 && <div key={`sep-${i}`} className="fn-sep" />}
          <span key={`lbl-${i}`} className="fn-grp-lbl">{section.group}</span>
          {section.items.map(item => (
            <button
              key={item.id}
              className={`fn-btn ${currentScreen === item.id ? 'on' : ''}`}
              onClick={() => goScreen(item.id)}
            >
              {item.label}
            </button>
          ))}
        </>
      ))}
    </div>
  )
}
