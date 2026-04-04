import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

export default function S12CapSoBanHanh() {
  const { goScreen } = useNavigation()

  return (
    <div className="cw">
      <Topbar breadcrumb={['Văn bản Đi', 'QĐ thành lập tổ công tác', 'Cấp số & Ban hành']} onNavClick={i => { if (i === 0) goScreen('s8') }} />
      <div className="work-area">
        <div className="content-pane" style={{maxWidth:640}}>
          <div className="form-card" style={{borderLeft:'3px solid #1a7a45',padding:'14px 18px',marginBottom:12}}>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div style={{fontSize:'1.4rem'}}>📄</div>
              <div>
                <div style={{fontSize:'.88rem',fontWeight:700,color:'var(--dark)'}}>Quyết định thành lập tổ công tác phòng chống dịch</div>
                <div style={{fontSize:'.75rem',color:'var(--text3)',marginTop:2}}>BGĐ · Quyết định · Đã ký số bởi Giám đốc</div>
              </div>
              <span className="stag" style={{background:'#eff6ff',color:'#1d4ed8',marginLeft:'auto'}}>Chờ ban hành</span>
            </div>
          </div>

          <div className="form-card">
            <div className="fc-title"><span>1</span> Cấp số văn bản đi</div>
            <div className="form-row tri">
              <div className="fg"><label>Số đi (tự động)</label><input className="auto" defaultValue="#48" readOnly /><div className="hint">Theo sổ VB Đi 2026</div></div>
              <div className="fg"><label>Ngày ban hành</label><input className="auto" defaultValue="31/03/2026" readOnly /></div>
              <div className="fg"><label>Ký hiệu văn bản <span className="req">*</span></label><input defaultValue="48/QĐ-BV" /></div>
            </div>
            <div className="form-row">
              <div className="fg"><label>Sổ đi</label><select><option>Sổ VB Đi 2026 (hiện tại: 47)</option></select></div>
              <div className="fg"><label>Người cấp số</label><input className="auto" defaultValue="Nguyễn Thị Văn Thư" readOnly /></div>
            </div>
          </div>

          <div className="form-card">
            <div className="fc-title"><span>2</span> Đóng dấu & Phát hành</div>
            <div style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',background:'#edfbf4',border:'1px solid #a7f3d0',borderRadius:8,marginBottom:14}}>
              <div style={{fontSize:'1.2rem'}}>✅</div>
              <div style={{fontSize:'.84rem',color:'#065f46'}}>Văn bản đã được ký số điện tử — Không cần đóng dấu vật lý</div>
            </div>
            <div className="form-row full">
              <div className="fg"><label>Đơn vị / người nhận</label><input placeholder="VD: Các phòng ban, BHXH TP.HCM..." /></div>
            </div>
            <div className="form-row full">
              <div className="fg"><label>Ghi chú phát hành</label><textarea placeholder="Hướng dẫn gửi văn bản..." /></div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-footer">
        <button className="btn btn-ghost" onClick={() => goScreen('s11')}>← Quay lại</button>
        <button className="btn btn-primary" onClick={() => goScreen('s13')}>✓ Cấp số & Ban hành →</button>
      </div>
    </div>
  )
}
