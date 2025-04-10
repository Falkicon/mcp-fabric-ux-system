# Menu Button (`<fluent-menu-button>`)

A button specifically styled and often used as the trigger element for a `<fluent-menu>`, especially in the `trigger` slot of a split button menu.

## Usage

Use as a standalone button to trigger a menu, or within the `trigger` slot of a `<fluent-menu split>`.

**Importing:**

```javascript
import '@fluentui/web-components/menu-button/define.js';
// Needed for context:
import '@fluentui/web-components/menu/define.js';
import '@fluentui/web-components/button/define.js';
```

**Examples:**

```html
<!-- Standalone Menu Button triggering a menu -->
<fluent-menu-button id="trigger1" aria-label="Open options menu">Options</fluent-menu-button>
<fluent-menu anchor="trigger1">
  <fluent-menu-item>Option 1</fluent-menu-item>
  <fluent-menu-item>Option 2</fluent-menu-item>
</fluent-menu>

<!-- Used as the trigger in a Split Button -->
<fluent-menu split>
  <fluent-button slot="primary-action">Save</fluent-button>
  <fluent-menu-button slot="trigger" appearance="primary" aria-label="Save options"></fluent-menu-button>
  <fluent-menu-item>Save As...</fluent-menu-item>
  <fluent-menu-item>Save and Close</fluent-menu-item>
</fluent-menu>

<!-- Icon-only variant (common for split button triggers) -->
<fluent-menu-button icon-only aria-label="More actions"></fluent-menu-button>
```

## API Reference (`<fluent-menu-button>`)

Inherits most functionality and attributes from `<fluent-button>`.

### Attributes & Properties

Inherits standard `<fluent-button>` attributes:

*   **`appearance`**: `"primary" | "outline" | "subtle" | "transparent"`
*   **`size`**: `"small" | "medium" | "large"`
*   **`shape`**: `"circular" | "rounded" | "square"`
*   **`icon-only`**: `boolean`
*   **`disabled`**: `boolean`

*Note: Specific menu-related attributes like `open` or `anchor` typically reside on the parent `<fluent-menu>` component, not the button itself.*

### Events

Inherits standard `<fluent-button>` events (`click`, etc.). The `click` event is typically used by the parent `<fluent-menu>` to toggle its visibility.

### Slots

Inherits standard `<fluent-button>` slots:

*   **(default)**: Content of the button (text, etc.). Often unused if `icon-only`.
*   **`start`**: Icon placed before the default slot content.
*   **`end`**: Icon placed after the default slot content.
*   **`indicator`**: (Specific to MenuButton) Slot for the dropdown indicator icon (defaults to a chevron).

### CSS Parts

Inherits standard `<fluent-button>` CSS Parts:

*   **`control`**: The root button element.
*   **`indicator`**: (Specific to MenuButton) The dropdown indicator icon.

```css
/* Example: Hide the default indicator */
fluent-menu-button::part(indicator) {
  display: none;
}
```

## Styling

Inherits styling from `<fluent-button>`.

*   **Key Design Tokens Used:** Uses standard button tokens. The main difference is the potential presence and styling of the `indicator` part.
*   Refer to `button.styles.ts` for primary token usage.

## Accessibility

*   Sets `role="button"`.
*   Requires an accessible label via text content or `aria-label`, especially when `icon-only`.
*   Manages `aria-haspopup="menu"` to indicate it controls a menu.
*   Manages `aria-expanded` based on the state of the associated menu.
*   Manages `aria-disabled`.
