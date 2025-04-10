---
id: components_dialog
title: Dialog
description: Displays content in a layer above the main page, requiring user interaction.
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/dialog
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Dialog (`<fabric-dialog>`)

Displays content in a layer above the main page, typically requiring user interaction.

## Usage

**Importing:**

```javascript
// Registers <fabric-dialog> and <fabric-dialog-body>
import '@fabric-msft/web-components/dialog/define.js';
// Also likely need Button for actions
import '@fabric-msft/web-components/button/define.js';

// Optional: Import the types for Typescript
import type { Dialog, DialogBody } from '@fabric-msft/web-components/dialog';
import type { Button } from '@fabric-msft/web-components/button'; // If interacting via JS
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Structure:**

A `<fabric-dialog>` requires a `<fabric-dialog-body>` element as a direct child to structure the main content, title, and actions.

**Controlling Visibility:**

Dialog visibility is primarily controlled via JavaScript methods:

*   `dialogElement.show()`: Opens a non-modal dialog.
*   `dialogElement.showModal()`: Opens a modal dialog (blocks interaction with the rest of the page).
*   `dialogElement.hide()`: Closes the dialog.
*   `dialogElement.close(returnValue)`: Closes the dialog, optionally providing a return value (useful for forms).

**Examples:**

```html
<fabric-button id="open-modal-btn">Open Modal Dialog</fabric-button>
<fabric-button id="open-non-modal-btn">Open Non-Modal Dialog</fabric-button>

<fabric-dialog id="my-dialog">
  <fabric-dialog-body>
    <h2 slot="title">Dialog Title</h2>

    <p>This is the main content of the dialog. It can include forms, text, or other components.</p>

    <div slot="actions">
      <fabric-button id="dialog-confirm-btn" appearance="primary">Confirm</fabric-button>
      <fabric-button id="dialog-cancel-btn">Cancel</fabric-button>
    </div>
  </fabric-dialog-body>
</fabric-dialog>
```

### Handling Events (JavaScript)

Dialogs are controlled programmatically and emit events for opening, closing, and cancellation.

```javascript
const dialog = document.getElementById('my-dialog');
const openModalBtn = document.getElementById('open-modal-btn');
const openNonModalBtn = document.getElementById('open-non-modal-btn');
const confirmBtn = document.getElementById('dialog-confirm-btn');
const cancelBtn = document.getElementById('dialog-cancel-btn');

if (openModalBtn) {
  openModalBtn.addEventListener('click', () => dialog.showModal());
}
if (openNonModalBtn) {
  openNonModalBtn.addEventListener('click', () => dialog.show());
}
if (confirmBtn) {
  confirmBtn.addEventListener('click', () => dialog.close('confirm')); // Close with return value
}
if (cancelBtn) {
  cancelBtn.addEventListener('click', () => dialog.close('cancel')); // Close with return value
}

// Listen for dialog events
if (dialog) {
  dialog.addEventListener('open', (event) => {
    console.log('Dialog opened', event);
  });

  dialog.addEventListener('close', (event) => {
    console.log('Dialog closed. Return value:', dialog.returnValue, event);
    // Optionally reset form fields or take action based on returnValue
  });

  dialog.addEventListener('cancel', (event) => {
    console.log('Dialog cancelled (e.g., Esc key pressed)', event);
    // The default behavior for cancel also closes the dialog.
    // You can call event.preventDefault() here if you want to prevent closing on Esc.
  });
}
```

## API Reference (`<fabric-dialog>`)

Based on `Dialog` class.

### Attributes & Properties

*   **`modal-type`**: `"modal" | "non-modal" | "alert"` (default: `"modal"`)
    *   Influences accessibility semantics and potentially behavior (e.g., `alert` implies an alertdialog role).
*   **`trap-focus`**: `boolean` (default: `true` for modal, `false` for non-modal)
    *   Controls whether focus is contained within the dialog when open.
*   **`hidden`**: `boolean`
    *   Reflects the open/closed state (managed by show/hide methods).
*   **`returnValue`** (Property only): `string`
    *   Gets the value passed to the `close()` method.

### Methods

*   **`show(): void`**: Opens as non-modal.
*   **`showModal(): void`**: Opens as modal.
*   **`hide(): void`**: Closes the dialog.
*   **`close(returnValue?: string): void`**: Closes the dialog, optionally setting `returnValue`.

### Events

*   **`open`**: `Event` - Fired when the dialog opens.
*   **`close`**: `Event` - Fired when the dialog closes.
*   **`cancel`**: `Event` - Fired when the dialog is dismissed via the `Esc` key.

### Slots (`<fabric-dialog-body>`)

*   **`title`**: The main heading/title for the dialog.
*   **(default)**: The primary content area of the dialog body.
*   **`actions`**: Container for action buttons (e.g., Confirm, Cancel).

### CSS Parts

*   **`control`**: The main dialog container element (often has `role="dialog"`).
*   **`body`**: The `<fabric-dialog-body>` element.
*   **`title`**: Container for the `title` slot.
*   **`content`**: Container for the default slot within the body.
*   **`actions`**: Container for the `actions` slot.
*   **`overlay`**: The backdrop element used for modal dialogs.

```css
/* Example: Style the main dialog container */
fabric-dialog::part(control) {
  width: 500px;
  border: 2px solid blue;
}

/* Example: Style the title area */
fabric-dialog::part(title) {
  background-color: lightgray;
  padding: var(--spacingVerticalM) var(--spacingHorizontalM);
}

/* Example: Style the modal overlay */
fabric-dialog::part(overlay) {
  background-color: rgba(0, 0, 0, 0.7);
}
```

## Styling

Customize appearance using CSS targeting the host element or the exposed CSS Parts.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralBackground1`: Background color of the dialog body.
    *   `--colorNeutralForeground1`: Default text color.
    *   `--shadow64`: Used for the dialog's elevation/shadow.
    *   `--borderRadiusXLarge`: Corner rounding for the dialog.
    *   Padding tokens (`--spacingVertical...`, `--spacingHorizontal...`) for title, content, actions areas.
    *   `--colorNeutralBackgroundScrim`: Used for the modal overlay background.
*   Refer to `dialog.styles.ts` for detailed token usage.

## Accessibility

*   Sets `role="dialog"` or `role="alertdialog"` based on `modal-type`.
*   Manages `aria-modal="true"` for modal dialogs.
*   Uses `aria-labelledby` and `aria-describedby` (often linked implicitly to `title` slot and main content, but verify implementation or provide explicitly if needed).
*   Focus is managed: trapped within modal dialogs (`trap-focus`), and typically returned to the trigger element on close.
*   Dismissible via the `Esc` key.

## Dependencies

*   Relies on the HTML Popover API (`[popover]`) or its polyfill for displaying the dialog layer.
*   Ensure the Popover polyfill is loaded for broader browser compatibility (see [Polyfilling Guide](../../guides/polyfilling.md)).
 