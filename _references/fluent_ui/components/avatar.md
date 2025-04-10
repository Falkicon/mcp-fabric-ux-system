# Avatar (`<fluent-avatar>`)

Displays a visual representation of a user or entity, supporting images, initials, icons, and status indicators.

## Usage

**Importing:**

```javascript
import '@fluentui/web-components/avatar/define.js';
```

**Examples:**

```html
<!-- Image Avatar -->
<fluent-avatar>
  <img src="path/to/image.jpg" alt="User Name" />
</fluent-avatar>

<!-- Initials Avatar (calculated or provided) -->
<fluent-avatar name="Jane Doe">JD</fluent-avatar> <!-- Initials provided -->
<fluent-avatar name="John Smith"></fluent-avatar> <!-- Initials calculated from name -->

<!-- Icon Avatar -->
<fluent-avatar>
  <svg slot="icon" width="24" height="24" viewBox="0 0 24 24"><path d="..."/></svg>
</fluent-avatar>

<!-- With Badge -->
<fluent-avatar>
  <img src="path/to/image.jpg" alt="User Name" />
  <fluent-badge slot="badge" size="small" color="danger"></fluent-badge>
</fluent-avatar>

<!-- Different Sizes -->
<fluent-avatar size=20 name="XS"></fluent-avatar>
<fluent-avatar size=32 name="S"></fluent-avatar>
<fluent-avatar size=48 name="M"></fluent-avatar>
<fluent-avatar size=72 name="L"></fluent-avatar>
<fluent-avatar size=120 name="XL"></fluent-avatar>

<!-- Different Shapes -->
<fluent-avatar shape="square" name="SQ"></fluent-avatar>
<fluent-avatar shape="circular" name="CR"></fluent-avatar> <!-- Default -->

<!-- Active / Activity Status -->
<fluent-avatar active="active" name="Active"></fluent-avatar>
<fluent-avatar activity="busy" name="Busy"></fluent-avatar>
<fluent-avatar activity="away" name="Away"></fluent-avatar>
<fluent-avatar activity="offline" name="Offline"></fluent-avatar>

<!-- Custom Color -->
<fluent-avatar color="brand" name="Brand"></fluent-avatar>
<fluent-avatar color="dark-red" name="DR"></fluent-avatar>
<!-- Other named colors: lavender, orchid, etc. -->
```

## API Reference (`<fluent-avatar>`)

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
*   **`badge`**: Accepts a component (like `<fluent-badge>`) to display as a status or notification badge.

### CSS Parts

*   **`image`**: The `<img>` element when an image is used.
*   **`initials`**: The element displaying the initials.
*   **`icon`**: The element displaying the slotted icon.
*   **`badge`**: The container for the slotted badge.
*   **`active-indicator`**: The ring displayed when `active="active"`.
*   **`activity-indicator`**: The ring/badge displayed for `activity` states.

```css
/* Example: Style the initials */
fluent-avatar::part(initials) {
  font-style: italic;
}

/* Example: Style the activity ring */
fluent-avatar::part(activity-indicator) {
  border-width: 4px;
}
```

## Styling

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

## Accessibility

*   If using an `<img>`, ensure meaningful `alt` text is provided on the `<img>` tag itself.
*   If using initials or icons, consider if an `aria-label` on the `<fluent-avatar>` itself is needed to convey the user/entity represented, especially if the visual information alone is insufficient context.
*   The component generally doesn't add a specific `role` itself, acting as a presentational container.
