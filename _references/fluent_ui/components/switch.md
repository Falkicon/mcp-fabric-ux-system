# Switch (`<fluent-switch>`)

Displays a toggle switch allowing users to turn an option on or off.

## Usage

**Importing:**

```javascript
import '@fluentui/web-components/switch/define.js';
```

**Examples:**

```html
<!-- Basic Switch -->
<fluent-switch>Enable Feature</fluent-switch>

<!-- Checked by default -->
<fluent-switch checked>Notifications On</fluent-switch>

<!-- With Checked/Unchecked Messages -->
<fluent-switch>
  <span slot="checked-message">On</span>
  <span slot="unchecked-message">Off</span>
  Power
</fluent-switch>

<!-- Disabled -->
<fluent-switch disabled>Cannot toggle (disabled)</fluent-switch>
<fluent-switch checked disabled>Cannot toggle (disabled)</fluent-switch>

<!-- Required -->
<fluent-switch required>I agree (required)</fluent-switch>

<!-- With Fluent Field (Recommended for labeling) -->
<fluent-field label-position="after">
  <label slot="label" for="dark-mode">Dark Mode</label>
  <fluent-switch slot="input" id="dark-mode"></fluent-switch>
</fluent-field>

<!-- Readonly -->
<fluent-switch readonly checked>Readonly On</fluent-switch>
```

## API Reference (`<fluent-switch>`)

Based on `Switch` class.

### Attributes & Properties

*   **`checked`**: `boolean` (default: `false`)
    *   Gets or sets the checked (on) state.
*   **`disabled`**: `boolean` (default: `false`)
    *   Disables the switch.
*   **`required`**: `boolean` (default: `false`)
    *   Indicates that user input is required before form submission.
*   **`readonly`**: `boolean` (default: `false`)
    *   Prevents user interaction from changing the checked state.
*   **`value`**: `string` (default: `"on"`)
    *   The value submitted with form data when the switch is checked.
*   **`name`**: `string`
    *   Name submitted with form data.

### Events

*   **`change`**: `Event`
    *   Fired when the `checked` state changes due to user interaction.

### Slots

*   **(default)**: Label content for the switch (use `<fluent-field>` for better structure and accessibility).
*   **`checked-message`**: Content displayed visually within the switch track when checked.
*   **`unchecked-message`**: Content displayed visually within the switch track when unchecked.

### CSS Parts

*   **`track`**: The background track element of the switch.
*   **`thumb`**: The sliding thumb element.
*   **`label`**: The container for the default slot content (label).
*   **`checked-message`**: The container for the `checked-message` slot content.
*   **`unchecked-message`**: The container for the `unchecked-message` slot content.

```css
/* Example: Style the track */
fluent-switch::part(track) {
  border: 1px solid grey;
}

/* Example: Style the thumb when checked */
fluent-switch([aria-checked="true"])::part(thumb) {
  background-color: green;
}
```

## Styling

Customize appearance using CSS targeting the host element or the exposed CSS Parts.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralBackground1`, `--colorNeutralBackground1Hover`, etc.: Background color for the track (unchecked state).
    *   `--colorCompoundBrandBackground`, `--colorCompoundBrandBackgroundHover`, etc.: Background color for the track (checked state).
    *   `--colorNeutralStrokeAccessible`, `--colorNeutralStrokeAccessibleHover`, etc.: Border color for the track.
    *   `--colorNeutralForeground1`: Color for the thumb.
    *   `--colorNeutralForegroundOnBrand`: Color for checked/unchecked messages when checked.
    *   `--borderRadiusCircular`: Used for track and thumb shape.
    *   Sizing/padding tokens for track height, width, thumb size.
*   Refer to `switch.styles.ts` for detailed token usage and state variations.

## Accessibility

*   Renders with `role="switch"`.
*   Manages `aria-checked` state (`"true"`, `"false"`).
*   Manages `aria-disabled`, `aria-required`, `aria-readonly` based on attributes.
*   When not used within a `<fluent-field>`, ensure the label content provided in the default slot is correctly associated (often implicitly, but `<fluent-field>` is more robust).
*   Keyboard interaction includes Spacebar or Enter to toggle checked state.
