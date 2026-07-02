import { BOOK_A_CALL_URL, GITHUB_URL } from '@/configs/website-config';

import type { IFooterMenuSection, IMenuSocialItem } from '@/types/common';

export const MENUS = {
  header: [
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Video', href: '/video' },
  ],
  footer: {
    description: 'Build better APIs faster',
    copyright: '© 2026 Unkey Inc. All rights reserved.',
    main: [
      {
        title: 'Company',
        items: [
          { label: 'About', href: '/about' },
          { label: 'Source Code', href: GITHUB_URL },
          { label: 'Status Page', href: 'https://status.unkey.com' },
          { label: 'Roadmap', href: 'https://feedback.unkey.com/roadmap' },
        ],
      },
      {
        title: 'Resources',
        items: [
          { label: 'Blog', href: '/blog' },
          { label: 'Changelog', href: '/changelog' },
          { label: 'Docs', href: 'https://unkey.com/docs/introduction' },
          { label: 'Glossary', href: '/glossary' },
          { label: 'Feature Request', href: 'https://feedback.unkey.com/' },
          // { label: 'Case Studies', href: '/case-studies' },
        ],
      },
      {
        title: 'Connect',
        items: [
          { label: 'X (Twitter)', href: 'https://x.com/unkeydev' },
          { label: 'Discord', href: 'https://unkey.com/discord' },
          { label: 'Book a Call', href: BOOK_A_CALL_URL },
        ],
      },
      {
        title: 'Legal',
        items: [
          { label: 'Terms of Service', href: '/policies/terms' },
          { label: 'Privacy Policy', href: '/policies/privacy' },
        ],
      },
    ] satisfies IFooterMenuSection[],
    social: [
      {
        href: 'https://x.com/unkeydev',
        label: 'Follow us on X',
        icon: 'twitter',
      },
      {
        href: GITHUB_URL,
        label: 'Follow us on GitHub',
        icon: 'github',
      },
      {
        href: 'https://unkey.com/discord',
        label: 'Join our Discord',
        icon: 'discord',
      },
    ] satisfies IMenuSocialItem[],
  },
};
