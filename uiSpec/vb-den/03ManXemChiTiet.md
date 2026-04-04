# UI Specification: Màn hình Xem chi tiết Văn bản đến

## 1. Thông tin chung (General Information)
* **Tên màn hình:** Chi tiết Văn bản đến
* **Mã màn hình:** UI_DOC_IN_002
* **Mô tả:** Giao diện hiển thị toàn bộ thông tin của một văn bản đến, bao gồm thông tin hành chính, luồng xử lý, lịch sử ý kiến và cửa sổ xem trước (Preview) tệp đính kèm.

---

## 2. Cấu trúc Layout (Split View Screen)

Màn hình được thiết kế theo dạng Split-View (Chia đôi 2 cột) để người dùng có thể vừa xem thông tin vừa xem nội dung văn bản:

| Vị trí | Khối chức năng | Mô tả vai trò |
|:---|:---|:---|
| **Top** | **Khối 1: Toolbar hành động** | Chứa tiêu đề và các nút chức năng ([Chuyển], [Phê duyệt], [Trả lại], [Kết thúc], [Chỉnh sửa], [Đóng]). |
| **Left** | **Khối 2: Thông tin văn bản** | Hiển thị tất cả các trường dữ liệu từ màn hình Soạn thảo (Trích yếu, Số hiệu, Sổ đến,...) dưới dạng Read-only. Bên dưới hiển thị danh sách **File chính** và **File đính kèm** — người dùng click vào từng tệp để xem preview ở cột phải. |
| **Right** | **Khối 3: Preview văn bản** | Cửa sổ hiển thị trực tiếp nội dung tệp PDF hoặc bản scan được chọn từ Khối 2. Mặc định hiển thị file chính khi mở màn hình. |
| **Left - Bottom** | **Khối 4: Lịch sử xử lý** | Dạng timeline liệt kê quá trình luân chuyển: Người gửi -> Người nhận -> Ý kiến -> Thời gian. |

---

## 3. Bảng đặc tả chi tiết UI (UI Specification Table)

| No | Component | Comp. Type | Editable | Mandatory | Description |
|:---|:---|:---|:---:|:---:|:---|
| **1** | Nút Chuyển xử lý | Button | No | No | Hiển thị khi VB đang ở trạng thái 'Chờ xử lý'. |
| **2** | Nút Trả lại | Button (Red) | No | No | Cho phép trả lại bước trước đó kèm lý do. |
| **3** | Nút Kết thúc | Button (Green) | No | No | Kết thúc quy trình tại bước hiện tại. |
| **4** | Nút Lưu hồ sơ | Button (Blue) | No | No | Lưu văn bản vào hồ sơ công việc/số liệu. |
| **5** | Khối thông tin VB | Data Label | No | Yes | Bao gồm: Loại VB, Trích yếu, Số ký hiệu, Nơi gửi, Sổ đến, Số cơ quan, Ngày đến, Hạn xử lý. |
| **6** | Danh sách File chính & Đính kèm | List (trong Khối 2) | No | Yes | Hiển thị trong cột trái, bên dưới phần thông tin VB. Mỗi dòng là tên tệp kèm icon loại file và nút tải về. Click vào tên tệp → preview hiển thị sang Khối 3 (cột phải) mà không reload trang. |
| **7** | Viewer PDF | PDF Viewer | No | Yes | Cột phải (Khối 3). Mặc định hiển thị file chính khi mở màn hình. Hỗ trợ phóng to, thu nhỏ. Cập nhật nội dung khi người dùng chọn tệp khác ở Khối 2. |
| **8** | Timeline xử lý | List/Timeline | No | Yes | Hiển thị luồng văn bản (Từ B1 -> B4) và trạng thái hiện tại. |
| **9** | Bảng người nhận | Table | No | No | Danh sách những người đang được nhận xử lý phối hợp. |
| **10** | Nút Chỉnh sửa | Button | No | No | Chỉ hiển thị cho Văn thư hoặc Người được cấp quyền thay đổi thông tin. |

---

## 4. Logic hiển thị Nút bấm theo Trạng thái (Dynamic Buttons)

Hệ thống tự động hiển thị các nút chức năng dựa trên vai trò của người đang xem và trạng thái hiện tại của văn bản:

| Trạng thái | Nút hiển thị | Mô tả logic |
|:---|:---|:---|
| **Chờ xử lý** | [Chuyển], [Trả lại], [Lưu hồ sơ] | Cá nhân vừa nhận được văn bản và cần thực hiện hành động. |
| **Đang xử lý** | [Kết thúc], [Chuyển tiếp] | Văn bản đang được xử lý phối hợp. |
| **Đã xử lý / Kết thúc**| [Lưu hồ sơ], [Xem luồng] | Chỉ cho phép xem và lưu trữ vào hồ sơ. |
| **Dự thảo** | [Gửi], [Chỉnh sửa], [Xóa] | Văn bản vừa được tạo bởi văn thư nhưng chưa đẩy vào luồng. |

---

## 5. Quy tắc xử lý Đặc biệt (Logic xử lý)

* **Preview tài liệu:** Khi click vào một tệp trong danh sách File chính / Đính kèm ở Khối 2 (cột trái), Viewer ở Khối 3 (cột phải) sẽ tự động tải và hiển thị nội dung tệp đó mà không cần load lại trang. Mặc định khi mở màn hình, Khối 3 hiển thị file chính.
* **Timeline xử lý:**
    - Màu xanh: Bước đã hoàn thành.
    - Màu cam: Bước đang thực hiện.
    - Màu xám: Bước dự kiến.
* **Tương tác nút [Trả lại]:** Khi nhấn, hệ thống yêu cầu nhập "Ý kiến trả lại" mới cho phép thực hiện.
