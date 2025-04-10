# Button (`<fluent-button>`)

Displays a clickable button element.

## Usage

**Importing:**

```javascript
// Option 1: Side-effect import (Registers <fluent-button>)
import '@fluentui/web-components/button.js';
```

*See [Installation](./../getting-started/installation.md) for CDN usage instructions.*

**Examples:**

```html
<!-- Use the component -->
<fluent-button>Default Button</fluent-button>
<fluent-button appearance="primary">Primary Button</fluent-button>
<fluent-button appearance="outline">Outline Button</fluent-button>
<fluent-button appearance="subtle">Subtle Button</fluent-button>
<fluent-button appearance="transparent">Transparent Button</fluent-button>
```

### Sizes

```html
<fluent-button size="small">Small</fluent-button>
<fluent-button size="medium">Medium</fluent-button>
<fluent-button size="large">Large</fluent-button>
```

### Shapes

```html
<fluent-button shape="rounded">Rounded</fluent-button>
<fluent-button shape="circular">O</fluent-button> <!-- Typically used with icon-only -->
<fluent-button shape="square">Square</fluent-button>
```

### Disabled

```html
<fluent-button disabled>Disabled</fluent-button>
<fluent-button appearance="primary" disabled>Disabled Primary</fluent-button>
```

### Icon Only

*Note: Icon sizing (width/height) might interact with button size and theme tokens; adjust CSS as needed.*

```html
<!-- Assumes an icon component/SVG is used -->
<fluent-button icon-only aria-label="Add">
  <svg width="16" height="16" viewBox="0 0 16 16" slot="start" aria-hidden="true"><path d="..." /></svg>
  <!-- Text content is typically omitted for icon-only buttons -->
</fluent-button>
<fluent-button icon-only shape="circular" aria-label="Edit">
  <svg width="16" height="16" viewBox="0 0 16 16" slot="start" aria-hidden="true"><path d="..." /></svg>
  <!-- Text content is typically omitted for icon-only buttons -->
</fluent-button>
```

### With Icons

Use the `start` and `end` slots for icons.

```html
<fluent-button>
    <svg width="16" height="16" viewBox="0 0 16 16" slot="start" aria-hidden="true"><path d="..." /></svg>
    Icon Start
</fluent-button>
<fluent-button>
    Icon End
    <svg width="16" height="16" viewBox="0 0 16 16" slot="end" aria-hidden="true"><path d="..." /></svg>
</fluent-button>
```

## API Reference

The `<fluent-button>` component's logic resides in the `Button` class, which extends a shared `ButtonBase` class. This pattern promotes consistency and allows for easier extension when creating custom button-like components.

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
fluent-button::part(control) {
  border-radius: 0; /* Override default rounding */
}
```

## Styling

Button styling is primarily controlled by Design Tokens. Use standard CSS to override styles via the host element or the `control` part.

## Accessibility

*   Automatically applies `role="button"`.
*   Manages `aria-disabled` based on the `disabled` attribute.
*   When using `icon-only`, provide an `aria-label` for screen readers.
