---
id: components_toggle-button
title: Toggle Button
description: Displays a button that maintains an on/off (checked/unchecked) state.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/toggle-button
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Toggle Button (`<fabric-toggle-button>`)

Displays a button that maintains an on/off (checked/unchecked) state.

## Usage

Use like a standard button, but its state persists across clicks.

**Importing:**

```javascript
import '@fabric-msft/web-components/toggle-button/define.js';

// Optional: Import the types for Typescript
import type { ToggleButton } from '@fabric-msft/web-components/toggle-button';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<fabric-toggle-button id="simple-toggle">Toggle Me</fabric-toggle-button>

<fabric-toggle-button checked>
  <svg slot="start" width="16" height="16"><path d="..."/></svg>
  Start Checked
</fabric-toggle-button>

<fabric-toggle-button disabled>
  Disabled Toggle
</fabric-toggle-button>

<fabric-toggle-button checked disabled>
  Checked & Disabled
</fabric-toggle-button>

<fabric-toggle-button appearance="primary" checked>
  Primary Checked Toggle
</fabric-toggle-button>

<fabric-toggle-button shape="circular" icon-only checked aria-label="Bold">
  <svg slot="start" width="16" height="16"><path d="..."/></svg>
</fabric-toggle-button>
```

### Handling Events (JavaScript)

Listen for the `change` event to detect when the button's checked state changes.

```javascript
const simpleToggle = document.getElementById('simple-toggle');

if (simpleToggle) {
  simpleToggle.addEventListener('change', (event) => {
    const button = event.target;
    console.log(`Toggle button changed. Checked: ${button.checked}`);
    // Add logic based on the new state
  });

  // You can also listen for 'click' for the interaction itself
  simpleToggle.addEventListener('click', (event) => {
      console.log('Toggle button clicked');
  });
}
```

## When to Use

*   Use `<fabric-toggle-button>` for actions that have a distinct on/off or selected/unselected state that should be visually represented by the button itself (e.g., Bold/Italic formatting, Show/Hide panel).
*   Use `<fabric-switch>` for settings or options that represent an on/off state, typically with a clear visual switch metaphor.
*   Use `<fabric-button>` for standard actions that trigger an operation without maintaining a persistent visual state on the button itself.

## API Reference (`<fabric-toggle-button>`)

Likely based on `ToggleButton` class, extending `ButtonBase` or similar.

### Attributes & Properties

Inherits standard button attributes:

*   **`appearance`**: `"primary" | "outline" | "subtle" | "transparent"`
*   **`size`**: `"small" | "medium" | "large"`
*   **`shape`**: `"circular" | "rounded" | "square"`
*   **`icon-only`**: `boolean`
*   **`disabled`**: `boolean`

Adds toggle-specific attributes:

*   **`checked`**: `boolean` (default: `false`)
    *   Gets or sets the checked (pressed) state of the button.
*   **`name`**: `string`
    *   Name submitted with form data.
*   **`value`**: `string`
    *   Value submitted with form data when checked.

### Events

*   **`change`**: `Event` - Fired when the `checked` state changes due to user interaction.
*   **`click`**: Standard HTML click event.

### Slots

*   **(default)**: Content of the button (text, etc.).
*   **`start`**: Content placed before the default slot content (typically for icons).
*   **`end`**: Content placed after the default slot content (typically for icons).

### CSS Parts

*   **`control`**: The root button element within the Shadow DOM.

```css
/* Example: Style the control part when checked */
fabric-toggle-button([aria-pressed="true"])::part(control) {
  border-color: var(--colorBrandStroke1);
}
```

## Styling

Inherits styling from `<fabric-button>` and adds specific styles for the checked state.

*   **Key Design Tokens Used (Examples):**
    *   Uses standard button tokens for unchecked state.
    *   Adds tokens for checked state background, border, and text color (e.g., `--colorNeutralBackground1Selected`, `--colorNeutralForeground1Selected`, `--colorNeutralStroke1Selected` for default appearance; `--colorBrandBackgroundSelected`, etc. for primary appearance).
*   Refer to `toggle-button.styles.ts` and `button.styles.ts` for detailed token usage.

## Accessibility

*   Sets `role="button"`.
*   Manages `aria-pressed` state (`"true"` or `"false"`) based on the `checked` attribute.
*   Manages `aria-disabled` based on the `disabled` attribute.
*   Ensure accessible label via text content, `aria-label`, or `aria-labelledby`.
