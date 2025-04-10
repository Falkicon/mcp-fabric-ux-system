---
id: components_divider
title: Divider
description: Visually separates content or groups of items.
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/divider
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Divider (`<fabric-divider>`)

Visually separates content or groups of items.

## Usage

**Importing:**

```javascript
import '@fabric-msft/web-components/divider/define.js';

// Optional: Import the types for Typescript
import type { Divider } from '@fabric-msft/web-components/divider';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Within a Menu -->
<fabric-menu>
  <fabric-menu-item>Item 1</fabric-menu-item>
  <fabric-divider role="separator"></fabric-divider>
  <fabric-menu-item>Item 2</fabric-menu-item>
</fabric-menu>

<!-- Horizontal Divider (Default) -->
<div>Content Above</div>
<fabric-divider></fabric-divider>
<div>Content Below</div>

<!-- Vertical Divider -->
<div style="display: flex; align-items: center; height: 50px;">
  <span>Item A</span>
  <fabric-divider orientation="vertical" style="margin: 0 10px;"></fabric-divider>
  <span>Item B</span>
  <fabric-divider orientation="vertical" appearance="subtle" style="margin: 0 10px;"></fabric-divider>
  <span>Item C</span>
</div>
```

### Handling Events (JavaScript)

Dividers are purely presentational and do not emit specific events.

## API Reference (`<fabric-divider>`)

Based on `Divider` class extending `DividerBase`.

### Attributes & Properties

*   **`role`**: `"separator" | "presentation"` (default: `"separator"`)
    *   Sets the ARIA role. `separator` is appropriate for semantic separation (e.g., in menus, toolbars); `presentation` hides it from assistive technologies if purely decorative.
*   **`orientation`**: `"horizontal" | "vertical"` (default: `"horizontal"`)
    *   Sets the divider orientation.
*   **`appearance`**: `"default" | "subtle" | "brand"` (default: `"default"`)
    *   Adjusts the visual prominence (e.g., color, thickness).

### Events

None.

### Slots

None.

### CSS Parts

*   **`divider`**: The internal element representing the line itself.

```css
/* Example: Style the divider line */
fabric-divider::part(divider) {
  border-top-width: 3px;
  border-color: red;
}
```

## Styling

Customize appearance using CSS targeting the host element or the `divider` part.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralStroke1`, `--colorNeutralStroke2`, `--colorBrandStroke1`: Used for the line color based on `appearance`.
    *   `--strokeWidthThin`: Controls the thickness.
    *   `--spacingVertical...`, `--spacingHorizontal...`: Used for margins when `orientation` changes alignment.
*   Refer to `divider.styles.ts` for detailed token usage.

## Accessibility

*   Sets `role` based on the attribute (`separator` or `presentation`).
*   `aria-orientation` is automatically set based on the `orientation` attribute.
 