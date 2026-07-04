import * as React from 'react';
import type { Route } from 'next';
import NextLink from 'next/link';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const linkVariants = cva(
  'inline-flex items-center justify-center h-11 gap-1 font-medium leading-none tracking-tight transition duration-200 ease-in-out',
  {
    variants: {
      variant: {
        primary: 'bg-foreground text-background hover:bg-gray-90',
        /*  border-transparent - To avoid layout shifting when changing the button style in the navbar. */
        primaryBlack: 'bg-background border border-transparent text-foreground hover:bg-gray-12',
        secondary: 'border bg-transparent border-foreground text-foreground hover:bg-gray-12',
        muted: 'text-muted-foreground hover:text-secondary-foreground/80',
        foreground: 'text-foreground hover:text-foreground/80',
        ghost: '',
      },
      size: {
        small: 'px-6 text-sm [&_svg]:size-3.5',
        medium: 'px-5 text-base',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  },
);

export interface LinkProps<T extends string = string>
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    VariantProps<typeof linkVariants> {
  render?: React.ReactElement | ((props: React.ComponentProps<'a'>, state: object) => React.ReactElement);
  href: string | URL | Route<T>;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps<string>>(
  ({ className, variant, size, render, href, ...props }, ref) => {
    const classes = cn(linkVariants({ variant, size, className }));
    const isInternalLink = typeof href === 'string' && href.startsWith('/');

    if (render) {
      return useRender({
        defaultTagName: 'a' as const,
        render,
        props: mergeProps(
          { 'data-slot': 'link', className: classes, href: href.toString() } as React.ComponentProps<'a'>,
          props as React.ComponentProps<'a'>,
        ),
      });
    }

    if (isInternalLink) {
      return (
        <NextLink
          className={classes}
          href={href}
          ref={ref}
          {...props}
        />
      );
    }

    return (
      <a
        className={classes}
        href={href.toString()}
        ref={ref}
        {...props}
      />
    );
  },
);
Link.displayName = 'Link';

export { Link, linkVariants };
