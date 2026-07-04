'use client';

import * as React from 'react';
import { ScrollArea } from '@base-ui/react/scroll-area';

import { cn } from '@/lib/utils';

function ScrollAreaRoot({
  className,
  children,
  ...props
}: ScrollArea.Root.Props) {
  return (
    <ScrollArea.Root
      data-slot="scroll-area"
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      <ScrollArea.Viewport
        className="size-full rounded-[inherit]"
        data-slot="scroll-area-viewport"
      >
        {children}
      </ScrollArea.Viewport>
      <ScrollBar />
    </ScrollArea.Root>
  );
}

function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: ScrollArea.Scrollbar.Props) {
  return (
    <ScrollArea.Scrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        'flex touch-none transition-colors select-none',
        orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-px',
        orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-px',
        className,
      )}
      {...props}
    >
      <ScrollArea.Thumb
        className="relative flex-1 rounded-full bg-border"
        data-slot="scroll-area-thumb"
      />
    </ScrollArea.Scrollbar>
  );
}

export { ScrollAreaRoot as ScrollArea, ScrollBar };
