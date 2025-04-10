# Divider (`<fluent-divider>`)

Visually separates content or groups of items.

## Usage

**Importing:**

```javascript
import '@fluentui/web-components/divider/define.js';
```

**Examples:**

```html
<!-- Within a Menu -->
<fluent-menu>
  <fluent-menu-item>Item 1</fluent-menu-item>
  <fluent-divider role="separator"></fluent-divider>
  <fluent-menu-item>Item 2</fluent-menu-item>
</fluent-menu>

<!-- Horizontal Divider (Default) -->
<div>Content Above</div>
<fluent-divider></fluent-divider>
<div>Content Below</div>

<!-- Vertical Divider -->
<div style="display: flex; align-items: center; height: 50px;">
  <span>Item A</span>
  <fluent-divider orientation="vertical" style="margin: 0 10px;"></fluent-divider>
  <span>Item B</span>
  <fluent-divider orientation="vertical" appearance="subtle" style="margin: 0 10px;"></fluent-divider>
  <span>Item C</span>
</div>
```

## API Reference (`<fluent-divider>`)

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
fluent-divider::part(divider) {
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
