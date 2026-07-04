# accordion

2026-07-04, transformation engine (legacy new-york style, no golden pair), CLEAN

## Changed

### `src/components/ui/accordion.tsx`
- `@radix-ui/react-accordion` → `@base-ui/react/accordion`
- `AccordionPrimitive.Root` → `Accordion.Root`, `Item` → `Accordion.Item`, `Header` → `Accordion.Header`, `Trigger` → `Accordion.Trigger`, `Content` → `Accordion.Panel`
- Types: `React.ComponentProps<typeof AccordionPrimitive.X>` → `Accordion.X.Props`
- Trigger data-attr: `data-[state=open]>svg` → `data-[panel-open]>svg`
- Custom icon toggle: `group-data-[state=open/closed]` → `group-data-open / group-data-closed`
- Panel animation: `data-[state=open/closed]:animate-*` → `data-open:/data-closed:` (same keyframe names)

### `src/styles/globals.css`
- `--radix-accordion-content-height` → `--accordion-panel-height` in both keyframes (lines 140, 149)

### `src/components/content/accordion.tsx` (consumer)
- Removed `type="single"` and `collapsible` props (no Base UI equivalent; single-without-multiple is always collapsible)
- `defaultValue` wrapped in array: `defaultValue={defaultValue !== undefined ? [defaultValue] : undefined}`
- Trigger className: `data-[state=open]` → `data-[panel-open]`; `group-data-[state=open]` → `group-data-[panel-open]`

### `src/components/pages/glossary/glossary-faq.tsx` (consumer)
- Removed `type="single"` and `collapsible`
- `defaultValue="item-0"` → `defaultValue={['item-0']}`

### `src/components/pages/glossary/glossary-takeaways.tsx` (consumer)
- Removed `type="single"` and `collapsible`
- `defaultValue` wrapped in array

### `src/components/pages/pricing/faq/faq--column-narrow.tsx` (consumer)
- Removed `type="single"` and `collapsible`

Leftover scan: `grep -n "@radix-ui|radix-ui" src/components/ui/accordion.tsx` → clean

## Left alone

N/A

## Behavior changes

- **Base UI single-mode is always collapsible.** In Radix, `type="single"` without `collapsible` prevents closing the last item. Base UI always allows closing. None of the consumers relied on that behavior (no controlled `value` + close guard), so this is cosmetically transparent.
- **`onValueChange` now receives `Value[]` (array), not `string`.** The wrapper absorbs this — consumers receive a single string via the backwards-compat shim. If a consumer needs to capture which item is open, it must use `onValueChange` with the array directly.

## Verify by hand

- [ ] Click an accordion item — it opens and the ChevronDown rotates
- [ ] Click again — it closes with the `accordion-up` animation
- [ ] Click a different item — it opens and the previous closes (single mode)
- [ ] Content/accordion (docs pages): custom arrow icon rotates on open
- [ ] Keyboard: Tab to trigger, Enter/Space toggles
