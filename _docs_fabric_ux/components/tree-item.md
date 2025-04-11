---
id: components_tree-item
title: Tree Item
description: Represents a single item within a Tree.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/tree-item
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Tree Item (`<fabric-tree-item>`)

<!-- BEGIN-SECTION: Tree Item Overview -->
Represents a single item within a `<fabric-tree>`, which can be a leaf node or contain a nested tree.
<!-- END-SECTION: Tree Item Overview -->

<!-- BEGIN-SECTION: Tree Item Usage -->
## Tree Item Usage (fabric-tree-item)

Place `<fabric-tree-item>` elements inside a `<fabric-tree>`. Nest further `<fabric-tree>` elements within the `item-nested` slot for hierarchical structures.

**Importing:**

```javascript
// Typically imported alongside Tree:
import '@fabric-msft/web-components/tree/define.js';
// Or individually:
// import '@fabric-msft/web-components/tree-item/define.js';

// Optional: Import the types for Typescript
import type { TreeItem } from '@fabric-msft/web-components/tree-item';
import type { TreeView } from '@fabric-msft/web-components/tree'; // Example context type
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Example (within Tree):**

```html
<fabric-tree aria-label="File explorer">
  <fabric-tree-item id="docs-item">
    <span slot="start">📁</span> Documents
    <!-- Nested tree goes in the item-nested slot -->
    <fabric-tree slot="item-nested">
      <fabric-tree-item id="report-item">
        <span slot="start">📄</span> Report.docx
      </fabric-tree-item>
    </fabric-tree>
  </fabric-tree-item>
  <fabric-tree-item selected>
      <span slot="start">📄</span> Readme.txt (Selected)
  </fabric-tree-item>
  <fabric-tree-item disabled>
      <span slot="start">📄</span> Archived.zip (Disabled)
  </fabric-tree-item>
</fabric-tree>
```

### Handling Events (JavaScript)

Listen for `expanded-change` and `selected-change` directly on the tree item, or rely on the parent tree's events if applicable.

```javascript
const docsItem = document.getElementById('docs-item');
const reportItem = document.getElementById('report-item');

if (docsItem) {
  docsItem.addEventListener('expanded-change', (event) => {
    // Note: The event doesn't typically carry the new state in detail
    console.log(`Docs item expanded state changed. Current: ${event.target.expanded}`);
  });
}

if (reportItem) {
  reportItem.addEventListener('selected-change', (event) => {
    console.log(`Report item selected state changed. Current: ${event.target.selected}`);
    // Handle selection logic
  });
}

// Often, you might listen on the parent tree for selection changes
// const tree = document.querySelector('fabric-tree');
// tree.addEventListener('selected-change', (event) => { ... }); // Check tree component API
```
<!-- END-SECTION: Tree Item Usage -->

<!-- BEGIN-SECTION: Tree Item API -->
## Tree Item API Reference (fabric-tree-item)

Based on `TreeItem` class extending `TreeItemBase`.

### Attributes & Properties

*   **`disabled`**: `boolean` (default: `false`)
    *   Disables the tree item, preventing selection and expansion.
*   **`selected`**: `boolean` (default: `false`)
    *   Indicates if the item is currently selected. Typically managed by the parent `<fabric-tree>`.
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
*   **`item-nested`**: Accepts a `<fabric-tree>` element to create a nested subtree.

### CSS Parts

*   **`control`**: The main container element for the item's content and expander.
*   **`content`**: The container for the `start`, default, and `end` slots.
*   **`expand-collapse-button`**: The expand/collapse button/indicator.

```css
/* Example: Style the main item container */
fabric-tree-item::part(control) {
  padding: var(--spacingVerticalXS) var(--spacingHorizontalS);
}

/* Example: Style the content part when selected */
fabric-tree-item[aria-selected="true"]::part(content) {
  font-weight: bold;
}
```
<!-- END-SECTION: Tree Item API -->

<!-- BEGIN-SECTION: Tree Item Styling -->
## Tree Item Styling (fabric-tree-item)

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
<!-- END-SECTION: Tree Item Styling -->

<!-- BEGIN-SECTION: Tree Item Accessibility -->
## Tree Item Accessibility (fabric-tree-item)

*   Sets `role="treeitem"`.
*   Manages `aria-selected` based on selection state.
*   Manages `aria-expanded` for items with nested trees.
*   Manages `aria-disabled` based on the `disabled` attribute.
*   Sets `aria-level` based on nesting depth.
*   Sets `aria-posinset` and `aria-setsize` based on position within its parent tree/subtree.
*   Relies on the parent `<fabric-tree>` for overall tree context and keyboard navigation.
<!-- END-SECTION: Tree Item Accessibility -->
