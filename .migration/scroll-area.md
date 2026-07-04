# scroll-area

2026-07-04, transformation engine (legacy new-york style), CLEAN

## Changed

### `src/components/ui/scroll-area.tsx`
- `@radix-ui/react-scroll-area` → `@base-ui/react/scroll-area`
- `ScrollAreaPrimitive.Root` → `ScrollArea.Root`
- `ScrollAreaPrimitive.Viewport` → `ScrollArea.Viewport`
- `ScrollAreaPrimitive.ScrollAreaScrollbar` → `ScrollArea.Scrollbar`
- `ScrollAreaPrimitive.ScrollAreaThumb` → `ScrollArea.Thumb`
- `ScrollAreaPrimitive.Corner` removed (no Base UI equivalent)
- Types updated to `ScrollArea.Root.Props`, `ScrollArea.Scrollbar.Props`

Leftover scan: clean

## Left alone

N/A

## Behavior changes

- **Corner removed.** In Radix, `ScrollArea.Corner` fills the corner between vertical and horizontal scrollbars. Base UI has no equivalent part. This is visually minor and rarely noticeable.

## Verify by hand

- [ ] Scrollable content shows scrollbar on hover
- [ ] Both vertical and horizontal orientations work
