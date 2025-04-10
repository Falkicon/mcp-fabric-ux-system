# Radio (`<fluent-radio>`)

Represents a single radio button within a `<fluent-radio-group>`.

## Usage

Place `<fluent-radio>` elements inside a `<fluent-radio-group>`. Associate labels using `<fluent-field>` or `aria-labelledby`.

**Importing:**

```javascript
// Typically imported alongside RadioGroup:
import '@fluentui/web-components/radio-group/define.js';
// Or individually:
// import '@fluentui/web-components/radio/define.js';
```

**Example (within RadioGroup and Field):**

```html
<fluent-field>
  <label slot="label" id="fruit-label">Favorite Fruit</label>
  <fluent-radio-group slot="input" name="fruit" aria-labelledby="fruit-label">
    <fluent-field label-position="after">
      <fluent-radio slot="input" id="apple" value="apple"></fluent-radio>
      <label slot="label" for="apple">Apple</label>
    </fluent-field>
    <fluent-field label-position="after">
      <fluent-radio slot="input" id="banana" value="banana" checked></fluent-radio> <!-- Default checked -->
      <label slot="label" for="banana">Banana</label>
    </fluent-field>
    <fluent-field label-position="after">
      <fluent-radio slot="input" id="orange" value="orange" disabled></fluent-radio>
      <label slot="label" for="orange">Orange (Disabled)</label>
    </fluent-field>
  </fluent-radio-group>
</fluent-field>
```

## API Reference (`<fluent-radio>`)

Based on `Radio` class.

### Attributes & Properties

*   **`checked`**: `boolean` (default: `false`)
    *   Gets or sets the checked state. Only one radio in a named group can be checked.
*   **`disabled`**: `boolean` (default: `false`)
    *   Disables the radio button. Can also be inherited from a disabled `<fluent-radio-group>` or `<fluent-field>`.
*   **`required`**: `boolean` (default: `false`)
    *   Indicates that selection is required within the group. Usually set on the `<fluent-radio-group>`.
*   **`readonly`**: `boolean` (default: `false`)
    *   If true, the checked state cannot be changed by user interaction.
*   **`value`**: `string` (default: `"on"`)
    *   The value associated with this radio, submitted with form data if checked.
*   **`name`** (Readonly Property): `string`
    *   Gets the name of the radio group this radio belongs to.

### Events

*   **`change`**: `Event`
    *   Fired when the `checked` state changes due to user interaction. This typically bubbles up to the parent radio group.

### Slots

*   **(default)**: Label content for the radio button (use `<fluent-field>` for better structure and accessibility).
*   **`checked-indicator`**: Custom content/icon to display when checked.

### CSS Parts

*   **`control`**: The circular radio input container element.
*   **`label`**: The container for the default slot content (label).
*   **`indicator`**: The circular indicator icon/element within the control (visible when checked).

```css
/* Example: Style the radio control */
fluent-radio::part(control) {
  border-color: blue;
}

/* Example: Style the inner indicator */
fluent-radio::part(indicator) {
  background-color: blue;
}
```

## Styling

Customize appearance using CSS targeting the host element or the exposed CSS Parts.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralForeground1`, `--colorNeutralForegroundDisabled`: Text color for label.
    *   `--colorNeutralStrokeAccessible`, `--colorNeutralStrokeDisabled`: Border color for the `control`.
    *   `--colorCompoundBrandStroke`, `--colorCompoundBrandStrokeHover`, `--colorCompoundBrandStrokePressed`: Colors for the `control` border and `indicator` when checked.
    *   `--borderRadiusCircular`: Used for control and indicator shape.
    *   `--strokeWidthThin`: Border thickness.
*   Refer to `radio.styles.ts` for detailed token usage and state variations.

## Accessibility

*   Renders with `role="radio"`.
*   Manages `aria-checked` state (`"true"`, `"false"`).
*   Manages `aria-disabled` and `aria-required` based on attributes (often inherited from group).
*   Requires an associated label, typically provided via `<fluent-field>` or `aria-labelledby` on the group.
*   Keyboard interaction (Spacebar to select, Arrow keys to navigate group) is primarily handled by the parent `<fluent-radio-group>`.
