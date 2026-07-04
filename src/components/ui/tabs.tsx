'use client';

import * as React from 'react';
import { Tabs } from '@base-ui/react/tabs';

import { cn } from '@/lib/utils';

function TabsRoot({ className, ...props }: Tabs.Root.Props) {
  return (
    <Tabs.Root data-slot="tabs" className={cn('flex flex-col', className)} {...props} />
  );
}

function TabsList({ className, ...props }: Tabs.List.Props) {
  return (
    <Tabs.List
      data-slot="tabs-list"
      className={cn(
        'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: Tabs.Tab.Props) {
  return (
    <Tabs.Tab
      data-slot="tabs-trigger"
      {...props}
      render={(renderProps, state) => (
        <button
          {...renderProps}
          data-state={state.active ? 'active' : 'inactive'}
          className={cn(
            'inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[state=active]:text-foreground',
            className,
          )}
        />
      )}
    />
  );
}

function TabsContent({ className, ...props }: Tabs.Panel.Props) {
  return (
    <Tabs.Panel
      data-slot="tabs-content"
      className={cn(
        'mt-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:transition-none',
        className,
      )}
      {...props}
    />
  );
}

export { TabsRoot as Tabs, TabsContent, TabsList, TabsTrigger };
