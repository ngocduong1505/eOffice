# uiSpec — Yêu cầu thay đổi giao diện eOffice

Thư mục này chứa các file **Markdown mô tả yêu cầu thay đổi UI** cho từng màn hình của dự án React.

## Cách dùng

1. Copy file `_template.md` và đặt tên theo màn hình: `S1-danh-sach.md`, `S3-chi-tiet.md`...
2. Điền đầy đủ thông tin vào các mục: mô tả, yêu cầu, mockup
3. Chuyển trạng thái `Draft → Ready` khi sẵn sàng để implement
4. Developer cập nhật `Done` sau khi hoàn tất

## Cấu trúc thư mục

```
uiSpec/
├── _template.md          ← Template mẫu dùng khi tạo spec mới
├── README.md             ← File này
│
├── vb-den/               ← Văn bản Đến (S1–S7)
├── vb-di/                ← Văn bản Đi (S8–S13)
├── noi-bo/               ← Văn bản Nội bộ (S14–S15)
├── ho-so/                ← Hồ sơ lưu trữ (S16–S19)
└── so-bc/                ← Sổ & Báo cáo (S20–S22)
```

## Conventions đặt tên file

| Màn hình | Tên file |
|---|---|
| S1 Danh sách VB Đến | `vb-den/S1-danh-sach.md` |
| S9 Soạn thảo | `vb-di/S9-soan-thao.md` |
| S22 Báo cáo | `so-bc/S22-bao-cao.md` |

## Trạng thái

| Trạng thái | Ý nghĩa |
|---|---|
| `Draft` | Đang soạn thảo yêu cầu |
| `Ready` | Sẵn sàng cho developer implement |
| `Done` | Đã implement xong |
