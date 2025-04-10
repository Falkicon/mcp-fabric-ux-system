# Tooltip (`<fluent-tooltip>`)

Displays brief, contextual information related to a target element, typically on hover or focus.

## Usage

Associate a tooltip with its target element using the `anchor` attribute.

**Importing:**

```javascript
import '@fluentui/web-components/tooltip/define.js';
// Also need the anchor element (e.g., Button)
import '@fluentui/web-components/button/define.js';
```

**Examples:**

```html
<!-- Tooltip anchored to a button -->
<fluent-button id="btn-with-tooltip">Save</fluent-button>
<fluent-tooltip anchor="btn-with-tooltip">
  Save your changes
</fluent-tooltip>

<!-- Different positioning -->
<fluent-button id="btn-tip-above">Info</fluent-button>
<fluent-tooltip anchor="btn-tip-above" position="above">
  Information appears above
</fluent-tooltip>

<fluent-button id="btn-tip-start">Help</fluent-button>
<fluent-tooltip anchor="btn-tip-start" position="start">
  Help text appears to the start
</fluent-tooltip>

<!-- Control visibility programmatically -->
<fluent-button id="manual-tip-trigger">Manual</fluent-button>
<fluent-tooltip anchor="manual-tip-trigger" id="manual-tip" trigger-on="manual">
  Manually controlled tooltip
</fluent-tooltip>

<script>
  const manualTip = document.getElementById('manual-tip');
  const manualTrigger = document.getElementById('manual-tip-trigger');
  // Example: Show on click, hide on blur
  manualTrigger.addEventListener('click', () => manualTip.visible = true);
  manualTrigger.addEventListener('blur', () => manualTip.visible = false);
</script>
```

## API Reference (`<fluent-tooltip>`)

Based on `Tooltip` class.

### Attributes & Properties

*   **`anchor`**: `string` (Required)
    *   The `id` of the element that the tooltip describes and is positioned relative to.
*   **`visible`**: `boolean` (default: `false`)
    *   Controls the visibility of the tooltip popup. Usually managed automatically based on hover/focus unless `trigger-on="manual"`.
*   **`position`**: `"above" | "below" | "start" | "end"` (default: `"below"`)
    *   Hints at the preferred position of the tooltip relative to the anchor. Actual position may vary based on available space and anchor positioning logic.
*   **`delay`**: `number` (default: `300`)
    *   Delay in milliseconds before the tooltip appears on hover.
*   **`trigger-on`**: `"hover focus" | "hover" | "focus" | "manual"` (default: `"hover focus"`)
    *   Specifies the interaction(s) on the anchor element that trigger the tooltip visibility.
*   **`no-trap-focus`**: `boolean` (default: `false`)
    *   If set, focus will not be trapped within the tooltip when it becomes visible (use with caution, may impact accessibility).

### Events

*   **`visiblechange`**: `CustomEvent<boolean>` - Fired when the tooltip's `visible` state changes. `event.detail` is `true` if visible, `false` if hidden.

### Slots

*   **(default)**: The content to be displayed within the tooltip.

### CSS Parts

*   **`tooltip`**: The main tooltip popup container element.

```css
/* Example: Style the tooltip container */
fluent-tooltip::part(tooltip) {
  background-color: var(--colorNeutralBackgroundInverted);
  color: var(--colorNeutralForegroundInverted);
  border-radius: var(--borderRadiusSmall);
  padding: var(--spacingVerticalXS) var(--spacingHorizontalS);
}
```

## Styling

Customize appearance using CSS targeting the host element (`fluent-tooltip` - usually hidden) or the `tooltip` part.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralBackgroundInverted`, `--colorNeutralForegroundInverted`: Default background and text color.
    *   `--shadow4`: Used for the tooltip's elevation/shadow.
    *   `--borderRadiusSmall`, `--borderRadiusMedium`: Corner rounding.
    *   Padding tokens (`--spacingVertical...`, `--spacingHorizontal...`).
    *   Font tokens (`--fontSizeBase200`, `--lineHeightBase200`).
*   Refer to `tooltip.styles.ts` for detailed token usage.

## Accessibility

*   Sets `role="tooltip"` on the popup element.
*   Associates the tooltip with its anchor element via `aria-describedby` (applied to the anchor element).
*   Tooltips are typically hidden from screen readers until they become visible (via hover/focus).
*   If the tooltip contains critical information not available otherwise, consider alternative ways to present it.
*   Focus management (`no-trap-focus` attribute) can impact keyboard accessibility.

## Dependencies

*   Relies on the HTML Popover API (`[popover]`) or its polyfill for the popup behavior.
*   Uses CSS Anchor Positioning API or its polyfill for positioning the tooltip relative to its anchor.
*   Ensure appropriate polyfills are loaded for broader browser compatibility (see [Polyfilling](../concepts/polyfilling.md)).
