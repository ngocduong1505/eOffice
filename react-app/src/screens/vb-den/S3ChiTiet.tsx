import { useState } from 'react'
import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

export default function S3ChiTiet() {
  const { goScreen } = useNavigation()
  const [activeTab, setActiveTab] = useState<'flow'|'info'|'act'>('flow')

  return (
    <div className="cw">
      <Topbar
        breadcrumb={['Văn bản Đến', '45/CV-SYT · Sở Y tế TP.HCM']}
        onNavClick={() => goScreen('s1')}
      />
      <div className="work-area">
        {/* Mini list */}
        <div className="content-pane" style={{maxWidth:420,minWidth:320,borderRight:'1px solid var(--border)',padding:12}}>
          <div style={{fontSize:'.75rem',fontWeight:700,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:10}}>Danh sách · 5 văn bản</div>
          <div style={{background:'#fef7f4',border:'1px solid #fcd9c8',borderRadius:8,padding:'10px 12px',marginBottom:6,cursor:'pointer',borderLeft:'3px solid var(--orange)'}}>
            <div style={{fontSize:'.82rem',fontWeight:600,color:'var(--dark)'}}>V/v báo cáo tình hình KCB</div>
            <div style={{fontSize:'.72rem',color:'var(--text3)',marginTop:2}}>45/CV-SYT · #47 · <span className="urg urg-hot" style={{fontSize:'.65rem'}}>Hỏa tốc</span></div>
          </div>
          <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:8,padding:'10px 12px',marginBottom:6,cursor:'pointer'}}>
            <div style={{fontSize:'.82rem',fontWeight:600,color:'var(--dark)'}}>Thông báo kiểm tra BHYT</div>
            <div style={{fontSize:'.72rem',color:'var(--text3)',marginTop:2}}>12/TB-BHXH · #46 · <span className="urg urg-vurg" style={{fontSize:'.65rem'}}>Thượng khẩn</span></div>
          </div>
          <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:8,padding:'10px 12px',marginBottom:6,cursor:'pointer'}}>
            <div style={{fontSize:'.82rem',fontWeight:600,color:'var(--dark)'}}>Kế hoạch HIS giai đoạn 2</div>
            <div style={{fontSize:'.72rem',color:'var(--text3)',marginTop:2}}>08/KH-STTTT · #45 · <span className="urg urg-urg" style={{fontSize:'.65rem'}}>Khẩn</span></div>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="detail-panel open" style={{width:480,minWidth:480}}>
          <div className="dp-head">
            <div className="dp-head-row">
              <div className="dp-title">V/v báo cáo tình hình thực hiện kế hoạch KCB quý I/2026</div>
              <div className="dp-close" onClick={() => goScreen('s1')}>✕</div>
            </div>
            <div className="dp-chips">
              <span className="chip hot">🔴 Hỏa tốc</span>
              <span className="chip process">⏳ Chờ chỉ đạo BGĐ</span>
              <span className="chip s">Đến #47</span>
              <span className="chip">Công văn</span>
            </div>
            <div className="deadline-warn">⚠️ Hạn xử lý: <strong>28/03/2026</strong> · còn 3 ngày</div>
            <div className="dp-btns">
              <button className="dp-btn primary" onClick={() => goScreen('s4')}>✏️ Ghi ý kiến chỉ đạo</button>
              <button className="dp-btn">📎 Tải xuống</button>
              <button className="dp-btn danger">↩ Trả lại</button>
            </div>
          </div>
          <div className="dp-tabs">
            <div className={`dptab ${activeTab === 'flow' ? 'on' : ''}`} onClick={() => setActiveTab('flow')}>Luồng xử lý</div>
            <div className={`dptab ${activeTab === 'info' ? 'on' : ''}`} onClick={() => setActiveTab('info')}>Thông tin</div>
            <div className={`dptab ${activeTab === 'act' ? 'on' : ''}`} onClick={() => setActiveTab('act')}>Lịch sử</div>
          </div>
          <div className="dp-body">
            {activeTab === 'flow' && (
              <div className="tab-pane on">
                <div className="stamp-block">
                  <div className="stamp-title">🔴 Dấu Đến</div>
                  <div className="stamp-grid">
                    <div className="sg-item"><label>Số đến</label><div className="sv big">#47</div></div>
                    <div className="sg-item"><label>Ngày tiếp nhận</label><div className="sv">25/03/2026 08:15</div></div>
                    <div className="sg-item"><label>Người tiếp nhận</label><div className="sv">Nguyễn Thị Văn Thư</div></div>
                    <div className="sg-item"><label>Mức khẩn</label><div className="sv" style={{color:'#b91c1c'}}>Hỏa tốc</div></div>
                  </div>
                </div>
                <div style={{padding:'0 2px'}}>
                  <div className="flow-step"><div className="fs-dot done">✓</div><div className="fs-info"><div className="fs-label">Tiếp nhận & Đóng dấu đến</div><div className="fs-sub">Nguyễn Thị Văn Thư · Văn thư</div><div className="fs-status fss-done">✓ Hoàn thành · Đã đóng dấu #47</div><div className="fs-time">25/03/2026 lúc 08:15</div></div></div>
                  <div className="flow-step"><div className="fs-dot active">!</div><div className="fs-info"><div className="fs-label">Giám đốc — Ghi ý kiến chỉ đạo</div><div className="fs-sub">Lê Văn Giám Đốc · BGĐ</div><div className="fs-status fss-active">⏳ Đang chờ · Hạn 28/03</div><div className="fs-time">Nhận lúc 08:15 · chưa xử lý</div></div></div>
                  <div className="flow-step"><div className="fs-dot pending">→</div><div className="fs-info"><div className="fs-label">Đơn vị xử lý</div><div className="fs-sub" style={{fontStyle:'italic'}}>Chưa xác định · BGĐ sẽ chỉ định khi chỉ đạo</div><div className="fs-status fss-pend">— Chờ GĐ giao</div></div></div>
                  <div className="flow-step"><div className="fs-dot pending">→</div><div className="fs-info"><div className="fs-label">Xử lý và phản hồi</div><div className="fs-sub" style={{fontStyle:'italic'}}>Chờ xác định</div><div className="fs-status fss-pend">— Chưa bắt đầu</div></div></div>
                  <div className="flow-step"><div className="fs-dot pending">✓</div><div className="fs-info"><div className="fs-label">Hoàn thành</div><div className="fs-sub">Đóng hồ sơ, lưu trữ</div><div className="fs-status fss-pend">— Chưa bắt đầu</div></div></div>
                </div>
              </div>
            )}
            {activeTab === 'info' && (
              <div className="tab-pane on">
                <div className="info-section">
                  <div className="is-title">Văn bản gốc</div>
                  <div className="info-row"><div className="ir-l">Số ký hiệu</div><div className="ir-v" style={{fontFamily:'monospace',fontWeight:700}}>45/CV-SYT</div></div>
                  <div className="info-row"><div className="ir-l">Loại văn bản</div><div className="ir-v">Công văn</div></div>
                  <div className="info-row"><div className="ir-l">Nơi gửi</div><div className="ir-v">Sở Y tế TP.HCM</div></div>
                  <div className="info-row"><div className="ir-l">Ngày ban hành</div><div className="ir-v">24/03/2026</div></div>
                </div>
                <div className="info-section">
                  <div className="is-title">Tiếp nhận</div>
                  <div className="info-row"><div className="ir-l">Số đến</div><div className="ir-v r">#47</div></div>
                  <div className="info-row"><div className="ir-l">Ngày đến</div><div className="ir-v">25/03/2026 08:15</div></div>
                  <div className="info-row"><div className="ir-l">Người tiếp nhận</div><div className="ir-v">Nguyễn Thị Văn Thư</div></div>
                  <div className="info-row"><div className="ir-l">Hạn xử lý</div><div className="ir-v w">28/03/2026</div></div>
                  <div className="info-row"><div className="ir-l">Mức khẩn</div><div className="ir-v r">🔴 Hỏa tốc</div></div>
                </div>
              </div>
            )}
            {activeTab === 'act' && (
              <div className="tab-pane on">
                <div className="act-item"><div className="act-dot c">✓</div><div><div className="act-text"><strong>Văn Thư</strong> đã tiếp nhận và đóng dấu đến <strong>#47</strong></div><span className="act-time">25/03/2026 lúc 08:15</span></div></div>
                <div className="act-item"><div className="act-dot warn">!</div><div><div className="act-text">Hệ thống gửi thông báo đến <strong>Giám đốc</strong> — yêu cầu chỉ đạo (Hỏa tốc)</div><span className="act-time">25/03/2026 lúc 08:15</span></div></div>
                <div className="act-item"><div className="act-dot">👁</div><div><div className="act-text"><strong>Giám đốc</strong> đã xem văn bản</div><span className="act-time">25/03/2026 lúc 09:02</span></div></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
