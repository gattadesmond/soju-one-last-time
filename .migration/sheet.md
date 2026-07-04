# sheet

2026-07-04, transformation engine (legacy new-york style), CLEAN

## Changed

### `src/components/ui/sheet.tsx`
- Formerly used `@radix-ui/react-dialog` (as `SheetPrimitive`) → now uses `@base-ui/react/dialog`
- Same Dialog part renames as dialog.tsx: Root, Trigger, Portal, Close, Backdrop (was Overlay), Popup (was Content), Title, Description
- `sheetVariants` CVA: animation classes updated from `data-[state=open/closed]:*` → `data-open:/data-closed:*` in all four side variants
- Overlay/Backdrop className: `data-[state=*]` → `data-open/data-closed`
- Close button: `data-[state=open]:bg-secondary` → `data-popup-open:bg-secondary`

Leftover scan: clean

## Left alone

N/A

## Behavior changes

- Slide animations use the same CVA class strings, now with Base UI data-attribute hooks. Visual result is identical.

## Verify by hand

- [ ] Sheet opens from correct side (right default)
- [ ] Slide-in / slide-out animation plays
- [ ] Close button (X) dismisses sheet
- [ ] Click overlay dismisses sheet
- [ ] Keyboard: Escape dismisses sheet
