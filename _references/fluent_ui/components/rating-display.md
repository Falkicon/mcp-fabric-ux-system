# Rating Display (`<fluent-rating-display>`)

Displays a non-interactive visual representation of a rating value, typically using icons like stars.

## Usage

**Importing:**

```javascript
import '@fluentui/web-components/rating-display/define.js';
```

**Examples:**

```html
<!-- Basic Rating Display -->
<fluent-rating-display value="3.5" aria-label="Rating: 3.5 out of 5 stars"></fluent-rating-display>

<!-- Different Max Value -->
<fluent-rating-display value="7" max="10" aria-label="Rating: 7 out of 10"></fluent-rating-display>

<!-- Different Color -->
<fluent-rating-display value="4" color="brand" aria-label="Rating: 4 out of 5"></fluent-rating-display>
<fluent-rating-display value="2" color="neutral" aria-label="Rating: 2 out of 5"></fluent-rating-display> <!-- Default -->
<fluent-rating-display value="5" color="marigold" aria-label="Rating: 5 out of 5"></fluent-rating-display>
```

## API Reference (`<fluent-rating-display>`)

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
<fluent-rating-display value="2">
  <svg slot="icon" width="16" height="16" viewBox="0 0 24 24"><path d="...heart icon..."/></svg>
</fluent-rating-display>
```

### CSS Parts

*   **`icon-filled`**: The filled portion of the rating icon(s).
*   **`icon-empty`**: The empty/background portion of the rating icon(s).

```css
/* Example: Change the size of the icons */
fluent-rating-display svg {
  width: 24px;
  height: 24px;
}

/* Example: Style the filled part */
fluent-rating-display::part(icon-filled) {
  filter: drop-shadow(1px 1px 1px black);
}
```

## Styling

Displays a sequence of icons, partially or fully filled based on the `value`.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralForeground3`, `--colorBrandForeground1`, `--colorPaletteMarigoldForeground1`: Icon fill colors based on `color` attribute.
    *   `--colorNeutralBackground1`: Background/empty portion color.
*   Icon size is often controlled by `width`/`height` attributes or CSS on the icons.
*   Refer to `rating-display.styles.ts` for detailed token usage.

## Accessibility

*   Primarily a visual presentation; does not have an interactive role like `slider`.
*   **Crucially requires an accessible label** via `aria-label` or `aria-labelledby` to convey the rating information (e.g., "Rating: 3.5 out of 5 stars"). The visual display alone is not sufficient for screen reader users.
