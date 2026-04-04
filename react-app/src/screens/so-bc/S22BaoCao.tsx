import Topbar from '@/components/Topbar'

export default function S22BaoCao() {
  return (
    <div className="cw">
      <Topbar breadcrumb={['Sổ & Báo cáo', 'Báo cáo thống kê']} />
      <div className="fbar">
        <select className="fsel"><option>Tháng 3/2026</option><option>Quý 1/2026</option><option>Năm 2026</option></select>
        <select className="fsel"><option>Tất cả đơn vị</option><option>P. KHTH</option><option>P. TCKT</option><option>BGĐ</option></select>
        <button className="fbtn">📎 Xuất báo cáo</button>
        <button className="fbtn">🖨️ In</button>
      </div>
      <div className="work-area"><div className="content-pane">
        
        {/* Summary cards */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:24}}>
          {[
            {n:47,lbl:'Văn bản đến',color:'#1d4ed8'},
            {n:48,lbl:'Văn bản đi',color:'#1a7a45'},
            {n:3,lbl:'Quá hạn',color:'#b91c1c'},
            {n:'94%',lbl:'Tỉ lệ đúng hạn',color:'#1a7a45'},
          ].map((card,i) => (
            <div key={i} style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,padding:'16px 20px'}}>
              <div style={{fontSize:'1.8rem',fontWeight:800,color:card.color}}>{card.n}</div>
              <div style={{fontSize:'.78rem',color:'var(--text3)',marginTop:4}}>{card.lbl}</div>
            </div>
          ))}
        </div>

        {/* Urgency breakdown */}
        <div className="form-card">
          <div className="fc-title">Thống kê theo mức khẩn (VB Đến T3/2026)</div>
          <table className="ltable">
            <thead><tr><th>Mức khẩn</th><th>Số lượng</th><th>Đúng hạn</th><th>Quá hạn</th><th>Đang xử lý</th><th>Tỉ lệ đúng hạn</th></tr></thead>
            <tbody>
              <tr><td><span className="urg urg-hot">Hỏa tốc</span></td><td style={{fontWeight:700}}>8</td><td style={{color:'#1a7a45'}}>5</td><td style={{color:'#b91c1c'}}>3</td><td style={{color:'#c2410c'}}>0</td><td style={{fontWeight:700,color:'#c2410c'}}>63%</td></tr>
              <tr><td><span className="urg urg-vurg">Thượng khẩn</span></td><td style={{fontWeight:700}}>12</td><td style={{color:'#1a7a45'}}>11</td><td style={{color:'#b91c1c'}}>0</td><td style={{color:'#c2410c'}}>1</td><td style={{fontWeight:700,color:'#1a7a45'}}>92%</td></tr>
              <tr><td><span className="urg urg-urg">Khẩn</span></td><td style={{fontWeight:700}}>15</td><td style={{color:'#1a7a45'}}>14</td><td style={{color:'#b91c1c'}}>0</td><td style={{color:'#c2410c'}}>1</td><td style={{fontWeight:700,color:'#1a7a45'}}>93%</td></tr>
              <tr><td><span className="urg urg-norm">Thường</span></td><td style={{fontWeight:700}}>12</td><td style={{color:'#1a7a45'}}>12</td><td style={{color:'#b91c1c'}}>0</td><td style={{color:'#c2410c'}}>0</td><td style={{fontWeight:700,color:'#1a7a45'}}>100%</td></tr>
            </tbody>
          </table>
        </div>

        {/* By department */}
        <div className="form-card">
          <div className="fc-title">Thống kê theo đơn vị xử lý</div>
          <table className="ltable">
            <thead><tr><th>Đơn vị</th><th>Được giao</th><th>Hoàn thành</th><th>Đang xử lý</th><th>Quá hạn</th></tr></thead>
            <tbody>
              {[
                {unit:'P. Kế hoạch TH',total:15,done:13,proc:2,over:0},
                {unit:'BGĐ',total:8,done:7,proc:1,over:0},
                {unit:'P. Tài chính KT',total:10,done:8,proc:2,over:0},
                {unit:'P. HCNS',total:7,done:5,proc:0,over:2},
                {unit:'P. CNTT',total:7,done:7,proc:0,over:0},
              ].map((row,i) => (
                <tr key={i}>
                  <td style={{fontWeight:600}}>{row.unit}</td>
                  <td style={{fontWeight:700}}>{row.total}</td>
                  <td style={{color:'#1a7a45',fontWeight:600}}>{row.done}</td>
                  <td style={{color:'#c2410c'}}>{row.proc}</td>
                  <td style={{color:'#b91c1c',fontWeight:row.over>0?700:400}}>{row.over}{row.over>0?' ⚠️':''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div></div>
    </div>
  )
}
