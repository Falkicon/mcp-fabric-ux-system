# Link (`<fluent-link>`)

Displays a standard inline hyperlink, rendered as an HTML anchor (`<a>`) tag.

## Usage

Use for navigation within text content.

**Importing:**

```javascript
import '@fluentui/web-components/link/define.js';
```

**Examples:**

```html
<p>
  This is a paragraph with a <fluent-link href="https://example.com">standard link</fluent-link> inside.
</p>

<p>
  Use the <fluent-link href="#" appearance="subtle">subtle appearance</fluent-link> for less emphasis.
</p>

<p>
  A <fluent-link href="#" disabled>disabled link</fluent-link> is not interactive.
</p>

<p>
  You can open links in a new tab:
  <fluent-link href="https://example.com" target="_blank" rel="noopener noreferrer">New Tab</fluent-link>.
</p>

<p>
  The inline attribute affects block behavior:
  <fluent-link href="#" inline>Inline Link</fluent-link> vs
  <fluent-link href="#">Block Link (default)</fluent-link> takes full width.
</p>
```

## When to Use

*   Use `<fluent-link>` for standard **inline text links** used for navigation.
*   Use `<fluent-anchor-button>` when you need the **appearance of a button** but the **functionality of a link**.
*   Use `<fluent-button>` for actions **within the application** that do not navigate.

## API Reference (`<fluent-link>`)

Based on `Link` class.

### Attributes & Properties

Inherits standard anchor attributes:

*   **`href`**: `string` (Required for navigation)
*   **`hreflang`**: `string`
*   **`ping`**: `string`
*   **`referrerpolicy`**: `string`
*   **`rel`**: `string`
*   **`target`**: `string`
*   **`type`**: `string`
*   **`download`**: `string | boolean`

Adds Fluent UI specific attributes:

*   **`appearance`**: `"default" | "subtle"` (default: `"default"`)
    *   Adjusts the visual prominence (e.g., color).
*   **`disabled`**: `boolean` (default: `false`)
    *   Visually and functionally disables the link.
*   **`inline`**: `boolean` (default: `false`)
    *   If true, displays the link as an inline element; otherwise, it behaves like a block element.

### Events

*   **`click`**: Standard HTML click event.

### Slots

*   **(default)**: The text content of the link.

### CSS Parts

*   **`control`**: The root anchor (`<a>`) element within the Shadow DOM.

```css
/* Example: Style the root anchor element */
fluent-link::part(control) {
  text-decoration-style: dotted;
}
```

## Styling

Customize appearance using CSS targeting the host element or the `control` part.

*   **Key Design Tokens Used (Examples):**
    *   `--colorBrandForegroundLink`, `--colorBrandForegroundLinkHover`, `--colorBrandForegroundLinkPressed`: Text color for default appearance and interaction states.
    *   `--colorNeutralForeground2`, `--colorNeutralForeground2Hover`, `--colorNeutralForeground2Pressed`: Text color for subtle appearance.
    *   `--colorNeutralForegroundDisabled`: Text color when disabled.
    *   `--fontWeightSemibold`: Font weight.
*   Text decoration (underline) is also managed via styles.
*   Refer to `link.styles.ts` for detailed token usage.

## Accessibility

*   Renders as an `<a>` tag, inheriting standard link accessibility behavior.
*   Manages `aria-disabled="true"` when `disabled` is set.
*   Ensure link text clearly describes the destination or action.
