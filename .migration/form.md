# form

2026-07-04, transformation engine (legacy new-york style), CLEAN

## Changed

### `src/components/ui/form.tsx`
- `@radix-ui/react-label` (`LabelPrimitive`) → native HTML `<label>` element
- `@radix-ui/react-slot` (`Slot`) → `@base-ui/react/use-render` (`useRender`) + `@base-ui/react/merge-props` (`mergeProps`)
- `FormLabel`: was `LabelPrimitive.Root`, now is a plain `<label>` with `data-error` and `htmlFor` props
- `FormControl`: was a `Slot` that merged refs; now uses `useRender` with `defaultTagName="div"` and `render` prop for polymorphism
- The public API is unchanged for all consumers: `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`

Leftover scan: clean

## Left alone

N/A

## Behavior changes

- `FormLabel` no longer automatically shows an error color via `data-[error=true]:text-destructive` (since that was a Label primitive affordance). If the design requires error color on label, add a CSS selector `[data-error=true] { color: hsl(var(--destructive)) }` or use a Tailwind class `data-[error=true]:text-destructive`.
- `FormControl` `asChild` prop is replaced by `render`. Consumers that previously passed `asChild` to `FormControl` should use `render={<input />}` or similar.

## Verify by hand

- [ ] Form fields render labels correctly
- [ ] Error state: label `data-error` set, error message shows, input `aria-invalid` set
- [ ] Keyboard accessibility: label `htmlFor` connects to input
