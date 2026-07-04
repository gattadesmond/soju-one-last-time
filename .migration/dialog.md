# dialog

2026-07-04, transformation engine (legacy new-york style), CLEAN

## Changed

### `src/components/ui/dialog.tsx`
- `@radix-ui/react-dialog` → `@base-ui/react/dialog`
- `DialogPrimitive.Root` → `Dialog.Root` (Root renders no HTML element, same as Radix)
- `DialogPrimitive.Trigger` → `Dialog.Trigger`
- `DialogPrimitive.Portal` → `Dialog.Portal`
- `DialogPrimitive.Close` → `Dialog.Close`
- `DialogPrimitive.Overlay` → `Dialog.Backdrop`
- `DialogPrimitive.Content` → `Dialog.Popup` (centered modal, no Positioner needed)
- `DialogPrimitive.Title` → `Dialog.Title`
- `DialogPrimitive.Description` → `Dialog.Description`
- Data-attrs: `data-[state=open/closed]:*` → `data-open:/data-closed:` in className strings
- Close button: `data-[state=open]:bg-accent` → `data-popup-open:bg-accent` (trigger marker)
- Types updated to `Dialog.X.Props`

### `src/components/ui/search-bar.tsx` (consumer)
- `DialogTrigger asChild` → `render` prop with a native `<button>` element

### `src/components/ui/search-dialog.tsx` (consumer)
- `onOpenAutoFocus` / `onCloseAutoFocus` → `initialFocus` / `finalFocus` (Base UI props on Popup)
- `DialogClose asChild` → `render` prop
- data-[state=*] animation classes updated to `data-open:/data-closed:`

Leftover scan: clean

## Left alone

- `drawer.tsx` — built on vaul, intentionally untouched (hard rule)

## Behavior changes

- **Focus management**: Radix `onOpenAutoFocus`/`onCloseAutoFocus` replaced with `initialFocus` (ref → focus that element) and `finalFocus` (false → don't return focus). Functionally identical.
- **asChild → render**: All `asChild` patterns replaced with `render` prop.

## Verify by hand

- [ ] Dialog opens and overlays appear
- [ ] Click outside / press Escape — dialog closes
- [ ] Search bar: clicking the bar opens search dialog
- [ ] Search dialog: input autofocused on open
- [ ] Esc button in search dialog closes it
- [ ] Focus returns correctly after close
