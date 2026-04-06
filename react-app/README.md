# eOffice React App

Giao diện văn phòng số được chuyển đổi từ prototype HTML thuần sang **React + Vite + TypeScript** với **Tailwind CSS** và **shadcn/ui** (Radix UI).

## Phiên bản

| Thư viện | Phiên bản |
|---|---|
| React | 19.2.4 |
| Vite | 8.0.1 |
| TypeScript | 5.9.3 |
| Tailwind CSS | 4.2.2 |
| Lucide React | 1.7.0 |
| Radix UI | 1.x |

## Tính năng

- **22 màn hình** bao gồm toàn bộ luồng nghiệp vụ văn phòng
- **Sidebar** thu gọn / mở rộng theo nhóm chức năng
- **Navigation** bằng React Context (không dùng router)

## Cấu trúc màn hình

| Nhóm | Màn hình |
|---|---|
| 📥 Văn bản Đến | S1 Danh sách · S2 Tiếp nhận · S3 Chi tiết · S4 Chỉ đạo · S5 Đang xử lý · S6 Hoàn thành · S7 Thiết lập luồng |
| 📤 Văn bản Đi | S8 Danh sách · S9 Soạn thảo · S10 Duyệt song song · S11 Ký số · S12 Cấp số & Ban hành · S13 Đã ban hành |
| 📋 Văn bản Nội bộ | S14 Danh sách · S15 Tạo mới |
| 🗂 Hồ sơ lưu trữ | S16 Danh sách · S17 Tạo hồ sơ · S18 Chi tiết · S19 Nộp lưu |
| 📒 Sổ & Báo cáo | S20 Sổ đăng ký · S21 Cấu hình sổ · S22 Báo cáo thống kê |

## Cài đặt & Chạy

```bash
# Cài dependencies
npm install

# Chạy môi trường dev
npm run dev
# → http://localhost:5173

# Build production
npm run build

# Preview bản build
npm run preview
```

## Cấu trúc thư mục

```
src/
├── App.tsx                      # Root: NavigationProvider + AppShell
├── index.css                    # Global styles + design tokens
├── hooks/
│   └── useNavigation.tsx        # Navigation context
├── components/
│   ├── AppShell.tsx             # Layout chính
│   ├── Sidebar.tsx              # Sidebar điều hướng
│   ├── Topbar.tsx               # Header breadcrumb
└── screens/
    ├── vb-den/                  # S1–S7
    ├── vb-di/                   # S8–S13
    ├── noi-bo/                  # S14–S15
    ├── ho-so/                   # S16–S19
    └── so-bc/                   # S20–S22
```

## Yêu cầu hệ thống

- Node.js ≥ 18
- npm ≥ 9
