# Tab List (`<fluent-tablist>`)

A container component that groups related `<fluent-tab>` elements, managing their selection and activation.

## Usage

Use `<fluent-tablist>` to wrap `<fluent-tab>` elements. Corresponding tab panels should be associated using `aria-controls` on the tabs and unique IDs on the panels.

**Importing:**

```javascript
// Registers <fluent-tablist> and <fluent-tab>
import '@fluentui/web-components/tablist/define.js';
```

**Examples:**

```html
<fluent-tablist appearance="subtle" selected-value="tab2">
  <fluent-tab value="tab1" aria-controls="panel1">Tab 1</fluent-tab>
  <fluent-tab value="tab2" aria-controls="panel2">Tab 2</fluent-tab>
  <fluent-tab value="tab3" aria-controls="panel3" disabled>Tab 3 (Disabled)</fluent-tab>
</fluent-tablist>

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

<script>
  // Basic panel visibility logic (more robust solutions often needed)
  const tablist = document.querySelector('fluent-tablist');
  const panels = document.querySelectorAll('[role="tabpanel"]');

  tablist.addEventListener('change', (event) => {
    const selectedTab = event.target;
    const controlsId = selectedTab.getAttribute('aria-controls');

    panels.forEach(panel => {
      panel.hidden = (panel.id !== controlsId);
    });
  });

  // Ensure initial state matches selected-value
  document.addEventListener('DOMContentLoaded', () => {
    const initialSelectedTab = tablist.querySelector(`fluent-tab[value="${tablist.selectedValue}"]`);
    if (initialSelectedTab) {
        const initialControlsId = initialSelectedTab.getAttribute('aria-controls');
        panels.forEach(panel => {
            panel.hidden = (panel.id !== initialControlsId);
        });
    }
  });
</script>

<!-- Vertical Tablist -->
<div style="display: flex;">
  <fluent-tablist orientation="vertical" appearance="transparent">
    <fluent-tab value="vtab1">Vertical Tab 1</fluent-tab>
    <fluent-tab value="vtab2">Vertical Tab 2</fluent-tab>
  </fluent-tablist>
  <div style="padding: 10px; border: 1px solid lightgray; flex-grow: 1;">
    <!-- Corresponding panels -->
  </div>
</div>
```

## API Reference (`<fluent-tablist>`)

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
    *   Gets or sets the `value` of the currently selected `<fluent-tab>`.
*   **`activeindicator`**: `boolean` (default: `true`)
    *   Shows or hides the visual indicator (underline/bar) on the active tab.

### Events

*   **`change`**: `Event`
    *   Fired when the selected tab changes due to user interaction. The `event.target` is the newly selected `<fluent-tab>` element.

### Slots

*   **(default)**: Accepts one or more `<fluent-tab>` elements.

### CSS Parts

*   **`tablist`**: The main container element (role="tablist").

```css
/* Example: Style the tablist container */
fluent-tablist::part(tablist) {
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
*   Individual tab styling (text color, indicator color, padding) is primarily handled by `<fluent-tab>`.
*   Refer to `tablist.styles.ts` for detailed token usage.

## Accessibility

*   Sets `role="tablist"`.
*   Sets `aria-orientation` based on the `orientation` attribute.
*   Keyboard navigation (Arrow keys, Home, End) allows moving focus between enabled tabs.
*   Activation (Enter/Space) selects the focused tab (firing the `change` event).
*   Requires an accessible label for the tablist itself, usually via `aria-label` or `aria-labelledby`.
