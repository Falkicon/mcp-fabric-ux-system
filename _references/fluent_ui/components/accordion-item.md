# Accordion Item (`<fluent-accordion-item>`)

Represents an individual expandable section within a `<fluent-accordion>`.

## Usage

Place `<fluent-accordion-item>` elements inside a `<fluent-accordion>`.

**Importing:**

```javascript
// Registers <fluent-accordion> and <fluent-accordion-item>
import '@fluentui/web-components/accordion/define.js';
// Or individually if preferred:
// import '@fluentui/web-components/accordion-item/define.js';
```

**Example:**

```html
<fluent-accordion>
  <fluent-accordion-item>
    <svg slot="start" width="16" height="16" viewBox="0 0 16 16"><path d="..."/></svg>
    <span slot="heading">Panel 1 Heading</span>
    <!-- Default slot content -->
    This is the content for the first panel. It can contain any HTML.
    <svg slot="end" width="16" height="16" viewBox="0 0 16 16"><path d="..."/></svg>
  </fluent-accordion-item>

  <fluent-accordion-item expanded>
    <span slot="heading">Panel 2 Heading (Starts Expanded)</span>
    Content for the second panel.
  </fluent-accordion-item>

  <fluent-accordion-item disabled>
    <span slot="heading">Panel 3 Heading (Disabled)</span>
    Content for the third panel (will not expand by click).
  </fluent-accordion-item>
</fluent-accordion>
```

## API Reference (`<fluent-accordion-item>`)

Based on `AccordionItem` class, likely extending an `AccordionItemBase`.

### Attributes & Properties

*   **`expanded`**: `boolean` (default: `false`)
    *   Controls whether the item is expanded or collapsed. Set programmatically or as an attribute for initial state.
*   **`disabled`**: `boolean` (default: `false`)
    *   Disables the item, preventing expansion/collapse via user interaction.
*   **`heading-level`**: `1 | 2 | 3 | 4 | 5 | 6` (default: `3`)
    *   Sets the `aria-level` for the heading element within the item, influencing its semantics in the accessibility tree.
*   **`icon-position`**: `"start" | "end"` (default: `"end"`)
    *   Determines whether the expand/collapse indicator icon appears before (`start`) or after (`end`) the heading content.
*   **`id`**: `string`
    *   Used internally to associate the heading button with the content region via `aria-controls`. Automatically generated if not provided.

### Events

*   **`change`**: `CustomEvent<void>`
    *   Fired when the `expanded` state of the item changes due to user interaction.

### Slots

*   **`heading`** (Required): Content for the accordion item header (text, custom elements).
*   **(default)**: Content to display when the item is expanded.
*   **`start`**: Content placed at the start of the header, before the `heading` slot.
*   **`end`**: Content placed at the end of the header, after the `heading` slot (but before the icon if `icon-position="end"`).
*   **`expand-icon`**: Custom expand/collapse icon (replaces default chevron).

### CSS Parts

*   **`heading`**: The element containing the header slots (`start`, `heading`, `end`).
*   **`button`**: The clickable button element wrapping the heading content and icon.
*   **`icon`**: The expand/collapse indicator icon (typically a chevron).
*   **`region`**: The element containing the default slot content (visible when expanded).

```css
/* Example: Style the heading */
fluent-accordion-item::part(heading) {
  font-weight: bold;
}

/* Example: Style the content region */
fluent-accordion-item::part(region) {
  padding: var(--spacingVerticalM) var(--spacingHorizontalM);
  border-top: 1px solid var(--colorNeutralStroke2);
}

/* Example: Hide the default icon */
fluent-accordion-item::part(icon) {
   display: none;
}
```

## Styling

Customize the appearance using CSS targeting the host element (`fluent-accordion-item`) or the exposed CSS Parts.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralForeground1`: Default text color for heading and content.
    *   `--colorNeutralBackground1`: Background color for the item/region.
    *   `--colorNeutralStroke2`: Border color used between items or for the region top border.
    *   `--spacingHorizontalM`, `--spacingVerticalM`: Used for padding within the heading and region.
    *   `--fontSizeBase300`, `--fontWeightRegular`, `--fontFamilyBase`: Used for text styling.
    *   `--borderRadiusMedium`: Used for potential rounding on the item itself.
*   Refer to `accordion-item.styles.ts` for detailed token usage.

## Accessibility

*   The header functions as a `button` with `aria-expanded` indicating the state.
*   The content panel has `role="region"` and `aria-labelledby` linking it to the header button.
*   `aria-disabled` is applied based on the `disabled` attribute.
*   The `heading-level` attribute controls the semantic heading level (`aria-level`).
*   Keyboard interaction (Enter/Space to toggle, arrow keys within accordion) is handled by the parent `<fluent-accordion>` and the item.
