# separator

2026-07-04, transformation engine (legacy new-york style), CLEAN

## Changed

### `src/components/ui/separator.tsx`
- `@radix-ui/react-separator` → `@base-ui/react/separator`
- `SeparatorPrimitive.Root` (namespace) → callable `Separator` primitive
- Dropped `decorative` prop (not supported by Base UI; accessibility is handled differently)
- `data-orientation` still emitted by Base UI, so horizontal/vertical CSS classes work identically

Leftover scan: clean

## Left alone

N/A

## Behavior changes

- `decorative` prop dropped. Base UI Separator always renders with `role="separator"` and appropriate aria attributes. If you need a purely decorative line without ARIA semantics, use a plain `<div>` with `aria-hidden`.

## Verify by hand

- [ ] Horizontal separator renders as 1px full-width line
- [ ] Vertical separator renders as 1px full-height line
