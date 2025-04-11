---
id: components_radio
title: Radio
description: Represents a single radio button within a Radio Group.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/radio
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Radio (`<fabric-radio>`)

<!-- BEGIN-SECTION: Radio Overview -->
Represents a single radio button within a `<fabric-radio-group>`.
<!-- END-SECTION: Radio Overview -->

<!-- BEGIN-SECTION: Radio Usage -->
## Radio Usage (fabric-radio)

Place `<fabric-radio>` elements inside a `<fabric-radio-group>`. Associate labels using `<fabric-field>` or `aria-labelledby`.

**Importing:**

```javascript
// Typically imported alongside RadioGroup:
import '@fabric-msft/web-components/radio-group/define.js';
// Or individually:
// import '@fabric-msft/web-components/radio/define.js';

// Optional: Import the types for Typescript
import type { Radio } from '@fabric-msft/web-components/radio';
import type { RadioGroup } from '@fabric-msft/web-components/radio-group'; // Example context type
import type { Field } from '@fabric-msft/web-components/field'; // Example context type
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Example (within RadioGroup and Field):**

```html
<fabric-field>
  <label slot="label" id="fruit-label">Favorite Fruit</label>
  <fabric-radio-group slot="input" name="fruit" aria-labelledby="fruit-label">
    <fabric-field label-position="after">
      <fabric-radio slot="input" id="apple" value="apple"></fabric-radio>
      <label slot="label" for="apple">Apple</label>
    </fabric-field>
    <fabric-field label-position="after">
      <fabric-radio slot="input" id="banana" value="banana" checked></fabric-radio> <!-- Default checked -->
      <label slot="label" for="banana">Banana</label>
    </fabric-field>
    <fabric-field label-position="after">
      <fabric-radio slot="input" id="orange" value="orange" disabled></fabric-radio>
      <label slot="label" for="orange">Orange (Disabled)</label>
    </fabric-field>
  </fabric-radio-group>
</fabric-field>
```

### Handling Events (JavaScript)

Radio button selections are typically handled by listening for the `change` event on the parent `<fabric-radio-group>`.

```javascript
const radioGroup = document.querySelector('fabric-radio-group[name="fruit"]');

if (radioGroup) {
  radioGroup.addEventListener('change', (event) => {
    // event.target is the radio group
    console.log(`Radio group changed. Selected value: ${event.target.value}`);
    // The actual radio that was checked can be found via event.target.checkedRadio
    console.log('Checked radio element:', event.target.checkedRadio);
  });
}
```
<!-- END-SECTION: Radio Usage -->

<!-- BEGIN-SECTION: Radio API -->
## Radio API Reference (fabric-radio)

Based on `Radio` class.

### Attributes & Properties

*   **`checked`**: `boolean` (default: `false`)
    *   Gets or sets the checked state. Only one radio in a named group can be checked.
*   **`disabled`**: `boolean` (default: `false`)
    *   Disables the radio button. Can also be inherited from a disabled `<fabric-radio-group>` or `<fabric-field>`.\*   **`required`**: `boolean` (default: `false`)
    *   Indicates that selection is required within the group. Usually set on the `<fabric-radio-group>`.\*   **`readonly`**: `boolean` (default: `false`)
    *   If true, the checked state cannot be changed by user interaction.
*   **`value`**: `string` (default: `"on"`)
    *   The value associated with this radio, submitted with form data if checked.
*   **`name`** (Readonly Property): `string`
    *   Gets the name of the radio group this radio belongs to.

### Events

*   **`change`**: `Event`
    *   Fired when the `checked` state changes due to user interaction. This typically bubbles up to and is handled by the parent `<fabric-radio-group>`.

### Slots

*   **(default)**: Label content for the radio button (use `<fabric-field>` for better structure and accessibility).
*   **`checked-indicator`**: Custom content/icon to display when checked.

### CSS Parts

*   **`control`**: The circular radio input container element.
*   **`label`**: The container for the default slot content (label).
*   **`indicator`**: The circular indicator icon/element within the control (visible when checked).

```css
/* Example: Style the radio control */
fabric-radio::part(control) {
  border-color: blue;
}

/* Example: Style the inner indicator */
fabric-radio::part(indicator) {
  background-color: blue;
}
```
<!-- END-SECTION: Radio API -->

<!-- BEGIN-SECTION: Radio Styling -->
## Radio Styling (fabric-radio)

Customize appearance using CSS targeting the host element or the exposed CSS Parts.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralForeground1`, `--colorNeutralForegroundDisabled`: Text color for label.
    *   `--colorNeutralStrokeAccessible`, `--colorNeutralStrokeDisabled`: Border color for the `control`.\*   `--colorCompoundBrandStroke`, `--colorCompoundBrandStrokeHover`, `--colorCompoundBrandStrokePressed`: Colors for the `control` border and `indicator` when checked.
    *   `--borderRadiusCircular`: Used for control and indicator shape.
    *   `--strokeWidthThin`: Border thickness.
*   Refer to `radio.styles.ts` for detailed token usage and state variations.
<!-- END-SECTION: Radio Styling -->

<!-- BEGIN-SECTION: Radio Accessibility -->
## Radio Accessibility (fabric-radio)

*   Renders with `role="radio"`.
*   Manages `aria-checked` state (`"true"`, `"false"`).
*   Manages `aria-disabled` and `aria-required` based on attributes (often inherited from group).
*   Requires an associated label, typically provided via `<fabric-field>` or `aria-labelledby` on the group.
*   Keyboard interaction (Spacebar to select, Arrow keys to navigate group) is primarily handled by the parent `<fabric-radio-group>`.
<!-- END-SECTION: Radio Accessibility -->
