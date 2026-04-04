import { useState } from 'react'
import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

export default function S6HoanThanh() {
  const { goScreen } = useNavigation()
  const [activeTab, setActiveTab] = useState<'flow'|'act'>('flow')

  return (
    <div className="cw">
      <Topbar breadcrumb={['Văn bản Đến', '45/CV-SYT · Hoàn thành']} onNavClick={() => goScreen('s1')} />
      <div className="work-area">
        <div className="content-pane" style={{maxWidth:420,minWidth:320,borderRight:'1px solid var(--border)',padding:12}}>
          <div style={{fontSize:'.75rem',fontWeight:700,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:10}}>Danh sách</div>
          <div style={{background:'#edfbf4',border:'1px solid #a7f3d0',borderRadius:8,padding:'10px 12px',cursor:'pointer',borderLeft:'3px solid #1a7a45'}}>
            <div style={{fontSize:'.82rem',fontWeight:600,color:'var(--dark)'}}>V/v báo cáo tình hình KCB</div>
            <div style={{fontSize:'.72rem',color:'var(--text3)',marginTop:2}}>45/CV-SYT · #47 · <span className="stag st-done" style={{fontSize:'.65rem'}}>Hoàn thành</span></div>
          </div>
        </div>
        <div className="detail-panel open" style={{width:480,minWidth:480}}>
          <div className="dp-head">
            <div className="dp-head-row">
              <div className="dp-title">V/v báo cáo tình hình thực hiện kế hoạch KCB quý I/2026</div>
              <div className="dp-close" onClick={() => goScreen('s1')}>✕</div>
            </div>
            <div className="dp-chips">
              <span className="chip" style={{background:'#edfbf4',borderColor:'#a7f3d0',color:'#1a7a45',fontWeight:700}}>✓ Hoàn thành</span>
              <span className="chip s">Đến #47</span><span className="chip">Công văn</span>
            </div>
            <div className="completed-banner"><div className="cb-ico">✅</div><div className="cb-text"><h3>Đã xử lý hoàn thành</h3><p>P.KHTH hoàn thành xử lý lúc 27/03/2026 · Đúng hạn</p></div></div>
            <div className="dp-btns">
              <button className="dp-btn">📂 Thêm vào hồ sơ</button>
              <button className="dp-btn">📎 Tải xuống</button>
              <button className="dp-btn">📋 Xem sổ đăng ký</button>
            </div>
          </div>
          <div className="dp-tabs">
            <div className={`dptab ${activeTab === 'flow' ? 'on' : ''}`} onClick={() => setActiveTab('flow')}>Luồng xử lý</div>
            <div className={`dptab ${activeTab === 'act' ? 'on' : ''}`} onClick={() => setActiveTab('act')}>Lịch sử đầy đủ</div>
          </div>
          <div className="dp-body">
            {activeTab === 'flow' && (
              <div className="tab-pane on">
                <div className="stamp-block"><div className="stamp-title">🔴 Dấu Đến</div><div className="stamp-grid"><div className="sg-item"><label>Số đến</label><div className="sv big">#47</div></div><div className="sg-item"><label>Ngày tiếp nhận</label><div className="sv">25/03/2026 08:15</div></div></div></div>
                <div style={{padding:'0 2px'}}>
                  <div className="flow-step"><div className="fs-dot done">✓</div><div className="fs-info"><div className="fs-label">Tiếp nhận & Đóng dấu đến</div><div className="fs-sub">Nguyễn Thị Văn Thư</div><div className="fs-status fss-done">✓ Đóng dấu #47</div><div className="fs-time">25/03 08:15</div></div></div>
                  <div className="flow-step"><div className="fs-dot done">✓</div><div className="fs-info"><div className="fs-label">Giám đốc — Ý kiến chỉ đạo</div><div className="fs-sub">Lê Văn Giám Đốc</div><div className="fs-status fss-done">✓ Đã chỉ đạo & giao P.KHTH</div><div className="fs-time">25/03 09:45</div><div className="fs-note"><div className="fs-note-label">Ý kiến chỉ đạo</div>Giao Phòng KHTH chủ trì, phối hợp P.TCKT tổng hợp số liệu và soạn thảo báo cáo gửi Sở Y tế trước 28/03/2026.</div></div></div>
                  <div className="flow-step"><div className="fs-dot done">✓</div><div className="fs-info"><div className="fs-label">P. Kế hoạch TH — Xử lý</div><div className="fs-sub">Nguyễn Văn A · Trưởng phòng KHTH</div><div className="fs-status fss-done">✓ Hoàn thành · Đúng hạn</div><div className="fs-time">27/03 16:30</div><div className="fs-note"><div className="fs-note-label">Kết quả xử lý</div>Đã soạn thảo báo cáo KCB Q1/2026 (VB Đi số 48/BC-BV). Đã gửi Sở Y tế qua hệ thống và bưu điện.</div></div></div>
                  <div className="flow-step"><div className="fs-dot done">✓</div><div className="fs-info"><div className="fs-label">Hoàn thành</div><div className="fs-status fss-done">✓ Đã lưu vào hồ sơ công việc</div><div className="fs-time">27/03 16:30</div></div></div>
                </div>
              </div>
            )}
            {activeTab === 'act' && (
              <div className="tab-pane on">
                <div className="act-item"><div className="act-dot c">✓</div><div><div className="act-text"><strong>Văn Thư</strong> tiếp nhận, đóng dấu đến <strong>#47</strong></div><span className="act-time">25/03 08:15</span></div></div>
                <div className="act-item"><div className="act-dot ok">✓</div><div><div className="act-text"><strong>Giám đốc</strong> ghi ý kiến chỉ đạo, giao <strong>P.KHTH</strong></div><span className="act-time">25/03 09:45</span></div></div>
                <div className="act-item"><div className="act-dot">👁</div><div><div className="act-text"><strong>Trưởng P.KHTH</strong> xem và nhận xử lý</div><span className="act-time">25/03 10:02</span></div></div>
                <div className="act-item"><div className="act-dot">📝</div><div><div className="act-text"><strong>P.KHTH</strong> tạo VB Đi <strong>48/BC-BV</strong> để phản hồi</div><span className="act-time">27/03 14:00</span></div></div>
                <div className="act-item"><div className="act-dot ok">✓</div><div><div className="act-text"><strong>Trưởng P.KHTH</strong> đánh dấu hoàn thành xử lý</div><span className="act-time">27/03 16:30</span></div></div>
                <div className="act-item"><div className="act-dot c">📂</div><div><div className="act-text">Hệ thống tự động lưu vào <strong>Hồ sơ VB Đến T3/2026</strong></div><span className="act-time">27/03 16:30</span></div></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
