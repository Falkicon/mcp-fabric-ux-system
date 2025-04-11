---
id: components_text
title: Text
description: Displays text content with standardized Fabric typography styles.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/text
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Text (`<fabric-text>`)

<!-- BEGIN-SECTION: Text Overview -->
Displays text content, applying standardized Fabric typography styles.
<!-- END-SECTION: Text Overview -->

<!-- BEGIN-SECTION: Text Usage -->
## Text Usage (fabric-text)

Wrap text content within the component and use attributes to control styling.

**Importing:**

```javascript
import '@fabric-msft/web-components/text/define.js';

// Optional: Import the types for Typescript
import type { Text } from '@fabric-msft/web-components/text';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<fabric-text>Default Text (Body 1)</fabric-text><br/>

<fabric-text size="500" weight="semibold">Heading Text (Caption)</fabric-text><br/>

<fabric-text font="monospace" size="200">Monospace Text (Body 2)</fabric-text><br/>

<fabric-text italic>Italic Text</fabric-text><br/>
<fabric-text underline>Underlined Text</fabric-text><br/>
<fabric-text strikethrough>Strikethrough Text</fabric-text><br/>

<fabric-text truncate style="width: 150px; border: 1px solid grey;">
  This text will be truncated if it exceeds the container width.
</fabric-text><br/>

<fabric-text block>This text is a block element.</fabric-text>
<fabric-text>This text is inline (default).</fabric-text><br/>

<fabric-text align="center" block>Centered Block Text</fabric-text>
```

### Handling Events (JavaScript)

Text components are primarily for display and do not emit specific events.
<!-- END-SECTION: Text Usage -->

<!-- BEGIN-SECTION: Text API -->
## Text API Reference (fabric-text)

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
<!-- END-SECTION: Text API -->

<!-- BEGIN-SECTION: Text Styling -->
## Text Styling (fabric-text)

Applies typography styles based on attributes mapped to design tokens.

*   **Key Design Tokens Used:**
    *   `--fontFamilyBase`, `--fontFamilyMonospace`
    *   `--fontSizeBase100` - `--fontSizeBase1000`
    *   `--lineHeightBase100` - `--lineHeightBase1000`
    *   `--fontWeightRegular`, `--fontWeightMedium`, `--fontWeightSemibold`, `--fontWeightBold`
    *   `--colorNeutralForeground1` (default text color, can be overridden by CSS `color`)
*   Text decoration and alignment are set via standard CSS properties based on attributes.
*   Refer to `text.styles.ts` for detailed token mapping.
<!-- END-SECTION: Text Styling -->

<!-- BEGIN-SECTION: Text Accessibility -->
## Text Accessibility (fabric-text)

*   Renders text content within a `<span>` (if `block` is false) or `<div>` (if `block` is true) by default.
*   Primarily presentational regarding its own semantics. The semantic meaning comes from the context where `<fabric-text>` is used (e.g., within a paragraph `<p>`, heading `<h1>`, button, etc.).
*   Ensure sufficient color contrast if overriding the default text color.
<!-- END-SECTION: Text Accessibility -->