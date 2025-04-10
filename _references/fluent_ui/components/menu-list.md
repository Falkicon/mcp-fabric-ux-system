# Menu List (`<fluent-menu-list>`)

The container element that holds and manages focus for `<fluent-menu-item>` elements within a `<fluent-menu>`.

## Usage

This component is typically used implicitly **within the template of `<fluent-menu>`** and is not usually directly instantiated or slotted by application developers. It renders the default slot content of the `<fluent-menu>`.

**Importing:**

```javascript
// Typically imported as part of Menu:
import '@fluentui/web-components/menu/define.js';
// Or individually (less common for direct use):
// import '@fluentui/web-components/menu-list/define.js';
```

**Conceptual Example (Internal Structure of `<fluent-menu>`):**

```html
<!-- <fluent-menu> renders something like this internally -->
<div class="popup" role="presentation">
  <fluent-menu-list role="menu">
    <slot></slot> <!-- Default slot from <fluent-menu> goes here -->
  </fluent-menu-list>
</div>
```

## API Reference (`<fluent-menu-list>`)

Based on `MenuList` class.

### Attributes & Properties

This component generally exposes few public attributes directly, as its behavior is controlled by the parent `<fluent-menu>`.

### Events

None specific to this component (events bubble up to `<fluent-menu>`).

### Slots

*   **(default)**: Accepts `<fluent-menu-item>`, `<fluent-divider>`, etc.

### CSS Parts

*   **`menu-list`**: The root element of the menu list container (often a `div` with `role="menu"`).

```css
/* Example: Style the menu list container */
fleunt-menu-list::part(menu-list) {
  /* Note: This might be difficult to target if rendered internally by <fluent-menu> */
  /* Styling is usually applied via the <fluent-menu>::part(listbox) */
  padding: var(--spacingVerticalXS) 0;
}
```

## Styling

Provides the container for menu items.

*   **Key Design Tokens Used:** Primarily consumes tokens set by the parent `<fluent-menu>` for background, padding, border, and shadow.
*   Refer to `menu-list.styles.ts` and `menu.styles.ts`.

## Accessibility

*   Sets `role="menu"` or `role="menubar"`.
*   Manages focus navigation between child menu items.
*   Relies on the parent `<fluent-menu>` or trigger element for overall accessible naming.
