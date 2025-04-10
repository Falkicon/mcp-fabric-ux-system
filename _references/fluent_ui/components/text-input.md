# Text Input (`<fluent-text-input>`)

Displays a single-line text input field.

## Usage

**Importing:**

```javascript
import '@fluentui/web-components/text-input/define.js';
```

**Examples:**

```html
<!-- Basic TextInput -->
<fluent-text-input placeholder="Enter text here"></fluent-text-input>

<!-- With Fluent Field (Recommended) -->
<fluent-field>
  <label slot="label" for="my-input">Your Name</label>
  <fluent-text-input slot="input" id="my-input" required></fluent-text-input>
</fluent-field>

<!-- Different Appearances -->
<fluent-text-input appearance="outline" placeholder="Outline"></fluent-text-input>
<fluent-text-input appearance="filled-lighter" placeholder="Filled Lighter"></fluent-text-input>
<fluent-text-input appearance="filled-darker" placeholder="Filled Darker"></fluent-text-input>

<!-- With Start/End Content -->
<fluent-text-input placeholder="Search">
  <svg slot="start" width="16" height="16"><path d="..."/></svg>
  <fluent-button slot="end" appearance="transparent" icon-only aria-label="Clear search">
    <svg width="16" height="16"><path d="..."/></svg>
  </fluent-button>
</fluent-text-input>

<!-- Input Types -->
<fluent-text-input type="email" placeholder="Email"></fluent-text-input>
<fluent-text-input type="password" placeholder="Password"></fluent-text-input>
<fluent-text-input type="number" placeholder="Number"></fluent-text-input>

<!-- Disabled / Readonly -->
<fluent-text-input disabled value="Cannot edit"></fluent-text-input>
<fluent-text-input readonly value="Cannot change"></fluent-text-input>
```

## API Reference (`<fluent-text-input>`)

Based on `TextInput` class extending `TextInputBase`.

### Attributes & Properties

Inherits standard HTML `<input>` attributes, including:

*   **`value`**: `string` - Gets or sets the current value.
*   **`type`**: `"text" | "email" | "number" | "password" | "search" | "tel" | "url" | ...` (default: `"text"`)
*   **`placeholder`**: `string` - Placeholder text.
*   **`disabled`**: `boolean`
*   **`required`**: `boolean`
*   **`readonly`**: `boolean`
*   **`maxlength`**, **`minlength`**: `number`
*   **`pattern`**: `string` - Regex pattern for validation.
*   **`size`**: `number` - Legacy attribute controlling visible width (CSS is preferred).
*   **`spellcheck`**: `boolean`
*   **`name`**: `string` - Used for form submission.
*   **`list`**: `string` - ID of a `<datalist>` element.
*   **`autocomplete`**: `string`

Adds Fluent UI specific attributes:

*   **`appearance`**: `"outline" | "filled-lighter" | "filled-darker"` (default: `"outline"`)
    *   Defines the visual style of the input field.

### Events

Inherits standard HTML `<input>` events:

*   **`input`**: Fired synchronously when the value changes.
*   **`change`**: Fired when the value is committed by the user (e.g., on blur).
*   *(Focus, blur, keyboard events, etc.)*

### Slots

*   **`start`**: Content placed visually before the input field (e.g., icons).
*   **`end`**: Content placed visually after the input field (e.g., icons, clear buttons).

### CSS Parts

*   **`root`**: The outermost container element.
*   **`control`**: The native `<input>` element itself.
*   **`content`**: The container element wrapping the `start`, `input` (`control`), and `end` elements.

```css
/* Example: Style the root container */
fluent-text-input::part(root) {
  padding: 5px;
}

/* Example: Style the native input element */
fluent-text-input::part(control) {
  font-family: monospace;
}
```

## Styling

Customize appearance using CSS targeting the host element or the exposed CSS Parts.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralForeground1`: Input text color.
    *   `--colorNeutralForeground4`: Placeholder text color.
    *   `--colorNeutralBackground1`, `--colorSubtleBackground`, `--colorTransparentBackground`: Background colors based on `appearance`.
    *   `--colorNeutralStroke1`, `--colorNeutralStrokeAccessible`: Border colors based on `appearance` and state (hover, focus).
    *   `--borderRadiusMedium`: Controls corner rounding.
    *   `--strokeWidthThin`: Border thickness.
    *   `--fontSizeBase300`, `--lineHeightBase300`: Text size and line height.
    *   Spacing tokens (`--spacingHorizontal...`) for padding and gaps between content/start/end slots.
*   Refer to `text-input.styles.ts` for detailed token mapping and state variations.

## Accessibility

*   Renders a native `<input>` element, inheriting its baseline accessibility.
*   Crucially relies on being wrapped by `<fluent-field>` to associate the visible `<label>` correctly for screen readers.
*   Manages `aria-disabled`, `aria-required`, `aria-readonly` based on attributes.
*   Ensure `placeholder` text is supplemental and not a replacement for a visible label.
