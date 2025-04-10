# Tab (`<fluent-tab>`)

Represents a single tab control within a `<fluent-tablist>` that activates an associated tab panel.

## Usage

Place `<fluent-tab>` elements inside a `<fluent-tablist>`. Assign a `value` and link to a panel via `aria-controls`.

**Importing:**

```javascript
// Typically imported alongside TabList:
import '@fluentui/web-components/tablist/define.js';
// Or individually:
// import '@fluentui/web-components/tab/define.js';
```

**Example (within TabList):**

```html
<fluent-tablist>
  <fluent-tab value="tab1" aria-controls="panel1">
    <svg slot="icon" width="16" height="16"><path d="..."/></svg>
    Tab 1
  </fluent-tab>
  <fluent-tab value="tab2" aria-controls="panel2">
    Tab 2
  </fluent-tab>
  <fluent-tab value="tab3" aria-controls="panel3" disabled>
    Tab 3 (Disabled)
  </fluent-tab>
</fluent-tablist>

<!-- Corresponding Panels -->
<div id="panel1" role="tabpanel" hidden>Panel 1 Content</div>
<div id="panel2" role="tabpanel">Panel 2 Content</div>
<div id="panel3" role="tabpanel" hidden>Panel 3 Content</div>
```

## API Reference (`<fluent-tab>`)

Based on `Tab` class.

### Attributes & Properties

*   **`value`**: `string` (Required)
    *   A unique value identifying the tab. Used by the parent `<fluent-tablist>`'s `selectedValue`.
*   **`disabled`**: `boolean` (default: `false`)
    *   Disables the tab, preventing selection.
*   **`selected`** (Readonly Property): `boolean`
    *   Indicates if the tab is currently selected within its group. Managed by the parent `<fluent-tablist>`.

### Events

*   **(No specific events)** Clicks/activations bubble up and are typically handled by the parent `<fluent-tablist>`'s `change` event.

### Slots

*   **(default)**: The text content or label for the tab.
*   **`icon`**: An icon to display within the tab, usually before the text content.

### CSS Parts

*   **`content`**: The main container element for the slotted icon and default content.

```css
/* Example: Style the tab content container */
fluent-tab::part(content) {
  padding: var(--spacingVerticalS) var(--spacingHorizontalM);
  gap: var(--spacingHorizontalS);
}
```

## Styling

Customize appearance using CSS targeting the host element (`fluent-tab`) or the `content` part.

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
*   Relies on the parent `<fluent-tablist>` for keyboard navigation context.
