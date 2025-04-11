---
id: components_badge
title: Badge
description: Displays a small element for status, notifications, or short labels.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/badge
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Badge (`<fabric-badge>`)

<!-- BEGIN-SECTION: Badge Overview -->
Displays a small element for status, notifications, or short labels.
<!-- END-SECTION: Badge Overview -->

<!-- BEGIN-SECTION: Badge Usage -->
## Badge Usage (fabric-badge)

**Importing:**

```javascript
import '@fabric-msft/web-components/badge/define.js';

// Optional: Import the types for Typescript
import type { Badge } from '@fabric-msft/web-components/badge';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Standalone Badges -->
<fabric-badge>Default</fabric-badge>
<fabric-badge appearance="filled" color="brand">Brand</fabric-badge>
<fabric-badge appearance="ghost" color="danger">Danger Ghost</fabric-badge>
<fabric-badge appearance="outline" color="success">Success Outline</fabric-badge>
<fabric-badge appearance="tint" color="warning">Warning Tint</fabric-badge>

<!-- Different Sizes -->
<fabric-badge size="tiny">Tiny</fabric-badge>
<fabric-badge size="small">Small</fabric-badge>
<fabric-badge size="medium">Medium</fabric-badge>
<fabric-badge size="large">Large</fabric-badge>
<fabric-badge size="extra-large">Extra Large</fabric-badge>

<!-- Different Shapes -->
<fabric-badge shape="circular">C</fabric-badge>
<fabric-badge shape="rounded">Rounded</fabric-badge> <!-- Default -->
<fabric-badge shape="square">Square</fabric-badge>

<!-- With Icon -->
<fabric-badge>
  <svg slot="icon" width="12" height="12"><path d="..."/></svg>
  Icon
</fabric-badge>

<!-- Used with Avatar -->
<fabric-avatar>
  <img src="path/to/image.jpg" alt="User Name" />
  <fabric-badge slot="badge" size="small" color="success"></fabric-badge> <!-- Status badge -->
</fabric-avatar>
```
<!-- END-SECTION: Badge Usage -->

<!-- BEGIN-SECTION: Badge API -->
## Badge API Reference (fabric-badge)

Based on `Badge` class.

### Attributes & Properties

*   **`appearance`**: `"filled" | "ghost" | "outline" | "tint"` (default: `"filled"`)
    *   Defines the visual presentation (background, border).
*   **`color`**: `"brand" | "danger" | "important" | "informative" | "severe" | "subtle" | "success" | "warning"` (default: `"neutral"`)
    *   Sets the base color scheme.
*   **`size`**: `"tiny" | "small" | "medium" | "large" | "extra-large"` (default: `"medium"`)
    *   Sets the overall size.
*   **`shape`**: `"circular" | "rounded" | "square"` (default: `"rounded"`)
    *   Sets the shape.

### Slots

*   **(default)**: Content of the badge (text, numbers).
*   **`icon`**: An icon to display within the badge (typically before the default content).

### CSS Parts

*   **`icon`**: The container for the slotted icon.

```css
/* Example: Style the slotted icon */
fabric-badge::part(icon) {
  margin-right: var(--spacingHorizontalXS);
}
```
<!-- END-SECTION: Badge API -->

<!-- BEGIN-SECTION: Badge Styling -->
## Badge Styling (fabric-badge)

Customize appearance using CSS targeting the host element or the `icon` part.

*   **Key Design Tokens Used (Examples):**
    *   Color tokens corresponding to `color` and `appearance` attributes (e.g., `--colorBrandBackground1`, `--colorNeutralForeground2`, `--colorPaletteDangerBorder1`, `--colorSubtleBackground`).
    *   Font tokens (`--fontSizeBase...`, `--fontWeight...`, `--lineHeight...`) varying by `size`.
    *   Border radius tokens (`--borderRadiusCircular`, `--borderRadiusMedium`, `--borderRadiusSmall`, etc.) based on `shape` and `size`.
    *   Height/min-width based on `size`.
    *   Padding tokens (`--spacingHorizontal...`) based on `size`.
*   Refer to `badge.styles.ts` for detailed token mapping and logic.
<!-- END-SECTION: Badge Styling -->

<!-- BEGIN-SECTION: Badge Accessibility -->
## Badge Accessibility (fabric-badge)

*   The badge is typically presentational. By default, it doesn't have a specific ARIA `role`.
*   If the badge conveys important status information not available otherwise, consider adding `role="status"` or using `aria-live` regions on a container, or providing alternative text descriptions.
*   Ensure sufficient color contrast between the badge's text/icon and background, as determined by the chosen `color` and `appearance`.
<!-- END-SECTION: Badge Accessibility -->