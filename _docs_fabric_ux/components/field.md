---
id: components_field
title: Field
description: Provides layout and structure for form controls and their labels.
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/field
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Field (`<fabric-field>`)

Provides layout, labeling, and accessibility structure for form controls like `<fabric-text-input>`, `<fabric-checkbox>`, `<fabric-radio-group>`, etc.

## Usage

Wrap your form input component along with its associated `<label>` and any helper/validation messages within a `<fabric-field>`.

**Importing:**

```javascript
import '@fabric-msft/web-components/field/define.js';
// Ensure the input component (e.g., checkbox) is also imported
import '@fabric-msft/web-components/checkbox/define.js';

// Optional: Import the types for Typescript
import type { Field } from '@fabric-msft/web-components/field';
import type { Checkbox } from '@fabric-msft/web-components/checkbox'; // Example input type
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Field with Checkbox -->
<fabric-field label-position="after">
  <label slot="label" for="terms-checkbox">Accept Terms & Conditions</label>
  <fabric-checkbox slot="input" id="terms-checkbox" required></fabric-checkbox>
  <span slot="message" id="terms-help">Required field</span>
</fabric-field>

<!-- Field with TextInput -->
<fabric-field label-position="above">
  <label slot="label" for="name-input">Full Name</label>
  <fabric-text-input slot="input" id="name-input" placeholder="Enter your name"></fabric-text-input>
</fabric-field>

<!-- Field with validation state (example) -->
<fabric-field state="error" label-position="above">
  <label slot="label" for="email-input">Email Address</label>
  <fabric-text-input slot="input" id="email-input" type="email" value="invalid-email"></fabric-text-input>
  <span slot="message" id="email-error">Please enter a valid email address.</span>
</fabric-field>

<!-- Disabled Field -->
<fabric-field disabled label-position="above">
  <label slot="label" for="disabled-input">Disabled Input</label>
  <fabric-text-input slot="input" id="disabled-input" value="Cannot edit"></fabric-text-input>
</fabric-field>
```

### Handling Events (JavaScript)

The field component itself does not typically emit events. You would listen for events (like `change`, `input`, etc.) directly on the slotted input control.

```javascript
const nameInput = document.getElementById('name-input');

if (nameInput) {
  nameInput.addEventListener('input', (event) => {
    console.log(`Name input value: ${event.target.value}`);
  });
}
```

## API Reference (`<fabric-field>`)

Based on `Field` class extending `FieldBase`.

### Attributes & Properties

*   **`label-position`**: `"above" | "after" | "before"` (default: `"above"`)
    *   Controls the placement of the slotted label relative to the input.
*   **`disabled`**: `boolean` (default: `false`)
    *   Applies a disabled state stylistically to the field and potentially affects the slotted input.
*   **`required`**: `boolean` (default: `false`)
    *   Indicates the associated input is required, often showing a required indicator (`*`). Reflects the `required` state of the slotted input if present.
*   **`state`**: `"none" | "success" | "error" | "warning"` (default: `"none"`)
    *   Applies visual styling (e.g., border color, message color) to indicate a validation state. Does not perform validation itself.
*   **`size`**: `"small" | "medium" | "large"` (default: `"medium"`)
    *   Adjusts spacing and potentially font sizes within the field.

### Events

None specific to this component (listen on slotted input).

### Slots

*   **`label`** (Required): The `<label>` element associated with the input. Ensure the `for` attribute matches the `id` of the slotted input.
*   **`input`** (Required): The form control component (e.g., `<fabric-checkbox>`, `<fabric-text-input>`). Ensure it has an `id`.
*   **`message`**: Helper text, validation messages, or other descriptive content related to the input. Display is often dependent on the `state` attribute.
*   **`indicator`**: Allows customization of the required/optional indicator.

### CSS Parts

*   **`label`**: The container for the slotted `label`.
*   **`input-wrapper`**: The container for the slotted `input`.
*   **`message`**: The container for the slotted `message`.
*   **`indicator`**: The container for the required/optional indicator.

```css
/* Example: Style the label part */
fabric-field::part(label) {
  font-style: italic;
}

/* Example: Style the message part when in error state */
fabric-field[state="error"]::part(message) {
  font-weight: bold;
}
```

## Styling

Provides structural layout and spacing. Customize appearance using CSS targeting the host element or the exposed CSS Parts.

*   **Key Design Tokens Used (Examples):**
    *   `--spacingVerticalS`, `--spacingVerticalXS`, `--spacingHorizontalS`: Control gaps between label, input, and message based on `label-position` and `size`.
    *   `--colorNeutralForeground3`, `--colorNeutralForeground2`: Colors for label and message text.
    *   `--colorCompoundBrandForeground1`: Color for the required indicator (`*`).
    *   Tokens related to validation states (e.g., `--colorPaletteRedBorder1`, `--colorPaletteGreenForeground1`, `--colorPaletteYellowForeground1`) are applied to the message part based on the `state` attribute.
*   Refer to `field.styles.ts` for detailed token mapping and logic.

## Accessibility

*   Crucially links the slotted `<label>` to the slotted `input` via the `for` attribute on the label, ensuring screen readers announce the label when the input receives focus.
*   Provides a consistent structure for associating helper text or validation messages (`message` slot) with the input, often using `aria-describedby` implicitly or requiring manual setup depending on the input component.
*   Visually indicates `required` and validation `state`. 