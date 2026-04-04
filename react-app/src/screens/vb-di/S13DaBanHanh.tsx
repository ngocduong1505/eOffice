import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

export default function S13DaBanHanh() {
  const { goScreen } = useNavigation()

  return (
    <div className="cw">
      <Topbar breadcrumb={['Văn bản Đi', 'Đã ban hành']} onNavClick={() => goScreen('s8')} />
      <div className="stat-strip">
        <div className="si on"><div className="si-num">47</div><div className="si-lbl">Tổng đã ban hành</div></div>
        <div className="si"><div className="si-num" style={{color:'#1d4ed8'}}>12</div><div className="si-lbl">Tháng này</div></div>
        <div className="si"><div className="si-num" style={{color:'#1a7a45'}}>35</div><div className="si-lbl">Trước đó</div></div>
      </div>
      <div className="fbar">
        <div className="sw"><span className="sw-ico">🔍</span><input placeholder="Tìm số ký hiệu, tên VB..." /></div>
        <select className="fsel"><option>Tất cả loại</option><option>Công văn</option><option>Quyết định</option><option>Thông báo</option></select>
        <input type="date" className="fsel" style={{color:'#3a3f52'}} />
        <input type="date" className="fsel" style={{color:'#3a3f52'}} />
      </div>
      <div className="work-area"><div className="content-pane">
        <table className="ltable">
          <thead><tr><th style={{width:32}}><input type="checkbox" /></th><th>Văn bản</th><th>Số ký hiệu</th><th>Loại</th><th>Ngày ban hành</th><th>Người ký</th><th>Thao tác</th></tr></thead>
          <tbody>
            <tr><td><input type="checkbox" /></td>
              <td><div className="lt-doc"><div className="lt-thumb">📄<span className="lt-ext">PDF</span></div><div><div className="lt-name">Công văn phản hồi kết quả kiểm tra BHYT</div><div className="lt-sub">P. KHTH · 22/03/2026</div></div></div></td>
              <td style={{fontWeight:700,color:'#1a7a45',fontSize:'.88rem'}}>46/CV-BV</td><td style={{fontSize:'.82rem'}}>Công văn</td>
              <td style={{fontSize:'.82rem'}}>22/03/2026</td><td style={{fontSize:'.82rem'}}>Lê Văn Giám Đốc</td>
              <td><div className="row-act"><button className="ra ra-g">Xem</button><button className="ra ra-m">📎</button></div></td>
            </tr>
            <tr><td><input type="checkbox" /></td>
              <td><div className="lt-doc"><div className="lt-thumb">📄<span className="lt-ext">PDF</span></div><div><div className="lt-name">Thông báo lịch họp giao ban tháng 3/2026</div><div className="lt-sub">BGĐ · 18/03/2026</div></div></div></td>
              <td style={{fontWeight:700,color:'#1a7a45',fontSize:'.88rem'}}>45/TB-BV</td><td style={{fontSize:'.82rem'}}>Thông báo</td>
              <td style={{fontSize:'.82rem'}}>18/03/2026</td><td style={{fontSize:'.82rem'}}>Nguyễn Văn Phó GĐ</td>
              <td><div className="row-act"><button className="ra ra-g">Xem</button><button className="ra ra-m">📎</button></div></td>
            </tr>
            <tr><td><input type="checkbox" /></td>
              <td><div className="lt-doc"><div className="lt-thumb">📄<span className="lt-ext">PDF</span></div><div><div className="lt-name">Công văn đề nghị bổ sung kinh phí hoạt động</div><div className="lt-sub">P. TCKT · 15/03/2026</div></div></div></td>
              <td style={{fontWeight:700,color:'#1a7a45',fontSize:'.88rem'}}>44/CV-BV</td><td style={{fontSize:'.82rem'}}>Công văn</td>
              <td style={{fontSize:'.82rem'}}>15/03/2026</td><td style={{fontSize:'.82rem'}}>Lê Văn Giám Đốc</td>
              <td><div className="row-act"><button className="ra ra-g">Xem</button><button className="ra ra-m">📎</button></div></td>
            </tr>
          </tbody>
        </table>
      </div></div>
    </div>
  )
}
