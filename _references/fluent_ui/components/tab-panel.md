# Tab Panel (`<fluent-tab-panel>`)

Represents the content panel associated with a `<fluent-tab>`.

## Usage

Use `<fluent-tab-panel>` to wrap the content for each tab. Associate it with a specific `<fluent-tab>` using matching `id` and `aria-labelledby` attributes, and control its visibility based on the selected tab.

**Importing:**

```javascript
// Typically imported as part of TabList/Tab:
import '@fluentui/web-components/tablist/define.js';
// Or individually:
// import '@fluentui/web-components/tab-panel/define.js';
```

**Example (Paired with TabList/Tab):**

```html
<fluent-tablist>
  <fluent-tab value="tab1" id="tab1" aria-controls="panel1">Tab 1</fluent-tab>
  <fluent-tab value="tab2" id="tab2" aria-controls="panel2">Tab 2</fluent-tab>
</fluent-tablist>

<div class="panel-container">
  <fluent-tab-panel id="panel1" role="tabpanel" aria-labelledby="tab1">
    Content for Panel 1.
  </fluent-tab-panel>
  <fluent-tab-panel id="panel2" role="tabpanel" aria-labelledby="tab2" hidden>
    Content for Panel 2.
  </fluent-tab-panel>
</div>

<script>
  // Script to manage panel visibility based on tab selection
  // (See <fluent-tablist> example for basic logic)
</script>
```

## API Reference (`<fluent-tab-panel>`)

Based on `TabPanel` class.

### Attributes & Properties

This component primarily serves as a styled container and accessibility boundary. It may not have many specific attributes beyond standard HTML ones (`id`, `hidden`, etc.).

### Events

None specific to this component.

### Slots

*   **(default)**: The content to be displayed within the tab panel.

### CSS Parts

*   **`tab-panel`**: The root container element (role="tabpanel").

```css
/* Example: Style the tab panel container */
fluent-tab-panel::part(tab-panel) {
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
*   Requires `aria-labelledby` referencing the `id` of the controlling `<fluent-tab>`.
*   Should be shown/hidden programmatically based on the selected tab state, ensuring only the active panel is perceivable.
*   Typically includes `tabindex="0"` to allow keyboard focus to move into the panel content when active.
