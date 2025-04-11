---
id: components_text-input
title: Text Input
description: Displays a single-line text input field.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/text-input
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Text Input (`<fabric-text-input>`)

Displays a single-line text input field.

## Usage

**Importing:**

```javascript
import '@fabric-msft/web-components/text-input/define.js';

// Optional: Import the types for Typescript
import type { TextInput } from '@fabric-msft/web-components/text-input';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Basic TextInput -->
<fabric-text-input id="basic-input" placeholder="Enter text here"></fabric-text-input>

<!-- With Fabric Field (Recommended) -->
<fabric-field>
  <label slot="label" for="my-input">Your Name</label>
  <fabric-text-input slot="input" id="my-input" required></fabric-text-input>
</fabric-field>

<!-- Different Appearances -->
<fabric-text-input appearance="outline" placeholder="Outline"></fabric-text-input>
<fabric-text-input appearance="filled-lighter" placeholder="Filled Lighter"></fabric-text-input>
<fabric-text-input appearance="filled-darker" placeholder="Filled Darker"></fabric-text-input>

<!-- With Start/End Content -->
<fabric-text-input placeholder="Search">
  <svg slot="start" width="16" height="16"><path d="..."/></svg>
  <fabric-button slot="end" appearance="transparent" icon-only aria-label="Clear search">
    <svg width="16" height="16"><path d="..."/></svg>
  </fabric-button>
</fabric-text-input>

<!-- Input Types -->
<fabric-text-input type="email" placeholder="Email"></fabric-text-input>
<fabric-text-input type="password" placeholder="Password"></fabric-text-input>
<fabric-text-input type="number" placeholder="Number"></fabric-text-input>

<!-- Disabled / Readonly -->
<fabric-text-input disabled value="Cannot edit"></fabric-text-input>
<fabric-text-input readonly value="Cannot change"></fabric-text-input>
```

### Handling Events (JavaScript)

Listen for standard `<input>` events like `input` (fires on every change) or `change` (fires on commit, e.g., blur).

```javascript
const basicInput = document.getElementById('basic-input');

if (basicInput) {
  basicInput.addEventListener('input', (event) => {
    const currentValue = event.target.value;
    console.log(`Input value: ${currentValue}`);
    // Add logic, e.g., live validation, character counter
  });

  basicInput.addEventListener('change', (event) => {
    const finalValue = event.target.value;
    console.log(`Input value committed: ${finalValue}`);
    // Add logic for when user finishes editing (e.g., final validation)
  });
}
```

## API Reference (`<fabric-text-input>`)

Based on `TextInput` class extending `TextInputBase`.

### Attributes & Properties

Inherits standard HTML `<input>` attributes, including:

*   **`value`**: `string` - Gets or sets the current value.
*   **`type`**: `"text" | "email" | "number" | "password" | "search" | "tel" | "url" | ...` (default: `"text"`)
*   **`placeholder`**: `string` - Placeholder text.
*   **`disabled`**: `boolean`
*   **`required`**: `boolean`
*   **`readonly`**: `boolean`
*   **`maxlength`**, **`minlength`**: `number`
*   **`pattern`**: `string` - Regex pattern for validation.
*   **`size`**: `number` - Legacy attribute controlling visible width (CSS is preferred).
*   **`spellcheck`**: `boolean`
*   **`name`**: `string` - Used for form submission.
*   **`list`**: `string` - ID of a `<datalist>` element.
*   **`autocomplete`**: `string`

Adds Fabric UX specific attributes:

*   **`appearance`**: `"outline" | "filled-lighter" | "filled-darker"` (default: `"outline"`)
    *   Defines the visual style of the input field.

### Events

Inherits standard HTML `<input>` events:

*   **`input`**: Fired synchronously when the value changes.
*   **`change`**: Fired when the value is committed by the user (e.g., on blur).
*   *(Focus, blur, keyboard events, etc.)*

### Slots

*   **`start`**: Content placed visually before the input field (e.g., icons).
*   **`end`**: Content placed visually after the input field (e.g., icons, clear buttons).

### CSS Parts

*   **`root`**: The outermost container element.
*   **`control`**: The native `<input>` element itself.
*   **`content`**: The container element wrapping the `start`, `input` (`control`), and `end` elements.

```css
/* Example: Style the root container */
fabric-text-input::part(root) {
  padding: 5px;
}

/* Example: Style the native input element */
fabric-text-input::part(control) {
  font-family: monospace;
}
```

## Styling

Customize appearance using CSS targeting the host element or the exposed CSS Parts.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralForeground1`: Input text color.
    *   `--colorNeutralForeground4`: Placeholder text color.
    *   `--colorNeutralBackground1`, `--colorSubtleBackground`, `--colorTransparentBackground`: Background colors based on `appearance`.
    *   `--colorNeutralStroke1`, `--colorNeutralStrokeAccessible`: Border colors based on `appearance` and state (hover, focus).
    *   `--borderRadiusMedium`: Controls corner rounding.
    *   `--strokeWidthThin`: Border thickness.
    *   `--fontSizeBase300`, `--lineHeightBase300`: Text size and line height.
    *   Spacing tokens (`--spacingHorizontal...`) for padding and gaps between content/start/end slots.
*   Refer to `text-input.styles.ts` for detailed token mapping and state variations.

## Accessibility

*   Renders a native `<input>` element, inheriting its baseline accessibility.
*   Crucially relies on being wrapped by `<fabric-field>` to associate the visible `<label>` correctly for screen readers.
*   Manages `aria-disabled`, `aria-required`, `aria-readonly` based on attributes.
*   Ensure `placeholder` text is supplemental and not a replacement for a visible label. 