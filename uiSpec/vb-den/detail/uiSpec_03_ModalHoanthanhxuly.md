# UI Specification: Modal Hoàn thành xử lý

## 1. Thông tin chung
* **Mã Modal:** UI_DOC_IN_008_MODAL
* **Trigger:** Nhấn nút **[Hoàn thành xử lý]** trên màn hình Chi tiết VB (`UI_DOC_IN_002`) khi trạng thái = **"Chờ xử lý"**.
* **Vai trò người dùng:** Người đang được giao xử lý (chính hoặc phối hợp).
* **Mô tả:** Modal cho phép người xử lý nhập kết quả, đính kèm văn bản phản hồi (nếu có) và xác nhận hoàn thành bước xử lý của mình.

---

## 2. Thông tin Modal

| Thuộc tính | Giá trị |
|:---|:---|
| **Tiêu đề** | Hoàn thành xử lý |
| **Loại** | Modal Dialog (overlay, không đóng khi click ngoài) |
| **Kích thước** | Medium (620px width) |

---

## 3. Bảng đặc tả các trường

| No | Component | Comp. Type | Editable | Mandatory | Description |
|:---|:---|:---|:---:|:---:|:---|
| **1** | Chỉ đạo / Giao việc | Info Card (Read-only) | No | — | Hiển thị lại nội dung chỉ đạo hoặc ý kiến giao việc để người xử lý đối chiếu khi báo cáo kết quả. |
| **2** | Kết quả xử lý | Rich Text Input | Yes | Yes | Nội dung kết quả, báo cáo xử lý. Hỗ trợ định dạng văn bản. Placeholder: *"Nhập kết quả xử lý..."* |
| **3** | Tệp kết quả đính kèm | Upload (Multi) | Yes | No | Văn bản phản hồi, báo cáo, công văn trả lời. Hỗ trợ PDF, Word, Excel. Tối đa 20MB/tệp. |
| **4** | Hồ sơ lưu trữ | Combobox (Multi) | Yes | No | Chọn hồ sơ công việc để lưu VB sau khi hoàn thành. Có thể chọn nhiều hồ sơ. |
| **5** | Nút Hoàn thành | Button (Primary - Green) | No | — | Xác nhận hoàn thành. Chỉ kích hoạt khi trường Kết quả xử lý có nội dung. |
| **6** | Nút Hủy | Button (Secondary) | No | — | Đóng modal, không lưu dữ liệu. |

---

## 4. Validation

| ID | Trường | Điều kiện lỗi | Thông báo |
|:---|:---|:---|:---|
| V01 | Kết quả xử lý | Bỏ trống | "Vui lòng nhập kết quả xử lý trước khi hoàn thành." |
| V02 | Tệp kết quả | Sai định dạng / Vượt 20MB | "Tệp không hợp lệ hoặc vượt quá 20MB." |

---

## 5. Hành vi sau khi xác nhận

| Tình huống | Trạng thái VB sau hoàn thành |
|:---|:---|
| Tất cả người xử lý đã hoàn thành | **Hoàn thành** — quy trình kết thúc. |
| Chỉ một người phối hợp hoàn thành, người chính chưa xong | Vẫn **Chờ xử lý** — chỉ cập nhật entry Timeline của người đó. |

* Kết quả và tệp đính kèm ghi vào Timeline tại bước của người dùng.
* **Cờ trễ hạn:** Hệ thống so sánh thời điểm xác nhận với Hạn xử lý gốc. Nếu trễ → gắn nhãn "Trễ hạn" 🔴 trên entry Timeline và danh sách VB.
* Nếu có Hồ sơ lưu trữ được chọn, VB tự động thêm vào các hồ sơ đó.
* Hệ thống đẩy notification kết quả đến người giao việc (Thư ký điều phối hoặc Lãnh đạo).
* Màn hình Chi tiết reload lại Toolbar (sang trạng thái **Hoàn thành**) và Timeline đầy đủ.
