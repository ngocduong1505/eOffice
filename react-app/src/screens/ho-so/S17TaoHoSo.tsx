import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

export default function S17TaoHoSo() {
  const { goScreen } = useNavigation()

  return (
    <div className="cw">
      <Topbar breadcrumb={['Hồ sơ lưu trữ', 'Tạo hồ sơ mới']} onNavClick={() => goScreen('s16')} />
      <div className="work-area"><div className="form-pane" style={{maxWidth:700}}>
        <div className="form-card">
          <div className="fc-title">Thông tin hồ sơ</div>
          <div className="form-row full"><div className="fg"><label>Tên hồ sơ <span className="req">*</span></label><input placeholder="VD: Hồ sơ VB Đến tháng 4/2026..." /></div></div>
          <div className="form-row">
            <div className="fg"><label>Phân loại hồ sơ <span className="req">*</span></label><select><option>Văn bản đến</option><option>Văn bản đi</option><option>Tài chính - Kế toán</option><option>Nhân sự</option><option>Hợp đồng</option></select></div>
            <div className="fg"><label>Đơn vị phụ trách <span className="req">*</span></label><select><option>Văn thư</option><option>P. Kế hoạch TH</option><option>P. Tài chính KT</option><option>P. HCNS</option></select></div>
          </div>
          <div className="form-row">
            <div className="fg"><label>Mã hồ sơ (tự động)</label><input className="auto" defaultValue="HS2026-04-DEN" readOnly /></div>
            <div className="fg"><label>Thời hạn bảo quản <span className="req">*</span></label><select><option>5 năm</option><option>10 năm</option><option>20 năm</option><option>70 năm</option><option>Vĩnh viễn</option></select></div>
          </div>
          <div className="form-row">
            <div className="fg"><label>Năm hình thành</label><input defaultValue="2026" /></div>
            <div className="fg"><label>Địa điểm bảo quản</label><select><option>Kho lưu trữ A</option><option>Kho lưu trữ B</option><option>Lưu trữ điện tử</option></select></div>
          </div>
          <div className="form-row full"><div className="fg"><label>Ghi chú</label><textarea placeholder="Mô tả nội dung hồ sơ, ghi chú quan trọng..." /></div></div>
        </div>

        <div className="form-card">
          <div className="fc-title"><span>2</span> Thêm tài liệu vào hồ sơ</div>
          <div style={{background:'#f7f8fb',border:'1px solid var(--border)',borderRadius:8,padding:12,marginBottom:12}}>
            <div style={{fontSize:'.75rem',color:'var(--text3)',marginBottom:8}}>Chọn từ văn bản đến/đi đã có trong hệ thống</div>
            <div className="sw" style={{maxWidth:'100%'}}><span className="sw-ico">🔍</span><input placeholder="Tìm và thêm văn bản..." /></div>
          </div>
          <div className="upload-area"><div className="ua-ico">📂</div><div className="ua-txt">Hoặc tải lên tài liệu từ máy tính</div><div className="ua-hint">Hỗ trợ đa định dạng — Tối đa 200MB mỗi tệp</div></div>
        </div>
      </div></div>
      <div className="form-footer">
        <button className="btn btn-ghost" onClick={() => goScreen('s16')}>← Hủy</button>
        <button className="btn btn-ghost">💾 Lưu nháp</button>
        <button className="btn btn-primary" onClick={() => goScreen('s18')}>Tạo hồ sơ →</button>
      </div>
    </div>
  )
}
