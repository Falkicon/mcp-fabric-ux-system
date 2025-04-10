---
id: components_tab
title: Tab
description: Represents a single tab control within a TabList.
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/tab
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Tab (`<fabric-tab>`)

Represents a single tab control within a `<fabric-tablist>` that activates an associated tab panel.

## Usage

Place `<fabric-tab>` elements inside a `<fabric-tablist>`. Assign a `value` and link to a panel via `aria-controls`.

**Importing:**

```javascript
// Typically imported alongside TabList:
import '@fabric-msft/web-components/tablist/define.js';
// Or individually:
// import '@fabric-msft/web-components/tab/define.js';

// Optional: Import the types for Typescript
import type { Tab } from '@fabric-msft/web-components/tab';
import type { TabList } from '@fabric-msft/web-components/tablist'; // Example context type
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Example (within TabList):**

```html
<fabric-tablist aria-label="Sample Tabs">
  <fabric-tab value="tab1" aria-controls="panel1">
    <svg slot="icon" width="16" height="16"><path d="..."/></svg>
    Tab 1
  </fabric-tab>
  <fabric-tab value="tab2" aria-controls="panel2">
    Tab 2
  </fabric-tab>
  <fabric-tab value="tab3" aria-controls="panel3" disabled>
    Tab 3 (Disabled)
  </fabric-tab>
</fabric-tablist>

<!-- Corresponding Panels -->
<div id="panel1" role="tabpanel" aria-labelledby="tab1" hidden>Panel 1 Content</div>
<div id="panel2" role="tabpanel" aria-labelledby="tab2">Panel 2 Content</div>
<div id="panel3" role="tabpanel" aria-labelledby="tab3" hidden>Panel 3 Content</div>
```

### Handling Events (JavaScript)

Clicks and activations on `<fabric-tab>` elements are typically handled by listening for the `change` event on the parent `<fabric-tablist>`.

```javascript
const tabList = document.querySelector('fabric-tablist');

if (tabList) {
  tabList.addEventListener('change', (event) => {
    // event.target will be the fabric-tablist element
    console.log(`Tab changed: New selected value is ${event.target.selectedValue}`);
    
    // Show/hide panels based on the selected value
    const selectedValue = event.target.selectedValue;
    document.querySelectorAll('[role="tabpanel"]').forEach(panel => {
      panel.hidden = panel.id !== `panel${selectedValue.replace('tab', '')}`; // Simple example
    });
  });
}
```

## API Reference (`<fabric-tab>`)

Based on `Tab` class.

### Attributes & Properties

*   **`value`**: `string` (Required)
    *   A unique value identifying the tab. Used by the parent `<fabric-tablist>`'s `selectedValue`.
*   **`disabled`**: `boolean` (default: `false`)
    *   Disables the tab, preventing selection.
*   **`selected`** (Readonly Property): `boolean`
    *   Indicates if the tab is currently selected within its group. Managed by the parent `<fabric-tablist>`.

### Events

*   **(No specific events)** Clicks/activations bubble up and are typically handled by the parent `<fabric-tablist>`'s `change` event.

### Slots

*   **(default)**: The text content or label for the tab.
*   **`icon`**: An icon to display within the tab, usually before the text content.

### CSS Parts

*   **`content`**: The main container element for the slotted icon and default content.

```css
/* Example: Style the tab content container */
fabric-tab::part(content) {
  padding: var(--spacingVerticalS) var(--spacingHorizontalM);
  gap: var(--spacingHorizontalS);
}
```

## Styling

Customize appearance using CSS targeting the host element (`fabric-tab`) or the `content` part.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralForeground1`, `--colorNeutralForeground2`, `--colorBrandForeground1`: Text and icon color based on selection state and appearance.
    *   `--colorBrandStroke1`: Color of the active indicator line/bar.
    *   `--colorNeutralBackground1Hover`, `--colorNeutralBackground1Pressed`: Background colors for interaction states.
    *   `--strokeWidthThick`, `--strokeWidthThin`: Thickness of the active indicator.
    *   Font tokens (`--fontSizeBase...`, `--fontWeight...`) based on `size` from parent `tablist`.
    *   Padding tokens (`--spacingVertical...`, `--spacingHorizontal...`) based on `size`.
*   Refer to `tab.styles.ts` for detailed token usage related to selection, orientation, and appearance.

## Accessibility

*   Sets `role="tab"`.
*   Manages `aria-selected` based on selection state controlled by the parent `tablist`.
*   Manages `aria-disabled` based on the `disabled` attribute.
*   Requires `aria-controls` attribute linking to the ID of the associated `role="tabpanel"` element.
*   Relies on the parent `<fabric-tablist>` for keyboard navigation context. 