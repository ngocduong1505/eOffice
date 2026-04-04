import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

export default function S1DanhSach() {
  const { goScreen } = useNavigation()

  return (
    <div className="cw">
      <Topbar breadcrumb={['Văn phòng số', 'Quản lý văn bản Đến']} />
      <div className="stat-strip">
        <div className="si on"><div className="si-num">47</div><div className="si-lbl">Tổng văn bản đến</div></div>
        <div className="si"><div className="si-num" style={{color:'#1d4ed8'}}>8</div><div className="si-lbl">Mới tiếp nhận</div></div>
        <div className="si"><div className="si-num" style={{color:'#c2410c'}}>14</div><div className="si-lbl">Đang xử lý</div></div>
        <div className="si"><div className="si-num" style={{color:'#b91c1c'}}>3</div><div className="si-lbl">Quá hạn</div></div>
        <div className="si"><div className="si-num" style={{color:'#1a7a45'}}>22</div><div className="si-lbl">Hoàn thành</div></div>
      </div>
      <div className="fbar">
        <div className="sw"><span className="sw-ico">🔍</span><input placeholder="Tìm theo tên, số đến, nơi gửi..." /></div>
        <select className="fsel"><option>Tất cả mức khẩn</option><option>🔴 Hỏa tốc</option><option>🟠 Thượng khẩn</option><option>🟡 Khẩn</option><option>⚪ Thường</option></select>
        <select className="fsel"><option>Tất cả trạng thái</option><option>Mới tiếp nhận</option><option>Đang xử lý</option><option>Hoàn thành</option></select>
        <select className="fsel"><option>Tất cả đơn vị</option><option>Phòng KHTH</option><option>Phòng HCNS</option><option>BGĐ</option></select>
        <input type="date" className="fsel" style={{color:'#3a3f52'}} />
        <button className="fbtn primary" onClick={() => goScreen('s2')}>+ Tiếp nhận văn bản</button>
      </div>
      <div className="work-area">
        <div className="content-pane">
          <table className="ltable">
            <thead>
              <tr>
                <th style={{width:32}}><input type="checkbox" /></th>
                <th>Văn bản</th><th>Số đến</th><th>Mức khẩn</th>
                <th>Đơn vị xử lý</th><th>Hạn xử lý</th><th>Trạng thái</th><th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr className="selected" onClick={() => goScreen('s3')}>
                <td><input type="checkbox" defaultChecked /></td>
                <td><div className="lt-doc"><div className="lt-thumb">📄<span className="lt-ext">PDF</span></div><div><div className="lt-name">V/v báo cáo tình hình thực hiện kế hoạch KCB</div><div className="lt-sub">45/CV-SYT · Sở Y tế TP.HCM · 24/03/2026</div></div></div></td>
                <td style={{fontWeight:700,color:'#d94f1e',fontSize:'.9rem'}}>#47</td>
                <td><span className="urg urg-hot">Hỏa tốc</span></td>
                <td style={{fontSize:'.82rem'}}>P. Kế hoạch TH</td>
                <td style={{fontSize:'.82rem',color:'#b91c1c',fontWeight:600}}>28/03/2026 ⚠️</td>
                <td><span className="stag st-process">Đang xử lý</span></td>
                <td><div className="row-act"><button className="ra ra-p" onClick={e => {e.stopPropagation(); goScreen('s3')}}>Xem</button><button className="ra ra-m">···</button></div></td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td><div className="lt-doc"><div className="lt-thumb">📄<span className="lt-ext">PDF</span></div><div><div className="lt-name">Thông báo lịch kiểm tra công tác BHYT năm 2026</div><div className="lt-sub">12/TB-BHXH · BHXH TP.HCM · 23/03/2026</div></div></div></td>
                <td style={{fontWeight:700,color:'#d94f1e',fontSize:'.9rem'}}>#46</td>
                <td><span className="urg urg-vurg">Thượng khẩn</span></td>
                <td style={{fontSize:'.82rem'}}>BGĐ</td>
                <td style={{fontSize:'.82rem',color:'#c2410c'}}>25/03/2026</td>
                <td><span className="stag st-direct">Chờ chỉ đạo</span></td>
                <td><div className="row-act"><button className="ra ra-p">Xem</button><button className="ra ra-m">···</button></div></td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td><div className="lt-doc"><div className="lt-thumb">📝<span className="lt-ext">DOC</span></div><div><div className="lt-name">Kế hoạch triển khai hệ thống HIS giai đoạn 2</div><div className="lt-sub">08/KH-STTTT · Sở TT&TT · 22/03/2026</div></div></div></td>
                <td style={{fontWeight:700,color:'#d94f1e',fontSize:'.9rem'}}>#45</td>
                <td><span className="urg urg-urg">Khẩn</span></td>
                <td style={{fontSize:'.82rem'}}>P. CNTT</td>
                <td style={{fontSize:'.82rem',color:'#5a6279'}}>01/04/2026</td>
                <td><span className="stag st-stamp">Đã đóng dấu</span></td>
                <td><div className="row-act"><button className="ra ra-p">Xem</button><button className="ra ra-m">···</button></div></td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td><div className="lt-doc"><div className="lt-thumb">📄<span className="lt-ext">PDF</span></div><div><div className="lt-name">Quyết định về việc điều chỉnh định mức thuốc</div><div className="lt-sub">156/QĐ-BYT · Bộ Y tế · 20/03/2026</div></div></div></td>
                <td style={{fontWeight:700,color:'#d94f1e',fontSize:'.9rem'}}>#44</td>
                <td><span className="urg urg-norm">Thường</span></td>
                <td style={{fontSize:'.82rem'}}>P. Dược</td>
                <td style={{fontSize:'.82rem',color:'#1a7a45'}}>10/04/2026</td>
                <td><span className="stag st-done">Hoàn thành</span></td>
                <td><div className="row-act"><button className="ra ra-g">Xem</button><button className="ra ra-m">···</button></div></td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td><div className="lt-doc"><div className="lt-thumb">📄<span className="lt-ext">PDF</span></div><div><div className="lt-name">Công văn hướng dẫn phòng chống dịch mùa hè 2026</div><div className="lt-sub">89/CV-CDC · CDC TP.HCM · 18/03/2026</div></div></div></td>
                <td style={{fontWeight:700,color:'#d94f1e',fontSize:'.9rem'}}>#43</td>
                <td><span className="urg urg-norm">Thường</span></td>
                <td style={{fontSize:'.82rem'}}>P. KHTH</td>
                <td style={{fontSize:'.82rem',color:'#b91c1c',fontWeight:600}}>20/03/2026 ⚠️</td>
                <td><span className="stag st-overdue">Quá hạn</span></td>
                <td><div className="row-act"><button className="ra ra-p">Xem</button><button className="ra ra-m">···</button></div></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
