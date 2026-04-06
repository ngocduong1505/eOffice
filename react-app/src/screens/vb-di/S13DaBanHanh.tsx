import Topbar from '@/components/Topbar'
import { useNavigation } from '@/hooks/useNavigation'
import MoreMenu from '@/components/MoreMenu'

export default function S13DaBanHanh() {
  const { goScreen } = useNavigation()

  return (
    <div className="cw" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Topbar breadcrumb={['Văn bản Đi', 'Đã ban hành']} onNavClick={() => goScreen('s8')} />

      {/* Stat strip */}
      <div className="stat-strip" style={{ flexShrink: 0 }}>
        <div className="si on"><div className="si-num">47</div><div className="si-lbl">Tổng đã ban hành</div></div>
        <div className="si"><div className="si-num" style={{ color: '#1d4ed8' }}>12</div><div className="si-lbl">Tháng này</div></div>
        <div className="si"><div className="si-num" style={{ color: '#1a7a45' }}>35</div><div className="si-lbl">Trước đó</div></div>
      </div>

      {/* Filter bar */}
      <div className="fbar" style={{ flexShrink: 0 }}>
        <div className="sw"><span className="sw-ico">🔍</span><input placeholder="Tìm số ký hiệu, tên VB..." /></div>
        <select className="fsel"><option>Tất cả loại</option><option>Công văn</option><option>Quyết định</option><option>Thông báo</option></select>
        <input type="date" className="fsel" style={{ color: '#3a3f52' }} />
        <input type="date" className="fsel" style={{ color: '#3a3f52' }} />
      </div>

      {/* Table area */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{ overflowY: 'auto', height: '100%' }}>
          <table className="ltable">
            <thead>
              <tr>
                <th style={{ width: 32 }}><input type="checkbox" /></th>
                <th>Văn bản</th>
                <th>Số ký hiệu</th>
                <th>Loại</th>
                <th>Ngày ban hành</th>
                <th>Người ký</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox" /></td>
                <td>
                  <div className="lt-doc">
                    <div className="lt-thumb">📄<span className="lt-ext">PDF</span></div>
                    <div>
                      <div className="lt-name">Báo cáo công tác KCB quý I/2026</div>
                      <div className="lt-sub">BGĐ · 31/03/2026</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontWeight: 700, color: '#1a7a45', fontSize: '.88rem' }}>48/BC-BVĐK</td>
                <td style={{ fontSize: '.82rem' }}>Báo cáo</td>
                <td style={{ fontSize: '.82rem' }}>31/03/2026</td>
                <td style={{ fontSize: '.82rem' }}>Lê Văn Giám Đốc</td>
                <td>
                  <div className="row-act">
                    <button className="ra ra-p" style={{ background: '#15803d', color: '#fff', borderColor: '#15803d' }}>🗂 Thêm vào hồ sơ</button>
                    <button className="ra ra-g" onClick={() => goScreen('s11', { readOnly: true })}>👁 Xem</button>
                    <MoreMenu
                      items={[
                        { key: 'lich-su',    label: 'Lịch sử văn bản', icon: '📋' },
                        { key: 'tai-ve',     label: 'Tải về',           icon: '⬇', divider: true },
                        { key: 'thu-hoi',    label: 'Thu hồi',          icon: '↩', danger: true, divider: true },
                      ]}
                      onAction={() => {}}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>
                  <div className="lt-doc">
                    <div className="lt-thumb">📄<span className="lt-ext">PDF</span></div>
                    <div>
                      <div className="lt-name">Công văn phản hồi kết quả kiểm tra BHYT</div>
                      <div className="lt-sub">P. KHTH · 22/03/2026</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontWeight: 700, color: '#1a7a45', fontSize: '.88rem' }}>46/CV-BV</td>
                <td style={{ fontSize: '.82rem' }}>Công văn</td>
                <td style={{ fontSize: '.82rem' }}>22/03/2026</td>
                <td style={{ fontSize: '.82rem' }}>Lê Văn Giám Đốc</td>
                <td>
                  <div className="row-act">
                    <button className="ra ra-p" style={{ background: '#15803d', color: '#fff', borderColor: '#15803d' }}>🗂 Thêm vào hồ sơ</button>
                    <button className="ra ra-g" onClick={() => goScreen('s11', { readOnly: true })}>👁 Xem</button>
                    <MoreMenu
                      items={[
                        { key: 'lich-su',    label: 'Lịch sử văn bản', icon: '📋' },
                        { key: 'tai-ve',     label: 'Tải về',           icon: '⬇', divider: true },
                        { key: 'thu-hoi',    label: 'Thu hồi',          icon: '↩', danger: true, divider: true },
                      ]}
                      onAction={() => {}}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>
                  <div className="lt-doc">
                    <div className="lt-thumb">📄<span className="lt-ext">PDF</span></div>
                    <div>
                      <div className="lt-name">Thông báo lịch họp giao ban tháng 3/2026</div>
                      <div className="lt-sub">BGĐ · 18/03/2026</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontWeight: 700, color: '#1a7a45', fontSize: '.88rem' }}>45/TB-BV</td>
                <td style={{ fontSize: '.82rem' }}>Thông báo</td>
                <td style={{ fontSize: '.82rem' }}>18/03/2026</td>
                <td style={{ fontSize: '.82rem' }}>Nguyễn Văn Phó GĐ</td>
                <td>
                  <div className="row-act">
                    <button className="ra ra-p" style={{ background: '#15803d', color: '#fff', borderColor: '#15803d' }}>🗂 Thêm vào hồ sơ</button>
                    <button className="ra ra-g" onClick={() => goScreen('s11', { readOnly: true })}>👁 Xem</button>
                    <MoreMenu
                      items={[
                        { key: 'lich-su',    label: 'Lịch sử văn bản', icon: '📋' },
                        { key: 'tai-ve',     label: 'Tải về',           icon: '⬇', divider: true },
                        { key: 'thu-hoi',    label: 'Thu hồi',          icon: '↩', danger: true, divider: true },
                      ]}
                      onAction={() => {}}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>
                  <div className="lt-doc">
                    <div className="lt-thumb">📄<span className="lt-ext">PDF</span></div>
                    <div>
                      <div className="lt-name">Công văn đề nghị bổ sung kinh phí hoạt động</div>
                      <div className="lt-sub">P. TCKT · 15/03/2026</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontWeight: 700, color: '#1a7a45', fontSize: '.88rem' }}>44/CV-BV</td>
                <td style={{ fontSize: '.82rem' }}>Công văn</td>
                <td style={{ fontSize: '.82rem' }}>15/03/2026</td>
                <td style={{ fontSize: '.82rem' }}>Lê Văn Giám Đốc</td>
                <td>
                  <div className="row-act">
                    <button className="ra ra-p" style={{ background: '#15803d', color: '#fff', borderColor: '#15803d' }}>🗂 Thêm vào hồ sơ</button>
                    <button className="ra ra-g" onClick={() => goScreen('s11', { readOnly: true })}>👁 Xem</button>
                    <MoreMenu
                      items={[
                        { key: 'lich-su',    label: 'Lịch sử văn bản', icon: '📋' },
                        { key: 'tai-ve',     label: 'Tải về',           icon: '⬇', divider: true },
                        { key: 'thu-hoi',    label: 'Thu hồi',          icon: '↩', danger: true, divider: true },
                      ]}
                      onAction={() => {}}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
