import { useState } from 'react'
import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

export default function S2TaoVbDen() {
  const { goScreen } = useNavigation()
  const [noiGui, setNoiGui] = useState('Sở Y tế TP.HCM')
  const [maDonVi, setMaDonVi] = useState('SYT-TPHCM')

  const handleNoiGuiChange = (v: string) => {
    setNoiGui(v)
    const map: Record<string, string> = {
      'Sở Y tế TP.HCM':    'SYT-TPHCM',
      'BHXH TP.HCM':       'BHXH-TPHCM',
      'Sở TT&TT':          'STTTT-TPHCM',
      'Bộ Y tế':           'BYT-HN',
      'CDC TP.HCM':        'CDC-TPHCM',
    }
    setMaDonVi(map[v] ?? '')
  }

  return (
    <div className="cw" style={{paddingBottom:80}}>
      {/* Sticky top action bar */}
      <div style={{
        position:'sticky', top:0, zIndex:50,
        background:'var(--surface)', borderBottom:'1px solid var(--border)',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'10px 20px', gap:12,
      }}>
        <Topbar
          breadcrumb={['Văn bản Đến', 'Tiếp nhận văn bản mới']}
          onNavClick={i => i === 0 && goScreen('s1')}
        />
        <div style={{display:'flex', gap:8, flexShrink:0}}>
          <button className="btn btn-ghost" onClick={() => goScreen('s1')}>✕ Đóng</button>
          <button className="btn btn-ghost">📋 Lưu nháp</button>
          <button className="btn btn-primary" onClick={() => goScreen('s1')}>📤 Gửi</button>
        </div>
      </div>

      <div style={{padding:'20px 24px', display:'flex', flexDirection:'column', gap:20}}>

        {/* KHỐI 1 + 2: nằm ngang 6:4 */}
        <div style={{display:'grid', gridTemplateColumns:'6fr 4fr', gap:16, alignItems:'start'}}>

          {/* Khối 1: Thông tin văn bản */}
          <div className="form-card">
            <div className="fc-title"><span>1</span> Thông tin văn bản</div>
            <div className="form-row">
              <div className="fg">
                <label>Loại văn bản <span className="req">*</span></label>
                <select>
                  <option>Công văn</option>
                  <option>Quyết định</option>
                  <option>Tờ trình</option>
                  <option>Thông báo</option>
                  <option>Chỉ thị</option>
                </select>
              </div>
              <div className="fg">
                <label>Số ký hiệu VB <span className="req">*</span></label>
                <input type="text" defaultValue="45/CV-SYT" placeholder="VD: 45/CV-SYT" />
              </div>
            </div>
            <div className="form-row full">
              <div className="fg">
                <label>Tên VB (Trích yếu) <span className="req">*</span></label>
                <textarea defaultValue="V/v báo cáo tình hình thực hiện kế hoạch khám chữa bệnh quý I/2026" />
              </div>
            </div>
            <div className="form-row">
              <div className="fg">
                <label>Nơi gửi <span className="req">*</span></label>
                <select value={noiGui} onChange={e => handleNoiGuiChange(e.target.value)}>
                  <option>Sở Y tế TP.HCM</option>
                  <option>BHXH TP.HCM</option>
                  <option>Sở TT&TT</option>
                  <option>Bộ Y tế</option>
                  <option>CDC TP.HCM</option>
                </select>
              </div>
              <div className="fg">
                <label>Mã đơn vị gửi</label>
                <input className="auto" value={maDonVi} readOnly />
                <div className="hint">Tự động điền theo Nơi gửi</div>
              </div>
            </div>
            <div className="form-row">
              <div className="fg">
                <label>Mức độ Khẩn</label>
                <select>
                  <option>🔴 Hỏa tốc — xử lý ngay</option>
                  <option>🟠 Thượng khẩn — trong ngày</option>
                  <option>🟡 Khẩn — trong 2 ngày</option>
                  <option selected>⚪ Thường — trong 5 ngày</option>
                </select>
              </div>
              <div className="fg">
                <label>Mức độ Mật</label>
                <select>
                  <option selected>Thường (không mật)</option>
                  <option>Mật</option>
                  <option>Tối mật</option>
                  <option>Tuyệt mật</option>
                </select>
              </div>
            </div>
          </div>

          {/* Khối 2: Thông tin đăng ký */}
          <div className="form-card">
            <div className="fc-title"><span>2</span> Thông tin đăng ký</div>
            <div className="fg" style={{marginBottom:12}}>
              <label>Sổ đến <span className="req">*</span></label>
              <select>
                <option>Sổ công văn đến 2026</option>
                <option>Sổ quyết định đến 2026</option>
              </select>
            </div>
            <div className="fg" style={{marginBottom:12}}>
              <label>Số đến</label>
              <input className="auto" defaultValue="#47" readOnly />
              <div className="hint">Tự động cấp liên tiếp trong năm</div>
            </div>
            <div className="fg" style={{marginBottom:12}}>
              <label>Ngày đến <span className="req">*</span></label>
              <input type="date" defaultValue="2026-03-25" />
            </div>
            <div className="fg" style={{marginBottom:12}}>
              <label>Hạn xử lý</label>
              <input type="date" defaultValue="2026-03-28" />
            </div>
            <div className="fg">
              <label>Hồ sơ lưu trữ</label>
              <select>
                <option>-- Chọn hồ sơ --</option>
                <option>HS-2026-KCB</option>
                <option>HS-2026-BHYT</option>
                <option>HS-2026-HIS</option>
              </select>
            </div>
          </div>
        </div>

        {/* Khối 3: Tệp đính kèm */}
        <div className="form-card">
          <div className="fc-title"><span>3</span> Tệp đính kèm</div>
          <div className="form-row">
            <div className="fg">
              <label>Tệp chính</label>
              <div className="upload-file-show">
                <div className="ufs-ico">📄</div>
                <div>
                  <div className="ufs-name">45_CV_SYT_KHCB_2026.pdf</div>
                  <div className="ufs-size">PDF · 2.4 MB · Đã tải lên</div>
                </div>
                <div className="ufs-del">✕</div>
              </div>
              <button style={{
                marginTop:8, padding:'6px 12px', fontSize:'.8rem',
                border:'1px dashed var(--border)', borderRadius:6,
                background:'transparent', cursor:'pointer', color:'var(--text3)'
              }}>+ Thêm tệp chính</button>
            </div>
            <div className="fg">
              <label>Tệp đính kèm</label>
              <div style={{
                border:'2px dashed var(--border)', borderRadius:8, padding:'24px',
                textAlign:'center', color:'var(--text3)', fontSize:'.82rem',
                cursor:'pointer'
              }}>
                <div style={{fontSize:'1.5rem', marginBottom:6}}>📎</div>
                <div>Kéo thả hoặc <span style={{color:'var(--orange)', fontWeight:600}}>chọn tệp</span></div>
                <div style={{fontSize:'.72rem', marginTop:4}}>Hỗ trợ PDF, Word, Excel · Tối đa 20MB</div>
              </div>
            </div>
          </div>
        </div>

        {/* Khối 4: Luồng xử lý */}
        <div className="form-card">
          <div className="fc-title"><span>4</span> Luồng xử lý</div>
          {/* Workflow visual */}
          <div style={{
            display:'flex', alignItems:'center', gap:0,
            padding:'16px 8px', overflowX:'auto'
          }}>
            {/* Node 1 */}
            <div style={{
              display:'flex', flexDirection:'column', alignItems:'center',
              background:'#fff7ed', border:'2px solid #fb923c', borderRadius:12,
              padding:'12px 20px', minWidth:140, textAlign:'center'
            }}>
              <div style={{fontSize:'1.3rem', marginBottom:4}}>📝</div>
              <div style={{fontSize:'.78rem', fontWeight:700, color:'#c2410c'}}>Tạo VB</div>
              <div style={{fontSize:'.7rem', color:'var(--text3)', marginTop:2}}>Văn thư</div>
              <div style={{
                marginTop:6, fontSize:'.68rem', background:'#fb923c', color:'#fff',
                borderRadius:20, padding:'2px 8px'
              }}>Đang thực hiện</div>
            </div>
            {/* Arrow */}
            <div style={{flex:1, height:2, background:'#e2e4ed', position:'relative', minWidth:32}}>
              <div style={{
                position:'absolute', right:-8, top:'50%', transform:'translateY(-50%)',
                color:'#94a3b8', fontSize:'1.1rem'
              }}>›</div>
            </div>
            {/* Node 2 */}
            <div style={{
              display:'flex', flexDirection:'column', alignItems:'center',
              background:'#f8fafc', border:'2px solid #cbd5e1', borderRadius:12,
              padding:'12px 20px', minWidth:140, textAlign:'center'
            }}>
              <div style={{fontSize:'1.3rem', marginBottom:4}}>👤</div>
              <div style={{fontSize:'.78rem', fontWeight:700, color:'var(--dark)'}}>Lãnh đạo chỉ đạo</div>
              <div style={{fontSize:'.7rem', color:'var(--text3)', marginTop:2}}>BGĐ / Lãnh đạo phòng</div>
              <div style={{
                marginTop:6, fontSize:'.68rem', background:'#e2e4ed', color:'#64748b',
                borderRadius:20, padding:'2px 8px'
              }}>Chờ thực hiện</div>
            </div>
            {/* Arrow */}
            <div style={{flex:1, height:2, background:'#e2e4ed', position:'relative', minWidth:32}}>
              <div style={{
                position:'absolute', right:-8, top:'50%', transform:'translateY(-50%)',
                color:'#94a3b8', fontSize:'1.1rem'
              }}>›</div>
            </div>
            {/* Node 3 */}
            <div style={{
              display:'flex', flexDirection:'column', alignItems:'center',
              background:'#f8fafc', border:'2px solid #cbd5e1', borderRadius:12,
              padding:'12px 20px', minWidth:140, textAlign:'center'
            }}>
              <div style={{fontSize:'1.3rem', marginBottom:4}}>🔀</div>
              <div style={{fontSize:'.78rem', fontWeight:700, color:'var(--dark)'}}>Thư ký điều phối</div>
              <div style={{fontSize:'.7rem', color:'var(--text3)', marginTop:2}}>Thư ký / Văn thư</div>
              <div style={{
                marginTop:6, fontSize:'.68rem', background:'#e2e4ed', color:'#64748b',
                borderRadius:20, padding:'2px 8px'
              }}>Chờ thực hiện</div>
            </div>
          </div>
          {/* Ý kiến xử lý */}
          <div className="fg" style={{marginTop:8}}>
            <label>Ý kiến xử lý</label>
            <textarea placeholder="Ghi ý kiến hoặc ghi chú kèm theo..." style={{height:72}} />
          </div>
        </div>

        {/* Khối 5: Danh sách người nhận */}
        <div className="form-card">
          <div className="fc-title"><span>5</span> Danh sách người nhận</div>
          <div className="form-row">
            <div className="fg">
              <label>
                <span style={{
                  display:'inline-flex', alignItems:'center', justifyContent:'center',
                  width:20, height:20, borderRadius:'50%',
                  background:'#fb923c', color:'#fff', fontSize:'.65rem', fontWeight:700,
                  marginRight:6
                }}>2</span>
                Bước 1: Lãnh đạo chỉ đạo <span className="req">*</span>
              </label>
              <select>
                <option>-- Chọn lãnh đạo --</option>
                <option>Lê Văn Giám Đốc — BGĐ</option>
                <option>Nguyễn Thị Phó GĐ — BGĐ</option>
                <option>Trần Văn Trưởng Phòng — P.KHTH</option>
              </select>
              <div className="hint">Lãnh đạo sẽ nhận văn bản và ghi ý kiến chỉ đạo</div>
            </div>
            <div className="fg">
              <label>
                <span style={{
                  display:'inline-flex', alignItems:'center', justifyContent:'center',
                  width:20, height:20, borderRadius:'50%',
                  background:'#64748b', color:'#fff', fontSize:'.65rem', fontWeight:700,
                  marginRight:6
                }}>3</span>
                Bước 2: Thư ký điều phối <span className="req">*</span>
              </label>
              <select>
                <option>-- Chọn thư ký --</option>
                <option>Nguyễn Thị Văn Thư — Văn thư</option>
                <option>Trần Thị Thư Ký — P.HCNS</option>
              </select>
              <div className="hint">Thư ký nhận văn bản sau khi lãnh đạo chỉ đạo xong</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
