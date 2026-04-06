# UI Specification: Modal Chuyển tiếp xử lý

## 1. Thông tin chung
* **Mã Modal:** UI_DOC_IN_007_MODAL
* **Trigger:** Nhấn nút **[Chuyển tiếp xử lý]** trên màn hình Chi tiết VB (`UI_DOC_IN_002`) khi trạng thái = **"Chờ xử lý"**.
* **Vai trò người dùng:** Người đang được giao xử lý chính.
* **Mô tả:** Modal cho phép người xử lý chuyển tiếp văn bản đến cá nhân/phòng ban khác — hoặc bàn giao toàn bộ (Chuyển chính) hoặc mở rộng phối hợp (Chuyển phối hợp).

---

## 2. Thông tin Modal

| Thuộc tính | Giá trị |
|:---|:---|
| **Tiêu đề** | Chuyển tiếp xử lý |
| **Loại** | Modal Dialog (overlay, không đóng khi click ngoài) |
| **Kích thước** | Medium (640px width) |

---

## 3. Bảng đặc tả các trường

| No | Component | Comp. Type | Editable | Mandatory | Description |
|:---|:---|:---|:---:|:---:|:---|
| **1** | Loại chuyển | Radio Button | Yes | Yes | **Chuyển chính** — bàn giao toàn bộ trách nhiệm, người chuyển không còn hành động nào. **Chuyển phối hợp** — người chuyển giữ nguyên trách nhiệm, thêm người xử lý song song. |
| **2** | Người nhận | Search Select (Multi) | Yes | Yes | Chọn một hoặc nhiều người/phòng ban. Hiển thị tên, chức vụ, đơn vị. Không cho phép chọn chính mình. |
| **3** | Ý kiến chuyển | Rich Text Input | Yes | No | Ghi chú/hướng dẫn kèm theo khi chuyển. Placeholder: *"Nhập ý kiến chuyển xử lý (nếu có)..."* |
| **4** | Hạn xử lý | DateTime Picker | Yes | Yes | Mặc định lấy từ Hạn xử lý gốc. Không cho phép chọn ngày quá khứ hoặc sau Hạn xử lý gốc. |
| **5** | Tệp đính kèm bổ sung | Upload (Multi) | Yes | No | Đính kèm thêm tài liệu liên quan nếu cần. Hỗ trợ PDF, Word, Excel. Tối đa 20MB/tệp. |
| **6** | Nút Chuyển | Button (Primary) | No | — | Xác nhận chuyển. Chỉ kích hoạt khi đủ trường bắt buộc. |
| **7** | Nút Hủy | Button (Secondary) | No | — | Đóng modal, không lưu dữ liệu. |

---

## 4. Validation

| ID | Trường | Điều kiện lỗi | Thông báo |
|:---|:---|:---|:---|
| V01 | Loại chuyển | Chưa chọn | "Vui lòng chọn loại chuyển xử lý." |
| V02 | Người nhận | Bỏ trống | "Vui lòng chọn ít nhất một người nhận." |
| V03 | Người nhận | Chọn chính mình | "Không thể chuyển xử lý cho chính mình." |
| V04 | Hạn xử lý | Bỏ trống hoặc ngày quá khứ | "Hạn xử lý không hợp lệ." |
| V05 | Hạn xử lý | Sau Hạn xử lý gốc | "Hạn xử lý không được trễ hơn hạn xử lý gốc." |
| V06 | Tệp đính kèm | Sai định dạng / Vượt 20MB | "Tệp không hợp lệ hoặc vượt quá 20MB." |

---

## 5. Hành vi sau khi xác nhận

| Loại chuyển | Hành vi |
|:---|:---|
| **Chuyển chính** | Người chuyển mất quyền thao tác — Toolbar chỉ còn xem. Người nhận thấy VB ở trạng thái "Chờ xử lý" với đầy đủ nút thao tác. |
| **Chuyển phối hợp** | Người chuyển vẫn giữ VB trong danh sách "Đang xử lý". Người nhận thêm vào nhóm xử lý phối hợp. Cả hai đều có nút [Hoàn thành xử lý]. |

* Thao tác chuyển (người chuyển, người nhận, loại chuyển, ý kiến, thời gian) ghi vào Timeline.
* Hệ thống đẩy notification đến tất cả người nhận.
* Màn hình Chi tiết reload lại Toolbar và Timeline.
