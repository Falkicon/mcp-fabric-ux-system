---
id: components_rating-display
title: Rating Display
description: Displays a non-interactive visual representation of a rating value.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/rating-display
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Rating Display (`<fabric-rating-display>`)

<!-- BEGIN-SECTION: Rating Display Overview -->
Displays a non-interactive visual representation of a rating value, typically using icons like stars.
<!-- END-SECTION: Rating Display Overview -->

<!-- BEGIN-SECTION: Rating Display Usage -->
## Rating Display Usage (fabric-rating-display)

**Importing:**

```javascript
import '@fabric-msft/web-components/rating-display/define.js';

// Optional: Import the types for Typescript
import type { RatingDisplay } from '@fabric-msft/web-components/rating-display';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Basic Rating Display -->
<fabric-rating-display value="3.5" aria-label="Rating: 3.5 out of 5 stars"></fabric-rating-display>

<!-- Different Max Value -->
<fabric-rating-display value="7" max="10" aria-label="Rating: 7 out of 10"></fabric-rating-display>

<!-- Different Color -->
<fabric-rating-display value="4" color="brand" aria-label="Rating: 4 out of 5"></fabric-rating-display>
<fabric-rating-display value="2" color="neutral" aria-label="Rating: 2 out of 5"></fabric-rating-display> <!-- Default -->
<fabric-rating-display value="5" color="marigold" aria-label="Rating: 5 out of 5"></fabric-rating-display>
```

### Handling Events (JavaScript)

Rating display is a non-interactive component and does not emit specific events.
<!-- END-SECTION: Rating Display Usage -->

<!-- BEGIN-SECTION: Rating Display API -->
## Rating Display API Reference (fabric-rating-display)

Based on `RatingDisplay` class extending `RatingDisplayBase`.

### Attributes & Properties

*   **`value`**: `number` (default: `0`)
    *   The rating value to display.
*   **`max`**: `number` (default: `5`)
    *   The maximum possible rating value (determines the number of icons shown).
*   **`color`**: `"neutral" | "brand" | "marigold"` (default: `"neutral"`)
    *   Sets the fill color of the rating icons.

### Events

None (non-interactive component).

### Slots

*   **`icon`**: Allows providing a custom SVG icon to use instead of the default star.

```html
<fabric-rating-display value="2">
  <svg slot="icon" width="16" height="16" viewBox="0 0 24 24"><path d="...heart icon..."/></svg>
</fabric-rating-display>
```

### CSS Parts

*   **`icon-filled`**: The filled portion of the rating icon(s).
*   **`icon-empty`**: The empty/background portion of the rating icon(s).

```css
/* Example: Change the size of the icons */
fabric-rating-display svg {
  width: 24px;
  height: 24px;
}

/* Example: Style the filled part */
fabric-rating-display::part(icon-filled) {
  filter: drop-shadow(1px 1px 1px black);
}
```
<!-- END-SECTION: Rating Display API -->

<!-- BEGIN-SECTION: Rating Display Styling -->
## Rating Display Styling (fabric-rating-display)

Displays a sequence of icons, partially or fully filled based on the `value`.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralForeground3`, `--colorBrandForeground1`, `--colorPaletteMarigoldForeground1`: Icon fill colors based on `color` attribute.
    *   `--colorNeutralBackground1`: Background/empty portion color.
*   Icon size is often controlled by `width`/`height` attributes or CSS on the icons.
*   Refer to `rating-display.styles.ts` for detailed token usage.
<!-- END-SECTION: Rating Display Styling -->

<!-- BEGIN-SECTION: Rating Display Accessibility -->
## Rating Display Accessibility (fabric-rating-display)

*   Primarily a visual presentation; does not have an interactive role like `slider`.
*   **Crucially requires an accessible label** via `aria-label` or `aria-labelledby` to convey the rating information (e.g., "Rating: 3.5 out of 5 stars"). The visual display alone is not sufficient for screen reader users.
<!-- END-SECTION: Rating Display Accessibility -->
