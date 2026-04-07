import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

export default function S7ThietLapLuong() {
  const { goScreen } = useNavigation()

  return (
    <div className="cw">
      <Topbar breadcrumb={['Văn bản Đến', '47 · 45/CV-SYT', 'Thiết lập luồng xử lý']} onNavClick={i => { if (i === 0) goScreen('s1') }} />
      <div className="work-area">
        <div className="content-pane" style={{maxWidth:640}}>
          <div className="form-card" style={{borderLeft:'3px solid #c2410c',padding:'14px 18px',marginBottom:12}}>
            <div style={{fontSize:'.7rem',fontWeight:700,color:'#9aa0b4',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:6}}>Ý kiến chỉ đạo của Giám đốc</div>
            <div style={{fontSize:'.86rem',color:'#3a3f52',lineHeight:1.6,background:'#fffbeb',border:'1px solid #fde68a',borderRadius:6,padding:'10px 12px'}}>
              Giao Phòng Kế hoạch Tổng hợp chủ trì, phối hợp Phòng Tài chính Kế toán tổng hợp số liệu và soạn thảo báo cáo gửi Sở Y tế trước 28/03/2026.
            </div>
            <div style={{fontSize:'.72rem',color:'#92400e',marginTop:6}}>— Lê Văn Giám Đốc · 25/03/2026 09:45</div>
          </div>

          <div className="form-card">
            <div className="fc-title"> Chọn đơn vị / người xử lý chính</div>
            <div className="routing-type">
              <div className="rt-opt on"><div className="rt-ico">🏢</div><div className="rt-lbl">Phòng ban</div><div className="rt-sub">Trưởng phòng phân công</div></div>
              <div className="rt-opt"><div className="rt-ico">👤</div><div className="rt-lbl">Cá nhân cụ thể</div><div className="rt-sub">Giao trực tiếp</div></div>
            </div>
            <div className="person-list">
              <div className="person-item on"><div className="pi-av orange">KH</div><div><div className="pi-name">Phòng Kế hoạch Tổng hợp</div><div className="pi-role">Chủ trì · Trưởng phòng: Nguyễn Văn A</div></div><div className="pi-check">✓</div></div>
              <div className="person-item"><div className="pi-av">TC</div><div><div className="pi-name">Phòng Tài chính Kế toán</div><div className="pi-role">Phối hợp</div></div><div className="pi-check">✓</div></div>
              <div className="person-item"><div className="pi-av">IT</div><div><div className="pi-name">Phòng CNTT</div><div className="pi-role">Hỗ trợ kỹ thuật</div></div><div className="pi-check">✓</div></div>
            </div>
            <button style={{fontSize:'.82rem',color:'var(--orange)',background:'none',border:'1px dashed #fcd9c8',borderRadius:6,padding:'6px 14px',cursor:'pointer',width:'100%'}}>+ Thêm đơn vị phối hợp</button>
          </div>

          <div className="form-card">
            <div className="fc-title"><span>2</span> Thời hạn xử lý</div>
            <div className="form-row">
              <div className="fg"><label>Hạn xử lý <span className="req">*</span></label><input type="date" defaultValue="2026-03-28" /><div className="hint" style={{color:'#b91c1c'}}>⚠️ Đã có hạn theo VB: 28/03/2026</div></div>
              <div className="fg"><label>Ghi chú cho người nhận</label><input placeholder="VD: Ưu tiên xử lý trước các công việc khác" /></div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-footer">
        <button className="btn btn-ghost" onClick={() => goScreen('s4')}>← Quay lại</button>
        <button className="btn btn-primary" onClick={() => goScreen('s5')}>Kích hoạt luồng xử lý →</button>
      </div>
    </div>
  )
}
