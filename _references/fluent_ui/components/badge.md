# Badge (`<fluent-badge>`)

Displays a small element for status, notifications, or short labels.

## Usage

**Importing:**

```javascript
import '@fluentui/web-components/badge/define.js';
```

**Examples:**

```html
<!-- Standalone Badges -->
<fluent-badge>Default</fluent-badge>
<fluent-badge appearance="filled" color="brand">Brand</fluent-badge>
<fluent-badge appearance="ghost" color="danger">Danger Ghost</fluent-badge>
<fluent-badge appearance="outline" color="success">Success Outline</fluent-badge>
<fluent-badge appearance="tint" color="warning">Warning Tint</fluent-badge>

<!-- Different Sizes -->
<fluent-badge size="tiny">Tiny</fluent-badge>
<fluent-badge size="small">Small</fluent-badge>
<fluent-badge size="medium">Medium</fluent-badge>
<fluent-badge size="large">Large</fluent-badge>
<fluent-badge size="extra-large">Extra Large</fluent-badge>

<!-- Different Shapes -->
<fluent-badge shape="circular">C</fluent-badge>
<fluent-badge shape="rounded">Rounded</fluent-badge> <!-- Default -->
<fluent-badge shape="square">Square</fluent-badge>

<!-- With Icon -->
<fluent-badge>
  <svg slot="icon" width="12" height="12"><path d="..."/></svg>
  Icon
</fluent-badge>

<!-- Used with Avatar -->
<fluent-avatar>
  <img src="path/to/image.jpg" alt="User Name" />
  <fluent-badge slot="badge" size="small" color="success"></fluent-badge> <!-- Status badge -->
</fluent-avatar>
```

## API Reference (`<fluent-badge>`)

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
fluent-badge::part(icon) {
  margin-right: var(--spacingHorizontalXS);
}
```

## Styling

Customize appearance using CSS targeting the host element or the `icon` part.

*   **Key Design Tokens Used (Examples):**
    *   Color tokens corresponding to `color` and `appearance` attributes (e.g., `--colorBrandBackground1`, `--colorNeutralForeground2`, `--colorPaletteDangerBorder1`, `--colorSubtleBackground`).
    *   Font tokens (`--fontSizeBase...`, `--fontWeight...`, `--lineHeight...`) varying by `size`.
    *   Border radius tokens (`--borderRadiusCircular`, `--borderRadiusMedium`, `--borderRadiusSmall`, etc.) based on `shape` and `size`.
    *   Height/min-width based on `size`.
    *   Padding tokens (`--spacingHorizontal...`) based on `size`.
*   Refer to `badge.styles.ts` for detailed token mapping and logic.

## Accessibility

*   The badge is typically presentational. By default, it doesn't have a specific ARIA `role`.
*   If the badge conveys important status information not available otherwise, consider adding `role="status"` or using `aria-live` regions on a container, or providing alternative text descriptions.
*   Ensure sufficient color contrast between the badge's text/icon and background, as determined by the chosen `color` and `appearance`.
