# collapsible

2026-07-04, transformation engine (legacy new-york style), CLEAN

## Changed

### `src/components/ui/collapsible.tsx`
- `@radix-ui/react-collapsible` → `@base-ui/react/collapsible`
- `CollapsiblePrimitive.Root` → `Collapsible.Root`, `CollapsibleTrigger` → `Collapsible.Trigger`, `CollapsibleContent` → `Collapsible.Panel`
- Types: `ComponentProps<typeof CollapsiblePrimitive.X>` → `ComponentProps<typeof Collapsible.X>`
- Exported names unchanged: `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`

Leftover scan: clean

## Left alone

N/A

## Behavior changes

None.

## Verify by hand

- [ ] Click trigger — panel shows/hides smoothly
- [ ] Keyboard navigation works
