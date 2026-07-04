# tabs

2026-07-04, transformation engine (legacy new-york style), CLEAN

## Changed

### `src/components/ui/tabs.tsx`
- `@radix-ui/react-tabs` → `@base-ui/react/tabs`
- `TabsPrimitive.Root` → `Tabs.Root`, `TabsPrimitive.List` → `Tabs.List`, `TabsPrimitive.Trigger` → `Tabs.Tab`, `TabsPrimitive.Content` → `Tabs.Panel`
- Types updated to `Tabs.Root.Props`, `Tabs.List.Props`, `Tabs.Tab.Props`, `Tabs.Panel.Props`
- Data-attr: `data-[state=active]:text-foreground` → `data-selected:text-foreground`
- Added `aria-disabled:pointer-events-none aria-disabled:opacity-50` alongside `disabled:*` variants
- Exported as `Tabs`, `TabsList`, `TabsTrigger` (backwards compat), `TabsContent`

Leftover scan: clean

## Left alone

N/A

## Behavior changes

- **Tab activation model**: Radix uses automatic activation by default (tab focuses = panel shows). Base UI also uses automatic activation. No change.
- **data-selected** replaces **data-[state=active]**. If any consumers use custom CSS targeting `data-[state=active]`, they must update to `data-selected`.

## Verify by hand

- [ ] Click tabs — correct panel shows, trigger styled as active
- [ ] Keyboard: Arrow keys navigate between tabs (if loopFocus was used, note Base UI removed roving tabindex for tabs)
