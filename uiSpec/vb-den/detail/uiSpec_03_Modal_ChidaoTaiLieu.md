# UI Specification: Modal Chỉ đạo xử lý

## 1. Thông tin chung
* **Mã Modal:** UI_DOC_IN_004_MODAL
* **Trigger:** Nhấn nút **[Chỉ đạo ngay]** trên màn hình Chi tiết VB (`UI_DOC_IN_002`) khi trạng thái = **"Chờ chỉ đạo"**.
* **Vai trò người dùng:** Lãnh đạo / Người có thẩm quyền chỉ đạo.
* **Mô tả:** Modal cho phép Lãnh đạo nhập nội dung chỉ đạo và giao nhiệm vụ cho Thư ký điều phối.

---

## 2. Thông tin Modal

| Thuộc tính | Giá trị |
|:---|:---|
| **Tiêu đề** | Chỉ đạo xử lý |
| **Loại** | Modal Dialog (overlay, không đóng khi click ngoài) |
| **Kích thước** | Medium (600px width) |

---

## 3. Bảng đặc tả các trường

| No | Component | Comp. Type | Editable | Mandatory | Description |
|:---|:---|:---|:---:|:---:|:---|
| **1** | Ý kiến chỉ đạo | Rich Text Input | Yes | Yes | Nội dung chỉ đạo xử lý. Hỗ trợ định dạng (bold, italic, danh sách). Placeholder: *"Nhập nội dung chỉ đạo..."* |
| **2** | Thư ký xử lý | Search Select | Yes | Yes | Chọn Thư ký/Văn thư nhận điều phối sau chỉ đạo. Hiển thị tên và chức vụ trong danh sách gợi ý. |
| **3** | Hạn xử lý | DateTime Picker | Yes | Yes | Mặc định lấy từ Hạn xử lý trên VB. Không cho phép chọn ngày trong quá khứ. |
| **4** | Nút Gửi chỉ đạo | Button (Primary) | No | — | Xác nhận và gửi chỉ đạo. Chỉ kích hoạt khi đủ 3 trường bắt buộc. |
| **5** | Nút Hủy | Button (Secondary) | No | — | Đóng modal, không lưu dữ liệu. |

---

## 4. Validation

| ID | Trường | Điều kiện lỗi | Thông báo |
|:---|:---|:---|:---|
| V01 | Ý kiến chỉ đạo | Bỏ trống | "Vui lòng nhập nội dung chỉ đạo." |
| V02 | Thư ký xử lý | Bỏ trống | "Vui lòng chọn Thư ký xử lý." |
| V03 | Hạn xử lý | Bỏ trống hoặc là ngày quá khứ | "Hạn xử lý không hợp lệ." |

---

## 5. Hành vi sau khi xác nhận

* Trạng thái VB chuyển từ **"Chờ chỉ đạo"** → **"Chờ điều phối"**.
* Nội dung chỉ đạo, tên Lãnh đạo và thời gian ghi vào Timeline (bước 🟢 hoàn thành).
* Hệ thống đẩy notification đến Thư ký được chọn.
* Màn hình Chi tiết tự động reload lại Toolbar và Timeline theo trạng thái mới.
