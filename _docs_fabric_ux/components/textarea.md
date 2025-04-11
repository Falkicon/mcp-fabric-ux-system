---
id: components_textarea
title: Textarea
description: Displays a multi-line plain-text editing control.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/textarea
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Textarea (`<fabric-textarea>`)

<!-- BEGIN-SECTION: Textarea Overview -->
Displays a multi-line plain-text editing control.
<!-- END-SECTION: Textarea Overview -->

## Usage

**Importing:**

```javascript
import '@fabric-msft/web-components/textarea/define.js';

// Optional: Import the types for Typescript
import type { Textarea } from '@fabric-msft/web-components/textarea';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Basic Textarea -->
<fabric-textarea id="basic-ta" placeholder="Enter comments here"></fabric-textarea>

<!-- With Fabric Field (Recommended) -->
<fabric-field>
  <label slot="label" for="my-textarea">Description</label>
  <fabric-textarea slot="input" id="my-textarea" required></fabric-textarea>
</fabric-field>

<!-- Different Appearances -->
<fabric-textarea appearance="outline" placeholder="Outline"></fabric-textarea>
<fabric-textarea appearance="filled-lighter" placeholder="Filled Lighter"></fabric-textarea>
<fabric-textarea appearance="filled-darker" placeholder="Filled Darker"></fabric-textarea>

<!-- Sizing and Resizing -->
<fabric-textarea rows="5" cols="30" placeholder="Fixed rows/cols"></fabric-textarea>
<fabric-textarea resize="both" placeholder="Resize both"></fabric-textarea>
<fabric-textarea resize="vertical" placeholder="Resize vertical"></fabric-textarea>
<fabric-textarea resize="horizontal" placeholder="Resize horizontal"></fabric-textarea>
<fabric-textarea resize="none" placeholder="No resize"></fabric-textarea>

<!-- Disabled / Readonly -->
<fabric-textarea disabled>Cannot edit</fabric-textarea>
<fabric-textarea readonly>Cannot change</fabric-textarea>
```

### Handling Events (JavaScript)

Listen for standard `<textarea>` events like `input` (fires on every change) or `change` (fires on commit, e.g., blur).

```javascript
const basicTextarea = document.getElementById('basic-ta');

if (basicTextarea) {
  basicTextarea.addEventListener('input', (event) => {
    const currentValue = event.target.value;
    console.log(`Textarea input value: ${currentValue}`);
    // Add logic, e.g., update character count
  });

  basicTextarea.addEventListener('change', (event) => {
    const finalValue = event.target.value;
    console.log(`Textarea value committed: ${finalValue}`);
    // Add logic for when user finishes editing (e.g., validation)
  });
}
```

<!-- BEGIN-SECTION: Textarea Usage -->
## Textarea Usage (fabric-textarea)

**Importing:**

```javascript
import '@fabric-msft/web-components/textarea/define.js';

// Optional: Import the types for Typescript
import type { Textarea } from '@fabric-msft/web-components/textarea';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Basic Textarea -->
<fabric-textarea id="basic-ta" placeholder="Enter comments here"></fabric-textarea>

<!-- With Fabric Field (Recommended) -->
<fabric-field>
  <label slot="label" for="my-textarea">Description</label>
  <fabric-textarea slot="input" id="my-textarea" required></fabric-textarea>
</fabric-field>

<!-- Different Appearances -->
<fabric-textarea appearance="outline" placeholder="Outline"></fabric-textarea>
<fabric-textarea appearance="filled-lighter" placeholder="Filled Lighter"></fabric-textarea>
<fabric-textarea appearance="filled-darker" placeholder="Filled Darker"></fabric-textarea>

<!-- Sizing and Resizing -->
<fabric-textarea rows="5" cols="30" placeholder="Fixed rows/cols"></fabric-textarea>
<fabric-textarea resize="both" placeholder="Resize both"></fabric-textarea>
<fabric-textarea resize="vertical" placeholder="Resize vertical"></fabric-textarea>
<fabric-textarea resize="horizontal" placeholder="Resize horizontal"></fabric-textarea>
<fabric-textarea resize="none" placeholder="No resize"></fabric-textarea>

<!-- Disabled / Readonly -->
<fabric-textarea disabled>Cannot edit</fabric-textarea>
<fabric-textarea readonly>Cannot change</fabric-textarea>
```

### Handling Events (JavaScript)

Listen for standard `<textarea>` events like `input` (fires on every change) or `change` (fires on commit, e.g., blur).

```javascript
const basicTextarea = document.getElementById('basic-ta');

if (basicTextarea) {
  basicTextarea.addEventListener('input', (event) => {
    const currentValue = event.target.value;
    console.log(`Textarea input value: ${currentValue}`);
    // Add logic, e.g., update character count
  });

  basicTextarea.addEventListener('change', (event) => {
    const finalValue = event.target.value;
    console.log(`Textarea value committed: ${finalValue}`);
    // Add logic for when user finishes editing (e.g., validation)
  });
}
```
<!-- END-SECTION: Textarea Usage -->

## API Reference (`<fabric-textarea>`)

<!-- BEGIN-SECTION: Textarea API -->
## Textarea API Reference (fabric-textarea)

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

Adds Fabric UX specific attributes:

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
fabric-textarea::part(control) {
  line-height: 1.6;
  font-family: sans-serif;
}
```

## Styling

Customize appearance using CSS targeting the host element or the `control` part.

*   **Key Design Tokens Used (Examples):**
    *   Similar tokens as `<fabric-text-input>` based on `appearance` (background, border, text color, placeholder color).
    *   `--borderRadiusMedium`: Corner rounding.
    *   `--strokeWidthThin`: Border thickness.
    *   `--fontSizeBase300`, `--lineHeightBase300`: Text size and line height.
    *   Padding tokens (`--spacingHorizontal...`, `--spacingVertical...`).
    *   Scrollbar color tokens (`--colorNeutralStrokeAccessible`, `--colorNeutralBackground1`).
*   The `resize` attribute is mapped to the standard CSS `resize` property.
*   Refer to `textarea.styles.ts` for detailed token mapping and state variations.
<!-- END-SECTION: Textarea API -->

## Styling

<!-- BEGIN-SECTION: Textarea Styling -->
## Textarea Styling (fabric-textarea)

Customize appearance using CSS targeting the host element or the `control` part.

*   **Key Design Tokens Used (Examples):**
    *   Similar tokens as `<fabric-text-input>` based on `appearance` (background, border, text color, placeholder color).
    *   `--borderRadiusMedium`: Corner rounding.
    *   `--strokeWidthThin`: Border thickness.
    *   `--fontSizeBase300`, `--lineHeightBase300`: Text size and line height.
    *   Padding tokens (`--spacingHorizontal...`, `--spacingVertical...`).
    *   Scrollbar color tokens (`--colorNeutralStrokeAccessible`, `--colorNeutralBackground1`).
*   The `resize` attribute is mapped to the standard CSS `resize` property.
*   Refer to `textarea.styles.ts` for detailed token mapping and state variations.
<!-- END-SECTION: Textarea Styling -->

## Accessibility

<!-- BEGIN-SECTION: Textarea Accessibility -->
## Textarea Accessibility (fabric-textarea)

*   Renders a native `<textarea>` element, inheriting its baseline accessibility.
*   Crucially relies on being wrapped by `<fabric-field>` to associate the visible `<label>` correctly for screen readers.
*   Manages `aria-disabled`, `aria-required`, `aria-readonly` based on attributes.
*   Ensure `placeholder` text is supplemental and not a replacement for a visible label.
<!-- END-SECTION: Textarea Accessibility -->