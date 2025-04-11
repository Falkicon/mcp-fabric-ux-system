---
id: components_tablist
title: Tab List
description: A container component that groups related Tab elements.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/tablist
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Tab List (`<fabric-tablist>`)

A container component that groups related `<fabric-tab>` elements, managing their selection and activation.

## Usage

Use `<fabric-tablist>` to wrap `<fabric-tab>` elements. Corresponding tab panels should be associated using `aria-controls` on the tabs and unique IDs on the panels.

**Importing:**

```javascript
// Registers <fabric-tablist> and <fabric-tab>
import '@fabric-msft/web-components/tablist/define.js';

// Optional: Import the types for Typescript
import type { TabList } from '@fabric-msft/web-components/tablist';
import type { Tab } from '@fabric-msft/web-components/tab'; // Example
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<fabric-tablist id="my-tablist" appearance="subtle" selected-value="tab2" aria-label="Sample Tabs">
  <fabric-tab value="tab1" aria-controls="panel1">Tab 1</fabric-tab>
  <fabric-tab value="tab2" aria-controls="panel2">Tab 2</fabric-tab>
  <fabric-tab value="tab3" aria-controls="panel3" disabled>Tab 3 (Disabled)</fabric-tab>
</fabric-tablist>

<div style="padding: 10px; border: 1px solid lightgray; margin-top: -1px;">
  <div id="panel1" role="tabpanel" tabindex="0" aria-labelledby="tab1" hidden>
    Content for Panel 1.
  </div>
  <div id="panel2" role="tabpanel" tabindex="0" aria-labelledby="tab2">
    Content for Panel 2 (Initially visible).
  </div>
  <div id="panel3" role="tabpanel" tabindex="0" aria-labelledby="tab3" hidden>
    Content for Panel 3.
  </div>
</div>

<!-- Vertical Tablist -->
<div style="display: flex;">
  <fabric-tablist orientation="vertical" appearance="transparent" aria-label="Vertical Tabs">
    <fabric-tab value="vtab1">Vertical Tab 1</fabric-tab>
    <fabric-tab value="vtab2">Vertical Tab 2</fabric-tab>
  </fabric-tablist>
  <div style="padding: 10px; border: 1px solid lightgray; flex-grow: 1;">
    <!-- Corresponding panels -->
  </div>
</div>
```

### Handling Events (JavaScript)

The tablist emits a `change` event when the selected tab is changed by the user.

```javascript
const tablist = document.getElementById('my-tablist');
const panels = document.querySelectorAll('#panel1, #panel2, #panel3');

if (tablist) {
  tablist.addEventListener('change', (event) => {
    // The event.target is the fabric-tablist itself.
    // The newly selected tab value is in event.target.selectedValue
    const selectedValue = event.target.selectedValue;
    console.log(`Tab changed: Selected value = ${selectedValue}`);
    
    // Find the corresponding panel ID
    const selectedTab = event.target.querySelector(`fabric-tab[value="${selectedValue}"]`);
    const controlsId = selectedTab ? selectedTab.getAttribute('aria-controls') : null;

    // Show the correct panel and hide others
    panels.forEach(panel => {
      panel.hidden = (panel.id !== controlsId);
    });
  });
}

// It's also crucial to set the initial panel visibility based on the 
// tablist's initial selected-value attribute.
function setInitialPanelVisibility() {
    if (!tablist) return;
    const initialSelectedTab = tablist.querySelector(`fabric-tab[value="${tablist.selectedValue}"]`);
    if (initialSelectedTab) {
        const initialControlsId = initialSelectedTab.getAttribute('aria-controls');
        panels.forEach(panel => {
            panel.hidden = (panel.id !== initialControlsId);
        });
    }
}

// Run on load or when components are defined
// Replace with appropriate framework lifecycle hook if needed
document.addEventListener('DOMContentLoaded', setInitialPanelVisibility);
// Or if using dynamic imports/definitions:
// customElements.whenDefined('fabric-tablist').then(setInitialPanelVisibility);

```

## API Reference (`<fabric-tablist>`)

Based on `TabList` class extending `TabListBase`.

### Attributes & Properties

*   **`appearance`**: `"transparent" | "subtle"` (default: `"transparent"`)
    *   Adjusts the visual style of the tabs and the container.
*   **`size`**: `"small" | "medium" | "large"` (default: `"medium"`)
    *   Sets the size (padding, font size) of the tabs within the list.
*   **`orientation`**: `"horizontal" | "vertical"` (default: `"horizontal"`)
    *   Sets the orientation of the tab list.
*   **`disabled`**: `boolean` (default: `false`)
    *   Disables all tabs within the list.
*   **`selectedValue`**: `string`
    *   Gets or sets the `value` of the currently selected `<fabric-tab>`.
*   **`activeindicator`**: `boolean` (default: `true`)
    *   Shows or hides the visual indicator (underline/bar) on the active tab.

### Events

*   **`change`**: `Event`
    *   Fired when the selected tab changes due to user interaction. The `event.target` is the `<fabric-tablist>` element.

### Slots

*   **(default)**: Accepts one or more `<fabric-tab>` elements.

### CSS Parts

*   **`tablist`**: The main container element (role="tablist").

```css
/* Example: Style the tablist container */
fabric-tablist::part(tablist) {
  border-bottom: 2px solid lightgray;
}
```

## Styling

Provides layout for tabs and applies overall appearance styles.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralBackground1`, `--colorSubtleBackground`: Background for subtle appearance.
    *   `--colorNeutralStroke1`, `--colorNeutralStroke2`: Border colors used for the bottom/side line depending on orientation and appearance.
    *   `--spacingHorizontal...`: Controls gap between horizontal tabs.
    *   `--spacingVertical...`: Controls gap between vertical tabs.
*   Individual tab styling (text color, indicator color, padding) is primarily handled by `<fabric-tab>`.
*   Refer to `tablist.styles.ts` for detailed token usage.

## Accessibility

*   Sets `role="tablist"`.
*   Sets `aria-orientation` based on the `orientation` attribute.
*   Keyboard navigation (Arrow keys, Home, End) allows moving focus between enabled tabs.
*   Activation (Enter/Space) selects the focused tab (firing the `change` event).
*   Requires an accessible label for the tablist itself, usually via `aria-label` or `aria-labelledby`. 