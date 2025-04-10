---
id: components_checkbox
title: Checkbox
description: Displays a checkbox input allowing users to select one or more options.
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/checkbox
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Checkbox (`<fabric-checkbox>`)

Displays a checkbox input allowing users to select one or more options.

## Usage

**Importing:**

```javascript
import '@fabric-msft/web-components/checkbox/define.js';

// Optional: Import the types for Typescript
import type { Checkbox } from '@fabric-msft/web-components/checkbox';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Basic Checkbox -->
<fabric-checkbox id="basic-cb">Subscribe to newsletter</fabric-checkbox>

<!-- Checked by default -->
<fabric-checkbox checked>Enable notifications</fabric-checkbox>

<!-- Disabled -->
<fabric-checkbox disabled>Cannot select (disabled)</fabric-checkbox>
<fabric-checkbox checked disabled>Cannot deselect (disabled)</fabric-checkbox>

<!-- Indeterminate State (set via JS) -->
<fabric-checkbox id="indeterminate-cb">Partial selection</fabric-checkbox>

<!-- Required -->
<fabric-checkbox required>I agree (required)</fabric-checkbox>

<!-- With Fabric Field (Recommended for labeling) -->
<fabric-field label-position="after">
  <label slot="label" for="terms-cb">Accept Terms</label>
  <fabric-checkbox slot="input" id="terms-cb" required></fabric-checkbox>
</fabric-field>

<!-- Readonly -->
<fabric-checkbox readonly checked>Readonly Checked</fabric-checkbox>
```

### Handling Events (JavaScript)

The checkbox emits a `change` event when its `checked` state is modified by user interaction.

```javascript
const basicCheckbox = document.getElementById('basic-cb');
const indeterminateCheckbox = document.getElementById('indeterminate-cb');

// Set indeterminate state via property
if (indeterminateCheckbox) {
  indeterminateCheckbox.indeterminate = true;
}

if (basicCheckbox) {
  basicCheckbox.addEventListener('change', (event) => {
    const checkbox = event.target;
    console.log(`Checkbox changed. Checked: ${checkbox.checked}`);
    // Add logic to react to the change
  });
}
```

## API Reference (`<fabric-checkbox>`)

Based on `Checkbox` class extending `CheckboxBase`.

### Attributes & Properties

*   **`checked`**: `boolean` (default: `false`)
    *   Gets or sets the checked state.
*   **`disabled`**: `boolean` (default: `false`)
    *   Disables the checkbox.
*   **`required`**: `boolean` (default: `false`)
    *   Indicates that user input is required before form submission.
*   **`readonly`**: `boolean` (default: `false`)
    *   Prevents user interaction from changing the checked state.
*   **`indeterminate`** (Property only): `boolean` (default: `false`)
    *   Sets the checkbox to an indeterminate visual state (neither checked nor unchecked). Must be set via JavaScript property.
*   **`value`**: `string` (default: `"on"`)
    *   The value submitted with form data when the checkbox is checked.
*   **`name`**: `string`
    *   Name submitted with form data.

### Events

*   **`change`**: `Event`
    *   Fired when the `checked` state changes due to user interaction.

### Slots

*   **(default)**: Label content for the checkbox (use `<fabric-field>` for better structure and accessibility).
*   **`checked-indicator`**: Custom content/icon to display when checked.
*   **`indeterminate-indicator`**: Custom content/icon to display when indeterminate.

### CSS Parts

*   **`control`**: The square checkmark container element.
*   **`label`**: The container for the default slot content (label).
*   **`indicator`**: The checkmark or indeterminate indicator icon/element within the control.

```css
/* Example: Style the checkmark control */
fabric-checkbox::part(control) {
  border-radius: 2px;
  border-width: 2px;
}

/* Example: Style the label part */
fabric-checkbox::part(label) {
  margin-left: var(--spacingHorizontalS);
}
```

## Styling

Customize appearance using CSS targeting the host element or the exposed CSS Parts.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralForeground1`, `--colorNeutralForegroundDisabled`: Text color for label.
    *   `--colorNeutralStrokeAccessible`, `--colorNeutralStrokeDisabled`: Border color for the control.
    *   `--colorCompoundBrandBackground`, `--colorCompoundBrandBackgroundHover`, `--colorCompoundBrandBackgroundPressed`: Background color of the control when checked.
    *   `--colorNeutralForegroundOnBrand`, `--colorNeutralForegroundDisabled`: Color of the checkmark indicator.
    *   `--borderRadiusSmall`, `--borderRadiusMedium`: Used for control shape.
    *   `--strokeWidthThin`, `--strokeWidthThick`: Border widths.
*   Refer to `checkbox.styles.ts` for detailed token usage and state variations (hover, pressed, disabled, indeterminate).

## Accessibility

*   Renders with `role="checkbox"`.
*   Manages `aria-checked` state (`"true"`, `"false"`, `"mixed"` for indeterminate).
*   Manages `aria-disabled`, `aria-required`, `aria-readonly` based on attributes.
*   When not used within a `<fabric-field>`, ensure the label content provided in the default slot is correctly associated (often implicitly, but `<fabric-field>` is more robust).
*   Keyboard interaction includes Spacebar to toggle checked state. 