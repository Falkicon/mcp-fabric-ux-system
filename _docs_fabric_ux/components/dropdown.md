---
id: components_dropdown
title: Dropdown
description: Displays a listbox or combobox for selecting options.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/dropdown
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Dropdown (`<fabric-dropdown>`)

Displays a listbox where users can select a single option, or a combobox allowing freeform input and selection.

## Usage

**Importing:**

```javascript
// Registers <fabric-dropdown> and <fabric-option>
import '@fabric-msft/web-components/dropdown/define.js';
// Or individually if preferred:
// import '@fabric-msft/web-components/dropdown/dropdown.define.js';
// import '@fabric-msft/web-components/option/define.js';

// Optional: Import the types for Typescript
import type { Dropdown } from '@fabric-msft/web-components/dropdown';
import type { Option } from '@fabric-msft/web-components/option';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

Populate the dropdown with `<fabric-option>` elements.

```html
<!-- Standard Dropdown (type="list" - default) -->
<fabric-dropdown id="standard-dd">
  <fabric-option value="apple">Apple</fabric-option>
  <fabric-option value="banana">Banana</fabric-option>
  <fabric-option value="orange" selected>Orange</fabric-option>
  <fabric-option value="grape" disabled>Grape (Disabled)</fabric-option>
</fabric-dropdown>

<!-- Combobox (type="combobox") -->
<fabric-field>
  <label slot="label" for="fruit-combobox">Search or Select Fruit</label>
  <fabric-dropdown slot="input" type="combobox" id="fruit-combobox" placeholder="Type or select...">
    <!-- Options can be dynamically filtered based on input -->
    <fabric-option value="apple">Apple</fabric-option>
    <fabric-option value="banana">Banana</fabric-option>
    <fabric-option value="orange">Orange</fabric-option>
  </fabric-dropdown>
</fabric-field>

<!-- With Fabric Field (Recommended for labeling) -->
<fabric-field>
  <label slot="label" for="fruit-dropdown">Select a Fruit</label>
  <fabric-dropdown slot="input" id="fruit-dropdown">
    <fabric-option value="">-- Select --</fabric-option>
    <fabric-option value="apple">Apple</fabric-option>
    <fabric-option value="banana">Banana</fabric-option>
    <fabric-option value="orange">Orange</fabric-option>
  </fabric-dropdown>
</fabric-field>

<!-- Different Appearances -->
<fabric-dropdown appearance="outline" value="apple">
  <fabric-option value="apple">Outline</fabric-option>
  ...
</fabric-dropdown>
<fabric-dropdown appearance="filled-lighter" value="apple">
  <fabric-option value="apple">Filled Lighter</fabric-option>
  ...
</fabric-dropdown>
<fabric-dropdown appearance="filled-darker" value="apple">
  <fabric-option value="apple">Filled Darker</fabric-option>
  ...
</fabric-dropdown>

<!-- Disabled Dropdown -->
<fabric-dropdown disabled value="apple">
  <fabric-option value="apple">Cannot Change</fabric-option>
  ...
</fabric-dropdown>
```

### Handling Events (JavaScript)

The dropdown emits `change` when an option is selected and `input` when text is typed in a combobox.

```javascript
const standardDropdown = document.getElementById('standard-dd');
const combobox = document.getElementById('fruit-combobox');

if (standardDropdown) {
  standardDropdown.addEventListener('change', (event) => {
    console.log(`Dropdown value changed: ${event.target.value}`);
    // Add logic based on selected value
  });
}

if (combobox) {
  combobox.addEventListener('input', (event) => {
    const inputValue = event.target.value;
    console.log(`Combobox input: ${inputValue}`);
    // Implement option filtering logic here based on inputValue
    // Example: Fetch options or hide/show existing <fabric-option> elements
  });

  combobox.addEventListener('change', (event) => {
    console.log(`Combobox selection changed: ${event.target.value}`);
    // Add logic based on final selected value (might be different from input)
  });
}
```

### Combobox Behavior

Setting `type="combobox"` enables freeform text input in the control element. This allows users to type directly to filter the list of options or enter a value not present in the list.

*   **Filtering:** The component itself does **not** automatically filter the options based on input. You typically need to listen to the `input` event on the combobox and dynamically update the slotted `<fabric-option>` elements based on the current input value.
*   **Freeform Input:** Allows users to enter values not in the list. The `value` property will reflect the typed text if no matching option is selected.

## API Reference (`<fabric-dropdown>`)

Based on `Dropdown` class extending `DropdownBase`.

### Attributes & Properties

*   **`type`**: `"list" | "combobox"` (default: `"list"`)
    *   Determines if the component behaves as a standard dropdown list or a combobox allowing text input.
*   **`value`**: `string`
    *   Gets or sets the value of the selected option or the text input value (for combobox).
*   **`disabled`**: `boolean` (default: `false`)
    *   Disables the dropdown.
*   **`required`**: `boolean` (default: `false`)
    *   Indicates that user selection is required before form submission.
*   **`appearance`**: `"outline" | "filled-lighter" | "filled-darker"` (default: `"outline"`)
    *   Defines the visual style of the dropdown trigger button.
*   **`open`**: `boolean` (default: `false`)
    *   Controls the open/closed state of the listbox popup.
*   **`position`**: `"above" | "below"`
    *   Hints at the preferred position of the listbox popup relative to the button. Actual position may vary based on available space and anchor positioning logic.
*   **`name`**: `string`
    *   Name submitted with form data.
*   **`selectedIndex`** (Property only): `number`
    *   Gets or sets the index of the selected option.
*   **`selectedOption`** (Property only): `FabricOption | undefined`
    *   Gets the currently selected `<fabric-option>` element.

### Events

*   **`change`**: `Event`
    *   Fired when the selected value changes due to user interaction (selecting an option).
*   **`input`**: `Event`
    *   Fired when the text value changes in the input field (primarily for `type="combobox"`). Use this event to implement filtering.

### Slots

*   **(default)**: Accepts one or more `<fabric-option>` elements.
*   **`button`**: Content displayed in the dropdown trigger button (defaults to selected option's display value).
*   **`indicator`**: Custom expand/collapse indicator icon (replaces default chevron).

### CSS Parts

*   **`control`**: The dropdown trigger button element.
*   **`listbox`**: The popup `<div>` element containing the options list (role="listbox").
*   **`indicator`**: The expand/collapse indicator icon within the button.

```css
/* Example: Style the trigger button */
fabric-dropdown::part(control) {
  border-style: dashed;
}

/* Example: Style the popup listbox */
fabric-dropdown::part(listbox) {
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  max-height: 300px; /* Example constraint */
}
```

## Styling

Customize appearance using CSS targeting the host element or the exposed CSS Parts.

*   **Key Design Tokens Used (Examples):**
    *   Similar tokens as `<fabric-text-input>` for the `control` part based on `appearance` (background, border, text color).
    *   `--colorNeutralBackground1`, `--colorNeutralStroke1`: Background and border for the `listbox` popup.
    *   `--borderRadiusMedium`: Corner rounding for control and listbox.
    *   `--fontSizeBase300`, `--lineHeightBase300`: Text size.
    *   `--colorNeutralForeground1`: Text color in the listbox.
    *   Spacing tokens (`--spacingHorizontal...`) for padding in control and listbox.
*   Refer to `dropdown.styles.ts` and potentially `option.styles.ts` for detailed token usage.

## Accessibility

*   Renders the trigger element with `role="combobox"` (regardless of `type`).
*   Manages `aria-haspopup="listbox"` and `aria-expanded`.
*   The input field within the combobox control should have `aria-autocomplete` (e.g., `"list"` or `"both"`) reflecting the filtering behavior implemented.
*   The popup list has `role="listbox"`.
*   Slotted `<fabric-option>` elements handle `role="option"` and `aria-selected` states.
*   Manages `aria-disabled` and `aria-required` based on attributes.
*   Requires association with a visible `<label>` via `<fabric-field>` for proper context.
*   Supports keyboard navigation (Arrow keys, Home, End, Enter, Space, Escape) to open, close, and select options.

## Dependencies

*   Relies on the HTML Popover API (`[popover]`) or its polyfill for the listbox popup behavior.
*   May use CSS Anchor Positioning API or its polyfill for positioning the popup.
*   Ensure appropriate polyfills are loaded for broader browser compatibility (see [Polyfilling Guide](../../guides/polyfilling.md)). 