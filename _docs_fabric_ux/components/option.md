---
id: component.option
title: Option
area: component
description: Represents a selectable item within a listbox-based component like Dropdown or Combobox.
status: Draft
source: TBD # Link to Fabric implementation source if available
specification: TBD
history:
  - Added: YYYY-MM-DD - Initial draft adapted from Fluent UI reference.
contributors:
  - Fluent UI Team
  - Fabric UX Adapters
---

# Option (`<fabric-option>`)

Represents a selectable item within a listbox-based component like `<fabric-dropdown>` or `<fabric-combobox>`.

## Usage

Place `<fabric-option>` elements inside the default slot of the parent listbox component.

**Importing:**

```javascript
// Often imported alongside its parent, e.g., Dropdown:
import '@fabric-msft/web-components/dropdown/define.js'; 
// Or individually (usually not necessary if parent is imported):
// import '@fabric-msft/web-components/option/define.js';

// Optional: Import the types for Typescript
import type { Option } from '@fabric-msft/web-components/option';
import type { Dropdown } from '@fabric-msft/web-components/dropdown'; 
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Example (within Dropdown):**

```html
<fabric-dropdown>
  <fabric-option value="1">Option 1</fabric-option>
  <fabric-option value="2" disabled>Option 2 (Disabled)</fabric-option>
  <fabric-option value="3" selected>Option 3 (Selected)</fabric-option>
  <fabric-option value="4">
    <svg slot="start" width="16" height="16"><path d="..."/></svg>
    Option 4 with Icon
  </fabric-option>
</fabric-dropdown>
```

## API Reference (`<fabric-option>`)

Based on `Option` class.

### Attributes & Properties

*   **`value`**: `string` (Required)
    *   The underlying value associated with the option, used by the parent component (e.g., Dropdown's `value`).
*   **`disabled`**: `boolean` (default: `false`)
    *   Disables the option, preventing selection.
*   **`selected`**: `boolean` (default: `false`)
    *   Indicates whether the option is currently selected. Typically managed by the parent component.
*   **`text`** (Property only): `string`
    *   Gets the text content of the option, often used by the parent component for display purposes (e.g., in the Dropdown button).

### Slots

*   **(default)**: The display content of the option (text, HTML).
*   **`start`**: Content placed before the default slot content.
*   **`end`**: Content placed after the default slot content.

### CSS Parts

*   **`content`**: The main container element for the slotted content.

```css
/* Example: Style the content container */
fabric-option::part(content) {
  padding: var(--spacingVerticalSNudge) var(--spacingHorizontalM);
}
```

## Styling

Customize appearance using CSS targeting the host element (`fabric-option`) or the `content` part.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralBackground1`, `--colorNeutralBackground1Hover`, `--colorNeutralBackground1Selected`: Background colors for different states.
    *   `--colorNeutralForeground1`, `--colorNeutralForegroundDisabled`: Text colors.
    *   `--borderRadiusNone`: Options typically have no border radius within the listbox.
    *   `--fontSizeBase300`, `--lineHeightBase300`: Text size.
    *   Padding tokens (`--spacingVertical...`, `--spacingHorizontal...`).
*   Focus indication styles (e.g., outline) are also applied using tokens.
*   Refer to `option.styles.ts` (or similar file in the component source) for detailed token usage.

## Accessibility

*   Automatically assigned `role="option"`.
*   Manages `aria-selected` based on the `selected` attribute/property.
*   Manages `aria-disabled` based on the `disabled` attribute.
*   Relies on the parent listbox component (e.g., `<fabric-dropdown>`) for overall listbox accessibility context and keyboard navigation. 