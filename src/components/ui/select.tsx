'use client';

import * as React from 'react';
import { Select } from '@base-ui/react/select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '@/lib/utils';

type SelectRootProps<Value = string> = Omit<Select.Root.Props<Value>, 'onValueChange'> & {
  onValueChange?: ((value: Value) => void) | Select.Root.Props<Value>['onValueChange'];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SelectRoot<Value = any>({ onValueChange, ...props }: SelectRootProps<Value>) {
  const handleValueChange: Select.Root.Props<Value>['onValueChange'] = onValueChange
    ? (value, eventDetails) => {
        if (value !== null) {
          // Call with just value for backwards compat with Radix consumers
          (onValueChange as (v: Value) => void)(value);
        } else if ((onValueChange as Select.Root.Props<Value>['onValueChange'])?.length === 2) {
          (onValueChange as NonNullable<Select.Root.Props<Value>['onValueChange']>)(value, eventDetails);
        }
      }
    : undefined;
  return <Select.Root data-slot="select" onValueChange={handleValueChange} {...props} />;
}

function SelectGroup({ ...props }: Select.Group.Props) {
  return <Select.Group data-slot="select-group" {...props} />;
}

function SelectValue({ ...props }: Select.Value.Props) {
  return <Select.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  children,
  ...props
}: Select.Trigger.Props) {
  return (
    <Select.Trigger
      data-slot="select-trigger"
      className={cn(
        'flex h-11 w-full min-w-0 items-center justify-between gap-2 overflow-hidden rounded-md border border-border bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:border-accent-foreground focus:outline-hidden focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:min-w-0 [&>span]:truncate',
        className,
      )}
      {...props}
    >
      {children}
      <Select.Icon render={<ChevronDown className="-mr-1 size-5 opacity-50" />} />
    </Select.Trigger>
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: Select.ScrollUpArrow.Props) {
  return (
    <Select.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ChevronUp className="size-4" />
    </Select.ScrollUpArrow>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: Select.ScrollDownArrow.Props) {
  return (
    <Select.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ChevronDown className="size-4" />
    </Select.ScrollDownArrow>
  );
}

function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: Select.Popup.Props & { position?: 'popper' | 'item-aligned' }) {
  // Radix position="popper" -> alignItemWithTrigger={false}
  // Radix position="item-aligned" (default) -> alignItemWithTrigger={true} (default)
  const alignItemWithTrigger = position !== 'popper';

  return (
    <Select.Portal>
      <Select.Positioner
        alignItemWithTrigger={alignItemWithTrigger}
        className="z-50"
      >
        <Select.Popup
          data-slot="select-content"
          className={cn(
            'relative max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
            !alignItemWithTrigger &&
              'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
            className,
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <Select.List
            className={cn(
              'p-1',
              !alignItemWithTrigger && 'h-(--available-height) w-full min-w-(--anchor-width)',
            )}
          >
            {children}
          </Select.List>
          <SelectScrollDownButton />
        </Select.Popup>
      </Select.Positioner>
    </Select.Portal>
  );
}

function SelectLabel({ className, ...props }: Select.GroupLabel.Props) {
  return (
    <Select.GroupLabel
      data-slot="select-label"
      className={cn('py-1.5 pr-2 pl-8 text-sm font-semibold tracking-tight', className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: Select.Item.Props) {
  return (
    <Select.Item
      data-slot="select-item"
      className={cn(
        'relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <Select.ItemIndicator>
          <Check className="size-4" />
        </Select.ItemIndicator>
      </span>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: Select.Separator.Props) {
  return (
    <Select.Separator
      data-slot="select-separator"
      className={cn('pointer-events-none -mx-1 my-1 h-px bg-muted', className)}
      {...props}
    />
  );
}

export {
  SelectRoot as Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
