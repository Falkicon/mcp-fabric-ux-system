---
id: components_button
title: Button
description: Displays a clickable button element for user actions.
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/button
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Button (`<fabric-button>`)

Displays a clickable button element.

## Usage

**Importing:**

```javascript
// Option 1: Side-effect import (Registers <fabric-button>)
import '@fabric-msft/web-components/button/define.js';

// Optional: Import the types for Typescript
import type { Button } from '@fabric-msft/web-components/button';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Use the component -->
<fabric-button id="my-primary-button" appearance="primary">Primary Button</fabric-button>
<fabric-button appearance="outline">Outline Button</fabric-button>
<fabric-button appearance="subtle">Subtle Button</fabric-button>
<fabric-button appearance="transparent">Transparent Button</fabric-button>
```

### Handling Events (JavaScript)

You can listen for standard DOM events like `click` using `addEventListener`.

```javascript
const primaryButton = document.getElementById('my-primary-button');

if (primaryButton) {
  primaryButton.addEventListener('click', (event) => {
    console.log('Primary button clicked!', event);
    // Add your click handling logic here
  });
}
```

### Sizes

```html
<fabric-button size="small">Small</fabric-button>
<fabric-button size="medium">Medium</fabric-button>
<fabric-button size="large">Large</fabric-button>
```

### Shapes

```html
<fabric-button shape="rounded">Rounded</fabric-button>
<fabric-button shape="circular">O</fabric-button> <!-- Typically used with icon-only -->
<fabric-button shape="square">Square</fabric-button>
```

### Disabled

```html
<fabric-button disabled>Disabled</fabric-button>
<fabric-button appearance="primary" disabled>Disabled Primary</fabric-button>
```

### Icon Only

*Note: Icon sizing (width/height) might interact with button size and theme tokens; adjust CSS as needed.*

```html
<!-- Assumes an icon component/SVG is used -->
<fabric-button icon-only aria-label="Add">
  <svg width="16" height="16" viewBox="0 0 16 16" slot="start" aria-hidden="true"><path d="..." /></svg>
  <!-- Text content is typically omitted for icon-only buttons -->
</fabric-button>
<fabric-button icon-only shape="circular" aria-label="Edit">
  <svg width="16" height="16" viewBox="0 0 16 16" slot="start" aria-hidden="true"><path d="..." /></svg>
  <!-- Text content is typically omitted for icon-only buttons -->
</fabric-button>
```

### With Icons

Use the `start` and `end` slots for icons.

```html
<fabric-button>
    <svg width="16" height="16" viewBox="0 0 16 16" slot="start" aria-hidden="true"><path d="..." /></svg>
    Icon Start
</fabric-button>
<fabric-button>
    Icon End
    <svg width="16" height="16" viewBox="0 0 16 16" slot="end" aria-hidden="true"><path d="..." /></svg>
</fabric-button>
```

## API Reference

The `<fabric-button>` component's logic resides in the `Button` class, which extends a shared `ButtonBase` class. This pattern promotes consistency and allows for easier extension when creating custom button-like components.

### Attributes & Properties

*   **`appearance`**: `"primary" | "outline" | "subtle" | "transparent"`
    *   Sets the visual style. If omitted, the default neutral appearance is used.
*   **`size`**: `"small" | "medium" | "large"` (default: `"medium"`)
    *   Sets the button size.
*   **`shape`**: `"circular" | "rounded" | "square"` (default: `"rounded"`)
    *   Sets the button shape.
*   **`icon-only`**: `boolean` (default: `false`)
    *   Optimizes styles for buttons containing only an icon.
*   **`disabled`**: `boolean` (default: `false`)
    *   Disables the button.
*   **`type`**: `"submit" | "reset" | "button"` (default: `"button"`)
    *   Standard HTML button type attribute.
*   **`autofocus`**: `boolean` (default: `false`)
    *   If true, the element will be focused on page load.
*   **`form`**: `string`
    *   Associates the button with a form element by ID.
*   **`formaction`, `formenctype`, `formmethod`, `formnovalidate`, `formtarget`**: Standard HTML form-related attributes.
*   **`value`**: `string`
    *   Value submitted with form data.
*   **`name`**: `string`
    *   Name submitted with form data.

### Events

*   **`click`**: Standard HTML click event.
*   *(Inherited form events)*

### Slots

*   **(default)**: Content of the button (text, etc.).
*   **`start`**: Content placed before the default slot content (typically for icons).
*   **`end`**: Content placed after the default slot content (typically for icons).

### CSS Parts

*   **`control`**: The root button element within the Shadow DOM.

```css
/* Example: Target the inner button control */
fabric-button::part(control) {
  border-radius: 0; /* Override default rounding */
}
```

## Styling

Button styling is primarily controlled by Design Tokens. Use standard CSS to override styles via the host element or the `control` part.

*   Refer to component style files (e.g., `button.styles.ts`) for specific token usage and structure.

## Accessibility

*   Automatically applies `role="button"`.
*   Manages `aria-disabled` based on the `disabled` attribute.
*   When using `icon-only`, provide an `aria-label` for screen readers.
