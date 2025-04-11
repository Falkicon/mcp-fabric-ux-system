---
id: components_counter-badge
title: Counter Badge
description: A badge variant specifically designed to display numerical counts.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/counter-badge
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Counter Badge (`<fabric-counter-badge>`)

<!-- BEGIN-SECTION: Counter Badge Overview -->
A badge variant specifically designed to display numerical counts, often used for notifications.
<!-- END-SECTION: Counter Badge Overview -->

<!-- BEGIN-SECTION: Counter Badge Usage -->
## Counter Badge Usage (fabric-counter-badge)

Use similarly to `<fabric-badge>`, but primarily driven by the `count` attribute.

**Importing:**

```javascript
import '@fabric-msft/web-components/counter-badge/define.js';

// Optional: Import the types for Typescript
import type { CounterBadge } from '@fabric-msft/web-components/counter-badge';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Basic Count -->
<fabric-counter-badge count="5"></fabric-counter-badge>

<!-- Count with Overflow -->
<fabric-counter-badge count="120" overflow-count="99"></fabric-counter-badge> <!-- Displays 99+ -->

<!-- Show Zero -->
<fabric-counter-badge count="0" show-zero></fabric-counter-badge>
<fabric-counter-badge count="0"></fabric-counter-badge> <!-- Hides by default if zero -->

<!-- Dot Indicator (no count shown) -->
<fabric-counter-badge dot></fabric-counter-badge>

<!-- Different Colors/Appearances -->
<fabric-counter-badge count="3" color="brand" appearance="filled"></fabric-counter-badge>
<fabric-counter-badge count="10" color="danger" appearance="ghost"></fabric-counter-badge>

<!-- Different Sizes/Shapes -->
<fabric-counter-badge count="2" size="small"></fabric-counter-badge>
<fabric-counter-badge count="99" size="large" shape="square"></fabric-counter-badge>

<!-- Used with Avatar -->
<fabric-avatar>
  <img src="path/to/image.jpg" alt="User Name" />
  <fabric-counter-badge slot="badge" count="3" size="small" color="danger"></fabric-counter-badge>
</fabric-avatar>
```

### Handling Events (JavaScript)

Counter badges typically do not emit specific events related to their count. You would usually update the `count` attribute programmatically based on application state changes.

```javascript
const notificationBadge = document.querySelector('fabric-counter-badge#notifications');

function updateNotificationCount(newCount) {
  if (notificationBadge) {
    notificationBadge.count = newCount;
  }
}

// Example: Update count after fetching new messages
// updateNotificationCount(5);
```
<!-- END-SECTION: Counter Badge Usage -->

<!-- BEGIN-SECTION: Counter Badge API -->
## Counter Badge API Reference (fabric-counter-badge)

Based on `CounterBadge` class, likely extending `Badge` functionality.

### Attributes & Properties

Inherits standard `<fabric-badge>` attributes:

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

Inherits standard `<fabric-badge>` CSS Parts:

*   **`icon`**: Container for the slotted icon.
<!-- END-SECTION: Counter Badge API -->

<!-- BEGIN-SECTION: Counter Badge Styling -->
## Counter Badge Styling (fabric-counter-badge)

Inherits styling from `<fabric-badge>`.

*   **Key Design Tokens Used:** Uses standard badge tokens for color, size, shape, etc.
*   Layout ensures the count number is centered.
*   Refer to `counter-badge.styles.ts` and `badge.styles.ts` for detailed token usage.
<!-- END-SECTION: Counter Badge Styling -->

<!-- BEGIN-SECTION: Counter Badge Accessibility -->
## Counter Badge Accessibility (fabric-counter-badge)

*   Typically presentational (`role` is often omitted or might be `status` depending on context).
*   The displayed `count` number provides the primary information.
*   If used for critical notifications, ensure the count change is announced appropriately (e.g., via `aria-live` on a container).
*   The `dot` variant provides only a visual cue; ensure information is conveyed through other means if necessary for accessibility.
<!-- END-SECTION: Counter Badge Accessibility -->