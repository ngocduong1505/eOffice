import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

export default function S16DanhSach() {
  const { goScreen } = useNavigation()

  return (
    <div className="cw">
      <Topbar breadcrumb={['Văn phòng số', 'Hồ sơ lưu trữ']} />
      <div className="stat-strip">
        <div className="si on"><div className="si-num">24</div><div className="si-lbl">Tổng hồ sơ</div></div>
        <div className="si"><div className="si-num" style={{color:'#c2410c'}}>5</div><div className="si-lbl">Đang mở</div></div>
        <div className="si"><div className="si-num" style={{color:'#854d0e'}}>3</div><div className="si-lbl">Chờ nộp lưu</div></div>
        <div className="si"><div className="si-num" style={{color:'#1a7a45'}}>16</div><div className="si-lbl">Đã lưu kho</div></div>
      </div>
      <div className="fbar">
        <div className="sw"><span className="sw-ico">🔍</span><input placeholder="Tìm theo tên hồ sơ, năm..." /></div>
        <select className="fsel"><option>Tất cả năm</option><option>2026</option><option>2025</option><option>2024</option></select>
        <select className="fsel"><option>Tất cả phòng ban</option><option>P. KHTH</option><option>P. TCKT</option><option>BGĐ</option></select>
        <button className="fbtn primary" onClick={() => goScreen('s17')}>+ Tạo hồ sơ mới</button>
      </div>
      <div className="work-area"><div className="content-pane">
        <table className="ltable">
          <thead><tr><th>Hồ sơ</th><th>Đơn vị</th><th>Thời hạn bảo quản</th><th>Tài liệu</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
          <tbody>
            <tr onClick={() => goScreen('s18')}>
              <td><div className="lt-doc"><div className="lt-thumb">🗂<span className="lt-ext">HS</span></div><div><div className="lt-name">Hồ sơ VB Đến tháng 3/2026</div><div className="lt-sub">Mã HS: HS2026-03-DEN · 22 văn bản</div></div></div></td>
              <td style={{fontSize:'.82rem'}}>Văn thư</td>
              <td style={{fontSize:'.82rem'}}>10 năm (đến 2036)</td>
              <td style={{fontSize:'.82rem',fontWeight:600}}>22 tài liệu</td>
              <td><span className="stag st-process">Đang mở</span></td>
              <td><div className="row-act"><button className="ra ra-p" onClick={e=>{e.stopPropagation();goScreen('s18')}}>Xem</button><button className="ra ra-p" onClick={e=>{e.stopPropagation();goScreen('s19')}}>Nộp lưu</button></div></td>
            </tr>
            <tr>
              <td><div className="lt-doc"><div className="lt-thumb">🗂<span className="lt-ext">HS</span></div><div><div className="lt-name">Hồ sơ Thi đua - Khen thưởng Q1/2026</div><div className="lt-sub">Mã HS: HS2026-TD-Q1 · 8 văn bản</div></div></div></td>
              <td style={{fontSize:'.82rem'}}>P. HCNS</td>
              <td style={{fontSize:'.82rem'}}>5 năm (đến 2031)</td>
              <td style={{fontSize:'.82rem',fontWeight:600}}>8 tài liệu</td>
              <td><span className="stag" style={{background:'#fffbeb',color:'#92400e'}}>Chờ nộp lưu</span></td>
              <td><div className="row-act"><button className="ra ra-g">Xem</button></div></td>
            </tr>
            <tr>
              <td><div className="lt-doc"><div className="lt-thumb">🗂<span className="lt-ext">HS</span></div><div><div className="lt-name">Hồ sơ Nhân sự năm 2025</div><div className="lt-sub">Mã HS: HS2025-NS · 47 văn bản</div></div></div></td>
              <td style={{fontSize:'.82rem'}}>P. HCNS</td>
              <td style={{fontSize:'.82rem'}}>70 năm</td>
              <td style={{fontSize:'.82rem',fontWeight:600}}>47 tài liệu</td>
              <td><span className="stag st-done">Đã lưu kho</span></td>
              <td><div className="row-act"><button className="ra ra-g">Xem</button></div></td>
            </tr>
          </tbody>
        </table>
      </div></div>
    </div>
  )
}
