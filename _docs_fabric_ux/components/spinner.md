---
id: components_spinner
title: Spinner
description: Indicates an ongoing operation with indeterminate progress.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/spinner
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Spinner (`<fabric-spinner>`)

Indicates an ongoing operation where the wait time is unknown (indeterminate progress).

## Usage

**Importing:**

```javascript
import '@fabric-msft/web-components/spinner/define.js';

// Optional: Import the types for Typescript
import type { Spinner } from '@fabric-msft/web-components/spinner';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Basic Spinner -->
<fabric-spinner aria-label="Loading content"></fabric-spinner>

<!-- Spinner with Label (Default Slot) -->
<fabric-spinner>Loading...</fabric-spinner>

<!-- Label Position -->
<fabric-spinner label-position="before">Loading</fabric-spinner>
<fabric-spinner label-position="after">Loading</fabric-spinner> <!-- Default -->
<fabric-spinner label-position="above">Loading</fabric-spinner>
<fabric-spinner label-position="below">Loading</fabric-spinner>

<!-- Different Sizes -->
<fabric-spinner size="tiny" aria-label="Loading"></fabric-spinner>
<fabric-spinner size="extra-small" aria-label="Loading"></fabric-spinner>
<fabric-spinner size="small" aria-label="Loading"></fabric-spinner>
<fabric-spinner size="medium" aria-label="Loading"></fabric-spinner> <!-- Default -->
<fabric-spinner size="large" aria-label="Loading"></fabric-spinner>
<fabric-spinner size="extra-large" aria-label="Loading"></fabric-spinner>
<fabric-spinner size="huge" aria-label="Loading"></fabric-spinner>

<!-- Inverted Appearance (for dark backgrounds) -->
<div style="background-color: black; padding: 10px; display: inline-block;">
  <fabric-spinner appearance="inverted" aria-label="Loading"></fabric-spinner>
</div>
```

### Handling Events (JavaScript)

Spinners are visual indicators and do not emit specific events.

## API Reference (`<fabric-spinner>`)

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
fabric-spinner::part(spinner) {
  animation-duration: 1s;
}

/* Example: Style the label */
fabric-spinner::part(label) {
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