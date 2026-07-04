# link + snap-slider

2026-07-04, transformation engine (legacy new-york style), CLEAN

## Changed

### `src/components/ui/link.tsx`
- `@radix-ui/react-slot` (`Slot`) removed
- `asChild` prop replaced with `render` prop (accepts `ReactElement | ((props, state) => ReactElement)`)
- When `render` provided, uses `useRender` + `mergeProps` from `@base-ui/react`
- When `render` not provided, falls back to `NextLink` (internal routes) or `<a>` (external)

### `src/components/ui/snap-slider.tsx`
- `@radix-ui/react-slot` (`Slot`) removed
- `SnapSliderItem`: `asChild` prop replaced with `render` prop
- Uses `useRender` + `mergeProps` from `@base-ui/react`

### `src/components/pages/pricing/hero-pricing/pricing-card.tsx` (consumer)
- `Button asChild > Link` pattern replaced with direct `Link` + `buttonVariants()` class merge
- `TooltipTrigger asChild > span` → `TooltipTrigger render={<span />}>`

Leftover scan: clean

## Left alone

N/A

## Behavior changes

- **Link**: `asChild` prop is no longer available. Use `render={<your-element />}` instead.
- **SnapSliderItem**: `asChild` prop is no longer available. Use `render={<your-element />}` instead.
- **pricing-card**: Button that was `asChild > Link` is now a plain `Link` with button styles. Same visual output, different DOM element wrapping.

## Verify by hand

- [ ] Internal links navigate correctly
- [ ] External links open in browser (or new tab if target="_blank")
- [ ] SnapSlider items with render prop render correctly
- [ ] Pricing card link button has correct styles and navigates
