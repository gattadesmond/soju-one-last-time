'use client';

import * as React from 'react';
import { Checkbox } from '@base-ui/react/checkbox';
import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

function CheckboxRoot({ className, ...props }: Checkbox.Root.Props) {
  return (
    <Checkbox.Root
      data-slot="checkbox"
      className={cn(
        'peer size-4 shrink-0 rounded-sm border border-foreground shadow-xs focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-foreground data-checked:text-secondary',
        className,
      )}
      {...props}
    >
      <Checkbox.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-4" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
}

export { CheckboxRoot as Checkbox };
