# Tabs (`<fluent-tabs>`) - Legacy/Deprecated

**Note:** While this component exists, the recommended approach for implementing tabbed interfaces is using `<fluent-tablist>` and `<fluent-tab>` along with standard HTML elements (`div[role="tabpanel"]`) for panels. Refer to the `<fluent-tablist>` documentation for the preferred pattern.

This component provides a container for grouping `<fluent-tab>` elements and associating them with corresponding `<fluent-tab-panel>` elements.

## Usage

**Importing:**

```javascript
// Registers <fluent-tabs>, <fluent-tab>, <fluent-tab-panel>
import '@fluentui/web-components/tabs/define.js';
```

**Example:**

```html
<fluent-tabs activeid="tab2">
  <fluent-tab id="tab1">Tab One</fluent-tab>
  <fluent-tab id="tab2">Tab Two</fluent-tab>
  <fluent-tab id="tab3" disabled>Tab Three</fluent-tab>
  <fluent-tab-panel id="panel1">Content for Panel One.</fluent-tab-panel>
  <fluent-tab-panel id="panel2">Content for Panel Two.</fluent-tab-panel>
  <fluent-tab-panel id="panel3">Content for Panel Three.</fluent-tab-panel>
</fluent-tabs>
```

## API Reference (`<fluent-tabs>`)

Based on `Tabs` class.

### Attributes & Properties

*   **`activeid`**: `string`
    *   The `id` of the currently active `<fluent-tab>`.
*   **`orientation`**: `"horizontal" | "vertical"` (default: `"horizontal"`)
    *   The orientation of the tab list.
*   **`appearance`**: `"transparent" | "subtle"`
    *   Visual appearance.
*   **`size`**: `"small" | "medium" | "large"`
    *   Size of the tabs.
*   **`disabled`**: `boolean`
    *   Disables the entire tabs component.

### Events

*   **`change`**: `CustomEvent<{ activeid: string }>` - Fired when the active tab changes.

### Slots

*   **(default)**: Accepts `<fluent-tab>` and `<fluent-tab-panel>` elements.

### CSS Parts

*   **`tablist`**: The container for the `<fluent-tab>` elements.
*   **`tabpanel`**: The container for the active `<fluent-tab-panel>`.

## Styling

Applies styles similar to `<fluent-tablist>`. Refer to `tabs.styles.ts`.

## Accessibility

Manages `role="tablist"`, `role="tab"`, `role="tabpanel"`, and associated `aria-*` attributes.

**Recommendation:** Use the more explicit `<fluent-tablist>` and `<fluent-tab>` components with standard panel elements for better control and adherence to current best practices.
