---
id: components_menu-list
title: Menu List
description: The internal container holding and managing menu items within a Menu.
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/menu-list
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Menu List (`<fabric-menu-list>`)

The container element that holds and manages focus for `<fabric-menu-item>` elements within a `<fabric-menu>`.

## Usage

This component is typically used implicitly **within the template of `<fabric-menu>`** and is not usually directly instantiated or slotted by application developers. It renders the default slot content of the `<fabric-menu>`.

**Importing:**

```javascript
// Typically imported as part of Menu:
import '@fabric-msft/web-components/menu/define.js';
// Or individually (less common for direct use):
// import '@fabric-msft/web-components/menu-list/define.js';

// Optional: Import the types for Typescript
import type { MenuList } from '@fabric-msft/web-components/menu-list';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Conceptual Example (Internal Structure of `<fabric-menu>`):**

```html
<!-- <fabric-menu> renders something like this internally -->
<div class="popup" role="presentation">
  <fabric-menu-list role="menu">
    <slot></slot> <!-- Default slot from <fabric-menu> goes here -->
  </fabric-menu-list>
</div>
```

### Handling Events (JavaScript)

Events are typically handled on the parent `<fabric-menu>` element, not directly on the `<fabric-menu-list>`.

## API Reference (`<fabric-menu-list>`)

Based on `MenuList` class.

### Attributes & Properties

This component generally exposes few public attributes directly, as its behavior is controlled by the parent `<fabric-menu>`.

### Events

None specific to this component (events bubble up to `<fabric-menu>`).

### Slots

*   **(default)**: Accepts `<fabric-menu-item>`, `<fabric-divider>`, etc.

### CSS Parts

*   **`menu-list`**: The root element of the menu list container (often a `div` with `role="menu"`).

```css
/* Example: Style the menu list container */
fabric-menu-list::part(menu-list) {
  /* Note: This might be difficult to target if rendered internally by <fabric-menu> */
  /* Styling is usually applied via the <fabric-menu>::part(listbox) */
  padding: var(--spacingVerticalXS) 0;
}
```

## Styling

Provides the container for menu items.

*   **Key Design Tokens Used:** Primarily consumes tokens set by the parent `<fabric-menu>` for background, padding, border, and shadow.
*   Refer to `menu-list.styles.ts` and `menu.styles.ts`.

## Accessibility

*   Sets `role="menu"` or `role="menubar"`.
*   Manages focus navigation between child menu items.
*   Relies on the parent `<fabric-menu>` or trigger element for overall accessible naming. 