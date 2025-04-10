# Menu (`<fluent-menu>`)

Displays a list of commands or options (`<fluent-menu-item>`) in a temporary popup surface. Can also be configured as a Split Button.

## Usage

**Importing:**

```javascript
// Registers <fluent-menu>, <fluent-menu-item>, <fluent-button>, <fluent-menu-button> etc.
import '@fluentui/web-components/menu/define.js';
import '@fluentui/web-components/button/define.js';
import '@fluentui/web-components/menu-button/define.js'; // Needed for split button trigger
```

**Structure:**

A `<fluent-menu>` is typically associated with a trigger element (like a button). The menu itself contains `<fluent-menu-item>`, `<fluent-menu-divider>`, or nested submenus.

**Controlling Visibility:**

Menu visibility is usually controlled implicitly by clicking the associated trigger element, or programmatically via the `open` attribute/property.

**Examples:**

```html
<!-- Standard Menu -->
<button id="menu-trigger">Open Menu</button>
<fluent-menu anchor="menu-trigger">
  <fluent-menu-item>Menu Item 1</fluent-menu-item>
  <fluent-menu-item>Menu Item 2</fluent-menu-item>
</fluent-menu>

<!-- Split Button Variant -->
<fluent-menu split>
  <fluent-button slot="primary-action" appearance="primary">Primary Action</fluent-button>
  <fluent-menu-button slot="trigger" appearance="primary" aria-label="More options"></fluent-menu-button>
  <!-- Menu items for the dropdown part -->
  <fluent-menu-item>Option A</fluent-menu-item>
  <fluent-menu-item>Option B</fluent-menu-item>
</fluent-menu>

<script>
  // Basic trigger association is often handled internally via `anchor`,
  // but manual control is possible.
  const menu = document.querySelector('fluent-menu');
  const trigger = document.getElementById('menu-trigger');

  // Example: Toggle menu programmatically
  // trigger.onclick = () => menu.open = !menu.open;

  // Listen for menu item clicks
  menu.addEventListener('change', (event) => {
    // event.detail might contain the clicked menu item element
    console.log('Menu item clicked:', event.target);
    // Potentially close menu: menu.open = false;
  });
</script>
```

### Split Button Behavior

Adding the `split` attribute transforms the menu into a split button. This requires:

*   A primary action element (usually `<fluent-button>`) in the `primary-action` slot.
*   A trigger element (usually `<fluent-menu-button>`) in the `trigger` slot.

The component visually groups these two elements. Clicking the primary action performs its default behavior. Clicking the trigger opens the menu popup containing the standard menu items.

## API Reference (`<fluent-menu>`)

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
*   **`change`**: `Event` - Fired when a `<fluent-menu-item>` within the menu is clicked (or activated via keyboard).

### Slots

*   **(default)**: Accepts `<fluent-menu-item>`, `<fluent-divider>`, etc. for the menu list.
*   **`primary-action`**: (Required when `split` is true) Accepts the primary action button (e.g., `<fluent-button>`).
*   **`trigger`**: (Required when `split` is true) Accepts the menu trigger button (e.g., `<fluent-menu-button>`).

### CSS Parts

*   **`listbox`**: The popup `<div>` element containing the menu items (role="menu" or role="menubar").

```css
/* Example: Style the menu popup */
fluent-menu::part(listbox) {
  border: 1px solid var(--colorNeutralStroke2);
  padding: var(--spacingVerticalXS) 0;
}
```

## Styling

Customize appearance using CSS targeting the host element (`fluent-menu` - usually hidden) or the `listbox` part.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralBackground1`: Background color of the menu popup.
    *   `--colorNeutralStroke1`, `--colorNeutralStroke2`: Border colors.
    *   `--shadow16`: Used for the menu popup's elevation/shadow.
    *   `--borderRadiusMedium`: Corner rounding.
    *   Padding tokens (`--spacingVertical...`) for internal spacing.
*   Refer to `menu.styles.ts` and `menu-item.styles.ts` for detailed token usage.
*   When `split` is true, specific styles are applied to group the `primary-action` and `trigger` slots visually.

## Accessibility

*   The popup list typically has `role="menu"` or `role="menubar"`.
*   **Split Button:**
    *   The element in the `primary-action` slot needs its own accessible label (e.g., button text or `aria-label`).
    *   The element in the `trigger` slot needs its own accessible label (e.g., `aria-label="More options"`).
*   Child items (`<fluent-menu-item>`) handle roles like `menuitem`, `menuitemcheckbox`, `menuitemradio`.
*   Manages focus movement within the menu.
*   Supports keyboard navigation (Arrow keys, Home, End, Enter, Space, Escape, Tab/Shift+Tab for menubar).

## Dependencies

*   Relies on the HTML Popover API (`[popover]`) or its polyfill for the popup behavior.
*   Uses CSS Anchor Positioning API or its polyfill for positioning the menu relative to its trigger.
*   Ensure appropriate polyfills are loaded for broader browser compatibility (see [Polyfilling](../concepts/polyfilling.md)).
