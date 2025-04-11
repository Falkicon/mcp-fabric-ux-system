---
id: components_accordion
title: Accordion
description: An accordion component allows users to toggle the visibility of content sections.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/accordion
specification: TBD  # Link to design spec if available
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Accordion (`<fabric-accordion>`)

The accordion component allows users to toggle the visibility of sections of content. It includes accordion items, each with a header and a panel that can be expanded or collapsed.

## Usage

**Importing:**

```javascript
// Import the component definition
import '@fabric-msft/web-components/accordion/define.js';

// Optional: Import the types for Typescript
import type { Accordion, AccordionItem } from '@fabric-msft/web-components/accordion';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Default: Only one item open at a time -->
<fabric-accordion id="my-accordion">
  <fabric-accordion-item id="item1">
    <span slot="heading">Panel 1</span>
    Content for Panel 1
  </fabric-accordion-item>
  <fabric-accordion-item id="item2">
    <span slot="heading">Panel 2</span>
    Content for Panel 2
  </fabric-accordion-item>
</fabric-accordion>

<!-- Allow multiple items open simultaneously -->
<fabric-accordion expand-mode="multi">
  <fabric-accordion-item expanded>
    <span slot="heading">Panel A (starts expanded)</span>
    Content for Panel A
  </fabric-accordion-item>
  <fabric-accordion-item>
    <span slot="heading">Panel B</span>
    Content for Panel B
  </fabric-accordion-item>
  <fabric-accordion-item>
    <span slot="heading">Panel C</span>
    Content for Panel C
  </fabric-accordion-item>
</fabric-accordion>
```

### Handling Events (JavaScript)

The accordion emits a `change` event when the expanded state of an item changes due to user interaction. You can listen for this on the `<fabric-accordion>` element.

```javascript
const accordion = document.getElementById('my-accordion');

if (accordion) {
  accordion.addEventListener('change', (event) => {
    // The event.target will be the fabric-accordion-item that was changed.
    const changedItem = event.target;

    if (changedItem.matches('fabric-accordion-item')) {
        console.log(`Accordion item ${changedItem.id} changed. Expanded: ${changedItem.expanded}`);
        // Add logic to react to the accordion item changing state
    }
  });
}
```

## API Reference

### `<fabric-accordion>`