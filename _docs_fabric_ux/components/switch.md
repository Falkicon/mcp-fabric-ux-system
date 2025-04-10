---
id: components_switch
title: Switch
description: Displays a toggle switch for turning an option on or off.
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/switch
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Switch (`<fabric-switch>`)

Displays a toggle switch allowing users to turn an option on or off.

## Usage

**Importing:**

```javascript
import '@fabric-msft/web-components/switch/define.js';

// Optional: Import the types for Typescript
import type { Switch } from '@fabric-msft/web-components/switch';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Basic Switch -->
<fabric-switch id="basic-switch">Enable Feature</fabric-switch>

<!-- Checked by default -->
<fabric-switch checked>Notifications On</fabric-switch>

<!-- With Checked/Unchecked Messages -->
<fabric-switch>
  <span slot="checked-message">On</span>
  <span slot="unchecked-message">Off</span>
  Power
</fabric-switch>

<!-- Disabled -->
<fabric-switch disabled>Cannot toggle (disabled)</fabric-switch>
<fabric-switch checked disabled>Cannot toggle (disabled)</fabric-switch>

<!-- Required -->
<fabric-switch required>I agree (required)</fabric-switch>

<!-- With Fabric Field (Recommended for labeling) -->
<fabric-field label-position="after">
  <label slot="label" for="dark-mode">Dark Mode</label>
  <fabric-switch slot="input" id="dark-mode"></fabric-switch>
</fabric-field>

<!-- Readonly -->
<fabric-switch readonly checked>Readonly On</fabric-switch>
```

### Handling Events (JavaScript)

The switch emits a `change` event when its `checked` state is toggled by user interaction.

```javascript
const basicSwitch = document.getElementById('basic-switch');

if (basicSwitch) {
  basicSwitch.addEventListener('change', (event) => {
    const switchElement = event.target;
    console.log(`Switch changed. Checked: ${switchElement.checked}`);
    // Add logic to react to the state change
  });
}
```

## API Reference (`<fabric-switch>`)

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

*   **(default)**: Label content for the switch (use `<fabric-field>` for better structure and accessibility).
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
fabric-switch::part(track) {
  border: 1px solid grey;
}

/* Example: Style the thumb when checked */
fabric-switch([aria-checked="true"])::part(thumb) {
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
*   When not used within a `<fabric-field>`, ensure the label content provided in the default slot is correctly associated (often implicitly, but `<fabric-field>` is more robust).
*   Keyboard interaction includes Spacebar or Enter to toggle checked state. 