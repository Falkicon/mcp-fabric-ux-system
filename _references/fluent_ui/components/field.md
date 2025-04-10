# Field (`<fluent-field>`)

Provides layout, labeling, and accessibility structure for form controls like `<fluent-text-input>`, `<fluent-checkbox>`, `<fluent-radio-group>`, etc.

## Usage

Wrap your form input component along with its associated `<label>` and any helper/validation messages within a `<fluent-field>`.

**Importing:**

```javascript
import '@fluentui/web-components/field/define.js';
// Ensure the input component (e.g., checkbox) is also imported
import '@fluentui/web-components/checkbox/define.js';
```

**Examples:**

```html
<!-- Field with Checkbox -->
<fluent-field label-position="after">
  <label slot="label" for="terms-checkbox">Accept Terms & Conditions</label>
  <fluent-checkbox slot="input" id="terms-checkbox" required></fluent-checkbox>
  <span slot="message" id="terms-help">Required field</span>
</fluent-field>

<!-- Field with TextInput -->
<fluent-field label-position="above">
  <label slot="label" for="name-input">Full Name</label>
  <fluent-text-input slot="input" id="name-input" placeholder="Enter your name"></fluent-text-input>
</fluent-field>

<!-- Field with validation state (example) -->
<fluent-field state="error" label-position="above">
  <label slot="label" for="email-input">Email Address</label>
  <fluent-text-input slot="input" id="email-input" type="email" value="invalid-email"></fluent-text-input>
  <span slot="message" id="email-error">Please enter a valid email address.</span>
</fluent-field>

<!-- Disabled Field -->
<fluent-field disabled label-position="above">
  <label slot="label" for="disabled-input">Disabled Input</label>
  <fluent-text-input slot="input" id="disabled-input" value="Cannot edit"></fluent-text-input>
</fluent-field>
```

## API Reference (`<fluent-field>`)

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

### Slots

*   **`label`** (Required): The `<label>` element associated with the input.
*   **`input`** (Required): The form control component (e.g., `<fluent-checkbox>`, `<fluent-text-input>`).
*   **`message`**: Helper text, validation messages, or other descriptive content related to the input. Display is often dependent on the `state` attribute.
*   **`indicator`**: Allows customization of the required/optional indicator.

### CSS Parts

*   **`label`**: The container for the slotted `label`.
*   **`input-wrapper`**: The container for the slotted `input`.
*   **`message`**: The container for the slotted `message`.
*   **`indicator`**: The container for the required/optional indicator.

```css
/* Example: Style the label part */
fluent-field::part(label) {
  font-style: italic;
}

/* Example: Style the message part when in error state */
fluent-field[state="error"]::part(message) {
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
