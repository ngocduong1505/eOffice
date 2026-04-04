import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

export default function S4ChiDao() {
  const { goScreen } = useNavigation()

  return (
    <div className="cw">
      <Topbar breadcrumb={['Văn bản Đến', '45/CV-SYT', 'Ghi ý kiến chỉ đạo']} onNavClick={i => { if (i === 0) goScreen('s1'); if (i === 1) goScreen('s3') }} />
      <div className="work-area">
        <div className="content-pane" style={{maxWidth:640}}>
          <div className="form-card" style={{borderLeft:'3px solid #b91c1c',padding:'14px 18px'}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
              <div style={{fontSize:'1.4rem'}}>📄</div>
              <div>
                <div style={{fontSize:'.88rem',fontWeight:700,color:'var(--dark)'}}>V/v báo cáo tình hình thực hiện kế hoạch KCB quý I/2026</div>
                <div style={{fontSize:'.75rem',color:'var(--text3)',marginTop:2}}>45/CV-SYT · Sở Y tế TP.HCM · 24/03/2026 · Đến <strong style={{color:'#b91c1c'}}>#47</strong></div>
              </div>
              <span className="urg urg-hot" style={{marginLeft:'auto'}}>Hỏa tốc</span>
            </div>
            <div style={{fontSize:'.82rem',color:'#5a6279',background:'#f7f8fb',padding:'8px 10px',borderRadius:6}}>
              📎 45_CV_SYT_KHCB_2026.pdf · <span style={{color:'var(--orange)',cursor:'pointer'}}>Xem toàn màn hình</span>
            </div>
          </div>

          <div className="form-card">
            <div className="fc-title"><span>1</span> Ý kiến chỉ đạo</div>
            <div className="directive-box">
              <div className="dir-title">✏️ Ý kiến của Giám đốc</div>
              <textarea className="dir-ta" defaultValue="Giao Phòng Kế hoạch Tổng hợp chủ trì, phối hợp với Phòng Tài chính Kế toán tổng hợp số liệu và soạn thảo báo cáo gửi Sở Y tế trước ngày 28/03/2026. Báo cáo cần đầy đủ các chỉ số theo mẫu hướng dẫn của Sở." />
            </div>
          </div>

          <div className="form-card">
            <div className="fc-title"><span>2</span> Giao xử lý</div>
            <div style={{marginBottom:14}}>
              <div className="routing-type">
                <div className="rt-opt on"><div className="rt-ico">🏢</div><div className="rt-lbl">Chọn phòng ban</div><div className="rt-sub">Trưởng phòng phân công</div></div>
                <div className="rt-opt"><div className="rt-ico">👤</div><div className="rt-lbl">Chọn người cụ thể</div><div className="rt-sub">Giao trực tiếp</div></div>
                <div className="rt-opt"><div className="rt-ico">👥</div><div className="rt-lbl">Nhiều đơn vị</div><div className="rt-sub">Phối hợp xử lý</div></div>
              </div>
            </div>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:'.75rem',fontWeight:600,color:'var(--text2)',marginBottom:6}}>Đơn vị chủ trì <span style={{color:'var(--orange)'}}>*</span></div>
              <div className="person-list">
                <div className="person-item on"><div className="pi-av orange">KH</div><div><div className="pi-name">Phòng Kế hoạch Tổng hợp</div><div className="pi-role">5 thành viên · Trưởng phòng: Nguyễn Văn A</div></div><div className="pi-check">✓</div></div>
                <div className="person-item"><div className="pi-av">TC</div><div><div className="pi-name">Phòng Tài chính Kế toán</div><div className="pi-role">4 thành viên · Trưởng phòng: Trần Thị B</div></div><div className="pi-check">✓</div></div>
                <div className="person-item"><div className="pi-av">HC</div><div><div className="pi-name">Phòng Hành chính Nhân sự</div><div className="pi-role">3 thành viên</div></div><div className="pi-check">✓</div></div>
              </div>
            </div>
            <div className="form-row">
              <div className="fg"><label>Đơn vị phối hợp</label><select><option>Phòng Tài chính Kế toán</option><option>Phòng CNTT</option></select></div>
              <div className="fg"><label>Hạn xử lý <span className="req">*</span></label><input type="date" defaultValue="2026-03-28" /><div className="hint" style={{color:'#b91c1c'}}>⚠️ Văn bản Hỏa tốc — hạn ngắn</div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-footer">
        <button className="btn btn-ghost" onClick={() => goScreen('s3')}>← Quay lại</button>
        <button className="btn btn-ghost">Lưu nháp</button>
        <button className="btn btn-primary" onClick={() => goScreen('s5')}>Lưu & Giao xử lý →</button>
      </div>
    </div>
  )
}
