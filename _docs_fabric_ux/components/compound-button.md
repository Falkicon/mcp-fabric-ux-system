---
id: components_compound-button
title: Compound Button
description: A button variant with primary and secondary text lines.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/compound-button
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Compound Button (`<fabric-compound-button>`)

<!-- BEGIN-SECTION: Compound Button Overview -->
A button variant designed to display a primary line of text along with a secondary, descriptive line below it.
<!-- END-SECTION: Compound Button Overview -->

## Compound Button Usage (fabric-compound-button)

Use like a standard button, but provide secondary content via the `secondary-content` slot.

**Importing:**

```javascript
import '@fabric-msft/web-components/compound-button/define.js';

// Optional: Import the types for Typescript
import type { CompoundButton } from '@fabric-msft/web-components/compound-button';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<fabric-compound-button id="my-compound-button">
  Primary Action
  <span slot="secondary-content">Secondary descriptive text goes here</span>
</fabric-compound-button>

<fabric-compound-button appearance="primary">
  <svg slot="start" width="20" height="20"><path d="..."/></svg>
  Create Account
  <span slot="secondary-content">Start your journey with us</span>
</fabric-compound-button>

<fabric-compound-button disabled>
  Cannot Perform Action
  <span slot="secondary-content">This action is currently unavailable</span>
</fabric-compound-button>
```

### Handling Events (JavaScript)

Compound buttons emit standard `click` events, just like regular buttons.

```javascript
const myCompoundButton = document.getElementById('my-compound-button');

if (myCompoundButton) {
  myCompoundButton.addEventListener('click', (event) => {
    console.log('Compound button clicked!', event);
    // Add your click handling logic here
  });
}
```
<!-- END-SECTION: Compound Button Usage -->

## Compound Button API Reference (fabric-compound-button)

Inherits most functionality and attributes from `<fabric-button>`.

### Attributes & Properties

Inherits standard `<fabric-button>` attributes:

*   **`appearance`**: `"primary" | "outline" | "subtle" | "transparent"`
*   **`size`**: `"small" | "medium" | "large"`
*   **`shape`**: `"circular" | "rounded" | "square"`
*   **`icon-only`**: `boolean` (Less common for compound buttons)
*   **`disabled`**: `boolean`
*   **`type`**: `"submit" | "reset" | "button"`
*   *(Form-related attributes, autofocus, etc.)*

*Note: The main difference lies in the visual layout and the presence of the `secondary-content` slot.*

### Events

Inherits standard `<fabric-button>` events (`click`, etc.).

### Slots

Inherits standard `<fabric-button>` slots:

*   **(default)**: The primary text content of the button.
*   **`start`**: Content placed before the default slot content (typically for icons).
*   **`end`**: Content placed after the default slot content.

Adds compound-specific slots:

*   **`secondary-content`**: Text displayed below the primary (default slot) content.

### CSS Parts

Inherits standard `<fabric-button>` CSS Parts:

*   **`control`**: The root button element.

Adds compound-specific parts:

*   **`content-container`**: Wraps the primary (default) and secondary content slots.
*   **`secondary-content`**: The container for the `secondary-content` slot.

```css
/* Example: Style the secondary content */
fabric-compound-button::part(secondary-content) {
  font-size: var(--fontSizeBase200);
  color: var(--colorNeutralForeground2);
}
```
<!-- END-SECTION: Compound Button API -->

## Compound Button Styling (fabric-compound-button)

Inherits styling from `<fabric-button>` and adds specific layout styles for the primary and secondary text.

*   **Key Design Tokens Used:** Uses standard button tokens, plus potentially specific tokens for secondary content color (`--colorNeutralForeground2`) and line height/spacing adjustments.
*   Refer to `compound-button.styles.ts` and `button.styles.ts` for detailed token usage.
<!-- END-SECTION: Compound Button Styling -->

## Compound Button Accessibility (fabric-compound-button)

*   Sets `role="button"`.
*   The accessible name is typically derived from the primary text content (default slot).
*   The secondary content is visually distinct but may not be announced separately by default depending on screen reader behavior. Ensure the primary text provides a sufficient accessible name for the button's action.
*   Manages `aria-disabled`. 