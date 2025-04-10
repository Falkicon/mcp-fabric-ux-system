---
id: components_progress-bar
title: Progress Bar
description: Displays progress indication, either determinate or indeterminate.
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/progress-bar
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Progress Bar (`<fabric-progress-bar>`)

Displays progress indication, either determinate (percentage complete) or indeterminate (ongoing activity).

## Usage

**Importing:**

```javascript
import '@fabric-msft/web-components/progress-bar/define.js';

// Optional: Import the types for Typescript
import type { ProgressBar } from '@fabric-msft/web-components/progress-bar';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Determinate Progress -->
<label for="progress-det">Loading: 75%</label>
<fabric-progress-bar id="progress-det" value="75"></fabric-progress-bar>

<!-- Indeterminate Progress (value not set) -->
<label for="progress-ind">Processing...</label>
<fabric-progress-bar id="progress-ind" aria-label="Processing data"></fabric-progress-bar>

<!-- Different Intents -->
<fabric-progress-bar intent="success" value="100"></fabric-progress-bar>
<fabric-progress-bar intent="warning" value="50"></fabric-progress-bar>
<fabric-progress-bar intent="error"></fabric-progress-bar> <!-- Indeterminate Error -->

<!-- Different Shapes -->
<fabric-progress-bar shape="square" value="30"></fabric-progress-bar>
<fabric-progress-bar shape="rounded" value="60"></fabric-progress-bar> <!-- Default -->

<!-- Different Thicknesses -->
<fabric-progress-bar thickness="medium" value="40"></fabric-progress-bar> <!-- Default -->
<fabric-progress-bar thickness="large" value="80"></fabric-progress-bar>
```

### Handling Events (JavaScript)

Progress bars are typically updated programmatically and do not emit specific events related to their value changes.

```javascript
const progressBar = document.getElementById('progress-det');
let currentValue = 75;

// Example function to update progress
function updateProgress(newValue) {
  if (progressBar) {
    currentValue = Math.max(0, Math.min(100, newValue)); // Clamp between 0-100
    progressBar.value = currentValue;
    // Update associated label if needed
    const label = document.querySelector('label[for="progress-det"]');
    if (label) {
      label.textContent = `Loading: ${currentValue}%`;
    }
  }
}

// Simulate progress update
// setTimeout(() => updateProgress(90), 1000);
```

## API Reference (`<fabric-progress-bar>`)

Based on `ProgressBar` class extending `ProgressBarBase`.

### Attributes & Properties

*   **`value`**: `number | null` (default: `null`)
    *   The current progress value (typically 0-100). If set, the progress bar is determinate. If `null` or undefined, it's indeterminate.
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
fabric-progress-bar::part(track) {
  background-color: lightgrey;
}

/* Example: Style the indicator */
fabric-progress-bar::part(indicator) {
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