import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

export default function S14DanhSach() {
  const { goScreen } = useNavigation()

  return (
    <div className="cw">
      <Topbar breadcrumb={['Văn phòng số', 'Văn bản Nội bộ']} />
      <div className="stat-strip">
        <div className="si on"><div className="si-num">12</div><div className="si-lbl">Tổng nội bộ</div></div>
        <div className="si"><div className="si-num" style={{color:'#c2410c'}}>3</div><div className="si-lbl">Đang luân chuyển</div></div>
        <div className="si"><div className="si-num" style={{color:'#1a7a45'}}>9</div><div className="si-lbl">Hoàn thành</div></div>
      </div>
      <div className="fbar">
        <div className="sw"><span className="sw-ico">🔍</span><input placeholder="Tìm tên văn bản, người tạo..." /></div>
        <select className="fsel"><option>Tất cả loại</option><option>Thông báo nội bộ</option><option>Quy trình</option><option>Tờ trình</option></select>
        <button className="fbtn primary" onClick={() => goScreen('s15')}>+ Tạo VB nội bộ</button>
      </div>
      <div className="work-area"><div className="content-pane">
        <table className="ltable">
          <thead><tr><th style={{width:32}}><input type="checkbox" /></th><th>Văn bản</th><th>Loại</th><th>Người tạo</th><th>Ngày tạo</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
          <tbody>
            <tr><td><input type="checkbox" /></td>
              <td><div className="lt-doc"><div className="lt-thumb">📋<span className="lt-ext">DOC</span></div><div><div className="lt-name">Thông báo kế hoạch công tác tháng 4/2026</div><div className="lt-sub">BGĐ · 01/04/2026</div></div></div></td>
              <td style={{fontSize:'.82rem'}}>Thông báo</td><td style={{fontSize:'.82rem'}}>Lê Thị Thư Ký</td>
              <td style={{fontSize:'.82rem'}}>01/04/2026</td><td><span className="stag st-done">Hoàn thành</span></td>
              <td><div className="row-act"><button className="ra ra-g">Xem</button><button className="ra ra-m">···</button></div></td>
            </tr>
            <tr><td><input type="checkbox" /></td>
              <td><div className="lt-doc"><div className="lt-thumb">📋<span className="lt-ext">DOC</span></div><div><div className="lt-name">Tờ trình đề xuất mua sắm thiết bị phòng mổ</div><div className="lt-sub">P. HCNS · 30/03/2026</div></div></div></td>
              <td style={{fontSize:'.82rem'}}>Tờ trình</td><td style={{fontSize:'.82rem'}}>Trần Văn B</td>
              <td style={{fontSize:'.82rem'}}>30/03/2026</td><td><span className="stag st-process">Đang luân chuyển</span></td>
              <td><div className="row-act"><button className="ra ra-p">Xem</button><button className="ra ra-m">···</button></div></td>
            </tr>
            <tr><td><input type="checkbox" /></td>
              <td><div className="lt-doc"><div className="lt-thumb">📋<span className="lt-ext">DOC</span></div><div><div className="lt-name">Quy trình cấp phát thuốc nội trú cập nhật 2026</div><div className="lt-sub">P. Dược · 28/03/2026</div></div></div></td>
              <td style={{fontSize:'.82rem'}}>Quy trình</td><td style={{fontSize:'.82rem'}}>Phạm Thị C</td>
              <td style={{fontSize:'.82rem'}}>28/03/2026</td><td><span className="stag st-process">Đang luân chuyển</span></td>
              <td><div className="row-act"><button className="ra ra-p">Xem</button><button className="ra ra-m">···</button></div></td>
            </tr>
          </tbody>
        </table>
      </div></div>
    </div>
  )
}
