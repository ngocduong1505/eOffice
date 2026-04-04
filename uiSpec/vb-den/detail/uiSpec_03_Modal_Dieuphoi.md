# UI Specification: Modal Điều phối xử lý

## 1. Thông tin chung
* **Mã Modal:** UI_DOC_IN_005_MODAL
* **Trigger:** Nhấn nút **[Điều phối ngay]** trên màn hình Chi tiết VB (`UI_DOC_IN_002`) khi trạng thái = **"Chờ điều phối"**.
* **Vai trò người dùng:** Thư ký điều phối.
* **Mô tả:** Modal cho phép Thư ký đọc nội dung chỉ đạo của Lãnh đạo và phân công người thực hiện xử lý.

---

## 2. Thông tin Modal

| Thuộc tính | Giá trị |
|:---|:---|
| **Tiêu đề** | Điều phối xử lý |
| **Loại** | Modal Dialog (overlay, không đóng khi click ngoài) |
| **Kích thước** | Medium (640px width) |

---

## 3. Bảng đặc tả các trường

| No | Component | Comp. Type | Editable | Mandatory | Description |
|:---|:---|:---|:---:|:---:|:---|
| **1** | Chỉ đạo của Lãnh đạo | Info Card (Read-only) | No | — | Hiển thị nội dung chỉ đạo, tên Lãnh đạo và thời gian chỉ đạo. Màu nền phân biệt. Thư ký đọc trước khi phân công. |
| **2** | Danh sách người xử lý | Repeatable Row | Yes | Yes | Mỗi dòng gồm các trường con (2a), (2b), (2c). Có thể thêm nhiều dòng bằng nút **[+ Thêm người xử lý]**. |
| **2a** | Người xử lý | Search Select (Single) | Yes | Yes | Cho phép tìm kiếm và chọn theo **cá nhân** hoặc **phòng ban**. Nếu chọn phòng ban → hệ thống tự động xác định người đứng đầu phòng ban và gán làm người nhận. Hiển thị tên, chức danh và đơn vị. |
| **2b** | Hạn xử lý | DateTime Picker | Yes | Yes | Hạn xử lý riêng cho từng người xử lý. Mặc định lấy từ Hạn xử lý gốc của VB. Không cho phép chọn ngày trong quá khứ hoặc sau Hạn xử lý gốc. |
| **2c** | Ghi chú cho người xử lý | Text Input | Yes | No | Ghi chú riêng của Thư ký cho từng người. Placeholder: *"Nhập ghi chú (nếu có)..."* |
| **3** | Ý kiến điều phối | Text Area | Yes | No | Ý kiến chung của Thư ký áp dụng cho toàn bộ lần điều phối. Placeholder: *"Nhập ý kiến điều phối (nếu có)..."* |
| **4** | Nút Điều phối | Button (Primary) | No | — | Xác nhận phân công. Chỉ kích hoạt khi đủ trường bắt buộc. |
| **5** | Nút Hủy | Button (Secondary) | No | — | Đóng modal, không lưu dữ liệu. |

---

## 4. Validation

| ID | Trường | Điều kiện lỗi | Thông báo |
|:---|:---|:---|:---|
| V01 | Danh sách người xử lý | Không có dòng nào | "Vui lòng thêm ít nhất một người xử lý." |
| V02 | Người xử lý (2a) | Bỏ trống trên một dòng bất kỳ | "Vui lòng chọn người xử lý." |
| V03 | Hạn xử lý (2b) | Bỏ trống trên một dòng bất kỳ | "Hạn xử lý không hợp lệ." |
| V04 | Hạn xử lý (2b) | Là ngày trong quá khứ | "Hạn xử lý không hợp lệ." |
| V05 | Hạn xử lý (2b) | Sau Hạn xử lý gốc của VB | "Hạn xử lý không được trễ hơn hạn xử lý gốc." |

---

## 5. Hành vi sau khi xác nhận

* Trạng thái VB chuyển từ **"Chờ điều phối"** → **"Chờ xử lý"**.
* Thông tin điều phối (Thư ký, danh sách người được giao kèm hạn xử lý và ghi chú riêng, ý kiến điều phối chung, thời gian) ghi vào Timeline (bước hoàn thành).
* Nếu người xử lý được chọn theo phòng ban, hệ thống tự động gửi cho người đứng đầu phòng ban đó.
* Hệ thống đẩy notification đến tất cả người xử lý được phân công.
* Màn hình Chi tiết tự động reload lại Toolbar và Timeline theo trạng thái mới.
