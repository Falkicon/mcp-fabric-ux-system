---
id: components_accordion-item
title: Accordion Item
description: Represents an individual expandable section within an Accordion.
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/accordion-item
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Accordion Item (`<fabric-accordion-item>`)

Represents an individual expandable section within a `<fabric-accordion>`.

## Usage

Place `<fabric-accordion-item>` elements inside a `<fabric-accordion>`.

**Importing:**

```javascript
// Registers <fabric-accordion> and <fabric-accordion-item>
import '@fabric-msft/web-components/accordion/define.js';
// Or individually if preferred:
// import '@fabric-msft/web-components/accordion-item/define.js';

// Optional: Import the types for Typescript
import type { AccordionItem } from '@fabric-msft/web-components/accordion-item';
import type { Accordion } from '@fabric-msft/web-components/accordion'; // Example context type
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Example:**

```html
<fabric-accordion>
  <fabric-accordion-item id="item-a">
    <svg slot="start" width="16" height="16" viewBox="0 0 16 16"><path d="..."/></svg>
    <span slot="heading">Panel 1 Heading</span>
    <!-- Default slot content -->
    This is the content for the first panel. It can contain any HTML.
    <svg slot="end" width="16" height="16" viewBox="0 0 16 16"><path d="..."/></svg>
  </fabric-accordion-item>

  <fabric-accordion-item expanded>
    <span slot="heading">Panel 2 Heading (Starts Expanded)</span>
    Content for the second panel.
  </fabric-accordion-item>

  <fabric-accordion-item disabled>
    <span slot="heading">Panel 3 Heading (Disabled)</span>
    Content for the third panel (will not expand by click).
  </fabric-accordion-item>
</fabric-accordion>
```

### Handling Events (JavaScript)

The accordion item itself emits a `change` event when its state changes, but it also bubbles up to the parent `<fabric-accordion>`. It's often more convenient to listen on the parent accordion.

```javascript
const accordionItem = document.getElementById('item-a');

if (accordionItem) {
  // Listener on the item itself (less common)
  accordionItem.addEventListener('change', (event) => {
    console.log(`Accordion item ${event.target.id} changed state. Expanded: ${event.target.expanded}`);
  });
}

// Listener on the parent accordion (more common - see accordion.md example)
// const parentAccordion = accordionItem.closest('fabric-accordion');
// parentAccordion.addEventListener('change', (event) => { ... });
```

## API Reference (`<fabric-accordion-item>`)

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
    *   Used internally to associate the heading button with the content region via `aria-controls`. Automatically generated if not provided, but providing one can be useful for targeting.

### Events

*   **`change`**: `CustomEvent<void>`
    *   Fired when the `expanded` state of the item changes due to user interaction. Bubbles up.

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
fabric-accordion-item::part(heading) {
  font-weight: bold;
}

/* Example: Style the content region */
fabric-accordion-item::part(region) {
  padding: var(--spacingVerticalM) var(--spacingHorizontalM);
  border-top: 1px solid var(--colorNeutralStroke2);
}

/* Example: Hide the default icon */
fabric-accordion-item::part(icon) {
   display: none;
}
```

## Styling

Customize the appearance using CSS targeting the host element (`fabric-accordion-item`) or the exposed CSS Parts.

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
*   Keyboard interaction (Enter/Space to toggle, arrow keys within accordion) is handled by the parent `<fabric-accordion>` and the item. 