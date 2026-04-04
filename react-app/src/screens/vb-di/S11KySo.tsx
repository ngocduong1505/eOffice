import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

export default function S11KySo() {
  const { goScreen } = useNavigation()

  return (
    <div className="cw">
      <Topbar breadcrumb={['Văn bản Đi', 'CV đề nghị cung cấp vật tư', 'Ký số']} onNavClick={i => { if (i === 0) goScreen('s8') }} />
      <div className="work-area">
        <div className="content-pane" style={{flex:1,background:'#3a3f52',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'#fff',width:420,height:560,borderRadius:4,boxShadow:'0 8px 32px rgba(0,0,0,.3)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:10,color:'var(--text3)'}}>
            <div style={{fontSize:'3rem'}}>📄</div>
            <div style={{fontSize:'.9rem',fontWeight:600,color:'var(--dark)'}}>CongVan_VatTuYTe.pdf</div>
            <div style={{fontSize:'.75rem'}}>2 trang · 1.2 MB</div>
            <button style={{marginTop:8,padding:'7px 18px',background:'var(--orange)',color:'#fff',border:'none',borderRadius:6,fontSize:'.84rem',cursor:'pointer'}}>Xem toàn màn hình</button>
          </div>
        </div>
        <div className="detail-panel open" style={{width:480,minWidth:480}}>
          <div className="dp-head">
            <div className="dp-head-row"><div className="dp-title">Công văn đề nghị cung cấp vật tư y tế</div></div>
            <div className="dp-chips"><span className="chip">Công văn</span><span className="chip s">Chờ GĐ ký</span><span className="chip">P. HCNS</span></div>
          </div>
          <div className="dp-body" style={{padding:16}}>
            <div className="info-section">
              <div className="is-title">Đã duyệt bởi</div>
              <div className="act-item"><div className="act-dot ok">✓</div><div><div className="act-text"><strong>Nguyễn Văn Phó GĐ</strong> đồng ý duyệt</div><span className="act-time">26/03 14:20</span></div></div>
              <div className="act-item"><div className="act-dot ok">✓</div><div><div className="act-text"><strong>Trưởng P.HCNS</strong> đồng ý duyệt</div><span className="act-time">26/03 15:45</span></div></div>
            </div>
            <div className="directive-box" style={{background:'#f0fdf4',borderColor:'#a7f3d0'}}>
              <div className="dir-title" style={{color:'#065f46'}}>✏️ Chỉ đạo phát hành (sau khi ký)</div>
              <textarea className="dir-ta" style={{borderColor:'#a7f3d0'}} placeholder="VD: Gửi Cty Thiết bị Y tế ABC và lưu hồ sơ P.HCNS..." />
            </div>
            <div style={{background:'#f7f8fb',border:'1px solid var(--border)',borderRadius:8,padding:14,marginBottom:14}}>
              <div style={{fontSize:'.75rem',fontWeight:700,color:'var(--text3)',textTransform:'uppercase',marginBottom:8}}>🔐 Ký số</div>
              <div style={{fontSize:'.82rem',color:'#5a6279',marginBottom:10}}>Cắm USB Token và nhấn ký để ký số lên văn bản</div>
              <div style={{display:'flex',alignItems:'center',gap:8,fontSize:'.75rem',color:'#1a7a45',background:'#edfbf4',border:'1px solid #a7f3d0',borderRadius:6,padding:'8px 10px',marginBottom:10}}>✓ USB Token đã kết nối · VNPT-CA · Lê Văn Giám Đốc</div>
              <button className="btn btn-primary" style={{width:'100%',fontSize:'.9rem'}} onClick={() => goScreen('s12')}>🔐 Ký số văn bản này</button>
            </div>
            <div style={{fontSize:'.75rem',color:'var(--text3)',textAlign:'center'}}>Sau khi ký, văn bản chuyển tự động đến Văn thư để cấp số & đóng dấu</div>
          </div>
        </div>
      </div>
    </div>
  )
}
