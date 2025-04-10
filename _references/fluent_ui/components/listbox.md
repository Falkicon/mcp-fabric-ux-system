# Listbox (`<fluent-listbox>`)

The underlying container component that holds and manages `<fluent-option>` elements, typically used internally by components like `<fluent-dropdown>` and `<fluent-combobox>`.

## Usage

While `<fluent-listbox>` can be used directly, it's most often rendered implicitly within the popup templates of components like `<fluent-dropdown>`.

**Importing:**

```javascript
// Typically imported as part of Dropdown/Combobox:
import '@fluentui/web-components/dropdown/define.js';
// Or individually (less common for direct use):
// import '@fluentui/web-components/listbox/define.js';
// import '@fluentui/web-components/option/define.js';
```

**Example (Direct Usage - Less Common):**

```html
<fluent-listbox aria-label="Select an item">
  <fluent-option value="1">Item 1</fluent-option>
  <fluent-option value="2" selected>Item 2</fluent-option>
  <fluent-option value="3" disabled>Item 3</fluent-option>
</fluent-listbox>
```

**Conceptual Example (Internal Structure of `<fluent-dropdown>`):**

```html
<!-- <fluent-dropdown> renders something like this in its popup -->
<div class="popup" role="presentation">
  <fluent-listbox>
    <slot></slot> <!-- Default slot from <fluent-dropdown> (containing options) goes here -->
  </fluent-listbox>
</div>
```

## API Reference (`<fluent-listbox>`)

Based on `Listbox` class.

### Attributes & Properties

*   **`disabled`**: `boolean` (default: `false`)
    *   Disables the listbox and all options within it.
*   **`appearance`**: `"filled-darker" | "filled-lighter" | "outline"` (default: `"outline"`)
    *   Sets the visual style, typically matching the parent dropdown/combobox.

*Note: Selection state (`value`, `selectedOption`) is usually managed by the parent component (e.g., Dropdown) that uses the listbox internally.*

### Events

None specific to this component (option selection events bubble up).

### Slots

*   **(default)**: Accepts one or more `<fluent-option>` elements.

### CSS Parts

*   **`listbox`**: The root element of the listbox container (role="listbox").

```css
/* Example: Style the listbox container */
fluent-listbox::part(listbox) {
  /* Note: Styling is usually applied via the parent component's ::part(listbox) */
  max-height: 250px;
  overflow-y: auto;
}
```

## Styling

Provides the container for listbox options.

*   **Key Design Tokens Used:** Primarily consumes tokens set by the parent component (Dropdown, Combobox) for background, border, padding, etc., based on the `appearance` attribute.
*   Refer to `listbox.styles.ts` and potentially parent component styles (`dropdown.styles.ts`).

## Accessibility

*   Sets `role="listbox"`.
*   Manages focus navigation between child options.
*   Relies on the parent component (Dropdown, Combobox) for overall accessible naming (`aria-labelledby`) and context.
