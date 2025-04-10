# Accordion (`<fluent-accordion>`)

A container component that groups related `<fluent-accordion-item>` elements, managing their expansion and collapse behavior.

## Usage

**Importing:**

```javascript
// Registers <fluent-accordion> and <fluent-accordion-item>
import '@fluentui/web-components/accordion/define.js';
// Or individually if preferred:
// import '@fluentui/web-components/accordion/accordion.define.js';
// import '@fluentui/web-components/accordion-item/define.js';
```

**Examples:**

Wrap one or more `<fluent-accordion-item>` elements within a `<fluent-accordion>`.

**Single expansion mode (default):**

```html
<fluent-accordion expand-mode="single">
  <fluent-accordion-item>
    <span slot="heading">Panel 1</span>
    Content for panel 1.
  </fluent-accordion-item>
  <fluent-accordion-item>
    <span slot="heading">Panel 2</span>
    Content for panel 2.
  </fluent-accordion-item>
</fluent-accordion>
```

**Multi expansion mode:** Allows multiple items to be open simultaneously.

```html
<fluent-accordion expand-mode="multi">
  <fluent-accordion-item expanded>
    <span slot="heading">Panel A</span>
    Content for panel A (starts expanded).
  </fluent-accordion-item>
  <fluent-accordion-item>
    <span slot="heading">Panel B</span>
    Content for panel B.
  </fluent-accordion-item>
  <fluent-accordion-item>
    <span slot="heading">Panel C</span>
    Content for panel C.
  </fluent-accordion-item>
</fluent-accordion>
```

## API Reference (`<fluent-accordion>`)

Based on `Accordion` class.

### Attributes & Properties

*   **`expand-mode`**: `"single" | "multi"` (default: `"single"`)
    *   Controls whether only one or multiple accordion items can be expanded at a time.
*   **`activeitemindex`** (Property only): `number`
    *   Gets or sets the index of the currently active/focused item (primarily for keyboard navigation).

### Events

*   **`change`**: `CustomEvent<AccordionItem>`
    *   Fired when the expanded state of an item within the accordion changes due to user interaction.
The `event.detail` typically contains the `AccordionItem` element that triggered the change.

### Slots

*   **(default)**: Accepts one or more `<fluent-accordion-item>` elements.

### CSS Parts

*   The `<fluent-accordion>` itself does not expose specific CSS `::part`s. Styling is primarily applied to the child `<fluent-accordion-item>` elements.

## Styling

The `<fluent-accordion>` container has minimal inherent styling (`display: block;`).

*   **Key Design Tokens Used:** None directly applied to the container itself. Spacing between items might be influenced by tokens applied within `<fluent-accordion-item>` or general layout context.
*   Customize appearance by styling the nested `<fluent-accordion-item>` components.

## Accessibility

*   Provides keyboard navigation between accordion headers (Arrow keys Up/Down, Home, End).
*   Manages focus movement between accordion headers.
*   The component itself does not typically have a specific ARIA role; roles (`button`, `region`) are managed by the child `<fluent-accordion-item>` elements.

See `<fluent-accordion-item>` documentation for details on item-specific roles and attributes.
