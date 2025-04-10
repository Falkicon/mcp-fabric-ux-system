# Toggle Button (`<fluent-toggle-button>`)

Displays a button that maintains an on/off (checked/unchecked) state.

## Usage

Use like a standard button, but its state persists across clicks.

**Importing:**

```javascript
import '@fluentui/web-components/toggle-button/define.js';
```

**Examples:**

```html
<fluent-toggle-button>Toggle Me</fluent-toggle-button>

<fluent-toggle-button checked>
  <svg slot="start" width="16" height="16"><path d="..."/></svg>
  Start Checked
</fluent-toggle-button>

<fluent-toggle-button disabled>
  Disabled Toggle
</fluent-toggle-button>

<fluent-toggle-button checked disabled>
  Checked & Disabled
</fluent-toggle-button>

<fluent-toggle-button appearance="primary" checked>
  Primary Checked Toggle
</fluent-toggle-button>

<fluent-toggle-button shape="circular" icon-only checked aria-label="Bold">
  <svg slot="start" width="16" height="16"><path d="..."/></svg>
</fluent-toggle-button>
```

## When to Use

*   Use `<fluent-toggle-button>` for actions that have a distinct on/off or selected/unselected state that should be visually represented by the button itself (e.g., Bold/Italic formatting, Show/Hide panel).
*   Use `<fluent-switch>` for settings or options that represent an on/off state, typically with a clear visual switch metaphor.
*   Use `<fluent-button>` for standard actions that trigger an operation without maintaining a persistent visual state on the button itself.

## API Reference (`<fluent-toggle-button>`)

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
fluent-toggle-button([aria-pressed="true"])::part(control) {
  border-color: var(--colorBrandStroke1);
}
```

## Styling

Inherits styling from `<fluent-button>` and adds specific styles for the checked state.

*   **Key Design Tokens Used (Examples):**
    *   Uses standard button tokens for unchecked state.
    *   Adds tokens for checked state background, border, and text color (e.g., `--colorNeutralBackground1Selected`, `--colorNeutralForeground1Selected`, `--colorNeutralStroke1Selected` for default appearance; `--colorBrandBackgroundSelected`, etc. for primary appearance).
*   Refer to `toggle-button.styles.ts` and `button.styles.ts` for detailed token usage.

## Accessibility

*   Sets `role="button"`.
*   Manages `aria-pressed` state (`"true"` or `"false"`) based on the `checked` attribute.
*   Manages `aria-disabled` based on the `disabled` attribute.
*   Ensure accessible label via text content, `aria-label`, or `aria-labelledby`.
