# Accessibility Review

Reviewed June 2026 against WCAG 2.1 Level AA, which is the technical standard
referenced by both the ADA (US) and the AODA (Ontario). Verified by manual
code review and browser testing of the production build.

## Fixes applied in this review

### Perceivable

- **Contrast (1.4.3, 1.4.11):** Inactive navigation links raised from
  `gray-600` (≈2.7:1 on black — failed even the 3:1 large-text minimum) to
  `gray-400` (≈7:1). Project metadata labels and helper text raised from
  `gray-500` (≈4.3:1) to `gray-400`.
- **Text alternatives (1.1.1):** All images carry descriptive alt text,
  including the new AI Safety Data Vis chart screenshots. Decorative
  elements (window traffic-light dots, marquee repeats, animated letter
  spans, arrow glyphs) are hidden with `aria-hidden`.
- **Info and relationships (1.3.1):** Site title no longer renders one
  heading element per letter — each page now has exactly one `h1`, with the
  animated letters marked decorative and a screen-reader-readable copy of
  the text. Project metadata (year / role / client / tech / disciplines /
  credit) converted from misused `h2` headings to a description list
  (`dl`/`dt`/`dd`). Footer contact region gained an `sr-only` heading.

### Operable

- **Bypass blocks (2.4.1):** Skip-to-main-content link added; it moves focus
  programmatically because the site uses hash routing.
- **Keyboard (2.1.1):** Image zoom/animation toggles in project pages were
  click-only `<img>` handlers — now real `<button>`s with `aria-pressed`.
  Fullscreen menu closes on Escape.
- **Pause, stop, hide (2.2.2) / Animation (2.3.3):** Global
  `prefers-reduced-motion` support: `MotionConfig reducedMotion="user"` for
  all motion-library animations, a CSS override for keyframe animations
  (marquee, glitch, flicker, grain, typewriter), and the project image
  carousel stops auto-rotating for reduced-motion users.
- **Focus visible (2.4.7):** Global `:focus-visible` outline; filter buttons
  and password form have explicit focus styles.
- **Page titled (2.4.2):** Descriptive `<title>` and meta description added.

### Understandable / Robust

- **Name, role, value (4.1.2):** Menu toggle exposes `aria-expanded` and
  `aria-controls`; active nav link exposes `aria-current="page"`; work
  filters use `aria-pressed`; carousel is a labelled `group` with
  `aria-roledescription="carousel"`.
- **Status messages (4.1.3):** Work-page filter results and carousel slide
  changes are announced via polite live regions. Password-gate errors use
  `role="alert"`, are tied to the input with `aria-describedby`, and set
  `aria-invalid`.
- **Labels (3.3.2):** Password input has a visible `<label>`; external links
  announce "(opens in new tab)".
- **Language (3.1.1):** `<html lang="en">` (already present, verified).

## Known limitations / recommendations

- Embedded project demos (iframes) are external sites; their internal
  accessibility is reviewed separately per project.
- The fullscreen menu does not trap focus (Escape and overlay-close are
  supported). Consider a focus trap if the menu gains more items.
- Run an automated audit (axe DevTools / Lighthouse) after each significant
  visual change; this review was manual.
