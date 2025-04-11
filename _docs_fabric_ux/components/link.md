---
id: components_link
title: Link
description: Displays a standard inline hyperlink.
area: component
status: Draft
source: https://github.com/microsoft/fluentui/tree/master/packages/web-components/src/link
specification: TBD
history:
  - Added - YYYY-MM-DD - Initial draft based on Fluent UI reference.
contributors:
  - Fluent UI Team
  - Falkicon
---

# Link (`<fabric-link>`)

<!-- BEGIN-SECTION: Link Overview -->
Displays a standard inline hyperlink, rendered as an HTML anchor (`<a>`) tag.
<!-- END-SECTION: Link Overview -->

## Link Usage (fabric-link)

Use for navigation within text content.

**Importing:**

```javascript
import '@fabric-msft/web-components/link/define.js';

// Optional: Import the types for Typescript
import type { Link } from '@fabric-msft/web-components/link';
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<p>
  This is a paragraph with a <fabric-link id="standard-link" href="https://example.com">standard link</fabric-link> inside.
</p>

<p>
  Use the <fabric-link href="#" appearance="subtle">subtle appearance</fabric-link> for less emphasis.
</p>

<p>
  A <fabric-link href="#" disabled>disabled link</fabric-link> is not interactive.
</p>

<p>
  You can open links in a new tab:
  <fabric-link href="https://example.com" target="_blank" rel="noopener noreferrer">New Tab</fabric-link>.
</p>

<p>
  The inline attribute affects block behavior:
  <fabric-link href="#" inline>Inline Link</fabric-link> vs
  <fabric-link href="#">Block Link (default)</fabric-link> takes full width.
</p>
```

### Handling Events (JavaScript)

Links primarily emit standard `click` events.

```javascript
const standardLink = document.getElementById('standard-link');

if (standardLink) {
  standardLink.addEventListener('click', (event) => {
    console.log(`Link clicked! Href: ${event.currentTarget.href}`);
    // To prevent standard navigation and handle it programmatically:
    // event.preventDefault();
    // Example: router.navigate(event.currentTarget.pathname);
  });
}
```
<!-- END-SECTION: Link Usage -->

## When to Use (fabric-link)

*   Use `<fabric-link>` for standard **inline text links** used for navigation.
*   Use `<fabric-anchor-button>` when you need the **appearance of a button** but the **functionality of a link**.
*   Use `<fabric-button>` for actions **within the application** that do not navigate.

## Link API Reference (fabric-link)

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

Adds Fabric UX specific attributes:

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
fabric-link::part(control) {
  text-decoration-style: dotted;
}
```
<!-- END-SECTION: Link API -->

## Link Styling (fabric-link)

Customize appearance using CSS targeting the host element or the `control` part.

*   **Key Design Tokens Used (Examples):**
    *   `--colorBrandForegroundLink`, `--colorBrandForegroundLinkHover`, `--colorBrandForegroundLinkPressed`: Text color for default appearance and interaction states.
    *   `--colorNeutralForeground2`, `--colorNeutralForeground2Hover`, `--colorNeutralForeground2Pressed`: Text color for subtle appearance.
    *   `--colorNeutralForegroundDisabled`: Text color when disabled.
    *   `--fontWeightSemibold`: Font weight.
*   Text decoration (underline) is also managed via styles.
*   Refer to `link.styles.ts` for detailed token usage.
<!-- END-SECTION: Link Styling -->

## Link Accessibility (fabric-link)

*   Renders as an `<a>` tag, inheriting standard link accessibility behavior.
*   Manages `aria-disabled="true"` when `disabled` is set.
*   Ensure link text clearly describes the destination or action. 