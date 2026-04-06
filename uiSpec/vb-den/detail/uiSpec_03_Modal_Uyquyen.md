# UI Specification: Modal Ủy quyền

## 1. Thông tin chung
* **Mã Modal:** UI_DOC_IN_006_MODAL
* **Trigger:** Chọn **[Ủy quyền]** trong Menu thao tác phụ [...] trên màn hình Chi tiết VB (`UI_DOC_IN_002`). Có mặt ở **tất cả các trạng thái**.
* **Vai trò người dùng:** Bất kỳ người đang được giao xử lý VB.
* **Mô tả:** Modal cho phép người dùng ủy quyền trách nhiệm xử lý cho người khác khi không thể tự xử lý.

---

## 2. Thông tin Modal

| Thuộc tính | Giá trị |
|:---|:---|
| **Tiêu đề** | Ủy quyền xử lý |
| **Loại** | Modal Dialog (overlay, không đóng khi click ngoài) |
| **Kích thước** | Medium (600px width) |

---

## 3. Bảng đặc tả các trường

| No | Component | Comp. Type | Editable | Mandatory | Description |
|:---|:---|:---|:---:|:---:|:---|
| **1** | Người được ủy quyền | Search Select | Yes | Yes | Chọn một người nhận ủy quyền. Hiển thị tên, chức vụ, đơn vị. Không cho phép chọn chính mình. |
| **2** | Lý do ủy quyền | Text Area | Yes | Yes | Lý do ủy quyền. Placeholder: *"Nhập lý do ủy quyền..."* |
| **3** | Hạn xử lý | DateTime Picker | Yes | Yes | Mặc định lấy từ Hạn xử lý gốc của VB. Không cho phép chọn ngày quá khứ hoặc sau Hạn xử lý gốc. |
| **4** | Ghi chú thêm | Text Area | Yes | No | Thông tin bổ sung cho người được ủy quyền. Placeholder: *"Nhập ghi chú (nếu có)..."* |
| **5** | Nút Ủy quyền | Button (Primary) | No | — | Xác nhận ủy quyền. Chỉ kích hoạt khi đủ trường bắt buộc. |
| **6** | Nút Hủy | Button (Secondary) | No | — | Đóng modal, không lưu dữ liệu. |

---

## 4. Validation

| ID | Trường | Điều kiện lỗi | Thông báo |
|:---|:---|:---|:---|
| V01 | Người được ủy quyền | Bỏ trống | "Vui lòng chọn người được ủy quyền." |
| V02 | Người được ủy quyền | Chọn chính mình | "Không thể ủy quyền cho chính mình." |
| V03 | Lý do ủy quyền | Bỏ trống | "Vui lòng nhập lý do ủy quyền." |
| V04 | Hạn xử lý | Bỏ trống hoặc ngày quá khứ | "Hạn xử lý không hợp lệ." |
| V05 | Hạn xử lý | Sau Hạn xử lý gốc | "Hạn xử lý không được trễ hơn hạn xử lý gốc." |

---

## 5. Hành vi sau khi xác nhận

* Người ủy quyền **không còn nút thao tác chính** — Toolbar chỉ còn trạng thái "Đã ủy quyền" và Menu [...].
* Thông tin ủy quyền (người ủy quyền, người nhận, lý do, thời gian) ghi vào Timeline.
* Hệ thống đẩy notification đến người được ủy quyền.
* Người được ủy quyền thấy VB với trạng thái tương ứng bước trong luồng và có đầy đủ nút thao tác.
* **Ủy quyền bậc 2 không được phép:** Người nhận ủy quyền không thể tiếp tục ủy quyền — chỉ có thể Chuyển tiếp hoặc Hoàn thành.
