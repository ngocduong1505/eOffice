import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

export default function S10DuyetSongSong() {
  const { goScreen } = useNavigation()

  return (
    <div className="cw">
      <Topbar breadcrumb={['Văn bản Đi', 'Báo cáo KCB Q1/2026', 'Duyệt nội dung']} onNavClick={i => { if (i === 0) goScreen('s8') }} />
      <div className="work-area">
        <div className="content-pane" style={{maxWidth:420,borderRight:'1px solid var(--border)'}}>
          <div className="form-card" style={{padding:14}}>
            <div style={{fontSize:'.75rem',fontWeight:700,color:'var(--text3)',textTransform:'uppercase',marginBottom:8}}>Thông tin VB</div>
            <div style={{fontSize:'.88rem',fontWeight:700,color:'var(--dark)',marginBottom:6}}>Báo cáo công tác KCB quý I/2026</div>
            <div style={{fontSize:'.75rem',color:'var(--text3)',marginBottom:8}}>P. Kế hoạch TH · Báo cáo · 27/03/2026</div>
            <span className="stag" style={{background:'#fef0eb',color:'#c2410c'}}>Đang duyệt nội dung</span>
            <div style={{marginTop:12,background:'#f7f8fb',border:'1px solid var(--border)',borderRadius:6,padding:12,display:'flex',alignItems:'center',gap:10}}>
              <div style={{fontSize:'2rem'}}>📄</div>
              <div><div style={{fontSize:'.84rem',fontWeight:600}}>BaoCao_KCB_Q1_2026.docx</div><div style={{fontSize:'.72rem',color:'var(--text3)'}}>2.4 MB · Tải xuống</div></div>
            </div>
          </div>
          <div className="form-card" style={{padding:14,border:'1.5px solid var(--orange)'}}>
            <div style={{fontSize:'.75rem',fontWeight:700,color:'#c2410c',textTransform:'uppercase',marginBottom:10}}>Hành động của bạn</div>
            <textarea className="dir-ta" placeholder="Ghi chú hoặc yêu cầu chỉnh sửa (nếu có)..." />
            <div style={{display:'flex',gap:8,marginTop:10}}>
              <button className="btn btn-primary" style={{flex:1,background:'#1a7a45',borderColor:'#1a7a45'}} onClick={() => goScreen('s8')}>✓ Đồng ý duyệt</button>
              <button className="btn" style={{flex:1,background:'#fef2f2',borderColor:'#fca5a5',color:'#b91c1c'}} onClick={() => goScreen('s8')}>✕ Từ chối</button>
            </div>
            <button className="btn btn-ghost" style={{width:'100%',marginTop:6}}>📝 Yêu cầu chỉnh sửa</button>
          </div>
        </div>
        <div className="detail-panel open" style={{width:480,minWidth:480}}>
          <div className="dp-head">
            <div className="dp-head-row"><div className="dp-title">Tiến độ duyệt nội dung</div></div>
            <div style={{background:'#f7f8fb',borderRadius:8,padding:'10px 12px',marginBottom:12}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:'.8rem',color:'var(--text2)',marginBottom:6}}><span>Đã duyệt</span><span style={{fontWeight:700,color:'#c2410c'}}>2 / 3 người</span></div>
              <div style={{height:6,background:'#f0f1f4',borderRadius:3}}><div style={{height:6,width:'66%',background:'#f59e0b',borderRadius:3}} /></div>
              <div style={{fontSize:'.72rem',color:'#92400e',marginTop:5}}>Chờ 1 người nữa đồng ý để chuyển sang Trình ký</div>
            </div>
            <div className="dp-btns">
              <button className="dp-btn">📎 Tải VB</button>
              <button className="dp-btn danger" onClick={() => goScreen('s8')}>✕ Thu hồi VB</button>
            </div>
          </div>
          <div className="dp-body" style={{padding:16}}>
            <div className="is-title">Danh sách người duyệt</div>
            <div className="flow-step"><div className="fs-dot done">✓</div><div className="fs-info"><div className="fs-label">Nguyễn Văn Phó GĐ</div><div className="fs-sub">Phó Giám đốc</div><div className="fs-status fss-done">✓ Đồng ý duyệt</div><div className="fs-time">27/03 09:15</div><div className="fs-note"><div className="fs-note-label">Ghi chú</div>Nội dung đầy đủ, số liệu khớp với báo cáo nội bộ.</div></div></div>
            <div className="flow-step"><div className="fs-dot done">✓</div><div className="fs-info"><div className="fs-label">Trần Thị Trưởng P.KHTH</div><div className="fs-sub">Trưởng phòng KHTH</div><div className="fs-status fss-done">✓ Đồng ý duyệt</div><div className="fs-time">27/03 10:30</div></div></div>
            <div className="flow-step"><div className="fs-dot active">⏳</div><div className="fs-info"><div className="fs-label">Lê Thị Trưởng P.TCKT</div><div className="fs-sub">Trưởng phòng Tài chính KT</div><div className="fs-status fss-active">⏳ Chưa duyệt · Nhận lúc 27/03 08:00</div></div></div>
            <div style={{marginTop:12,padding:10,background:'#eff6ff',borderRadius:6,fontSize:'.8rem',color:'#1d4ed8'}}>ℹ️ Người duyệt có thể thêm người duyệt khác trong khi luồng đang chạy</div>
            <button style={{fontSize:'.82rem',color:'var(--orange)',background:'none',border:'1px dashed #fcd9c8',borderRadius:6,padding:'6px 14px',cursor:'pointer',width:'100%',marginTop:10}}>+ Thêm người duyệt</button>
          </div>
        </div>
      </div>
    </div>
  )
}
