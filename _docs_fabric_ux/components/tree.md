---
id: components_tree
title: Tree
description: A container component for hierarchical lists of Tree Items.
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/tree
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Tree (`<fabric-tree>`)

A container component for hierarchical lists of `<fabric-tree-item>` elements, managing nested structures and interactions.

## Usage

Wrap nested `<fabric-tree-item>` elements within a `<fabric-tree>`.

**Importing:**

```javascript
// Registers <fabric-tree> and <fabric-tree-item>
import '@fabric-msft/web-components/tree/define.js';

// Optional: Import the types for Typescript
import type { TreeView } from '@fabric-msft/web-components/tree';
import type { TreeItem } from '@fabric-msft/web-components/tree-item'; // Example
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<fabric-tree id="file-tree" aria-label="File explorer">
  <fabric-tree-item>
    <span slot="start">📁</span> Documents
    <fabric-tree slot="item-nested">
      <fabric-tree-item>
        <span slot="start">📄</span> Report.docx
      </fabric-tree-item>
      <fabric-tree-item>
        <span slot="start">📄</span> Proposal.pdf
      </fabric-tree-item>
    </fabric-tree>
  </fabric-tree-item>
  <fabric-tree-item>
    <span slot="start">📁</span> Pictures
    <fabric-tree slot="item-nested">
      <fabric-tree-item>
        <span slot="start">🖼️</span> Vacation.jpg
      </fabric-tree-item>
      <fabric-tree-item disabled>
        <span slot="start">🖼️</span> Old_Photo.png (Disabled)
      </fabric-tree-item>
    </fabric-tree>
  </fabric-tree-item>
  <fabric-tree-item selected>
      <span slot="start">📄</span> Readme.txt (Selected)
  </fabric-tree-item>
</fabric-tree>
```

### Handling Events (JavaScript)

Listen for `selected-change` and `expanded-change` on the root `<fabric-tree>` to react to user interactions within the entire tree structure.

```javascript
const fileTree = document.getElementById('file-tree');

if (fileTree) {
  fileTree.addEventListener('selected-change', (event) => {
    // event.detail contains the newly selected <fabric-tree-item> or null
    const selectedItem = event.detail;
    if (selectedItem) {
      console.log(`Tree selection changed: ${selectedItem.textContent.trim()}`);
      // Potentially load content based on selection
    } else {
      console.log('Tree selection cleared');
    }
  });

  fileTree.addEventListener('expanded-change', (event) => {
    // event.detail contains the <fabric-tree-item> that was expanded/collapsed
    const changedItem = event.detail;
    console.log(`Tree item expanded/collapsed: ${changedItem.textContent.trim()}, Expanded: ${changedItem.expanded}`);
  });
}
```

## API Reference (`<fabric-tree>`)

Based on `Tree` class extending `TreeBase`.

### Attributes & Properties

*   **`render-collapsed-nodes`**: `boolean` (default: `false`)
    *   If true, nodes for collapsed subtrees are still rendered in the DOM (may impact performance for very large trees).

### Events

*   **`selected-change`**: `CustomEvent<TreeItem | null>` - Fired when the selected item within the tree changes.
*   **`expanded-change`**: `CustomEvent<TreeItem>` - Fired when a tree item is expanded or collapsed.

### Slots

*   **(default)**: Accepts one or more `<fabric-tree-item>` elements.

### CSS Parts

*   **`tree`**: The main container element (role="tree").

```css
/* Example: Style the tree container */
fabric-tree::part(tree) {
  padding-left: 0; /* Override default list styling */
  list-style: none;
}
```

## Styling

The `<fabric-tree>` container itself has minimal styling.

*   **Key Design Tokens Used:** None directly applied to the container. Spacing and appearance are primarily handled by `<fabric-tree-item>`.
*   Customize appearance by styling the nested `<fabric-tree-item>` components.

## Accessibility

*   Sets `role="tree"`.
*   Requires an accessible label via `aria-label` or `aria-labelledby`.
*   Manages keyboard navigation between tree items (Arrow keys Up/Down/Left/Right, Home, End).
*   Handles expand/collapse state communication.
*   Supports single selection via `aria-selected` managed on the items.

See `<fabric-tree-item>` documentation for details on item-specific roles and attributes. 