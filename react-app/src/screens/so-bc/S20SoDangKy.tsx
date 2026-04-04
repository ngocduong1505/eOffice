import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

export default function S20SoDangKy() {
  const { goScreen } = useNavigation()

  return (
    <div className="cw">
      <Topbar breadcrumb={['Sổ & Báo cáo', 'Sổ đăng ký văn bản']} />
      <div className="stat-strip">
        <div className="si on"><div className="si-num">47</div><div className="si-lbl">VB đến Q1</div></div>
        <div className="si"><div className="si-num" style={{color:'#1d4ed8'}}>48</div><div className="si-lbl">VB đi Q1</div></div>
        <div className="si"><div className="si-num" style={{color:'#854d0e'}}>12</div><div className="si-lbl">Nội bộ</div></div>
      </div>
      <div className="fbar">
        <div className="sw"><span className="sw-ico">🔍</span><input placeholder="Tìm số văn bản..." /></div>
        <select className="fsel"><option>Sổ VB Đến 2026</option><option>Sổ VB Đi 2026</option><option>Sổ Nội bộ 2026</option></select>
        <select className="fsel"><option>Tháng 3/2026</option><option>Tháng 2/2026</option><option>Tháng 1/2026</option></select>
        <button className="fbtn">📎 Xuất Excel</button>
      </div>
      <div className="work-area"><div className="content-pane">
        <div style={{marginBottom:16,fontSize:'.85rem',fontWeight:700,color:'var(--dark)'}}>Sổ Văn bản Đến 2026 — Tháng 3</div>
        <table className="ltable">
          <thead><tr><th>STT</th><th>Số đến</th><th>Ngày đến</th><th>Tên văn bản</th><th>Nơi gửi</th><th>Số ký hiệu gốc</th><th>Mức khẩn</th><th>Đơn vị xử lý</th><th>Trạng thái</th></tr></thead>
          <tbody>
            <tr><td style={{textalign:'center',fontSize:'.82rem',color:'var(--text3)'}}>1</td><td style={{fontWeight:700,color:'#d94f1e'}}>#47</td><td style={{fontSize:'.82rem'}}>25/03/2026</td>
              <td style={{fontSize:'.82rem',maxWidth:180}}>V/v báo cáo tình hình KCB</td><td style={{fontSize:'.82rem'}}>Sở Y tế TP.HCM</td>
              <td style={{fontSize:'.82rem',fontFamily:'monospace'}}>45/CV-SYT</td><td><span className="urg urg-hot" style={{fontSize:'.65rem'}}>Hỏa tốc</span></td>
              <td style={{fontSize:'.82rem'}}>P. KHTH</td><td><span className="stag st-process">Đang xử lý</span></td>
            </tr>
            <tr><td style={{textalign:'center',fontSize:'.82rem',color:'var(--text3)'}}>2</td><td style={{fontWeight:700,color:'#d94f1e'}}>#46</td><td style={{fontSize:'.82rem'}}>24/03/2026</td>
              <td style={{fontSize:'.82rem',maxWidth:180}}>Thông báo kiểm tra BHYT 2026</td><td style={{fontSize:'.82rem'}}>BHXH TP.HCM</td>
              <td style={{fontSize:'.82rem',fontFamily:'monospace'}}>12/TB-BHXH</td><td><span className="urg urg-vurg" style={{fontSize:'.65rem'}}>T.Khẩn</span></td>
              <td style={{fontSize:'.82rem'}}>BGĐ</td><td><span className="stag st-direct">Chờ chỉ đạo</span></td>
            </tr>
            <tr><td style={{textalign:'center',fontSize:'.82rem',color:'var(--text3)'}}>3</td><td style={{fontWeight:700,color:'#d94f1e'}}>#45</td><td style={{fontSize:'.82rem'}}>22/03/2026</td>
              <td style={{fontSize:'.82rem',maxWidth:180}}>Kế hoạch triển khai HIS gđ 2</td><td style={{fontSize:'.82rem'}}>Sở TT&TT</td>
              <td style={{fontSize:'.82rem',fontFamily:'monospace'}}>08/KH-STTTT</td><td><span className="urg urg-urg" style={{fontSize:'.65rem'}}>Khẩn</span></td>
              <td style={{fontSize:'.82rem'}}>P. CNTT</td><td><span className="stag st-stamp">Đã đóng dấu</span></td>
            </tr>
          </tbody>
        </table>
      </div></div>
    </div>
  )
}
