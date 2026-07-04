# tooltip

2026-07-04, transformation engine (legacy new-york style), CLEAN

## Changed

### `src/components/ui/tooltip.tsx`
- `@radix-ui/react-tooltip` → `@base-ui/react/tooltip`
- `TooltipPrimitive.Provider` → `Tooltip.Provider` (prop: `delayDuration` → `delay`)
- `TooltipPrimitive.Root` → `Tooltip.Root`
- `TooltipPrimitive.Trigger` → `Tooltip.Trigger`
- `TooltipPrimitive.Portal > Content` → `Tooltip.Portal > Tooltip.Positioner > Tooltip.Popup`
- `sideOffset` moved from Content to Positioner
- CSS var: `--radix-tooltip-content-transform-origin` → `--transform-origin`
- Data-attrs: `data-[state=open/closed]:*` → `data-open:/data-closed:` (class names preserved)
- Custom click-toggle for coarse pointers preserved (context pattern unchanged)
- `TooltipContent` now accepts `side`, `align`, `alignOffset` via `Pick<Tooltip.Positioner.Props, ...>` and forwards to Positioner

### Consumer call sites
- `TooltipTrigger asChild` → `render` prop in all consumers:
  - `src/components/pages/pricing/calculator.tsx`
  - `src/components/pages/pricing/comparison-table/features-column.tsx`
  - `src/components/pages/pricing/hero-pricing/pricing-card.tsx`

Leftover scan: clean

## Left alone

N/A

## Behavior changes

- **Default delay**: `delayDuration={0}` was explicit in Provider. Now `delay={0}` — same value. No change.
- **asChild → render**: `TooltipTrigger asChild` pattern replaced with `render={<elem />}`. Base UI merges props onto the rendered element.

## Verify by hand

- [ ] Hover over tooltip trigger — popup appears after ~0ms delay
- [ ] On touch device: tap trigger — tooltip toggles
- [ ] `side="top"` placement on calculator tooltips renders above
- [ ] Tooltip dismisses on press outside / focus away
