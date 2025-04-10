# Text (`<fluent-text>`)

Displays text content, applying standardized Fluent typography styles.

## Usage

Wrap text content within the component and use attributes to control styling.

**Importing:**

```javascript
import '@fluentui/web-components/text/define.js';
```

**Examples:**

```html
<fluent-text>Default Text (Body 1)</fluent-text><br/>

<fluent-text size="500" weight="semibold">Heading Text (Caption)</fluent-text><br/>

<fluent-text font="monospace" size="200">Monospace Text (Body 2)</fluent-text><br/>

<fluent-text italic>Italic Text</fluent-text><br/>
<fluent-text underline>Underlined Text</fluent-text><br/>
<fluent-text strikethrough>Strikethrough Text</fluent-text><br/>

<fluent-text truncate style="width: 150px; border: 1px solid grey;">
  This text will be truncated if it exceeds the container width.
</fluent-text><br/>

<fluent-text block>This text is a block element.</fluent-text>
<fluent-text>This text is inline (default).</fluent-text><br/>

<fluent-text align="center" block>Centered Block Text</fluent-text>
```

## API Reference (`<fluent-text>`)

Based on `Text` class.

### Attributes & Properties

*   **`font`**: `"base" | "monospace"` (default: `"base"`)
    *   Selects the primary font family (maps to `--fontFamilyBase` or `--fontFamilyMonospace`).
*   **`size`**: `100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000` (default: `300`)
    *   Sets the font size and line height (maps to `--fontSizeBase...` / `--lineHeightBase...` tokens).
*   **`weight`**: `"regular" | "medium" | "semibold" | "bold"` (default: `"regular"`)
    *   Sets the font weight (maps to `--fontWeight...` tokens).
*   **`align`**: `"start" | "center" | "end" | "justify"` (default: `"start"`)
    *   Sets the text alignment (CSS `text-align`).
*   **`italic`**: `boolean` (default: `false`)
    *   Applies italic style.
*   **`strikethrough`**: `boolean` (default: `false`)
    *   Applies strikethrough decoration.
*   **`underline`**: `boolean` (default: `false`)
    *   Applies underline decoration.
*   **`truncate`**: `boolean` (default: `false`)
    *   If true, truncates overflowing text with an ellipsis (requires the element to have constrained width, e.g., via `block` attribute or CSS).
*   **`block`**: `boolean` (default: `false`)
    *   If true, sets `display: block`.

### Events

None specific to this component.

### Slots

*   **(default)**: The text content to be styled.

### CSS Parts

None exposed.

## Styling

Applies typography styles based on attributes mapped to design tokens.

*   **Key Design Tokens Used:**
    *   `--fontFamilyBase`, `--fontFamilyMonospace`
    *   `--fontSizeBase100` - `--fontSizeBase1000`
    *   `--lineHeightBase100` - `--lineHeightBase1000`
    *   `--fontWeightRegular`, `--fontWeightMedium`, `--fontWeightSemibold`, `--fontWeightBold`
    *   `--colorNeutralForeground1` (default text color, can be overridden by CSS `color`)
*   Text decoration and alignment are set via standard CSS properties based on attributes.
*   Refer to `text.styles.ts` for detailed token mapping.

## Accessibility

*   Renders text content within a `<span>` (if `block` is false) or `<div>` (if `block` is true) by default.
*   Primarily presentational regarding its own semantics. The semantic meaning comes from the context where `<fluent-text>` is used (e.g., within a paragraph `<p>`, heading `<h1>`, button, etc.).
*   Ensure sufficient color contrast if overriding the default text color.
