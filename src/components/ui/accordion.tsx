'use client';

import * as React from 'react';
import { Accordion } from '@base-ui/react/accordion';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

function AccordionRoot({ ...props }: Accordion.Root.Props) {
  return <Accordion.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: Accordion.Item.Props) {
  return (
    <Accordion.Item
      data-slot="accordion-item"
      className={cn('border-b last:border-b-0', className)}
      {...props}
    />
  );
}

interface IAccordionTriggerProps extends Accordion.Trigger.Props {
  iconClosed?: React.ReactNode;
  iconOpen?: React.ReactNode;
}

function AccordionTrigger({
  className,
  children,
  iconClosed,
  iconOpen,
  ...props
}: IAccordionTriggerProps) {
  const hasCustomIcons = iconClosed != null || iconOpen != null;
  const defaultIcon = (
    <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
  );

  return (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group flex flex-1 items-center justify-between rounded py-4 text-left text-sm font-medium transition-all hover:underline',
          !hasCustomIcons && '[&[data-panel-open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        {hasCustomIcons ? (
          <span className="relative flex size-6 shrink-0 items-center justify-center text-foreground">
            <span className="group-data-closed:block group-data-open:hidden">
              {iconClosed}
            </span>
            <span className="absolute inset-0 flex items-center justify-center group-data-closed:hidden group-data-open:block">
              {iconOpen}
            </span>
          </span>
        ) : (
          defaultIcon
        )}
      </Accordion.Trigger>
    </Accordion.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: Accordion.Panel.Props) {
  return (
    <Accordion.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-closed:animate-accordion-up data-open:animate-accordion-down"
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </Accordion.Panel>
  );
}

export { AccordionRoot as Accordion, AccordionItem, AccordionTrigger, AccordionContent };
