---
title: "Polyfilling for Browser Compatibility"
id: "guide.polyfilling"
area: "guides"
tags: ["polyfilling", "browser-support", "compatibility", "popover", "anchor-positioning", "fabric-ux"]
lastUpdated: 2025-04-09 # Placeholder date
---

# Polyfilling for Browser Compatibility

The Fabric UX System components leverage modern browser APIs for optimal performance and functionality. To ensure broader compatibility with browsers that haven't yet fully implemented these APIs, polyfills may be required.

The system takes a "bring your own polyfill" approach. This means your application is responsible for including necessary polyfills if you need to support browsers lacking native implementations of features used by Fabric UX components.

## Features Requiring Polyfills

Key features currently used by Fabric UX components that may require polyfilling in certain browsers include:

### HTML Popover (`[popover]`) API

- **Used by**: Components like `<fabric-dialog>`, `<fabric-drawer>`, `<fabric-menu>`, `<fabric-tooltip>`, `<fabric-dropdown>`.
- **Native Support**: Chrome/Edge 114+, Firefox 125+, Safari 17+.
- **Polyfill Required**: For browsers older than the versions listed above.
- **Recommended Polyfill**: [`@oddbird/popover-polyfill`](https://github.com/oddbird/popover-polyfill)

**Implementation:**

1.  **Install:**
    ```bash
    npm install @oddbird/popover-polyfill
    # or yarn add / pnpm add
    ```
2.  **Apply (Conditional Import):** Import the polyfill conditionally early in your application's lifecycle.
    ```javascript
    (async () => {
      // Check if the popover attribute is supported natively
      if (!('popover' in HTMLElement.prototype)) {
        // Dynamically import the polyfill if not supported
        await import('@oddbird/popover-polyfill');
      }
    })();
    ```
3.  **Global CSS (Recommended):** Add this CSS globally to prevent potential positioning issues caused by the polyfill's default fixed positioning strategy.
    ```css
    /* Reset polyfill's fixed positioning to allow Fabric components to manage position */
    [popover].\:popover-open {
      inset: unset;
      border: 1px solid transparent; /* Prevents polyfill default border */
      /* Ensure background and color are handled by the component */
      background: unset;
      color: unset;
    }
    ```

### CSS Anchor Positioning

- **Used by**: Components that position elements relative to an anchor (e.g., `<fabric-tooltip>`, `<fabric-menu>`, `<fabric-dropdown>`).
- **Native Support**: Chrome/Edge 125+.
- **Polyfill Required**: For Firefox, Safari, and older Chrome/Edge versions.
- **Recommended Polyfill**: [`@oddbird/css-anchor-positioning`](https://github.com/oddbird/css-anchor-positioning)

**Implementation:**

1.  **Install:**
    ```bash
    npm install @oddbird/css-anchor-positioning
    # or yarn add / pnpm add
    ```
2.  **Apply (Before Fabric UX Component Imports):** Apply the polyfill *before* importing or defining Fabric UX components that rely on it. This ensures the components detect the polyfilled functionality correctly.

    **Option A: Conditional Import via CDN (e.g., unpkg)**
    ```javascript
    // Check if anchor positioning is supported natively
    if (!CSS.supports('anchor-name: --foo')) {
      try {
        // Dynamically import the polyfill function from a CDN
        const { default: applyPolyfill } = await import(
          'https://unpkg.com/@oddbird/css-anchor-positioning/dist/css-anchor-positioning-fn.js'
        );
        // Apply the polyfill globally
        window.CSS_ANCHOR_POLYFILL = applyPolyfill;
        console.log('CSS Anchor Positioning polyfill applied.');
      } catch (error) {
        console.error('Failed to load CSS Anchor Positioning polyfill:', error);
      }
    }
    ```

    **Option B: Bundled Import (If using a bundler like Webpack, Vite, Rollup)**
    ```javascript
    // Check if anchor positioning is supported natively
    if (!CSS.supports('anchor-name: --foo')) {
      try {
        // Import the polyfill function from the installed package
        import { default as applyPolyfill } from '@oddbird/css-anchor-positioning/fn';
        // Apply the polyfill globally
        window.CSS_ANCHOR_POLYFILL = applyPolyfill;
        console.log('CSS Anchor Positioning polyfill applied.');
      } catch (error) {
        console.error('Failed to load CSS Anchor Positioning polyfill:', error);
      }
    }

    // --- Now safe to import Fabric UX components that use anchor positioning --- 
    // import '@fabric-msft/web-components/tooltip'; 
    // import '@fabric-msft/web-components/menu';
    ```

*Note: Some Fabric UX components might include basic fallback positioning scripts, but using the dedicated polyfill is recommended for robust and consistent anchor positioning behavior across all relevant components.*
