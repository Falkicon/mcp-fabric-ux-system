# Slider (`<fluent-slider>`)

Allows selecting a value from a specified range.

## Usage

**Importing:**

```javascript
import '@fluentui/web-components/slider/define.js';
```

**Examples:**

```html
<!-- Basic Slider -->
<label for="basic-slider">Value: <span id="basic-val">50</span></label>
<fluent-slider id="basic-slider" value="50"></fluent-slider>

<!-- Slider with Min/Max/Step -->
<label for="step-slider">Value: <span id="step-val">10</span></label>
<fluent-slider id="step-slider" min="0" max="20" step="2" value="10"></fluent-slider>

<!-- Vertical Slider -->
<div style="display: flex; gap: 10px; height: 150px;">
  <fluent-slider orientation="vertical" value="25"></fluent-slider>
  <fluent-slider orientation="vertical" value="75" step="25"></fluent-slider>
</div>

<!-- Different Sizes -->
<fluent-slider size="small" value="30"></fluent-slider>
<fluent-slider size="medium" value="60"></fluent-slider> <!-- Default -->

<!-- Disabled / Readonly -->
<fluent-slider disabled value="40"></fluent-slider>
<fluent-slider readonly value="80"></fluent-slider>

<!-- With Field (Recommended for Labeling) -->
<fluent-field>
    <fluent-label slot="label" for="field-slider">Volume</fluent-label>
    <fluent-slider slot="input" id="field-slider" value="60"></fluent-slider>
</fluent-field>

<script>
  // Example script to update label dynamically
  document.getElementById('basic-slider').addEventListener('input', (e) => {
    document.getElementById('basic-val').textContent = e.target.value;
  });
  document.getElementById('step-slider').addEventListener('input', (e) => {
    document.getElementById('step-val').textContent = e.target.value;
  });
</script>
```

## API Reference (`<fluent-slider>`)

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
fluent-slider::part(track) {
  background: lightblue;
  height: 8px;
}

/* Example: Style the thumb */
fluent-slider::part(thumb) {
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
*   Requires an accessible label provided via `aria-label`, `aria-labelledby`, or by using `<fluent-field>`.
*   Supports keyboard navigation (Arrow keys, Home, End, PageUp/Down) to change the value.
