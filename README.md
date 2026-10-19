# Món quà 20/10

Trang web mini làm bằng Vite, HTML/CSS/JavaScript và GSAP. Bấm hộp quà để mở nắp, xem lá thư và hiệu ứng sticker.

## Chạy trên máy

Cần cài Node.js LTS trước. Mở terminal tại thư mục dự án rồi chạy:

```bash
npm install
npm run dev
```

Mở địa chỉ local mà Vite in ra trong terminal (thường là `http://localhost:5173`).

## Thử trang

1. Mở trang ở trình duyệt máy tính và điện thoại (hoặc bật chế độ responsive trong DevTools).
2. Bấm hoặc dùng phím Tab rồi Enter/Space để mở hộp quà.
3. Kiểm tra nắp hộp bật lên, confetti xuất hiện, lá thư và sticker hiện ra.
4. Nếu chưa có ảnh sticker, hình hoa minh họa mặc định sẽ được dùng thay thế.
5. Thử bật tùy chọn giảm chuyển động của hệ điều hành để kiểm tra chế độ `prefers-reduced-motion`.
6. Chạy `npm run build` để kiểm tra bản production.

## Thêm GIF hoặc sticker của bạn

Tạo thư mục `public/images` rồi chép GIF vào với tên `girlfriend.gif`:

```text
public/
  images/
    girlfriend.gif
```

Trang sẽ tự dùng ảnh đó thay cho hình minh họa sau khi tải thành công. Nếu muốn đặt tên file khác, sửa `src` của phần tử `#sticker-image` trong `index.html`. Ảnh nên có nền trong suốt, tỉ lệ gần vuông và dung lượng nhẹ để tải nhanh.

## Cá nhân hóa lời chúc

Sửa nội dung tiêu đề, lời chúc và chữ ký trong `index.html`. Có thể chỉnh bảng màu trong các biến CSS ở đầu `src/style.css`.
