---
id: components_message-bar
title: Message Bar
description: Displays an inline message to communicate information to the user.
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/message-bar
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Message Bar (`<fabric-message-bar>`)

Displays an inline message to communicate information to the user, often related to status or feedback.

## Usage

**Importing:**

```javascript
import '@fabric-msft/web-components/message-bar/define.js';

// Optional: Import the types for Typescript
import type { MessageBar } from '@fabric-msft/web-components/message-bar';
import type { Button } from '@fabric-msft/web-components/button'; // Example action type
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Informational Message (Default Intent) -->
<fabric-message-bar>
  This is an informational message.
</fabric-message-bar>

<!-- Warning Message -->
<fabric-message-bar intent="warning">
  Warning: Please review the details below.
</fabric-message-bar>

<!-- Error Message -->
<fabric-message-bar intent="error">
  Error: Failed to save changes.
</fabric-message-bar>

<!-- Success Message -->
<fabric-message-bar intent="success">
  Success: Your profile has been updated.
</fabric-message-bar>

<!-- With Icon Slot -->
<fabric-message-bar>
  <svg slot="icon" width="16" height="16"><path d="..."/></svg>
  Message with a custom icon.
</fabric-message-bar>

<!-- With Actions Slot -->
<fabric-message-bar id="connection-msg" intent="warning">
  Could not connect. Please check your connection.
  <fabric-button slot="actions" appearance="transparent" id="retry-btn">Retry</fabric-button>
  <fabric-button slot="actions" appearance="transparent" id="dismiss-btn">Dismiss</fabric-button>
</fabric-message-bar>

<!-- Multiline Layout -->
<fabric-message-bar layout="multiline">
  This is the first line of a multiline message bar. It allows for longer content without forcing a single line.
  <fabric-button slot="actions" appearance="transparent">Action</fabric-button>
</fabric-message-bar>
```

### Handling Events (JavaScript)

The message bar itself doesn't emit specific events. You would typically listen for events (like `click`) on any interactive elements slotted into the `actions` slot.

```javascript
const connectionMessageBar = document.getElementById('connection-msg');
const retryButton = document.getElementById('retry-btn');
const dismissButton = document.getElementById('dismiss-btn');

if (retryButton) {
  retryButton.addEventListener('click', () => {
    console.log('Retry action clicked');
    // Add logic to attempt reconnection
  });
}

if (dismissButton && connectionMessageBar) {
  dismissButton.addEventListener('click', () => {
    console.log('Dismiss action clicked');
    // Add logic to hide or remove the message bar
    connectionMessageBar.hidden = true; // Example: hide the bar
  });
}
```

## API Reference (`<fabric-message-bar>`)

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
fabric-message-bar::part(icon) {
  margin-right: var(--spacingHorizontalM);
}

/* Example: Style the actions container */
fabric-message-bar::part(actions) {
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