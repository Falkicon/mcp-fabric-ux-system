# Option (`<fluent-option>`)

Represents a selectable item within a listbox-based component like `<fluent-dropdown>` or `<fluent-combobox>`.

## Usage

Place `<fluent-option>` elements inside the default slot of the parent listbox component.

**Importing:**

```javascript
// Often imported alongside its parent, e.g., Dropdown:
import '@fluentui/web-components/dropdown/define.js';
// Or individually:
// import '@fluentui/web-components/option/define.js';
```

**Example (within Dropdown):**

```html
<fluent-dropdown>
  <fluent-option value="1">Option 1</fluent-option>
  <fluent-option value="2" disabled>Option 2 (Disabled)</fluent-option>
  <fluent-option value="3" selected>Option 3 (Selected)</fluent-option>
  <fluent-option value="4">
    <svg slot="start" width="16" height="16"><path d="..."/></svg>
    Option 4 with Icon
  </fluent-option>
</fluent-dropdown>
```

## API Reference (`<fluent-option>`)

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
fluent-option::part(content) {
  padding: var(--spacingVerticalSNudge) var(--spacingHorizontalM);
}
```

## Styling

Customize appearance using CSS targeting the host element (`fluent-option`) or the `content` part.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralBackground1`, `--colorNeutralBackground1Hover`, `--colorNeutralBackground1Selected`: Background colors for different states.
    *   `--colorNeutralForeground1`, `--colorNeutralForegroundDisabled`: Text colors.
    *   `--borderRadiusNone`: Options typically have no border radius within the listbox.
    *   `--fontSizeBase300`, `--lineHeightBase300`: Text size.
    *   Padding tokens (`--spacingVertical...`, `--spacingHorizontal...`).
*   Focus indication styles (e.g., outline) are also applied using tokens.
*   Refer to `option.styles.ts` for detailed token usage.

## Accessibility

*   Automatically assigned `role="option"`.
*   Manages `aria-selected` based on the `selected` attribute/property.
*   Manages `aria-disabled` based on the `disabled` attribute.
*   Relies on the parent listbox component (e.g., `<fluent-dropdown>`) for overall listbox accessibility context and keyboard navigation.
