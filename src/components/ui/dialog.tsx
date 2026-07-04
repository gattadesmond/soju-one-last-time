'use client';

import * as React from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

function DialogRoot({ ...props }: Dialog.Root.Props) {
  return <Dialog.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: Dialog.Trigger.Props) {
  return <Dialog.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: Dialog.Portal.Props) {
  return <Dialog.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: Dialog.Close.Props) {
  return <Dialog.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: Dialog.Backdrop.Props) {
  return (
    <Dialog.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        'fixed inset-0 z-50 bg-background/90 data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0',
        className,
      )}
      {...props}
    />
  );
}

const hasDialogCloseRecursive = (children: React.ReactNode): boolean => {
  return React.Children.toArray(children).some((child) => {
    if (!React.isValidElement(child)) {
      return false;
    }

    if (child.type === DialogClose) {
      return true;
    }

    if ((child.props as React.PropsWithChildren).children) {
      return hasDialogCloseRecursive((child.props as React.PropsWithChildren).children);
    }

    return false;
  });
};

function DialogContent({
  className,
  children,
  ...props
}: Dialog.Popup.Props) {
  const hasCustomClose = hasDialogCloseRecursive(children);

  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <Dialog.Popup
        data-slot="dialog-content"
        className={cn(
          'fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-popover p-6 shadow-lg duration-200 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
          className,
        )}
        {...props}
      >
        {children}
        {!hasCustomClose && (
          <DialogClose className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus-visible:opacity-100 disabled:pointer-events-none data-popup-open:bg-accent data-popup-open:text-muted-foreground">
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        )}
      </Dialog.Popup>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: Dialog.Title.Props) {
  return (
    <Dialog.Title
      data-slot="dialog-title"
      className={cn('text-lg leading-none font-semibold tracking-tight', className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: Dialog.Description.Props) {
  return (
    <Dialog.Description
      data-slot="dialog-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export {
  DialogRoot as Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
