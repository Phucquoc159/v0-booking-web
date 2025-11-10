# Demo: Tạo Đặt Phòng Mới

## 📋 Tổng quan

Form tạo đặt phòng mới cho phép admin tạo một đơn đặt phòng với đầy đủ thông tin khách hàng, phòng và thanh toán.

## 🎯 Luồng hoạt động

### 1. Mở Dialog
- Click nút **"Tạo Đặt Phòng"** ở header
- Dialog hiển thị form với các trường cần thiết

### 2. Điền thông tin

#### **Thông Tin Khách Hàng**
- **CCCD**: Nhập số CCCD của khách hàng (bắt buộc)

#### **Thông Tin Đặt Phòng**
- **Ngày Đặt**: Chọn ngày đặt phòng (mặc định: hôm nay)
- **Nhân Viên**: Chọn nhân viên xử lý đơn (tùy chọn)
- **Trạng Thái**: Chọn trạng thái đơn đặt
  - Chờ Xác Nhận (pending)
  - Đã Xác Nhận (confirmed)
  - Đã Nhận Phòng (checked-in)
  - Hoàn Thành (completed)
  - Đã Hủy (cancelled)

#### **Thông Tin Phòng**
- **Hạng Phòng**: Chọn hạng phòng từ danh sách
  - Tự động điền **Đơn Giá** khi chọn hạng phòng
- **Số Lượng Phòng**: Nhập số lượng phòng cần đặt (mặc định: 1)
- **Ngày Nhận Phòng**: Chọn ngày check-in
- **Ngày Trả Phòng**: Chọn ngày check-out
- **Đơn Giá (₫)**: Giá phòng/đêm (tự động hoặc nhập thủ công)
- **Số Tiền Cọc (₫)**: Số tiền cọc (bắt buộc)

### 3. Validation

Hệ thống kiểm tra:
- ✅ CCCD không được để trống
- ✅ Phải chọn hạng phòng
- ✅ Đơn giá > 0
- ✅ Số tiền cọc > 0
- ✅ Ngày trả phòng phải sau ngày nhận phòng

### 4. Xử lý tạo đơn

Khi click **"Tạo Đặt Phòng"**:

1. **Tạo Phiếu Đặt (PhieuDat)**
   ```javascript
   {
     idPd: "PD001", // Tự động generate
     ngayDat: "2024-01-15",
     ngayBdThue: "2024-01-20",
     ngayDi: "2024-01-25",
     trangThai: "pending",
     soTienCoc: 500000,
     cccd: "1234567890123",
     idNv: "NV001" // hoặc null
   }
   ```

2. **Tạo Chi Tiết Phiếu Đặt (CTPhieuDat)**
   ```javascript
   {
     idPd: "PD001",
     idHp: "HP001",
     soLuongPhongO: 2,
     donGia: 1000000
   }
   ```

3. **Kết quả**
   - ✅ Hiển thị toast "Tạo đơn đặt phòng thành công"
   - ✅ Đóng dialog
   - ✅ Reset form về trạng thái ban đầu
   - ✅ Cập nhật danh sách đặt phòng

## 💡 Tính năng nổi bật

### Auto-fill Đơn Giá
Khi chọn hạng phòng, hệ thống tự động:
- Tìm hạng phòng được chọn
- Lấy giá mới nhất từ `giaHangPhongs[0].gia`
- Điền vào trường "Đơn Giá"

### Validation thông minh
- Kiểm tra ngày hợp lệ
- Kiểm tra số tiền > 0
- Hiển thị thông báo lỗi rõ ràng

### Reset form tự động
Sau khi tạo thành công, form tự động reset về:
- Ngày mặc định: hôm nay
- Trạng thái: "pending"
- Tất cả trường khác: rỗng hoặc giá trị mặc định

## 📝 Ví dụ sử dụng

### Ví dụ 1: Đặt phòng cơ bản
```
CCCD: 1234567890123
Ngày Đặt: 2024-01-15
Hạng Phòng: Deluxe - Giường đôi
Số Lượng: 1
Ngày Nhận: 2024-01-20
Ngày Trả: 2024-01-25
Đơn Giá: 1,000,000₫ (tự động)
Tiền Cọc: 500,000₫
Trạng Thái: Chờ Xác Nhận
```

### Ví dụ 2: Đặt nhiều phòng
```
CCCD: 9876543210987
Ngày Đặt: 2024-01-15
Hạng Phòng: Suite - Giường đôi
Số Lượng: 3
Ngày Nhận: 2024-02-01
Ngày Trả: 2024-02-05
Đơn Giá: 2,000,000₫
Tiền Cọc: 3,000,000₫
Nhân Viên: Nguyễn Văn A
Trạng Thái: Đã Xác Nhận
```

## 🔧 Code Structure

### State Management
```typescript
// Phiếu đặt
const [phieuDat, setPhieudat] = useState({
  ngayDat: new Date(),
  ngayBdThue: new Date(),
  ngayDi: new Date(),
  trangThai: "pending",
  soTienCoc: 0,
  cccd: "",
  idNv: null,
})

// Chi tiết phiếu đặt
const [ctPhieuDat, setCTPhieuDat] = useState({
  idPd: "",
  idHp: "",
  soLuongPhongO: 1,
  donGia: 0,
})
```

### Auto-fill Logic
```typescript
const handleRoomClassChange = (idHp: string) => {
  setIdHp(idHp)
  const selectedRoomClass = roomClasses.find((rc) => rc.idHp === idHp)
  if (selectedRoomClass?.giaHangPhongs?.[0]?.gia) {
    setCTPhieuDat({ 
      ...ctPhieuDat, 
      idHp, 
      donGia: Number(selectedRoomClass.giaHangPhongs[0].gia) 
    })
  }
}
```

## ⚠️ Lưu ý

1. **CCCD phải tồn tại** trong bảng `khach_hang`
2. **Hạng phòng** phải có giá được thiết lập
3. **Ngày** phải hợp lệ và ngày trả > ngày nhận
4. **Số tiền** phải là số dương

## 🎨 UI/UX Features

- Dark theme với màu sắc nhất quán
- Form validation với thông báo lỗi rõ ràng
- Auto-fill thông minh giảm thiểu nhập liệu
- Reset form tự động sau khi tạo thành công
- Toast notifications cho feedback người dùng

