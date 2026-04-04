import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

export default function S9SoanThao() {
  const { goScreen } = useNavigation()

  return (
    <div className="cw">
      <Topbar breadcrumb={['Văn bản Đi', 'Soạn VB mới']} onNavClick={() => goScreen('s8')} />
      <div className="work-area"><div className="form-pane">
        <div className="form-card">
          <div className="fc-title"><span>1</span> Thông tin văn bản</div>
          <div className="form-row full"><div className="fg"><label>Tên văn bản <span className="req">*</span></label><input placeholder="Nhập tên văn bản..." /></div></div>
          <div className="form-row full"><div className="fg"><label>Trích yếu nội dung <span className="req">*</span></label><textarea placeholder="Tóm tắt nội dung chính của văn bản..." /></div></div>
          <div className="form-row tri">
            <div className="fg"><label>Loại VB <span className="req">*</span></label><select><option>Công văn</option><option>Tờ trình</option><option>Quyết định</option><option>Thông báo</option><option>Báo cáo</option></select></div>
            <div className="fg"><label>Mức khẩn</label><select><option>Thường</option><option>Khẩn</option><option>Thượng khẩn</option><option>Hỏa tốc</option></select></div>
            <div className="fg"><label>Mức mật</label><select><option>Thường</option><option>Mật</option><option>Tối mật</option><option>Tuyệt mật</option></select></div>
          </div>
          <div className="form-row">
            <div className="fg"><label>Sổ đi</label><select><option>Sổ VB Đi 2026 (hiện tại: 47)</option></select></div>
            <div className="fg"><label>Hạn xử lý</label><input type="date" /></div>
          </div>
          <div className="form-row">
            <div className="fg"><label>Số ký hiệu</label><input className="auto" defaultValue="Tự động cấp khi ban hành" disabled /></div>
            <div className="fg"><label>Ngày ban hành</label><input className="auto" defaultValue="Tự động khi ban hành" disabled /></div>
          </div>
        </div>

        <div className="form-card">
          <div className="fc-title"><span>2</span> Tệp đính kèm</div>
          <div className="fg" style={{marginBottom:10}}><label>Tệp chính <span className="req">*</span></label>
            <div className="upload-area"><div className="ua-ico">📄</div><div className="ua-txt">Kéo thả hoặc click để tải lên tệp Word/PDF</div><div className="ua-hint">Hỗ trợ: .docx, .doc, .pdf — Tối đa 50MB</div></div>
          </div>
          <div className="fg"><label>Tệp đính kèm (phụ lục)</label>
            <div className="upload-area" style={{padding:16}}><div className="ua-txt" style={{fontSize:'.82rem'}}>+ Thêm tệp đính kèm</div></div>
          </div>
        </div>

        <div className="form-card">
          <div className="fc-title"><span>3</span> Luồng duyệt nội dung</div>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12,background:'#eff6ff',borderRadius:6,padding:'8px 10px'}}>
            <span style={{fontSize:'.82rem',color:'#1d4ed8'}}>ℹ️ Duyệt SONG SONG — tất cả người duyệt nhận thông báo cùng lúc</span>
          </div>
          <div className="person-list">
            <div className="person-item"><div className="pi-av orange">PG</div><div><div className="pi-name">Nguyễn Văn Phó GĐ</div><div className="pi-role">Phó Giám đốc · BGĐ</div></div><button style={{marginLeft:'auto',background:'none',border:'none',color:'#9aa0b4',cursor:'pointer'}}>✕</button></div>
            <div className="person-item"><div className="pi-av">KH</div><div><div className="pi-name">Trần Thị Trưởng KHTH</div><div className="pi-role">Trưởng phòng · P. KHTH</div></div><button style={{marginLeft:'auto',background:'none',border:'none',color:'#9aa0b4',cursor:'pointer'}}>✕</button></div>
          </div>
          <button style={{fontSize:'.82rem',color:'var(--orange)',background:'none',border:'1px dashed #fcd9c8',borderRadius:6,padding:'6px 14px',cursor:'pointer',width:'100%'}}>+ Thêm người duyệt</button>
        </div>

        <div className="form-card">
          <div className="fc-title"><span>4</span> Người ký</div>
          <div className="person-list">
            <div className="person-item on"><div className="pi-av" style={{background:'#c2410c'}}>GĐ</div><div><div className="pi-name">Lê Văn Giám Đốc</div><div className="pi-role">Giám đốc · BGĐ · Ký số USB Token</div></div><div className="pi-check">✓</div></div>
          </div>
        </div>
      </div></div>
      <div className="form-footer">
        <button className="btn btn-ghost" onClick={() => goScreen('s8')}>← Hủy</button>
        <button className="btn btn-ghost">💾 Lưu nháp</button>
        <button className="btn btn-primary" onClick={() => goScreen('s10')}>Gửi duyệt →</button>
      </div>
    </div>
  )
}
