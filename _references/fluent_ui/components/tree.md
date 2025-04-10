# Tree (`<fluent-tree>`)

A container component for hierarchical lists of `<fluent-tree-item>` elements, managing nested structures and interactions.

## Usage

Wrap nested `<fluent-tree-item>` elements within a `<fluent-tree>`.

**Importing:**

```javascript
// Registers <fluent-tree> and <fluent-tree-item>
import '@fluentui/web-components/tree/define.js';
```

**Examples:**

```html
<fluent-tree aria-label="File explorer">
  <fluent-tree-item>
    <span slot="start">📁</span> Documents
    <fluent-tree slot="item-nested">
      <fluent-tree-item>
        <span slot="start">📄</span> Report.docx
      </fluent-tree-item>
      <fluent-tree-item>
        <span slot="start">📄</span> Proposal.pdf
      </fluent-tree-item>
    </fluent-tree>
  </fluent-tree-item>
  <fluent-tree-item>
    <span slot="start">📁</span> Pictures
    <fluent-tree slot="item-nested">
      <fluent-tree-item>
        <span slot="start">🖼️</span> Vacation.jpg
      </fluent-tree-item>
      <fluent-tree-item disabled>
        <span slot="start">🖼️</span> Old_Photo.png (Disabled)
      </fluent-tree-item>
    </fluent-tree>
  </fluent-tree-item>
  <fluent-tree-item selected>
      <span slot="start">📄</span> Readme.txt (Selected)
  </fluent-tree-item>
</fluent-tree>
```

## API Reference (`<fluent-tree>`)

Based on `Tree` class extending `TreeBase`.

### Attributes & Properties

*   **`render-collapsed-nodes`**: `boolean` (default: `false`)
    *   If true, nodes for collapsed subtrees are still rendered in the DOM (may impact performance for very large trees).

### Events

*   **`selected-change`**: `CustomEvent<TreeItem | null>` - Fired when the selected item within the tree changes.
*   **`expanded-change`**: `CustomEvent<TreeItem>` - Fired when a tree item is expanded or collapsed.

### Slots

*   **(default)**: Accepts one or more `<fluent-tree-item>` elements.

### CSS Parts

*   **`tree`**: The main container element (role="tree").

```css
/* Example: Style the tree container */
fluent-tree::part(tree) {
  padding-left: 0; /* Override default list styling */
  list-style: none;
}
```

## Styling

The `<fluent-tree>` container itself has minimal styling.

*   **Key Design Tokens Used:** None directly applied to the container. Spacing and appearance are primarily handled by `<fluent-tree-item>`.
*   Customize appearance by styling the nested `<fluent-tree-item>` components.

## Accessibility

*   Sets `role="tree"`.
*   Requires an accessible label via `aria-label` or `aria-labelledby`.
*   Manages keyboard navigation between tree items (Arrow keys Up/Down/Left/Right, Home, End).
*   Handles expand/collapse state communication.
*   Supports single selection via `aria-selected` managed on the items.

See `<fluent-tree-item>` documentation for details on item-specific roles and attributes.
