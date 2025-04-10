# Anchor Button (`<fluent-anchor-button>`)

Displays a clickable element styled as a button, but rendered as an HTML anchor (`<a>`) tag, enabling navigation.

## Usage

**Importing:**

```javascript
// Option 1: Side-effect import (Registers <fluent-anchor-button>)
import '@fluentui/web-components/anchor-button.js';

// Option 2: CDN (for prototyping or specific use cases)
// <script type="module" src="https://unpkg.com/@fluentui/web-components@3.x.x/dist/esm/anchor-button/define.js"></script>
// (Replace 3.x.x with desired version)
```

**Examples:**

```html
<fluent-anchor-button href="https://example.com">Default Anchor Button</fluent-anchor-button>
<fluent-anchor-button href="https://example.com" appearance="primary">Primary Anchor Button</fluent-anchor-button>
<fluent-anchor-button href="https://example.com" target="_blank" rel="noopener noreferrer">
  Open in New Tab
</fluent-anchor-button>
<fluent-anchor-button href="/path/to/file.zip" download>
  Download File
</fluent-anchor-button>
<fluent-anchor-button disabled href="https://example.com">Disabled Anchor Button</fluent-anchor-button>
```

### Sizes & Shapes

Anchor buttons support the same `size` (`small`, `medium`, `large`) and `shape` (`rounded`, `circular`, `square`) attributes as `<fluent-button>`.

```html
<fluent-anchor-button href="#" size="large">Large</fluent-anchor-button>
<fluent-anchor-button href="#" shape="square">Square</fluent-anchor-button>
```

### Icon Only & With Icons

Supports `icon-only` attribute and `start`/`end` slots identically to `<fluent-button>`.

```html
<fluent-anchor-button icon-only href="#" aria-label="Settings">
  <svg slot="start" width="16" height="16" viewBox="0 0 16 16"><path d="..."/></svg>
</fluent-anchor-button>
<fluent-anchor-button href="#">
  <svg slot="start" width="16" height="16" viewBox="0 0 16 16"><path d="..."/></svg>
  Go Home
</fluent-anchor-button>
```

## When to Use

*   Use `<fluent-anchor-button>` when you need the **appearance of a button** but the **functionality of a link** (navigation or downloading).
*   Use `<fluent-button>` for actions within the application that **do not navigate** (e.g., submitting a form, opening a dialog, triggering an action).
*   Use `<fluent-link>` for standard inline text links.

## API Reference

The `<fluent-anchor-button>` component's logic resides in the `AnchorButton` class, which extends a shared `AnchorButtonBase` class (itself often extending `ButtonBase`). This pattern promotes consistency and extensibility.

### Attributes & Properties

Inherits standard button attributes:

*   **`appearance`**: `"primary" | "outline" | "subtle" | "transparent"` (Default: Neutral appearance)
*   **`size`**: `"small" | "medium" | "large"` (default: `"medium"`)
*   **`shape`**: `"circular" | "rounded" | "square"` (default: `"rounded"`)
*   **`icon-only`**: `boolean` (default: `false`)
*   **`disabled`**: `boolean` (default: `false`) - *Note: Visually disables but might not prevent navigation if clicked directly depending on browser/assistive tech. Use carefully for links.*

Adds standard anchor attributes:

*   **`href`**: `string` (Required for navigation)
    *   URL the anchor points to.
*   **`hreflang`**: `string`
    *   Language of the linked URL.
*   **`ping`**: `string`
    *   URLs to ping when the link is followed.
*   **`referrerpolicy`**: `string`
    *   Specifies the referrer policy.
*   **`rel`**: `string`
    *   Relationship between the current page and the linked URL (e.g., `"noopener noreferrer"`).
*   **`target`**: `string`
    *   Where to display the linked URL (e.g., `"_blank"`, `"_self"`).
*   **`type`**: `string`
    *   MIME type of the linked URL.
*   **`download`**: `string | boolean`
    *   Instructs the browser to download the URL instead of navigating to it. Can be boolean or specify a filename.

### Events

*   **`click`**: Standard HTML click event.

### Slots

*   **(default)**: Content of the button (text, etc.).
*   **`start`**: Content placed before the default slot content (typically for icons).
*   **`end`**: Content placed after the default slot content (typically for icons).

### CSS Parts

*   **`control`**: The root anchor (`<a>`) element within the Shadow DOM.

```css
/* Example: Target the inner anchor control */
fluent-anchor-button::part(control) {
  text-decoration: underline;
}
```

## Styling

Styling is primarily controlled by Design Tokens inherited from button styles. Use standard CSS to override styles via the host element or the `control` part.

## Accessibility

*   Renders as an `<a>` tag, inheriting standard link accessibility behavior.
*   When `disabled` is true, `aria-disabled="true"` is set, but navigation might still occur. Consider preventing clicks programmatically if necessary.
*   When using `icon-only`, provide an `aria-label` for screen readers.
