# UI Specification: Màn hình Soạn Văn bản Đến (Full Specification)

## 1. Thông tin chung (General Information)
* **Tên màn hình:** Soạn Văn bản Đến (Create Inbound Document)
* **Mã màn hình:** UI_DOC_IN_001
* **Mô tả:** Giao diện cho phép Văn thư hoặc Người dùng nhập liệu, đính kèm tệp, chọn luồng xử lý và gửi văn bản đến vào hệ thống E-Office.

---

## 2. Cấu trúc Layout Wireframe Logic (5 Blocks)

Màn hình được chia thành các khu vực chức năng (Cards) để tối ưu trải nghiệm nhập liệu:

| Vị trí | Khối chức năng | Mô tả vai trò |
|:---|:---|:---|
| **Top (Sticky)** | **Thanh tác vụ** | Chứa tiêu đề và các nút điều hướng/hành động chính ([Đóng], [Lưu nháp], [Gửi]). |
| **Middle - Left (5/4/6 phần)** | **Khối 1: Tệp** | Khu vực tải lên hoặc soạn thảo trực tiếp bản scan văn bản (Tệp chính) và các tài liệu phụ trợ. |
| **Middle - Right Top (5/6/4 phần)** | **Khối 2: Thông tin văn bản** | Nhập các thông tin định danh gốc của văn bản (Loại, Số hiệu, Trích yếu, Nơi gửi). |
| **Middle - Right Bottom (5/6/4 phần)** | **Khối 3: Thông tin đăng ký** | Quản lý thông tin lưu trữ nội bộ (Sổ văn bản, Số đến auto, Ngày đến, Hạn xử lý, Hồ sơ lưu trữ). |
| **Bottom - 1** | **Khối 4: Luồng xử lý** | Hiển thị và lựa chọn quy trình xử lý văn bản đến theo dạng workflow: Tạo VB → Lãnh đạo chỉ đạo → Thư ký điều phối. |
| **Bottom - 2** | **Khối 5: Danh sách người nhận** | Xác định đích danh cá nhân/phòng ban nhận văn bản theo từng bước của luồng xử lý. |

---

## 3. Bảng đặc tả chi tiết UI (UI Specification Table)

| No | Component | Comp. Type | Editable | Mandatory | Default Value | Description |
|:---|:---|:---|:---:|:---:|:---|:---|
| **Khối 1: Tệp** ||||||| 
| **1** | Tệp chính | Upload / Rich Text Editor | Yes | No | N/A | Đính kèm bản scan (Hỗ trợ PDF, Word) hoặc soạn thảo nội dung trực tiếp trên hệ thống. |
| **2** | Tệp đính kèm | Upload / Rich Text Editor | Yes | No | N/A | Các tài liệu phụ lục liên quan; hỗ trợ tải lên tệp hoặc soạn thảo trực tiếp trên hệ thống. |
| **Khối 2: Thông tin văn bản** ||||||| 
| **3** | Loại văn bản | Dropdown | Yes | Yes | N/A | Chọn từ danh mục (Công văn, Tờ trình, Quyết định...). |
| **4** | Tên VB (Trích yếu)| Text Area | Yes | Yes | N/A | Nhập tóm tắt nội dung văn bản. |
| **5** | Số ký hiệu VB | Text Field | Yes | Yes | N/A | Số hiệu gốc trên văn bản (Ví dụ: 123/BC-UBND). |
| **6** | Đơn vị gửi | Dropdown | Yes | Yes | N/A | Đơn vị ban hành văn bản (Chọn từ danh mục). |
| **7** | Mã đơn vị gửi | Label | No | No | Auto-fill | Mã định danh đơn vị gửi, tự động hiển thị sau khi chọn Nơi gửi, lấy theo danh mục đơn vị gửi. |
| **8** | Mức độ Khẩn | Dropdown | Yes | No | Thường | Chọn mức độ ưu tiên xử lý (Thường, Khẩn, Hỏa tốc...). |
| **9** | Mức độ Mật | Dropdown | Yes | No | Thường | Chọn mức độ bảo mật (Thường, Mật, Tối mật, Tuyệt mật). |
| **Khối 3: Thông tin đăng ký** ||||||| 
| **10** | Sổ đến | Dropdown | Yes | Yes | N/A | Chọn sổ đăng ký văn bản đến tương ứng. |
| **11** | Số đến | Label | No | Yes | Auto-gen | Số nội bộ tự động tăng theo quy tắc của Sổ đến. |
| **12** | Ngày đến | Date Picker | Yes | Yes | Current Date | Ngày tiếp nhận văn bản. |
| **13** | Hạn xử lý | Date Picker | Yes | No | N/A | Ngày tối đa phải hoàn thành xử lý. |
| **14** | Hồ sơ lưu trữ | Combobox | Yes | No | N/A | Cho phép chọn nhiều hồ sơ để chứa văn bản đến. |
| **Khối 4: Luồng xử lý** ||||||| 
| **15** | Luồng xử lý | Workflow Display | No | Yes | Mặc định | Hiển thị trực quan các bước xử lý theo dạng workflow: **Tạo VB → Lãnh đạo chỉ đạo → Thư ký điều phối**. Người dùng nhìn thấy toàn bộ luồng và trạng thái từng bước. |
| **16** | Ý kiến xử lý | Text Area | Yes | No | N/A | Nội dung ghi chú/chỉ đạo kèm theo. |
| **Khối 5: Danh sách người nhận** ||||||| 
| **17** | Người nhận - Bước 1: Lãnh đạo chỉ đạo | Tree/Search | Yes | Yes | N/A | Chọn lãnh đạo nhận văn bản để bút phê/chỉ đạo. |
| **18** | Hạn xử lý - Bước 1 | Datetime Picker | Yes | No | N/A | Thời hạn lãnh đạo cần hoàn thành chỉ đạo (ngày và giờ cụ thể). |
| **19** | Người nhận - Bước 2: Thư ký điều phối | Tree/Search | Yes | Yes | N/A | Chọn thư ký/văn thư nhận để điều phối sau khi lãnh đạo chỉ đạo. |
| **20** | Hạn xử lý - Bước 2 | Datetime Picker | Yes | No | N/A | Thời hạn thư ký cần hoàn thành điều phối (ngày và giờ cụ thể). |
| **Thanh tác vụ** ||||||| 
| **21** | Nút Lưu nháp | Button | N/A | N/A | N/A | Lưu trạng thái Draft, không check Mandatory. |
| **22** | Nút Gửi | Button | N/A | N/A | N/A | Kiểm tra Validation và đẩy vào quy trình. |
| **23** | Nút Đóng | Button | N/A | N/A | N/A | Thoát màn hình (có cảnh báo nếu có thay đổi). |

---

## 4. Quy tắc nghiệp vụ & Thông báo lỗi (Business Rules & Validation)

### **4.1. Quy tắc chung**
* **Số đến (Item 11):** Được sinh ra ngay khi chọn Sổ đến (Item 10). Không được sửa thủ công.
* **Mã đơn vị gửi (Item 7):** Tự động điền sau khi người dùng chọn Đơn vị gửi (Item 6), lấy theo dữ liệu danh mục đơn vị gửi. Không cho phép chỉnh sửa thủ công.
* **Luồng xử lý & Người nhận:** Khối 5 hiển thị các ô chọn người nhận theo từng bước tương ứng của luồng xử lý được hiển thị ở Khối 4. Mỗi bước trong luồng tương ứng một nhóm người nhận cần được xác định.

### **4.2. Bảng kiểm tra dữ liệu (Validation)**
| ID | Trường dữ liệu | Điều kiện lỗi | Thông báo lỗi |
|:---|:---|:---|:---|
| V01 | Toàn bộ Mandatory| Bỏ trống khi nhấn [Gửi] | "Vui lòng nhập đầy đủ các trường bắt buộc (*)." |
| V02 | Ngày đến | Lớn hơn ngày hiện tại | "Ngày đến không được lớn hơn ngày hiện tại." |
| V03 | Hạn xử lý | Nhỏ hơn Ngày đến | "Hạn xử lý không được trước ngày đến." |
| V04 | Tệp đính kèm | Sai định dạng/Quá dung lượng | "Tệp không hợp lệ hoặc vượt quá 20MB." |
| V05 | Nút Đóng | Có dữ liệu thay đổi | Popup: "Dữ liệu chưa được lưu, bạn có chắc chắn muốn thoát?" |

---

## 5. Logic xử lý các nút bấm (Button Action)

* **[Lưu nháp]:**
    * Hệ thống lưu lại toàn bộ thông tin đã nhập vào bảng tạm.
    * Không yêu cầu check Mandatory.
    * Trạng thái văn bản: `Bản nháp`.
* **[Gửi]:**
    * Kiểm tra tất cả Validation (Khối 2, 3, 4, 5).
    * Chuyển trạng thái văn bản: `Chờ xử lý`.
    * Đẩy thông báo (Notification) đến tài khoản của Người nhận đã chọn ở Khối 5.
* **[Đóng]:**
    * Nếu không có dữ liệu thay đổi: Quay lại trang danh sách.
    * Nếu có thay đổi: Hiển thị Popup xác nhận [Tiếp tục nhập] / [Thoát].

---

## 6. Ghi chú thiết kế (UX Notes)
* **Layout chính (Desktop):** Khu vực Middle chia thành 2 cột theo tỷ lệ **5:5** (hoặc linh hoạt 4:6 / 6:4):
  * **Cột trái:** Khối 1 (Tệp) chiếm toàn bộ chiều cao khu vực Middle — phù hợp để hiển thị editor/viewer tệp với không gian rộng.
  * **Cột phải:** Khối 2 (Thông tin văn bản) xếp trên, Khối 3 (Thông tin đăng ký) xếp dưới — cả hai xếp theo chiều dọc trong cùng cột.
* Khối 1 (Tệp) hỗ trợ 2 chế độ: **Upload file** (kéo thả / chọn file) và **Soạn thảo trực tiếp** (Rich Text Editor nội tuyến). Người dùng có thể chuyển đổi giữa 2 chế độ bằng tab hoặc toggle button.
* Khối 4 hiển thị luồng xử lý dạng workflow trực quan (các node kết nối bằng mũi tên): **Tạo VB → Lãnh đạo chỉ đạo → Thư ký điều phối**. Mỗi node có thể hiển thị trạng thái (chờ, đang xử lý, hoàn thành).
* Khối 5 hiển thị các ô chọn người nhận và trường Hạn xử lý (Datetime) theo từng bước tương ứng trong luồng, giúp người tạo dễ dàng xác định đúng người nhận và thời hạn cho từng giai đoạn xử lý.
* Khối 4 và Khối 5 nên có hiệu ứng loading khi người dùng thay đổi các tùy chọn liên đới.
