---
id: components_drawer-body
title: Drawer Body
description: A required structural component used within Drawer.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/drawer-body
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Drawer Body (`<fabric-drawer-body>`)

<!-- BEGIN-SECTION: Drawer Body Overview -->
A required structural component used within `<fabric-drawer>` to organize its content.
<!-- END-SECTION: Drawer Body Overview -->

## Usage

<!-- BEGIN-SECTION: Drawer Body Usage -->
## Drawer Body Usage (fabric-drawer-body)

Place a single `<fabric-drawer-body>` as a direct child of a `<fabric-drawer>` element.

**Importing:**

```javascript
// Typically imported alongside Drawer:
import '@fabric-msft/web-components/drawer/define.js';
// Or individually:
// import '@fabric-msft/web-components/drawer-body/define.js';

// Optional: Import the types for Typescript
import type { DrawerBody } from '@fabric-msft/web-components/drawer-body';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Example:**

```html
<fabric-drawer position="start">
  <fabric-drawer-body>
    <h2 slot="title">Drawer Title (Optional)</h2>

    <!-- Default slot content -->
    <p>Main drawer content goes here.</p>

    <div slot="footer">
        Footer content (Optional)
    </div>
  </fabric-drawer-body>
</fabric-drawer>
```

### Handling Events (JavaScript)

The drawer body is a structural element and does not emit specific events.
<!-- END-SECTION: Drawer Body Usage -->

## API Reference (`<fabric-drawer-body>`)

<!-- BEGIN-SECTION: Drawer Body API -->
## Drawer Body API Reference (fabric-drawer-body)

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
fabric-drawer-body::part(content) {
  padding: var(--spacingVerticalL) var(--spacingHorizontalL);
  flex-grow: 1; /* Ensure content area fills space */
}

/* Example: Style the footer */
fabric-drawer-body::part(footer) {
  border-top: 1px solid var(--colorNeutralStroke2);
  padding: var(--spacingVerticalM) var(--spacingHorizontalM);
}
```
<!-- END-SECTION: Drawer Body API -->

## Styling

<!-- BEGIN-SECTION: Drawer Body Styling -->
## Drawer Body Styling (fabric-drawer-body)

Provides the main content structure and padding within the drawer.

*   **Key Design Tokens Used (Examples):**
    *   Padding tokens (`--spacingVertical...`, `--spacingHorizontal...`) define spacing.
    *   May inherit background/foreground colors from the parent `<fabric-drawer>`.
    *   `--colorNeutralStroke2`: Default border color for footer separator.
*   Refer to `drawer-body.styles.ts` for detailed token usage.
<!-- END-SECTION: Drawer Body Styling -->

## Accessibility

<!-- BEGIN-SECTION: Drawer Body Accessibility -->
## Drawer Body Accessibility (fabric-drawer-body)

*   Serves primarily as a structural container.
*   Accessibility roles and properties (`dialog`, `aria-labelledby`, etc.) are typically managed by the parent `<fabric-drawer>`.
*   Ensures a consistent structure for content, title, and footer within the drawer.
<!-- END-SECTION: Drawer Body Accessibility --> 