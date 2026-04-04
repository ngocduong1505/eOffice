import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

export default function S19NopLuu() {
  const { goScreen } = useNavigation()

  return (
    <div className="cw">
      <Topbar breadcrumb={['Hồ sơ lưu trữ', 'HS2026-03-DEN', 'Nộp lưu']} onNavClick={i => { if (i === 0) goScreen('s16'); if (i === 1) goScreen('s18') }} />
      <div className="work-area"><div className="form-pane" style={{maxWidth:700}}>
        <div className="form-card" style={{borderLeft:'3px solid #1d4ed8',padding:'14px 18px',marginBottom:12}}>
          <div style={{fontSize:'.82rem',fontWeight:700,color:'var(--dark)',marginBottom:4}}>📂 Hồ sơ VB Đến tháng 3/2026</div>
          <div style={{fontSize:'.75rem',color:'var(--text3)'}}>HS2026-03-DEN · 22 tài liệu · Văn thư · Bảo quản 10 năm</div>
        </div>

        <div className="form-card">
          <div className="fc-title"><span>1</span> Kiểm tra trước khi nộp lưu</div>
          {[
            {done:true, label:'Tất cả văn bản đã được số hóa'},
            {done:true, label:'Mục lục hồ sơ đầy đủ (22/22 tài liệu)'},
            {done:true, label:'Không còn tài liệu thiếu metadata'},
            {done:false, label:'Xác nhận của trưởng đơn vị phụ trách'},
          ].map((item, i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:'1px solid #f0f1f4'}}>
              <div style={{width:22,height:22,borderRadius:'50%',background:item.done?'#edfbf4':'#fef2f2',border:`2px solid ${item.done?'#a7f3d0':'#fca5a5'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.75rem',color:item.done?'#1a7a45':'#b91c1c',flexShrink:0}}>
                {item.done ? '✓' : '!'}
              </div>
              <div style={{fontSize:'.84rem',color:'var(--dark)'}}>{item.label}</div>
              {!item.done && <button style={{marginLeft:'auto',fontSize:'.75rem',color:'var(--orange)',background:'none',border:'1px solid #fcd9c8',borderRadius:5,padding:'3px 9px',cursor:'pointer'}}>Thực hiện</button>}
            </div>
          ))}
        </div>

        <div className="form-card">
          <div className="fc-title"><span>2</span> Thông tin nộp lưu</div>
          <div className="form-row">
            <div className="fg"><label>Kho lưu trữ <span className="req">*</span></label><select><option>Kho lưu trữ A (Tầng 1)</option><option>Kho lưu trữ B (Tầng 2)</option><option>Lưu trữ điện tử</option></select></div>
            <div className="fg"><label>Ngày nộp lưu</label><input className="auto" defaultValue="01/04/2026" readOnly /></div>
          </div>
          <div className="form-row">
            <div className="fg"><label>Hộp / Thùng số</label><input placeholder="VD: Hộp A-2026-03" /></div>
            <div className="fg"><label>Giá / Kệ số</label><input placeholder="VD: Giá 4, Kệ B" /></div>
          </div>
          <div className="form-row full"><div className="fg"><label>Ghi chú nộp lưu</label><textarea placeholder="Ghi chú về tình trạng vật chất, ghi chú bổ sung..." /></div></div>
        </div>
      </div></div>
      <div className="form-footer">
        <button className="btn btn-ghost" onClick={() => goScreen('s18')}>← Quay lại</button>
        <button className="btn btn-primary">✓ Xác nhận nộp lưu →</button>
      </div>
    </div>
  )
}
