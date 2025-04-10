---
id: components_menu-item
title: Menu Item
description: Represents a single command or option within a Menu.
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/menu-item
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Menu Item (`<fabric-menu-item>`)

Represents a single command or option within a `<fabric-menu>`.

## Usage

Place `<fabric-menu-item>` elements inside a `<fabric-menu>`.

**Importing:**

```javascript
// Typically imported alongside Menu:
import '@fabric-msft/web-components/menu/define.js';
// Or individually:
// import '@fabric-msft/web-components/menu-item/define.js';

// Optional: Import the types for Typescript
import type { MenuItem } from '@fabric-msft/web-components/menu-item';
import type { Menu } from '@fabric-msft/web-components/menu'; // Example context type
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<fabric-menu>
  <!-- Standard Menu Item -->
  <fabric-menu-item id="save-item">Save</fabric-menu-item>

  <!-- With Start/End Icons -->
  <fabric-menu-item>
    <svg slot="start" width="16" height="16"><path d="..."/></svg>
    Open File
    <span slot="end">Ctrl+O</span>
  </fabric-menu-item>

  <!-- Disabled Menu Item -->
  <fabric-menu-item disabled>Print (Disabled)</fabric-menu-item>

  <!-- Checkbox Menu Item -->
  <fabric-menu-item role="menuitemcheckbox" aria-checked="true" id="gridlines-item">
    Show Gridlines
  </fabric-menu-item>

  <!-- Radio Menu Items (within a group) -->
  <div role="group" aria-label="Sort by">
    <fabric-menu-item role="menuitemradio" aria-checked="true">Name</fabric-menu-item>
    <fabric-menu-item role="menuitemradio" aria-checked="false">Date Modified</fabric-menu-item>
    <fabric-menu-item role="menuitemradio" aria-checked="false">Size</fabric-menu-item>
  </div>

  <!-- With Submenu -->
  <fabric-menu-item>
    Export As
    <fabric-menu slot="submenu">
        <fabric-menu-item>PDF</fabric-menu-item>
        <fabric-menu-item>JPG</fabric-menu-item>
    </fabric-menu>
  </fabric-menu-item>
</fabric-menu>
```

### Handling Events (JavaScript)

Listen for the `change` event on the parent `<fabric-menu>` to detect when any item is clicked/activated.

```javascript
const menu = document.querySelector('fabric-menu');

if (menu) {
  menu.addEventListener('change', (event) => {
    const clickedItem = event.target;
    // Check if the target is actually a menu item (event might bubble)
    if (clickedItem.matches('fabric-menu-item')) {
        console.log(`Menu item clicked: ${clickedItem.id || clickedItem.textContent.trim()}`);
        // Add logic based on which item was clicked
        // e.g., if (clickedItem.id === 'save-item') { saveDocument(); }
        
        // For checkbox/radio items, you might toggle their state:
        if (clickedItem.role === 'menuitemcheckbox') {
            const isChecked = clickedItem.getAttribute('aria-checked') === 'true';
            clickedItem.setAttribute('aria-checked', !isChecked);
            // Update application state based on checkbox toggle
        }
        // Handle radio group logic separately if needed

        // Close the menu if it doesn't close automatically
        menu.open = false; 
    }
  });
}
```

## API Reference (`<fabric-menu-item>`)

Based on `MenuItem` class.

### Attributes & Properties

*   **`role`**: `"menuitem" | "menuitemcheckbox" | "menuitemradio"` (default: `"menuitem"`)
    *   Defines the accessibility role and behavior (checkbox/radio roles require managing `aria-checked`).
*   **`disabled`**: `boolean` (default: `false`)
    *   Disables the menu item.
*   **`checked`**: `boolean | null` (default: `null`)
    *   Used with `role="menuitemcheckbox"` or `role="menuitemradio"` to indicate the checked state. Reflects `aria-checked`. *Note: Managing `aria-checked` directly via attributes might be more common.* 
*   **`expanded`** (Readonly Property): `boolean`
    *   Indicates if the item has a submenu and if that submenu is currently open.

### Events

*   **`change`**: `Event`
    *   Fired when the item is clicked or activated via keyboard (unless disabled). Bubbles up to the parent `<fabric-menu>`.

### Slots

*   **(default)**: The primary content/label of the menu item.
*   **`start`**: Content placed before the default slot content (e.g., icons).
*   **`end`**: Content placed after the default slot content (e.g., keyboard shortcuts, submenu indicator).
*   **`submenu`**: Accepts a `<fabric-menu>` element to create nested menus.
*   **`checkbox-indicator`**: Custom checkmark indicator for `role="menuitemcheckbox"`.
*   **`radio-indicator`**: Custom radio indicator for `role="menuitemradio"`.
*   **`expand-collapse-indicator`**: Custom indicator for items with submenus.

### CSS Parts

*   **`content`**: The main container element for the slotted content (`start`, default, `end`).
*   **`checkbox-indicator`**: Container for the checkbox indicator.
*   **`radio-indicator`**: Container for the radio indicator.
*   **`expand-collapse-indicator`**: Container for the submenu indicator.

```css
/* Example: Style the main content part */
fabric-menu-item::part(content) {
  gap: var(--spacingHorizontalM);
}

/* Example: Style the checkbox indicator part */
fabric-menu-item[role="menuitemcheckbox"]::part(checkbox-indicator) {
  color: green;
}
```

## Styling

Customize appearance using CSS targeting the host element (`fabric-menu-item`) or the exposed CSS Parts.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralBackground1Hover`, `--colorNeutralBackground1Pressed`, `--colorNeutralBackground1Selected`: Background colors for interaction states.
    *   `--colorNeutralForeground1`, `--colorNeutralForegroundDisabled`: Text colors.
    *   `--colorNeutralForeground2`: Color for secondary text/icons (e.g., in `end` slot).
    *   `--colorBrandForeground1`: Color for indicators when checked/selected.
    *   `--fontSizeBase300`, `--lineHeightBase300`: Text size.
    *   Padding tokens (`--spacingVertical...`, `--spacingHorizontal...`).
*   Refer to `menu-item.styles.ts` for detailed token usage.

## Accessibility

*   Assigns `role` based on the attribute (`menuitem`, `menuitemcheckbox`, `menuitemradio`).
*   Manages `aria-checked` for checkbox/radio roles based on the `checked` attribute. Consider managing this state via `aria-checked` attribute directly based on application logic.
*   Manages `aria-disabled` based on the `disabled` attribute.
*   Manages `aria-expanded` and `aria-haspopup` for items with submenus.
*   Relies on the parent `<fabric-menu>` for overall menu context and keyboard navigation between items. 