---
id: component.image
title: Image
area: component
description: Displays an image with optional Fabric styling like shape, fit, borders, and shadows.
status: Draft
source: TBD # Link to Fabric implementation source if available
specification: TBD
history:
  - Added: YYYY-MM-DD - Initial draft adapted from Fluent UI reference.
contributors:
  - Fluent UI Team
  - Fabric UX Adapters
---

# Image (`<fabric-image>`)

Displays an image with optional Fabric styling like shape, fit, borders, and shadows.

## Usage

Use like a standard `<img>` tag, but with additional styling attributes.

**Importing:**

```javascript
import '@fabric-msft/web-components/image/define.js';

// Optional: Import the types for Typescript
import type { Image } from '@fabric-msft/web-components/image'; 
```

*See [Installation Guide](../../guides/installation.md) for more ways to integrate Fabric UX components.*

**Examples:**

```html
<!-- Basic Image -->
<fabric-image src="path/to/image.jpg" alt="Description of image"></fabric-image>

<!-- Different Shapes -->
<fabric-image shape="rounded" src="..." alt="..."></fabric-image> <!-- Default -->
<fabric-image shape="circular" src="..." alt="..."></fabric-image>
<fabric-image shape="square" src="..." alt="..."></fabric-image>

<!-- Fit Options (within a constrained container) -->
<div style="width: 100px; height: 100px; border: 1px solid red;">
  <fabric-image fit="none" src="path/to/landscape.jpg" alt="..."></fabric-image>
</div>
<div style="width: 100px; height: 100px; border: 1px solid green;">
  <fabric-image fit="contain" src="path/to/landscape.jpg" alt="..."></fabric-image>
</div>
<div style="width: 100px; height: 100px; border: 1px solid blue;">
  <fabric-image fit="cover" src="path/to/landscape.jpg" alt="..."></fabric-image>
</div>

<!-- Block Display -->
<fabric-image block src="..." alt="..."></fabric-image> <!-- Takes full width -->

<!-- With Border and Shadow -->
<fabric-image bordered shadow src="..." alt="..."></fabric-image>
```

## API Reference (`<fabric-image>`)

Based on `Image` class.

### Attributes & Properties

Inherits standard HTML `<img>` attributes:

*   **`src`**: `string` (Required) - Image URL.
*   **`alt`**: `string` (Required for accessibility) - Alternative text description.
*   **`srcset`**: `string` - For responsive images.
*   **`sizes`**: `string` - For responsive images.
*   **`crossorigin`**: `string`
*   **`height`**: `number`
*   **`width`**: `number`
*   *(Other standard `<img>` attributes like `usemap`, `ismap`, etc.)*

Adds Fabric UX specific attributes:

*   **`shape`**: `"rounded" | "square" | "circular"` (default: `"rounded"`)
    *   Sets the shape of the image (via border radius).
*   **`fit`**: `"none" | "contain" | "cover" | "fill" | "scale-down"` (default: `"none"`)
    *   Maps to the standard CSS `object-fit` property, controlling how the image scales within its bounds.
*   **`block`**: `boolean` (default: `false`)
    *   If true, sets `display: block` and `max-width: 100%`.
*   **`bordered`**: `boolean` (default: `false`)
    *   Adds a standard border around the image.
*   **`shadow`**: `boolean` (default: `false`)
    *   Adds a standard box shadow to the image.

### Events

Inherits standard HTML `<img>` events (`load`, `error`, etc.).

### Slots

None.

### CSS Parts

*   **`image`**: The native `<img>` element within the component.

```css
/* Example: Style the native image element */
fabric-image::part(image) {
  opacity: 0.8;
}
```

## Styling

Customize appearance using CSS targeting the host element or the `image` part. Styling attributes provide common adjustments.

*   **Key Design Tokens Used (Examples):**
    *   `--borderRadiusMedium`, `--borderRadiusCircular`, `--borderRadiusNone`: Used based on the `shape` attribute.
    *   `--colorNeutralStroke1`: Used for the border when `bordered` is true.
    *   `--shadow4`: Used for the shadow when `shadow` is true.
*   The `fit` attribute maps directly to CSS `object-fit`.
*   Refer to `image.styles.ts` (or similar file in the component source) for detailed token usage.

## Accessibility

*   Renders a native `<img>` element.
*   **Crucially requires meaningful `alt` text** via the `alt` attribute for screen reader users (**WCAG 1.1.1**).
*   If the image is purely decorative and provides no information, use `alt=""`. 