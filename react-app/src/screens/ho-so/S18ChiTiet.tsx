import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

export default function S18ChiTiet() {
  const { goScreen } = useNavigation()

  return (
    <div className="cw">
      <Topbar breadcrumb={['Hồ sơ lưu trữ', 'HS2026-03-DEN · Hồ sơ VB Đến T3/2026']} onNavClick={() => goScreen('s16')} />
      <div className="work-area">
        <div className="content-pane">
          <div className="form-card" style={{marginBottom:16}}>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:16,marginBottom:16}}>
              <div>
                <div style={{fontSize:'1rem',fontWeight:700,color:'var(--dark)',marginBottom:4}}>Hồ sơ VB Đến tháng 3/2026</div>
                <div style={{fontSize:'.8rem',color:'var(--text3)',marginBottom:8}}>Mã: HS2026-03-DEN · Văn thư · Thời hạn bảo quản: 10 năm</div>
                <div style={{display:'flex',gap:6}}>
                  <span className="chip s">22 tài liệu</span>
                  <span className="chip process">Đang mở</span>
                  <span className="chip">Kho lưu trữ A</span>
                </div>
              </div>
              <div className="dp-btns">
                <button className="dp-btn primary" onClick={() => goScreen('s19')}>📥 Nộp lưu hồ sơ</button>
                <button className="dp-btn">📎 Xuất mục lục</button>
              </div>
            </div>
            <div className="stamp-grid" style={{marginTop:8}}>
              <div className="sg-item"><label>Đơn vị phụ trách</label><div className="sv">Văn thư</div></div>
              <div className="sg-item"><label>Năm hình thành</label><div className="sv">2026</div></div>
              <div className="sg-item"><label>Thời hạn bảo quản</label><div className="sv">10 năm (đến 2036)</div></div>
              <div className="sg-item"><label>Người tạo</label><div className="sv">Nguyễn Thị Văn Thư</div></div>
            </div>
          </div>

          <div className="form-card">
            <div className="fc-title">Tài liệu trong hồ sơ (22)</div>
            <div className="fbar" style={{padding:'8px 0',border:'none',borderBottom:'1px solid var(--border)',borderRadius:0,background:'transparent',marginBottom:12}}>
              <div className="sw"><span className="sw-ico">🔍</span><input placeholder="Tìm tài liệu..." /></div>
              <button className="fbtn">+ Thêm tài liệu</button>
            </div>
            <table className="ltable">
              <thead><tr><th style={{width:32}}>STT</th><th>Tài liệu</th><th>Số ký hiệu</th><th>Ngày</th><th>Ghi chú</th><th></th></tr></thead>
              <tbody>
                {[
                  {i:1,name:'V/v báo cáo tình hình KCB Q1/2026',code:'45/CV-SYT',date:'24/03/2026'},
                  {i:2,name:'Thông báo kiểm tra BHYT năm 2026',code:'12/TB-BHXH',date:'23/03/2026'},
                  {i:3,name:'Kế hoạch triển khai HIS giai đoạn 2',code:'08/KH-STTTT',date:'22/03/2026'},
                  {i:4,name:'Quyết định điều chỉnh định mức thuốc',code:'156/QĐ-BYT',date:'20/03/2026'},
                  {i:5,name:'Công văn hướng dẫn phòng chống dịch',code:'89/CV-CDC',date:'18/03/2026'},
                ].map(row => (
                  <tr key={row.i}>
                    <td style={{fontSize:'.82rem',color:'var(--text3)',textAlign:'center'}}>{row.i}</td>
                    <td><div className="lt-doc"><div className="lt-thumb">📄<span className="lt-ext">PDF</span></div><div><div className="lt-name">{row.name}</div></div></div></td>
                    <td style={{fontSize:'.82rem',fontFamily:'monospace',color:'#d94f1e'}}>{row.code}</td>
                    <td style={{fontSize:'.82rem',color:'var(--text3)'}}>{row.date}</td>
                    <td style={{fontSize:'.82rem',color:'var(--text3)'}}>—</td>
                    <td><div className="row-act"><button className="ra ra-g" style={{fontSize:'.72rem'}}>📎</button><button className="ra ra-m" style={{fontSize:'.72rem'}}>✕</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
