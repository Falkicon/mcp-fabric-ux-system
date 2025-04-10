---
id: components_label
title: Label
description: Displays text used to label form elements or other UI components.
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/label
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Label (`<fabric-label>`)

Displays text used to label form elements or other UI components.

## Usage

Most often used within the `label` slot of a `<fabric-field>` to associate it with an input.

**Importing:**

```javascript
import '@fabric-msft/web-components/label/define.js';
// Also needed for context:
import '@fabric-msft/web-components/field/define.js';
import '@fabric-msft/web-components/text-input/define.js';

// Optional: Import the types for Typescript
import type { Label } from '@fabric-msft/web-components/label';
import type { Field } from '@fabric-msft/web-components/field'; // Example context type
import type { TextInput } from '@fabric-msft/web-components/text-input'; // Example input type
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Used within Field (Recommended) -->
<fabric-field>
  <fabric-label slot="label" for="my-input" required>Input Label</fabric-label>
  <fabric-text-input slot="input" id="my-input"></fabric-text-input>
</fabric-field>

<!-- Standalone Label (Requires manual association if for an input) -->
<fabric-label size="large" weight="semibold">Large Semibold Label</fabric-label>
<br/>
<fabric-label disabled>Disabled Label</fabric-label>
```

### Handling Events (JavaScript)

Labels are static text elements and do not typically emit specific events. You might listen for standard DOM events like `click` if needed, but this is uncommon.

## API Reference (`<fabric-label>`)

Based on `Label` class.

### Attributes & Properties

Inherits standard HTML `<label>` attributes:

*   **`for`**: `string` - The `id` of the form control this label is associated with.

Adds Fabric UX specific attributes:

*   **`size`**: `"small" | "medium" | "large"` (default: `"medium"`)
    *   Sets the font size.
*   **`weight`**: `"regular" | "semibold"` (default: `"regular"`)
    *   Sets the font weight.
*   **`disabled`**: `boolean` (default: `false`)
    *   Applies disabled styling (e.g., color).
*   **`required`**: `boolean` (default: `false`)
    *   Visually indicates that the associated input is required (often shows `*`). This attribute is often preferably set on the parent `<fabric-field>` or the input itself.

### Events

None specific to this component (inherits standard element events).

### Slots

*   **(default)**: The text content of the label.

### CSS Parts

*   **`required-indicator`**: The `<span>` element displaying the required indicator (`*`).

```css
/* Example: Style the required indicator */
fabric-label::part(required-indicator) {
  color: red;
  margin-left: 2px;
}
```

## Styling

Controls the visual presentation of label text.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralForeground1`, `--colorNeutralForegroundDisabled`: Text color.
    *   `--colorCompoundBrandForeground1`: Color for the required indicator (`*`).
    *   Font tokens (`--fontSizeBase...`, `--lineHeightBase...`) corresponding to the `size` attribute.
    *   Font weight tokens (`--fontWeightRegular`, `--fontWeightSemibold`) corresponding to the `weight` attribute.
*   Refer to `label.styles.ts` for detailed token usage.

## Accessibility

*   Renders a native `<label>` element (or provides equivalent semantics).
*   The `for` attribute is crucial for programmatically associating the label with its corresponding form control, enabling screen readers to announce the label when the control receives focus.
*   Using `<fabric-label>` within the `label` slot of `<fabric-field>` automatically handles this association correctly. 