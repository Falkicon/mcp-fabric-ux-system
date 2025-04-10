# Polyfilling

Fluent UI Web Components v3 takes a "bring your own polyfill" approach. Key features rely on modern browser APIs; polyfills are needed for broader compatibility.

## Baseline

Here's a list of features we're leveraging and their current [Baseline](https://web.dev/baseline) browser support.

<table>
  <tr>
    <th></th>
    <th>Chrome</th>
    <th>Edge</th>
    <th>Firefox</th>
    <th>Safari</th>
  </tr>
  <tr>
    <td>HTML Popover Attribute</td>
    <td>114</td>
    <td>114</td>
    <td>125</td>
    <td>17</td>
  </tr>
  <tr>
    <td>CSS Anchor Positioning</td>
    <td>125</td>
    <td>125</td>
    <td>❌ (Polyfill Required)</td>
    <td>❌ (Polyfill Required)</td>
  </tr>
</table>

## HTML Popover (`[popover]`)

Used by components like `Dialog`, `Drawer`, `Menu`, `Tooltip`, `Dropdown`.

**Polyfill Required:** Beyond Chrome/Edge 114+, Firefox 125+, Safari 17+.

1.  **Install:**
    ```bash
    yarn add @oddbird/popover-polyfill
    npm install @oddbird/popover-polyfill
    pnpm add @oddbird/popover-polyfill
    ```
2.  **Apply (Conditional Import):**
    ```javascript
    (async () => {
      if (!('popover' in HTMLElement.prototype)) {
        await import('@oddbird/popover-polyfill');
      }
    })();
    ```
3.  **Global CSS (Recommended):** Add this to mitigate potential Light DOM positioning issues introduced by the polyfill.
    ```css
    [popover].\:popover-open {
      inset: unset; /* Overrides the polyfill's default fixed positioning, allowing Fluent UI components to manage position. */
      border: 1px solid transparent; /* Prevents polyfill default border */
    }
    ```

*See: [Popover Polyfill Demo](https://stackblitz.com/edit/typescript-pqdtqs?file=index.html)*

## CSS Anchor Positioning

Used for positioning elements like `Tooltip`, `Menu`, `Dropdown` relative to an anchor element.

**Polyfill Required:** Beyond Chrome/Edge 125+.

1.  **Install:**
    ```bash
    yarn add @oddbird/css-anchor-positioning
    npm install @oddbird/css-anchor-positioning
    pnpm add @oddbird/css-anchor-positioning
    ```
2.  **Apply (Before Fluent UI Import):** This ensures that components relying on anchor positioning detect the polyfilled functionality during their initialization.
    **Option A: Conditional Import (unpkg)**
    ```javascript
    if (!CSS.supports('anchor-name: --foo')) {
      const { default: applyPolyfill } = await import(
        'https://unpkg.com/@oddbird/css-anchor-positioning/dist/css-anchor-positioning-fn.js'
      );
      window.CSS_ANCHOR_POLYFILL = applyPolyfill;
    }
    ```
    **Option B: Bundled Import (NPM/Yarn/PNPM)**
    ```javascript
    if (!CSS.supports('anchor-name: --foo')) {
      import { default as applyPolyfill } from '@oddbird/css-anchor-positioning/fn';
      window.CSS_ANCHOR_POLYFILL = applyPolyfill;
    }
    ```

*Note: Menu components include a basic fallback script for simple anchoring, but the polyfill is recommended for robust positioning across components.*
