---
id: components_anchor-button
title: Anchor Button
description: Displays a link styled as a button, enabling navigation.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/anchor-button
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Anchor Button (`<fabric-anchor-button>`)

<!-- BEGIN-SECTION: Anchor Button Overview -->
Displays a clickable element styled as a button, but rendered as an HTML anchor (`<a>`) tag, enabling navigation.
<!-- END-SECTION: Anchor Button Overview -->

## Usage

**Importing:**

```javascript
// Option 1: Side-effect import (Registers <fabric-anchor-button>)
import '@fabric-msft/web-components/anchor-button/define.js';

// Optional: Import the types for Typescript
import type { AnchorButton } from '@fabric-msft/web-components/anchor-button';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<fabric-anchor-button id="my-link-button" href="https://example.com">Default Anchor Button</fabric-anchor-button>
<fabric-anchor-button href="https://example.com" appearance="primary">Primary Anchor Button</fabric-anchor-button>
<fabric-anchor-button href="https://example.com" target="_blank" rel="noopener noreferrer">
  Open in New Tab
</fabric-anchor-button>
<fabric-anchor-button href="/path/to/file.zip" download>
  Download File
</fabric-anchor-button>
<fabric-anchor-button disabled href="https://example.com">Disabled Anchor Button</fabric-anchor-button>
```

### Handling Events (JavaScript)

Anchor buttons primarily emit standard `click` events. You can listen for these just like regular anchor tags or buttons.

```javascript
const linkButton = document.getElementById('my-link-button');

if (linkButton) {
  linkButton.addEventListener('click', (event) => {
    console.log('Anchor button clicked! Navigation target:', event.currentTarget.href);
    // Note: You might want to call event.preventDefault() here
    // if you intend to handle the navigation programmatically.
  });
}
```

### Sizes & Shapes

Anchor buttons support the same `size` (`small`, `medium`, `large`) and `shape` (`rounded`, `circular`, `square`) attributes as `<fabric-button>`.

```html
<fabric-anchor-button href="#" size="large">Large</fabric-anchor-button>
<fabric-anchor-button href="#" shape="square">Square</fabric-anchor-button>
```

### Icon Only & With Icons

Supports `icon-only` attribute and `start`/`end` slots identically to `<fabric-button>`.

```html
<fabric-anchor-button icon-only href="#" aria-label="Settings">
  <svg slot="start" width="16" height="16" viewBox="0 0 16 16"><path d="..."/></svg>
</fabric-anchor-button>
<fabric-anchor-button href="#">
  <svg slot="start" width="16" height="16" viewBox="0 0 16 16"><path d="..."/></svg>
  Go Home
</fabric-anchor-button>
```

## When to Use (fabric-anchor-button)

*   Use `<fabric-anchor-button>` when you need the **appearance of a button** but the **functionality of a link** (navigation or downloading).
*   Use `<fabric-button>` for actions within the application that **do not navigate** (e.g., submitting a form, opening a dialog, triggering an action).
*   Use `<fabric-link>` for standard inline text links.

## API Reference

The `<fabric-anchor-button>` component's logic resides in the `AnchorButton` class, which extends a shared `AnchorButtonBase` class (itself often extending `ButtonBase`). This pattern promotes consistency and extensibility.

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
fabric-anchor-button::part(control) {
  text-decoration: underline;
}
```

## Styling

Styling is primarily controlled by Design Tokens inherited from button styles. Use standard CSS to override styles via the host element or the `control` part.

*   Refer to component style files (e.g., `anchor-button.styles.ts`, `button.styles.ts`) for specific token usage and structure.

## Accessibility

*   Renders as an `<a>` tag, inheriting standard link accessibility behavior.
*   When `disabled` is true, `aria-disabled="true"` is set, but navigation might still occur. Consider preventing clicks programmatically if necessary.
*   When using `icon-only`, provide an `aria-label` for screen readers. 