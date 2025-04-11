---
id: components_slider
title: Slider
description: Allows selecting a value from a specified range.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/slider
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Slider (`<fabric-slider>`)

Allows selecting a value from a specified range.

## Usage

**Importing:**

```javascript
import '@fabric-msft/web-components/slider/define.js';

// Optional: Import the types for Typescript
import type { Slider } from '@fabric-msft/web-components/slider';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Basic Slider -->
<label for="basic-slider">Value: <span id="basic-val">50</span></label>
<fabric-slider id="basic-slider" value="50"></fabric-slider>

<!-- Slider with Min/Max/Step -->
<label for="step-slider">Value: <span id="step-val">10</span></label>
<fabric-slider id="step-slider" min="0" max="20" step="2" value="10"></fabric-slider>

<!-- Vertical Slider -->
<div style="display: flex; gap: 10px; height: 150px;">
  <fabric-slider orientation="vertical" value="25"></fabric-slider>
  <fabric-slider orientation="vertical" value="75" step="25"></fabric-slider>
</div>

<!-- Different Sizes -->
<fabric-slider size="small" value="30"></fabric-slider>
<fabric-slider size="medium" value="60"></fabric-slider> <!-- Default -->

<!-- Disabled / Readonly -->
<fabric-slider disabled value="40"></fabric-slider>
<fabric-slider readonly value="80"></fabric-slider>

<!-- With Field (Recommended for Labeling) -->
<fabric-field>
    <fabric-label slot="label" for="field-slider">Volume</fabric-label>
    <fabric-slider slot="input" id="field-slider" value="60"></fabric-slider>
</fabric-field>
```

### Handling Events (JavaScript)

Listen for the `input` event for real-time value changes during interaction, or `change` for the final committed value.

```javascript
const basicSlider = document.getElementById('basic-slider');
const basicValSpan = document.getElementById('basic-val');
const stepSlider = document.getElementById('step-slider');
const stepValSpan = document.getElementById('step-val');

if (basicSlider && basicValSpan) {
  basicSlider.addEventListener('input', (event) => {
    // Update label during drag/interaction
    basicValSpan.textContent = event.target.value;
  });
  basicSlider.addEventListener('change', (event) => {
    // Fired when interaction ends (e.g., mouse up)
    console.log(`Basic slider final value: ${event.target.value}`);
  });
}

if (stepSlider && stepValSpan) {
  stepSlider.addEventListener('input', (event) => {
    stepValSpan.textContent = event.target.value;
  });
}
```

## API Reference (`<fabric-slider>`)

Based on `Slider` class.

### Attributes & Properties

*   **`value`**: `string | number`
    *   Gets or sets the current value of the slider.
*   **`min`**: `number` (default: `0`)
    *   The minimum allowed value.
*   **`max`**: `number` (default: `100`)
    *   The maximum allowed value.
*   **`step`**: `number` (default: `1`)
    *   Specifies the granularity that the value must adhere to.
*   **`orientation`**: `"horizontal" | "vertical"` (default: `"horizontal"`)
    *   Sets the orientation of the slider.
*   **`disabled`**: `boolean` (default: `false`)
    *   Disables the slider.
*   **`readonly`**: `boolean` (default: `false`)
    *   If true, the value cannot be changed by user interaction.
*   **`required`**: `boolean` (default: `false`)
    *   Indicates that user input is required before form submission (slider must be interacted with).
*   **`size`**: `"small" | "medium"` (default: `"medium"`)
    *   Adjusts the size (primarily thickness) of the slider track and thumb.
*   **`name`**: `string`
    *   Name submitted with form data.

### Events

*   **`input`**: `Event` - Fired continuously while the value is changing (e.g., during drag).
*   **`change`**: `Event` - Fired when the value change is committed (e.g., on release after drag).

### Slots

None reported in typical structure, but check `.template.ts` if tick marks or other elements are supported via slots.

### CSS Parts

*   **`track`**: The main track element the thumb slides along.
*   **`thumb-container`**: The container for the thumb element (might be the same as track in some impl).
*   **`thumb`**: The draggable thumb element representing the current value.

```css
/* Example: Style the track */
fabric-slider::part(track) {
  background: lightblue;
  height: 8px;
}

/* Example: Style the thumb */
fabric-slider::part(thumb) {
  background: blue;
  border-radius: 2px;
  border: 1px solid navy;
}
```

## Styling

Customize appearance using CSS targeting the host element or the exposed CSS Parts.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralBackground1`, `--colorNeutralBackgroundDisabled`: Track background color.
    *   `--colorCompoundBrandBackground`, `--colorCompoundBrandBackgroundHover`, `--colorCompoundBrandBackgroundPressed`: Color of the track portion representing the value (up to the thumb).
    *   `--colorNeutralForeground1`: Thumb color.
    *   `--colorNeutralStroke1`, `--colorNeutralStrokeDisabled`: Thumb border color.
    *   `--borderRadiusCircular`: Rounding for track and thumb.
    *   Sizing tokens controlling track/thumb dimensions based on `size` and `orientation`.
*   Refer to `slider.styles.ts` for detailed token usage and state variations.

## Accessibility

*   Sets `role="slider"`.
*   Manages `aria-orientation`, `aria-readonly`, `aria-disabled` based on attributes.
*   Manages `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
*   Requires an accessible label provided via `aria-label`, `aria-labelledby`, or by using `<fabric-field>`.
*   Supports keyboard navigation (Arrow keys, Home, End, PageUp/Down) to change the value. 