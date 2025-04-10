# Textarea (`<fluent-textarea>`)

Displays a multi-line plain-text editing control.

## Usage

**Importing:**

```javascript
import '@fluentui/web-components/textarea/define.js';
```

**Examples:**

```html
<!-- Basic Textarea -->
<fluent-textarea placeholder="Enter comments here"></fluent-textarea>

<!-- With Fluent Field (Recommended) -->
<fluent-field>
  <label slot="label" for="my-textarea">Description</label>
  <fluent-textarea slot="input" id="my-textarea" required></fluent-textarea>
</fluent-field>

<!-- Different Appearances -->
<fluent-textarea appearance="outline" placeholder="Outline"></fluent-textarea>
<fluent-textarea appearance="filled-lighter" placeholder="Filled Lighter"></fluent-textarea>
<fluent-textarea appearance="filled-darker" placeholder="Filled Darker"></fluent-textarea>

<!-- Sizing and Resizing -->
<fluent-textarea rows="5" cols="30" placeholder="Fixed rows/cols"></fluent-textarea>
<fluent-textarea resize="both" placeholder="Resize both"></fluent-textarea>
<fluent-textarea resize="vertical" placeholder="Resize vertical"></fluent-textarea>
<fluent-textarea resize="horizontal" placeholder="Resize horizontal"></fluent-textarea>
<fluent-textarea resize="none" placeholder="No resize"></fluent-textarea>

<!-- Disabled / Readonly -->
<fluent-textarea disabled>Cannot edit</fluent-textarea>
<fluent-textarea readonly>Cannot change</fluent-textarea>
```

## API Reference (`<fluent-textarea>`)

Based on `Textarea` class extending `TextareaBase`.

### Attributes & Properties

Inherits standard HTML `<textarea>` attributes, including:

*   **`value`**: `string` - Gets or sets the current value.
*   **`placeholder`**: `string` - Placeholder text.
*   **`disabled`**: `boolean`
*   **`required`**: `boolean`
*   **`readonly`**: `boolean`
*   **`rows`**: `number` - Visible number of text lines.
*   **`cols`**: `number` - Visible width of the text control.
*   **`maxlength`**, **`minlength`**: `number`
*   **`spellcheck`**: `boolean`
*   **`name`**: `string` - Used for form submission.
*   **`wrap`**: `"soft" | "hard" | "off"` - How the value is wrapped.

Adds Fluent UI specific attributes:

*   **`appearance`**: `"outline" | "filled-lighter" | "filled-darker"` (default: `"outline"`)
    *   Defines the visual style of the textarea field.
*   **`resize`**: `"none" | "both" | "horizontal" | "vertical"` (default: `"none"`)
    *   Controls whether and how the textarea can be resized by the user.

### Events

Inherits standard HTML `<textarea>` events:

*   **`input`**: Fired synchronously when the value changes.
*   **`change`**: Fired when the value is committed by the user (e.g., on blur).
*   *(Select, focus, blur, keyboard events, etc.)*

### Slots

None.

### CSS Parts

*   **`control`**: The native `<textarea>` element itself.

```css
/* Example: Style the native textarea element */
fluent-textarea::part(control) {
  line-height: 1.6;
  font-family: sans-serif;
}
```

## Styling

Customize appearance using CSS targeting the host element or the `control` part.

*   **Key Design Tokens Used (Examples):**
    *   Similar tokens as `<fluent-text-input>` based on `appearance` (background, border, text color, placeholder color).
    *   `--borderRadiusMedium`: Corner rounding.
    *   `--strokeWidthThin`: Border thickness.
    *   `--fontSizeBase300`, `--lineHeightBase300`: Text size and line height.
    *   Padding tokens (`--spacingHorizontal...`, `--spacingVertical...`).
    *   Scrollbar color tokens (`--colorNeutralStrokeAccessible`, `--colorNeutralBackground1`).
*   The `resize` attribute is mapped to the standard CSS `resize` property.
*   Refer to `textarea.styles.ts` for detailed token mapping and state variations.

## Accessibility

*   Renders a native `<textarea>` element, inheriting its baseline accessibility.
*   Crucially relies on being wrapped by `<fluent-field>` to associate the visible `<label>` correctly for screen readers.
*   Manages `aria-disabled`, `aria-required`, `aria-readonly` based on attributes.
*   Ensure `placeholder` text is supplemental and not a replacement for a visible label.
