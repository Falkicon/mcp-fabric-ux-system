# Menu Item (`<fluent-menu-item>`)

Represents a single command or option within a `<fluent-menu>`.

## Usage

Place `<fluent-menu-item>` elements inside a `<fluent-menu>`.

**Importing:**

```javascript
// Typically imported alongside Menu:
import '@fluentui/web-components/menu/define.js';
// Or individually:
// import '@fluentui/web-components/menu-item/define.js';
```

**Examples:**

```html
<fluent-menu>
  <!-- Standard Menu Item -->
  <fluent-menu-item>Save</fluent-menu-item>

  <!-- With Start/End Icons -->
  <fluent-menu-item>
    <svg slot="start" width="16" height="16"><path d="..."/></svg>
    Open File
    <span slot="end">Ctrl+O</span>
  </fluent-menu-item>

  <!-- Disabled Menu Item -->
  <fluent-menu-item disabled>Print (Disabled)</fluent-menu-item>

  <!-- Checkbox Menu Item -->
  <fluent-menu-item role="menuitemcheckbox" aria-checked="true">
    Show Gridlines
  </fluent-menu-item>

  <!-- Radio Menu Items (within a group) -->
  <div role="group" aria-label="Sort by">
    <fluent-menu-item role="menuitemradio" aria-checked="true">Name</fluent-menu-item>
    <fluent-menu-item role="menuitemradio" aria-checked="false">Date Modified</fluent-menu-item>
    <fluent-menu-item role="menuitemradio" aria-checked="false">Size</fluent-menu-item>
  </div>

  <!-- With Submenu -->
  <fluent-menu-item>
    Export As
    <fluent-menu slot="submenu">
        <fluent-menu-item>PDF</fluent-menu-item>
        <fluent-menu-item>JPG</fluent-menu-item>
    </fluent-menu>
  </fluent-menu-item>
</fluent-menu>
```

## API Reference (`<fluent-menu-item>`)

Based on `MenuItem` class.

### Attributes & Properties

*   **`role`**: `"menuitem" | "menuitemcheckbox" | "menuitemradio"` (default: `"menuitem"`)
    *   Defines the accessibility role and behavior (checkbox/radio roles require managing `aria-checked`).
*   **`disabled`**: `boolean` (default: `false`)
    *   Disables the menu item.
*   **`checked`**: `boolean | null` (default: `null`)
    *   Used with `role="menuitemcheckbox"` or `role="menuitemradio"` to indicate the checked state. Reflects `aria-checked`.
*   **`expanded`** (Readonly Property): `boolean`
    *   Indicates if the item has a submenu and if that submenu is currently open.

### Events

*   **`change`**: `Event`
    *   Fired when the item is clicked or activated via keyboard (unless disabled).

### Slots

*   **(default)**: The primary content/label of the menu item.
*   **`start`**: Content placed before the default slot content (e.g., icons).
*   **`end`**: Content placed after the default slot content (e.g., keyboard shortcuts, submenu indicator).
*   **`submenu`**: Accepts a `<fluent-menu>` element to create nested menus.
*   **`checkbox-indicator`**: Custom checkmark indicator for `role="menuitemcheckbox"`.
*   **`radio-indicator`**: Custom radio indicator for `role="menuitemradio"`.
*   **`expand-collapse-indicator`**: Custom indicator for items with submenus.

### CSS Parts

*   **`content`**: The main container element for the slotted content (`start`, default, `end`).
*   **`checkbox-indicator`**: Container for the checkbox indicator.
*   **`radio-indicator`**: Container for the radio indicator.
*   **`expand-collapse-indicator`**: Container for the submenu indicator.

```css
/* Example: Style the main content part */
fluent-menu-item::part(content) {
  gap: var(--spacingHorizontalM);
}

/* Example: Style the checkbox indicator part */
fluent-menu-item[role="menuitemcheckbox"]::part(checkbox-indicator) {
  color: green;
}
```

## Styling

Customize appearance using CSS targeting the host element (`fluent-menu-item`) or the exposed CSS Parts.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralBackground1Hover`, `--colorNeutralBackground1Pressed`, `--colorNeutralBackground1Selected`: Background colors for interaction states.
    *   `--colorNeutralForeground1`, `--colorNeutralForegroundDisabled`: Text colors.
    *   `--colorNeutralForeground2`: Color for secondary text/icons (e.g., in `end` slot).
    *   `--colorBrandForeground1`: Color for indicators when checked/selected.
    *   `--fontSizeBase300`, `--lineHeightBase300`: Text size.
    *   Padding tokens (`--spacingVertical...`, `--spacingHorizontal...`).
*   Refer to `menu-item.styles.ts` for detailed token usage.

## Accessibility

*   Assigns `role` based on the attribute (`menuitem`, `menuitemcheckbox`, `menuitemradio`).
*   Manages `aria-checked` for checkbox/radio roles based on the `checked` attribute.
*   Manages `aria-disabled` based on the `disabled` attribute.
*   Manages `aria-expanded` and `aria-haspopup` for items with submenus.
*   Relies on the parent `<fluent-menu>` for overall menu context and keyboard navigation between items.
