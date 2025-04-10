# Image (`<fluent-image>`)

Displays an image with optional Fluent styling like shape, fit, borders, and shadows.

## Usage

Use like a standard `<img>` tag, but with additional styling attributes.

**Importing:**

```javascript
import '@fluentui/web-components/image/define.js';
```

**Examples:**

```html
<!-- Basic Image -->
<fluent-image src="path/to/image.jpg" alt="Description of image"></fluent-image>

<!-- Different Shapes -->
<fluent-image shape="rounded" src="..." alt="..."></fluent-image> <!-- Default -->
<fluent-image shape="circular" src="..." alt="..."></fluent-image>
<fluent-image shape="square" src="..." alt="..."></fluent-image>

<!-- Fit Options (within a constrained container) -->
<div style="width: 100px; height: 100px; border: 1px solid red;">
  <fluent-image fit="none" src="path/to/landscape.jpg" alt="..."></fluent-image>
</div>
<div style="width: 100px; height: 100px; border: 1px solid green;">
  <fluent-image fit="contain" src="path/to/landscape.jpg" alt="..."></fluent-image>
</div>
<div style="width: 100px; height: 100px; border: 1px solid blue;">
  <fluent-image fit="cover" src="path/to/landscape.jpg" alt="..."></fluent-image>
</div>

<!-- Block Display -->
<fluent-image block src="..." alt="..."></fluent-image> <!-- Takes full width -->

<!-- With Border and Shadow -->
<fluent-image bordered shadow src="..." alt="..."></fluent-image>
```

## API Reference (`<fluent-image>`)

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

Adds Fluent UI specific attributes:

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
fluent-image::part(image) {
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
*   Refer to `image.styles.ts` for detailed token usage.

## Accessibility

*   Renders a native `<img>` element.
*   **Crucially requires meaningful `alt` text** via the `alt` attribute for screen reader users (**WCAG 1.1.1**).
*   If the image is purely decorative and provides no information, use `alt=""`.
