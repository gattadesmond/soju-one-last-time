'use client';

import * as React from 'react';
import { Tooltip } from '@base-ui/react/tooltip';

import { cn } from '@/lib/utils';

interface ITooltipContextValue {
  canToggleOnClick: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TooltipContext = React.createContext<ITooltipContextValue | null>(null);

function useIsCoarsePointer() {
  const [isCoarse, setIsCoarse] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(pointer: coarse)');
    const update = () => setIsCoarse(mediaQuery.matches);

    update();
    mediaQuery.addEventListener?.('change', update);

    return () => {
      mediaQuery.removeEventListener?.('change', update);
    };
  }, []);

  return isCoarse;
}

function TooltipProvider({
  delay = 0,
  ...props
}: Tooltip.Provider.Props) {
  return (
    <Tooltip.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  );
}

function TooltipRoot({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  ...props
}: Tooltip.Root.Props) {
  const isCoarsePointer = useIsCoarsePointer();
  const [open, setOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const canToggleOnClick = isCoarsePointer && !isControlled;

  const rootProps = canToggleOnClick
    ? { open, onOpenChange: setOpen as Tooltip.Root.Props['onOpenChange'] }
    : { open: controlledOpen, onOpenChange: controlledOnOpenChange };

  return (
    <TooltipProvider>
      <TooltipContext.Provider value={{ canToggleOnClick, setOpen }}>
        <Tooltip.Root data-slot="tooltip" {...rootProps} {...props} />
      </TooltipContext.Provider>
    </TooltipProvider>
  );
}

function TooltipTrigger({
  onClick,
  ...props
}: Tooltip.Trigger.Props) {
  const tooltipContext = React.useContext(TooltipContext);

  return (
    <Tooltip.Trigger
      data-slot="tooltip-trigger"
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented || !tooltipContext?.canToggleOnClick) {
          return;
        }

        tooltipContext.setOpen((current) => !current);
      }}
      {...props}
    />
  );
}

function TooltipContent({
  className,
  sideOffset = 4,
  children,
  side,
  align,
  alignOffset,
  ...props
}: Tooltip.Popup.Props & Pick<Tooltip.Positioner.Props, 'side' | 'align' | 'alignOffset' | 'sideOffset'>) {
  return (
    <Tooltip.Portal>
      <Tooltip.Positioner sideOffset={sideOffset} side={side} align={align} alignOffset={alignOffset}>
        <Tooltip.Popup
          data-slot="tooltip-content"
          className={cn(
            'z-50 inline-block w-max max-w-72 origin-(--transform-origin) animate-in bg-primary px-3 py-1.5 text-xs break-words whitespace-normal text-primary-foreground fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 lg:max-w-none',
            className,
          )}
          {...props}
        >
          {children}
        </Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  );
}

export { TooltipRoot as Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
