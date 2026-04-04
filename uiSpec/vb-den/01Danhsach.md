# UI Specification: Màn hình Văn bản đến chờ xử lý

## 1. Thông tin chung (General Information)
* **Tên màn hình:** Văn bản đến
* **Mô tả:** Danh sách các văn bản đ

---

## 2. Bảng đặc tả UI (UI Specification Table)

| No | Component | Comp. Type | Editable | Mandatory | Default Value | Description |
|:---|:---|:---|:---:|:---:|:---:|:---|
| 1 | Sidebar Navigation | Menu List | No | Yes | Văn bản đến | Danh mục: Văn bản đến, Văn bản đi, Văn bản nội bộ, Quản lý sổ văn bản, Hồ sơ lưu trữ, Thiết lập (Luồng động, Danh mục). Highlight mục đang chọn. |
| 2 | Breadcrumb | Link/Label | No | No | Văn bản đến / Văn bản đến chờ xử lý | Hiển thị đường dẫn phân cấp trang hiện tại. |
| 3 | Ô Tìm kiếm | Text Field | Yes | No | Tìm theo tên, số đến, nơi gửi | Ô nhập nội dung tìm kiếm tự do. |
| 4 | Nút Tìm kiếm | Icon Button | N/A | N/A | N/A | Thực hiện truy vấn dữ liệu theo từ khoá. Hiển thị dạng icon kính lúp, không có nhãn chữ. |
| 5 | Lọc trạng thái | Dropdown | N/A | N/A | N/A | Lọc dữ liệu theo trạng thái. |
| 6 | Lọc thời hạn xử lý | Dropdown / DatePicker | N/A | N/A | N/A | Lọc dữ liệu theo thời hạn xử lý. Click vào mở DatePicker để chọn khoảng ngày (từ ngày - đến ngày). |
| 7 | Nút Tiếp nhận văn bản đến | Button (Orange) | N/A | N/A | N/A | Tiếp nhận văn bản đến. |
| 8 | Nút Lưu hồ sơ | Button (Blue) | N/A | N/A | N/A | Lưu trữ văn bản đã chọn vào hồ sơ số. **Chỉ hiển thị khi có ít nhất một checkbox được tick.** |
| 9 | Checkbox All | Checkbox | Yes | No | Unchecked | Chọn hoặc bỏ chọn toàn bộ danh sách trên trang. |
| 10 | Cột STT | Label | No | Yes | Auto-increment | Số thứ tự dòng. |
| 11 | Cột Số đến | Link/Label | No | Yes | N/A | Số thứ tự văn bản đến. Click để xem chi tiết. |
| 12 | Cột Trích yếu | Link/Label | No | Yes | N/A | Nội dung tóm tắt. Click để xem chi tiết văn bản. |
| 13 | Cột Số ký hiệu | Label | No | Yes | N/A | Số hiệu văn bản (Ví dụ: 457/TTCĐS-NTDLS). |
| 14 | Cột Loại văn bản | Label | No | Yes | N/A | Phân loại văn bản (Công văn, Quyết định...). |
| 15 | Cột Ngày văn bản | Date | No | Yes | N/A | Ngày ban hành ghi trên văn bản (DD/MM/YYYY). |
| 16 | Cột Ngày đến | Date/Time | No | Yes | N/A | Ngày giờ hệ thống nhận văn bản (DD/MM/YYYY HH:mm:ss). |
| 17 | Cột Hạn xử lý | Date | No | No | N/A | Thời hạn tối đa để xử lý văn bản. |
| 18 | Cột Đơn vị ban hành | Label | No | Yes | N/A | Tên cơ quan gửi văn bản. |
| 19 | Cột Trạng thái | Badge/Tag | No | Yes | N/A | Hiển thị trạng thái xử lý hiện tại của văn bản (Chờ xử lý, Chờ chỉ đạo, Đang xử lý, Đã xử lý,...). |
| 20 | Cột Thao tác | Button + Icon Button | No | No | N/A | Mỗi dòng hiển thị 2 thành phần: **(1) Nút hành động chính** tương ứng với trạng thái: "Chờ chỉ đạo" → **[Chỉ đạo ngay]**, "Chờ điều phối" → **[Điều phối ngay]**, "Chờ xử lý" → **[Xử lý ngay]**. **(2) Icon button 3 chấm [...]** — click để mở dropdown menu thao tác phụ gồm: **[Ủy quyền]**, **[Chuyển xử lý]**, **[Từ chối]**, **[Thêm vào hồ sơ]**. |
| 21 | Phân trang (Pagination)| Dropdown | Yes | Yes | 10 | Chọn số lượng bản ghi hiển thị trên mỗi trang. |

---

## 3. Quy tắc xử lý (Business Rules / Logic).
* **Tương tác:**
    * Click **Tìm kiếm**: Load lại danh sách bảng theo filter.
    * Click **Tiếp nhận văn bản đến**: Mở màn hình tiếp nhận văn bản đến.
    * Click **Lưu hồ sơ**: Mở màn hình lưu hồ sơ.
    * Click **Checkbox All**: Chọn hoặc bỏ chọn toàn bộ danh sách trên trang.
    * Click **Checkbox**: Chọn hoặc bỏ chọn dòng.
    * Click **Phân trang**: Load lại danh sách bảng theo trang.
    * Click **Lọc trạng thái**: Load lại danh sách bảng theo trạng thái.
    * Click **Lọc thời hạn xử lý**: Load lại danh sách bảng theo thời hạn xử lý.
    
