---
id: components_radio-group
title: Radio Group
description: Groups multiple Radio elements, ensuring only one can be selected.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/radio-group
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Radio Group (`<fabric-radio-group>`)

<!-- BEGIN-SECTION: Radio Group Overview -->
Groups multiple `<fabric-radio>` elements, ensuring only one can be selected at a time.
<!-- END-SECTION: Radio Group Overview -->

## Usage

<!-- BEGIN-SECTION: Radio Group Usage -->
Wrap related `<fabric-radio>` elements within a `<fabric-radio-group>`.
**Important:** Use `<fabric-field>` to provide an accessible group label.

**Importing:**

```javascript
// Registers <fabric-radio-group> and <fabric-radio>
import '@fabric-msft/web-components/radio-group/define.js';
// Also likely need Field
import '@fabric-msft/web-components/field/define.js';

// Optional: Import the types for Typescript
import type { RadioGroup } from '@fabric-msft/web-components/radio-group';
import type { Radio } from '@fabric-msft/web-components/radio'; // Example
import type { Field } from '@fabric-msft/web-components/field'; // Example
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Radio Group with Field for labeling -->
<fabric-field>
  <label slot="label" id="fruit-label">Favorite Fruit</label>
  <fabric-radio-group id="fruit-group" slot="input" name="fruit" value="banana" aria-labelledby="fruit-label">
    <fabric-field label-position="after">
      <fabric-radio slot="input" id="apple" value="apple"></fabric-radio>
      <label slot="label" for="apple">Apple</label>
    </fabric-field>
    <fabric-field label-position="after">
      <fabric-radio slot="input" id="banana" value="banana"></fabric-radio>
      <label slot="label" for="banana">Banana</label>
    </fabric-field>
    <fabric-field label-position="after">
      <fabric-radio slot="input" id="orange" value="orange" disabled></fabric-radio>
      <label slot="label" for="orange">Orange (Disabled)</label>
    </fabric-field>
  </fabric-radio-group>
</fabric-field>

<!-- Horizontal Layout -->
<fabric-field>
  <label slot="label" id="layout-label">Layout</label>
  <fabric-radio-group layout="horizontal" slot="input" name="layout" aria-labelledby="layout-label">
    <fabric-field label-position="after">
      <fabric-radio slot="input" id="vertical" value="vertical"></fabric-radio>
      <label slot="label" for="vertical">Vertical</label>
    </fabric-field>
    <fabric-field label-position="after">
      <fabric-radio slot="input" id="horizontal" value="horizontal"></fabric-radio>
      <label slot="label" for="horizontal">Horizontal</label>
    </fabric-field>
  </fabric-radio-group>
</fabric-field>

<!-- Disabled Group -->
<fabric-field disabled>
  <label slot="label" id="disabled-label">Disabled Group</label>
  <fabric-radio-group slot="input" name="disabled-group" aria-labelledby="disabled-label">
     <!-- Radios inside will inherit disabled state -->
     <fabric-field label-position="after">
        <fabric-radio slot="input" id="dis1" value="1"></fabric-radio>
        <label slot="label" for="dis1">Option 1</label>
      </fabric-field>
  </fabric-radio-group>
</fabric-field>
```
<!-- END-SECTION: Radio Group Usage -->

## API Reference (`<fabric-radio-group>`)

<!-- BEGIN-SECTION: Radio Group API -->
Based on `RadioGroup` class.

### Attributes & Properties

*   **`value`**: `string`
    *   Gets or sets the value of the currently selected radio button within the group.
*   **`name`**: `string` (Required)
    *   A name for the group, used for form submission and linking radios.
*   **`disabled`**: `boolean` (default: `false`)
    *   Disables all radio buttons within the group.
*   **`required`**: `boolean` (default: `false`)
    *   Indicates that selecting an option in this group is required for form submission.
*   **`layout`**: `"vertical" | "horizontal"` (default: `"vertical"`)
    *   Controls the layout direction of the radio buttons.
*   **`orientation`**: `"vertical" | "horizontal"` (default: `"vertical"`)
    *   Alias for `layout`. Sets `aria-orientation`.
*   **`selectedRadio`** (Readonly Property): `FabricRadio | null`
    *   Gets the currently selected `<fabric-radio>` element.

### Events

*   **`change`**: `Event`
    *   Fired when the selected radio within the group changes due to user interaction. The `event.target` is the `<fabric-radio-group>` element.

### Slots

*   **(default)**: Accepts one or more `<fabric-radio>` elements (often wrapped in `<fabric-field>` for individual labels).

### CSS Parts

*   **`positioning-region`**: The main container div wrapping the slotted radio buttons.

```css
/* Example: Style the container */
fabric-radio-group::part(positioning-region) {
  display: flex;
  flex-direction: column; /* or row for horizontal */
  gap: var(--spacingVerticalS);
}
```
<!-- END-SECTION: Radio Group API -->

## Styling

<!-- BEGIN-SECTION: Radio Group Styling -->
Provides layout structure for radio buttons.

*   **Key Design Tokens Used (Examples):**
    *   `--spacingVerticalS`, `--spacingHorizontalS`: Controls the gap between radio items based on `layout`.
*   Most visual styling (colors, indicator appearance) is handled by the child `<fabric-radio>` elements.
*   Refer to `radio-group.styles.ts` for detailed token usage.
<!-- END-SECTION: Radio Group Styling -->

## Accessibility

<!-- BEGIN-SECTION: Radio Group Accessibility -->
*   Sets `role="radiogroup"`.
*   Requires an accessible label provided via `aria-label`, `aria-labelledby`, or ideally by using `<fabric-field>` with a slotted `<label>`.
*   Manages `aria-disabled` and `aria-required` based on attributes.
*   Sets `aria-orientation` based on the `orientation`/`layout` attribute.
*   Keyboard navigation (Arrow keys, Tab) allows moving between and selecting radios within the group.
<!-- END-SECTION: Radio Group Accessibility --> 