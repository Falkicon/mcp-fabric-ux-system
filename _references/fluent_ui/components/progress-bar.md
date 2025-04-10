# Progress Bar (`<fluent-progress-bar>`)

Displays progress indication, either determinate (percentage complete) or indeterminate (ongoing activity).

## Usage

**Importing:**

```javascript
import '@fluentui/web-components/progress-bar/define.js';
```

**Examples:**

```html
<!-- Determinate Progress -->
<label for="progress-det">Loading: 75%</label>
<fluent-progress-bar id="progress-det" value="75"></fluent-progress-bar>

<!-- Indeterminate Progress (value not set) -->
<label for="progress-ind">Processing...</label>
<fluent-progress-bar id="progress-ind"></fluent-progress-bar>

<!-- Different Intents -->
<fluent-progress-bar intent="success" value="100"></fluent-progress-bar>
<fluent-progress-bar intent="warning" value="50"></fluent-progress-bar>
<fluent-progress-bar intent="error"></fluent-progress-bar> <!-- Indeterminate Error -->

<!-- Different Shapes -->
<fluent-progress-bar shape="square" value="30"></fluent-progress-bar>
<fluent-progress-bar shape="rounded" value="60"></fluent-progress-bar> <!-- Default -->

<!-- Different Thicknesses -->
<fluent-progress-bar thickness="medium" value="40"></fluent-progress-bar> <!-- Default -->
<fluent-progress-bar thickness="large" value="80"></fluent-progress-bar>
```

## API Reference (`<fluent-progress-bar>`)

Based on `ProgressBar` class extending `ProgressBarBase`.

### Attributes & Properties

*   **`value`**: `number | null` (default: `null`)
    *   The current progress value. If set, the progress bar is determinate. If `null` or undefined, it's indeterminate.
*   **`min`**: `number` (default: `0`)
    *   The minimum allowed value (for determinate progress).
*   **`max`**: `number` (default: `100`)
    *   The maximum allowed value (for determinate progress).
*   **`intent`**: `"info" | "success" | "warning" | "error"` (default: `"info"`)
    *   Adjusts the color of the progress indicator bar.
*   **`shape`**: `"rounded" | "square"` (default: `"rounded"`)
    *   Sets the shape of the progress bar track and indicator.
*   **`thickness`**: `"medium" | "large"` (default: `"medium"`)
    *   Sets the thickness (height) of the progress bar.

### Events

None.

### Slots

None.

### CSS Parts

*   **`track`**: The background track element.
*   **`indicator`**: The foreground indicator bar element (represents progress).

```css
/* Example: Style the track */
fluent-progress-bar::part(track) {
  background-color: lightgrey;
}

/* Example: Style the indicator */
fluent-progress-bar::part(indicator) {
  transition: width 0.3s ease-out;
}
```

## Styling

Customize appearance using CSS targeting the host element or the exposed CSS Parts.

*   **Key Design Tokens Used (Examples):**
    *   `--colorBrandBackground1`, `--colorPaletteGreenBackground1`, `--colorPaletteYellowBackground1`, `--colorPaletteRedBackground1`: Used for the indicator color based on `intent`.
    *   `--colorNeutralBackground4`, `--colorNeutralBackground5`: Used for the track background color.
    *   `--borderRadiusMedium`, `--borderRadiusNone`: Used for `shape`.
    *   Height is controlled by `thickness` attribute mapping to specific pixel values.
*   Refer to `progress-bar.styles.ts` for detailed token usage.

## Accessibility

*   Sets `role="progressbar"`.
*   Manages `aria-valuenow`, `aria-valuemin`, `aria-valuemax` for determinate progress.
*   Omits `aria-valuenow` for indeterminate progress.
*   Requires an accessible label provided via `aria-label` or `aria-labelledby` to describe what process the progress bar represents.
