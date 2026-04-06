# SPEC KIT — MODULE VĂN PHÒNG SỐ (E-OFFICE)
> Platform: EasyDocs | Phiên bản: 1.0 | Ngày: 30/03/2026 | Trạng thái: Draft

---

## I. 🧭 HIỆN TRẠNG HỆ THỐNG (AS-IS)

### 1. Tổng quan

**EasyDocs hiện tại** là nền tảng ký số và quản lý tài liệu. Entity trung tâm là `Contract` — đại diện cho mọi loại tài liệu đi qua luồng ký.

**Luồng chính hiện tại:**
```
Người tạo → Upload file → Thêm Recipient (Signer/Approver/Watcher)
→ Gửi → Ký số (EasyCA/EasySign) → Hoàn thành → Lưu trữ
```

**Các entity đang có:**
| Entity | Vai trò |
|--------|---------|
| `Contract` | Tài liệu chính (có Name, No, Summary, Status, Type) |
| `Recipient` | Người tham gia luồng (Creator/Signer/Approver/Watcher...) |
| `ContractFile` | File đính kèm của tài liệu |
| `Department` | Phòng ban |
| `RelatedDocument` | Liên kết tài liệu liên quan |

**ContractStatus hiện tại:** Draft → Sent → Complete / Reject / Voided / Deleted

---

### 2. Vấn đề / Pain point

#### Phía người dùng (Khách hàng: Viện E)
| # | Vấn đề | Mức độ |
|---|--------|--------|
| P1 | **Không quản lý được văn bản đến/đi** theo đúng quy trình NĐ 30/2020/NĐ-CP | 🔴 Critical |
| P2 | **Cấp số thủ công** — văn thư tự gán số, dễ trùng, dễ bỏ sót khi nhiều người cùng làm | 🔴 Critical |
| P3 | **Không có "bút phê" số** — Giám đốc không thể ghi ý kiến chỉ đạo trực tiếp trên hệ thống | 🔴 Critical |
| P4 | **1 tài khoản dùng chung nhiều người** cùng role → không có audit trail cá nhân | 🟠 High |
| P5 | **Không có hồ sơ lưu trữ** — VB không được nhóm theo công việc, không có thời hạn bảo quản | 🟠 High |
| P6 | **Không có sổ đăng ký** điện tử đúng chuẩn NĐ 30 để báo cáo/thanh tra | 🟡 Medium |
| P7 | **Không track được trạng thái xử lý** — không biết VB đang ở bước nào, ai đang giữ | 🟡 Medium |
| P8 | **Không quá hạn cảnh báo** — VB hỏa tốc xử lý trễ không ai biết | 🟡 Medium |

#### Phía hệ thống (System limitation)
- `ContractStatus` không đủ phân biệt các trạng thái văn thư (VB đến, đang chỉ đạo, đang xử lý, quá hạn...)
- Không có concept `DocDirection` (Đến / Đi / Nội bộ)
- Không có cơ chế cấp số tự động atomic (SELECT FOR UPDATE)
- Không có `DocumentFile` (hồ sơ lưu trữ) và permission theo scope
- `RecipientType` không có type cho "Ghi ý kiến chỉ đạo" (khác về ngữ nghĩa với Approver)
- Không có số series / sổ đăng ký theo NĐ 30

---

### 3. Workaround hiện tại

| Vấn đề | Cách lách hiện tại |
|--------|-------------------|
| Cấp số VB | Văn thư dùng Excel riêng, đánh số tay rồi điền vào hệ thống |
| Bút phê GĐ | In VB ra, GĐ viết tay, scan lại đính kèm |
| Theo dõi VB | Excel tracking riêng, cập nhật thủ công |
| Hồ sơ lưu trữ | Tạo thư mục Windows, đặt tên file theo quy ước riêng |
| Nhiều người 1 tài khoản | Ghi chú vào comment "NVA đã duyệt" thay vì hệ thống ghi nhận |

---

## II. 🚀 CHỨC NĂNG MỚI (BUSINESS / BA)

> Module E-Office gồm 5 sub-module: VB Đến · VB Đi · VB Nội bộ · Hồ sơ lưu trữ · Sổ đăng ký

---

### MODULE A — VĂN BẢN ĐẾN

#### A.1 Mô tả chức năng

Tiếp nhận văn bản từ bên ngoài, đóng dấu đến với số tự động, trình BGĐ ghi ý kiến chỉ đạo, phân công phòng ban xử lý, theo dõi tiến độ đến khi hoàn thành và lưu vào hồ sơ.

---

#### A.2 Mục tiêu

| Mục tiêu | KPI đo lường |
|----------|-------------|
| Xóa bỏ cấp số thủ công | 100% VB đến có số được cấp tự động, 0 trùng số |
| Số hóa "bút phê" BGĐ | BGĐ ghi ý kiến trực tiếp trên hệ thống, không in-scan |
| Track trạng thái real-time | Văn thư biết VB đang ở bước nào trong 2 giây |
| Cảnh báo quá hạn | 100% VB hỏa tốc/khẩn gửi alert trước hạn 24h |
| Tuân thủ NĐ 30 | Sổ VB đến đủ trường, xuất được PDF/Excel hợp lệ |

---

#### A.3 Use Case

**Actors:**
- `Văn Thư` — tiếp nhận, đóng dấu, theo dõi
- `Giám đốc / BGĐ` — đọc VB, ghi ý kiến chỉ đạo
- `Thư ký BGĐ` — thiết lập luồng xử lý theo chỉ đạo GĐ
- `Trưởng phòng / Chuyên viên` — nhận và xử lý VB
- `System` — cấp số tự động, gửi notification, track deadline

---

**Flow chính (Happy case):**

```
1. Văn Thư nhận VB vật lý / email
   → Vào [Tiếp nhận VB mới]
   → Điền: Loại VB, Tên/Trích yếu, Số ký hiệu gốc, Ngày đến,
            Nơi gửi, Mức khẩn, Mức mật, Hạn xử lý
   → Chọn hồ sơ lưu trữ VB đến, cho phép chọn nhiều hồ sơ, văn bản được tạo sẽ được tự động lưu vào hồ sơ đã chọn
   → Upload tệp chính (PDF/Word) + tệp đính kèm
   → Chọn sổ đến → System cấp số đến tự động (atomic)
   → Nhấn [Tiếp nhận] → VB có trạng thái: Đã tiếp nhận   

2. System → gửi notification đến BGĐ được chỉ định

3. BGĐ mở VB, đọc nội dung
   → Ghi ý kiến chỉ đạo (textarea — tương đương "bút phê")
   → Chọn đơn vị chủ trì xử lý + đơn vị phối hợp
   → Đặt hạn xử lý (có thể giữ nguyên hạn VB)
   → Nhấn [Lưu & Giao]

4. Thư ký nhận notification
   → Xem ý kiến GĐ (read-only)
   → Thiết lập luồng chính thức: chọn người nhận cụ thể,
      routing type (Fixed/AdHoc), deadline
   → Nhấn [Kích hoạt luồng]

5. Người được giao nhận notification
   → Xem VB + ý kiến GĐ
   → Xử lý (có thể tạo VB Đi để phản hồi)
   → Nếu cần: Re-assign cho cấp dưới
     (người giao vẫn xem, không mất quyền theo dõi)
   → Đánh dấu [Hoàn thành xử lý]

6. System cập nhật trạng thái → VB vào Hoàn thành
   → Nhắc người xử lý thêm VB vào hồ sơ
```

**Edge cases:**
| Case | Xử lý |
|------|-------|
| GĐ vắng, không chỉ đạo trong 24h | System nhắc GĐ + Văn thư thấy cảnh báo |
| Người xử lý re-assign nhiều cấp (A→B→C) | Chờ confirm khách hàng — tạm thời chỉ 1 cấp |
| VB trùng (cùng số ký hiệu gốc, cùng nơi gửi) | Cảnh báo "Có thể trùng VB", cho phép tiếp tục |
| Hết hạn xử lý | Status → Quá hạn; vẫn cho xử lý nhưng cần lý do |
| VB cần trả lại nơi gửi | Nút [Trả lại] → nhập lý do → archive |

**Error cases:**
| Lỗi | Thông báo |
|-----|-----------|
| Upload file > 50MB | "File quá lớn, tối đa 50MB" |
| Sổ đến chưa được cấu hình | Văn thư thấy warning, Admin cần tạo sổ trước |
| Số đến bị lỗi atomic | Retry tự động 3 lần, nếu fail → alert Admin |

---

#### A.4 UX/UI

**Entry point:**
- Sidebar: Văn phòng số → Văn bản Đến → nút `+ Tiếp nhận văn bản`
- Shortcut từ notification bell

**Flow màn hình:**
```
[S1] Danh sách VB Đến
  → Click [+ Tiếp nhận] → [S2] Form tiếp nhận
  → Sau submit → [S3] Chi tiết VB · Chờ BGĐ chỉ đạo
  → BGĐ click → [S4] Ghi ý kiến chỉ đạo
  → Thư ký click → [S7] Thiết lập luồng
  → Người xử lý → [S5] Đang xử lý
  → Hoàn thành → [S6] Hoàn thành
```

**Trạng thái đặc biệt:**
- **Empty state (S1):** "Chưa có văn bản nào. Nhấn + để tiếp nhận VB đầu tiên." với icon hộp thư rỗng
- **Loading:** Skeleton row thay vì spinner toàn trang
- **Quá hạn row:** Background nhạt đỏ, deadline text đỏ đậm + icon ⚠️
- **Stat strip:** Click vào stat → auto-filter danh sách theo trạng thái đó

**Smart suggestions:**
- Ngày đến: mặc định hôm nay
- Hạn xử lý: tự suggest theo mức khẩn (Hỏa tốc = hôm nay, Thượng khẩn = 3 ngày, Khẩn = 7 ngày)
- Nơi gửi: autocomplete từ danh mục đơn vị đã cấu hình

---

#### A.5 Business Rule

| Rule | Mô tả |
|------|-------|
| BR-D01 | Số đến được cấp tự động theo sổ được chọn — không cho nhập tay |
| BR-D02 | Mỗi năm có đúng 1 sổ VB đến — số reset về 1 vào 01/01 |
| BR-D03 | VB đến phải qua bước BGĐ chỉ đạo trước khi giao phòng ban |
| BR-D04 | Thư ký là người thiết lập luồng (không phải BGĐ trực tiếp chọn người) |
| BR-D05 | Người re-assign vẫn có quyền xem và theo dõi tiến độ, nhưng không xử lý |
| BR-D06 | VB quá hạn vẫn cho xử lý nhưng phải ghi lý do gia hạn |
| BR-D07 | 1 VB đến bắt buộc được lưu vào ít nhất 1 hồ sơ sau khi hoàn thành |

---

#### A.6 Scope

**In scope:**
- Tiếp nhận, đóng dấu số, cấp số tự động
- Bút phê BGĐ (ghi ý kiến chỉ đạo)
- Phân công xử lý (Fixed routing)
- Re-assign 1 cấp
- Track trạng thái + cảnh báo hạn
- Sổ VB đến (xem, xuất Excel/PDF)

**Out of scope (v1):**
- Re-assign nhiều cấp (A→B→C→D...) — chờ confirm khách hàng
- Tích hợp nhận VB tự động từ email/iGate
- OCR nhận dạng nội dung VB
- Chữ ký điện tử trên bước "ghi ý kiến chỉ đạo"
- Mobile app

---

### MODULE B — VĂN BẢN ĐI

#### B.1 Mô tả chức năng

Soạn thảo văn bản đi, qua luồng duyệt nội dung song song (tất cả người duyệt cùng lúc), Giám đốc ký số, Văn thư cấp số & đóng dấu, phát hành đến các đơn vị được chỉ định.

---

#### B.2 Mục tiêu

| Mục tiêu | KPI |
|----------|-----|
| Rút ngắn thời gian duyệt | Duyệt song song → giảm cycle time từ N ngày xuống còn max(thời gian duyệt dài nhất) |
| Số hóa ký số | 100% VB đi có chữ ký số hợp lệ (VNPT-CA / Viettel-CA) |
| Cấp số tự động | 0% trùng số ký hiệu |
| Audit trail đầy đủ | Mỗi bước lưu: ai làm gì, lúc nào, nội dung gì |

---

#### B.3 Use Case

**Actors:**
- `Người soạn thảo` (Chuyên viên khoa/phòng) — tạo VB, thiết lập luồng
- `Người duyệt nội dung` (Phó GĐ, Trưởng phòng) — duyệt nội dung
- `Giám đốc` — ký số + ghi chỉ đạo phát hành
- `Văn Thư` — cấp số, đóng dấu
- `Thư ký` - thực hiện ban hành theo chỉ đạo của lãnh đạo
- `System` — điều phối luồng, gửi notification

**Flow chính:**

```
1. Người soạn thảo tạo VB đi mới
   → Điền: Tên VB, Trích yếu, Loại VB, Khẩn/Mật, Hạn
   → Chọn hồ sơ lưu trữ VB đi, cho phép chọn nhiều hồ sơ, văn bản được tạo sẽ được tự động lưu vào hồ sơ đã chọn
   → Upload tệp chính (Word/PDF) + phụ lục
   → Thêm danh sách người duyệt (≥1 người)
   → Chọn người ký (Giám đốc)
   → Nhấn [Gửi duyệt]

2. System gửi notification đến TẤT CẢ người duyệt CÙNG LÚC
   (song song)

3. Mỗi người duyệt (độc lập):
   → Đọc VB
   → Chọn: [Đồng ý] / [Từ chối] / [Yêu cầu chỉnh sửa]
   → Ghi comment (optional với Đồng ý, bắt buộc với Từ chối/YC sửa)
   → Người duyệt có thể thêm người duyệt khác trong khi luồng chạy
   → Người duyệt có thể bình luận tại văn bản để người tạo sửa lại tài liệu. Sau khi sửa và gửi lại, luồng duyệt sẽ bắt đầu lại từ đầu 

4. Khi TẤT CẢ đồng ý → System chuyển VB sang trạng thái [Chờ ký]
   → Notification đến Giám đốc

   Nếu 1 người từ chối → luồng kết thúc → VB về trạng thái [Bị từ chối]
   → Người tạo phải tạo VB mới (không cho edit VB cũ)

5. Giám đốc:
   → Đọc VB đã duyệt
   → Ghi comment phát hành (nơi gửi, đối tượng nhận)
   → Ký số bằng USB Token (EasyCA/EasySign)
   → Nhấn [Ký và chuyển Văn thư]

6. Văn Thư:
   → Xác nhận cấp số ký hiệu (system preview, văn thư confirm)
   → Chọn con dấu → System overlay dấu lên PDF (hoặc văn thư in + scan)

7. Thư ký:
   →  Chọn đối tượng ban hành văn bản theo comment GĐ
   →  Nhấn [Ban hành] → gửi email hệ thống / thông báo

8. VB chuyển sang [Đã ban hành]
   → Số ký hiệu được ghi nhận vào sổ VB đi
```

**Edge cases:**
| Case | Xử lý |
|------|-------|
| Người duyệt muốn thêm người duyệt khác | Cho phép thêm mid-flow; người mới nhận notification ngay |
| GĐ muốn sửa VB sau khi đã duyệt xong | Không cho — phải tạo VB mới. Ghi nhận lý do vào audit |
| Thư ký thiết lập danh sách ký (optional) | Hiện tại người soạn chọn người ký; Thư ký-thiết-lập là future scope |
| Đóng dấu: số hay dấu tươi? | V1: dấu số (scan image overlay lên PDF); dấu tươi: out of scope |

---

#### B.4 UX/UI

**Entry point:** Sidebar → Văn bản Đi → `+ Soạn VB mới`

**Flow màn hình:**
```
[S8] Danh sách VB Đi
  → [S9] Form soạn thảo + thiết lập luồng
  → [S10] Chi tiết · Đang duyệt song song (progress 2/3)
  → [S11] GĐ ký số (PDF viewer + sign button)
  → [S12] Văn thư cấp số + đóng dấu 
  → [S13] Thư ký ban hành (chọn đối tượng nhận) 
  → [S14] Chi tiết · Đã ban hành
```

**Smart suggestions:**
- Progress bar "2/3 người đã duyệt" realtime
- Preview số ký hiệu trước khi confirm: `48/BC-BV`
- GĐ ghi comment phát hành → Thư ký thấy trực tiếp (không cần verbal)

---

#### B.5 Business Rule

| Rule | Mô tả |
|------|-------|
| BR-O01 | Duyệt song song — tất cả nhận notification cùng lúc |
| BR-O02 | Cần TẤT CẢ người duyệt đồng ý → mới chuyển Trình ký |
| BR-O03 | 1 người từ chối → luồng kết thúc, người tạo phải tạo VB mới |
| BR-O04 | Người duyệt không được chỉnh sửa file VB (chỉ đọc + comment) |
| BR-O05 | Số ký hiệu và ngày ban hành được cấp tại bước ban hành — không phải lúc tạo |
| BR-O06 | Sau khi ban hành, VB là immutable — không ai sửa được |
| BR-O07 | Đóng dấu v1: overlay dấu scan (PNG) lên PDF cuối cùng |

---

#### B.6 Scope

**In scope:**
- Soạn thảo + upload VB
- Luồng duyệt nội dung song song
- Thêm người duyệt mid-flow
- Ký số USB Token (EasyCA)
- Cấp số ký hiệu tự động (confirm bởi văn thư)
- Đóng dấu scan image
- Ban hành gửi email hệ thống

**Out of scope (v1):**
- Thư ký thiết lập danh sách người ký (sau khi duyệt xong) — đang là người soạn chọn
- Ký số trên mobile
- Gửi VB ra ngoài qua iGate / Trục liên thông
- Recall VB đã ban hành (thu hồi) — phase 2
- Dấu tươi (in và scan) — out of scope

---

### MODULE C — VĂN BẢN NỘI BỘ

#### C.1 Mô tả chức năng

VB lưu hành nội bộ trong tổ chức với 2 luồng: (1) Cần cấp số nội bộ — tương tự VB Đi nhưng không ra ngoài; (2) Phát hành trực tiếp — soạn xong gửi ngay, không qua duyệt/ký.

---

#### C.2 Mục tiêu

Đáp ứng nhu cầu lưu hành văn bản nội bộ đa dạng (thông báo, biên bản, quy trình, quyết định nội bộ) mà không bắt buộc phải đi qua luồng nặng của VB Đi.

---

#### C.3 Use Case

**2 luồng chính:**

**Luồng 1 — Phát hành trực tiếp (không đóng dấu và cấp số):**
```
Giống VB đi nhưng bỏ bước văn thư đóng dấu và cấp số
```
**Luồng 2 — Có cấp số nội bộ:**
```
Giống VB Đi được đóng dấu và cấp số nội bộ trước khi phát hành 
Phù hợp: Quy trình, Quy định, Quyết định nội bộ
```   
---

#### C.4 Business Rule

| Rule | Mô tả |
|------|-------|
| BR-N01 | Người tạo chọn luồng khi tạo VB — không đổi được sau khi gửi |
| BR-N02 | Không có sổ VB nội bộ (theo khách hàng) |
| BR-N03 | VB nội bộ có thể lưu vào hồ sơ lưu trữ |

---

#### C.5 Scope

**In scope:** 2 luồng, gửi nội bộ, lưu hồ sơ

**Out of scope:** VB nội bộ gửi ra ngoài tổ chức; sổ VB nội bộ

---

### MODULE D — HỒ SƠ LƯU TRỮ

#### D.1 Mô tả chức năng

Nhóm các văn bản liên quan cùng 1 công việc/dự án vào hồ sơ. Hồ sơ có lifecycle: lập → nộp lưu → bảo quản → tiêu hủy. Có phân quyền xem/sửa theo người, phòng ban.

---

#### D.2 Mục tiêu

| Mục tiêu | KPI |
|----------|-----|
| Gom VB liên quan vào 1 chỗ | 100% VB hoàn thành được gắn vào ≥1 hồ sơ |
| Tuân thủ thời hạn bảo quản | Cảnh báo tự động 30 ngày trước khi hết hạn |
| Tiêu hủy có audit | 100% hồ sơ tiêu hủy có lãnh đạo phê duyệt, lưu audit |

---

#### D.3 Use Case

**Actors:**
- `Admin` — tạo danh mục loại hồ sơ
- `Người lập hồ sơ` — tạo hồ sơ, thêm VB
- `Bộ phận lưu trữ` — tiếp nhận hoặc trả lại hồ sơ nộp lưu
- `Lãnh đạo` — phê duyệt tiêu hủy

**Flow lập hồ sơ:**
```
1. Admin tạo danh mục loại hồ sơ cho năm
2. Người lập: Tạo hồ sơ mới
   → Điền: Tiêu đề, Loại hồ sơ, Thời hạn BQ, Phân quyền
   → System cấp mã hồ sơ tự động (VD: BV-2026-047)
3. Thêm VB vào hồ sơ (VB Đến / VB Đi / VB Nội bộ đã có trên hệ thống)
4. Nộp lưu hồ sơ → trạng thái [Chờ xác nhận]
   → Hồ sơ chuyển read-only
5. Bộ phận lưu trữ kiểm tra:
   → Đạt: Tiếp nhận → [Đang bảo quản]
   → Không đạt: Trả lại kèm lý do → [Chờ nộp lưu]
```

**Flow tiêu hủy:**
```
Bộ phận lưu trữ lập danh sách hồ sơ đề xuất tiêu hủy
→ Lãnh đạo xem xét và phê duyệt
→ System ghi nhận quyết định (không xóa data)
→ Hồ sơ chuyển status = Tiêu hủy
→ Ẩn khỏi danh sách thông thường
→ Metadata + lịch sử vẫn giữ để kiểm tra sau
```

---

#### D.4 Business Rule

| Rule | Mô tả |
|------|-------|
| BR-H01 | Mỗi VB hoàn thành bắt buộc thuộc ≥1 hồ sơ |
| BR-H02 | 1 VB có thể thuộc nhiều hồ sơ của nhiều phòng ban |
| BR-H03 | Hồ sơ có thể chứa cả VB Đến lẫn VB Đi liên quan cùng công việc |
| BR-H04 | Chỉ người trong luồng xử lý VB mới có thể thêm VB đó vào hồ sơ |
| BR-H05 | Sau khi nộp lưu → hồ sơ là read-only, không thêm/bớt VB |
| BR-H06 | Thời hạn BQ: 5 / 10 / 20 năm / Vĩnh viễn |
| BR-H07 | Cảnh báo hết hạn: trước 30 ngày (web) + trước 3 ngày (email) |
| BR-H08 | Tiêu hủy không xóa data — chỉ đổi status + ghi audit |
| BR-H09 | Admin có thể gia hạn thời gian bảo quản |
| BR-H10 | Permission: Owner > Manager > Editor > Viewer (lấy quyền cao nhất nếu user có nhiều scope) |

---

#### D.5 Scope

**In scope:**
- CRUD hồ sơ, thêm VB (chỉ VB đã có trên hệ thống)
- Phân quyền: User / Dept / Role / OrgWide
- Quy trình nộp lưu 4 bước
- Cảnh báo hết hạn
- Tiêu hủy có audit

**Out of scope (v1):**
- Upload file trực tiếp vào hồ sơ (không qua VB)
- Số hóa hồ sơ giấy cũ (OCR)
- Sắp xếp thứ tự tài liệu trong hồ sơ (drag-drop)

---

### MODULE E — SỔ ĐĂNG KÝ & CẤU HÌNH SỔ

#### E.1 Mô tả chức năng

Sổ đăng ký VB Đến / VB Đi đúng chuẩn NĐ 30, tự động tổng hợp từ data VB trên hệ thống. Admin cấu hình pattern số, reset hàng năm. Xuất được Excel/PDF.

---

#### E.2 Business Rule

| Rule | Mô tả |
|------|-------|
| BR-S01 | Mỗi năm: 1 sổ VB Đến, 1 sổ VB Đi. Không có sổ VB nội bộ |
| BR-S02 | Số được reset về 1 vào 01/01 hàng năm |
| BR-S03 | Pattern số: configurable (VD: `{STT}`, `{STT}/{LOAI}-BV`) |
| BR-S04 | Văn thư không nhập số thủ công — chỉ chọn sổ, số tự sinh |
| BR-S05 | Admin tạo sổ cho năm mới trước ngày 01/01 |
| BR-S06 | Sổ đăng ký có đủ trường theo Phụ lục 4 NĐ 30/2020 |

---

```
## III. ⚙️ HIỆN TRẠNG KỸ THUẬT — EASYDOCS (AS-IS TECHNICAL)

> Tổng hợp từ source code thực tế. Dùng làm baseline cho thiết kế E-Office.

---

### 1. Stack & Pattern

| Layer | Thực tế |
|-------|---------|
| **Backend** | ASP.NET Core, EF Core, SQL Server |
| **Pattern** | Repository + Unit of Work + `Result<T>` + AutoMapper |
| **i18n** | `IStringLocalizer` — đa ngôn ngữ có sẵn |
| **File processing** | Syncfusion DocIO (Word) + Syncfusion PDF |
| **Ký số** | `IFileSigningService`, `ISigningSetupService` — đã có |
| **Email** | `ISendMailService` — gửi theo template, đã có |
| **Audit trail** | `IHistoryActivityRepository` + `IHistoryActivityDetailService` — đã có |
| **Số tài liệu** | `IDocumentNoService` — đã có, cấp số theo category |

---

### 2. Data Model hiện tại

#### 2.1 Contract — Entity trung tâm

```csharp
public partial class Contract {
    public long Id { get; set; }
    public Guid Code { get; set; }
    public string? Name { get; set; }              // tên tài liệu
    public string? No { get; set; }                // số ký hiệu (DocumentNoService cấp)
    public string? Summary { get; set; }
    public long? ComId { get; set; }               // company/organization
    public long? OrganizationId { get; set; }
    public ContractStatus Status { get; set; }
    public ContractType? Type { get; set; }        // Normal | Temp
    public int? CurrentStep { get; set; }          // bước hiện tại của flow
    public long? CreatedBy { get; set; }
    public long? ContractCategoryID { get; set; }  // loại tài liệu (category)
    public string? CustomFields { get; set; }      // JSON — custom fields
    public long? BatchId { get; set; }
    public bool? isImportant { get; set; }
    public bool? isInstant { get; set; }
    public DateTime? EffectiveDate { get; set; }
    public DateTime? ExpirationDate { get; set; }
    public DateTime? Term { get; set; }            // hạn nhắc nhở
    public RemindType? RemindType { get; set; }
    public int? RemindTime { get; set; }

    // Navigation
    public virtual ICollection<Recipient> Recipients { get; set; }
    public virtual ICollection<Department> Departments { get; set; }
    public virtual ICollection<ContractFile> ContractFiles { get; set; }
    public virtual ICollection<RelatedDocument> RelatedDocuments { get; set; }
    public virtual ICollection<RelatedDocument> RootDocuments { get; set; }
    public virtual ICollection<ContractCustomFields> ContractCustomFields { get; set; }
}

public enum ContractStatus {
    Draft = 1, Sent = 2, Deleted = 3,
    Reject = 4, Complete = 5, Voided = 6
}

public enum ContractType { Normal = 0, Temp = 1 }
```

---

#### 2.2 Recipient — Flow Engine

Flow engine của EasyDocs **không phải engine riêng** — logic nằm hoàn toàn trong `Recipient`.

```csharp
public partial class Recipient {
    public long Id { get; set; }
    public long ContractId { get; set; }
    public long? ComId { get; set; }

    // ── Flow control ──
    public int? ProcessStep { get; set; }             // bước trong luồng (1, 2, 3...)
    public ProcessStatus? ProcessStatus { get; set; } // New → Complete
    public string? ProcessDescription { get; set; }   // ghi chú/lý do xử lý

    // ── Định danh ──
    public long? UserId { get; set; }
    public string? Email { get; set; }
    public string? FullName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Position { get; set; }             // chức vụ (display only)

    // ── Loại người nhận ──
    public RecipientType? Type { get; set; }

    // ── Delegation / Re-assign ──
    public long? ParentID { get; set; }               // parent khi re-assign/delegate
    public bool? AllowDelegation { get; set; }

    // ── Phối hợp ──
    public long? CoordinatorID { get; set; }
    public int? CoordinationStep { get; set; }

    // ── Config mở rộng ──
    public string? Config { get; set; }               // JSON — extensible

    // ── External recipient ──
    public string? AccessCode { get; set; }
    public string? AccessToken { get; set; }
    public RecipientNeedOtp? NeedOTP { get; set; }

    // ── Misc ──
    public string? Color { get; set; }
    public bool? GetFileInMail { get; set; }
    public bool? IsInitialSignerPositionFlexible { get; set; }
    public LocalizationEnum? LocalizationEmail { get; set; }
    public DeleteType? DeleteType { get; set; }
    public string? PrivateMessage { get; set; }

    public virtual ICollection<RecipientConfig> RecipientConfigs { get; set; }
}

public enum RecipientType {
    Creator = 0,             // người tạo
    Signer = 1,              // người ký chính
    Coordinator = 2,         // người phối hợp
    Approver = 3,            // người duyệt
    Watcher = 4,             // người theo dõi
    ForwardingRecipient = 5, // chuyển tiếp
    AfterWatcher = 6,        // theo dõi sau ký
    Assignee = 7,            // người được giao
    InitialSigner = 9,       // ký nháy
    Outer = 10,              // bên ngoài tổ chức
    System = 11,
    User = 12
    // Chưa có: Directive = 13 (BGĐ ghi ý kiến chỉ đạo)
}
```

**Cơ chế flow vận hành:**

```
Contract.CurrentStep = N           ← bước đang active
Recipient.ProcessStep = 1/2/3...   ← recipient thuộc bước nào
Recipient.ProcessStatus            ← New (chờ) → Complete (xong)

Logic: Khi TẤT CẢ Recipient có ProcessStep = N đều Complete
       → Contract.CurrentStep = N + 1
       → Activate Recipient ở ProcessStep = N + 1
```

---

#### 2.3 Department

```csharp
public class Department {
    public long ID { get; set; }
    public long ComId { get; set; }
    public long? ParentId { get; set; }                        // cây tổ chức — đã có
    public string? Code { get; set; }
    public string Name { get; set; }
    public DepartmentType? Type { get; set; }
    public DepartmentStatus? Status { get; set; }
    public long? ManagerEID { get; set; }                      // manager employee

    public virtual Employee? Manager { get; set; }
    public virtual Department? ParentDepartment { get; set; }
    public virtual ICollection<Department> SubDepartments { get; set; }
    public virtual ICollection<ContractDepartment> ContractDepartments { get; set; } // junction
    public virtual ICollection<Role> Roles { get; set; }
    public virtual ICollection<RoleDepartmentPreview> RoleDepartmentPreviews { get; set; }
}
```

---

#### 2.4 ContractFile

```csharp
public enum ContractFileType {
    Origin,       // file gốc (Word/PDF upload)
    SignedFile,   // file sau khi ký số
    MergeFields,  // file sau khi merge custom fields
    Convert,      // file đã convert (docx → pdf)
}
// Lấy file để view: ưu tiên SignedFile > MergeFields > Convert > Origin(.pdf)
```

---

#### 2.5 RelatedDocument

```csharp
public enum RelateDocumentType { Appendix, ... }
// 1 Contract → nhiều RelatedDocument (phụ lục, tài liệu liên quan)
// Có cả RootDocuments (chiều ngược lại)
```

---

#### 2.6 ContractCustomFields

Custom fields per-contract, per-category:
- `DataName`, `DataValue`, `DataType` (DateTime, Number, Text...)
- `MergeFieldName` — map vào merge field của Word template
- `FileCode` — gắn với file cụ thể (nếu có nhiều file)
- Hỗ trợ auto-generate PDF khi data thay đổi

---

#### 2.7 HistoryActivity + HistoryActivityDetail

Audit trail đầy đủ, đã có sẵn:

```csharp
public enum HistoryAction {
    Create, ChangeName, ChangeDocumentInfo,
    ChangeTerm, UpdateExpirationDate, UpdateEffectiveDate,
    ChangeEmailSetting, ...
    // Cần thêm: Stamp, Directive, FlowSetup, Complete, Issue, ...
}
// Ghi nhận: RecipientId, Action, Detail (JSON old/new), ContractId, Timestamp
```

---

### 3. Services có thể reuse

| Service | Mô tả hiện tại | Reuse cho E-Office |
|---------|---------------|-------------------|
| `IDocumentNoService` | Cấp `Contract.No` theo category | ⚠️ Xem implementation — có thể extend cho số đến/đi |
| `IFileSigningService` | Ký số file | ✅ Reuse cho GĐ ký VB Đi |
| `ISigningSetupService` | Cấu hình ký số | ✅ Reuse |
| `ISendMailService` | Gửi email template | ✅ Reuse + thêm E-Office email templates |
| `IHistoryActivityRepository` | Ghi audit log | ✅ Reuse + thêm action types |
| `IHistoryActivityDetailService` | So sánh thay đổi chi tiết | ✅ Reuse |
| `IDepartmentService` | Quản lý phòng ban | ✅ Reuse cho routing VB Đến |
| `IFileConverter` | Word ↔ PDF | ✅ Reuse xử lý file VB |
| `IFileManager` | Upload/download/delete | ✅ Reuse |

---

### 4. Convention của ContractService

Mọi operation trong EasyDocs tuân theo pattern nhất quán:

```csharp
// Validate
var contract = await _repo.FirstOrDefaultAsync(...);
if (contract == null) return Result<T>.Failure("message");

// Transaction
await _unitOfWork.BeginTransactionAsync();
try {
    // Business logic
    // Ghi history
    await _historyRepo.AddAsync(recipientId, "", "", HistoryAction.X, detail, contractId);
    // Save
    await _repo.SaveChangesAsync();
    await _unitOfWork.CommitTransactionAsync();
} catch {
    await _unitOfWork.RollbackTransactionAsync();
    throw;
}

// Side effects SAU commit (không nằm trong transaction)
await _sendMailService.Send...(...);
```

E-Office service phải tuân theo đúng convention này.

---

### 5. Gaps — Những gì chưa có

| Gap | Cần cho E-Office | Hướng xử lý đã chốt |
|-----|-----------------|---------------------|
| `Contract.Mode` | Phân biệt EDocs / EOffice | Thêm field `ContractMode` enum |
| `Contract.DocDirection` | VB Đến / Đi / Nội bộ | Thêm field `DocDirection` enum |
| `Contract.OfficeStatus` | Trạng thái văn thư riêng | Thêm field + `OfficeStatus` enum mới (không extend ContractStatus) |
| `RecipientType.Directive = 13` | Bút phê BGĐ — ngữ nghĩa khác Approver | Thêm enum value |
| `Recipient.RoutingType` | Fixed / Position / AdHoc | Thêm field (hoặc dùng `Config` JSON) |
| `Recipient.DirectiveContent` | Nội dung ý kiến chỉ đạo | Thêm field (hoặc dùng `Config` JSON) |
| `Recipient.DirectiveDeadline` | Hạn chỉ đạo riêng | Thêm field (hoặc dùng `Config` JSON) |
| `IncomingStamp` | Dấu đến: số đến, ngày, người nhận | Bảng mới |
| `NumberSeries` + `IssuedNumber` | Sổ đăng ký + số tự động | Bảng mới (sau khi xem `IDocumentNoService`) |
| `DocumentFile` | Hồ sơ lưu trữ | Bảng mới |
| `DocumentFileContract` | N-N: VB ↔ Hồ sơ | Junction table mới |
| `DocumentFilePermission` | Phân quyền hồ sơ theo scope | Bảng mới |

---

## IV. 📋 OPEN ITEMS (Chờ khách hàng xác nhận)

| # | Vấn đề | Module | Priority |
|---|--------|--------|----------|
| OI-01 | Re-assign nhiều cấp (A→B→C) được không? Tích hợp phần mềm QLCV không? | VB Đến | High |
| OI-02 | Duyệt VB Đi: cần TẤT CẢ hay ĐA SỐ đồng ý? | VB Đi | High |
| OI-03 | Người duyệt có được chỉnh sửa file VB không? | VB Đi | High |
| OI-04 | Thư ký thiết lập danh sách người ký (sau khi duyệt xong) — khi nào implement? | VB Đi | Medium |
| OI-05 | Đóng dấu: số (overlay) hay dấu tươi (in+scan), hay cả hai? | VB Đi | High |
| OI-06 | Mã số đơn vị ban hành: cấu trúc gì, bắt buộc không? | VB Đến | Medium |
| OI-07 | Phân quyền hồ sơ: ai tạo được hồ sơ? Tất cả user hay chỉ role nhất định? | Hồ sơ | Medium |
| OI-08 | Xem hồ sơ: lãnh đạo/admin thấy toàn bộ hồ sơ trong đơn vị không? | Hồ sơ | Medium |
| OI-09 | Timeline tài liệu trong hồ sơ: thứ tự add vào hay thứ tự phát hành? | Hồ sơ | Low |
| OI-10 | Quy tắc sổ VB (format pattern cụ thể) — đợi hỏi lại văn thư | Sổ đăng ký | High |
| OI-11 | Báo cáo: xác nhận danh sách loại báo cáo cần thiết | Báo cáo | Medium |
| OI-12 | Tags: admin tạo → chia sẻ, hay cá nhân tự tạo riêng? | Toàn bộ | Low |

---

*Tài liệu này phản ánh hiểu biết của BA tại thời điểm khảo sát. Mọi nội dung cần được khách hàng xác nhận trước khi tiến hành đặc tả chính thức.*
