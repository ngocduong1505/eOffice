import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

export default function S8DanhSach() {
  const { goScreen } = useNavigation()

  return (
    <div className="cw">
      <Topbar breadcrumb={['Văn phòng số', 'Văn bản Đi']} />
      <div className="stat-strip">
        <div className="si on"><div className="si-num">3</div><div className="si-lbl">Đang soạn</div></div>
        <div className="si"><div className="si-num" style={{color:'#c2410c'}}>5</div><div className="si-lbl">Đang duyệt</div></div>
        <div className="si"><div className="si-num" style={{color:'#854d0e'}}>2</div><div className="si-lbl">Chờ ký</div></div>
        <div className="si"><div className="si-num" style={{color:'#1d4ed8'}}>4</div><div className="si-lbl">Chờ ban hành</div></div>
        <div className="si"><div className="si-num" style={{color:'#1a7a45'}}>47</div><div className="si-lbl">Đã ban hành</div></div>
      </div>
      <div className="fbar">
        <div className="sw"><span className="sw-ico">🔍</span><input placeholder="Tìm tên VB, số ký hiệu..." /></div>
        <select className="fsel"><option>Tất cả loại VB</option><option>Công văn</option><option>Quyết định</option><option>Thông báo</option></select>
        <select className="fsel"><option>Tất cả trạng thái</option><option>Đang soạn</option><option>Đang duyệt</option><option>Chờ ký</option><option>Chờ ban hành</option><option>Đã ban hành</option></select>
        <button className="fbtn primary" onClick={() => goScreen('s9')}>+ Soạn VB mới</button>
      </div>
      <div className="work-area"><div className="content-pane">
        <table className="ltable">
          <thead><tr><th style={{width:32}}><input type="checkbox" /></th><th>Văn bản</th><th>Số ký hiệu</th><th>Loại</th><th>Người soạn</th><th>Hạn</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
          <tbody>
            <tr onClick={() => goScreen('s10')}><td><input type="checkbox" /></td>
              <td><div className="lt-doc"><div className="lt-thumb">📝<span className="lt-ext">DOC</span></div><div><div className="lt-name">Báo cáo công tác KCB quý I/2026</div><div className="lt-sub">P. Kế hoạch TH · 27/03/2026</div></div></div></td>
              <td style={{fontSize:'.82rem',color:'#9aa0b4',fontStyle:'italic'}}>Chưa cấp</td><td style={{fontSize:'.82rem'}}>Báo cáo</td>
              <td style={{fontSize:'.82rem'}}>Nguyễn Văn A</td><td style={{fontSize:'.82rem',color:'#c2410c'}}>28/03/2026</td>
              <td><span className="stag" style={{background:'#fef0eb',color:'#c2410c'}}>Đang duyệt 2/3</span></td>
              <td><div className="row-act"><button className="ra ra-p" onClick={e => {e.stopPropagation();goScreen('s10')}}>Xem</button></div></td>
            </tr>
            <tr onClick={() => goScreen('s11')}><td><input type="checkbox" /></td>
              <td><div className="lt-doc"><div className="lt-thumb">📄<span className="lt-ext">DOC</span></div><div><div className="lt-name">Công văn đề nghị cung cấp vật tư y tế</div><div className="lt-sub">P. HCNS · 26/03/2026</div></div></div></td>
              <td style={{fontSize:'.82rem',color:'#9aa0b4',fontStyle:'italic'}}>Chưa cấp</td><td style={{fontSize:'.82rem'}}>Công văn</td>
              <td style={{fontSize:'.82rem'}}>Trần Thị C</td><td style={{fontSize:'.82rem',color:'#854d0e'}}>30/03/2026</td>
              <td><span className="stag" style={{background:'#fefce8',color:'#854d0e'}}>Chờ GĐ ký</span></td>
              <td><div className="row-act"><button className="ra ra-p" onClick={e => {e.stopPropagation();goScreen('s11')}}>Xem</button></div></td>
            </tr>
            <tr onClick={() => goScreen('s12')}><td><input type="checkbox" /></td>
              <td><div className="lt-doc"><div className="lt-thumb">📄<span className="lt-ext">PDF</span></div><div><div className="lt-name">Quyết định thành lập tổ công tác phòng chống dịch</div><div className="lt-sub">BGĐ · 25/03/2026</div></div></div></td>
              <td style={{fontSize:'.82rem',color:'#9aa0b4',fontStyle:'italic'}}>Chưa cấp</td><td style={{fontSize:'.82rem'}}>Quyết định</td>
              <td style={{fontSize:'.82rem'}}>Lê Thị D</td><td style={{fontSize:'.82rem'}}>31/03/2026</td>
              <td><span className="stag" style={{background:'#eff6ff',color:'#1d4ed8'}}>Chờ ban hành</span></td>
              <td><div className="row-act"><button className="ra ra-p" onClick={e => {e.stopPropagation();goScreen('s12')}}>Cấp số</button></div></td>
            </tr>
            <tr onClick={() => goScreen('s13')}><td><input type="checkbox" /></td>
              <td><div className="lt-doc"><div className="lt-thumb">📄<span className="lt-ext">PDF</span></div><div><div className="lt-name">Công văn phản hồi kết quả kiểm tra BHYT</div><div className="lt-sub">P. KHTH · 20/03/2026</div></div></div></td>
              <td style={{fontWeight:700,color:'#1a7a45',fontSize:'.88rem'}}>46/CV-BV</td><td style={{fontSize:'.82rem'}}>Công văn</td>
              <td style={{fontSize:'.82rem'}}>Nguyễn Văn A</td><td style={{fontSize:'.82rem'}}>22/03/2026</td>
              <td><span className="stag st-done">Đã ban hành</span></td>
              <td><div className="row-act"><button className="ra ra-g" onClick={e => {e.stopPropagation();goScreen('s13')}}>Xem</button></div></td>
            </tr>
          </tbody>
        </table>
      </div></div>
    </div>
  )
}
