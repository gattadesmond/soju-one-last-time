# select

2026-07-04, transformation engine (legacy new-york style), CLEAN

## Changed

### `src/components/ui/select.tsx`
- `@radix-ui/react-select` → `@base-ui/react/select`
- Structural change: `Portal > Content` → `Portal > Positioner > Popup`, `Viewport` → `List`
- `Select.ScrollUpButton` / `ScrollDownButton` → `Select.ScrollUpArrow` / `Select.ScrollDownArrow`
- `Select.Label` → `Select.GroupLabel` (Base UI's Label labels the trigger, not groups)
- CSS vars: `--radix-select-trigger-width` → `--anchor-width`, `--radix-select-content-available-height` → `--available-height`
- `position="popper"/"item-aligned"` prop mapped to `alignItemWithTrigger` boolean on Positioner
- `Select.Icon` now uses `render` prop instead of children (Base UI pattern)
- `onValueChange` wrapper: passes `value` (non-null) for backwards compat with Radix consumers using `setState<string>`

### Consumers updated
- `src/components/pages/pricing/calculator.tsx` — `onValueChange={setMemory}` still works
- `src/components/pages/pricing/hero-pricing/pricing-card.tsx` — `onValueChange={setTier}` still works

Leftover scan: clean

## Left alone

N/A

## Behavior changes

- **Default alignment**: Radix `align` defaults to `"start"`; Base UI Positioner defaults to `'center'`. For `position="popper"`, pass `align="start"` explicitly if you need start-aligned dropdowns.
- **Item type widening**: Base UI Select item `value` accepts `any` (not just `string`). No breakage since consumers use strings.
- **Null value**: Deselecting an item would pass `null` to `onValueChange`. The wrapper silently ignores null — same as Radix (which had no deselect).

## Verify by hand

- [ ] Select opens dropdown on click
- [ ] Item click selects and closes dropdown
- [ ] Selected item shows check indicator
- [ ] `position="popper"` variant: dropdown appears below trigger with correct width
- [ ] Scroll arrows appear when list overflows
- [ ] Keyboard navigation: ArrowDown/Up navigates items, Enter selects
