# Dialog Body (`<fluent-dialog-body>`)

A required structural component used within `<fluent-dialog>` to organize its content, title, and actions.

## Usage

Place a single `<fluent-dialog-body>` as a direct child of a `<fluent-dialog>` element.

**Importing:**

```javascript
// Typically imported alongside Dialog:
import '@fluentui/web-components/dialog/define.js';
// Or individually:
// import '@fluentui/web-components/dialog-body/define.js';
```

**Example:**

```html
<fluent-dialog id="my-dialog">
  <fluent-dialog-body>
    <!-- Required: Content goes here -->
    <h2 slot="title">Dialog Title</h2>
    <p>Main dialog content.</p>
    <div slot="actions">
      <fluent-button>Action</fluent-button>
    </div>
  </fluent-dialog-body>
  <!-- Other elements outside body are possible but not typical for content -->
</fluent-dialog>
```

## API Reference (`<fluent-dialog-body>`)

Based on `DialogBody` class.

### Attributes & Properties

This component generally has no specific attributes or properties; it serves a structural purpose.

### Events

None specific to this component.

### Slots

*   **`title`**: The main heading/title for the dialog (content rendered near the top).
*   **(default)**: The primary content area of the dialog body.
*   **`actions`**: Container for action buttons (content rendered near the bottom).

### CSS Parts

*   **`title`**: Container for the `title` slot.
*   **`content`**: Container for the default slot.
*   **`actions`**: Container for the `actions` slot.

```css
/* Example: Add padding to the main content area */
fluent-dialog-body::part(content) {
  padding: var(--spacingVerticalL) var(--spacingHorizontalL);
}
```

## Styling

Provides the main content structure and padding within the dialog.

*   **Key Design Tokens Used (Examples):**
    *   Padding tokens (`--spacingVertical...`, `--spacingHorizontal...`) define the spacing around title, content, and actions.
    *   May inherit background/foreground colors from the parent `<fluent-dialog>`.
*   Refer to `dialog-body.styles.ts` for detailed token usage.

## Accessibility

*   Serves primarily as a structural container.
*   Accessibility roles and properties (`dialog`, `aria-labelledby`, etc.) are typically managed by the parent `<fluent-dialog>`.
*   Ensures a consistent structure for content, title, and actions within the dialog.
