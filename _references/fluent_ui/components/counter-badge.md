# Counter Badge (`<fluent-counter-badge>`)

A badge variant specifically designed to display numerical counts, often used for notifications.

## Usage

Use similarly to `<fluent-badge>`, but primarily driven by the `count` attribute.

**Importing:**

```javascript
import '@fluentui/web-components/counter-badge/define.js';
```

**Examples:**

```html
<!-- Basic Count -->
<fluent-counter-badge count="5"></fluent-counter-badge>

<!-- Count with Overflow -->
<fluent-counter-badge count="120" overflow-count="99"></fluent-counter-badge> <!-- Displays 99+ -->

<!-- Show Zero -->
<fluent-counter-badge count="0" show-zero></fluent-counter-badge>
<fluent-counter-badge count="0"></fluent-counter-badge> <!-- Hides by default if zero -->

<!-- Dot Indicator (no count shown) -->
<fluent-counter-badge dot></fluent-counter-badge>

<!-- Different Colors/Appearances -->
<fluent-counter-badge count="3" color="brand" appearance="filled"></fluent-counter-badge>
<fluent-counter-badge count="10" color="danger" appearance="ghost"></fluent-counter-badge>

<!-- Different Sizes/Shapes -->
<fluent-counter-badge count="2" size="small"></fluent-counter-badge>
<fluent-counter-badge count="99" size="large" shape="square"></fluent-counter-badge>

<!-- Used with Avatar -->
<fluent-avatar>
  <img src="path/to/image.jpg" alt="User Name" />
  <fluent-counter-badge slot="badge" count="3" size="small" color="danger"></fluent-counter-badge>
</fluent-avatar>
```

## API Reference (`<fluent-counter-badge>`)

Based on `CounterBadge` class, likely extending `Badge` functionality.

### Attributes & Properties

Inherits standard `<fluent-badge>` attributes:

*   **`appearance`**: `"filled" | "ghost" | "outline" | "tint"` (default: `"filled"`)
*   **`color`**: `"brand" | "danger" | "important" | "informative" | ... (default: `"neutral"`)
*   **`size`**: `"tiny" | "small" | "medium" | "large" | "extra-large"` (default: `"medium"`)
*   **`shape`**: `"circular" | "rounded" | "square"` (default: `"circular"` for counts/dots)

Adds counter-specific attributes:

*   **`count`**: `number` (default: `0`)
    *   The numerical value to display.
*   **`show-zero`**: `boolean` (default: `false`)
    *   If true, displays the badge even when the count is 0.
*   **`dot`**: `boolean` (default: `false`)
    *   If true, displays a small dot instead of the count (ignores `count` value).
*   **`overflow-count`**: `number`
    *   If set, displays `{overflow-count}+` when `count` exceeds this value.

### Events

None specific to this component.

### Slots

*   **(default)**: Content to display (overridden by `count` or `dot` attribute if set).
*   **`icon`**: An icon to display within the badge (usage might be limited with counts).

### CSS Parts

Inherits standard `<fluent-badge>` CSS Parts:

*   **`icon`**: Container for the slotted icon.

## Styling

Inherits styling from `<fluent-badge>`.

*   **Key Design Tokens Used:** Uses standard badge tokens for color, size, shape, etc.
*   Layout ensures the count number is centered.
*   Refer to `counter-badge.styles.ts` and `badge.styles.ts` for detailed token usage.

## Accessibility

*   Typically presentational (`role` is often omitted or might be `status` depending on context).
*   The displayed `count` number provides the primary information.
*   If used for critical notifications, ensure the count change is announced appropriately (e.g., via `aria-live` on a container).
*   The `dot` variant provides only a visual cue; ensure information is conveyed through other means if necessary for accessibility.
