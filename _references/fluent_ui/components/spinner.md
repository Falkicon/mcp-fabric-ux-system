# Spinner (`<fluent-spinner>`)

Indicates an ongoing operation where the wait time is unknown (indeterminate progress).

## Usage

**Importing:**

```javascript
import '@fluentui/web-components/spinner/define.js';
```

**Examples:**

```html
<!-- Basic Spinner -->
<fluent-spinner aria-label="Loading content"></fluent-spinner>

<!-- Spinner with Label (Default Slot) -->
<fluent-spinner>Loading...</fluent-spinner>

<!-- Label Position -->
<fluent-spinner label-position="before">Loading</fluent-spinner>
<fluent-spinner label-position="after">Loading</fluent-spinner> <!-- Default -->
<fluent-spinner label-position="above">Loading</fluent-spinner>
<fluent-spinner label-position="below">Loading</fluent-spinner>

<!-- Different Sizes -->
<fluent-spinner size="tiny" aria-label="Loading"></fluent-spinner>
<fluent-spinner size="extra-small" aria-label="Loading"></fluent-spinner>
<fluent-spinner size="small" aria-label="Loading"></fluent-spinner>
<fluent-spinner size="medium" aria-label="Loading"></fluent-spinner> <!-- Default -->
<fluent-spinner size="large" aria-label="Loading"></fluent-spinner>
<fluent-spinner size="extra-large" aria-label="Loading"></fluent-spinner>
<fluent-spinner size="huge" aria-label="Loading"></fluent-spinner>

<!-- Inverted Appearance (for dark backgrounds) -->
<div style="background-color: black; padding: 10px; display: inline-block;">
  <fluent-spinner appearance="inverted" aria-label="Loading"></fluent-spinner>
</div>
```

## API Reference (`<fluent-spinner>`)

Based on `Spinner` class extending `SpinnerBase`.

### Attributes & Properties

*   **`size`**: `"tiny" | "extra-small" | "small" | "medium" | "large" | "extra-large" | "huge"` (default: `"medium"`)
    *   Sets the size of the spinning indicator.
*   **`appearance`**: `"default" | "inverted" | "brand"` (default: `"default"`)
    *   Adjusts the color scheme, typically `inverted` for dark backgrounds or `brand` for brand color.
*   **`label-position`**: `"before" | "after" | "above" | "below"` (default: `"after"`)
    *   Determines the position of the label (default slot content) relative to the spinning indicator.

### Events

None.

### Slots

*   **(default)**: Optional label text to display alongside the spinner.

### CSS Parts

*   **`spinner`**: The rotating indicator element.
*   **`label`**: The container for the default slot content (label).

```css
/* Example: Change animation speed */
fluent-spinner::part(spinner) {
  animation-duration: 1s;
}

/* Example: Style the label */
fluent-spinner::part(label) {
  font-weight: bold;
}
```

## Styling

Customize appearance using CSS targeting the host element or the exposed CSS Parts.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralStroke1`, `--colorNeutralForegroundInverted`, `--colorBrandForeground1`: Used for the spinner color based on `appearance`.
    *   `--colorNeutralForeground1`: Default label color.
    *   Sizing tokens (`--strokeWidth...`) for the spinner thickness.
    *   Dimensions (height/width) based on the `size` attribute mapping to specific pixel values.
*   Refer to `spinner.styles.ts` for detailed token usage.

## Accessibility

*   Sets `role="progressbar"` by default, indicating indeterminate progress.
*   If the spinner represents general busy state rather than specific progress, consider setting `role="status"` for a less verbose screen reader announcement.
*   **Requires an accessible label** provided either via the default slot content or an `aria-label` attribute to describe what is loading/processing.
