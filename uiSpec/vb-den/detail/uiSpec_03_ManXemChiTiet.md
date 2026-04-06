# UI Specification: Màn hình Chi tiết Văn bản đến

## 1. Thông tin chung (General Information)
* **Tên màn hình:** Chi tiết Văn bản đến
* **Mã màn hình:** UI_DOC_IN_002
* **Mô tả:** Màn hình duy nhất hiển thị chi tiết văn bản đến. Layout và cấu trúc dữ liệu **không thay đổi** theo trạng thái — chỉ có Toolbar (Khối 1) và nội dung Timeline (Khối 5) thay đổi tương ứng với trạng thái hiện tại của văn bản. Tất cả các hành động (Chỉ đạo, Điều phối, Ủy quyền, Chuyển xử lý, Hoàn thành) đều được thực hiện thông qua Modal mở từ màn hình này.

---

## 2. Cấu trúc Layout (Cố định — Không thay đổi theo trạng thái)

Màn hình chia đôi 2 cột (Split-View). Layout này **không đổi** dù văn bản ở bất kỳ trạng thái nào.

| Vị trí | Khối | Mô tả vai trò |
|:---|:---|:---|
| **Top** | **Khối 1: Toolbar** | Badge trạng thái + Nút thao tác chính (thay đổi theo trạng thái) + Menu thao tác phụ [...]. |
| **Left - Top** | **Khối 2: Thông tin VB** | Toàn bộ trường dữ liệu VB dạng Read-only. Bên dưới là danh sách File chính & File đính kèm — click để xem preview ở cột phải. |
| **Left - Middle** | **Khối 3: Luồng tài liệu** | Hiển thị trực quan tiến trình xử lý văn bản dạng workflow. Icon từng bước sáng lên tương ứng với trạng thái hiện tại. |
| **Right** | **Khối 4: Preview** | Hiển thị nội dung tệp được chọn từ Khối 2. Mặc định là file chính khi mở màn hình. |
| **Left - Bottom** | **Khối 5: Timeline xử lý** | Lịch sử luân chuyển VB — nội dung thay đổi theo từng trạng thái (xem mục 5). |

---

## 3. Bảng đặc tả các thành phần cố định

### 3.1. Khối 2 — Thông tin văn bản (luôn hiển thị, Read-only)

| No | Component | Comp. Type | Description |
|:---|:---|:---|:---|
| **1** | Loại văn bản | Label | Công văn, Tờ trình, Quyết định,... |
| **2** | Trích yếu | Label | Tóm tắt nội dung văn bản. |
| **3** | Số ký hiệu | Label | Số hiệu gốc trên văn bản. |
| **4** | Nơi gửi | Label | Đơn vị ban hành. |
| **5** | Sổ đến / Số đến | Label | Số nội bộ đã đăng ký. |
| **6** | Ngày đến | Label | Ngày tiếp nhận. |
| **7** | Hạn xử lý | Label | Hiển thị màu đỏ nếu đã quá hạn. |
| **8** | Mức độ Khẩn / Mật | Badge | Hiển thị nhãn màu tương ứng. |
| **9** | File chính & Đính kèm | File List | Danh sách tệp, mỗi dòng có icon loại file + nút tải về. Click tên tệp → Preview ở Khối 4 cập nhật ngay, không reload trang. |

---

### 3.2. Khối 3 — Luồng tài liệu (luôn hiển thị)

Hiển thị trực quan tiến trình xử lý văn bản theo dạng workflow với các node kết nối bằng mũi tên, tương tự cách hiển thị ở màn hình Tạo văn bản đến. Icon của bước đang thực hiện và các bước đã hoàn thành sẽ sáng lên; bước chưa đến hiển thị mờ.

```
[ Tạo VB ] ──▶ [ Lãnh đạo chỉ đạo ] ──▶ [ Thư ký điều phối ] ──▶ [ Xử lý ] ──▶ [ Hoàn thành ]
```

| No | Component | Comp. Type | Description |
|:---|:---|:---|:---|
| **10** | Workflow Steps | Workflow Display (Read-only) | Hiển thị chuỗi bước: **Tạo VB → Lãnh đạo chỉ đạo → Thư ký điều phối → Xử lý → Hoàn thành**. |
| | Quy tắc màu icon bước | — | 🟢 Xanh: bước đã hoàn thành · 🟠 Cam: bước đang thực hiện (active) · ⚪ Xám: bước chưa đến (dự kiến). |
| | Trạng thái → Bước sáng | — | **Chờ chỉ đạo**: bước "Lãnh đạo chỉ đạo" active · **Chờ điều phối**: bước "Thư ký điều phối" active · **Chờ xử lý**: bước "Xử lý" active · **Hoàn thành**: bước "Hoàn thành" active. |

---

### 3.3. Khối 4 — Preview (luôn hiển thị)

| No | Component | Comp. Type | Description |
|:---|:---|:---|:---|
| **11** | Viewer PDF | PDF Viewer | Mặc định hiển thị file chính. Hỗ trợ phóng to, thu nhỏ. Cập nhật khi chọn tệp khác ở Khối 2. |

---

## 4. Toolbar theo Trạng thái (Phần duy nhất thay đổi)

### Nguyên tắc chung của Toolbar

```
[ Badge trạng thái ]  [ Nút thao tác chính — PRIMARY ]  [ ... Menu thao tác phụ ]
```

- **Badge trạng thái:** Luôn hiển thị, màu sắc thay đổi theo trạng thái.
- **Nút thao tác chính:** 1 nút duy nhất, nổi bật (Primary button). Thay đổi theo trạng thái, nhất quán với nút hành động trên màn hình Danh sách.
- **Menu thao tác phụ [...]:** Icon button 3 chấm, hiển thị ở **tất cả các trạng thái**. Click mở dropdown menu thao tác phụ — nội dung menu thay đổi theo trạng thái (xem chi tiết từng trạng thái bên dưới).

---

### 4.1. Trạng thái: Chờ chỉ đạo

| Thành phần | Giá trị |
|:---|:---|
| **Badge** | 🟠 "Chờ chỉ đạo" (cam) |
| **Nút chính** | **[Chỉ đạo ngay]** (Primary) → Mở Modal Chỉ đạo (`UI_DOC_IN_004_MODAL`) |
| **Menu [...]** | [Ủy quyền] · [Từ chối] · [Thêm vào hồ sơ] · [Lịch sử văn bản] |

**Vai trò:** Lãnh đạo nhận văn bản, cần ra chỉ đạo trước khi luồng tiếp tục.

---

### 4.2. Trạng thái: Chờ điều phối

| Thành phần | Giá trị |
|:---|:---|
| **Badge** | 🟠 "Chờ điều phối" (cam) |
| **Nút chính** | **[Điều phối ngay]** (Primary) → Mở Modal Điều phối (`UI_DOC_IN_005_MODAL`) |
| **Menu [...]** | [Ủy quyền] · [Từ chối] · [Thêm vào hồ sơ] · [Lịch sử văn bản] |

**Vai trò:** Thư ký nhận chỉ đạo từ Lãnh đạo, cần phân công người thực hiện.

---

### 4.3. Trạng thái: Chờ xử lý

| Thành phần | Giá trị |
|:---|:---|
| **Badge** | 🔵 "Chờ xử lý" (xanh dương) |
| **Nút chính** | **[Hoàn thành xử lý]** (Primary - Green) → Mở Modal Hoàn thành (`UI_DOC_IN_008_MODAL`) |
| **Menu [...]** | [Chuyển tiếp xử lý] · [Tạo văn bản đi] · [Ủy quyền] · [Từ chối] · [Thêm vào hồ sơ] · [Lịch sử văn bản] |

**Ghi chú menu:**
- **[Chuyển tiếp xử lý]** → Mở Modal Chuyển xử lý (`UI_DOC_IN_007_MODAL`).
- **[Tạo văn bản đi]** → Chuyển đến màn hình Tạo văn bản đi, tự động liên kết với văn bản đến hiện tại.

**Vai trò:** Người được giao xử lý. Có thể tự hoàn thành, chuyển tiếp cho người khác, hoặc tạo văn bản đi phản hồi.

---

### 4.4. Trạng thái: Hoàn thành

| Thành phần | Giá trị |
|:---|:---|
| **Badge** | 🟢 "Hoàn thành" (xanh lá) |
| **Nút chính** | **[Thêm vào hồ sơ]** (Primary - Blue) → Mở Modal chọn hồ sơ lưu trữ |
| **Menu [...]** | [Ủy quyền] · [Từ chối] · [Thêm vào hồ sơ] · [Lịch sử văn bản] |

**Vai trò:** Văn bản đã xử lý xong. Người dùng chỉ còn xem và lưu vào hồ sơ.

---

### 4.5. Tổng hợp nhanh

| Trạng thái | Badge | Nút chính | Menu [...] |
|:---|:---:|:---|:---|
| Chờ chỉ đạo | 🟠 Cam | [Chỉ đạo ngay] | Ủy quyền · Từ chối · Thêm vào hồ sơ · Lịch sử văn bản |
| Chờ điều phối | 🟠 Cam | [Điều phối ngay] | Ủy quyền · Từ chối · Thêm vào hồ sơ · Lịch sử văn bản |
| Chờ xử lý | 🔵 Xanh | [Hoàn thành xử lý] | Chuyển tiếp xử lý · Tạo văn bản đi · Ủy quyền · Từ chối · Thêm vào hồ sơ · Lịch sử văn bản |
| Hoàn thành | 🟢 Xanh lá | [Thêm vào hồ sơ] | Ủy quyền · Từ chối · Thêm vào hồ sơ · Lịch sử văn bản |

---

## 5. Timeline xử lý theo Trạng thái (Khối 5)

Timeline luôn hiển thị **toàn bộ lịch sử từ đầu đến hiện tại**. Mỗi bước được bổ sung thêm khi có hành động mới.

### Quy ước màu sắc

| Màu | Ý nghĩa |
|:---|:---|
| 🟢 Xanh | Bước đã hoàn thành đúng hạn |
| 🟠 Cam | Bước đang thực hiện (active) |
| ⚪ Xám | Bước chưa đến / dự kiến |
| 🔴 Đỏ | Bước hoàn thành nhưng trễ hạn |

---

### 5.1. Timeline khi trạng thái = Chờ chỉ đạo

```
🟢 [Văn thư] Đã tạo và gửi văn bản
     Người tạo: [Tên văn thư]  |  Thời gian: [DD/MM/YYYY HH:mm]

🟠 [Lãnh đạo] Chờ chỉ đạo
     Người nhận: [Tên lãnh đạo]  |  Đang chờ...

⚪ Thư ký điều phối  (dự kiến)
⚪ Xử lý            (dự kiến)
```

---

### 5.2. Timeline khi trạng thái = Chờ điều phối

```
🟢 [Văn thư] Đã tạo và gửi văn bản
     Người tạo: [Tên văn thư]  |  Thời gian: [DD/MM/YYYY HH:mm]

🟢 [Lãnh đạo] Đã chỉ đạo
     Người chỉ đạo: [Tên lãnh đạo]  |  Thời gian: [DD/MM/YYYY HH:mm]
     Nội dung chỉ đạo: "[Trích dẫn nội dung chỉ đạo]"

🟠 [Thư ký] Chờ điều phối
     Người nhận: [Tên thư ký]  |  Đang chờ...

⚪ Xử lý  (dự kiến)
```

---

### 5.3. Timeline khi trạng thái = Chờ xử lý

```
🟢 [Văn thư] Đã tạo và gửi văn bản
     Người tạo: [Tên văn thư]  |  Thời gian: [DD/MM/YYYY HH:mm]

🟢 [Lãnh đạo] Đã chỉ đạo
     Người chỉ đạo: [Tên lãnh đạo]  |  Thời gian: [DD/MM/YYYY HH:mm]
     Nội dung chỉ đạo: "[Trích dẫn nội dung chỉ đạo]"

🟢 [Thư ký] Đã điều phối
     Người điều phối: [Tên thư ký]  |  Thời gian: [DD/MM/YYYY HH:mm]
     Ý kiến: "[Ý kiến điều phối nếu có]"
     Giao cho: [Tên người thực hiện chính] + [Tên người phối hợp (nếu có)]

🟠 [Người xử lý] Chờ xử lý
     Người nhận: [Tên người xử lý]  |  Hạn xử lý: [DD/MM/YYYY]  |  Đang xử lý...
```

> Nếu có thao tác **Chuyển tiếp xử lý** trong quá trình này, Timeline bổ sung thêm entry:
> ```
> 🟢 [Tên người] Đã chuyển tiếp xử lý → [Tên người nhận mới]
>      Ý kiến: "[...]"  |  Thời gian: [DD/MM/YYYY HH:mm]
> ```

---

### 5.4. Timeline khi trạng thái = Hoàn thành

```
🟢 [Văn thư] Đã tạo và gửi văn bản
     Người tạo: [Tên văn thư]  |  Thời gian: [DD/MM/YYYY HH:mm]

🟢 [Lãnh đạo] Đã chỉ đạo
     Người chỉ đạo: [Tên lãnh đạo]  |  Thời gian: [DD/MM/YYYY HH:mm]
     Nội dung chỉ đạo: "[Trích dẫn nội dung chỉ đạo]"

🟢 [Thư ký] Đã điều phối
     Người điều phối: [Tên thư ký]  |  Thời gian: [DD/MM/YYYY HH:mm]
     Giao cho: [Tên người thực hiện chính]

🟢 / 🔴 [Người xử lý] Đã hoàn thành xử lý
     Người hoàn thành: [Tên người xử lý]  |  Thời gian: [DD/MM/YYYY HH:mm]
     Kết quả: "[Trích dẫn kết quả xử lý]"
     Tệp đính kèm kết quả: [Tên file] (nếu có)
     ⚠️ Gắn nhãn "Trễ hạn" nếu thời điểm hoàn thành > Hạn xử lý
```

---

## 6. Quy tắc xử lý Đặc biệt

* **Một màn hình — nhiều trạng thái:** Front-end đọc `status` của VB khi mở màn hình và render Toolbar + Timeline tương ứng. Không dùng màn hình riêng cho từng trạng thái.
* **Preview tệp:** Click tên tệp trong Khối 2 → Khối 4 cập nhật ngay, không reload trang.
* **Hạn xử lý quá hạn:** Trường Hạn xử lý và entry Timeline hiển thị màu đỏ nếu `today > hạn xử lý` và VB chưa hoàn thành.
* **Modal từ Menu [...]:** Các thao tác Ủy quyền, Từ chối mở Modal tương ứng (xem `UI_DOC_IN_006_MODAL`, `UI_DOC_IN_009_MODAL`). Thêm vào hồ sơ mở Modal chọn hồ sơ lưu trữ.
* **Thao tác Từ chối:** Yêu cầu nhập lý do mới cho phép xác nhận.
* **Thao tác Ủy quyền:** Sau khi ủy quyền, người ủy quyền không còn nút thao tác chính — chỉ còn xem.
* **Thao tác Tạo văn bản đi:** Chỉ xuất hiện trong Menu [...] khi trạng thái = "Chờ xử lý". Click chuyển sang màn hình Tạo văn bản đi, văn bản đến hiện tại được tự động liên kết làm tài liệu tham chiếu.
* **Lịch sử văn bản:** Luôn có trong Menu [...] ở mọi trạng thái. Mở Modal/Drawer hiển thị audit log toàn bộ thao tác phát sinh trên tài liệu (người thực hiện, thao tác, thời gian, giá trị trước/sau nếu có).
* **Luồng tài liệu (Khối 3):** Read-only, đồng bộ trạng thái theo `status` của VB. Không cho phép tương tác.
