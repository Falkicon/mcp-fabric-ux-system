---
id: components_menu-button
title: Menu Button
description: A button variant used as a trigger for menus, especially split buttons.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/menu-button
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Menu Button (`<fabric-menu-button>`)

<!-- BEGIN-SECTION: Menu Button Overview -->
A button specifically styled and often used as the trigger element for a `<fabric-menu>`, especially in the `trigger` slot of a split button menu.
<!-- END-SECTION: Menu Button Overview -->

<!-- BEGIN-SECTION: Menu Button Usage -->
## Menu Button Usage (fabric-menu-button)

Use as a standalone button to trigger a menu, or within the `trigger` slot of a `<fabric-menu split>`.

**Importing:**

```javascript
import '@fabric-msft/web-components/menu-button/define.js';
// Needed for context:
import '@fabric-msft/web-components/menu/define.js';
import '@fabric-msft/web-components/button/define.js';

// Optional: Import the types for Typescript
import type { MenuButton } from '@fabric-msft/web-components/menu-button';
import type { Menu } from '@fabric-msft/web-components/menu'; // Example
import type { Button } from '@fabric-msft/web-components/button'; // Example
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Standalone Menu Button triggering a menu -->
<fabric-menu-button id="trigger1" aria-label="Open options menu">Options</fabric-menu-button>
<fabric-menu anchor="trigger1">
  <fabric-menu-item>Option 1</fabric-menu-item>
  <fabric-menu-item>Option 2</fabric-menu-item>
</fabric-menu>

<!-- Used as the trigger in a Split Button -->
<fabric-menu split>
  <fabric-button slot="primary-action">Save</fabric-button>
  <fabric-menu-button slot="trigger" appearance="primary" aria-label="Save options"></fabric-menu-button>
  <fabric-menu-item>Save As...</fabric-menu-item>
  <fabric-menu-item>Save and Close</fabric-menu-item>
</fabric-menu>

<!-- Icon-only variant (common for split button triggers) -->
<fabric-menu-button icon-only aria-label="More actions" id="split-trigger-icon"></fabric-menu-button>
```

### Handling Events (JavaScript)

Menu buttons emit standard `click` events. This click is typically used internally by the associated `<fabric-menu>` to toggle its open state. You generally don't need to add separate click listeners to the menu button itself for menu control, but you can if needed for other purposes.

```javascript
const splitTriggerIcon = document.getElementById('split-trigger-icon');

if (splitTriggerIcon) {
  // This listener is usually NOT needed for menu operation
  splitTriggerIcon.addEventListener('click', (event) => {
    console.log('Split button trigger icon clicked!', event);
    // The parent <fabric-menu> handles opening/closing.
  });
}
```
<!-- END-SECTION: Menu Button Usage -->

<!-- BEGIN-SECTION: Menu Button API -->
## Menu Button API Reference (fabric-menu-button)

Inherits most functionality and attributes from `<fabric-button>`.

### Attributes & Properties

Inherits standard `<fabric-button>` attributes:

*   **`appearance`**: `"primary" | "outline" | "subtle" | "transparent"`
*   **`size`**: `"small" | "medium" | "large"`
*   **`shape`**: `"circular" | "rounded" | "square"`
*   **`icon-only`**: `boolean`
*   **`disabled`**: `boolean`

*Note: Specific menu-related attributes like `open` or `anchor` typically reside on the parent `<fabric-menu>` component, not the button itself.*

### Events

Inherits standard `<fabric-button>` events (`click`, etc.). The `click` event is typically used by the parent `<fabric-menu>` to toggle its visibility.

### Slots

Inherits standard `<fabric-button>` slots:

*   **(default)**: Content of the button (text, etc.). Often unused if `icon-only`.
*   **`start`**: Icon placed before the default slot content.
*   **`end`**: Icon placed after the default slot content.
*   **`indicator`**: (Specific to MenuButton) Slot for the dropdown indicator icon (defaults to a chevron).

### CSS Parts

Inherits standard `<fabric-button>` CSS Parts:

*   **`control`**: The root button element.
*   **`indicator`**: (Specific to MenuButton) The dropdown indicator icon.

```css
/* Example: Hide the default indicator */
fabric-menu-button::part(indicator) {
  display: none;
}
```
<!-- END-SECTION: Menu Button API -->

<!-- BEGIN-SECTION: Menu Button Styling -->
## Menu Button Styling (fabric-menu-button)

Inherits styling from `<fabric-button>`.

*   **Key Design Tokens Used:** Uses standard button tokens. The main difference is the potential presence and styling of the `indicator` part.
*   Refer to `button.styles.ts` for primary token usage.
<!-- END-SECTION: Menu Button Styling -->

<!-- BEGIN-SECTION: Menu Button Accessibility -->
## Menu Button Accessibility (fabric-menu-button)

*   Sets `role="button"`.
*   Requires an accessible label via text content or `aria-label`, especially when `icon-only`.
*   Manages `aria-haspopup="menu"` to indicate it controls a menu.
*   Manages `aria-expanded` based on the state of the associated menu.
*   Manages `aria-disabled`.
<!-- END-SECTION: Menu Button Accessibility -->