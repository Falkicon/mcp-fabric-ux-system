---
id: components_tooltip
title: Tooltip
description: Displays brief, contextual information related to a target element.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/tooltip
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Tooltip (`<fabric-tooltip>`)

<!-- BEGIN-SECTION: Tooltip Overview -->
Displays brief, contextual information related to a target element, typically on hover or focus.
<!-- END-SECTION: Tooltip Overview -->

## Usage

<!-- BEGIN-SECTION: Tooltip Usage -->
Associate a tooltip with its target element using the `anchor` attribute.

**Importing:**

```javascript
import '@fabric-msft/web-components/tooltip/define.js';
// Also need the anchor element (e.g., Button)
import '@fabric-msft/web-components/button/define.js';

// Optional: Import the types for Typescript
import type { Tooltip } from '@fabric-msft/web-components/tooltip';
import type { Button } from '@fabric-msft/web-components/button'; // Example anchor type
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Tooltip anchored to a button -->
<fabric-button id="btn-with-tooltip">Save</fabric-button>
<fabric-tooltip anchor="btn-with-tooltip" id="save-tooltip">
  Save your changes
</fabric-tooltip>

<!-- Different positioning -->
<fabric-button id="btn-tip-above">Info</fabric-button>
<fabric-tooltip anchor="btn-tip-above" position="above">
  Information appears above
</fabric-tooltip>

<fabric-button id="btn-tip-start">Help</fabric-button>
<fabric-tooltip anchor="btn-tip-start" position="start">
  Help text appears to the start
</fabric-tooltip>

<!-- Control visibility programmatically -->
<fabric-button id="manual-tip-trigger">Manual</fabric-button>
<fabric-tooltip anchor="manual-tip-trigger" id="manual-tip" trigger-on="manual">
  Manually controlled tooltip
</fabric-tooltip>
```

### Handling Events (JavaScript)

Tooltips emit a `visiblechange` event. You can also control visibility programmatically, especially when `trigger-on="manual"`.

```javascript
const saveTooltip = document.getElementById('save-tooltip');
const manualTip = document.getElementById('manual-tip');
const manualTrigger = document.getElementById('manual-tip-trigger');

// Listen for visibility changes (often automatic)
if (saveTooltip) {
  saveTooltip.addEventListener('visiblechange', (event) => {
      const isVisible = event.detail; // CustomEvent<boolean>
      console.log(`Save tooltip is now ${isVisible ? 'visible' : 'hidden'}`);
  });
}

// Manual control example
if (manualTrigger && manualTip) {
  // Example: Show on click, hide on blur
  manualTrigger.addEventListener('click', () => manualTip.visible = true);
  manualTrigger.addEventListener('blur', () => manualTip.visible = false);
  
  // Could also toggle visibility
  // manualTrigger.addEventListener('click', () => manualTip.visible = !manualTip.visible);
}
```
<!-- END-SECTION: Tooltip Usage -->

## API Reference (`<fabric-tooltip>`)

<!-- BEGIN-SECTION: Tooltip API -->
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
fabric-tooltip::part(tooltip) {
  background-color: var(--colorNeutralBackgroundInverted);
  color: var(--colorNeutralForegroundInverted);
  border-radius: var(--borderRadiusSmall);
  padding: var(--spacingVerticalXS) var(--spacingHorizontalS);
}
```
<!-- END-SECTION: Tooltip API -->

## Styling

<!-- BEGIN-SECTION: Tooltip Styling -->
Customize appearance using CSS targeting the host element (`fabric-tooltip` - usually hidden) or the `tooltip` part.

*   **Key Design Tokens Used (Examples):**
    *   `--colorNeutralBackgroundInverted`, `--colorNeutralForegroundInverted`: Default background and text color.
    *   `--shadow4`: Used for the tooltip's elevation/shadow.
    *   `--borderRadiusSmall`, `--borderRadiusMedium`: Corner rounding.
    *   Padding tokens (`--spacingVertical...`, `--spacingHorizontal...`).
    *   Font tokens (`--fontSizeBase200`, `--lineHeightBase200`).
*   Refer to `tooltip.styles.ts` for detailed token usage.
<!-- END-SECTION: Tooltip Styling -->

## Accessibility

<!-- BEGIN-SECTION: Tooltip Accessibility -->
*   Sets `role="tooltip"` on the popup element.
*   Associates the tooltip with its anchor element via `aria-describedby` (applied to the anchor element).
*   Tooltips are typically hidden from screen readers until they become visible (via hover/focus).
*   If the tooltip contains critical information not available otherwise, consider alternative ways to present it.
*   Focus management (`no-trap-focus` attribute) can impact keyboard accessibility.
<!-- END-SECTION: Tooltip Accessibility -->

## Dependencies

<!-- BEGIN-SECTION: Tooltip Dependencies -->
*   Relies on the HTML Popover API (`[popover]`) or its polyfill for the popup behavior.
*   Uses CSS Anchor Positioning API or its polyfill for positioning the tooltip relative to its anchor.
*   Ensure appropriate polyfills are loaded for broader browser compatibility (see [Polyfilling Guide](../../guides/polyfilling.md)).
<!-- END-SECTION: Tooltip Dependencies --> 