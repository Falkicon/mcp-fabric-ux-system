# Tree Item (`<fluent-tree-item>`)

Represents a single item within a `<fluent-tree>`, which can be a leaf node or contain a nested tree.

## Usage

Place `<fluent-tree-item>` elements inside a `<fluent-tree>`. Nest further `<fluent-tree>` elements within the `item-nested` slot for hierarchical structures.

**Importing:**

```javascript
// Typically imported alongside Tree:
import '@fluentui/web-components/tree/define.js';
// Or individually:
// import '@fluentui/web-components/tree-item/define.js';
```

**Example (within Tree):**

```html
<fluent-tree aria-label="File explorer">
  <fluent-tree-item>
    <span slot="start">📁</span> Documents
    <!-- Nested tree goes in the item-nested slot -->
    <fluent-tree slot="item-nested">
      <fluent-tree-item>
        <span slot="start">📄</span> Report.docx
      </fluent-tree-item>
    </fluent-tree>
  </fluent-tree-item>
  <fluent-tree-item selected>
      <span slot="start">📄</span> Readme.txt (Selected)
  </fluent-tree-item>
  <fluent-tree-item disabled>
      <span slot="start">📄</span> Archived.zip (Disabled)
  </fluent-tree-item>
</fluent-tree>
```

## API Reference (`<fluent-tree-item>`)

Based on `TreeItem` class extending `TreeItemBase`.

### Attributes & Properties

*   **`disabled`**: `boolean` (default: `false`)
    *   Disables the tree item, preventing selection and expansion.
*   **`selected`**: `boolean` (default: `false`)
    *   Indicates if the item is currently selected. Typically managed by the parent `<fluent-tree>`.
*   **`expanded`**: `boolean` (default: `false`)
    *   Controls the expanded/collapsed state if the item contains a nested tree (`item-nested` slot).
*   **`value`**: `any` (Property only)
    *   Optional property to associate custom data with the tree item.

### Events

*   **`expanded-change`**: `CustomEvent<void>` - Fired when the item is expanded or collapsed by user interaction.
*   **`selected-change`**: `CustomEvent<void>` - Fired when the item is selected by user interaction.

### Slots

*   **(default)**: The primary content/label of the tree item.
*   **`start`**: Content placed before the default slot content (e.g., icons).
*   **`end`**: Content placed after the default slot content.
*   **`expand-collapse-button`**: Custom expand/collapse indicator icon (replaces default chevron for nested items).
*   **`item-nested`**: Accepts a `<fluent-tree>` element to create a nested subtree.

### CSS Parts

*   **`control`**: The main container element for the item's content and expander.
*   **`content`**: The container for the `start`, default, and `end` slots.
*   **`expand-collapse-button`**: The expand/collapse button/indicator.

```css
/* Example: Style the main item container */
fluent-tree-item::part(control) {
  padding: var(--spacingVerticalXS) var(--spacingHorizontalS);
}

/* Example: Style the content part when selected */
fluent-tree-item([aria-selected="true"])::part(content) {
  font-weight: bold;
}
```

## Styling

Customize appearance using CSS targeting the host element or the exposed CSS Parts.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralBackground1Hover`, `--colorNeutralBackground1Selected`: Background colors for interaction states.
    *   `--colorNeutralForeground1`, `--colorNeutralForegroundDisabled`: Text colors.
    *   `--colorNeutralStrokeAccessible`: Focus indicator color.
    *   `--borderRadiusMedium`: Corner rounding.
    *   Font tokens (`--fontSizeBase...`, `--lineHeightBase...`).
    *   Padding/Spacing tokens (`--spacingVertical...`, `--spacingHorizontal...`).
    *   Indentation for nested levels is handled via CSS.
*   Refer to `tree-item.styles.ts` for detailed token usage.

## Accessibility

*   Sets `role="treeitem"`.
*   Manages `aria-selected` based on selection state.
*   Manages `aria-expanded` for items with nested trees.
*   Manages `aria-disabled` based on the `disabled` attribute.
*   Sets `aria-level` based on nesting depth.
*   Sets `aria-posinset` and `aria-setsize` based on position within its parent tree/subtree.
*   Relies on the parent `<fluent-tree>` for overall tree context and keyboard navigation.
