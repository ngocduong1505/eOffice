import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'

export default function S2TiepNhan() {
  const { goScreen } = useNavigation()

  return (
    <div className="cw">
      <Topbar breadcrumb={['Văn phòng số', 'Văn bản Đến', 'Tiếp nhận văn bản mới']} onNavClick={i => i === 1 && goScreen('s1')} />
      <div className="receive-layout">
        <div className="form-pane">
          {/* Stepper */}
          <div style={{display:'flex',alignItems:'center',marginBottom:20,gap:6}}>
            <div className="stepper">
              <div className="step-item active"><div className="step-num">1</div> Thông tin văn bản</div>
              <span className="step-arrow">›</span>
              <div className="step-item"><div className="step-num">2</div> Đóng dấu đến</div>
              <span className="step-arrow">›</span>
              <div className="step-item"><div className="step-num">3</div> Thiết lập xử lý</div>
            </div>
          </div>

          {/* Upload file */}
          <div className="form-card">
            <div className="fc-title"><span>1</span> Tải lên văn bản</div>
            <div className="upload-file-show">
              <div className="ufs-ico">📄</div>
              <div>
                <div className="ufs-name">45_CV_SYT_KHCB_2026.pdf</div>
                <div className="ufs-size">PDF · 2.4 MB · Đã tải lên</div>
              </div>
              <div className="ufs-del">✕</div>
            </div>
          </div>

          {/* Thông tin văn bản gốc */}
          <div className="form-card">
            <div className="fc-title"><span>2</span> Thông tin văn bản gốc</div>
            <div className="form-row">
              <div className="fg"><label>Loại văn bản <span className="req">*</span></label><select><option>Công văn</option><option>Quyết định</option><option>Thông báo</option><option>Chỉ thị</option></select></div>
              <div className="fg"><label>Số ký hiệu gốc <span className="req">*</span></label><input type="text" defaultValue="45/CV-SYT" placeholder="VD: 45/CV-SYT" /></div>
            </div>
            <div className="form-row">
              <div className="fg"><label>Nơi gửi <span className="req">*</span></label><input type="text" defaultValue="Sở Y tế TP.HCM" /></div>
              <div className="fg"><label>Ngày ban hành gốc <span className="req">*</span></label><input type="date" defaultValue="2026-03-24" /></div>
            </div>
            <div className="form-row full">
              <div className="fg"><label>Trích yếu nội dung <span className="req">*</span></label><textarea defaultValue="V/v báo cáo tình hình thực hiện kế hoạch khám chữa bệnh quý I/2026" /></div>
            </div>
          </div>

          {/* Dấu đến & Phân loại */}
          <div className="form-card">
            <div className="fc-title"><span>3</span> Đóng dấu đến & Phân loại</div>
            <div className="form-row tri">
              <div className="fg"><label>Số đến (tự động)</label><input className="auto" defaultValue="#47" readOnly /><div className="hint">Tự động cấp liên tiếp trong năm</div></div>
              <div className="fg"><label>Ngày giờ tiếp nhận</label><input className="auto" defaultValue="25/03/2026 08:15" readOnly /></div>
              <div className="fg"><label>Người tiếp nhận</label><input className="auto" defaultValue="Nguyễn Thị Văn Thư" readOnly /></div>
            </div>
            <div className="form-row">
              <div className="fg"><label>Mức độ khẩn <span className="req">*</span></label>
                <select>
                  <option>🔴 Hỏa tốc — xử lý ngay</option>
                  <option>🟠 Thượng khẩn — trong ngày</option>
                  <option>🟡 Khẩn — trong 2 ngày</option>
                  <option selected>⚪ Thường — trong 5 ngày</option>
                </select>
              </div>
              <div className="fg"><label>Phân loại bảo mật</label><select><option selected>Thường (không mật)</option><option>Mật</option><option>Tối mật</option></select></div>
            </div>
            <div style={{marginTop:4}}>
              <div className="stamp-preview">
                <div className="sp-title">Dấu đến sẽ được tạo</div>
                <div className="sp-stamp">
                  <div className="sp-org">Bệnh viện XYZ</div>
                  <div className="sp-den">ĐẾN</div>
                  <div className="sp-num">47</div>
                  <div className="sp-date">Ngày 25/03/2026 lúc 08:15</div>
                </div>
              </div>
            </div>
          </div>

          {/* Thiết lập xử lý */}
          <div className="form-card">
            <div className="fc-title"><span>4</span> Thiết lập luồng xử lý</div>
            <div className="form-row">
              <div className="fg"><label>Đơn vị chủ trì <span className="req">*</span></label><select><option>BGĐ — Chỉ đạo trước</option><option>P. Kế hoạch TH</option><option>P. Tài chính KT</option></select></div>
              <div className="fg"><label>Hạn xử lý <span className="req">*</span></label><input type="date" defaultValue="2026-03-28" /></div>
            </div>
            <div className="form-row full">
              <div className="fg"><label>Ghi chú tiếp nhận</label><textarea placeholder="Ghi chú nội bộ khi tiếp nhận..." /></div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-footer">
        <button className="btn btn-ghost" onClick={() => goScreen('s1')}>Hủy</button>
        <button className="btn btn-ghost">Lưu nháp</button>
        <button className="btn btn-primary" onClick={() => goScreen('s3')}>Lưu & Đóng dấu đến →</button>
      </div>
    </div>
  )
}
