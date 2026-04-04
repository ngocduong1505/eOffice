# UI Specification: Màn hình Bút phê Tài liệu

## 1. Thông tin chung (General Information)
* **Tên màn hình:** Bút phê Tài liệu
* **Mã màn hình:** UI_DOC_IN_003
* **Mô tả:** Giao diện cho phép Lãnh đạo/người có thẩm quyền xem chi tiết và ra chỉ đạo xử lý đối với văn bản đến đang ở trạng thái "Chờ chỉ đạo". Bố cục tương tự màn hình Xem chi tiết, có bổ sung các nút thao tác và modal nhập chỉ đạo.

---

## 2. Cấu trúc Layout (Split View Screen)

Màn hình được thiết kế theo dạng Split-View (Chia cột) để người dùng có thể vừa xem thông tin vừa xem nội dung văn bản:

| Vị trí | Khối chức năng | Mô tả vai trò |
|:---|:---|:---|
| **Top** | **Khối 1: Toolbar hành động** | Chứa tiêu đề, nút chính [Chỉ đạo xử lý] và nút menu 3 chấm [...] chứa các thao tác phụ. |
| **Middle - Left** | **Khối 2: Thông tin văn bản** | Hiển thị tất cả các trường dữ liệu (Trích yếu, Số hiệu, Sổ đến,...) dưới dạng Read-only. Có nhãn trạng thái "Chờ chỉ đạo". |
| **Middle - Right** | **Khối 3: Preview văn bản** | Cửa sổ hiển thị trực tiếp nội dung tệp PDF hoặc bản scan chính của văn bản. |
| **Bottom - 1** | **Khối 4: Lịch sử xử lý** | Dạng timeline liệt kê quá trình luân chuyển: Người gửi -> Người nhận -> Ý kiến -> Thời gian. |
| **Bottom - 2** | **Khối 5: Danh sách đính kèm** | Danh sách các tệp phụ lục, hỗ trợ tải về hoặc chuyển đổi preview sang Khối 3. |

---

## 3. Bảng đặc tả chi tiết UI (UI Specification Table)

### 3.1. Các thành phần màn hình chính

| No | Component | Comp. Type | Editable | Mandatory | Description |
|:---|:---|:---|:---:|:---:|:---|
| **1** | Nút Chỉ đạo xử lý | Button (Primary) | No | No | Nút hành động chính. Hiển thị khi VB ở trạng thái 'Chờ chỉ đạo'. Nhấn để mở Modal Chỉ đạo xử lý. |
| **2** | Nút menu 3 chấm [...] | Icon Button | No | No | Hiển thị dropdown menu chứa các thao tác phụ: [Từ chối], [Ủy quyền], [Lưu hồ sơ]. |
| **3** | Nhãn trạng thái | Badge/Tag | No | Yes | Hiển thị trạng thái hiện tại của văn bản: **"Chờ chỉ đạo"** (màu cam). |
| **4** | Khối thông tin VB | Data Label | No | Yes | Bao gồm: Loại VB, Trích yếu, Số ký hiệu, Nơi gửi, Sổ đến, Số cơ quan, Ngày đến, Hạn xử lý. |
| **5** | Viewer PDF | PDF Viewer | No | Yes | Hiển thị nội dung tệp chính. Hỗ trợ phóng to, thu nhỏ. |
| **6** | Timeline xử lý | List/Timeline | No | Yes | Hiển thị luồng văn bản và trạng thái hiện tại. |
| **7** | Bảng người nhận | Table | No | No | Danh sách những người đang được nhận xử lý phối hợp. |
| **8** | Danh sách đính kèm | File List | No | No | Danh sách tệp phụ lục, hỗ trợ tải về hoặc xem preview tại Khối 3. |

### 3.2. Dropdown Menu (Nút 3 chấm)

| No | Menu Item | Icon | Description |
|:---|:---|:---|:---|
| **1** | Từ chối | Icon từ chối | Từ chối tiếp nhận văn bản. Yêu cầu nhập lý do từ chối trước khi xác nhận. |
| **2** | Ủy quyền | Icon ủy quyền | Ủy quyền xử lý văn bản cho người khác. Yêu cầu chọn người được ủy quyền. |
| **3** | Lưu hồ sơ | Icon lưu | Lưu văn bản vào hồ sơ công việc/số liệu. |

---

## 4. Modal: Chỉ đạo xử lý

Modal xuất hiện khi người dùng nhấn nút **[Chỉ đạo xử lý]**. Đây là bước nhập nội dung chỉ đạo và giao nhiệm vụ xử lý.

### 4.1. Thông tin Modal

| Thuộc tính | Giá trị |
|:---|:---|
| **Tiêu đề** | Chỉ đạo xử lý |
| **Loại** | Modal Dialog (overlay, không đóng khi click ngoài) |
| **Kích thước** | Medium (600px width) |

### 4.2. Bảng đặc tả các trường trong Modal

| No | Component | Comp. Type | Editable | Mandatory | Description |
|:---|:---|:---|:---:|:---:|:---|
| **1** | Ý kiến chỉ đạo | Rich Text Input | Yes | Yes | Trường nhập nội dung chỉ đạo xử lý. Hỗ trợ định dạng văn bản (bold, italic, danh sách,...). Placeholder: *"Nhập nội dung chỉ đạo..."* |
| **2** | Chọn thư ký xử lý | Dropdown / Search Select | Yes | Yes | Cho phép tìm kiếm và chọn thư ký hoặc người được giao thực hiện chỉ đạo. Hiển thị tên và chức vụ trong danh sách gợi ý. |
| **3** | Hạn xử lý | DateTime Picker | Yes | Yes | Chọn ngày và giờ hoàn thành xử lý theo chỉ đạo. Không cho phép chọn ngày trong quá khứ. |
| **4** | Nút Gửi chỉ đạo | Button (Primary) | No | No | Xác nhận và gửi nội dung chỉ đạo. Chỉ kích hoạt khi tất cả các trường bắt buộc đã được điền. |
| **5** | Nút Đóng | Button (Secondary) | No | No | Đóng modal và huỷ thao tác, không lưu bất kỳ dữ liệu nào. |

---

## 5. Logic hiển thị Nút bấm theo Trạng thái (Dynamic Buttons)

| Trạng thái | Nút hiển thị | Mô tả logic |
|:---|:---|:---|
| **Chờ chỉ đạo** | [Chỉ đạo xử lý], [...] (Từ chối, Ủy quyền, Lưu hồ sơ) | Lãnh đạo vừa nhận được văn bản, cần ra quyết định chỉ đạo. |
| **Đã chỉ đạo** | [Lưu hồ sơ], [Xem luồng] | Chỉ đạo đã được gửi, chỉ cho phép xem và lưu trữ. |
| **Đã từ chối** | [Lưu hồ sơ], [Xem luồng] | Văn bản đã bị từ chối, chỉ cho phép xem và lưu trữ. |
| **Đã ủy quyền** | [Xem luồng] | Văn bản đã được ủy quyền xử lý cho người khác. |

---

## 6. Quy tắc xử lý Đặc biệt (Logic xử lý)

* **Preview tài liệu:** Khi click vào một tệp khác trong Khối 5, Viewer ở Khối 3 sẽ tự động tải và hiển thị nội dung tệp đó mà không cần load lại trang.
* **Timeline xử lý:**
    - Màu xanh: Bước đã hoàn thành.
    - Màu cam: Bước đang thực hiện (trạng thái **Chờ chỉ đạo** hiển thị màu cam).
    - Màu xám: Bước dự kiến.
* **Tương tác nút [Từ chối]:** Khi chọn trong menu 3 chấm, hệ thống yêu cầu nhập "Lý do từ chối" mới cho phép thực hiện.
* **Tương tác nút [Ủy quyền]:** Khi chọn trong menu 3 chấm, hệ thống yêu cầu chọn người được ủy quyền và có thể nhập ghi chú kèm theo.
* **Validation Modal Chỉ đạo xử lý:** Nút [Gửi chỉ đạo] chỉ được kích hoạt khi cả 3 trường bắt buộc (Ý kiến chỉ đạo, Thư ký xử lý, Hạn xử lý) đều có giá trị hợp lệ.
* **Hạn xử lý mặc định:** Trường Hạn xử lý trong modal được tự động điền bằng giá trị "Hạn xử lý" lấy từ thông tin văn bản (Khối 2), người dùng có thể chỉnh sửa lại.
