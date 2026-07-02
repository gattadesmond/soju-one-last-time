'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/components/ui/link';

export default function HeaderActions() {
  const [onLightSection, setOnLightSection] = useState(false);

  useEffect(() => {
    const lightSections = document.querySelectorAll<HTMLElement>('[data-header-theme="light"]');
    if (lightSections.length === 0) return;

    const headerHeight = 56; // ~h-11 (44px) + pt-2.5 (10px)

    const observer = new IntersectionObserver(
      (entries) => {
        const anyIntersecting = entries.some((entry) => entry.isIntersecting);
        setOnLightSection(anyIntersecting);
      },
      {
        rootMargin: `-${headerHeight}px 0px -${window.innerHeight - headerHeight - 1}px 0px`,
        threshold: 0,
      },
    );

    lightSections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Actions" className="hidden items-center lg:flex">
      <Link
        href="/about"
        variant={onLightSection ? 'primaryBlack' : 'primary'}
        size="small"
        className="transition-colors duration-300"
      >
        Xem thêm
      </Link>
    </nav>
  );
}
