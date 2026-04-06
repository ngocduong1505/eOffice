import Topbar from '@/components/Topbar'

export default function S21CauHinhSo() {
  return (
    <div className="cw">
      <Topbar breadcrumb={['Sổ & Báo cáo', 'Cấu hình sổ đăng ký']} />
      <div className="work-area"><div className="content-pane" style={{maxWidth:700}}>
        <div className="form-card">
          <div className="fc-title"><span>1</span> Cấu hình sổ Văn bản Đến</div>
          <div className="form-row full"><div className="fg"><label>Tên sổ <span className="req">*</span></label><input defaultValue="Sổ Văn bản Đến 2026" /></div></div>
          <div className="form-row">
            <div className="fg"><label>Tiền tố số đến</label><input defaultValue="#" placeholder="VD: #" /></div>
            <div className="fg"><label>Số bắt đầu</label><input type="number" defaultValue={1} /></div>
          </div>
          <div className="form-row">
            <div className="fg"><label>Năm áp dụng <span className="req">*</span></label><input defaultValue="2026" /></div>
            <div className="fg"><label>Số hiện tại</label><input className="auto" defaultValue="47" readOnly /></div>
          </div>
          <div className="form-row">
            <div className="fg"><label>Đặt lại số đầu năm</label><select><option>Có — Đặt lại về 1 ngày 01/01 hàng năm</option><option>Không — Tiếp tục liên tiếp</option></select></div>
            <div className="fg"><label>Phạm vi áp dụng</label><select><option>Toàn bệnh viện</option><option>Theo phòng ban</option></select></div>
          </div>
        </div>

        <div className="form-card">
          <div className="fc-title"><span>2</span> Cấu hình sổ Văn bản Đi</div>
          <div className="form-row full"><div className="fg"><label>Tên sổ <span className="req">*</span></label><input defaultValue="Sổ Văn bản Đi 2026" /></div></div>
          <div className="form-row">
            <div className="fg"><label>Định dạng ký hiệu</label><input defaultValue="{số}/CV-BV" placeholder="{số}/{loại}-{đơnvị}" /></div>
            <div className="fg"><label>Số đi hiện tại</label><input className="auto" defaultValue="48" readOnly /></div>
          </div>
          <div className="form-row">
            <div className="fg"><label>Ký hiệu theo loại VB</label><select><option>Có — VD: 01/CV-BV, 01/QĐ-BV</option><option>Không — Chỉ dùng số thứ tự</option></select></div>
            <div className="fg"><label>Người được phép cấp số</label><select><option>Chỉ Văn thư</option><option>Trưởng phòng trở lên</option></select></div>
          </div>
        </div>

        <div className="form-card">
          <div className="fc-title"><span>3</span> Số liệu thống kê sổ</div>
          <div className="form-row">
            <div className="sg-item"><label>Năm hiện tại</label><div className="sv">2026</div></div>
            <div className="sg-item"><label>Tổng VB Đến</label><div className="sv big">47</div></div>
            <div className="sg-item"><label>Tổng VB Đi</label><div className="sv big">48</div></div>
            <div className="sg-item"><label>Ngày cập nhật</label><div className="sv">25/03/2026</div></div>
          </div>
        </div>
      </div></div>
      <div className="form-footer">
        <button className="btn btn-ghost">Đặt lại mặc định</button>
        <button className="btn btn-primary">Lưu cấu hình</button>
      </div>
    </div>
  )
}
