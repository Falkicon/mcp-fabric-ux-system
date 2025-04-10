---
id: components_listbox
title: Listbox
description: The underlying container for managing listbox options.
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/listbox
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Listbox (`<fabric-listbox>`)

The underlying container component that holds and manages `<fabric-option>` elements, typically used internally by components like `<fabric-dropdown>` and `<fabric-combobox>`.

## Usage

While `<fabric-listbox>` can be used directly, it's most often rendered implicitly within the popup templates of components like `<fabric-dropdown>`.

**Importing:**

```javascript
// Typically imported as part of Dropdown/Combobox:
import '@fabric-msft/web-components/dropdown/define.js';
// Or individually (less common for direct use):
// import '@fabric-msft/web-components/listbox/define.js';
// import '@fabric-msft/web-components/option/define.js';

// Optional: Import the types for Typescript
import type { Listbox } from '@fabric-msft/web-components/listbox';
import type { Option } from '@fabric-msft/web-components/option';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Example (Direct Usage - Less Common):**

```html
<fabric-listbox id="direct-listbox" aria-label="Select an item">
  <fabric-option value="1">Item 1</fabric-option>
  <fabric-option value="2" selected>Item 2</fabric-option>
  <fabric-option value="3" disabled>Item 3</fabric-option>
</fabric-listbox>
```

**Conceptual Example (Internal Structure of `<fabric-dropdown>`):**

```html
<!-- <fabric-dropdown> renders something like this in its popup -->
<div class="popup" role="presentation">
  <fabric-listbox>
    <slot></slot> <!-- Default slot from <fabric-dropdown> (containing options) goes here -->
  </fabric-listbox>
</div>
```

### Handling Events (JavaScript)

When used directly, the listbox itself doesn't emit a high-level `change` event. You would typically listen for `click` events on the options or potentially observe property changes if managing selection programmatically. When used inside a `<fabric-dropdown>`, listen for the `change` event on the dropdown.

```javascript
const directListbox = document.getElementById('direct-listbox');

if (directListbox) {
  // Example: Listen for clicks on options within the listbox
  directListbox.addEventListener('click', (event) => {
    const clickedOption = event.target.closest('fabric-option');
    if (clickedOption && !clickedOption.disabled) {
      console.log(`Option clicked: ${clickedOption.value}`);
      // You might need to manually update selection state if used standalone
      // (e.g., remove 'selected' from others, add to clickedOption)
    }
  });
}
```

## API Reference (`<fabric-listbox>`)

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

*   **(default)**: Accepts one or more `<fabric-option>` elements.

### CSS Parts

*   **`listbox`**: The root element of the listbox container (role="listbox").

```css
/* Example: Style the listbox container */
fabric-listbox::part(listbox) {
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