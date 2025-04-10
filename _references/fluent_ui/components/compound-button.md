# Compound Button (`<fluent-compound-button>`)

A button variant designed to display a primary line of text along with a secondary, descriptive line below it.

## Usage

Use like a standard button, but provide secondary content via the `secondary-content` slot.

**Importing:**

```javascript
import '@fluentui/web-components/compound-button/define.js';
```

**Examples:**

```html
<fluent-compound-button>
  Primary Action
  <span slot="secondary-content">Secondary descriptive text goes here</span>
</fluent-compound-button>

<fluent-compound-button appearance="primary">
  <svg slot="start" width="20" height="20"><path d="..."/></svg>
  Create Account
  <span slot="secondary-content">Start your journey with us</span>
</fluent-compound-button>

<fluent-compound-button disabled>
  Cannot Perform Action
  <span slot="secondary-content">This action is currently unavailable</span>
</fluent-compound-button>
```

## API Reference (`<fluent-compound-button>`)

Inherits most functionality and attributes from `<fluent-button>`.

### Attributes & Properties

Inherits standard `<fluent-button>` attributes:

*   **`appearance`**: `"primary" | "outline" | "subtle" | "transparent"`
*   **`size`**: `"small" | "medium" | "large"`
*   **`shape`**: `"circular" | "rounded" | "square"`
*   **`icon-only`**: `boolean` (Less common for compound buttons)
*   **`disabled`**: `boolean`
*   **`type`**: `"submit" | "reset" | "button"`
*   *(Form-related attributes, autofocus, etc.)*

*Note: The main difference lies in the visual layout and the presence of the `secondary-content` slot.*

### Events

Inherits standard `<fluent-button>` events (`click`, etc.).

### Slots

Inherits standard `<fluent-button>` slots:

*   **(default)**: The primary text content of the button.
*   **`start`**: Content placed before the default slot content (typically for icons).
*   **`end`**: Content placed after the default slot content.

Adds compound-specific slots:

*   **`secondary-content`**: Text displayed below the primary (default slot) content.

### CSS Parts

Inherits standard `<fluent-button>` CSS Parts:

*   **`control`**: The root button element.

Adds compound-specific parts:

*   **`content-container`**: Wraps the primary (default) and secondary content slots.
*   **`secondary-content`**: The container for the `secondary-content` slot.

```css
/* Example: Style the secondary content */
fluent-compound-button::part(secondary-content) {
  font-size: var(--fontSizeBase200);
  color: var(--colorNeutralForeground2);
}
```

## Styling

Inherits styling from `<fluent-button>` and adds specific layout styles for the primary and secondary text.

*   **Key Design Tokens Used:** Uses standard button tokens, plus potentially specific tokens for secondary content color (`--colorNeutralForeground2`) and line height/spacing adjustments.
*   Refer to `compound-button.styles.ts` and `button.styles.ts` for detailed token usage.

## Accessibility

*   Sets `role="button"`.
*   The accessible name is typically derived from the primary text content (default slot).
*   The secondary content is visually distinct but may not be announced separately by default depending on screen reader behavior. Ensure the primary text provides a sufficient accessible name for the button's action.
*   Manages `aria-disabled`.
