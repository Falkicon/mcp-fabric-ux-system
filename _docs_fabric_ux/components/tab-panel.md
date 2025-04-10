---
id: components_tab-panel
title: Tab Panel
description: Represents the content panel associated with a Tab.
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/tab-panel
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Tab Panel (`<fabric-tab-panel>`)

Represents the content panel associated with a `<fabric-tab>`.

## Usage

Use `<fabric-tab-panel>` to wrap the content for each tab. Associate it with a specific `<fabric-tab>` using matching `id` and `aria-labelledby` attributes, and control its visibility based on the selected tab.

**Importing:**

```javascript
// Typically imported as part of TabList/Tab:
import '@fabric-msft/web-components/tablist/define.js';
// Or individually:
// import '@fabric-msft/web-components/tab-panel/define.js';

// Optional: Import the types for Typescript
import type { TabPanel } from '@fabric-msft/web-components/tab-panel';
import type { TabList } from '@fabric-msft/web-components/tablist'; // Example context type
import type { Tab } from '@fabric-msft/web-components/tab'; // Example context type
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Example (Paired with TabList/Tab):**

```html
<fabric-tablist aria-label="Example Panels">
  <fabric-tab value="tab1" id="trigger-tab1" aria-controls="panel1">Tab 1</fabric-tab>
  <fabric-tab value="tab2" id="trigger-tab2" aria-controls="panel2">Tab 2</fabric-tab>
</fabric-tablist>

<div class="panel-container">
  <fabric-tab-panel id="panel1" role="tabpanel" aria-labelledby="trigger-tab1">
    Content for Panel 1.
  </fabric-tab-panel>
  <fabric-tab-panel id="panel2" role="tabpanel" aria-labelledby="trigger-tab2" hidden>
    Content for Panel 2.
  </fabric-tab-panel>
</div>

<script>
  // Script to manage panel visibility based on tab selection
  // (See <fabric-tablist> documentation for example logic)
</script>
```

### Handling Events (JavaScript)

Tab panels are primarily content containers and do not emit specific events related to tab interaction. Events are handled on the parent `<fabric-tablist>`.

## API Reference (`<fabric-tab-panel>`)

Based on `TabPanel` class.

### Attributes & Properties

This component primarily serves as a styled container and accessibility boundary. It typically relies on standard HTML attributes like `id` and `hidden` for control, rather than custom properties.

### Events

None specific to this component.

### Slots

*   **(default)**: The content to be displayed within the tab panel.

### CSS Parts

*   **`tab-panel`**: The root container element (role="tabpanel").

```css
/* Example: Style the tab panel container */
fabric-tab-panel::part(tab-panel) {
  padding: var(--spacingVerticalM) var(--spacingHorizontalM);
}
```

## Styling

Provides basic structure and padding for tab content.

*   **Key Design Tokens Used (Examples):**
    *   Padding tokens (`--spacingVerticalM`, `--spacingHorizontalM`).
    *   May inherit background/foreground colors.
*   Refer to `tab-panel.styles.ts` for detailed token usage.

## Accessibility

*   Sets `role="tabpanel"`.
*   Requires `aria-labelledby` referencing the `id` of the controlling `<fabric-tab>`.
*   Should be shown/hidden programmatically based on the selected tab state, ensuring only the active panel is perceivable (use the `hidden` attribute).
*   Typically includes `tabindex="0"` to allow keyboard focus to move into the panel content when active. 