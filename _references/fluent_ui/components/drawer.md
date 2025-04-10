# Drawer (`<fluent-drawer>`)

Displays content in a panel that slides in from the edge of the screen, typically used for navigation or supplemental content.

## Usage

**Importing:**

```javascript
// Registers <fluent-drawer> and <fluent-drawer-body>
import '@fluentui/web-components/drawer/define.js';
// Also likely need Button for triggers/actions
import '@fluentui/web-components/button/define.js';
```

**Structure:**

A `<fluent-drawer>` requires a `<fluent-drawer-body>` element as a direct child to structure the main content.

**Controlling Visibility:**

Drawer visibility is primarily controlled via JavaScript methods:

*   `drawerElement.show()`: Opens the drawer (typically non-modal).
*   `drawerElement.hide()`: Closes the drawer.

**Examples:**

```html
<fluent-button id="open-drawer-btn">Open Drawer (Start)</fluent-button>
<fluent-button id="open-drawer-end-btn">Open Drawer (End)</fluent-button>

<!-- Drawer positioned at the start (left in LTR) -->
<fluent-drawer id="my-drawer" position="start">
  <fluent-drawer-body>
    <h2 slot="title">Navigation</h2>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
    <div slot="footer">
        <fluent-button id="drawer-close-btn">Close</fluent-button>
    </div>
  </fluent-drawer-body>
</fluent-drawer>

<!-- Drawer positioned at the end (right in LTR) -->
<fluent-drawer id="my-drawer-end" position="end">
  <fluent-drawer-body>
     <h2 slot="title">Details</h2>
     <p>Additional details or settings can go here.</p>
     <div slot="footer">
         <fluent-button id="drawer-end-close-btn">Close</fluent-button>
     </div>
  </fluent-drawer-body>
</fluent-drawer>

<script>
  const drawer = document.getElementById('my-drawer');
  const drawerEnd = document.getElementById('my-drawer-end');
  const openBtn = document.getElementById('open-drawer-btn');
  const openEndBtn = document.getElementById('open-drawer-end-btn');
  const closeBtn = document.getElementById('drawer-close-btn');
  const closeEndBtn = document.getElementById('drawer-end-close-btn');

  openBtn.onclick = () => drawer.show();
  openEndBtn.onclick = () => drawerEnd.show();
  closeBtn.onclick = () => drawer.hide();
  closeEndBtn.onclick = () => drawerEnd.hide();

  // Optional: Listen for close event
  drawer.addEventListener('close', () => {
    console.log('Start drawer closed');
  });
</script>
```

## API Reference (`<fluent-drawer>`)

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

### Slots (`<fluent-drawer>`)

*   **(default)**: Accepts exactly one `<fluent-drawer-body>` element.

### CSS Parts

*   **`control`**: The main drawer container element that slides in/out.
*   **`overlay`**: The backdrop element used for modal drawers.

```css
/* Example: Style the drawer panel */
fluent-drawer::part(control) {
  width: 300px;
  box-shadow: var(--shadow16);
}

/* Example: Style the modal overlay */
fluent-drawer[modal-type="modal"]::part(overlay) {
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
*   Ensure the Popover polyfill is loaded for broader browser compatibility (see [Polyfilling](../concepts/polyfilling.md)).
