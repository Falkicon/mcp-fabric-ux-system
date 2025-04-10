# Dropdown (`<fluent-dropdown>`)

Displays a listbox where users can select a single option, or a combobox allowing freeform input and selection.

## Usage

**Importing:**

```javascript
// Registers <fluent-dropdown> and <fluent-option>
import '@fluentui/web-components/dropdown/define.js';
// Or individually if preferred:
// import '@fluentui/web-components/dropdown/dropdown.define.js';
// import '@fluentui/web-components/option/define.js';
```

**Examples:**

Populate the dropdown with `<fluent-option>` elements.

```html
<!-- Standard Dropdown (type="list" - default) -->
<fluent-dropdown>
  <fluent-option value="apple">Apple</fluent-option>
  <fluent-option value="banana">Banana</fluent-option>
  <fluent-option value="orange" selected>Orange</fluent-option>
  <fluent-option value="grape" disabled>Grape (Disabled)</fluent-option>
</fluent-dropdown>

<!-- Combobox (type="combobox") -->
<fluent-field>
  <label slot="label" for="fruit-combobox">Search or Select Fruit</label>
  <fluent-dropdown slot="input" type="combobox" id="fruit-combobox" placeholder="Type or select...">
    <!-- Options can be dynamically filtered based on input -->
    <fluent-option value="apple">Apple</fluent-option>
    <fluent-option value="banana">Banana</fluent-option>
    <fluent-option value="orange">Orange</fluent-option>
  </fluent-dropdown>
</fluent-field>

<!-- With Fluent Field (Recommended for labeling) -->
<fluent-field>
  <label slot="label" for="fruit-dropdown">Select a Fruit</label>
  <fluent-dropdown slot="input" id="fruit-dropdown">
    <fluent-option value="">-- Select --</fluent-option>
    <fluent-option value="apple">Apple</fluent-option>
    <fluent-option value="banana">Banana</fluent-option>
    <fluent-option value="orange">Orange</fluent-option>
  </fluent-dropdown>
</fluent-field>

<!-- Different Appearances -->
<fluent-dropdown appearance="outline" value="apple">
  <fluent-option value="apple">Outline</fluent-option>
  ...
</fluent-dropdown>
<fluent-dropdown appearance="filled-lighter" value="apple">
  <fluent-option value="apple">Filled Lighter</fluent-option>
  ...
</fluent-dropdown>
<fluent-dropdown appearance="filled-darker" value="apple">
  <fluent-option value="apple">Filled Darker</fluent-option>
  ...
</fluent-dropdown>

<!-- Disabled Dropdown -->
<fluent-dropdown disabled value="apple">
  <fluent-option value="apple">Cannot Change</fluent-option>
  ...
</fluent-dropdown>
```

### Combobox Behavior

Setting `type="combobox"` enables freeform text input in the control element. This allows users to type directly to filter the list of options or enter a value not present in the list.

*   **Filtering:** The component itself does **not** automatically filter the options based on input. You typically need to listen to the `input` event on the combobox and dynamically update the slotted `<fluent-option>` elements based on the current input value.
*   **Freeform Input:** Allows users to enter values not in the list. The `value` property will reflect the typed text if no matching option is selected.

## API Reference (`<fluent-dropdown>`)

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
*   **`selectedOption`** (Property only): `FluentOption | undefined`
    *   Gets the currently selected `<fluent-option>` element.

### Events

*   **`change`**: `Event`
    *   Fired when the selected value changes due to user interaction (selecting an option).
*   **`input`**: `Event`
    *   Fired when the text value changes in the input field (primarily for `type="combobox"`). Use this event to implement filtering.

### Slots

*   **(default)**: Accepts one or more `<fluent-option>` elements.
*   **`button`**: Content displayed in the dropdown trigger button (defaults to selected option's display value).
*   **`indicator`**: Custom expand/collapse indicator icon (replaces default chevron).

### CSS Parts

*   **`control`**: The dropdown trigger button element.
*   **`listbox`**: The popup `<div>` element containing the options list (role="listbox").
*   **`indicator`**: The expand/collapse indicator icon within the button.

```css
/* Example: Style the trigger button */
fluent-dropdown::part(control) {
  border-style: dashed;
}

/* Example: Style the popup listbox */
fluent-dropdown::part(listbox) {
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  max-height: 300px; /* Example constraint */
}
```

## Styling

Customize appearance using CSS targeting the host element or the exposed CSS Parts.

*   **Key Design Tokens Used (Examples):**
    *   Similar tokens as `<fluent-text-input>` for the `control` part based on `appearance` (background, border, text color).
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
*   Slotted `<fluent-option>` elements handle `role="option"` and `aria-selected` states.
*   Manages `aria-disabled` and `aria-required` based on attributes.
*   Requires association with a visible `<label>` via `<fluent-field>` for proper context.
*   Supports keyboard navigation (Arrow keys, Home, End, Enter, Space, Escape) to open, close, and select options.

## Dependencies

*   Relies on the HTML Popover API (`[popover]`) or its polyfill for the listbox popup behavior.
*   May use CSS Anchor Positioning API or its polyfill for positioning the popup.
*   Ensure appropriate polyfills are loaded for broader browser compatibility (see [Polyfilling](../concepts/polyfilling.md)).
