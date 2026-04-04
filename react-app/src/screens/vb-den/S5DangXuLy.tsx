import { useState } from 'react'
import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

export default function S5DangXuLy() {
  const { goScreen } = useNavigation()
  const [activeTab, setActiveTab] = useState<'flow'|'info'|'act'>('flow')

  return (
    <div className="cw">
      <Topbar breadcrumb={['Văn bản Đến', '45/CV-SYT · Đang xử lý']} onNavClick={() => goScreen('s1')} />
      <div className="work-area">
        <div className="content-pane" style={{maxWidth:420,minWidth:320,borderRight:'1px solid var(--border)',padding:12}}>
          <div style={{fontSize:'.75rem',fontWeight:700,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:10}}>Danh sách</div>
          <div style={{background:'#fef7f4',border:'1px solid #fcd9c8',borderRadius:8,padding:'10px 12px',cursor:'pointer',borderLeft:'3px solid var(--orange)'}}>
            <div style={{fontSize:'.82rem',fontWeight:600,color:'var(--dark)'}}>V/v báo cáo tình hình KCB</div>
            <div style={{fontSize:'.72rem',color:'var(--text3)',marginTop:2}}>45/CV-SYT · #47 · <span className="stag st-process" style={{fontSize:'.65rem'}}>Đang xử lý</span></div>
          </div>
        </div>
        <div className="detail-panel open" style={{width:480,minWidth:480}}>
          <div className="dp-head">
            <div className="dp-head-row">
              <div className="dp-title">V/v báo cáo tình hình thực hiện kế hoạch KCB quý I/2026</div>
              <div className="dp-close" onClick={() => goScreen('s1')}>✕</div>
            </div>
            <div className="dp-chips"><span className="chip hot">🔴 Hỏa tốc</span><span className="chip process">🔄 Đang xử lý</span><span className="chip s">Đến #47</span></div>
            <div className="deadline-warn">⚠️ Hạn xử lý: <strong>28/03/2026</strong> · còn 3 ngày</div>
            <div className="dp-btns">
              <button className="dp-btn primary" onClick={() => goScreen('s6')}>✓ Hoàn thành xử lý</button>
              <button className="dp-btn" onClick={() => goScreen('s4')}>↪ Chuyển tiếp</button>
              <button className="dp-btn">📎 Tải xuống</button>
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
                <div className="stamp-block"><div className="stamp-title">🔴 Dấu Đến</div><div className="stamp-grid"><div className="sg-item"><label>Số đến</label><div className="sv big">#47</div></div><div className="sg-item"><label>Ngày tiếp nhận</label><div className="sv">25/03/2026 08:15</div></div></div></div>
                <div style={{padding:'0 2px'}}>
                  <div className="flow-step"><div className="fs-dot done">✓</div><div className="fs-info"><div className="fs-label">Tiếp nhận & Đóng dấu đến</div><div className="fs-sub">Nguyễn Thị Văn Thư</div><div className="fs-status fss-done">✓ Đã đóng dấu #47</div><div className="fs-time">25/03 08:15</div></div></div>
                  <div className="flow-step"><div className="fs-dot done">✓</div><div className="fs-info"><div className="fs-label">Giám đốc — Ý kiến chỉ đạo</div><div className="fs-sub">Lê Văn Giám Đốc</div><div className="fs-status fss-done">✓ Đã ghi chỉ đạo & giao P.KHTH</div><div className="fs-time">25/03 09:45</div><div className="fs-note"><div className="fs-note-label">Ý kiến chỉ đạo</div>Giao Phòng KHTH chủ trì, phối hợp P.TCKT tổng hợp số liệu và soạn thảo báo cáo gửi Sở Y tế trước 28/03/2026.</div></div></div>
                  <div className="flow-step"><div className="fs-dot active">!</div><div className="fs-info"><div className="fs-label">P. Kế hoạch TH — Xử lý</div><div className="fs-sub">Nguyễn Văn A · Trưởng phòng KHTH</div><div className="fs-status fss-active">⏳ Đang xử lý · Hạn 28/03</div><div className="fs-time">Nhận lúc 09:45</div></div></div>
                  <div className="flow-step"><div className="fs-dot pending">✓</div><div className="fs-info"><div className="fs-label">Hoàn thành</div><div className="fs-status fss-pend">— Chờ P.KHTH xử lý xong</div></div></div>
                </div>
              </div>
            )}
            {activeTab === 'info' && (
              <div className="tab-pane on">
                <div className="info-section">
                  <div className="is-title">Thông tin xử lý</div>
                  <div className="info-row"><div className="ir-l">Đơn vị chủ trì</div><div className="ir-v g">P. Kế hoạch TH</div></div>
                  <div className="info-row"><div className="ir-l">Đơn vị phối hợp</div><div className="ir-v">P. Tài chính KT</div></div>
                  <div className="info-row"><div className="ir-l">Hạn xử lý</div><div className="ir-v w">28/03/2026</div></div>
                  <div className="info-row"><div className="ir-l">Người giao</div><div className="ir-v">Lê Văn Giám Đốc</div></div>
                </div>
              </div>
            )}
            {activeTab === 'act' && (
              <div className="tab-pane on">
                <div className="act-item"><div className="act-dot c">✓</div><div><div className="act-text"><strong>Văn Thư</strong> tiếp nhận, đóng dấu đến <strong>#47</strong></div><span className="act-time">25/03 08:15</span></div></div>
                <div className="act-item"><div className="act-dot ok">✓</div><div><div className="act-text"><strong>Giám đốc</strong> ghi ý kiến chỉ đạo, giao <strong>P.KHTH</strong> xử lý</div><span className="act-time">25/03 09:45</span></div></div>
                <div className="act-item"><div className="act-dot warn">!</div><div><div className="act-text">Thông báo đến <strong>Trưởng P.KHTH</strong> — văn bản Hỏa tốc</div><span className="act-time">25/03 09:45</span></div></div>
                <div className="act-item"><div className="act-dot">👁</div><div><div className="act-text"><strong>Trưởng P.KHTH</strong> đã xem văn bản</div><span className="act-time">25/03 10:02</span></div></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
