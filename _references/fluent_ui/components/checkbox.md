# Checkbox (`<fluent-checkbox>`)

Displays a checkbox input allowing users to select one or more options.

## Usage

**Importing:**

```javascript
import '@fluentui/web-components/checkbox/define.js';
```

**Examples:**

```html
<!-- Basic Checkbox -->
<fluent-checkbox>Subscribe to newsletter</fluent-checkbox>

<!-- Checked by default -->
<fluent-checkbox checked>Enable notifications</fluent-checkbox>

<!-- Disabled -->
<fluent-checkbox disabled>Cannot select (disabled)</fluent-checkbox>
<fluent-checkbox checked disabled>Cannot deselect (disabled)</fluent-checkbox>

<!-- Indeterminate State -->
<fluent-checkbox id="indeterminate-checkbox">Partial selection</fluent-checkbox>
<script>
  document.getElementById('indeterminate-checkbox').indeterminate = true;
</script>

<!-- Required -->
<fluent-checkbox required>I agree (required)</fluent-checkbox>

<!-- With Fluent Field (Recommended for labeling) -->
<fluent-field label-position="after">
  <label slot="label" for="terms-cb">Accept Terms</label>
  <fluent-checkbox slot="input" id="terms-cb" required></fluent-checkbox>
</fluent-field>

<!-- Readonly -->
<fluent-checkbox readonly checked>Readonly Checked</fluent-checkbox>
```

## API Reference (`<fluent-checkbox>`)

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

*   **(default)**: Label content for the checkbox (use `<fluent-field>` for better structure and accessibility).
*   **`checked-indicator`**: Custom content/icon to display when checked.
*   **`indeterminate-indicator`**: Custom content/icon to display when indeterminate.

### CSS Parts

*   **`control`**: The square checkmark container element.
*   **`label`**: The container for the default slot content (label).
*   **`indicator`**: The checkmark or indeterminate indicator icon/element within the control.

```css
/* Example: Style the checkmark control */
fluent-checkbox::part(control) {
  border-radius: 2px;
  border-width: 2px;
}

/* Example: Style the label part */
fluent-checkbox::part(label) {
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
*   When not used within a `<fluent-field>`, ensure the label content provided in the default slot is correctly associated (often implicitly, but `<fluent-field>` is more robust).
*   Keyboard interaction includes Spacebar to toggle checked state.
