---
id: components_avatar
title: Avatar
description: Displays a visual representation of a user or entity.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/avatar
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Avatar (`<fabric-avatar>`)

<!-- BEGIN-SECTION: Avatar Overview -->
Displays a visual representation of a user or entity, supporting images, initials, icons, and status indicators.
<!-- END-SECTION: Avatar Overview -->

<!-- BEGIN-SECTION: Avatar Usage -->
## Avatar Usage (fabric-avatar)

**Importing:**

```javascript
import '@fabric-msft/web-components/avatar/define.js';

// Optional: Import the types for Typescript
import type { Avatar } from '@fabric-msft/web-components/avatar';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Image Avatar -->
<fabric-avatar>
  <img src="path/to/image.jpg" alt="User Name" />
</fabric-avatar>

<!-- Initials Avatar (calculated or provided) -->
<fabric-avatar name="Jane Doe">JD</fabric-avatar> <!-- Initials provided -->
<fabric-avatar name="John Smith"></fabric-avatar> <!-- Initials calculated from name -->

<!-- Icon Avatar -->
<fabric-avatar>
  <svg slot="icon" width="24" height="24" viewBox="0 0 24 24"><path d="..."/></svg>
</fabric-avatar>

<!-- With Badge -->
<fabric-avatar>
  <img src="path/to/image.jpg" alt="User Name" />
  <fabric-badge slot="badge" size="small" color="danger"></fabric-badge>
</fabric-avatar>

<!-- Different Sizes -->
<fabric-avatar size=20 name="XS"></fabric-avatar>
<fabric-avatar size=32 name="S"></fabric-avatar>
<fabric-avatar size=48 name="M"></fabric-avatar>
<fabric-avatar size=72 name="L"></fabric-avatar>
<fabric-avatar size=120 name="XL"></fabric-avatar>

<!-- Different Shapes -->
<fabric-avatar shape="square" name="SQ"></fabric-avatar>
<fabric-avatar shape="circular" name="CR"></fabric-avatar> <!-- Default -->

<!-- Active / Activity Status -->
<fabric-avatar active="active" name="Active"></fabric-avatar>
<fabric-avatar activity="busy" name="Busy"></fabric-avatar>
<fabric-avatar activity="away" name="Away"></fabric-avatar>
<fabric-avatar activity="offline" name="Offline"></fabric-avatar>

<!-- Custom Color -->
<fabric-avatar color="brand" name="Brand"></fabric-avatar>
<fabric-avatar color="dark-red" name="DR"></fabric-avatar>
<!-- Other named colors: lavender, orchid, etc. -->
```
<!-- END-SECTION: Avatar Usage -->

<!-- BEGIN-SECTION: Avatar API -->
## Avatar API Reference (fabric-avatar)

Based on `Avatar` class extending `AvatarBase`.

### Attributes & Properties

*   **`size`**: `20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120 | 128` (default: `32` for size < 72, `96` otherwise, inferred)
    *   Sets the avatar dimensions in pixels.
*   **`shape`**: `"circular" | "square"` (default: `"circular"`)
    *   Sets the overall shape.
*   **`active`**: `"active" | "inactive"` (default: `"inactive"`)
    *   Displays an active indicator (typically a green ring).
*   **`activity`**: `"available" | "away" | "busy" | "dnd" | "blocked" | "offline" | "out-of-office"`
    *   Displays a status badge/ring based on the activity state.
*   **`color`**: `"neutral" | "brand" | "colorful" | "dark-red" | "cranberry" | ... (many named colors)`
    *   Sets the background color, especially for initials/icon avatars. If `"colorful"`, a color is derived from the `name` attribute.
*   **`name`**: `string`
    *   Used to calculate initials if no initials or icon are provided in the default slot, and potentially for deriving a `colorful` background.
*   **`initials`**: `string`
    *   Explicitly sets the initials displayed. Overrides calculated initials from `name`.

### Slots

*   **(default)**: Accepts an `<img>` element for image avatars, or text content for initials.
*   **`icon`**: Accepts an icon element (e.g., `<svg>`) to display instead of an image or initials.
*   **`badge`**: Accepts a component (like `<fabric-badge>`) to display as a status or notification badge.

### CSS Parts

*   **`image`**: The `<img>` element when an image is used.
*   **`initials`**: The element displaying the initials.
*   **`icon`**: The element displaying the slotted icon.
*   **`badge`**: The container for the slotted badge.
*   **`active-indicator`**: The ring displayed when `active="active"`.
*   **`activity-indicator`**: The ring/badge displayed for `activity` states.

```css
/* Example: Style the initials */
fabric-avatar::part(initials) {
  font-style: italic;
}

/* Example: Style the activity ring */
fabric-avatar::part(activity-indicator) {
  border-width: 4px;
}
```
<!-- END-SECTION: Avatar API -->

<!-- BEGIN-SECTION: Avatar Styling -->
## Avatar Styling (fabric-avatar)

Customize appearance using CSS targeting the host element or the exposed CSS Parts.

*   **Key Design Tokens Used (Examples):**
    *   Tokens for various named colors (e.g., `--colorBrandBackground1`, `--colorPaletteDarkRedBackground1`, etc.) are used for the `color` attribute.
    *   `--colorNeutralForegroundOnBrand`, `--colorNeutralForegroundInverted`: Used for text/icon color on colored backgrounds.
    *   `--colorNeutralStrokeAccessible`: Border for the `active` indicator.
    *   `--colorStatus...`: Various status colors used for the `activity` indicator.
    *   `--borderRadiusCircular`, `--borderRadiusMedium`: Used for `shape`.
    *   Font tokens (`--fontSizeBase...`, `--fontWeight...`) for initials.
*   Sizing is controlled directly by the `size` attribute rather than standard spacing tokens.
*   Refer to `avatar.styles.ts` for detailed token mapping and logic.
<!-- END-SECTION: Avatar Styling -->

<!-- BEGIN-SECTION: Avatar Accessibility -->
## Avatar Accessibility (fabric-avatar)

*   If using an `<img>`, ensure meaningful `alt` text is provided on the `<img>` tag itself.
*   If using initials or icons, consider if an `aria-label` on the `<fabric-avatar>` itself is needed to convey the user/entity represented, especially if the visual information alone is insufficient context.
*   The component generally doesn't add a specific `role` itself, acting as a presentational container.
<!-- END-SECTION: Avatar Accessibility -->