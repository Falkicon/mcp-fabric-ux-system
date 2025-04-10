# Radio Group (`<fluent-radio-group>`)

Groups multiple `<fluent-radio>` elements, ensuring only one can be selected at a time.

## Usage

Wrap related `<fluent-radio>` elements within a `<fluent-radio-group>`.
**Important:** Use `<fluent-field>` to provide an accessible group label.

**Importing:**

```javascript
// Registers <fluent-radio-group> and <fluent-radio>
import '@fluentui/web-components/radio-group/define.js';
// Also likely need Field
import '@fluentui/web-components/field/define.js';
```

**Examples:**

```html
<!-- Radio Group with Field for labeling -->
<fluent-field>
  <label slot="label" id="fruit-label">Favorite Fruit</label>
  <fluent-radio-group slot="input" name="fruit" value="banana" aria-labelledby="fruit-label">
    <fluent-field label-position="after">
      <fluent-radio slot="input" id="apple" value="apple"></fluent-radio>
      <label slot="label" for="apple">Apple</label>
    </fluent-field>
    <fluent-field label-position="after">
      <fluent-radio slot="input" id="banana" value="banana"></fluent-radio>
      <label slot="label" for="banana">Banana</label>
    </fluent-field>
    <fluent-field label-position="after">
      <fluent-radio slot="input" id="orange" value="orange" disabled></fluent-radio>
      <label slot="label" for="orange">Orange (Disabled)</label>
    </fluent-field>
  </fluent-radio-group>
</fluent-field>

<!-- Horizontal Layout -->
<fluent-field>
  <label slot="label" id="layout-label">Layout</label>
  <fluent-radio-group layout="horizontal" slot="input" name="layout" aria-labelledby="layout-label">
    <fluent-field label-position="after">
      <fluent-radio slot="input" id="vertical" value="vertical"></fluent-radio>
      <label slot="label" for="vertical">Vertical</label>
    </fluent-field>
    <fluent-field label-position="after">
      <fluent-radio slot="input" id="horizontal" value="horizontal"></fluent-radio>
      <label slot="label" for="horizontal">Horizontal</label>
    </fluent-field>
  </fluent-radio-group>
</fluent-field>

<!-- Disabled Group -->
<fluent-field disabled>
  <label slot="label" id="disabled-label">Disabled Group</label>
  <fluent-radio-group slot="input" name="disabled-group" aria-labelledby="disabled-label">
     ...
  </fluent-radio-group>
</fluent-field>
```

## API Reference (`<fluent-radio-group>`)

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
*   **`selectedRadio`** (Readonly Property): `FluentRadio | null`
    *   Gets the currently selected `<fluent-radio>` element.

### Events

*   **`change`**: `Event`
    *   Fired when the selected radio within the group changes due to user interaction.

### Slots

*   **(default)**: Accepts one or more `<fluent-radio>` elements (often wrapped in `<fluent-field>` for individual labels).

### CSS Parts

*   **`positioning-region`**: The main container div wrapping the slotted radio buttons.

```css
/* Example: Style the container */
fluent-radio-group::part(positioning-region) {
  display: flex;
  flex-direction: column; /* or row for horizontal */
  gap: var(--spacingVerticalS);
}
```

## Styling

Provides layout structure for radio buttons.

*   **Key Design Tokens Used (Examples):**
    *   `--spacingVerticalS`, `--spacingHorizontalS`: Controls the gap between radio items based on `layout`.
*   Most visual styling (colors, indicator appearance) is handled by the child `<fluent-radio>` elements.
*   Refer to `radio-group.styles.ts` for detailed token usage.

## Accessibility

*   Sets `role="radiogroup"`.
*   Requires an accessible label provided via `aria-label`, `aria-labelledby`, or ideally by using `<fluent-field>` with a slotted `<label>`.
*   Manages `aria-disabled` and `aria-required` based on attributes.
*   Sets `aria-orientation` based on the `orientation`/`layout` attribute.
*   Keyboard navigation (Arrow keys, Tab) allows moving between and selecting radios within the group.
