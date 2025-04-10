# Label (`<fluent-label>`)

Displays text used to label form elements or other UI components.

## Usage

Most often used within the `label` slot of a `<fluent-field>` to associate it with an input.

**Importing:**

```javascript
import '@fluentui/web-components/label/define.js';
// Also needed for context:
import '@fluentui/web-components/field/define.js';
import '@fluentui/web-components/text-input/define.js';
```

**Examples:**

```html
<!-- Used within Field (Recommended) -->
<fluent-field>
  <fluent-label slot="label" for="my-input" required>Input Label</fluent-label>
  <fluent-text-input slot="input" id="my-input"></fluent-text-input>
</fluent-field>

<!-- Standalone Label (Requires manual association if for an input) -->
<fluent-label size="large" weight="semibold">Large Semibold Label</fluent-label>
<br/>
<fluent-label disabled>Disabled Label</fluent-label>
```

## API Reference (`<fluent-label>`)

Based on `Label` class.

### Attributes & Properties

Inherits standard HTML `<label>` attributes:

*   **`for`**: `string` - The `id` of the form control this label is associated with.

Adds Fluent UI specific attributes:

*   **`size`**: `"small" | "medium" | "large"` (default: `"medium"`)
    *   Sets the font size.
*   **`weight`**: `"regular" | "semibold"` (default: `"regular"`)
    *   Sets the font weight.
*   **`disabled`**: `boolean` (default: `false`)
    *   Applies disabled styling (e.g., color).
*   **`required`**: `boolean` (default: `false`)
    *   Visually indicates that the associated input is required (often shows `*`). This attribute is often preferably set on the parent `<fluent-field>` or the input itself.

### Events

None specific to this component (inherits standard element events).

### Slots

*   **(default)**: The text content of the label.

### CSS Parts

*   **`required-indicator`**: The `<span>` element displaying the required indicator (`*`).

```css
/* Example: Style the required indicator */
fluent-label::part(required-indicator) {
  color: red;
  margin-left: 2px;
}
```

## Styling

Controls the visual presentation of label text.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralForeground1`, `--colorNeutralForegroundDisabled`: Text color.
    *   `--colorCompoundBrandForeground1`: Color for the required indicator (`*`).
    *   Font tokens (`--fontSizeBase...`, `--lineHeightBase...`) corresponding to the `size` attribute.
    *   Font weight tokens (`--fontWeightRegular`, `--fontWeightSemibold`) corresponding to the `weight` attribute.
*   Refer to `label.styles.ts` for detailed token usage.

## Accessibility

*   Renders a native `<label>` element (or provides equivalent semantics).
*   The `for` attribute is crucial for programmatically associating the label with its corresponding form control, enabling screen readers to announce the label when the control receives focus.
*   Using `<fluent-label>` within the `label` slot of `<fluent-field>` automatically handles this association correctly.
