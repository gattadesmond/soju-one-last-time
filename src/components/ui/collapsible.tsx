'use client';

import type { ComponentProps } from 'react';
import { Collapsible } from '@base-ui/react/collapsible';

function CollapsibleRoot({ ...props }: ComponentProps<typeof Collapsible.Root>) {
  return <Collapsible.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({ ...props }: ComponentProps<typeof Collapsible.Trigger>) {
  return <Collapsible.Trigger data-slot="collapsible-trigger" {...props} />;
}

function CollapsibleContent({ ...props }: ComponentProps<typeof Collapsible.Panel>) {
  return <Collapsible.Panel data-slot="collapsible-content" {...props} />;
}

export { CollapsibleRoot as Collapsible, CollapsibleTrigger, CollapsibleContent };
