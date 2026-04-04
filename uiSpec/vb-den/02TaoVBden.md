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
| **Middle - Left** | **Khối 1: Thông tin văn bản** | Nhập các thông tin định danh gốc của văn bản (Loại, Số hiệu, Trích yếu, Nơi gửi). |
| **Middle - Right** | **Khối 2: Thông tin đăng ký** | Quản lý thông tin lưu trữ nội bộ (Sổ văn bản, Số đến auto, Ngày đến, Hạn xử lý, Hồ sơ lưu trữ). |
| **Bottom - 1** | **Khối 3: Tệp đính kèm** | Khu vực tải lên bản scan văn bản (Tệp chính) và các tài liệu phụ trợ. |
| **Bottom - 2** | **Khối 4: Luồng xử lý** | Hiển thị và lựa chọn quy trình xử lý văn bản đến theo dạng workflow: Tạo VB → Lãnh đạo chỉ đạo → Thư ký điều phối. |
| **Bottom - 3** | **Khối 5: Danh sách người nhận** | Xác định đích danh cá nhân/phòng ban nhận văn bản theo từng bước của luồng xử lý. |

---

## 3. Bảng đặc tả chi tiết UI (UI Specification Table)

| No | Component | Comp. Type | Editable | Mandatory | Default Value | Description |
|:---|:---|:---|:---:|:---:|:---|:---|
| **Khối 1: Thông tin văn bản** ||||||| 
| **1** | Loại văn bản | Dropdown | Yes | Yes | N/A | Chọn từ danh mục (Công văn, Tờ trình, Quyết định...). |
| **2** | Tên VB (Trích yếu)| Text Area | Yes | Yes | N/A | Nhập tóm tắt nội dung văn bản. |
| **3** | Số ký hiệu VB | Text Field | Yes | Yes | N/A | Số hiệu gốc trên văn bản (Ví dụ: 123/BC-UBND). |
| **4** | Nơi gửi | Dropdown | Yes | Yes | N/A | Đơn vị ban hành văn bản (Chọn từ danh mục). |
| **5** | Mã đơn vị gửi | Label | No | No | Auto-fill | Mã định danh đơn vị gửi, tự động hiển thị sau khi chọn Nơi gửi, lấy theo danh mục đơn vị gửi. |
| **6** | Mức độ Khẩn | Dropdown | Yes | No | Thường | Chọn mức độ ưu tiên xử lý (Thường, Khẩn, Hỏa tốc...). |
| **7** | Mức độ Mật | Dropdown | Yes | No | Thường | Chọn mức độ bảo mật (Thường, Mật, Tối mật, Tuyệt mật). |
| **Khối 2: Thông tin đăng ký** ||||||| 
| **8** | Sổ đến | Dropdown | Yes | Yes | N/A | Chọn sổ đăng ký văn bản đến tương ứng. |
| **9** | Số đến | Label | No | Yes | Auto-gen | Số nội bộ tự động tăng theo quy tắc của Sổ đến. |
| **10** | Ngày đến | Date Picker | Yes | Yes | Current Date | Ngày tiếp nhận văn bản. |
| **11** | Hạn xử lý | Date Picker | Yes | No | N/A | Ngày tối đa phải hoàn thành xử lý. |
| **12** | Hồ sơ lưu trữ | Combobox | Yes | No | N/A | Cho phép chọn nhiều hồ sơ để chứa văn bản đến. |
| **Khối 3: Tệp đính kèm** ||||||| 
| **13** | Tệp chính | Upload | Yes | No | N/A | Đính kèm bản scan (Hỗ trợ PDF, Word). |
| **14** | Tệp đính kèm | Upload | Yes | No | N/A | Các tài liệu phụ lục liên quan. |
| **Khối 4: Luồng xử lý** ||||||| 
| **15** | Luồng xử lý | Workflow Display | No | Yes | Mặc định | Hiển thị trực quan các bước xử lý theo dạng workflow: **Tạo VB → Lãnh đạo chỉ đạo → Thư ký điều phối**. Người dùng nhìn thấy toàn bộ luồng và trạng thái từng bước. |
| **16** | Ý kiến xử lý | Text Area | Yes | No | N/A | Nội dung ghi chú/chỉ đạo kèm theo. |
| **Khối 5: Danh sách người nhận** ||||||| 
| **17** | Người nhận - Bước 1: Lãnh đạo chỉ đạo | Tree/Search | Yes | Yes | N/A | Chọn lãnh đạo nhận văn bản để bút phê/chỉ đạo. |
| **18** | Người nhận - Bước 2: Thư ký điều phối | Tree/Search | Yes | Yes | N/A | Chọn thư ký/văn thư nhận để điều phối sau khi lãnh đạo chỉ đạo. |
| **Thanh tác vụ** ||||||| 
| **19** | Nút Lưu nháp | Button | N/A | N/A | N/A | Lưu trạng thái Draft, không check Mandatory. |
| **20** | Nút Gửi | Button | N/A | N/A | N/A | Kiểm tra Validation và đẩy vào quy trình. |
| **21** | Nút Đóng | Button | N/A | N/A | N/A | Thoát màn hình (có cảnh báo nếu có thay đổi). |

---

## 4. Quy tắc nghiệp vụ & Thông báo lỗi (Business Rules & Validation)

### **4.1. Quy tắc chung**
* **Số đến (Item 9):** Được sinh ra ngay khi chọn Sổ đến (Item 8). Không được sửa thủ công.
* **Mã đơn vị gửi (Item 5):** Tự động điền sau khi người dùng chọn Nơi gửi (Item 4), lấy theo dữ liệu danh mục đơn vị gửi. Không cho phép chỉnh sửa thủ công.
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
    * Kiểm tra tất cả Validation (Khối 1, 2, 4, 5).
    * Chuyển trạng thái văn bản: `Chờ xử lý`.
    * Đẩy thông báo (Notification) đến tài khoản của Người nhận đã chọn ở Khối 5.
* **[Đóng]:**
    * Nếu không có dữ liệu thay đổi: Quay lại trang danh sách.
    * Nếu có thay đổi: Hiển thị Popup xác nhận [Tiếp tục nhập] / [Thoát].

---

## 6. Ghi chú thiết kế (UX Notes)
* Khối 1 và Khối 2 nên đặt cạnh nhau (Layout 7:3 hoặc 6:4) trên màn hình Desktop để tận dụng chiều ngang.
* Khối 4 hiển thị luồng xử lý dạng workflow trực quan (các node kết nối bằng mũi tên): **Tạo VB → Lãnh đạo chỉ đạo → Thư ký điều phối**. Mỗi node có thể hiển thị trạng thái (chờ, đang xử lý, hoàn thành).
* Khối 5 hiển thị các ô chọn người nhận theo từng bước tương ứng trong luồng, giúp người tạo dễ dàng xác định đúng người nhận cho từng giai đoạn xử lý.
* Khối 4 và Khối 5 nên có hiệu ứng loading khi người dùng thay đổi các tùy chọn liên đới.
