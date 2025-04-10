# Drawer Body (`<fluent-drawer-body>`)

A required structural component used within `<fluent-drawer>` to organize its content.

## Usage

Place a single `<fluent-drawer-body>` as a direct child of a `<fluent-drawer>` element.

**Importing:**

```javascript
// Typically imported alongside Drawer:
import '@fluentui/web-components/drawer/define.js';
// Or individually:
// import '@fluentui/web-components/drawer-body/define.js';
```

**Example:**

```html
<fluent-drawer position="start">
  <fluent-drawer-body>
    <h2 slot="title">Drawer Title (Optional)</h2>

    <!-- Default slot content -->
    <p>Main drawer content goes here.</p>

    <div slot="footer">
        Footer content (Optional)
    </div>
  </fluent-drawer-body>
</fluent-drawer>
```

## API Reference (`<fluent-drawer-body>`)

Based on `DrawerBody` class.

### Attributes & Properties

This component generally has no specific attributes or properties; it serves a structural purpose.

### Events

None specific to this component.

### Slots

*   **(default)**: The primary content area of the drawer body.
*   **`title`**: Optional title content displayed near the top.
*   **`footer`**: Optional footer content displayed near the bottom.

### CSS Parts

*   **`title`**: Container for the `title` slot.
*   **`content`**: Container for the default slot.
*   **`footer`**: Container for the `footer` slot.

```css
/* Example: Add padding to the main content area */
fluent-drawer-body::part(content) {
  padding: var(--spacingVerticalL) var(--spacingHorizontalL);
  flex-grow: 1; /* Ensure content area fills space */
}

/* Example: Style the footer */
fleunt-drawer-body::part(footer) {
  border-top: 1px solid var(--colorNeutralStroke2);
  padding: var(--spacingVerticalM) var(--spacingHorizontalM);
}
```

## Styling

Provides the main content structure and padding within the drawer.

*   **Key Design Tokens Used (Examples):**
    *   Padding tokens (`--spacingVertical...`, `--spacingHorizontal...`) define spacing.
    *   May inherit background/foreground colors from the parent `<fluent-drawer>`.
    *   `--colorNeutralStroke2`: Default border color for footer separator.
*   Refer to `drawer-body.styles.ts` for detailed token usage.

## Accessibility

*   Serves primarily as a structural container.
*   Accessibility roles and properties (`dialog`, `aria-labelledby`, etc.) are typically managed by the parent `<fluent-drawer>`.
*   Ensures a consistent structure for content, title, and footer within the drawer.
