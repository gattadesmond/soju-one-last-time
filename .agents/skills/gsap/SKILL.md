---
name: gsap
description: Guidelines and best practices for creating high-performance web animations using GSAP (GreenSock Animation Platform) in React and Next.js applications.
---

# GSAP Animation Skill & Prompt Guide

Bản tài liệu này hướng dẫn cách tích hợp và sử dụng **GSAP (GreenSock Animation Platform)** cùng với hook chính thức **`@gsap/react`** trong các component React/Next.js. 

Tài liệu này đóng vai trò là một **Agent Skill** giúp các AI coding assistants hiểu rõ các quy chuẩn viết code animation mượt mà, tối ưu hiệu năng và an toàn với môi trường Server-Side Rendering (SSR).

---

## 1. Cấu hình & Cài đặt Cơ bản

Dự án đã được cài đặt hai package cốt lõi:
*   `gsap`: Thư viện animation core.
*   `@gsap/react`: Thư viện hook tích hợp chính thức giúp tự động hóa việc dọn dẹp (cleanup) và quản lý scope trong React.

### Cách Import & Đăng ký Plugins
Khi sử dụng các plugin bổ sung của GSAP (như `ScrollTrigger`, `ScrollToPlugin`, `MotionPathPlugin`...), chúng ta cần đăng ký chúng một lần duy nhất. Vì Next.js sử dụng Server-Side Rendering (SSR), việc đăng ký plugin nên được thực hiện an toàn trên môi trường client.

```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Đăng ký plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
```

---

## 2. Quy tắc Viết Code GSAP trong React

### A. Luôn sử dụng `useGSAP` thay cho `useEffect`
Hook `useGSAP` của `@gsap/react` là giải pháp thay thế hoàn hảo cho `useEffect` hoặc `useLayoutEffect`. Nó có các ưu điểm:
1.  **Tự động dọn dẹp (Auto-cleanup):** Tự động gọi `kill()` hoặc `revert()` cho tất cả các animation, timelines và ScrollTriggers được tạo ra bên trong nó khi component unmount. Điều này giúp ngăn ngừa rò rỉ bộ nhớ (memory leaks).
2.  **Hỗ trợ React 18 Strict Mode:** Tránh lỗi animation chạy hai lần hoặc bị giật do Strict Mode mount/unmount component liên tục trong quá trình dev.
3.  **Quản lý Scope (Scope Management):** Bạn có thể truyền một `scope` (thường là một `useRef` trỏ tới phần tử cha) để dễ dàng lựa chọn các phần tử con bên trong bằng selector chuỗi (ví dụ: `".box"`) thay vì phải tạo `useRef` riêng cho từng phần tử con.

#### Ví dụ cơ bản:
```tsx
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function MyComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Chỉ target các phần tử có class .box nằm bên trong containerRef
    gsap.to('.box', { 
      x: 100, 
      stagger: 0.1,
      duration: 1 
    });
  }, { scope: containerRef }); // Định nghĩa scope ở tham số thứ 2

  return (
    <div ref={containerRef} className="container">
      <div className="box">Box 1</div>
      <div className="box">Box 2</div>
      <div className="box">Box 3</div>
    </div>
  );
}
```

---

## 3. Các Nguyên tắc Tối ưu Hiệu năng (Performance Rules)

Khi viết hiệu ứng chuyển động, các Agent và Lập trình viên phải tuân thủ nghiêm ngặt các quy tắc tối ưu phần cứng của trình duyệt:

1.  **Ưu tiên các thuộc tính hỗ trợ GPU (CSS Transforms):**
    *   **Nên dùng:** `x` (transform: translateX), `y` (transform: translateY), `scale`, `rotation`, `skew`.
    *   **Tránh dùng:** `top`, `left`, `width`, `height`, `margin`, `padding`. Việc thay đổi các thuộc tính layout này sẽ kích hoạt quá trình Reflow và Repaint của trình duyệt, gây tụt khung hình (giật, lag).
2.  **Sử dụng thuộc tính `will-change` hợp lý:**
    *   Đối với các phần tử chạy hiệu ứng liên tục hoặc phức tạp, thêm class Tailwind `will-change-transform` hoặc style `will-change: transform` để báo hiệu cho trình duyệt tối ưu phần cứng.
3.  **Tối ưu hóa hình ảnh trước khi animate:**
    *   Đảm bảo hình ảnh chạy hiệu ứng đã được nén tốt, sử dụng các định dạng hiện đại như WebP, AVIF hoặc SVG.

---

## 4. Xử lý Trạng thái Trực quan và Responsive

### A. Ngăn chặn Flash of Unstyled Content (FOUC)
FOUC xảy ra khi trình duyệt hiển thị giao diện ở trạng thái CSS gốc trước khi Javascript/GSAP kịp chạy để ẩn hoặc dịch chuyển phần tử.
*   **Cách giải quyết:** Đặt trạng thái ban đầu bằng CSS (ví dụ: `opacity: 0` hoặc `visibility: hidden`) trong file styles, sau đó dùng GSAP để animate hiển thị lên (`opacity: 1` hoặc `autoAlpha: 1`).
*   **Lưu ý:** Thuộc tính `autoAlpha` của GSAP rất hữu ích vì nó tự động quản lý cả `opacity` và `visibility: hidden/visible`, giúp cải thiện Accessibility cho các thiết bị đọc màn hình.

### B. Responsive Animations (GSAP MatchMedia)
Sử dụng `gsap.matchMedia()` bên trong `useGSAP` để cấu hình các hiệu ứng chuyển động khác nhau tùy thuộc vào kích thước màn hình:

```typescript
useGSAP(() => {
  const mm = gsap.matchMedia();

  // Dành cho màn hình Desktop (từ 1024px trở lên)
  mm.add("(min-width: 1024px)", () => {
    gsap.to(".box", { x: 300 });
  });

  // Dành cho màn hình Mobile/Tablet (dưới 1024px)
  mm.add("(max-width: 1023px)", () => {
    gsap.to(".box", { x: 100 });
  });

  // matchMedia sẽ tự động revert các hiệu ứng khi màn hình thay đổi kích thước
}, { scope: containerRef });
```

---

## 5. Ví dụ Mẫu: ScrollTrigger + Timeline nâng cao

Dưới đây là một ví dụ hoàn chỉnh về cách dựng một Animation Timeline kết hợp ScrollTrigger chạy mượt mà trên Next.js App Router:

```tsx
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function AnimatedSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Tạo Timeline kèm ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%', // Khi đỉnh của container chạm 80% chiều cao viewport
        end: 'bottom 20%', // Khi đáy của container chạm 20% chiều cao viewport
        toggleActions: 'play reverse play reverse', // Tự động phát khi cuộn tới và đảo ngược khi cuộn ngược lại
        // scrub: true, // Nếu muốn hiệu ứng bám sát theo thanh cuộn chuột
      }
    });

    // Định nghĩa các bước chuyển động trong timeline
    tl.from('.title', { 
      opacity: 0, 
      y: 50, 
      duration: 0.6, 
      ease: 'power3.out' 
    })
    .from('.cards', { 
      opacity: 0, 
      y: 30, 
      stagger: 0.2, 
      duration: 0.8, 
      ease: 'power2.out' 
    }, '-=0.3'); // Chạy gối đầu trước khi hiệu ứng trước kết thúc 0.3s

  }, { scope: container });

  return (
    <section ref={container} className="py-20 bg-background text-foreground overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="title text-4xl font-bold mb-8">Tính Năng Nổi Bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="cards p-6 bg-card border rounded-lg">Card 1</div>
          <div className="cards p-6 bg-card border rounded-lg">Card 2</div>
        </div>
      </div>
    </section>
  );
}
```

---

## 6. Mẹo Prompt dành cho AI Agent khi lập trình GSAP

Khi yêu cầu AI phát triển hoặc gỡ lỗi các hiệu ứng chuyển động, hãy đính kèm các chỉ dẫn sau:
*   *“Hãy viết component client-side dùng Next.js App Router.”*
*   *“Sử dụng hook `useGSAP` từ `@gsap/react` để quản lý vòng đời và scope của các animation.”*
*   *“Đảm bảo mọi animation đều được tối ưu GPU (sử dụng translate x/y thay cho left/top) và không gây giật khung hình.”*
*   *“Đăng ký ScrollTrigger (hoặc các plugin GSAP khác) an toàn với môi trường SSR bằng cách kiểm tra điều kiện client-side trước.”*
