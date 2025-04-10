# Message Bar (`<fluent-message-bar>`)

Displays an inline message to communicate information to the user, often related to status or feedback.

## Usage

**Importing:**

```javascript
import '@fluentui/web-components/message-bar/define.js';
```

**Examples:**

```html
<!-- Informational Message (Default Intent) -->
<fluent-message-bar>
  This is an informational message.
</fluent-message-bar>

<!-- Warning Message -->
<fluent-message-bar intent="warning">
  Warning: Please review the details below.
</fluent-message-bar>

<!-- Error Message -->
<fluent-message-bar intent="error">
  Error: Failed to save changes.
</fluent-message-bar>

<!-- Success Message -->
<fluent-message-bar intent="success">
  Success: Your profile has been updated.
</fluent-message-bar>

<!-- With Icon Slot -->
<fluent-message-bar>
  <svg slot="icon" width="16" height="16"><path d="..."/></svg>
  Message with a custom icon.
</fluent-message-bar>

<!-- With Actions Slot -->
<fluent-message-bar intent="warning">
  Could not connect. Please check your connection.
  <fluent-button slot="actions" appearance="transparent">Retry</fluent-button>
  <fluent-button slot="actions" appearance="transparent">Dismiss</fluent-button>
</fluent-message-bar>

<!-- Multiline Layout -->
<fluent-message-bar layout="multiline">
  This is the first line of a multiline message bar. It allows for longer content without forcing a single line.
  <fluent-button slot="actions" appearance="transparent">Action</fluent-button>
</fluent-message-bar>
```

## API Reference (`<fluent-message-bar>`)

Based on `MessageBar` class.

### Attributes & Properties

*   **`intent`**: `"info" | "warning" | "error" | "success"` (default: `"info"`)
    *   Sets the color scheme and default icon based on the message's purpose.
*   **`layout`**: `"singleline" | "multiline"` (default: `"singleline"`)
    *   Controls the layout arrangement, particularly how actions are positioned relative to the message content.

### Events

None specific to this component.

### Slots

*   **(default)**: The primary message content.
*   **`icon`**: An icon to display (replaces the default intent icon).
*   **`actions`**: Action elements (like buttons) related to the message.

### CSS Parts

*   **`icon`**: Container for the icon (default or slotted).
*   **`content`**: Container for the default slot content.
*   **`actions`**: Container for the `actions` slot.

```css
/* Example: Style the icon container */
fluent-message-bar::part(icon) {
  margin-right: var(--spacingHorizontalM);
}

/* Example: Style the actions container */
fluent-message-bar::part(actions) {
  margin-left: auto; /* Push actions to the end in singleline layout */
}
```

## Styling

Customize appearance using CSS targeting the host element or the exposed CSS Parts.

*   **Key Design Tokens Used (Examples):**
    *   Intent-specific color tokens for background, foreground (text), and icon color (e.g., `--colorPaletteBlueBackground1`, `--colorPaletteRedForeground1`, `--colorPaletteYellowBackground1`, `--colorPaletteGreenForeground1`).
    *   `--borderRadiusMedium`: Corner rounding.
    *   Padding tokens (`--spacingVertical...`, `--spacingHorizontal...`).
    *   Font tokens (`--fontSizeBase...`, `--lineHeightBase...`).
*   Refer to `message-bar.styles.ts` for detailed token mapping based on `intent` and `layout`.

## Accessibility

*   Sets `role="status"` by default. For important error messages requiring immediate attention, consider manually adding `role="alert"` or using `aria-live="assertive"` on the message bar or a container.
*   The default intent icons provide visual cues but may not have specific `alt` text; ensure the message text itself is clear.
*   Actionable elements within the `actions` slot must be keyboard accessible.
