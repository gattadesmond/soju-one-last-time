# checkbox

2026-07-04, transformation engine (legacy new-york style), CLEAN

## Changed

### `src/components/ui/checkbox.tsx`
- `@radix-ui/react-checkbox` → `@base-ui/react/checkbox`
- `CheckboxPrimitive.Root` / `CheckboxPrimitive.Indicator` → `Checkbox.Root` / `Checkbox.Indicator`
- Types: `React.ComponentProps<typeof CheckboxPrimitive.Root>` → `Checkbox.Root.Props`
- Data-attr: `data-[state=checked]:bg-foreground data-[state=checked]:text-secondary` → `data-checked:bg-foreground data-checked:text-secondary`

Leftover scan: clean

## Left alone

N/A

## Behavior changes

None — direct 1:1 mapping.

## Verify by hand

- [ ] Click checkbox — it checks (filled bg) and unchecks
- [ ] Keyboard: Tab focus shows ring, Space toggles
- [ ] Disabled state: pointer-events-none, opacity-50
