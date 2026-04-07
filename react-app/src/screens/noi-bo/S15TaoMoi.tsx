import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

export default function S15TaoMoi() {
  const { goScreen } = useNavigation()

  return (
    <div className="cw">
      <Topbar breadcrumb={['Văn bản Nội bộ', 'Tạo văn bản nội bộ mới']} onNavClick={() => goScreen('s14')} />
      <div className="work-area"><div className="form-pane" style={{maxWidth:700}}>
        <div className="form-card">
          <div className="fc-title">Thông tin văn bản</div>
          <div className="form-row full"><div className="fg"><label>Tiêu đề <span className="req">*</span></label><input placeholder="Nhập tiêu đề văn bản nội bộ..." /></div></div>
          <div className="form-row">
            <div className="fg"><label>Loại văn bản <span className="req">*</span></label><select><option>Thông báo nội bộ</option><option>Tờ trình</option><option>Quy trình / Quy định</option><option>Biên bản</option><option>Báo cáo nội bộ</option></select></div>
            <div className="fg"><label>Đơn vị ban hành <span className="req">*</span></label><select><option>BGĐ</option><option>P. Kế hoạch TH</option><option>P. Tài chính KT</option><option>P. HCNS</option><option>P. CNTT</option></select></div>
          </div>
          <div className="form-row full"><div className="fg"><label>Nội dung tóm tắt</label><textarea placeholder="Mô tả nội dung chính..." /></div></div>
        </div>

        <div className="form-card">
          <div className="fc-title"> Tệp đính kèm</div>
          <div className="upload-area"><div className="ua-ico">📄</div><div className="ua-txt">Kéo thả hoặc click để tải lên tệp văn bản</div><div className="ua-hint">Hỗ trợ: .docx, .doc, .pdf, .xlsx — Tối đa 50MB</div></div>
        </div>

        <div className="form-card">
          <div className="fc-title">Đối tượng nhận & Luồng duyệt</div>
          <div className="form-row">
            <div className="fg"><label>Gửi đến (phòng ban)</label><select><option>Tất cả phòng ban</option><option>Chọn phòng cụ thể...</option></select></div>
            <div className="fg"><label>Hạn phản hồi</label><input type="date" /></div>
          </div>
          <div style={{marginBottom:12}}>
            <div style={{fontSize:'.75rem',fontWeight:600,color:'var(--text2)',marginBottom:6}}>Người duyệt trước khi ban hành</div>
            <div className="person-list">
              <div className="person-item on"><div className="pi-av" style={{background:'#c2410c'}}>GĐ</div><div><div className="pi-name">Lê Văn Giám Đốc</div><div className="pi-role">Giám đốc · Ký duyệt</div></div><div className="pi-check">✓</div></div>
            </div>
            <button style={{fontSize:'.82rem',color:'var(--orange)',background:'none',border:'1px dashed #fcd9c8',borderRadius:6,padding:'6px 14px',cursor:'pointer',width:'100%'}}>+ Thêm người duyệt</button>
          </div>
        </div>
      </div></div>
      <div className="form-footer">
        <button className="btn btn-ghost" onClick={() => goScreen('s14')}>← Hủy</button>
        <button className="btn btn-ghost">💾 Lưu nháp</button>
        <button className="btn btn-primary">Gửi duyệt →</button>
      </div>
    </div>
  )
}
