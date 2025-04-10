---
id: components_drawer
title: Drawer
description: Displays content in a panel that slides in from the edge of the screen.
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/drawer
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Drawer (`<fabric-drawer>`)

Displays content in a panel that slides in from the edge of the screen, typically used for navigation or supplemental content.

## Usage

**Importing:**

```javascript
// Registers <fabric-drawer> and <fabric-drawer-body>
import '@fabric-msft/web-components/drawer/define.js';
// Also likely need Button for triggers/actions
import '@fabric-msft/web-components/button/define.js';

// Optional: Import the types for Typescript
import type { Drawer, DrawerBody } from '@fabric-msft/web-components/drawer';
import type { Button } from '@fabric-msft/web-components/button'; // If interacting via JS
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Structure:**

A `<fabric-drawer>` requires a `<fabric-drawer-body>` element as a direct child to structure the main content.

**Controlling Visibility:**

Drawer visibility is primarily controlled via JavaScript methods:

*   `drawerElement.show()`: Opens the drawer (typically non-modal).
*   `drawerElement.hide()`: Closes the drawer.

**Examples:**

```html
<fabric-button id="open-drawer-btn">Open Drawer (Start)</fabric-button>
<fabric-button id="open-drawer-end-btn">Open Drawer (End)</fabric-button>

<!-- Drawer positioned at the start (left in LTR) -->
<fabric-drawer id="my-drawer" position="start" aria-labelledby="drawer-start-title">
  <fabric-drawer-body>
    <h2 slot="title" id="drawer-start-title">Navigation</h2>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
    <div slot="footer">
        <fabric-button id="drawer-close-btn">Close</fabric-button>
    </div>
  </fabric-drawer-body>
</fabric-drawer>

<!-- Drawer positioned at the end (right in LTR) -->
<fabric-drawer id="my-drawer-end" position="end" aria-labelledby="drawer-end-title">
  <fabric-drawer-body>
     <h2 slot="title" id="drawer-end-title">Details</h2>
     <p>Additional details or settings can go here.</p>
     <div slot="footer">
         <fabric-button id="drawer-end-close-btn">Close</fabric-button>
     </div>
  </fabric-drawer-body>
</fabric-drawer>
```

### Handling Events (JavaScript)

Drawers are controlled programmatically and emit events for opening, closing, and cancellation (if modal).

```javascript
const drawer = document.getElementById('my-drawer');
const drawerEnd = document.getElementById('my-drawer-end');
const openBtn = document.getElementById('open-drawer-btn');
const openEndBtn = document.getElementById('open-drawer-end-btn');
const closeBtn = document.getElementById('drawer-close-btn');
const closeEndBtn = document.getElementById('drawer-end-close-btn');

if (openBtn) {
  openBtn.addEventListener('click', () => drawer.show());
}
if (openEndBtn) {
  openEndBtn.addEventListener('click', () => drawerEnd.show());
}
if (closeBtn) {
  closeBtn.addEventListener('click', () => drawer.hide());
}
if (closeEndBtn) {
  closeEndBtn.addEventListener('click', () => drawerEnd.hide());
}

// Listen for drawer events
if (drawer) {
  drawer.addEventListener('open', (event) => {
    console.log('Drawer opened', event);
  });

  drawer.addEventListener('close', (event) => {
    console.log('Drawer closed', event);
  });

  // Optional: Listen for cancel (e.g., Esc key if modal)
  // drawer.addEventListener('cancel', (event) => {
  //   console.log('Drawer cancelled', event);
  //   // Default behavior closes the drawer; use event.preventDefault() to stop.
  // });
}
```

## API Reference (`<fabric-drawer>`)

Based on `Drawer` class.

### Attributes & Properties

*   **`position`**: `"start" | "end"` (default: `"start"`)
    *   Determines which edge the drawer slides in from (`left`/`right` in LTR).
*   **`modal-type`**: `"modal" | "non-modal"` (default: `"non-modal"`)
    *   Controls whether the drawer blocks interaction with the rest of the page (`modal`) or allows interaction (`non-modal`).
*   **`hidden`**: `boolean`
    *   Reflects the open/closed state (managed by show/hide methods).

### Methods

*   **`show(): void`**: Opens the drawer.
*   **`hide(): void`**: Closes the drawer.

### Events

*   **`open`**: `Event` - Fired when the drawer opens.
*   **`close`**: `Event` - Fired when the drawer closes.
*   **`cancel`**: `Event` - Fired when the drawer is dismissed via the `Esc` key (if modal).

### Slots (`<fabric-drawer>`)

*   **(default)**: Accepts exactly one `<fabric-drawer-body>` element.

### CSS Parts

*   **`control`**: The main drawer container element that slides in/out.
*   **`overlay`**: The backdrop element used for modal drawers.

```css
/* Example: Style the drawer panel */
fabric-drawer::part(control) {
  width: 300px;
  box-shadow: var(--shadow16);
}

/* Example: Style the modal overlay */
fabric-drawer[modal-type="modal"]::part(overlay) {
  background-color: rgba(0, 0, 0, 0.4);
}
```

## Styling

Customize appearance using CSS targeting the host element or the exposed CSS Parts.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralBackground1`: Background color of the drawer body.
    *   `--shadow16`, `--shadowBrand16`: Used for the drawer's elevation/shadow.
    *   `--colorNeutralBackgroundScrim`: Used for the modal overlay background.
*   Width/Height are typically controlled via CSS on the `control` part or host.
*   Transition/animation properties control the slide-in/out effect.
*   Refer to `drawer.styles.ts` for detailed token usage.

## Accessibility

*   Sets `role="dialog"`.
*   Manages `aria-modal="true"` for modal drawers.
*   Requires an accessible name via `aria-label` or `aria-labelledby` (often linking to the `title` slot in the `drawer-body`).
*   Focus is managed: trapped within modal drawers, and typically returned to the trigger element on close.
*   Dismissible via the `Esc` key (if modal).

## Dependencies

*   Relies on the HTML Popover API (`[popover]`) or its polyfill for displaying the drawer layer.
*   Ensure the Popover polyfill is loaded for broader browser compatibility (see [Polyfilling Guide](../../guides/polyfilling.md)).
