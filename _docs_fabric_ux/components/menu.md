---
id: components_menu
title: Menu
description: Displays a list of commands or options in a temporary popup surface.
status: Draft
area: component
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/menu
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Menu (`<fabric-menu>`)

<!-- BEGIN-SECTION: Menu Overview -->
Displays a list of commands or options (`<fabric-menu-item>`) in a temporary popup surface. Can also be configured as a Split Button.
<!-- END-SECTION: Menu Overview -->

<!-- BEGIN-SECTION: Menu Usage -->
## Menu Usage (fabric-menu)

**Importing:**

```javascript
// Registers <fabric-menu>, <fabric-menu-item>, <fabric-button>, <fabric-menu-button> etc.
import '@fabric-msft/web-components/menu/define.js';
import '@fabric-msft/web-components/button/define.js';
import '@fabric-msft/web-components/menu-button/define.js'; // Needed for split button trigger

// Optional: Import the types for Typescript
import type { Menu } from '@fabric-msft/web-components/menu';
import type { MenuItem } from '@fabric-msft/web-components/menu-item'; // Example
import type { Button } from '@fabric-msft/web-components/button'; // Example
import type { MenuButton } from '@fabric-msft/web-components/menu-button'; // Example
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Structure:**

A `<fabric-menu>` is typically associated with a trigger element (like a button) using the `anchor` attribute. The menu itself contains `<fabric-menu-item>`, `<fabric-divider>`, or nested submenus.

**Controlling Visibility:**

Menu visibility is usually controlled implicitly by clicking the associated trigger element, or programmatically via the `open` attribute/property.

**Examples:**

```html
<!-- Standard Menu -->
<fabric-button id="menu-trigger">Open Menu</fabric-button>
<fabric-menu anchor="menu-trigger" id="standard-menu">
  <fabric-menu-item>Menu Item 1</fabric-menu-item>
  <fabric-menu-item>Menu Item 2</fabric-menu-item>
</fabric-menu>

<!-- Split Button Variant -->
<fabric-menu split id="split-menu">
  <fabric-button slot="primary-action" appearance="primary">Primary Action</fabric-button>
  <fabric-menu-button slot="trigger" appearance="primary" aria-label="More options"></fabric-menu-button>
  <!-- Menu items for the dropdown part -->
  <fabric-menu-item>Option A</fabric-menu-item>
  <fabric-menu-item>Option B</fabric-menu-item>
</fabric-menu>
```

### Handling Events (JavaScript)

Listen for the `change` event to detect when a menu item is selected, and the `open` event to react to the menu opening or closing.

```javascript
const standardMenu = document.getElementById('standard-menu');
const splitMenu = document.getElementById('split-menu');
const trigger = document.getElementById('menu-trigger'); // For manual control example

// Example: Toggle menu programmatically (less common, usually handled by anchor)
// if (trigger && standardMenu) {
//   trigger.addEventListener('click', () => standardMenu.open = !standardMenu.open);
// }

// Listen for menu item selections
if (standardMenu) {
  standardMenu.addEventListener('change', (event) => {
    // event.target will be the clicked fabric-menu-item
    console.log('Standard menu item clicked:', event.target.textContent);
    // Typically close the menu after selection
    standardMenu.open = false;
  });
}

if (splitMenu) {
  splitMenu.addEventListener('change', (event) => {
    console.log('Split menu item clicked:', event.target.textContent);
    // Split menu usually closes automatically after selection
  });
}

// Listen for open/close events
if (standardMenu) {
  standardMenu.addEventListener('open', (event) => {
    const isOpen = event.detail; // CustomEvent<boolean>
    console.log(`Standard menu ${isOpen ? 'opened' : 'closed'}`);
  });
}
```
<!-- END-SECTION: Menu Usage -->

<!-- BEGIN-SECTION: Menu Split Button Behavior -->
### Split Button Behavior

Adding the `split` attribute transforms the menu into a split button. This requires:

*   A primary action element (usually `<fabric-button>`) in the `primary-action` slot.
*   A trigger element (usually `<fabric-menu-button>`) in the `trigger` slot.

The component visually groups these two elements. Clicking the primary action performs its default behavior. Clicking the trigger opens the menu popup containing the standard menu items.
<!-- END-SECTION: Menu Split Button Behavior -->

<!-- BEGIN-SECTION: Menu API -->
## Menu API Reference (fabric-menu)

Based on `Menu` class.

### Attributes & Properties

*   **`split`**: `boolean` (default: `false`)
    *   Renders the component as a split button, requiring `primary-action` and `trigger` slots.
*   **`open`**: `boolean` (default: `false`)
    *   Controls the visibility of the menu popup.
*   **`anchor`**: `string`
    *   The `id` of the element that the menu should be positioned relative to (the trigger element).
*   **`positioning`**: `AnchorPositioningOptions` (Property only)
    *   Advanced configuration object for controlling popup positioning via CSS Anchor Positioning.
*   **`trigger-on-context-menu`**: `boolean` (default: `false`)
    *   If true, the menu will attempt to open when the anchor element receives a `contextmenu` event.

### Events

*   **`open`**: `CustomEvent<boolean>` - Fired when the menu's open state changes. `event.detail` is `true` if opened, `false` if closed.
*   **`change`**: `Event` - Fired when a `<fabric-menu-item>` within the menu is clicked (or activated via keyboard).

### Slots

*   **(default)**: Accepts `<fabric-menu-item>`, `<fabric-divider>`, etc. for the menu list.
*   **`primary-action`**: (Required when `split` is true) Accepts the primary action button (e.g., `<fabric-button>`).
*   **`trigger`**: (Required when `split` is true) Accepts the menu trigger button (e.g., `<fabric-menu-button>`).

### CSS Parts

*   **`listbox`**: The popup `<div>` element containing the menu items (role="menu" or role="menubar").

```css
/* Example: Style the menu popup */
fabric-menu::part(listbox) {
  border: 1px solid var(--colorNeutralStroke2);
  padding: var(--spacingVerticalXS) 0;
}
```
<!-- END-SECTION: Menu API -->

<!-- BEGIN-SECTION: Menu Styling -->
## Menu Styling (fabric-menu)

Customize appearance using CSS targeting the host element (`fabric-menu` - usually hidden) or the `listbox` part.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralBackground1`: Background color of the menu popup.
    *   `--colorNeutralStroke1`, `--colorNeutralStroke2`: Border colors.
    *   `--shadow16`: Used for the menu popup's elevation/shadow.
    *   `--borderRadiusMedium`: Corner rounding.
    *   Padding tokens (`--spacingVertical...`) for internal spacing.
*   Refer to `menu.styles.ts` and `menu-item.styles.ts` for detailed token usage.
*   When `split` is true, specific styles are applied to group the `primary-action` and `trigger` slots visually.
<!-- END-SECTION: Menu Styling -->

<!-- BEGIN-SECTION: Menu Accessibility -->
## Menu Accessibility (fabric-menu)

*   The popup list typically has `role="menu"` or `role="menubar"`.
*   **Split Button:**
    *   The element in the `primary-action` slot needs its own accessible label (e.g., button text or `aria-label`).
    *   The element in the `trigger` slot needs its own accessible label (e.g., `aria-label="More options"`).
*   Child items (`<fabric-menu-item>`) handle roles like `menuitem`, `menuitemcheckbox`, `menuitemradio`.
*   Manages focus movement within the menu.
*   Supports keyboard navigation (Arrow keys, Home, End, Enter, Space, Escape, Tab/Shift+Tab for menubar).
<!-- END-SECTION: Menu Accessibility -->

<!-- BEGIN-SECTION: Menu Dependencies -->
## Menu Dependencies (fabric-menu)

*   Relies on the HTML Popover API (`[popover]`) or its polyfill for the popup behavior.
*   Uses CSS Anchor Positioning API or its polyfill for positioning the menu relative to its trigger.
*   Ensure appropriate polyfills are loaded for broader browser compatibility (see [Polyfilling Guide](../../guides/polyfilling.md)).
<!-- END-SECTION: Menu Dependencies -->