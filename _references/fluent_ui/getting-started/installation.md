# Installation

Install `@fluentui/web-components` as a dependency.

**Yarn**

```sh
yarn add @fluentui/web-components@beta
```

**NPM**

```sh
npm i @fluentui/web-components@beta
```

**pnpm**

```sh
pnpm add @fluentui/web-components@beta
```

*Note: For theming capabilities, you will also typically install `@fluentui/tokens`: `yarn add @fluentui/tokens` / `npm i @fluentui/tokens` / `pnpm add @fluentui/tokens`.*

## From CDN

A pre-bundled script containing the library is available via CDN (like unpkg). Import using `type="module"`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- TODO: Update this version number before publishing docs -->
    <!-- Replace 'beta' or '3.x.x' with the specific version you intend to use -->
    <script type="module" src="https://unpkg.com/@fluentui/web-components@3.x.x/dist/web-components.min.js"></script>
    <!-- Example using beta: -->
    <!-- <script type="module" src="https://unpkg.com/@fluentui/web-components@beta"></script> -->

    <!-- Note: The @fluentui/tokens package is NOT included in this bundle. -->
    <!-- If using setTheme, you'll need to load tokens separately, e.g.: -->
    <!-- <script type="module" src="https://unpkg.com/@fluentui/tokens@3.x.x/dist/index.js"></script> -->
  </head>
  <body>
    <!-- Components can be used directly after script load -->
    <fluent-button>Button</fluent-button>

    <script type="module">
      // Optional: Apply theme if needed (requires tokens to be loaded)
      // import { setTheme } from 'https://unpkg.com/@fluentui/web-components@3.x.x/dist/index.js'; // Or potentially from the main bundle if exported?
      // import { webLightTheme } from 'https://unpkg.com/@fluentui/tokens@3.x.x/dist/index.js';
      // setTheme(webLightTheme);
    </script>
  </body>
</html>
```

Note: When deploying, always reference a specific version number (e.g., `@3.0.1`) instead of `@beta` or `@latest` to ensure stability.

Install the main package:

**npm**
```bash
npm install @fluentui/web-components
```

**yarn**
```bash
yarn add @fluentui/web-components
```

**pnpm**
```bash
pnpm add @fluentui/web-components
```

**Side Note on Versions:**
While the package might often be used with `@latest` or `@beta` during active development, ensure you pin to a specific, stable version for production builds (e.g., `^3.0.0`).

## Usage via CDN

For quick prototyping or specific scenarios, you can use a CDN like unpkg.

```html
<!-- Example: Load the Button component -->
<!-- TODO: Verify correct CDN path and update version number before publishing -->
<script type="module" src="https://unpkg.com/@fluentui/web-components@3.x.x/dist/esm/button/define.js"></script>

<!-- Load the theme utility -->
<script type="module">
  // TODO: Verify correct import path - Removing TODO, path confirmed by Storybook
  import { setTheme } from 'https://unpkg.com/@fluentui/web-components@3.x.x/dist/esm/index.js'; // Example path, verify!
  import { webLightTheme } from 'https://unpkg.com/@fluentui/tokens@3.x.x/dist/esm/index.js'; // Example path, verify!

  setTheme(webLightTheme);
</script>
```
