# Đánh giá dự án Unkey Marketing Site (PROJECT_REVIEW.md)

Dự án này là trang web Marketing & Landing Page chính thức của **Unkey** (một nền tảng quản lý API keys, rate-limiting, and deployment). Trang web được phát triển bằng các công nghệ hiện đại nhất, tập trung vào hiệu suất cao, SEO tối ưu và trải nghiệm người dùng cao cấp với nhiều hiệu ứng 3D và tương tác động.

---

## 1. Công nghệ sử dụng & Thư viện (Tech Stack)

### Core Frameworks
*   **Next.js 16 (App Router)**: Framework chính cho ứng dụng React, tận dụng lợi thế React Server Components (RSC) để tối ưu SEO và thời gian tải trang.
*   **React 19**: Phiên bản mới nhất của React với các cải tiến về hiệu năng và quản lý state.
*   **TypeScript (Strict)**: Quản lý kiểu dữ liệu tĩnh nghiêm ngặt trên toàn hệ thống.
*   **pnpm 11**: Package manager hiệu năng cao, tối ưu dung lượng đĩa cứng.

### Styling & UI Components
*   **Tailwind CSS v4**: Phiên bản mới nhất của Tailwind, cấu hình biến CSS trực tiếp trong file css chính (`src/styles/globals.css`).
*   **Radix UI primitives**: Các component nền tảng không có style (headless) phục vụ khả năng truy cập (accessibility):
    *   Accordion, Checkbox, Collapsible, Dialog, Label, ScrollArea, Select, Separator, Slot, Tabs, Tooltip.
*   **shadcn/ui (New-York style)**: Bộ component UI tái sử dụng cấu trúc dựa trên Radix UI và Tailwind CSS.
*   **Lucide Icons**: Bộ icon dạng vector hiện đại và gọn nhẹ.

### Hiệu ứng, 3D & Animation (Premium Visuals)
*   **Three.js & React Three Fiber (R3F) / Drei**: Render đồ họa 3D động. Dự án có thành phần **ASCII Renderer** độc đáo để tạo hiệu ứng Canvas dạng ký tự ASCII nghệ thuật trên Trang chủ.
*   **Rive Canvas (`@rive-app/react-canvas`)**: Tích hợp các hoạt ảnh Rive tương tác cao, mượt mà và nhẹ hơn nhiều so với GIF/Video truyền thống.
*   **Motion (Framer Motion v12)**: Thư viện chuyển động mạnh mẽ cho React.
*   **Number Flow (`@number-flow/react`)**: Tạo hiệu ứng chuyển số động (mượt mà như trên bảng điện tử) khi thay đổi giá trị trong các bộ tính toán.
*   **Embla Carousel**: Carousel mượt mà cho slider sản phẩm hoặc phản hồi khách hàng.
*   **Vaul**: Drawer (bảng trượt từ dưới lên) tối ưu cho thiết bị di động.
*   **Media Chrome**: Tùy biến trình phát video / âm thanh với giao diện cao cấp.

### Content Pipeline (Hệ thống Markdown/MDX)
*   **next-mdx-remote**: Công cụ render MDX từ dữ liệu text.
*   **Unified / Remark / Rehype**: Hệ sinh thái xử lý AST markdown:
    *   `remark-gfm`: Hỗ trợ Github Flavored Markdown.
    *   `shiki`: Bộ highlight cú pháp code cực mạnh chạy ở build-time.
    *   Các custom plugins tự phát triển:
        *   `remark-npm`: Tự động chuyển đổi các câu lệnh console sang Tab cài đặt (npm, pnpm, yarn).
        *   `remark-admonition`: Xử lý khối cảnh báo dạng `> [!NOTE]`, `> [!TIP]`, v.v.
        *   `remark-steps`: Tạo các bước hướng dẫn trực quan.
        *   `remark-heading`: Trích xuất mục lục (Table of Contents).
        *   `remark-image`: Tối ưu hóa kích thước ảnh nội dung.

### Tracking & Analytics
*   **@c15t/nextjs**: Giải pháp quản lý sự đồng ý của khách hàng (Consent Manager / Cookie Banner) và tracking tuân thủ quy định bảo mật.
*   **@vercel/analytics**: Thu thập thông tin truy cập thời gian thực trên môi trường Vercel.

### Công cụ khác
*   **next-sitemap**: Tự động tạo sitemap sau mỗi lần build phục vụ SEO.
*   **date-fns**: Xử lý ngày tháng.
*   **Zod & React Hook Form**: Quản lý form đăng ký và xác thực dữ liệu an toàn.

---

## 2. Danh sách các loại trang (Page Routes)

Toàn bộ các trang chính nằm dưới Route Group `(website)` giúp dùng chung layout chứa Header và Footer:

1.  **Trang chủ (Homepage - `/`)**:
    *   Showcase các tính năng cốt lõi (Control Plane, Gateway, Scale, Observe, Portal) của Unkey.
    *   Chứa canvas 3D nghệ thuật dạng ASCII và các tương tác động.
2.  **Trang Pricing (`/pricing`)**:
    *   Bảng giá so sánh các gói của 2 sản phẩm chính: **Unkey Deploy** và **API Management**.
    *   Bộ tính toán chi phí động (Usage/Compute Calculator) sử dụng Number Flow và các thanh kéo trực quan.
3.  **Trang Blog (`/blog` & `/blog/[slug]`)**:
    *   Trang danh sách các bài viết (hỗ trợ phân trang, tìm kiếm) và trang chi tiết bài viết được render động từ MDX trong thư mục `src/content/blog`.
4.  **Trang Changelog (`/changelog` & `/changelog/[slug]`)**:
    *   Nơi cập nhật tính năng mới của sản phẩm. Nguồn dữ liệu từ MDX trong `src/content/changelog`.
5.  **Trang Glossary (`/glossary` & `/glossary/[slug]`)**:
    *   Từ điển định nghĩa các thuật ngữ kỹ thuật API.
6.  **Trang Case Studies (`/case-studies` & `/case-studies/[slug]`)**:
    *   Trình bày câu chuyện thành công từ khách hàng thực tế.
7.  **Trang Startups & YC Program (`/startups`, `/yc`)**:
    *   Các chương trình ưu đãi cấp credit (nhận $1,000 credits/tháng) cho startup và các công ty thuộc Y Combinator. Chứa form đăng ký tích hợp.
8.  **Trang Legal/Policies (`/policies/terms`, `/policies/privacy`)**:
    *   Các điều khoản pháp lý và chính sách bảo mật, render từ file markdown tĩnh.

---

## 3. Các tính năng & Chức năng nổi bật hiện có

### A. Hệ thống MDX Pipeline mạnh mẽ
Dự án không chỉ render HTML đơn thuần mà tích hợp hệ thống component MDX tùy biến cao trong `src/components/content`. Nó cho phép biên soạn bài viết blog/tài liệu bằng markdown nhưng vẫn chèn được:
*   Biểu đồ **Mermaid.js** vẽ ngay trong mã nguồn.
*   Trình phát Video tùy biến chất lượng cao.
*   Khối code có tab chuyển đổi gói cài đặt (npm/pnpm/yarn) tự động sinh ra khi viết mã.
*   Bảng thư mục file (`<FileSystem />`) mô phỏng cấu trúc code trực quan.

### B. Tìm kiếm thông minh (Search Dialog)
*   Hộp thoại tìm kiếm client-side nhanh chóng kích hoạt bằng phím tắt (`Cmd + K` hoặc `Ctrl + K`).
*   Hỗ trợ debounce để tối ưu hóa hiệu năng tìm kiếm.
*   Lưu lịch sử tìm kiếm gần đây vào `localStorage` của trình duyệt.
*   Hỗ trợ tìm kiếm phân loại (Blog, Glossary, v.v.).

### C. API phục vụ AI & LLM Crawlers
*   **`GET /api/blog/[slug]`**: Trả về trực tiếp mã Markdown thuần của bài viết blog thay vì trang HTML đã render. Tính năng này cực kỳ tối ưu cho các tác nhân AI (như ChatGPT, Gemini) crawl và hiểu nội dung bài viết một cách nhanh chóng.
*   **`GET /api/pricing`**: Tương tự, trả về bảng giá đầy đủ ở định dạng Markdown để AI dễ đọc.
*   **`POST /api/revalidate`**: Webhook nhận yêu cầu từ bên ngoài để xóa cache và cập nhật bài viết mới ngay lập tức (On-demand Revalidation).

### E. Consent & Tracking Compliance
*   Hệ thống Banner Cookie và bảng điều khiển Cookie Consent tích hợp sâu bằng thư viện `@c15t/nextjs`. Người dùng có quyền đồng ý hoặc từ chối các loại tracking trước khi script được kích hoạt.

---

## 4. Ghi chú về Kiến trúc & Quy chuẩn Code (Developer Notes)

*   **Tối ưu SEO**: Tất cả các trang đều sử dụng helper `getMetadata()` trong `src/lib/get-metadata.ts` để sinh ra thẻ Title, Meta Description, OpenGraph, Twitter Card chuẩn chỉ và nhất quán.
*   **Data-Driven Pattern**: Các component phần lớn là "pure view". Dữ liệu nội dung tĩnh được tách biệt hoàn toàn vào thư mục `src/constants/` (như `home.ts`, `pricing.ts`, `about.ts`), giúp lập trình viên chỉnh sửa nội dung cực kỳ dễ dàng mà không chạm vào JSX logic.
*   **Component Naming**: Các component biến thể hoặc chuyên biệt hóa sử dụng tên dạng kebab-case với dấu gạch ngang kép, ví dụ: `hero--changelog.tsx`, `features--column.tsx`.
*   **Quality Check**: Trước khi commit code, dự án yêu cầu chạy chuỗi kiểm tra chất lượng:
    `pnpm lint && pnpm typecheck && pnpm build`.
*   **Path Aliases**:
    *   `@/*` đại diện cho thư mục `src/*`
    *   `@root/*` đại diện cho thư mục gốc `./*`
